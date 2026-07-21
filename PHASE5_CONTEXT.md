# Phase 5 Context
This file keeps track of variable names, models, parameters, and types used in Phase 5 to ensure consistency.

## Models
1. **Wishlist**: `app.models.wishlist.Wishlist`
    - `id` (UUID)
    - `user_id` (UUID)
    - `product_id` (UUID)
    - `created_at` (DateTime)
    - Relationships: `user`, `product`

2. **Review**: `app.models.review.Review`
    - `id` (UUID)
    - `user_id` (UUID)
    - `product_id` (UUID)
    - `rating` (Integer)
    - `comment` (String)
    - `created_at` (DateTime)
    - `updated_at` (DateTime)
    - Relationships: `user`, `product`

3. **Notification**: `app.models.notification.Notification`
    - `id` (UUID)
    - `user_id` (UUID)
    - `title` (String)
    - `message` (String)
    - `type` (String)
    - `reference_id` (UUID, optional)
    - `is_read` (Boolean, default False)
    - `created_at` (DateTime)
    - Relationships: `user`

## Schemas
1. **Wishlist** (`schemas/wishlist.py`):
    - `WishlistItemResponse`: returns wishlist item details along with nested `product: ProductResponse`.
2. **Review** (`schemas/review.py`):
    - `ReviewCreate`: `rating` (int, 1-5), `comment` (Optional[str])
    - `ReviewUpdate`: `rating` (Optional[int]), `comment` (Optional[str])
    - `ReviewResponse`: `id`, `user_id`, `product_id`, `rating`, `comment`, `created_at`, `updated_at`, `user` (UserResponse).
3. **Notification** (`schemas/notification.py`):
    - `NotificationResponse`: `id`, `user_id`, `title`, `message`, `type`, `reference_id`, `is_read`, `created_at`
    - `NotificationListParams`: standard pagination `FilterParams` with `unread_only: bool = False`

## Repositories
1. **WishlistRepository** (`repositories/wishlist.py`):
    - `toggle_item(db, user_id, product_id)`
    - `check_exists(db, user_id, product_id) -> bool`
    - `list_by_user(db, user_id, skip, limit)`
2. **ReviewRepository** (`repositories/review.py`):
    - `create_review(db, user_id, product_id, review_in)`
    - `update_review(db, review_id, review_in)`
    - `list_by_product(db, product_id, skip, limit)`
    - `check_user_has_delivered_order(db, user_id, product_id) -> bool`
3. **NotificationRepository** (`repositories/notification.py`):
    - `list_by_user(db, user_id, unread_only, skip, limit)`
    - `mark_read(db, notification_id)`
    - `mark_all_read(db, user_id)`

## Services
1. **WishlistService** (`services/wishlist.py`)
2. **ReviewService** (`services/review.py`)
3. **NotificationService** (`services/notification.py`) (Already partially created? Need to check if `services/notification.py` exists as per Task 4.6)

## API Routers
1. `api/v1/wishlist.py`
2. `api/v1/reviews.py`
3. `api/v1/notifications.py`
