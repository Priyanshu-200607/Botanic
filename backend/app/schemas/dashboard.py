from pydantic import BaseModel
from typing import Optional, List
from decimal import Decimal
import uuid
from datetime import datetime

class SellerStatsResponse(BaseModel):
    total_revenue: Decimal
    total_orders: int
    product_count: int
    pending_orders: int

class RecentOrderResponse(BaseModel):
    id: uuid.UUID
    user_id: uuid.UUID
    status: str
    total_amount: Decimal
    created_at: datetime

    class Config:
        from_attributes = True

class TopProductResponse(BaseModel):
    id: uuid.UUID
    name: str
    units_sold: int
    revenue: Decimal

    class Config:
        from_attributes = True
