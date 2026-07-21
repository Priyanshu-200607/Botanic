# Botanic2 - Final Implementation Plan

## Executive Summary

Botanic2 is a multi-vendor botanical marketplace with a **production-ready frontend (Next.js 16 + React 19)** but a **skeleton backend (FastAPI)**. The database schema exists in SQL files but hasn't been applied to Supabase. The backend requires full implementation of all API endpoints, authentication, business logic, and background workers.

---

## 1. Current Codebase Analysis

### 1.1 Frontend (Advanced - 90% Complete)
| Component | Status | Details |
|-----------|--------|---------|
| Public Routes (Home, Shop, Product, About, Contact) | ✅ Complete | Premium glassmorphic UI, responsive, SSR/CSR hybrid |
| Auth Routes (Login, Signup) | ✅ Complete | Ready for Supabase Auth integration |
| Cart & Checkout | ✅ Complete | Full UI with steppers, address forms, payment section |
| Seller Dashboard | ✅ Complete | Inventory management, shop settings, profile |
| Admin Dashboard | ✅ Complete | Store approval queue, analytics, store management table |
| Services Layer | ⚠️ Stubs Only | `auth.ts`, `cart.ts`, `product.ts`, etc. exist but empty |
| State Management | ✅ Configured | Zustand + TanStack Query ready |

**Issues:**
- Services layer contains zero implementation - all API calls are stubs
- No authentication context/provider wrapping the app
- No React Query provider setup in layout
- Cart/checkout uses hardcoded mock data
- No error boundaries or loading states for API calls

### 1.2 Backend (Architecture Set - 15% Complete)
| Component | Status | Details |
|-----------|--------|---------|
| FastAPI App Entry (`main.py`) | ⚠️ Partial | Only `/products` router active; others commented out |
| Config (`config.py`) | ✅ Complete | Pydantic Settings with env support |
| Database (`database.py`) | ✅ Complete | Async SQLAlchemy with connection pooling |
| Security (`security.py`) | ❌ Empty | JWT verification, password hashing missing |
| Redis (`redis.py`) | ❌ Empty | Cache client and ARQ setup missing |
| Models | ⚠️ Partial | Core models exist but **don't match target schema** |
| Routers | ❌ Empty | All routers except products are empty files |
| Schemas (Pydantic) | ❌ Missing | No `schemas/` directory exists |
| Services Layer | ❌ Missing | No `services/` directory exists |
| Repositories Layer | ❌ Missing | No `repositories/` directory exists |

**Critical Model Gaps (vs. update_plan.sql):**
| Model | Missing Fields |
|-------|----------------|
| `User` | `first_name`, `last_name`, `deleted_at` (has `name` instead) |
| `Store` | `approval_status`, `approved_by`, `approved_at`, `rejection_reason`, `banner_url`, `deleted_at` |
| `Product` | `category`, `is_hidden`, `approved_by`, `approved_at`, `rejection_reason`, `deleted_at` |
| `Order` | `platform_fee` |
| `Cart` | **Entire model missing** |
| `Payment` | No FK to `orders`, `payment_method`/`provider` optional |
| **Missing Tables** | `wishlists`, `notifications`, `audit_logs`, `inventory_logs`, `platform_settings`, `payment_proofs` |

### 1.3 Database Schema
- **Current:** `schema.sql` (basic), `finalsql.sql` (updates), `backup_final_schema.md` (target)
- **Target Schema:** Defined in `update_plan.md` Fragments 1-7 (7 fragments, 374 lines)
- **Status:** Not applied to Supabase; backend models don't match target schema

---

## 2. Issues Summary

### 2.1 Critical Blockers
1. **No Authentication Backend** - `security.py` empty, no JWT verification, no RBAC dependencies
2. **Models Out of Sync** - Backend SQLAlchemy models missing 15+ columns and 6 entire tables from target schema
3. **No API Endpoints** - 7/8 routers are empty files
4. **No Business Logic Layer** - Services/Repositories directories don't exist
5. **No Pydantic Schemas** - Request/response validation missing
6. **Cart Model Missing** - Required for checkout flow
7. **No Background Workers** - ARQ/Redis not configured

### 2.2 Architecture Violations
1. **Direct DB in Routers** - `products.py` uses raw SQLAlchemy in router (should use Repository → Service → Router)
2. **No Error Handling** - No custom exceptions, no global exception handler
3. **No Input Validation** - No Pydantic schemas for request bodies
4. **CORS Wildcard** - `allow_origins=["*"]` in production config

### 2.3 Frontend Integration Gaps
1. **Services are stubs** - No actual API calls
2. **No Auth Context** - No way to get JWT token for API calls
3. **No Query Client Provider** - TanStack Query not initialized
4. **Hardcoded Data** - Cart, checkout, product pages use static data

