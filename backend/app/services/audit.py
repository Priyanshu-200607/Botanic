from uuid import UUID
from typing import Optional, Dict, Any
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.audit_log import AuditLog

class AuditService:
    @staticmethod
    async def log_action(
        db: AsyncSession,
        actor_id: UUID,
        action: str,
        entity: str,
        entity_id: UUID,
        old_data: Optional[Dict[str, Any]] = None,
        new_data: Optional[Dict[str, Any]] = None,
        ip_address: Optional[str] = None
    ) -> AuditLog:
        changes = None
        if old_data or new_data:
            changes = {"old": old_data, "new": new_data}
            
        audit = AuditLog(
            actor_id=actor_id,
            action=action,
            entity=entity,
            entity_id=entity_id,
            changes=changes,
            ip_address=ip_address
        )
        db.add(audit)
        await db.commit()
        return audit
