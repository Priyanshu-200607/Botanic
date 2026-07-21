from uuid import UUID
from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from app.core.database import get_db
from app.core.security import require_seller
from app.models.user import User
from app.models.store import Store
from app.schemas.dashboard import SellerStatsResponse, RecentOrderResponse, TopProductResponse
from app.services.dashboard import DashboardService

router = APIRouter()

async def get_seller_store(user: User, db: AsyncSession) -> Store:
    result = await db.execute(select(Store).where(Store.owner_id == user.id))
    store = result.scalar_one_or_none()
    if not store:
        raise HTTPException(status_code=404, detail="Store not found for this seller")
    return store

from app.core.redis import get_cache, set_cache

@router.get("/seller/dashboard/stats", response_model=SellerStatsResponse)
async def get_seller_stats(
    current_seller: User = Depends(require_seller),
    db: AsyncSession = Depends(get_db)
):
    """Get stats for seller dashboard"""
    store = await get_seller_store(current_seller, db)
    cache_key = f"seller:dashboard:stats:{store.id}"
    cached = await get_cache(cache_key)
    if cached:
        return cached
    stats = await DashboardService.get_seller_stats(db, store.id)
    await set_cache(cache_key, stats.model_dump(mode="json"), ex=60)
    return stats

@router.get("/seller/dashboard/recent-orders", response_model=List[RecentOrderResponse])
async def get_recent_orders(
    current_seller: User = Depends(require_seller),
    db: AsyncSession = Depends(get_db)
):
    """Get recent orders for seller dashboard"""
    store = await get_seller_store(current_seller, db)
    return await DashboardService.get_recent_orders(db, store.id)

@router.get("/seller/dashboard/top-products", response_model=List[TopProductResponse])
async def get_top_products(
    current_seller: User = Depends(require_seller),
    db: AsyncSession = Depends(get_db)
):
    """Get top products for seller dashboard"""
    store = await get_seller_store(current_seller, db)
    return await DashboardService.get_top_products(db, store.id)
