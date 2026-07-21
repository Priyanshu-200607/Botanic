from sqlalchemy import Column, String, Numeric, Enum, DateTime, func, Index, ForeignKey
from sqlalchemy.orm import relationship
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
    order_id = Column(UUID(as_uuid=True), ForeignKey("orders.id", ondelete="CASCADE"), nullable=False, unique=True)
    amount = Column(Numeric(10, 2), nullable=False)
    payment_method = Column(String, default='manual_upi')
    provider = Column(String)
    provider_payment_id = Column(String)
    transaction_id = Column(String)
    status = Column(Enum(PaymentStatus, name="payment_status"), default=PaymentStatus.pending, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    order = relationship("Order")
    proofs = relationship("PaymentProof", back_populates="payment", cascade="all, delete")

from sqlalchemy import Index

class PaymentProof(Base):
    __tablename__ = "payment_proofs"
    __table_args__ = (
        Index('idx_payment_proofs_status', 'status', 'created_at'),
    )

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    payment_id = Column(UUID(as_uuid=True), ForeignKey("payments.id", ondelete="CASCADE"), nullable=False)
    order_id = Column(UUID(as_uuid=True), ForeignKey("orders.id", ondelete="CASCADE"), nullable=False)
    uploaded_by = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    image_url = Column(String, nullable=False)
    amount = Column(Numeric(12, 2), nullable=False)
    utr_number = Column(String)
    remarks = Column(String)
    status = Column(String, nullable=False, default='pending')
    verified_by = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    verified_at = Column(DateTime(timezone=True))
    admin_note = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    payment = relationship("Payment", back_populates="proofs")

Index('idx_payments_order_id', Payment.order_id)
Index('idx_payments_provider_id', Payment.provider_payment_id)
