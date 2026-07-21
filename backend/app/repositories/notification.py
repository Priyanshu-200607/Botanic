from uuid import UUID
from typing import Tuple, List, Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import func, update

from app.models.notification import Notification
from app.repositories.base import BaseRepository

class NotificationRepository(BaseRepository[Notification]):
    def __init__(self):
        super().__init__(Notification)

    async def list_by_user(
        self, db: AsyncSession, user_id: UUID, unread_only: bool = False, skip: int = 0, limit: int = 20
    ) -> Tuple[List[Notification], int]:
        query = select(self.model).where(self.model.user_id == user_id)
        if unread_only:
            query = query.where(self.model.is_read == False)
            
        count_query = select(func.count()).select_from(query.subquery())
        total = await db.scalar(count_query)
        
        stmt = query.order_by(self.model.created_at.desc()).offset(skip).limit(limit)
        result = await db.execute(stmt)
        return list(result.scalars().all()), total or 0

    async def mark_read(self, db: AsyncSession, notification_id: UUID) -> Optional[Notification]:
        stmt = update(self.model).where(self.model.id == notification_id).values(is_read=True).returning(self.model)
        result = await db.execute(stmt)
        await db.commit()
        return result.scalar_one_or_none()

    async def mark_all_read(self, db: AsyncSession, user_id: UUID) -> None:
        stmt = update(self.model).where(
            self.model.user_id == user_id, 
            self.model.is_read == False
        ).values(is_read=True)
        await db.execute(stmt)
        await db.commit()

notification_repo = NotificationRepository()
