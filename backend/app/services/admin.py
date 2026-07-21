from uuid import UUID
from typing import Optional, List
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import func
from fastapi import HTTPException
import logging

from app.models.user import User, UserRole
from app.models.store import Store
from app.models.order import Order, OrderStatus
from app.models.platform_settings import PlatformSettings
from app.models.audit_log import AuditLog
from app.schemas.admin import AdminStatsResponse, UserRoleUpdate, UserToggleActive, PlatformSettingsUpdate
from app.services.audit import AuditService

logger = logging.getLogger(__name__)

class AdminService:
    @staticmethod
    async def get_dashboard_stats(db: AsyncSession) -> AdminStatsResponse:
        total_users = await db.scalar(select(func.count(User.id)))
        total_stores = await db.scalar(select(func.count(Store.id)))
        total_orders = await db.scalar(select(func.count(Order.id)))
        total_gmv = await db.scalar(
            select(func.sum(Order.total_amount)).where(Order.status != OrderStatus.cancelled)
        )
        return AdminStatsResponse(
            total_users=total_users or 0,
            total_stores=total_stores or 0,
            total_orders=total_orders or 0,
            total_gmv=total_gmv or 0
        )

    @staticmethod
    async def list_users(db: AsyncSession, role: Optional[UserRole], is_active: Optional[bool], skip: int, limit: int) -> List[User]:
        query = select(User)
        if role:
            query = query.where(User.role == role)
        if is_active is not None:
            query = query.where(User.is_active == is_active)
        query = query.offset(skip).limit(limit)
        result = await db.execute(query)
        return list(result.scalars().all())

    @staticmethod
    async def update_user_role(db: AsyncSession, user_id: UUID, role: UserRole, admin_id: UUID) -> User:
        user = await db.get(User, user_id)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        old_role = user.role
        user.role = role
        await AuditService.log_action(db, admin_id, "UPDATE_ROLE", "user", user.id, {"role": str(old_role)}, {"role": str(role)})
        await db.commit()
        await db.refresh(user)
        return user

    @staticmethod
    async def toggle_user_active(db: AsyncSession, user_id: UUID, is_active: bool, admin_id: UUID) -> User:
        user = await db.get(User, user_id)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        old_is_active = user.is_active
        user.is_active = is_active
        await AuditService.log_action(db, admin_id, "TOGGLE_ACTIVE", "user", user.id, {"is_active": old_is_active}, {"is_active": is_active})
        await db.commit()
        await db.refresh(user)
        return user

    @staticmethod
    async def get_audit_logs(db: AsyncSession, entity: Optional[str], action: Optional[str], actor_id: Optional[UUID], skip: int, limit: int) -> List[AuditLog]:
        query = select(AuditLog)
        if entity:
            query = query.where(AuditLog.entity == entity)
        if action:
            query = query.where(AuditLog.action == action)
        if actor_id:
            query = query.where(AuditLog.actor_id == actor_id)
        query = query.order_by(AuditLog.created_at.desc()).offset(skip).limit(limit)
        result = await db.execute(query)
        return list(result.scalars().all())

    @staticmethod
    async def get_platform_settings(db: AsyncSession) -> PlatformSettings:
        result = await db.execute(select(PlatformSettings))
        settings = result.scalar_one_or_none()
        if not settings:
            settings = PlatformSettings()
            db.add(settings)
            await db.commit()
            await db.refresh(settings)
        return settings

    @staticmethod
    async def update_platform_settings(db: AsyncSession, settings_in: PlatformSettingsUpdate, admin_id: UUID) -> PlatformSettings:
        settings = await AdminService.get_platform_settings(db)
        
        old_data = {}
        new_data = {}
        for key, value in settings_in.model_dump(exclude_unset=True).items():
            if hasattr(settings, key):
                old_val = getattr(settings, key)
                setattr(settings, key, value)
                old_data[key] = str(old_val) if old_val is not None else None
                new_data[key] = str(value) if value is not None else None

        if old_data or new_data:
            await AuditService.log_action(db, admin_id, "UPDATE_SETTINGS", "platform_settings", settings.id, old_data, new_data)
            await db.commit()
            await db.refresh(settings)
        return settings