---

## 3. Suggestions & Recommendations

### 3.1 Immediate Actions (Before Writing Code)
1. **Apply Target Schema to Supabase** - Run all 7 fragments from `update_plan.md` in order
2. **Update Backend Models** - Align SQLAlchemy models with applied schema
3. **Create Missing Directories** - `schemas/`, `services/`, `repositories/`, `exceptions/`, `middleware/`
4. **Implement Security Module** - JWT verification, RBAC dependencies, password utilities
5. **Set Up Redis/ARQ** - Configure connection pooling and worker entry point

### 3.2 Architecture Improvements
1. **Enforce Clean Architecture:**
   ```
   Router → Service → Repository → Model
   ```
2. **Add Global Exception Handler** - Standardize error responses
3. **Implement Request ID Middleware** - For tracing/logging
4. **Add Rate Limiting** - Redis-based, per-user/IP
5. **Structured Logging** - Use `structlog` with request context

### 3.3 Database Optimizations
1. **Add Composite Indexes** for common query patterns:
   ```sql
   CREATE INDEX idx_products_store_status ON products(store_id, status);
   CREATE INDEX idx_orders_user_status ON orders(user_id, status);
   CREATE INDEX idx_payment_proofs_status ON payment_proofs(status, created_at);
   ```
2. **Partition `audit_logs`** by month for performance
3. **Use `pg_stat_statements`** to monitor slow queries

### 3.4 Security Hardening
1. **JWT Verification** - Validate `aud`, `iss`, `exp`, signature against Supabase JWKS
2. **RBAC Dependencies** - `get_current_user`, `require_admin`, `require_seller`, `require_owner_or_admin`
3. **IDOR Prevention** - All queries must filter by ownership (user_id, store_id)
4. **File Upload Validation** - MIME type, size limits, virus scanning
5. **CORS** - Restrict to frontend domain only

---

## 4. PostgreSQL Database Suggestions

### 4.1 Target Schema (from update_plan.md)
The 7 fragments in `update_plan.md` represent the **single source of truth**. Key tables:

| Table | Purpose | Key Columns |
|-------|---------|-------------|
| `users` | Extended profile | `first_name`, `last_name`, `role`, `is_active`, `deleted_at` |
| `stores` | Vendor stores | `approval_status`, `approved_by`, `rejection_reason`, `banner_url` |
| `store_members` | Staff access | `role` (owner/staff) |
| `products` | Plant listings | `category`, `is_hidden`, `status`, `approved_by`, `rejection_reason` |
| `product_images` | Multiple images | `storage_path`, `public_url`, `is_primary`, `sort_order` |
| `addresses` | Shipping addresses | `full_name`, `phone`, `address_line1/2`, `city`, `state`, `pincode` |
| `orders` | Multi-vendor orders | `subtotal`, `tax_amount`, `shipping_amount`, `platform_fee`, `total_amount` |
| `order_items` | Frozen prices | `product_name`, `quantity`, `unit_price`, `line_total` |
| `wishlists` | Saved items | Composite PK (`user_id`, `product_id`) |
| `reviews` | Product reviews | `rating` (1-5), `comment` |
| `payments` | Payment records | `payment_method`, `provider`, `provider_payment_id`, `status` |
| `payment_proofs` | Manual QR proofs | `image_url`, `amount`, `utr_number`, `status`, `verified_by` |
| `notifications` | User alerts | `title`, `message`, `type`, `reference_id`, `is_read` |
| `audit_logs` | Admin actions | `action`, `entity`, `entity_id`, `old_data`, `new_data` (JSONB) |
| `inventory_logs` | Stock history | `old_stock`, `new_stock`, `reason`, `performed_by` |
| `platform_settings` | Global config | Singleton (`id` BOOLEAN PK), `upi_id`, `qr_image_url`, `maintenance_mode` |

### 4.2 Critical Functions & Triggers
```sql
-- Atomic stock decrement (prevents overselling)
decrement_product_stock(p_product_id UUID, p_quantity INT) RETURNS BOOLEAN

-- Auto-sync Supabase Auth users
handle_new_user() TRIGGER ON auth.users

-- Updated_at triggers (recommended for all tables)
```

### 4.3 Storage Buckets & RLS Policies
| Bucket | Public | Policies |
|--------|--------|----------|
| `avatars` | Yes | Users upload to own folder (`auth.uid()` = folder) |
| `product-images` | Yes | Sellers upload; public read |
| `payment-proofs` | **No** | Users read own; Admins read all; Users upload to own folder |

