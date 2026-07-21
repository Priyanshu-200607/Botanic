# Botanic2 — Supabase Setup Guide

> This guide contains the complete, ready-to-run SQL for your Supabase database, your manual setup checklist, and how Google OAuth works end-to-end.

---

## Part 1 — Complete SQL (Run These in Supabase)

> Run each fragment **in order** in the Supabase SQL Editor. If you need to reset, you can drop all tables and re-run.

---

### Fragment 1: Extensions & Enums *(Run First)*

```sql
-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS pg_uuidv7;
CREATE EXTENSION IF NOT EXISTS "pg_stat_statements"; -- For performance monitoring (Free Tier optimization)

-- Enums
CREATE TYPE user_role AS ENUM ('admin', 'seller', 'customer');
CREATE TYPE store_role AS ENUM ('owner', 'staff');
CREATE TYPE store_status AS ENUM ('pending', 'approved', 'rejected', 'suspended');
CREATE TYPE product_status AS ENUM ('draft', 'active', 'archived');
CREATE TYPE order_status AS ENUM ('pending', 'paid', 'shipped', 'delivered', 'cancelled');
CREATE TYPE payment_status AS ENUM ('pending', 'success', 'failed');
```

---

### Fragment 2: Users, Stores, Store Members, Products, Product Images

```sql
-- Users (mirrors auth.users, auto-populated by trigger in Fragment 6)
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

-- Stores
CREATE TABLE public.stores (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v7(),
    owner_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    logo_url TEXT,
    banner_url TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    approval_status store_status NOT NULL DEFAULT 'pending',
    approved_by UUID REFERENCES public.users(id),
    approved_at TIMESTAMPTZ,
    rejection_reason TEXT,
    deleted_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Store Members (staff access control)
CREATE TABLE public.store_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v7(),
    store_id UUID NOT NULL REFERENCES public.stores(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    role store_role NOT NULL DEFAULT 'staff',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(store_id, user_id)
);

-- Products
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
    is_hidden BOOLEAN NOT NULL DEFAULT FALSE,
    image_url TEXT,  -- legacy single image; prefer product_images table
    created_by UUID NOT NULL REFERENCES public.users(id),
    approved_by UUID REFERENCES public.users(id),
    approved_at TIMESTAMPTZ,
    rejection_reason TEXT,
    deleted_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Product Images (multiple images per product)
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

---

### Fragment 3: Addresses, Cart, Orders, Wishlists, Reviews

```sql
-- Addresses
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

-- ✅ FIX: Cart tables (were MISSING from MASTER_PLAN fragments)
CREATE TABLE public.carts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v7(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id)  -- one cart per user
);

CREATE TABLE public.cart_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v7(),
    cart_id UUID NOT NULL REFERENCES public.carts(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    quantity INT NOT NULL DEFAULT 1 CHECK (quantity > 0),
    added_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(cart_id, product_id)  -- no duplicate products in cart
);

-- Orders (one order per store per checkout in multi-vendor setup)
CREATE TABLE public.orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v7(),
    user_id UUID NOT NULL REFERENCES public.users(id),
    store_id UUID NOT NULL REFERENCES public.stores(id),
    address_id UUID NOT NULL REFERENCES public.addresses(id),
    subtotal NUMERIC(10,2) NOT NULL DEFAULT 0 CHECK (subtotal >= 0),
    tax_amount NUMERIC(10,2) NOT NULL DEFAULT 0 CHECK (tax_amount >= 0),
    shipping_amount NUMERIC(10,2) NOT NULL DEFAULT 0 CHECK (shipping_amount >= 0),
    platform_fee NUMERIC(10,2) NOT NULL DEFAULT 0.00 CHECK (platform_fee >= 0),
    total_amount NUMERIC(10,2) NOT NULL CHECK (total_amount >= 0),
    status order_status NOT NULL DEFAULT 'pending',
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Order Items (prices frozen at time of purchase)
CREATE TABLE public.order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v7(),
    order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,  -- SET NULL so history is preserved if product deleted
    product_name TEXT NOT NULL,  -- frozen snapshot
    quantity INT NOT NULL CHECK (quantity > 0),
    unit_price NUMERIC(10,2) NOT NULL CHECK (unit_price >= 0),  -- frozen snapshot
    line_total NUMERIC(10,2) NOT NULL CHECK (line_total >= 0),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Wishlists
