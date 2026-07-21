from datetime import datetime
import uuid
from sqlalchemy import Column, String, Numeric, Integer, Boolean, DateTime, Enum, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
import enum

from app.core.database import Base

class ProductStatus(str, enum.Enum):
    draft = 'draft'
    active = 'active'
    archived = 'archived'

from sqlalchemy import Index

class Product(Base):
    __tablename__ = "products"
    __table_args__ = (
        Index('idx_products_store_status', 'store_id', 'status'),
    )

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    store_id = Column(UUID(as_uuid=True), ForeignKey("stores.id", ondelete="CASCADE"), nullable=False)
    name = Column(String, nullable=False)
    slug = Column(String, unique=True, nullable=False, index=True)
    category = Column(String(100))
    description = Column(String)
    price = Column(Numeric(10, 2), nullable=False)
    stock = Column(Integer, nullable=False, default=0)
    status = Column(Enum(ProductStatus), nullable=False, default=ProductStatus.draft)
    is_hidden = Column(Boolean, nullable=False, default=False)
    image_url = Column(String)
    created_by = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    approved_by = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    approved_at = Column(DateTime(timezone=True))
    rejection_reason = Column(String)
    deleted_at = Column(DateTime(timezone=True))
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)
    updated_at = Column(DateTime(timezone=True), default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    store = relationship("Store", back_populates="products")
    creator = relationship("User")
    images = relationship("ProductImage", back_populates="product", cascade="all, delete")
    reviews = relationship("Review", back_populates="product", cascade="all, delete")

class ProductImage(Base):
    __tablename__ = "product_images"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    product_id = Column(UUID(as_uuid=True), ForeignKey("products.id", ondelete="CASCADE"), nullable=False)
    storage_path = Column(String, nullable=False)
    public_url = Column(String)
    is_primary = Column(Boolean, nullable=False, default=False)
    sort_order = Column(Integer, nullable=False, default=0)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)

    product = relationship("Product", back_populates="images")
