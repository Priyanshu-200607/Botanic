from uuid import UUID
from pydantic import BaseModel, Field
from typing import List
from datetime import datetime

from app.schemas.product import ProductResponse

class CartItemAdd(BaseModel):
    product_id: UUID
    quantity: int = Field(1, gt=0)

class CartItemUpdate(BaseModel):
    quantity: int = Field(..., gt=0)

class CartItemResponse(BaseModel):
    id: UUID
    cart_id: UUID
    product_id: UUID
    quantity: int
    added_at: datetime
    product: ProductResponse
    
    class Config:
        from_attributes = True

class CartResponse(BaseModel):
    id: UUID
    user_id: UUID
    created_at: datetime
    updated_at: datetime
    items: List[CartItemResponse] = []
    
    class Config:
        from_attributes = True

class MergeGuestCartRequest(BaseModel):
    items: List[CartItemAdd]
