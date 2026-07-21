# Botanic2 — Task Tracker

> **How to use:** Mark a task done by changing `[ ]` to `[x]`.
> Progress is tracked per phase. Update the phase status line as you go.

---

## Phase 0 — Infrastructure & Foundation Setup
> **Goal:** Provision database, align models, establish the skeleton the entire backend runs on.
> **Status:** 🟡 In Progress (30/34 tasks done)

- [x] **0.1** — Provision Supabase project (get Project URL, anon key, service key, DB password)
- [x] **0.2** — Run Fragment 1 in Supabase SQL Editor: Enums & Extensions
- [x] **0.3** — Run Fragment 2: Users, Stores, Store Members, Products, Product Images tables
- [x] **0.4** — Run Fragment 3: Addresses, Orders, Order Items, Wishlists, Reviews tables
- [x] **0.5** — Run Fragment 4: Payments & Payment Proofs tables
- [x] **0.6** — Run Fragment 5: Notifications, Audit Logs, Inventory Logs, Platform Settings tables
- [x] **0.7** — Run Fragment 6: Triggers (handle_new_user), Functions (decrement_product_stock), Indexes
- [x] **0.8** — Run Fragment 7: Storage Buckets (avatars, product-images, payment-proofs) & RLS Policies
- [x] **0.9** — Run Fragment 8: Automated Garbage Collection (pg_cron)
- [ ] **0.10** — Configure Supabase Auth: Enable Google OAuth provider, set redirect URLs
- [ ] **0.11** — Configure Custom Auth Hook for Role Injection in Supabase Dashboard
- [ ] **0.12** — Update `backend/.env` with all Supabase keys, Redis URL, JWT secret
- [x] **0.13** — Update `backend/app/models/user.py` — add `first_name`, `last_name`, `deleted_at`, remove old `name`
- [x] **0.14** — Update `backend/app/models/store.py` — add `approval_status`, `approved_by`, `approved_at`, `rejection_reason`, `banner_url`, `deleted_at`
- [x] **0.15** — Update `backend/app/models/product.py` — add `category`, `is_hidden`, `approved_by`, `approved_at`, `rejection_reason`, `deleted_at`
- [x] **0.16** — Update `backend/app/models/order.py` — add `platform_fee`
- [x] **0.17** — Update `backend/app/models/payment.py` — add proper FK to `orders`, add `payment_proofs` relation
- [x] **0.18** — Create `backend/app/models/cart.py` — Cart, CartItem models
- [x] **0.19** — Create `backend/app/models/wishlist.py` — Wishlist model
- [x] **0.20** — Create `backend/app/models/notification.py` — Notification model
- [x] **0.21** — Create `backend/app/models/audit_log.py` — AuditLog model
- [x] **0.22** — Create `backend/app/models/inventory_log.py` — InventoryLog model
- [x] **0.23** — Create `backend/app/models/platform_settings.py` — PlatformSettings singleton model
- [x] **0.24** — Create directory structure: `schemas/`, `repositories/`, `services/`, `exceptions/`, `middleware/`
- [x] **0.25** — Implement `core/security.py` — JWT decode & verify against Supabase JWKS, `get_current_user` dependency
- [x] **0.26** — Implement `core/security.py` — RBAC deps: `require_admin`, `require_seller`, `require_store_owner`
- [x] **0.27** — Implement `core/redis.py` — Redis async client, ARQ pool, cache get/set helpers
- [x] **0.28** — Implement `core/exceptions.py` — Custom exception classes (NotFound, Forbidden, Conflict, etc.)
- [x] **0.29** — Implement `core/exceptions.py` — Global exception handler registered on FastAPI app
- [x] **0.30** — Implement `core/middleware.py` — Request ID injection middleware
- [x] **0.31** — Implement `core/middleware.py` — Structured request/response logging with `structlog`
- [x] **0.32** — Implement `core/middleware.py` — Rate limiting middleware (Redis-based, per user/IP)
- [x] **0.33** — Update `main.py` — Register all middleware, exception handlers, CORS (frontend domain only), all routers
- [ ] **0.34** — Verify: `GET /health` returns 200, JWT validation works end-to-end, Redis connects

