from uuid import UUID
from typing import Tuple, List, Dict, Any
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload
from sqlalchemy import func

from app.models.review import Review
from app.models.order import Order, OrderItem, OrderStatus
from app.repositories.base import BaseRepository
from app.schemas.review import ReviewCreate, ReviewUpdate

class ReviewRepository(BaseRepository[Review]):
    def __init__(self):
        super().__init__(Review)

    async def list_by_product(
        self, db: AsyncSession, product_id: UUID, skip: int = 0, limit: int = 20
    ) -> Tuple[List[Review], int]:
        query = select(self.model).where(self.model.product_id == product_id)
        
        count_query = select(func.count()).select_from(query.subquery())
        total = await db.scalar(count_query)
        
        stmt = query.options(selectinload(self.model.user)).order_by(self.model.created_at.desc()).offset(skip).limit(limit)
        result = await db.execute(stmt)
        return list(result.scalars().all()), total or 0

    async def check_user_has_delivered_order(
        self, db: AsyncSession, user_id: UUID, product_id: UUID
    ) -> bool:
        stmt = select(Order).join(OrderItem).where(
            Order.user_id == user_id,
            Order.status == OrderStatus.delivered,
            OrderItem.product_id == product_id
        )
        result = await db.execute(stmt)
        return result.scalars().first() is not None

    async def create_review(
        self, db: AsyncSession, user_id: UUID, product_id: UUID, review_in: ReviewCreate
    ) -> Review:
        db_obj = self.model(
            user_id=user_id,
            product_id=product_id,
            rating=review_in.rating,
            comment=review_in.comment
        )
        db.add(db_obj)
        await db.commit()
        await db.refresh(db_obj)
        # load user relation to return full response
        stmt = select(self.model).options(selectinload(self.model.user)).where(self.model.id == db_obj.id)
        res = await db.execute(stmt)
        return res.scalar_one()

    async def update_review(
        self, db: AsyncSession, db_obj: Review, review_in: ReviewUpdate
    ) -> Review:
        update_data = review_in.dict(exclude_unset=True)
        for field, value in update_data.items():
            setattr(db_obj, field, value)
        
        db.add(db_obj)
        await db.commit()
        await db.refresh(db_obj)
        
        stmt = select(self.model).options(selectinload(self.model.user)).where(self.model.id == db_obj.id)
        res = await db.execute(stmt)
        return res.scalar_one()

review_repo = ReviewRepository()
