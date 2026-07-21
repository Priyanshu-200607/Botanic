from uuid import UUID
from typing import Tuple, List
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload
from sqlalchemy import func

from app.models.wishlist import Wishlist
from app.repositories.base import BaseRepository

class WishlistRepository(BaseRepository[Wishlist]):
    def __init__(self):
        super().__init__(Wishlist)

    async def list_by_user(
        self, db: AsyncSession, user_id: UUID, skip: int = 0, limit: int = 20
    ) -> Tuple[List[Wishlist], int]:
        query = select(self.model).where(self.model.user_id == user_id)
        
        # Count total
        count_query = select(func.count()).select_from(query.subquery())
        total = await db.scalar(count_query)
        
        # Paginated results with product joined
        stmt = query.options(
            selectinload(self.model.product).selectinload("images")
        ).order_by(self.model.created_at.desc()).offset(skip).limit(limit)
        
        result = await db.execute(stmt)
        return list(result.scalars().all()), total or 0

    async def check_exists(self, db: AsyncSession, user_id: UUID, product_id: UUID) -> bool:
        stmt = select(self.model).where(
            self.model.user_id == user_id, 
            self.model.product_id == product_id
        )
        result = await db.execute(stmt)
        return result.scalar_one_or_none() is not None

    async def toggle_item(self, db: AsyncSession, user_id: UUID, product_id: UUID) -> bool:
        stmt = select(self.model).where(
            self.model.user_id == user_id, 
            self.model.product_id == product_id
        )
        result = await db.execute(stmt)
        item = result.scalar_one_or_none()
        
        if item:
            await db.delete(item)
            await db.commit()
            return False
        else:
            new_item = self.model(user_id=user_id, product_id=product_id)
            db.add(new_item)
            await db.commit()
            return True

wishlist_repo = WishlistRepository()