---

## Phase 1 — Authentication & User Management
> **Goal:** Complete auth flow so users can log in, view their profile, and manage addresses.
> **Status:** 🟡 In Progress (10/11 tasks done)

- [x] **1.1** — Create `schemas/user.py` — `UserResponse`, `UserUpdate`, `AddressCreate`, `AddressUpdate`, `AddressResponse`
- [x] **1.2** — Create `schemas/common.py` — `PaginatedResponse`, `FilterParams`, `BaseAPIResponse`
- [x] **1.3** — Create `repositories/base.py` — `BaseRepository` with generic async CRUD helpers
- [x] **1.4** — Create `repositories/user.py` — `get_by_id`, `get_by_email`, `update`, address CRUD methods
- [x] **1.5** — Create `services/auth.py` — Verify Supabase JWT, extract user_id, sync user to `public.users` on first login
- [x] **1.6** — Create `services/user.py` — Profile update, address CRUD, set default address logic
- [x] **1.7** — Implement `api/v1/auth.py` router:
  - [x] `GET /api/v1/auth/me` — Return current user from JWT
  - [x] `POST /api/v1/auth/sync` — Sync Supabase Auth user into public.users
- [x] **1.8** — Implement `api/v1/users.py` router:
  - [x] `PUT /api/v1/users/me` — Update profile (name, phone, avatar upload)
  - [x] `GET /api/v1/users/me/addresses` — List all addresses
  - [x] `POST /api/v1/users/me/addresses` — Create new address
  - [x] `PUT /api/v1/users/me/addresses/{id}` — Update address
  - [x] `DELETE /api/v1/users/me/addresses/{id}` — Delete address
  - [x] `PUT /api/v1/users/me/addresses/{id}/set-default` — Set default
- [x] **1.9** — Avatar upload: integrate with `avatars` Supabase Storage bucket (folder = `user_id/`)
- [x] **1.10** — Register `auth` and `users` routers in `main.py`
- [ ] **1.11** — Verify: Login via Google → `/auth/me` returns user profile → address CRUD works

---

## Phase 2 — Store & Product Management
> **Goal:** Sellers can create stores (pending approval), manage products. Admins can moderate both.
> **Status:** 🟡 In Progress (10/11 tasks done)

- [x] **2.1** — Create `schemas/store.py` — `StoreCreate`, `StoreUpdate`, `StoreResponse`, `StoreMemberInvite`, `StoreMemberResponse`
- [x] **2.2** — Create `schemas/product.py` — `ProductCreate`, `ProductUpdate`, `ProductResponse`, `ProductImageResponse`, `ProductListParams`
- [x] **2.3** — Create `repositories/store.py` — Store CRUD, list with filters, member management, approval update
- [x] **2.4** — Create `repositories/product.py` — Product CRUD, list with filters (category/status/store), image insert/delete
- [x] **2.5** — Create `services/store.py` — Create store (default `pending`), approval workflow, member invite, ownership check
- [x] **2.6** — Create `services/product.py` — Product CRUD, stock update, Supabase Storage image upload, moderation actions
- [x] **2.7** — Implement `api/v1/stores.py` router:
  - [x] `POST /api/v1/stores` — Seller creates store (status → `pending`)
  - [x] `GET /api/v1/stores/me` — Get seller's own store
  - [x] `PUT /api/v1/stores/me` — Update store settings (name, description, logo, banner)
  - [x] `POST /api/v1/stores/me/members` — Invite staff member
  - [x] `DELETE /api/v1/stores/me/members/{user_id}` — Remove staff member
- [x] **2.8** — Implement admin store routes in `api/v1/admin.py`:
  - [x] `GET /api/v1/admin/stores` — List all stores (filter by status)
  - [x] `POST /api/v1/admin/stores/{id}/approve` — Approve store + write audit log
  - [x] `POST /api/v1/admin/stores/{id}/reject` — Reject with reason + write audit log
  - [x] `POST /api/v1/admin/stores/{id}/suspend` — Toggle is_active + write audit log
