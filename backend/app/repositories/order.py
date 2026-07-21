from typing import Optional, List
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload
from uuid import UUID

from app.models.order import Order, OrderItem, OrderStatus
from app.repositories.base import BaseRepository

class OrderRepository(BaseRepository[Order]):
    def __init__(self):
        super().__init__(Order)
        
    async def get_by_user_id(self, db: AsyncSession, user_id: UUID, skip: int = 0, limit: int = 100) -> List[Order]:
        result = await db.execute(
            select(Order)
            .options(selectinload(Order.items))
            .filter(Order.user_id == user_id)
            .order_by(Order.created_at.desc())
            .offset(skip).limit(limit)
        )
        return list(result.scalars().all())

    async def get_by_store_id(self, db: AsyncSession, store_id: UUID, status: Optional[OrderStatus] = None, skip: int = 0, limit: int = 100) -> List[Order]:
        query = select(Order).options(selectinload(Order.items)).filter(Order.store_id == store_id)
        if status:
            query = query.filter(Order.status == status)
        query = query.order_by(Order.created_at.desc()).offset(skip).limit(limit)
        
        result = await db.execute(query)
        return list(result.scalars().all())

    async def get_order_with_items(self, db: AsyncSession, order_id: UUID) -> Optional[Order]:
        result = await db.execute(
            select(Order).options(selectinload(Order.items)).filter(Order.id == order_id)
        )
        return result.scalar_one_or_none()

class OrderItemRepository(BaseRepository[OrderItem]):
    def __init__(self):
        super().__init__(OrderItem)

order_repo = OrderRepository()
order_item_repo = OrderItemRepository()
