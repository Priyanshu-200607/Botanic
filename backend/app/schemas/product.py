from pydantic import BaseModel, UUID4, ConfigDict
from decimal import Decimal
from datetime import datetime
from typing import Optional, List
from app.models.product import ProductStatus

class ProductBase(BaseModel):
    name: str
    slug: str
    description: Optional[str] = None
    price: Decimal
    stock: int = 0
    status: ProductStatus = ProductStatus.draft
    image_url: Optional[str] = None

class ProductCreate(ProductBase):
    store_id: UUID4

class ProductUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[Decimal] = None
    stock: Optional[int] = None
    status: Optional[ProductStatus] = None
    image_url: Optional[str] = None

class ProductResponse(ProductBase):
    model_config = ConfigDict(from_attributes=True)
    
    id: UUID4
    store_id: UUID4
    created_by: UUID4
    created_at: datetime
    updated_at: datetime