- [x] **2.9** — Implement `api/v1/products.py` router:
  - [x] `GET /api/v1/products` — Public listing (active only, not hidden, filter: category/store/price)
  - [x] `GET /api/v1/products/{id}` — Public product detail (must be active + not hidden)
  - [x] `POST /api/v1/stores/me/products` — Seller creates product (default: `draft`)
  - [x] `PUT /api/v1/products/{id}` — Update product (seller: own store only; admin: any)
  - [x] `DELETE /api/v1/products/{id}` — Soft-delete product (set `deleted_at`)
  - [x] `POST /api/v1/products/{id}/images` — Upload to `product-images` bucket, insert `product_images`
  - [x] `DELETE /api/v1/products/{id}/images/{image_id}` — Remove image from bucket and table
- [x] **2.10** — Implement admin product moderation routes:
  - [x] `POST /api/v1/admin/products/{id}/hide` — Set `is_hidden = true` + write audit log
  - [x] `POST /api/v1/admin/products/{id}/approve` — Set `approved_by`, `approved_at` + write audit log
- [ ] **2.11** — Verify: Seller creates store → Admin approves → Seller adds product → Product visible publicly

---

## Phase 3 — Cart, Checkout & Orders
> **Goal:** Complete shopping flow. Atomic stock management on checkout to prevent overselling.
> **Status:** 🟡 In Progress (10/11 tasks done)

- [x] **3.1** — Create `schemas/cart.py` — `CartResponse`, `CartItemAdd`, `CartItemUpdate`
- [x] **3.2** — Create `schemas/order.py` — `CheckoutRequest`, `OrderResponse`, `OrderItemResponse`, `OrderStatusUpdate`
- [x] **3.3** — Create `repositories/cart.py` — Get cart by user, add item, update quantity, remove item, clear cart
- [x] **3.4** — Create `repositories/order.py` — Create order + order_items in one transaction, get by user/store/id, update status
- [x] **3.5** — Create `services/cart.py` — Validate stock before adding, merge guest cart logic on login
- [x] **3.6** — Create `services/order.py` — Checkout: call `decrement_product_stock` RPC (atomic), create Order + OrderItems (frozen prices), create Payment (pending), clear cart, return QR URL
- [x] **3.7** — Implement `api/v1/cart.py` router:
  - [x] `GET /api/v1/cart` — Get current user's cart with all items
  - [x] `POST /api/v1/cart/items` — Add item (check stock availability)
  - [x] `PUT /api/v1/cart/items/{id}` — Update item quantity
  - [x] `DELETE /api/v1/cart/items/{id}` — Remove item
  - [x] `DELETE /api/v1/cart` — Clear entire cart
  - [x] `POST /api/v1/cart/merge` — Merge guest cart after login
- [x] **3.8** — Implement `api/v1/orders.py` router:
  - [x] `POST /api/v1/checkout` — Create order from cart (atomic stock decrement)
  - [x] `GET /api/v1/orders` — Customer: list own orders (paginated)
  - [x] `GET /api/v1/orders/{id}` — Order detail (customer who owns it, or store owner)
  - [x] `POST /api/v1/orders/{id}/cancel` — Cancel (customer: before paid; seller: before shipped)
- [x] **3.9** — Implement seller order routes:
  - [x] `GET /api/v1/seller/orders` — List orders for seller's store (filter by status)
  - [x] `PUT /api/v1/seller/orders/{id}/ship` — Mark as shipped (seller only)
  - [x] `PUT /api/v1/seller/orders/{id}/deliver` — Mark as delivered (seller only)
- [x] **3.10** — IDOR check: every repo query must filter by `user_id` or `store_id`, never expose another user's orders
- [ ] **3.11** — Verify: Add to cart → checkout → prices frozen in `order_items` → stock decremented → cart cleared

