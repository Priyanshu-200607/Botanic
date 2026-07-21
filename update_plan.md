# Backend Development & Database Update Plan

## 1. Project Current Context
Botanic2 is an in-development, multi-vendor marketplace for botanics. The frontend is largely complete (Next.js, Tailwind, React Query) with distinct route groups `(admin)`, `(seller)`, `(customer)`.
The backend uses FastAPI, SQLAlchemy (asyncio), and Supabase PostgreSQL. However, only the skeleton is laid out, and the database schema needs to evolve to support manual verification flows, deep moderation, and auditing before writing backend endpoints.

## 2. Features & Functionalities
Based on the architectural review, the backend must support:
- **Authentication & RBAC:** Supabase Auth with Google OAuth. Roles: `customer`, `seller`, `admin`.
- **Store Management & Approval:** Stores must go through an approval workflow (Draft -> Pending -> Admin Review -> Approved).
- **Product Moderation:** Admins can soft-delete or hide products (`is_hidden`) and track who approved/rejected them.
- **Shopping & Orders:** Cart, Checkout, and Order handling mapping `OrderItem`s to freeze prices at the time of purchase. **Wishlists** are also introduced.
- **Manual Payment Workflow (Core Feature):** 
  - Since an online payment gateway is currently unviable (no PAN), a first-class manual QR payment flow will be used.
  - Flow: Checkout -> Order Pending -> Display Platform QR (fetched from `platform_settings`) -> Customer pays and uploads proof (`payment_proofs`) -> Admin verifies -> Order Paid.
- **Auditing & Tracking:** `inventory_logs` to track atomic stock changes (preventing race conditions), and `audit_logs` for all admin actions.
- **Notifications:** In-app notifications to update users when orders ship, stores are approved, or payments verified.
- **Platform Configuration:** A singleton table `platform_settings` storing dynamic global configs (UPI ID, QR URL, maintenance mode) so frontend apps can update immediately without redeploys.

## 3. Plan to Create Clean Database & Backend
**Phase 1: Database Schema Expansion (Supabase SQL)**
- Modify existing tables (`stores`, `products`) to include approval status and moderation flags.
- Create new functional tables: `wishlists`, `notifications`, `audit_logs`, `inventory_logs`, `platform_settings`.
- Create payment-specific tables: `payment_proofs`.
- Create missing database indices to optimize joins.

**Phase 2: FastAPI Backend Development Architecture & Implementation**

The FastAPI backend must strictly adhere to a clean, API-only architecture. It acts as the intermediary between the Next.js frontend and the Supabase database.

- **1. Core Architecture & Layering:**
  - **Routers (`/api/v1/...`)**: Expose RESTful endpoints. Must contain zero business logic.
  - **Services (`/services/...`)**: Handle all business logic (e.g., orchestrating manual payments, verifying inventory).
  - **Repositories (`/repositories/...`)**: Handle all database queries using SQLAlchemy Async (`asyncpg`). No raw SQL in the service layer.
  - **Schemas (`/schemas/...`)**: Pydantic v2 models for strict request validation and response serialization.

- **2. Authentication & RBAC (Role-Based Access Control):**
  - **Middleware/Dependencies**: Supabase handles the actual Google OAuth. The FastAPI backend must verify the JWT sent in the `Authorization` header.
  - **Roles**: Create FastAPI dependency injections (e.g., `get_current_admin`, `get_current_seller`) that read the user's role from the database and enforce strict 403 Forbidden responses if permissions are missing. IDOR (Insecure Direct Object Reference) prevention is critical (e.g., a seller can only fetch orders belonging to their `store_id`).

- **3. Specific API Domain Implementations:**
  - **Users API**: Fetch profile, manage multiple shipping addresses, view order history.
  - **Store & Product APIs (Seller Flow)**: Endpoints to create stores (defaulting to `pending`). Routes to manage products, update stock, and upload images to Supabase Storage.
  - **Shopping & Checkout APIs**: Cart endpoints, wishlist toggles, and the critical checkout endpoint which snapshots prices into `order_items` and calls the `decrement_product_stock` RPC to prevent race conditions.
  - **Manual Payment Flow APIs**:
    - `POST /payments/upload-proof`: Customer uploads the QR payment screenshot to Supabase Storage, generating a `payment_proofs` record.
    - `POST /admin/payments/{id}/approve`: Admin verifies the proof. The service layer updates the payment status to `success`, updates the order to `paid`, and triggers notifications.
  - **Admin Moderation APIs**: Endpoints to approve/reject stores, hide products (`is_hidden`), manage users, and write to the `audit_logs` table on every state change.