CREATE TABLE public.wishlists (
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (user_id, product_id)
);

-- Reviews (✅ FIX: added UNIQUE constraint to prevent duplicate reviews)
CREATE TABLE public.reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v7(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, product_id)  -- ✅ one review per user per product
);
```

---

### Fragment 4: Payments & Manual Verification

```sql
-- Payments (one payment per order)
CREATE TABLE public.payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v7(),
    order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    amount NUMERIC(10,2) NOT NULL CHECK (amount >= 0),
    payment_method TEXT DEFAULT 'manual_upi',
    provider TEXT,
    provider_payment_id TEXT,
    transaction_id TEXT,
    status payment_status NOT NULL DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(order_id)  -- one payment record per order
);

-- Payment Proofs (buyer uploads screenshot)
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
    admin_note TEXT,  -- ✅ added: rejection reason from admin
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

### Fragment 5: Notifications, Auditing, Inventory Logs, Platform Settings

```sql
-- Notifications
CREATE TABLE public.notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v7(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT NOT NULL,  -- e.g. 'payment_approved', 'order_shipped', 'store_approved'
    reference_id UUID,   -- e.g. order_id or store_id
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Audit Logs (admin action history)
CREATE TABLE public.audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v7(),
    performed_by UUID REFERENCES public.users(id) ON DELETE SET NULL,
    action TEXT NOT NULL,       -- e.g. 'APPROVE_STORE', 'REJECT_PAYMENT'
    entity TEXT NOT NULL,       -- e.g. 'store', 'payment_proof'
    entity_id UUID,
    old_data JSONB,
    new_data JSONB,
    ip_address TEXT,            -- ✅ added: for security traceability
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Inventory Logs (stock change history)
CREATE TABLE public.inventory_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v7(),
    product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
    performed_by UUID REFERENCES public.users(id) ON DELETE SET NULL,
    old_stock INTEGER NOT NULL,
    new_stock INTEGER NOT NULL,
    change_amount INTEGER GENERATED ALWAYS AS (new_stock - old_stock) STORED,  -- ✅ auto-computed
    reason TEXT NOT NULL,  -- e.g. 'checkout', 'manual_adjustment', 'restock'
    order_id UUID REFERENCES public.orders(id) ON DELETE SET NULL,  -- ✅ link to the order that caused it
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Platform Settings (singleton row, id=TRUE enforces only one row)
CREATE TABLE public.platform_settings (
    id BOOLEAN PRIMARY KEY DEFAULT TRUE CHECK (id),  -- singleton pattern
    platform_name TEXT NOT NULL DEFAULT 'Botanic2',
    support_email TEXT,
    upi_id TEXT,
    qr_image_url TEXT,
    maintenance_mode BOOLEAN NOT NULL DEFAULT FALSE,
    allow_store_registration BOOLEAN NOT NULL DEFAULT TRUE,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
-- Seed the one and only row
INSERT INTO public.platform_settings (id) VALUES (TRUE) ON CONFLICT DO NOTHING;
```

---

### Fragment 6: Triggers, Functions & Indexes

