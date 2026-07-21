# Botanic2 - Supabase Feature & Functionality Breakdown

This document categorizes all features inside the Botanic2 platform based on the roles (Admin, Seller, Buyer) and lists the required Supabase schema setup. Because we are starting with a **clean database** in Supabase, the SQL queries are broken into specialized fragments based on the functionality they support.

## 1. Feature: User Authentication & Role Management (Admin, Buyer, Seller)
- **Functionality (All)**: Syncs users automatically from Supabase Auth into the public `users` table via a Postgres Trigger.
- **Roles**: `admin` (oversees platform), `seller` (manages stores), `customer` (default buyer).
- **Functionality (Seller)**: Managing store staff through `store_members`.

## 2. Feature: Store & Product Management
- **Functionality (Seller/Admin)**: Sellers can create stores (which require Admin approval via `approval_status`).
- **Functionality (Seller/Admin)**: Sellers list products. Admins can moderate by hiding or soft-deleting products (`is_hidden`).

## 3. Feature: Shopping, Orders, & Reviews
- **Functionality (Buyer)**: Buyers maintain multiple shipping addresses (`addresses`), add items to `wishlists`, and place `orders`.
- **Functionality (System)**: Product prices are frozen into `order_items` at checkout.
- **Functionality (Buyer)**: Leave `reviews` on purchased products.

## 4. Feature: Manual Payment & Verification
- **Functionality (Buyer)**: Instead of an automatic gateway, buyers upload QR payment proofs.
- **Functionality (Admin)**: Admins verify these uploaded proofs in `payment_proofs` to mark the linked `orders` as paid.

## 5. Feature: Platform Auditing & Notifications
- **Functionality (Admin)**: Admin actions are logged (`audit_logs`) for accountability.
- **Functionality (System)**: Inventory changes are tracked historically (`inventory_logs`) to prevent race conditions via RPC decrement calls.
- **Functionality (System)**: Users receive alerts (`notifications`) regarding their order status or store approvals.
- **Functionality (Admin)**: Global platform settings (`platform_settings`) like UPI ID or maintenance mode.

## 6. Feature: Secure Cloud Storage (Images & Documents)
- **Functionality (Users)**: Avatars can be uploaded securely (Users can only overwrite their own images).
- **Functionality (Sellers)**: Sellers can upload plant/product images. (Note: Draft privacy is inherently secured because storage URLs are unguessable UUIDs; the backend will never leak a draft URL).
- **Functionality (Buyers/Admins)**: Payment proofs are strictly private. Buyers can only view their own uploads, while Admins have global read access.

---

*(Note: The corresponding SQL fragments for these features have been appended directly into Step 4 of the `update_plan.md` file.)*
