from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from uuid import UUID

from app.api.deps import get_db
from app.core.security import get_current_user
from app.models.user import User
from app.schemas.notification import NotificationResponse, NotificationListParams
from app.schemas.common import PaginatedResponse
from app.services.notification import NotificationService

router = APIRouter(prefix="/notifications", tags=["notifications"])

@router.get("", response_model=PaginatedResponse[NotificationResponse])
async def list_notifications(
    params: NotificationListParams = Depends(),
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    items, total = await NotificationService.list_user_notifications(
        db, 
        user_id=current_user.id, 
        unread_only=params.unread_only, 
        skip=(params.page - 1) * params.size, 
        limit=params.size
    )
    pages = (total + params.size - 1) // params.size if total > 0 else 0
    return {
        "items": items,
        "total": total,
        "page": params.page,
        "size": params.size,
        "pages": pages
    }

@router.put("/{notification_id}/read", response_model=NotificationResponse)
async def mark_notification_read(
    notification_id: UUID,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return await NotificationService.mark_notification_read(
        db, user_id=current_user.id, notification_id=notification_id
    )

@router.put("/read-all", response_model=dict)
async def mark_all_read(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    await NotificationService.mark_all_read(db, user_id=current_user.id)
    return {"message": "All notifications marked as read", "status": "success"}