### 4.4 Recommended Additional Indexes
```sql
-- Query optimization
CREATE INDEX idx_products_category_status ON products(category, status);
CREATE INDEX idx_orders_store_status ON orders(store_id, status);
CREATE INDEX idx_notifications_user_read ON notifications(user_id, is_read);
CREATE INDEX idx_audit_logs_entity ON audit_logs(entity, entity_id);
CREATE INDEX idx_inventory_logs_product ON inventory_logs(product_id, created_at DESC);
```

---

## 5. Backend Implementation Features

### 5.1 Module Structure (Clean Architecture)
```
backend/app/
├── core/
│   ├── config.py          ✅
│   ├── database.py        ✅
│   ├── security.py        🔄 JWT, RBAC, password utils
│   ├── redis.py           🔄 Redis client, ARQ setup
│   ├── exceptions.py      🆕 Custom exceptions, handlers
│   └── middleware.py      🆕 Request ID, rate limit, logging
├── models/                🔄 Update to match target schema
│   ├── user.py            🔄 Add first_name, last_name, deleted_at
│   ├── store.py           🔄 Add approval fields, banner_url
│   ├── product.py         🔄 Add category, is_hidden, moderation fields
│   ├── order.py           🔄 Add platform_fee
│   ├── cart.py            🆕 Create Cart, CartItem models
│   ├── payment.py         🔄 Add FK to orders, payment_proofs relation
│   ├── review.py          ✅
│   ├── wishlist.py        🆕 Create Wishlist model
│   ├── notification.py    🆕 Create Notification model
│   ├── audit_log.py       🆕 Create AuditLog model
│   ├── inventory_log.py   🆕 Create InventoryLog model
│   └── platform_settings.py 🆕 Create PlatformSettings model
├── schemas/               🆕 Pydantic v2 schemas
│   ├── user.py
│   ├── store.py
│   ├── product.py
│   ├── order.py
│   ├── cart.py
│   ├── payment.py
│   ├── review.py
│   ├── wishlist.py
│   ├── notification.py
│   ├── admin.py
│   └── common.py          # Pagination, filters, base responses
├── repositories/          🆕 Data access layer
│   ├── base.py            # BaseRepository with CRUD
│   ├── user.py
│   ├── store.py
│   ├── product.py
│   ├── order.py
│   ├── cart.py
│   ├── payment.py
│   └── ...
├── services/              🆕 Business logic layer
│   ├── auth.py            # JWT verification (trigger handles user sync automatically)
│   ├── user.py
│   ├── store.py           # Approval workflow
│   ├── product.py         # Moderation, stock management
│   ├── cart.py            # Add/remove/update, merge guest cart
│   ├── order.py           # Checkout, status transitions
│   ├── payment.py         # Manual QR flow, proof verification
│   ├── notification.py    # Create, mark read, push to ARQ
│   ├── audit.py           # Log admin actions
│   ├── inventory.py       # Atomic decrement, logging
│   └── platform.py        # Settings singleton
├── api/v1/                🔄 Implement all routers
│   ├── auth.py            🆕 Login, me, refresh
│   ├── users.py           🆕 Profile, addresses
│   ├── stores.py          🆕 CRUD, approval, members
│   ├── products.py        🔄 Add create/update/delete, moderation
│   ├── cart.py            🆕 Full cart management
│   ├── orders.py          🆕 Create, list, details, seller views
│   ├── payments.py        🆕 Proof upload, admin verification
│   ├── reviews.py         🆕 CRUD (only after delivery)
│   ├── wishlist.py        🆕 Toggle, list
│   ├── dashboard.py       🆕 Seller/Admin analytics
│   ├── admin.py           🆕 User/store/product moderation
│   └── health.py          ✅
├── workers/               🆕 ARQ background jobs
│   ├── __init__.py
│   ├── email.py           # Send notifications
│   ├── inventory.py       # Stock alerts, sync
│   └── analytics.py       # Aggregation jobs
└── main.py                🔄 Include all routers, middleware, exception handlers
```

### 5.2 Core Features to Implement

#### Authentication & RBAC
- `GET /api/v1/auth/me` - Current user profile (from JWT)
  > ⚠️ **No `/auth/sync` endpoint needed** — the `handle_new_user` DB trigger auto-syncs users into `public.users` on first Google OAuth login. Exposing a sync endpoint is redundant and a security risk.
- Dependencies: `get_current_user`, `require_admin`, `require_seller`, `require_store_owner(store_id)`

#### Store Management
- `POST /api/v1/stores` - Create store (status: `pending`)
- `GET /api/v1/stores/me` - Seller's store
- `PUT /api/v1/stores/me` - Update shop settings
- `POST /api/v1/stores/me/members` - Invite staff
- `GET /api/v1/admin/stores` - Admin: list all with filters
- `POST /api/v1/admin/stores/{id}/approve` - Approve store
- `POST /api/v1/admin/stores/{id}/reject` - Reject with reason
- `POST /api/v1/admin/stores/{id}/suspend` - Toggle is_active

