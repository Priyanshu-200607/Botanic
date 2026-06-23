from sqlalchemy import Column, String, Numeric, Enum, DateTime, func, Index
from sqlalchemy.dialects.postgresql import UUID
import uuid
from app.core.database import Base
import enum

class PaymentStatus(str, enum.Enum):
    pending = "pending"
    success = "success"
    failed = "failed"

class Payment(Base):
    __tablename__ = "payments"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    order_id = Column(UUID(as_uuid=True), nullable=False)
    amount = Column(Numeric(10, 2), nullable=False)
    payment_method = Column(String)
    provider = Column(String)
    provider_payment_id = Column(String)
    transaction_id = Column(String)
    status = Column(Enum(PaymentStatus, name="payment_status"), default=PaymentStatus.pending, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

Index('idx_payments_order_id', Payment.order_id)
Index('idx_payments_provider_id', Payment.provider_payment_id)
