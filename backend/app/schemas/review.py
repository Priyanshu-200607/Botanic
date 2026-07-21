from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field
from uuid import UUID

from app.schemas.user import UserResponse

class ReviewCreate(BaseModel):
    rating: int = Field(..., ge=1, le=5)
    comment: Optional[str] = None

class ReviewUpdate(BaseModel):
    rating: Optional[int] = Field(None, ge=1, le=5)
    comment: Optional[str] = None

class ReviewResponse(BaseModel):
    id: UUID
    user_id: UUID
    product_id: UUID
    rating: int
    comment: Optional[str] = None
    created_at: datetime
    updated_at: datetime
    user: UserResponse

    class Config:
        from_attributes = True