#### Product Management
- `POST /api/v1/stores/me/products` - Create product (draft)
- `PUT /api/v1/products/{id}` - Update (seller: own store; admin: any)
- `POST /api/v1/products/{id}/images` - Upload to Supabase Storage
- `GET /api/v1/products` - Public listing (filter: category, store, price, status=active)
- `GET /api/v1/products/{id}` - Product detail
- `POST /api/v1/admin/products/{id}/hide` - Admin hide product
- `POST /api/v1/admin/products/{id}/approve` - Admin approve

#### Cart & Checkout
- `GET /api/v1/cart` - Get user's cart
- `POST /api/v1/cart/items` - Add item (validate stock)
- `PUT /api/v1/cart/items/{id}` - Update quantity
- `DELETE /api/v1/cart/items/{id}` - Remove item
- `POST /api/v1/cart/merge` - Merge guest cart on login
- `POST /api/v1/checkout` - Create order from cart
  - Validate all stock via `decrement_product_stock` RPC
  - Create Order + OrderItems (freeze prices)
  - Create Payment (pending)
  - Clear cart
  - Return order_id + payment QR from platform_settings

#### Manual Payment Flow
- `GET /api/v1/payments/{order_id}/qr` - Get platform QR code
- `POST /api/v1/payments/{order_id}/proof` - Upload proof to Storage, create payment_proofs
- `GET /api/v1/admin/payments/pending` - Admin: list pending proofs
- `POST /api/v1/admin/payments/{proof_id}/approve` - Verify proof
  - Update payment_proofs.status = approved
  - Update payments.status = success
  - Update orders.status = paid
  - Create notifications (buyer, seller)
  - Log audit entry
- `POST /api/v1/admin/payments/{proof_id}/reject` - Reject with remarks

#### Orders
- `GET /api/v1/orders` - Customer: own orders
- `GET /api/v1/orders/{id}` - Order detail (customer or store owner)
- `GET /api/v1/seller/orders` - Seller: orders for their store
- `PUT /api/v1/seller/orders/{id}/ship` - Update to shipped (seller)
- `PUT /api/v1/seller/orders/{id}/deliver` - Update to delivered (seller)
- `POST /api/v1/orders/{id}/cancel` - Cancel (customer: before paid; seller: before shipped)

#### Wishlist
- `GET /api/v1/wishlist` - List user's wishlist
- `POST /api/v1/wishlist/{product_id}` - Add to wishlist
- `DELETE /api/v1/wishlist/{product_id}` - Remove from wishlist

#### Reviews
- `GET /api/v1/products/{id}/reviews` - Public reviews
- `POST /api/v1/products/{id}/reviews` - Create (only if delivered)
- `PUT /api/v1/reviews/{id}` - Update own review

#### Notifications
- `GET /api/v1/notifications` - List (paginated, filter unread)
- `PUT /api/v1/notifications/{id}/read` - Mark read
- `PUT /api/v1/notifications/read-all` - Mark all read

#### Admin Dashboard
- `GET /api/v1/admin/dashboard/stats` - Platform metrics
- `GET /api/v1/admin/users` - List users (filter, paginate)
- `PUT /api/v1/admin/users/{id}/role` - Change role
- `PUT /api/v1/admin/users/{id}/toggle-active` - Suspend/activate
- `GET /api/v1/admin/audit-logs` - Filterable audit trail
- `GET /api/v1/admin/platform-settings` - Get settings
- `PUT /api/v1/admin/platform-settings` - Update settings (UPI, QR, maintenance)

#### Seller Dashboard
- `GET /api/v1/seller/dashboard/stats` - Revenue, orders, products
- `GET /api/v1/seller/dashboard/recent-orders` - Recent orders
- `GET /api/v1/seller/dashboard/top-products` - Best sellers

---

## 6. Current Stage Report

### 6.1 Overall Progress: ~25%
| Layer | Completion | Notes |
|-------|------------|-------|
| Database Schema (SQL) | 100% designed | Not applied to Supabase |
| Frontend UI | 90% | Services layer empty |
| Backend Config/Infra | 40% | Missing security, redis, middleware |
| Backend Models | 35% | Out of sync with target schema |
| Backend Repositories | 0% | Directory missing |
| Backend Services | 0% | Directory missing |
| Backend Schemas | 0% | Directory missing |
| API Endpoints | 10% | Only products GET implemented |
| Auth/RBAC | 0% | security.py empty |
| Background Workers | 0% | ARQ not configured |
| Testing | 0% | No test files |
| Deployment Config | 0% | No Docker, Render config |

