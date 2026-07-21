from datetime import datetime
import uuid
from sqlalchemy import Column, String, Boolean, DateTime, Enum, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
import enum

from app.core.database import Base

class StoreRole(str, enum.Enum):
    owner = 'owner'
    staff = 'staff'

class StoreStatus(str, enum.Enum):
    pending = 'pending'
    approved = 'approved'
    rejected = 'rejected'
    suspended = 'suspended'

class Store(Base):
    __tablename__ = "stores"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    owner_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    name = Column(String, nullable=False)
    slug = Column(String, unique=True, nullable=False, index=True)
    description = Column(String)
    logo_url = Column(String)
    banner_url = Column(String)
    is_active = Column(Boolean, nullable=False, default=True)
    approval_status = Column(Enum(StoreStatus), nullable=False, default=StoreStatus.pending)
    approved_by = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    approved_at = Column(DateTime(timezone=True))
    rejection_reason = Column(String)
    deleted_at = Column(DateTime(timezone=True))
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)
    updated_at = Column(DateTime(timezone=True), default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    owner = relationship("User", back_populates="stores")
    members = relationship("StoreMember", back_populates="store", cascade="all, delete")
    products = relationship("Product", back_populates="store", cascade="all, delete")
    orders = relationship("Order", back_populates="store")


class StoreMember(Base):
    __tablename__ = "store_members"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    store_id = Column(UUID(as_uuid=True), ForeignKey("stores.id", ondelete="CASCADE"), nullable=False)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    role = Column(Enum(StoreRole), nullable=False, default=StoreRole.staff)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)

    store = relationship("Store", back_populates="members")
    user = relationship("User")
