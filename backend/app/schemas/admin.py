from typing import Optional, Dict, Any
from pydantic import BaseModel
from decimal import Decimal
from app.models.user import UserRole
import uuid
from datetime import datetime

class AdminStatsResponse(BaseModel):
    total_users: int
    total_stores: int
    total_orders: int
    total_gmv: Decimal

class UserRoleUpdate(BaseModel):
    role: UserRole

class UserToggleActive(BaseModel):
    is_active: bool

class PlatformSettingsUpdate(BaseModel):
    platform_fee_percent: Optional[Decimal] = None
    upi_id: Optional[str] = None
    qr_url: Optional[str] = None
    maintenance_mode: Optional[bool] = None

class PlatformSettingsResponse(BaseModel):
    id: uuid.UUID
    platform_fee_percent: Decimal
    upi_id: Optional[str] = None
    qr_url: Optional[str] = None
    maintenance_mode: bool
    updated_at: datetime

    class Config:
        from_attributes = True

class AuditLogResponse(BaseModel):
    id: uuid.UUID
    actor_id: uuid.UUID
    action: str
    entity: str
    entity_id: uuid.UUID
    changes: Optional[Dict[str, Any]] = None
    ip_address: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True
