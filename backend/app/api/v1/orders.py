from uuid import UUID
from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.security import get_current_user, require_store_owner
from app.models.user import User
from app.models.order import OrderStatus
from app.schemas.order import OrderResponse, CheckoutRequest, OrderStatusUpdate
from app.schemas.common import BaseAPIResponse
from app.services.order import OrderService
from app.services.store import StoreService
from app.repositories.order import order_repo

router = APIRouter()

@router.post("/checkout", response_model=List[OrderResponse])
async def checkout(
    checkout_data: CheckoutRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Create order from cart (atomic stock decrement)"""
    return await OrderService.checkout(db, user_id=current_user.id, checkout_data=checkout_data)

@router.get("", response_model=List[OrderResponse])
async def list_my_orders(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Customer: list own orders"""
    return await OrderService.get_my_orders(db, user_id=current_user.id)

@router.get("/{id}", response_model=OrderResponse)
async def get_order_detail(
    id: UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Order detail (customer who owns it, or store owner)"""
    return await OrderService.get_order_detail(db, order_id=id, user_id=current_user.id)

@router.post("/{id}/cancel", response_model=OrderResponse)
async def cancel_order(
    id: UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Cancel (customer before paid; seller before shipped)"""
    return await OrderService.cancel_order(db, order_id=id, user_id=current_user.id)

@router.get("/seller/orders", response_model=List[OrderResponse])
async def list_seller_orders(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """List orders for seller's store"""
    store = await StoreService.get_my_store(db, user_id=current_user.id)
    await require_store_owner(str(store.id), current_user, db)
    return await order_repo.get_by_store_id(db, store_id=store.id)

@router.put("/seller/orders/{id}/ship", response_model=OrderResponse)
async def mark_order_shipped(
    id: UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Mark as shipped (seller only)"""
    store = await StoreService.get_my_store(db, user_id=current_user.id)
    await require_store_owner(str(store.id), current_user, db)
    return await OrderService.update_status(db, order_id=id, store_id=store.id, new_status=OrderStatus.shipped)

@router.put("/seller/orders/{id}/deliver", response_model=OrderResponse)
async def mark_order_delivered(
    id: UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Mark as delivered (seller only)"""
    store = await StoreService.get_my_store(db, user_id=current_user.id)
    await require_store_owner(str(store.id), current_user, db)
    return await OrderService.update_status(db, order_id=id, store_id=store.id, new_status=OrderStatus.delivered)
