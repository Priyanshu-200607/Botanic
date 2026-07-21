from uuid import UUID
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.security import get_current_user
from app.models.user import User
from app.schemas.cart import CartResponse, CartItemResponse, CartItemAdd, CartItemUpdate, MergeGuestCartRequest
from app.schemas.common import BaseAPIResponse
from app.services.cart import CartService

router = APIRouter()

@router.get("", response_model=CartResponse)
async def get_cart(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Get current user's cart"""
    return await CartService.get_my_cart(db, user_id=current_user.id)

@router.post("/items", response_model=CartItemResponse)
async def add_cart_item(
    item_data: CartItemAdd,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Add item to cart"""
    return await CartService.add_item(db, user_id=current_user.id, item_data=item_data)

@router.put("/items/{id}", response_model=CartItemResponse)
async def update_cart_item(
    id: UUID,
    update_data: CartItemUpdate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Update item quantity"""
    return await CartService.update_item(db, user_id=current_user.id, item_id=id, update_data=update_data)

@router.delete("/items/{id}", response_model=BaseAPIResponse)
async def remove_cart_item(
    id: UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Remove item from cart"""
    await CartService.remove_item(db, user_id=current_user.id, item_id=id)
    return BaseAPIResponse(message="Item removed")

@router.delete("", response_model=BaseAPIResponse)
async def clear_cart(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Clear entire cart"""
    await CartService.clear_cart(db, user_id=current_user.id)
    return BaseAPIResponse(message="Cart cleared")

@router.post("/merge", response_model=CartResponse)
async def merge_cart(
    merge_data: MergeGuestCartRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Merge guest cart into user cart"""
    return await CartService.merge_guest_cart(db, user_id=current_user.id, merge_data=merge_data)