---

## Phase 4 — Manual Payment Flow
> **Goal:** QR payment screenshot upload by buyer, admin verification queue, order completion on approval.
> **Status:** 🟡 In Progress (10/11 tasks done)

- [x] **4.1** — Create `schemas/payment.py` — `PaymentProofUpload`, `PaymentProofResponse`, `PaymentVerifyAction`
- [x] **4.2** — Create `repositories/payment.py` — CRUD for `payments`, CRUD for `payment_proofs`, list pending proofs
- [x] **4.3** — Create `services/payment.py`:
  - [x] Upload proof image to `payment-proofs` bucket (folder = `user_id/`)
  - [x] Validate MIME type (image only) and size limit (e.g. 5MB max)
  - [x] Create `payment_proofs` record (status: `pending`)
  - [x] Approve flow: update proof → payment → order status atomically in DB transaction
  - [x] Reject flow: update proof status to `rejected`, leave order as `pending` so buyer can retry
- [x] **4.4** — Implement `api/v1/payments.py` router:
  - [x] `GET /api/v1/payments/{order_id}/qr` — Return platform QR URL from `platform_settings`
  - [x] `POST /api/v1/payments/{order_id}/proof` — Upload proof (multipart/form-data)
  - [x] `GET /api/v1/payments/{order_id}/status` — Check payment status for buyer
- [x] **4.5** — Implement admin payment verification routes:
  - [x] `GET /api/v1/admin/payments/pending` — List all pending payment proofs (paginated)
  - [x] `POST /api/v1/admin/payments/{proof_id}/approve` — Approve: payment→success, order→paid, notify buyer & seller, write audit log
  - [x] `POST /api/v1/admin/payments/{proof_id}/reject` — Reject with remarks: proof→rejected, notify buyer, write audit log
- [x] **4.6** — Create `services/notification.py` — `create_notification(user_id, title, message, type, reference_id)`
- [x] **4.7** — Create `services/audit.py` — `log_action(performed_by, action, entity, entity_id, old_data, new_data)`
- [x] **4.8** — Wire notifications on approve: buyer gets "Payment Approved", seller gets "New Order Received"
- [x] **4.9** — Wire notifications on reject: buyer gets "Payment Rejected, please re-upload"
- [ ] **4.10** — Verify: Buyer uploads → Admin queue shows proof → Admin approves → Order=paid → Both notified → Audit log written

---

## Phase 5 — Wishlist, Reviews & Notifications
> **Goal:** Complete all customer engagement features.
> **Status:** 🟡 In Progress (11/12 tasks done)

- [x] **5.1** — Create `schemas/wishlist.py` — `WishlistItemResponse`
- [x] **5.2** — Create `schemas/review.py` — `ReviewCreate`, `ReviewUpdate`, `ReviewResponse`
- [x] **5.3** — Create `schemas/notification.py` — `NotificationResponse`, `NotificationListParams`
- [x] **5.4** — Create `repositories/wishlist.py` — toggle add/remove, check if exists, list by user
- [x] **5.5** — Create `repositories/review.py` — create, update, list by product, check if user has delivered order for that product
- [x] **5.6** — Create `repositories/notification.py` — list by user, mark read, mark all read
- [x] **5.7** — Create `services/wishlist.py` — toggle wishlist item (idempotent)
- [x] **5.8** — Create `services/review.py` — Gate: only allow if `orders` has a `delivered` record containing this `product_id` for the user
- [x] **5.9** — Implement `api/v1/wishlist.py` router:
  - [x] `GET /api/v1/wishlist` — List all wishlist items with product details
  - [x] `POST /api/v1/wishlist/{product_id}` — Add to wishlist (idempotent)
  - [x] `DELETE /api/v1/wishlist/{product_id}` — Remove from wishlist
