from datetime import datetime
from typing import Optional
from pydantic import BaseModel
from uuid import UUID

from app.schemas.common import FilterParams

class NotificationResponse(BaseModel):
    id: UUID
    user_id: UUID
    title: str
    message: str
    type: str
    reference_id: Optional[UUID] = None
    is_read: bool
    created_at: datetime

    class Config:
        from_attributes = True

class NotificationListParams(FilterParams):
    unread_only: bool = False
