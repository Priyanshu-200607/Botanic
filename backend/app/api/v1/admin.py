from uuid import UUID
from typing import List, Optional
from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from pydantic import BaseModel

from app.core.database import get_db
from app.core.security import require_admin
from app.models.user import User
from app.models.store import StoreStatus
from app.schemas.store import StoreResponse
from app.schemas.product import ProductResponse
from app.schemas.payment import PaymentProofResponse, PaymentVerifyAction
from app.services.store import StoreService
from app.services.product import ProductService
from app.services.payment import PaymentService
from app.repositories.payment import payment_proof_repo
from app.models.user import UserRole
from app.schemas.admin import AdminStatsResponse, UserRoleUpdate, UserToggleActive, PlatformSettingsUpdate, PlatformSettingsResponse, AuditLogResponse
from app.schemas.user import UserResponse
from app.services.admin import AdminService
from app.schemas.common import PaginatedResponse

router = APIRouter()

class RejectReason(BaseModel):
    reason: str

@router.get("/stores", response_model=List[StoreResponse])
async def list_stores(
    status: Optional[StoreStatus] = Query(None),
    current_admin: User = Depends(require_admin),
    db: AsyncSession = Depends(get_db)
):
    """List all stores (filter by status)"""
    return await StoreService.get_all_stores(db, status_filter=status)

@router.post("/stores/{id}/approve", response_model=StoreResponse)
async def approve_store(
    id: UUID,
    current_admin: User = Depends(require_admin),
    db: AsyncSession = Depends(get_db)
):
    """Approve store"""
    return await StoreService.approve_store(db, store_id=id, admin_id=current_admin.id)

@router.post("/stores/{id}/reject", response_model=StoreResponse)
async def reject_store(
    id: UUID,
    payload: RejectReason,
    current_admin: User = Depends(require_admin),
    db: AsyncSession = Depends(get_db)
):
    """Reject store"""
    return await StoreService.reject_store(db, store_id=id, reason=payload.reason)

@router.post("/stores/{id}/suspend", response_model=StoreResponse)
async def suspend_store(
    id: UUID,
    current_admin: User = Depends(require_admin),
    db: AsyncSession = Depends(get_db)
):
    """Suspend store"""
    return await StoreService.suspend_store(db, store_id=id)

@router.post("/products/{id}/hide", response_model=ProductResponse)
async def hide_product(
    id: UUID,
    current_admin: User = Depends(require_admin),
    db: AsyncSession = Depends(get_db)
):
    """Hide a product from the marketplace"""
    return await ProductService.hide_product(db, product_id=id)

@router.post("/products/{id}/approve", response_model=ProductResponse)
async def approve_product(
    id: UUID,
    current_admin: User = Depends(require_admin),
    db: AsyncSession = Depends(get_db)
):
    """Approve a product"""
    return await ProductService.approve_product(db, product_id=id, admin_id=current_admin.id)

@router.get("/payments/pending", response_model=List[PaymentProofResponse])
async def list_pending_payments(
    skip: int = Query(0),
    limit: int = Query(100),
    current_admin: User = Depends(require_admin),
    db: AsyncSession = Depends(get_db)
):
    """List all pending payment proofs"""
    return await payment_proof_repo.get_pending_proofs(db, skip=skip, limit=limit)

@router.post("/payments/{proof_id}/approve", response_model=PaymentProofResponse)
async def approve_payment(
    proof_id: UUID,
    current_admin: User = Depends(require_admin),
    db: AsyncSession = Depends(get_db)
):
    """Approve payment proof"""
    return await PaymentService.approve_proof(db, proof_id=proof_id, admin_id=current_admin.id)

@router.post("/payments/{proof_id}/reject", response_model=PaymentProofResponse)
async def reject_payment(
    proof_id: UUID,
    payload: PaymentVerifyAction,
    current_admin: User = Depends(require_admin),
    db: AsyncSession = Depends(get_db)
):
    return await PaymentService.reject_proof(db, proof_id=proof_id, admin_id=current_admin.id, remarks=payload.remarks or "Rejected by admin")

from app.core.redis import get_cache, set_cache, delete_cache

@router.get("/dashboard/stats", response_model=AdminStatsResponse)
async def get_dashboard_stats(
    current_admin: User = Depends(require_admin),
    db: AsyncSession = Depends(get_db)
):
    """Get overall platform statistics"""
    cache_key = "admin:dashboard:stats"
    cached = await get_cache(cache_key)
    if cached:
        return cached
    stats = await AdminService.get_dashboard_stats(db)
    await set_cache(cache_key, stats.model_dump(mode="json"), ex=60)
    return stats

@router.get("/users", response_model=List[UserResponse])
async def list_users(
    role: Optional[UserRole] = Query(None),
    is_active: Optional[bool] = Query(None),
    skip: int = Query(0),
    limit: int = Query(100),
    current_admin: User = Depends(require_admin),
    db: AsyncSession = Depends(get_db)
):
    """List all users"""
    return await AdminService.list_users(db, role=role, is_active=is_active, skip=skip, limit=limit)

@router.put("/users/{id}/role", response_model=UserResponse)
async def update_user_role(
    id: UUID,
    payload: UserRoleUpdate,
    current_admin: User = Depends(require_admin),
    db: AsyncSession = Depends(get_db)
):
    """Change user role"""
    return await AdminService.update_user_role(db, user_id=id, role=payload.role, admin_id=current_admin.id)

@router.put("/users/{id}/toggle-active", response_model=UserResponse)
async def toggle_user_active(
    id: UUID,
    payload: UserToggleActive,
    current_admin: User = Depends(require_admin),
    db: AsyncSession = Depends(get_db)
):
    """Suspend/activate user"""
    return await AdminService.toggle_user_active(db, user_id=id, is_active=payload.is_active, admin_id=current_admin.id)

@router.get("/audit-logs", response_model=List[AuditLogResponse])
async def list_audit_logs(
    entity: Optional[str] = Query(None),
    action: Optional[str] = Query(None),
    actor_id: Optional[UUID] = Query(None),
    skip: int = Query(0),
    limit: int = Query(100),
    current_admin: User = Depends(require_admin),
    db: AsyncSession = Depends(get_db)
):
    """List audit logs"""
    return await AdminService.get_audit_logs(db, entity=entity, action=action, actor_id=actor_id, skip=skip, limit=limit)

@router.get("/platform-settings", response_model=PlatformSettingsResponse)
async def get_platform_settings(
    current_admin: User = Depends(require_admin),
    db: AsyncSession = Depends(get_db)
):
    """Read platform settings"""
    cache_key = "platform_settings"
    cached = await get_cache(cache_key)
    if cached:
        return cached
    settings = await AdminService.get_platform_settings(db)
    response = PlatformSettingsResponse.model_validate(settings)
    await set_cache(cache_key, response.model_dump(mode="json"), ex=300)
    return response

@router.put("/platform-settings", response_model=PlatformSettingsResponse)
async def update_platform_settings(
    payload: PlatformSettingsUpdate,
    current_admin: User = Depends(require_admin),
    db: AsyncSession = Depends(get_db)
):
    """Update platform settings"""
    settings = await AdminService.update_platform_settings(db, settings_in=payload, admin_id=current_admin.id)
    await delete_cache("platform_settings")
    return settings