### 6.2 Ready to Start
- ✅ Frontend UI complete and documented
- ✅ Target database schema finalized in `update_plan.md`
- ✅ Architecture patterns defined (clean architecture, RBAC, manual payments)
- ✅ Tech stack locked (FastAPI, SQLAlchemy async, Pydantic v2, Redis, ARQ)

### 6.3 Blockers
1. **Supabase project not provisioned** - Need to run SQL fragments
2. **Backend models don't match schema** - Must regenerate after SQL applied
3. **Missing foundational modules** - security, redis, exceptions, middleware

---

## 7. Phase-by-Phase Implementation Plan

### Phase 0: Infrastructure Setup (Week 1)
**Goal:** Provision database, align models, establish foundation

| Task | Description | Deliverable |
|------|-------------|-------------|
| 0.1 | Provision Supabase project | Project URL, keys, database password |
| 0.2 | Run all 7 SQL fragments from `update_plan.md` | Schema applied, functions created, buckets created |
| 0.3 | Configure Supabase Auth (Google OAuth) | OAuth credentials, redirect URLs |
| 0.4 | Update `backend/app/models/*.py` to match applied schema | All 15 tables, correct columns, relationships |
| 0.5 | Create `schemas/`, `repositories/`, `services/`, `exceptions/`, `middleware/` directories | Empty module structure |
| 0.6 | Implement `core/security.py` | JWT verification, `get_current_user`, RBAC deps |
| 0.7 | Implement `core/redis.py` | Redis client, ARQ pool, cache helpers |
| 0.8 | Implement `core/exceptions.py` | Custom exceptions, global handler |
| 0.9 | Implement `core/middleware.py` | Request ID, structured logging, rate limiting |
| 0.10 | Update `main.py` with middleware, exception handlers, all routers | Working FastAPI app with health check |

**Verification:** `GET /health` returns 200; JWT validation works; Redis connects.

---

### Phase 1: Authentication & User Management (Week 1-2)
**Goal:** Complete auth flow, user profiles, addresses

| Task | Description | Endpoints |
|------|-------------|-----------|
| 1.1 | Create `schemas/user.py` | UserResponse, UserUpdate, AddressCreate, AddressResponse |
| 1.2 | Create `repositories/user.py` | CRUD for users, addresses |
| 1.3 | Create `services/auth.py` | JWT verification, user sync from Supabase |
| 1.4 | Create `services/user.py` | Profile update, address CRUD |
| 1.5 | Implement `api/v1/auth.py` | `GET /me`, `POST /sync` |
| 1.6 | Implement `api/v1/users.py` | `PUT /me`, `GET/POST/PUT/DELETE /addresses` |
| 1.7 | Add RBAC dependencies to all protected routes | `require_admin`, `require_seller` |

**Verification:** Frontend login works; `/me` returns user; addresses CRUD works.

---

### Phase 2: Store & Product Management (Week 2-3)
**Goal:** Seller can create store, manage products; Admin can moderate

| Task | Description | Endpoints |
|------|-------------|-----------|
| 2.1 | Create `schemas/store.py`, `schemas/product.py` | StoreCreate, StoreUpdate, ProductCreate, ProductUpdate, ProductImageResponse |
| 2.2 | Create `repositories/store.py`, `repositories/product.py` | Store/Product CRUD, store members, product images |
| 2.3 | Create `services/store.py` | Store creation (pending), approval workflow, member invites |
| 2.4 | Create `services/product.py` | Product CRUD, stock update, image upload, moderation |
| 2.5 | Implement `api/v1/stores.py` | Seller: `POST /`, `GET/PUT /me`, `POST /me/members`; Admin: `GET /`, `POST /{id}/approve`, `POST /{id}/reject`, `POST /{id}/suspend` |
| 2.6 | Implement `api/v1/products.py` | Seller: `POST /`, `PUT /{id}`, `DELETE /{id}`, `POST /{id}/images`; Public: `GET /`, `GET /{id}`; Admin: `POST /{id}/hide`, `POST /{id}/approve` |
| 2.7 | Supabase Storage integration | Upload to `product-images` bucket, return public URLs |

**Verification:** Seller creates store → pending; Admin approves → visible; Seller adds products → draft → active.

---

### Phase 3: Cart, Checkout & Orders (Week 3-4)
**Goal:** Complete shopping flow with atomic stock handling

