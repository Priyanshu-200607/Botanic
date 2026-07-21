from pydantic import BaseModel
from typing import List, Optional
from uuid import UUID
from datetime import datetime
from app.models.payment import PaymentStatus

class PaymentProofResponse(BaseModel):
    id: UUID
    payment_id: UUID
    proof_url: str
    uploaded_at: datetime
    verified_at: Optional[datetime] = None
    verified_by: Optional[UUID] = None
    status: str
    remarks: Optional[str] = None

    class Config:
        from_attributes = True

class PaymentResponse(BaseModel):
    id: UUID
    order_id: UUID
    amount: float
    status: PaymentStatus
    created_at: datetime
    updated_at: datetime
    proofs: List[PaymentProofResponse] = []

    class Config:
        from_attributes = True

class PaymentVerifyAction(BaseModel):
    remarks: Optional[str] = None