- [x] **5.10** — Implement `api/v1/reviews.py` router:
  - [x] `GET /api/v1/products/{id}/reviews` — Public review list (paginated)
  - [x] `POST /api/v1/products/{id}/reviews` — Create review (only if delivered order exists)
  - [x] `PUT /api/v1/reviews/{id}` — Update own review
  - [x] `DELETE /api/v1/reviews/{id}` — Delete own review
- [x] **5.11** — Implement `api/v1/notifications.py` router:
  - [x] `GET /api/v1/notifications` — List notifications (filter: unread, paginated)
  - [x] `PUT /api/v1/notifications/{id}/read` — Mark single notification as read
  - [x] `PUT /api/v1/notifications/read-all` — Mark all as read
- [ ] **5.12** — Verify: Toggle wishlist; post review only on delivered orders; notifications appear correctly

---

## Phase 6 — Admin & Seller Dashboards
> **Goal:** Analytics, platform settings management, management interfaces.
> **Status:** 🟡 In Progress (7/8 tasks done)

- [x] **6.1** — Create `schemas/admin.py` — `AdminStatsResponse`, `UserRoleUpdate`, `UserToggleActive`, `PlatformSettingsUpdate`
- [x] **6.2** — Create `schemas/dashboard.py` — `SellerStatsResponse`, `RecentOrderResponse`, `TopProductResponse`
- [x] **6.3** — Create `services/admin.py` — User management (role change, suspend), platform settings read/write
- [x] **6.4** — Create `services/dashboard.py` — Revenue aggregation queries, order counts, top products by sales
- [x] **6.5** — Implement admin management routes in `api/v1/admin.py`:
  - [x] `GET /api/v1/admin/dashboard/stats` — Total users, stores, orders, GMV
  - [x] `GET /api/v1/admin/users` — List all users (filter: role, is_active; paginated)
  - [x] `PUT /api/v1/admin/users/{id}/role` — Change user role + write audit log
  - [x] `PUT /api/v1/admin/users/{id}/toggle-active` — Suspend/activate user + write audit log
  - [x] `GET /api/v1/admin/audit-logs` — Paginated, filterable audit trail (by entity, action, user)
  - [x] `GET /api/v1/admin/platform-settings` — Read singleton settings row
  - [x] `PUT /api/v1/admin/platform-settings` — Update UPI ID, QR URL, maintenance mode, etc.
- [x] **6.6** — Implement seller dashboard routes in `api/v1/dashboard.py`:
  - [x] `GET /api/v1/seller/dashboard/stats` — Seller's revenue, total orders, product count, pending orders
  - [x] `GET /api/v1/seller/dashboard/recent-orders` — Last 10 orders for seller's store
  - [x] `GET /api/v1/seller/dashboard/top-products` — Top 5 products by units sold
- [x] **6.7** — Add Redis caching: dashboard stats (TTL: 60s), `platform_settings` (TTL: 300s)
- [ ] **6.8** — Verify: Admin stats load; Seller sees own revenue only; Settings update reflects immediately

---

## Phase 7 — Background Workers & Production Hardening
> **Goal:** Offload heavy work to ARQ, add security hardening, polish error handling.
> **Status:** 🟡 In Progress (10/11 tasks done)

- [x] **7.1** — Create `workers/__init__.py` — ARQ `WorkerSettings` with Redis DSN, registered task list
- [x] **7.2** — Create `workers/email.py` — Async email send task (order confirmation, payment approved, store approved)
- [x] **7.3** — Create `workers/inventory.py` — Low stock alert task (trigger when stock < threshold)
- [x] **7.4** — Create `workers/analytics.py` — Daily revenue aggregation cron job via ARQ
- [x] **7.5** — Wire ARQ into Phase 4 payment approval — dispatch email worker instead of blocking HTTP
- [x] **7.6** — File upload validation — check MIME type (reject non-image), enforce 5MB size limit
- [x] **7.7** — Input sanitization — strip/validate all text inputs, reject XSS patterns
- [x] **7.8** — Tighten CORS — set `allow_origins` to frontend domain only (remove wildcard `*`)
- [x] **7.9** — Stricter rate limits on auth, checkout, and file upload endpoints
- [x] **7.10** — Add composite DB indexes for heavy query patterns:
  - [x] `CREATE INDEX idx_products_store_status ON products(store_id, status)`
  - [x] `CREATE INDEX idx_orders_user_status ON orders(user_id, status)`
  - [x] `CREATE INDEX idx_payment_proofs_status ON payment_proofs(status, created_at)`
  - [x] `CREATE INDEX idx_notifications_user_read ON notifications(user_id, is_read)`