| Task | Description | Endpoints |
|------|-------------|-----------|
| 3.1 | Create `models/cart.py` | Cart, CartItem models (user_id, product_id, quantity) |
| 3.2 | Create `schemas/cart.py`, `schemas/order.py` | CartResponse, CartItemAdd, CheckoutRequest, OrderResponse |
| 3.3 | Create `repositories/cart.py`, `repositories/order.py` | Cart CRUD, Order creation with items |
| 3.4 | Create `services/cart.py` | Add/update/remove items, validate stock, merge guest cart |
| 3.5 | Create `services/order.py` | Checkout: atomic stock decrement via RPC, create order+items+payment, clear cart |
| 3.6 | Implement `api/v1/cart.py` | `GET /`, `POST /items`, `PUT /items/{id}`, `DELETE /items/{id}`, `POST /merge` |
| 3.7 | Implement `api/v1/orders.py` | `POST /checkout`, `GET /` (customer), `GET /{id}`, `GET /seller/orders`, `PUT /seller/orders/{id}/ship`, `PUT /seller/orders/{id}/deliver`, `POST /{id}/cancel` |

**Verification:** Add to cart → checkout → order created with frozen prices → stock decremented atomically.

---

### Phase 4: Manual Payment Flow (Week 4-5)
**Goal:** QR payment upload, admin verification, order completion

| Task | Description | Endpoints |
|------|-------------|-----------|
| 4.1 | Create `schemas/payment.py` | PaymentProofUpload, PaymentProofResponse, PaymentVerification |
| 4.2 | Create `repositories/payment.py` | Payment, PaymentProof CRUD |
| 4.3 | Create `services/payment.py` | Proof upload to `payment-proofs` bucket, verification workflow |
| 4.4 | Implement `api/v1/payments.py` | `GET /{order_id}/qr`, `POST /{order_id}/proof`, `GET /admin/pending`, `POST /admin/{proof_id}/approve`, `POST /admin/{proof_id}/reject` |
| 4.5 | Integrate notifications | On approve: notify buyer (paid), notify seller (new order) |
| 4.6 | Integrate audit logs | Log all admin payment actions |

**Verification:** Customer uploads proof → Admin sees in queue → Admin approves → Order=paid, stock confirmed, notifications sent.

---

### Phase 5: Wishlist, Reviews & Notifications (Week 5)
**Goal:** Complete customer engagement features

| Task | Description | Endpoints |
|------|-------------|-----------|
| 5.1 | Create `models/wishlist.py`, `models/notification.py` | Wishlist, Notification models |
| 5.2 | Create `schemas/wishlist.py`, `schemas/review.py`, `schemas/notification.py` | |
| 5.3 | Create `repositories/wishlist.py`, `repositories/review.py`, `repositories/notification.py` | |
| 5.4 | Create `services/wishlist.py`, `services/review.py`, `services/notification.py` | |
| 5.5 | Implement `api/v1/wishlist.py` | `GET /`, `POST /{product_id}`, `DELETE /{product_id}` |
| 5.6 | Implement `api/v1/reviews.py` | `GET /products/{id}/reviews`, `POST /products/{id}/reviews` (delivered only), `PUT /reviews/{id}` |
| 5.7 | Implement `api/v1/notifications.py` | `GET /`, `PUT /{id}/read`, `PUT /read-all` |

**Verification:** Wishlist toggle works; Reviews only after delivery; Notifications appear in real-time.

---

### Phase 6: Admin & Seller Dashboards (Week 5-6)
**Goal:** Analytics, management interfaces

| Task | Description | Endpoints |
|------|-------------|-----------|
| 6.1 | Create `schemas/admin.py`, `schemas/dashboard.py` | Stats responses, filter params |
| 6.2 | Create `services/dashboard.py`, `services/admin.py` | Aggregation queries, platform settings |
| 6.3 | Implement `api/v1/admin.py` | `GET /dashboard/stats`, `GET /users`, `PUT /users/{id}/role`, `PUT /users/{id}/toggle-active`, `GET /audit-logs`, `GET/PUT /platform-settings` |
| 6.4 | Implement `api/v1/dashboard.py` | Seller: `GET /stats`, `GET /recent-orders`, `GET /top-products`; Admin: platform-wide stats |
| 6.5 | Add Redis caching | Cache platform_settings, dashboard stats (TTL 60s) |

**Verification:** Admin dashboard loads stats; Seller dashboard shows revenue; Platform settings update instantly.

---

### Phase 7: Background Workers & Polish (Week 6-7)
**Goal:** Async processing, production hardening

