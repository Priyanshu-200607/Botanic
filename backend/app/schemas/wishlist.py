from datetime import datetime
from pydantic import BaseModel
from uuid import UUID

from app.schemas.product import ProductResponse

class WishlistItemResponse(BaseModel):
    id: UUID
    user_id: UUID
    product_id: UUID
    created_at: datetime
    product: ProductResponse

    class Config:
        from_attributes = True