```sql
-- ============================================================
-- FUNCTION: Auto-sync new Supabase Auth user → public.users
-- ============================================================
-- This trigger fires automatically when a user signs up (Google OAuth or email).
-- Because of this trigger, you do NOT need a /auth/sync API endpoint.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
DECLARE
    v_full_name TEXT;
    v_first_name TEXT;
    v_last_name TEXT;
BEGIN
    v_full_name := COALESCE(new.raw_user_meta_data->>'full_name', '');
    
    -- ✅ FIX: Correctly split full name (handles multi-word last names)
    IF POSITION(' ' IN v_full_name) > 0 THEN
        v_first_name := SPLIT_PART(v_full_name, ' ', 1);
        v_last_name  := NULLIF(TRIM(SUBSTRING(v_full_name FROM POSITION(' ' IN v_full_name) + 1)), '');
    ELSE
        v_first_name := NULLIF(v_full_name, '');
        v_last_name  := NULL;
    END IF;
    
    -- Fallback: use email prefix if no name provided
    IF v_first_name IS NULL THEN
        v_first_name := SPLIT_PART(new.email, '@', 1);
    END IF;

    INSERT INTO public.users (id, email, first_name, last_name, avatar_url, role)
    VALUES (
        new.id,
        new.email,
        v_first_name,
        v_last_name,
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

-- ============================================================
-- FUNCTION: Atomic Stock Decrement (prevents overselling)
-- ✅ FIX: Now also writes to inventory_logs
-- ============================================================
CREATE OR REPLACE FUNCTION public.decrement_product_stock(
    p_product_id UUID,
    p_quantity INT,
    p_order_id UUID,
    p_performed_by UUID
)
RETURNS BOOLEAN
LANGUAGE plpgsql
AS $$
DECLARE
    v_old_stock INT;
    v_new_stock INT;
BEGIN
    -- Get and lock the current stock row
    SELECT stock INTO v_old_stock
    FROM public.products
    WHERE id = p_product_id
    FOR UPDATE;  -- row-level lock prevents race conditions

    IF v_old_stock IS NULL OR v_old_stock < p_quantity THEN
        RETURN FALSE;
    END IF;

    v_new_stock := v_old_stock - p_quantity;

    -- Atomically decrement stock
    UPDATE public.products
    SET stock = v_new_stock, updated_at = NOW()
    WHERE id = p_product_id;

    -- ✅ FIX: Write inventory log entry
    INSERT INTO public.inventory_logs (product_id, performed_by, old_stock, new_stock, reason, order_id)
    VALUES (p_product_id, p_performed_by, v_old_stock, v_new_stock, 'checkout', p_order_id);

    RETURN TRUE;
END;
$$;

-- ============================================================
-- FUNCTION: Updated_at auto-update trigger
-- ============================================================
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at trigger to all relevant tables
CREATE TRIGGER set_users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE PROCEDURE public.set_updated_at();
CREATE TRIGGER set_stores_updated_at BEFORE UPDATE ON public.stores FOR EACH ROW EXECUTE PROCEDURE public.set_updated_at();
CREATE TRIGGER set_products_updated_at BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE PROCEDURE public.set_updated_at();
CREATE TRIGGER set_addresses_updated_at BEFORE UPDATE ON public.addresses FOR EACH ROW EXECUTE PROCEDURE public.set_updated_at();
CREATE TRIGGER set_carts_updated_at BEFORE UPDATE ON public.carts FOR EACH ROW EXECUTE PROCEDURE public.set_updated_at();
CREATE TRIGGER set_orders_updated_at BEFORE UPDATE ON public.orders FOR EACH ROW EXECUTE PROCEDURE public.set_updated_at();
CREATE TRIGGER set_payments_updated_at BEFORE UPDATE ON public.payments FOR EACH ROW EXECUTE PROCEDURE public.set_updated_at();
CREATE TRIGGER set_payment_proofs_updated_at BEFORE UPDATE ON public.payment_proofs FOR EACH ROW EXECUTE PROCEDURE public.set_updated_at();
CREATE TRIGGER set_reviews_updated_at BEFORE UPDATE ON public.reviews FOR EACH ROW EXECUTE PROCEDURE public.set_updated_at();
CREATE TRIGGER set_platform_settings_updated_at BEFORE UPDATE ON public.platform_settings FOR EACH ROW EXECUTE PROCEDURE public.set_updated_at();

-- ============================================================
-- FUNCTION: Custom Auth Hook to Inject User Role into JWT
-- ============================================================
-- This saves 1 DB query per API request by embedding the role in the JWT
CREATE OR REPLACE FUNCTION public.custom_access_token_hook(event jsonb)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    claims jsonb;
    user_role public.user_role;
BEGIN
    -- Fetch the user role from public.users
    SELECT role INTO user_role FROM public.users WHERE id = (event->>'user_id')::uuid;

    claims := event->'claims';

    IF user_role IS NOT NULL THEN
        -- Inject the role into the app_metadata claims
        claims := jsonb_set(claims, '{app_metadata, role}', to_jsonb(user_role));
    ELSE
        claims := jsonb_set(claims, '{app_metadata, role}', '"customer"');
    END IF;

    -- Update the event object
    event := jsonb_set(event, '{claims}', claims);

    RETURN event;
END;
$$;

-- Grant permissions to supabase_auth_admin (required for Auth Hooks)
GRANT USAGE ON SCHEMA public TO supabase_auth_admin;
GRANT EXECUTE ON FUNCTION public.custom_access_token_hook TO supabase_auth_admin;
REVOKE EXECUTE ON FUNCTION public.custom_access_token_hook FROM authenticated, anon, public;

-- ============================================================
-- FUNCTION: Delete Storage Object on Row Deletion (Auto-cleanup)
-- ============================================================
-- Automatically keeps the 1GB Free Tier storage clean when records are deleted
CREATE OR REPLACE FUNCTION public.delete_storage_object()
RETURNS trigger AS $$
BEGIN
    IF TG_TABLE_NAME = 'product_images' THEN
        DELETE FROM storage.objects WHERE bucket_id = 'product-images' AND name = OLD.storage_path;
    END IF;
    RETURN OLD;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER delete_product_image_on_row_delete
AFTER DELETE ON public.product_images
FOR EACH ROW EXECUTE PROCEDURE public.delete_storage_object();

-- ============================================================
-- PERFORMANCE INDEXES
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON public.users(role);

CREATE INDEX IF NOT EXISTS idx_stores_slug ON public.stores(slug);
CREATE INDEX IF NOT EXISTS idx_stores_status ON public.stores(approval_status);
CREATE INDEX IF NOT EXISTS idx_stores_owner ON public.stores(owner_id);

CREATE INDEX IF NOT EXISTS idx_products_slug ON public.products(slug);
CREATE INDEX IF NOT EXISTS idx_products_store ON public.products(store_id);
CREATE INDEX IF NOT EXISTS idx_products_store_status ON public.products(store_id, status);
CREATE INDEX IF NOT EXISTS idx_products_category_status ON public.products(category, status);

CREATE INDEX IF NOT EXISTS idx_cart_items_cart ON public.cart_items(cart_id);
CREATE INDEX IF NOT EXISTS idx_cart_items_product ON public.cart_items(product_id);

CREATE INDEX IF NOT EXISTS idx_orders_user ON public.orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_store ON public.orders(store_id);
CREATE INDEX IF NOT EXISTS idx_orders_user_status ON public.orders(user_id, status);
CREATE INDEX IF NOT EXISTS idx_orders_store_status ON public.orders(store_id, status);

CREATE INDEX IF NOT EXISTS idx_payments_order ON public.payments(order_id);
CREATE INDEX IF NOT EXISTS idx_payment_proofs_status ON public.payment_proofs(status, created_at);

CREATE INDEX IF NOT EXISTS idx_notifications_user_read ON public.notifications(user_id, is_read);
CREATE INDEX IF NOT EXISTS idx_audit_logs_entity ON public.audit_logs(entity, entity_id);
CREATE INDEX IF NOT EXISTS idx_inventory_logs_product ON public.inventory_logs(product_id, created_at DESC);
```