| Task | Description |
|------|-------------|
| 7.1 | Create `workers/email.py` | Send notification emails via ARQ |
| 7.2 | Create `workers/inventory.py` | Low stock alerts, stock sync |
| 7.3 | Create `workers/analytics.py` | Daily revenue aggregation |
| 7.4 | Configure ARQ worker entry point | `python -m app.workers` |
| 7.5 | Add rate limiting middleware | Per-user/IP limits on auth, checkout, upload |
| 7.6 | File upload validation | MIME, size, image dimensions |
| 7.7 | Input sanitization | XSS prevention, SQL injection prevention |
| 7.8 | Comprehensive error handling | 4xx/5xx mapping, user-friendly messages |
| 7.9 | Request/response logging | Structured logs with request_id, user_id, duration |

---

### Phase 8: Testing & Deployment (Week 7-8)
**Goal:** Quality assurance, production deployment

| Task | Description |
|------|-------------|
| 8.1 | Write unit tests (pytest) | Auth, RBAC, cart, checkout, payments, inventory |
| 8.2 | Write integration tests | Full flows: register→store→product→order→payment |
| 8.3 | Load testing | Locust/k6 for checkout, product listing |
| 8.4 | Dockerfile for backend | Multi-stage build, non-root user |
| 8.5 | Render deployment config | `render.yaml`, environment variables |
| 8.6 | Supabase production config | RLS policies, backup, connection pooling |
| 8.7 | Frontend integration | Connect all services to real API endpoints |
| 8.8 | E2E testing | Playwright/Cypress for critical paths |
| 8.9 | Documentation | API docs (OpenAPI), README, runbooks |
| 8.10 | Go-live checklist | Secrets rotated, monitoring, alerts, rollback plan |

---

## 8. Frontend Integration Checklist

After backend phases complete, connect frontend services:

| Service | Backend Endpoints | Status |
|---------|-------------------|--------|
| `auth.ts` | `/auth/me`, `/auth/sync` | 🔄 Stub |
| `user.ts` | `/users/me`, `/users/addresses` | 🔄 Stub |
| `store.ts` | `/stores/me`, `/stores/me/products` | 🔄 Stub |
| `product.ts` | `/products`, `/products/{id}` | 🔄 Stub |
| `cart.ts` | `/cart/*` | 🔄 Stub |
| `order.ts` | `/orders/*`, `/checkout` | 🔄 Stub |
| `payment.ts` | `/payments/*` | 🔄 Stub |
| `wishlist.ts` | `/wishlist/*` | 🔄 Stub |
| `review.ts` | `/reviews/*` | 🔄 Stub |
| `notification.ts` | `/notifications/*` | 🔄 Stub |
| `dashboard.ts` | `/dashboard/*`, `/admin/*` | 🔄 Stub |

**Required Frontend Changes:**
1. Add `QueryClientProvider` in `app/layout.tsx`
2. Create `AuthContext` with JWT token management
3. Update all service files with actual `fetch`/`axios` calls
4. Replace hardcoded data with React Query hooks
5. Add loading/error states to all components
6. Implement protected route guards for `(seller)`, `(admin)`, `(customer)`

---

## 9. Risk Mitigation

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Supabase schema mismatch | High | High | Apply SQL fragments first, then generate models |
| Manual payment fraud | Medium | High | Strict admin verification, UTR tracking, audit logs |
| Race condition on stock | Medium | High | Use `decrement_product_stock` RPC exclusively |
| IDOR vulnerabilities | High | Critical | Ownership checks in every repository method |
| ARQ worker failures | Medium | Medium | Retry policies, dead letter queue, monitoring |
| Free tier limits (Supabase/Redis) | High | Medium | Cache aggressively, optimize queries, monitor usage |
| File upload abuse | Medium | High | MIME validation, size limits, private buckets |

---

## 10. Success Criteria

### MVP Launch (End of Phase 6)
- [ ] Customer can browse, cart, checkout, upload payment proof
- [ ] Admin can approve stores, verify payments, manage platform
- [ ] Seller can manage store, products, fulfill orders
- [ ] All data persists correctly in Supabase
- [ ] No critical security vulnerabilities

### Production Ready (End of Phase 8)
- [ ] 80%+ test coverage
- [ ] <200ms p95 API latency
- [ ] Zero data loss on payment verification
- [ ] Automated deployments
- [ ] Monitoring & alerting configured
- [ ] Documentation complete

---

## 11. File Reference Quick Links

| File | Purpose |
|------|---------|
| `update_plan.md` | **Primary reference** - Phases, SQL fragments, architecture |
| `final_plan.md` | This document - consolidated plan |
| `PROJECT_OVERVIEW.md` | Project context, roles, workflows |
| `feature_functionality.md` | Feature breakdown by role |
| `chatgpt_pointofview.md` | Architecture recommendations, execution spec |
| `backup_final_schema.md` | Target SQL schema (clean) |
| `side stuff/schema.sql` | Original basic schema |
| `side stuff/finalsql.sql` | Schema with updates |
| `side stuff/schema_updates.sql` | Incremental updates |

