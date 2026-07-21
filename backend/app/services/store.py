from uuid import UUID
from datetime import datetime
from typing import List, Optional
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import HTTPException, status

from app.models.store import Store, StoreMember, StoreStatus, StoreRole
from app.models.user import User, UserRole
from app.repositories.store import store_repo, store_member_repo
from app.repositories.user import user_repo
from app.schemas.store import StoreCreate, StoreUpdate, StoreMemberInvite

class StoreService:
    @staticmethod
    async def create_store(db: AsyncSession, owner_id: UUID, store_data: StoreCreate) -> Store:
        existing_store = await store_repo.get_by_owner_id(db, owner_id=owner_id)
        if existing_store:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User already owns a store")
            
        obj_in = store_data.model_dump()
        obj_in["owner_id"] = owner_id
        obj_in["status"] = StoreStatus.pending
        obj_in["approval_status"] = "pending_review"
        
        store = await store_repo.create(db, obj_in=obj_in)
        
        member_in = {
            "store_id": store.id,
            "user_id": owner_id,
            "role": StoreRole.owner
        }
        await store_member_repo.create(db, obj_in=member_in)
        
        return store

    @staticmethod
    async def get_my_store(db: AsyncSession, user_id: UUID) -> Store:
        store = await store_repo.get_by_owner_id(db, owner_id=user_id)
        if not store:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Store not found")
        return store

    @staticmethod
    async def update_store(db: AsyncSession, store_id: UUID, update_data: StoreUpdate) -> Store:
        store = await store_repo.get_by_id(db, id=store_id)
        if not store:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Store not found")
            
        obj_in = update_data.model_dump(exclude_unset=True)
        if obj_in:
            store = await store_repo.update(db, db_obj=store, obj_in=obj_in)
        return store

    @staticmethod
    async def invite_member(db: AsyncSession, store_id: UUID, invite_data: StoreMemberInvite) -> StoreMember:
        user = await user_repo.get_by_email(db, email=invite_data.email)
        if not user:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
            
        existing_member = await store_member_repo.get_member(db, store_id=store_id, user_id=user.id)
        if existing_member:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User is already a member")
            
        obj_in = {
            "store_id": store_id,
            "user_id": user.id,
            "role": invite_data.role
        }
        return await store_member_repo.create(db, obj_in=obj_in)
        
    @staticmethod
    async def remove_member(db: AsyncSession, store_id: UUID, user_id: UUID) -> None:
        store = await store_repo.get_by_id(db, id=store_id)
        if store and store.owner_id == user_id:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Cannot remove the store owner")
            
        await store_member_repo.delete_member(db, store_id=store_id, user_id=user_id)

    @staticmethod
    async def get_all_stores(db: AsyncSession, status_filter: Optional[StoreStatus] = None) -> List[Store]:
        return await store_repo.get_all_filtered(db, status=status_filter)

    @staticmethod
    async def approve_store(db: AsyncSession, store_id: UUID, admin_id: UUID) -> Store:
        store = await store_repo.get_by_id(db, id=store_id)
        if not store:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Store not found")
            
        obj_in = {
            "status": StoreStatus.active,
            "approval_status": "approved",
            "approved_by": admin_id,
            "approved_at": datetime.utcnow(),
            "rejection_reason": None,
            "is_active": True
        }
        store = await store_repo.update(db, db_obj=store, obj_in=obj_in)
        
        owner = await user_repo.get_by_id(db, id=store.owner_id)
        if owner and owner.role == UserRole.user:
            await user_repo.update(db, db_obj=owner, obj_in={"role": UserRole.seller})
            
        return store

    @staticmethod
    async def reject_store(db: AsyncSession, store_id: UUID, reason: str) -> Store:
        store = await store_repo.get_by_id(db, id=store_id)
        if not store:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Store not found")
            
        obj_in = {
            "status": StoreStatus.suspended,
            "approval_status": "rejected",
            "rejection_reason": reason,
            "is_active": False
        }
        return await store_repo.update(db, db_obj=store, obj_in=obj_in)

    @staticmethod
    async def suspend_store(db: AsyncSession, store_id: UUID) -> Store:
        store = await store_repo.get_by_id(db, id=store_id)
        if not store:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Store not found")
            
        new_status = StoreStatus.suspended if store.is_active else StoreStatus.active
        new_active = not store.is_active
        
        obj_in = {
            "status": new_status,
            "is_active": new_active
        }
        return await store_repo.update(db, db_obj=store, obj_in=obj_in)