---

### Fragment 7: Storage Buckets & RLS Policies

```sql
-- ============================================================
-- STORAGE BUCKETS
-- ============================================================
INSERT INTO storage.buckets (id, name, public) VALUES ('avatars', 'avatars', true) ON CONFLICT DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('product-images', 'product-images', true) ON CONFLICT DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('payment-proofs', 'payment-proofs', false) ON CONFLICT DO NOTHING;

-- Note: RLS is enabled by default on storage.objects in new Supabase projects.
-- We do not need to run ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY; as it causes ownership errors.

-- ============================================================
-- AVATARS BUCKET (public read, user can only write own folder)
-- ============================================================
CREATE POLICY "Avatar public read"
ON storage.objects FOR SELECT
USING (bucket_id = 'avatars');

CREATE POLICY "Users upload own avatars"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users update own avatars"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users delete own avatars"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

-- ============================================================
-- PRODUCT IMAGES BUCKET (public read, authenticated sellers write)
-- ============================================================
CREATE POLICY "Product images public read"
ON storage.objects FOR SELECT
USING (bucket_id = 'product-images');

CREATE POLICY "Sellers upload product images"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'product-images');

CREATE POLICY "Sellers delete product images"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'product-images');

-- ============================================================
-- PAYMENT PROOFS BUCKET (private — users see own, admins see all)
-- ============================================================
CREATE POLICY "Payment proofs private read"
ON storage.objects FOR SELECT TO authenticated
USING (
    bucket_id = 'payment-proofs' AND (
        auth.uid()::text = (storage.foldername(name))[1]
        OR EXISTS (
            SELECT 1 FROM public.users
            WHERE id = auth.uid() AND role = 'admin'
        )
    )
);

CREATE POLICY "Users upload own payment proofs"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (
    bucket_id = 'payment-proofs' AND auth.uid()::text = (storage.foldername(name))[1]
);

-- ============================================================
-- TABLE-LEVEL RLS (Enable on public tables)
-- ============================================================
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.carts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.addresses ENABLE ROW LEVEL SECURITY;

-- NOTE: The FastAPI backend connects via the service_role key which BYPASSES RLS.
-- These RLS policies protect direct Supabase client (JS SDK) access from the browser.
-- All API routes go through FastAPI → service_role → no RLS applied.

-- Basic user policies (can be expanded later)
CREATE POLICY "Users can read own profile" ON public.users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Products are public" ON public.products FOR SELECT USING (status = 'active' AND is_hidden = FALSE AND deleted_at IS NULL);
CREATE POLICY "Stores are public" ON public.stores FOR SELECT USING (approval_status = 'approved' AND is_active = TRUE AND deleted_at IS NULL);
CREATE POLICY "Reviews are public" ON public.reviews FOR SELECT USING (TRUE);
CREATE POLICY "Users see own orders" ON public.orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users see own cart" ON public.carts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users see own notifications" ON public.notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users see own addresses" ON public.addresses FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users see own wishlist" ON public.wishlists FOR SELECT USING (auth.uid() = user_id);
```

