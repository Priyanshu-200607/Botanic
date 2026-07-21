from uuid import UUID
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.security import get_current_user, require_store_owner
from app.models.user import User
from app.schemas.store import StoreCreate, StoreUpdate, StoreResponse, StoreMemberInvite, StoreMemberResponse
from app.schemas.product import ProductCreate, ProductResponse
from app.schemas.common import BaseAPIResponse
from app.services.store import StoreService
from app.services.product import ProductService

router = APIRouter()

@router.post("", response_model=StoreResponse)
async def create_store(
    store_data: StoreCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Seller creates store (status defaults to pending)"""
    return await StoreService.create_store(db, owner_id=current_user.id, store_data=store_data)

@router.get("/me", response_model=StoreResponse)
async def get_my_store(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Get seller's own store"""
    return await StoreService.get_my_store(db, user_id=current_user.id)

@router.put("/me", response_model=StoreResponse)
async def update_my_store(
    update_data: StoreUpdate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Update store settings"""
    store = await StoreService.get_my_store(db, user_id=current_user.id)
    await require_store_owner(str(store.id), current_user, db)
    return await StoreService.update_store(db, store_id=store.id, update_data=update_data)

@router.post("/me/members", response_model=StoreMemberResponse)
async def invite_member(
    invite_data: StoreMemberInvite,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Invite staff member"""
    store = await StoreService.get_my_store(db, user_id=current_user.id)
    await require_store_owner(str(store.id), current_user, db)
    return await StoreService.invite_member(db, store_id=store.id, invite_data=invite_data)

@router.delete("/me/members/{user_id}", response_model=BaseAPIResponse)
async def remove_member(
    user_id: UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Remove staff member"""
    store = await StoreService.get_my_store(db, user_id=current_user.id)
    await require_store_owner(str(store.id), current_user, db)
    await StoreService.remove_member(db, store_id=store.id, user_id=user_id)
    return BaseAPIResponse(message="Member removed")

@router.post("/me/products", response_model=ProductResponse)
async def create_product(
    product_data: ProductCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Seller creates product"""
    store = await StoreService.get_my_store(db, user_id=current_user.id)
    await require_store_owner(str(store.id), current_user, db)
    return await ProductService.create_product(db, store_id=store.id, product_data=product_data)
