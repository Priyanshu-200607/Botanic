from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, Field
from uuid import UUID
from app.models.product import ProductStatus

class ProductImageBase(BaseModel):
    image_url: str
    display_order: int = 0

class ProductImageResponse(ProductImageBase):
    id: UUID
    product_id: UUID
    
    class Config:
        from_attributes = True

class ProductBase(BaseModel):
    store_id: UUID
    name: str
    description: Optional[str] = None
    category: Optional[str] = None
    price: float
    inventory_count: int = 0
    status: ProductStatus = ProductStatus.draft
    is_hidden: bool = False

class ProductCreate(BaseModel):
    name: str
    description: Optional[str] = None
    category: Optional[str] = None
    price: float = Field(..., gt=0)
    inventory_count: int = 0

class ProductUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None
    price: Optional[float] = Field(None, gt=0)
    inventory_count: Optional[int] = None
    status: Optional[ProductStatus] = None

class ProductResponse(ProductBase):
    id: UUID
    rejection_reason: Optional[str] = None
    created_at: datetime
    updated_at: datetime
    images: List[ProductImageResponse] = []
    
    class Config:
        from_attributes = True

class ProductListParams(BaseModel):
    category: Optional[str] = None
    store_id: Optional[UUID] = None
    min_price: Optional[float] = None
    max_price: Optional[float] = None