---

### Fragment 8: Automated Garbage Collection (pg_cron)

> This fragment sets up a daily cron job directly inside Supabase to automatically clean up old data, so you don't need a separate background worker for basic database hygiene.

```sql
-- Enable pg_cron extension (Supabase supports this natively)
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- ============================================================
-- FUNCTION: Garbage Collection Cleanup
-- ============================================================
CREATE OR REPLACE FUNCTION public.cleanup_garbage_data()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    -- 1. Delete abandoned carts (older than 30 days)
    -- Due to ON DELETE CASCADE on cart_items, those are deleted automatically too
    DELETE FROM public.carts 
    WHERE updated_at < NOW() - INTERVAL '30 days';

    -- 2. Delete old read notifications (older than 60 days)
    DELETE FROM public.notifications 
    WHERE is_read = TRUE 
    AND created_at < NOW() - INTERVAL '60 days';

    -- 3. Hard delete soft-deleted records older than 1 year
    -- This permanently removes them from the database to save space
    DELETE FROM public.products WHERE deleted_at < NOW() - INTERVAL '1 year';
    DELETE FROM public.stores WHERE deleted_at < NOW() - INTERVAL '1 year';
    DELETE FROM public.users WHERE deleted_at < NOW() - INTERVAL '1 year';
END;
$$;

-- ============================================================
-- CRON JOB: Run cleanup daily at midnight (00:00)
-- ============================================================
-- Safely unschedule first just in case we run this script multiple times
DO $$
BEGIN
  PERFORM cron.unschedule('daily_garbage_collection');
EXCEPTION WHEN OTHERS THEN
  -- Ignore error if job doesn't exist yet
END $$;

-- Schedule it
SELECT cron.schedule(
    'daily_garbage_collection',  -- job name
    '0 0 * * *',                 -- cron expression (midnight every day)
    'SELECT public.cleanup_garbage_data()'
);
```

