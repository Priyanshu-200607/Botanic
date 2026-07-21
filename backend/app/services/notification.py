from uuid import UUID
from typing import Optional, Tuple, List
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import HTTPException
from app.models.notification import Notification
from app.repositories.notification import notification_repo

class NotificationService:
    @staticmethod
    async def create_notification(
        db: AsyncSession,
        user_id: UUID,
        title: str,
        message: str,
        type: str,
        reference_id: Optional[UUID] = None
    ) -> Notification:
        notification = Notification(
            user_id=user_id,
            title=title,
            message=message,
            type=type,
            reference_id=reference_id
        )
        db.add(notification)
        await db.commit()
        return notification

    @staticmethod
    async def list_user_notifications(
        db: AsyncSession, user_id: UUID, unread_only: bool = False, skip: int = 0, limit: int = 20
    ) -> Tuple[List[Notification], int]:
        return await notification_repo.list_by_user(
            db, user_id=user_id, unread_only=unread_only, skip=skip, limit=limit
        )

    @staticmethod
    async def mark_notification_read(
        db: AsyncSession, user_id: UUID, notification_id: UUID
    ) -> Notification:
        notification = await notification_repo.get_by_id(db, id=notification_id)
        if not notification:
            raise HTTPException(status_code=404, detail="Notification not found")
        if notification.user_id != user_id:
            raise HTTPException(status_code=403, detail="Not authorized")
        
        return await notification_repo.mark_read(db, notification_id=notification_id)

    @staticmethod
    async def mark_all_read(db: AsyncSession, user_id: UUID):
        await notification_repo.mark_all_read(db, user_id=user_id)