- **4. Background Jobs & Caching:**
  - **ARQ (Redis)**: Offload heavy tasks to background workers. For example, when an admin approves a store or payment, a background job inserts a `notifications` record and sends an email.
  - **Redis Caching**: Cache the `platform_settings` singleton, trending products, and active store data to minimize database load.

---

## 4. SQL Execution Steps for Supabase (Clean Database Setup)

*Note: Since you are creating a completely new database, run these fragments sequentially in the Supabase SQL Editor to build the schema from scratch.*

### Fragment 1: Core Setup & Enums (Run First)
```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS pg_uuidv7;

CREATE TYPE user_role AS ENUM ('admin', 'seller', 'customer');
CREATE TYPE store_role AS ENUM ('owner', 'staff');
CREATE TYPE store_status AS ENUM ('pending', 'approved', 'rejected', 'suspended');
CREATE TYPE product_status AS ENUM ('draft', 'active', 'archived');
CREATE TYPE order_status AS ENUM ('pending', 'paid', 'shipped', 'delivered', 'cancelled');
CREATE TYPE payment_status AS ENUM ('pending', 'success', 'failed');
```

### Fragment 2: User, Store, & Product Tables
```sql
CREATE TABLE public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    role user_role NOT NULL DEFAULT 'customer',
    avatar_url TEXT,
    phone TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    deleted_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.stores (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v7(),
    owner_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    logo_url TEXT,
    banner_url TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    approval_status store_status DEFAULT 'pending',
    approved_by UUID REFERENCES public.users(id),
    approved_at TIMESTAMPTZ,
    rejection_reason TEXT,
    deleted_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.store_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v7(),
    store_id UUID NOT NULL REFERENCES public.stores(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    role store_role NOT NULL DEFAULT 'staff',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(store_id, user_id)
);

CREATE TABLE public.products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v7(),
    store_id UUID NOT NULL REFERENCES public.stores(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    category VARCHAR(100),
    description TEXT,
    price NUMERIC(10,2) NOT NULL CHECK (price >= 0),
    stock INT NOT NULL DEFAULT 0 CHECK (stock >= 0),
    status product_status NOT NULL DEFAULT 'draft',
    is_hidden BOOLEAN DEFAULT FALSE,
    image_url TEXT,
    created_by UUID NOT NULL REFERENCES public.users(id),
    approved_by UUID REFERENCES public.users(id),
    approved_at TIMESTAMPTZ,
    rejection_reason TEXT,
    deleted_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.product_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v7(),
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    storage_path TEXT NOT NULL,
    public_url TEXT,
    is_primary BOOLEAN NOT NULL DEFAULT FALSE,
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Fragment 3: Shopping, Orders, & Reviews
```sql
CREATE TABLE public.addresses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v7(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    phone TEXT,
    address_line1 TEXT NOT NULL,
    address_line2 TEXT,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    pincode TEXT NOT NULL,
    country TEXT NOT NULL DEFAULT 'India',
    is_default BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v7(),
    user_id UUID NOT NULL REFERENCES public.users(id),
    store_id UUID NOT NULL REFERENCES public.stores(id),
    address_id UUID NOT NULL REFERENCES public.addresses(id),
    subtotal NUMERIC(10,2) NOT NULL DEFAULT 0 CHECK (subtotal >= 0),
    tax_amount NUMERIC(10,2) NOT NULL DEFAULT 0 CHECK (tax_amount >= 0),
    shipping_amount NUMERIC(10,2) NOT NULL DEFAULT 0 CHECK (shipping_amount >= 0),
    platform_fee NUMERIC(10,2) DEFAULT 0.00,
    total_amount NUMERIC(10,2) NOT NULL CHECK (total_amount >= 0),
    status order_status NOT NULL DEFAULT 'pending',
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v7(),
    order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
    product_name TEXT NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    unit_price NUMERIC(10,2) NOT NULL CHECK (unit_price >= 0),
    line_total NUMERIC(10,2) NOT NULL CHECK (line_total >= 0),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.wishlists (
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (user_id, product_id)
);

CREATE TABLE public.reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v7(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Fragment 4: Payments & Manual Verification
```sql
CREATE TABLE public.payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v7(),
    order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    amount NUMERIC(10,2) NOT NULL CHECK (amount >= 0),
    payment_method TEXT,
    provider TEXT,
    provider_payment_id TEXT,
    transaction_id TEXT,
    status payment_status NOT NULL DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.payment_proofs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v7(),
    payment_id UUID NOT NULL REFERENCES public.payments(id) ON DELETE CASCADE,
    order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    uploaded_by UUID NOT NULL REFERENCES public.users(id),
    image_url TEXT NOT NULL,
    amount NUMERIC(12,2) NOT NULL,
    utr_number TEXT,
    remarks TEXT,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    verified_by UUID REFERENCES public.users(id),
    verified_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Fragment 5: Auditing, Notifications & Settings
```sql
CREATE TABLE public.notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v7(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT NOT NULL,
    reference_id UUID,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v7(),
    performed_by UUID REFERENCES public.users(id),
    action TEXT NOT NULL,
    entity TEXT NOT NULL,
    entity_id UUID,
    old_data JSONB,
    new_data JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.inventory_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v7(),
    product_id UUID REFERENCES public.products(id),
    performed_by UUID REFERENCES public.users(id),
    old_stock INTEGER,
    new_stock INTEGER,
    reason TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.platform_settings (
    id BOOLEAN PRIMARY KEY DEFAULT TRUE CHECK (id), 
    platform_name TEXT DEFAULT 'Botanic2',
    support_email TEXT,
    upi_id TEXT,
    qr_image_url TEXT,
    maintenance_mode BOOLEAN DEFAULT FALSE,
    allow_store_registration BOOLEAN DEFAULT TRUE
);
INSERT INTO public.platform_settings (id) VALUES (TRUE) ON CONFLICT DO NOTHING;
```

### Fragment 6: Triggers, Functions, & Indexes
```sql
-- Atomic Stock Decrement
CREATE OR REPLACE FUNCTION public.decrement_product_stock(p_product_id UUID, p_quantity INT)
RETURNS BOOLEAN
LANGUAGE plpgsql
AS $$
BEGIN
  UPDATE public.products
  SET stock = stock - p_quantity
  WHERE id = p_product_id AND stock >= p_quantity;
  IF FOUND THEN
    RETURN TRUE;
  ELSE
    RETURN FALSE;
  END IF;
END;
$$;

-- Auto User Sync from Supabase Auth
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.users (id, email, first_name, last_name, avatar_url, role)
  VALUES (
    new.id, 
    new.email, 
    COALESCE(split_part(new.raw_user_meta_data->>'full_name', ' ', 1), split_part(new.email, '@', 1)),
    split_part(new.raw_user_meta_data->>'full_name', ' ', 2),
    new.raw_user_meta_data->>'avatar_url',
    'customer'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Performance Indexes
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_stores_slug ON public.stores(slug);
CREATE INDEX IF NOT EXISTS idx_stores_status ON public.stores(approval_status);
CREATE INDEX IF NOT EXISTS idx_products_slug ON public.products(slug);
CREATE INDEX IF NOT EXISTS idx_products_store ON public.products(store_id);
CREATE INDEX IF NOT EXISTS idx_orders_user ON public.orders(user_id);
CREATE INDEX IF NOT EXISTS idx_payments_order ON public.payments(order_id);
```

### Fragment 7: Supabase Storage Buckets & Security Policies
```sql
-- 1. Create the Storage Buckets
-- We set payment-proofs to false (private) so it cannot be accessed without Auth.
INSERT INTO storage.buckets (id, name, public) VALUES ('avatars', 'avatars', true) ON CONFLICT DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('product-images', 'product-images', true) ON CONFLICT DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('payment-proofs', 'payment-proofs', false) ON CONFLICT DO NOTHING;

-- Enable Row Level Security (RLS) on the storage objects table
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- 2. Avatars Bucket Policies
CREATE POLICY "Avatar images are publicly accessible." ON storage.objects FOR SELECT USING (bucket_id = 'avatars');
-- Enforce that a user can only upload an avatar if the folder name matches their user UUID
CREATE POLICY "Users can upload their own avatars." ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

-- 3. Product Images Bucket Policies
-- *Draft Protection Note*: Because storage URLs are unguessable UUIDs, keeping the bucket public is safe.
-- Draft images are protected because the backend API will never serve the URL of a 'draft' product to a buyer.
CREATE POLICY "Product images are publicly accessible." ON storage.objects FOR SELECT USING (bucket_id = 'product-images');
CREATE POLICY "Sellers can upload product images." ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'product-images');
CREATE POLICY "Sellers can delete product images." ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'product-images');

-- 4. Payment Proofs Bucket Policies (Strictly Private)
-- Customers can only see their own payment proofs. Admins can see all payment proofs.
CREATE POLICY "Users can view their own payment proofs or Admins can view all." ON storage.objects FOR SELECT TO authenticated USING (
  bucket_id = 'payment-proofs' AND (
    auth.uid()::text = (storage.foldername(name))[1] OR 
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
  )
);
-- Customers can upload payment proofs (enforcing that they must save it in a folder named with their user_id)
CREATE POLICY "Users can upload payment proofs." ON storage.objects FOR INSERT TO authenticated WITH CHECK (
  bucket_id = 'payment-proofs' AND auth.uid()::text = (storage.foldername(name))[1]
);
```
