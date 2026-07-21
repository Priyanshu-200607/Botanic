from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel
from uuid import UUID
from app.models.store import StoreStatus, StoreRole

class StoreBase(BaseModel):
    name: str
    description: Optional[str] = None
    logo_url: Optional[str] = None
    banner_url: Optional[str] = None

class StoreCreate(StoreBase):
    pass

class StoreUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    logo_url: Optional[str] = None
    banner_url: Optional[str] = None

class StoreResponse(StoreBase):
    id: UUID
    owner_id: UUID
    status: StoreStatus
    approval_status: str
    rejection_reason: Optional[str] = None
    is_active: bool
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True

class StoreMemberInvite(BaseModel):
    email: str
    role: StoreRole = StoreRole.staff

class StoreMemberResponse(BaseModel):
    id: UUID
    store_id: UUID
    user_id: UUID
    role: StoreRole
    joined_at: datetime
    
    class Config:
        from_attributes = True
