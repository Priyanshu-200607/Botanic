from datetime import datetime
import uuid
from sqlalchemy import Column, Numeric, DateTime, String, Boolean
from sqlalchemy.dialects.postgresql import UUID

from app.core.database import Base

class PlatformSettings(Base):
    __tablename__ = "platform_settings"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    platform_fee_percent = Column(Numeric(5, 2), nullable=False, default=5.00)
    upi_id = Column(String, nullable=True)
    qr_url = Column(String, nullable=True)
    maintenance_mode = Column(Boolean, default=False)
    updated_at = Column(DateTime(timezone=True), default=datetime.utcnow, onupdate=datetime.utcnow)
