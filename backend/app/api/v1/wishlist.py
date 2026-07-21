from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from uuid import UUID

from app.api.deps import get_db
from app.core.security import get_current_user
from app.models.user import User
from app.schemas.wishlist import WishlistItemResponse
from app.schemas.common import PaginatedResponse, FilterParams
from app.services.wishlist import WishlistService

router = APIRouter(prefix="/wishlist", tags=["wishlist"])

@router.get("", response_model=PaginatedResponse[WishlistItemResponse])
async def list_wishlist(
    params: FilterParams = Depends(),
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    items, total = await WishlistService.list_wishlist(
        db, user_id=current_user.id, skip=(params.page - 1) * params.size, limit=params.size
    )
    pages = (total + params.size - 1) // params.size if total > 0 else 0
    return {
        "items": items,
        "total": total,
        "page": params.page,
        "size": params.size,
        "pages": pages
    }

@router.post("/{product_id}", response_model=dict)
async def add_to_wishlist(
    product_id: UUID,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    added = await WishlistService.toggle_wishlist_item(db, user_id=current_user.id, product_id=product_id)
    # The requirement says toggle, but the route says POST to add.
    # We could implement a toggle or ensure it's idempotent for add.
    # The toggle_item actually toggles. If it returns False, it means it removed it.
    if added:
        return {"message": "Added to wishlist", "status": "success"}
    return {"message": "Removed from wishlist", "status": "success"}

@router.delete("/{product_id}", response_model=dict)
async def remove_from_wishlist(
    product_id: UUID,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Check exists first to make it idempotent delete properly
    from app.repositories.wishlist import wishlist_repo
    exists = await wishlist_repo.check_exists(db, current_user.id, product_id)
    if exists:
        await wishlist_repo.toggle_item(db, current_user.id, product_id)
    return {"message": "Removed from wishlist", "status": "success"}