- [ ] **7.11** — Verify: Workers start; email job enqueues on payment approval; invalid file uploads rejected

---

## Phase 8 — Testing & Deployment
> **Goal:** Quality assurance, production deployment to Render + Supabase.
> **Status:** 🟡 In Progress (5/22 tasks done)

- [x] **8.1** — Write unit tests: Auth & RBAC (JWT valid/invalid/expired, role gates)
- [x] **8.2** — Write unit tests: Cart logic (add item, stock check, merge)
- [x] **8.3** — Write unit tests: Checkout (atomic decrement, frozen prices, payment creation)
- [ ] **8.4** — Write unit tests: Manual payment approval flow (proof → approve → order paid)
- [ ] **8.5** — Write unit tests: Inventory decrement RPC (concurrent requests must not oversell)
- [ ] **8.6** — Write unit tests: Reviews (gate check: delivered order required)
- [ ] **8.7** — Write integration tests: Full buyer flow — browse → cart → checkout → upload proof
- [ ] **8.8** — Write integration tests: Admin flow — approve store → approve payment → view audit logs
- [ ] **8.9** — Write integration tests: Seller flow — create store → list product → fulfill order
- [ ] **8.10** — Target: 80%+ code coverage across all modules
- [x] **8.11** — Create `Dockerfile` — multi-stage build, non-root user, production settings
- [x] **8.12** — Create `render.yaml` — service config, environment variable references
- [ ] **8.13** — Configure Supabase production: verify RLS policies, enable PgBouncer connection pooling
- [ ] **8.14** — Connect all frontend services to real API endpoints (`auth.ts`, `cart.ts`, `product.ts`, `order.ts`, `payment.ts`, `wishlist.ts`, `review.ts`, `notification.ts`, `dashboard.ts`)
- [ ] **8.15** — Add `QueryClientProvider` + `AuthContext` (JWT management) to `app/layout.tsx`
- [ ] **8.16** — Replace all hardcoded frontend mock data with React Query hooks
- [ ] **8.17** — Add loading and error states to all frontend components
- [ ] **8.18** — Implement protected route guards for `(seller)`, `(admin)`, `(customer)` route groups
- [ ] **8.19** — E2E tests with Playwright/Cypress — critical paths: login, checkout, payment upload
- [ ] **8.20** — Write API docs (OpenAPI auto-generated), update README with setup guide
- [ ] **8.21** — Go-live checklist: rotate all secrets, configure monitoring/alerts, verify rollback plan
- [ ] **8.22** — Deploy backend to Render, verify `GET /health` and `GET /ready` return 200 in production

---

## Progress Summary

| Phase | Total Tasks | Done | Status |
|-------|-------------|------|--------|
| Phase 0 — Infrastructure | 34 | 30 | 🟡 In Progress |
| Phase 1 — Auth & Users | 11 | 10 | 🟡 In Progress |
| Phase 2 — Stores & Products | 11 | 10 | 🟡 In Progress |
| Phase 3 — Cart & Orders | 11 | 10 | 🟡 In Progress |
| Phase 4 — Payments | 10 | 9 | 🟡 In Progress |
| Phase 5 — Wishlist, Reviews, Notifications | 12 | 11 | 🟡 In Progress |
| Phase 6 — Dashboards | 8 | 0 | 🔴 Not Started |
| Phase 7 — Workers & Hardening | 11 | 0 | 🔴 Not Started |
| Phase 8 — Testing & Deployment | 22 | 0 | 🔴 Not Started |
| **Total** | **130** | **41** | |