---

## Part 2 — Your Manual Setup Checklist

> These are the steps **only you can do** (they require browser access to external dashboards). Do them in order.

---

### Step 1: Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com) → **New Project**
2. Choose your organization, set a strong database password, pick a region close to India (e.g., **ap-south-1 Mumbai** or **Southeast Asia Singapore**)
3. Wait for the project to provision (~2 minutes)
4. From **Project Settings → API**, copy these 4 values into a notepad:
   - `Project URL` → `SUPABASE_URL`
   - `anon public` key → `SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY`
   - From **Project Settings → Database → Connection string** (URI mode) → `DATABASE_URL`

---

### Step 2: Run the SQL Fragments

1. In Supabase, go to **SQL Editor** (left sidebar)
2. Click **New Query**
3. Paste and run **Fragment 1** → click Run → verify no errors
4. Paste and run **Fragment 2** → click Run
5. Continue for **Fragments 3, 4, 5, 6, 7, 8** in order
6. After Fragment 8, verify in **Table Editor** that you see: `users`, `stores`, `products`, `carts`, `cart_items`, `orders`, `payments`, `payment_proofs`, `notifications`, `audit_logs`, `inventory_logs`, `platform_settings`, `addresses`, `wishlists`, `reviews`

---

### Step 3: Configure Google OAuth

> **Goal:** Users click "Sign in with Google" → Google authenticates them → Supabase creates the user → DB trigger populates `public.users` → Frontend gets a JWT. No email verification link is involved for Google OAuth.

#### A. Get Google OAuth Credentials