---

## 12. Next Immediate Actions

1. **Provision Supabase** and run all 7 SQL fragments from `update_plan.md`
2. **Regenerate backend models** to match applied schema (use SQLAlchemy or manual)
3. **Implement `core/security.py`** - JWT verification is the foundation
4. **Create directory structure** for schemas/repositories/services
5. **Start Phase 0** tasks in parallel where possible

---


## 13. Database Creating Query

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

### Fragment 3: Addresses, Cart, Orders, Wishlists & Reviews
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

-- ✅ FIX #1: Cart tables were missing from all original SQL fragments
CREATE TABLE public.carts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v7(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id)  -- one active cart per user
);

CREATE TABLE public.cart_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v7(),
    cart_id UUID NOT NULL REFERENCES public.carts(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    quantity INT NOT NULL DEFAULT 1 CHECK (quantity > 0),
    added_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(cart_id, product_id)  -- no duplicate products in the same cart
);

-- NOTE (Multi-vendor): One checkout creates ONE ORDER PER STORE.
-- The services/order.py checkout logic must group cart items by store_id
-- and create a separate Order record for each store before clearing the cart.
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

CREATE TABLE public.order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v7(),
    order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,  -- SET NULL preserves history if product deleted
    product_name TEXT NOT NULL,   -- frozen price snapshot
    quantity INT NOT NULL CHECK (quantity > 0),
    unit_price NUMERIC(10,2) NOT NULL CHECK (unit_price >= 0),  -- frozen price snapshot
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
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, product_id)  -- ✅ FIX #5: prevents duplicate reviews from same user on same product
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
    admin_note TEXT,  -- ✅ FIX #7: admin rejection reason stored here
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
    product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
    performed_by UUID REFERENCES public.users(id) ON DELETE SET NULL,
    old_stock INTEGER NOT NULL,
    new_stock INTEGER NOT NULL,
    change_amount INTEGER GENERATED ALWAYS AS (new_stock - old_stock) STORED,  -- auto-computed delta
    reason TEXT NOT NULL,   -- e.g. 'checkout', 'manual_adjustment', 'restock'
    order_id UUID REFERENCES public.orders(id) ON DELETE SET NULL,  -- link to order that caused the change
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
-- ================================================================
-- FUNCTION: Atomic Stock Decrement (prevents overselling)
-- ✅ FIX #4: Now also writes to inventory_logs for stock history
-- ================================================================
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
    -- Lock the row to prevent race conditions on concurrent checkouts
    SELECT stock INTO v_old_stock
    FROM public.products
    WHERE id = p_product_id
    FOR UPDATE;

    IF v_old_stock IS NULL OR v_old_stock < p_quantity THEN
        RETURN FALSE;
    END IF;

    v_new_stock := v_old_stock - p_quantity;

    UPDATE public.products
    SET stock = v_new_stock, updated_at = NOW()
    WHERE id = p_product_id;

    -- Write inventory log entry so stock history is preserved
    INSERT INTO public.inventory_logs (product_id, performed_by, old_stock, new_stock, reason, order_id)
    VALUES (p_product_id, p_performed_by, v_old_stock, v_new_stock, 'checkout', p_order_id);

    RETURN TRUE;
END;
$$;

-- ================================================================
-- FUNCTION: Auto-sync Supabase Auth user → public.users
-- Fires on every new signup (Google OAuth or email).
-- ✅ FIX #2: This trigger makes POST /auth/sync endpoint unnecessary.
-- ✅ FIX #3: Correctly handles multi-word last names & single-word names.
-- ================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
DECLARE
    v_full_name TEXT;
    v_first_name TEXT;
    v_last_name TEXT;
BEGIN
    v_full_name := COALESCE(new.raw_user_meta_data->>'full_name', '');

    IF POSITION(' ' IN v_full_name) > 0 THEN
        -- Has a space: first word = first_name, remainder = last_name
        v_first_name := SPLIT_PART(v_full_name, ' ', 1);
        v_last_name  := NULLIF(TRIM(SUBSTRING(v_full_name FROM POSITION(' ' IN v_full_name) + 1)), '');
    ELSE
        -- Single word or empty: whole string is first_name
        v_first_name := NULLIF(v_full_name, '');
        v_last_name  := NULL;
    END IF;

    -- Fallback to email prefix if Google didn't provide a name
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

-- ================================================================
-- FUNCTION: Auto-update updated_at on every row change
-- ✅ FIX #6: Was missing from original plan; applied to all tables
-- ================================================================
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

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

-- ================================================================
-- PERFORMANCE INDEXES
-- ================================================================
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
