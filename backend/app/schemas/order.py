from uuid import UUID
from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, Field
from app.models.order import OrderStatus
from app.models.payment import PaymentStatus

class CheckoutRequest(BaseModel):
    address_id: UUID
    # if order comes from one store, we just check out everything in the cart.
    # In a multi-vendor marketplace, checkout might require selecting items per store.
    # For now, we assume simple checkout handling (orders created per store).

class OrderItemResponse(BaseModel):
    id: UUID
    order_id: UUID
    product_id: UUID
    quantity: int
    unit_price: float
    total_price: float
    
    class Config:
        from_attributes = True

class OrderResponse(BaseModel):
    id: UUID
    user_id: UUID
    store_id: UUID
    address_id: UUID
    status: OrderStatus
    total_amount: float
    platform_fee: float
    shipping_fee: float
    grand_total: float
    created_at: datetime
    updated_at: datetime
    items: List[OrderItemResponse] = []
    
    class Config:
        from_attributes = True

class OrderStatusUpdate(BaseModel):
    status: OrderStatus