1. Go to [https://console.cloud.google.com](https://console.cloud.google.com)
2. Create a new project (or use existing) → name it "Botanic2"
3. Go to **APIs & Services → OAuth consent screen**
   - User type: **External**
   - Fill in App name: "Botanic2", support email, developer email
   - Scopes: add `email`, `profile`, `openid`
   - Save and Continue
4. Go to **APIs & Services → Credentials → Create Credentials → OAuth 2.0 Client IDs**
   - Application type: **Web application**
   - Name: "Botanic2 Web"
   - **Authorized Redirect URIs** → Add this exact URL (from Supabase):
     ```
     https://<your-project-ref>.supabase.co/auth/v1/callback
     ```
     *(Find your project ref in Supabase URL: `https://xxxxxxxxxxx.supabase.co`)*
5. Click **Create** → copy the **Client ID** and **Client Secret**

#### B. Enable Google Provider in Supabase

1. In Supabase → **Authentication → Providers → Google**
2. Toggle it **ON**
3. Paste your Google **Client ID** and **Client Secret**
4. Save

#### C. Configure Redirect URLs in Supabase

> This is the fix for the localhost-vs-deployed email problem.

1. In Supabase → **Authentication → URL Configuration**
2. **Site URL:** Set to your **deployed URL** (e.g., `https://botanic2.vercel.app`)
   - This is the base URL used in any auth emails
3. **Redirect URLs:** Add **both** URLs:
   ```
   https://botanic2.vercel.app/**
   http://localhost:3000/**
   ```
   - The `/**` wildcard lets Supabase accept any path under that domain as a valid redirect
4. Save

> **Important:** Google OAuth does **NOT** send a verification email. When a user clicks "Sign in with Google", Google handles all the verification. After Google approves, the user is redirected straight back to your site with a valid session. The email redirect issue only affects Email+Password signup — not Google OAuth.

---

### Step 4: Configure Custom Auth Hook (Role Injection)

> **Goal:** Inject the `user_role` directly into the Supabase JWT so your backend doesn't need to query the database to check roles. This saves massive compute on the Free Tier.

1. In Supabase → **Authentication → Hooks**
2. Under **Custom Access Token (JWT)**, select **Enable custom access token hook**.
3. From the dropdown, select the `custom_access_token_hook` function (created in Fragment 6).
4. Save.

---

### Step 5: Update Your `.env` Files

Create `backend/.env` with:

```env
# Supabase
SUPABASE_URL=https://xxxxxxxxxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
SUPABASE_JWT_SECRET=<from Project Settings → API → JWT Settings → JWT Secret>

# Database (use the Session mode pooler URL for async SQLAlchemy)
DATABASE_URL=postgresql+asyncpg://postgres.xxxxxxxxxxx:<password>@aws-0-ap-south-1.pooler.supabase.com:5432/postgres

# Redis (use Upstash free tier or local Redis)
REDIS_URL=redis://localhost:6379

# App
FRONTEND_URL=http://localhost:3000
SECRET_KEY=<generate with: openssl rand -hex 32>
ENVIRONMENT=development
```

Create `frontend/.env.local` with:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

### Step 6: Verify Everything Works

After running the SQL and setting up OAuth:

1. **Test DB trigger:** In Supabase SQL Editor, check the `users` table is empty
2. **Test OAuth:** Start your frontend → click "Sign in with Google" → complete OAuth → check `users` table — a new row should appear automatically (this proves the trigger works)
3. **Test backend health:** Start the FastAPI backend → visit `http://localhost:8000/health` → should return `{"status": "ok"}`

---

## Part 3 — How Session Management Works

### The Auth Flow (step by step)

```
1. User clicks "Sign in with Google"
2. Frontend calls: supabase.auth.signInWithOAuth({ provider: 'google' })
3. Browser redirects to Google
4. Google redirects back to: https://your-app.com/auth/callback
5. Supabase processes the callback, creates auth.users entry
6. DB Trigger fires → inserts into public.users automatically
7. Supabase returns a JWT (access_token) + refresh_token to the browser
8. Frontend stores the session (Supabase JS SDK handles this in localStorage)
9. For all API calls to FastAPI:
   - Frontend reads the token: const { data: { session } } = await supabase.auth.getSession()
   - Sends it as: Authorization: Bearer <access_token>
10. FastAPI backend:
    - Reads the JWT from Authorization header
    - Verifies signature using SUPABASE_JWT_SECRET
    - Extracts user_id (sub claim)
    - Queries public.users to get the full user profile
    - Proceeds with the request
```

### Token Refresh

The Supabase JS SDK handles refresh automatically. Access tokens expire in 1 hour. The SDK silently exchanges the refresh token for a new access token. You don't need to do anything for this.

### What You Do NOT Need

- ❌ No `/auth/sync` endpoint (trigger handles it)
- ❌ No custom session cookies (Supabase manages sessions)
- ❌ No email verification for Google OAuth users (Google verifies them)
- ❌ No custom JWT signing (Supabase signs all tokens)

