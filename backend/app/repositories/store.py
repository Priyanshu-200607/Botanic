from typing import Optional, List
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import update, delete
from uuid import UUID

from app.models.store import Store, StoreMember, StoreStatus, StoreRole
from app.repositories.base import BaseRepository

class StoreRepository(BaseRepository[Store]):
    def __init__(self):
        super().__init__(Store)
        
    async def get_by_owner_id(self, db: AsyncSession, owner_id: UUID) -> Optional[Store]:
        result = await db.execute(select(Store).filter(Store.owner_id == owner_id))
        return result.scalar_one_or_none()
        
    async def get_all_filtered(self, db: AsyncSession, status: Optional[StoreStatus] = None, skip: int = 0, limit: int = 100) -> List[Store]:
        query = select(Store)
        if status:
            query = query.filter(Store.status == status)
        query = query.offset(skip).limit(limit)
        result = await db.execute(query)
        return list(result.scalars().all())

class StoreMemberRepository(BaseRepository[StoreMember]):
    def __init__(self):
        super().__init__(StoreMember)
        
    async def get_members_by_store(self, db: AsyncSession, store_id: UUID) -> List[StoreMember]:
        result = await db.execute(select(StoreMember).filter(StoreMember.store_id == store_id))
        return list(result.scalars().all())
        
    async def get_member(self, db: AsyncSession, store_id: UUID, user_id: UUID) -> Optional[StoreMember]:
        result = await db.execute(
            select(StoreMember).filter(StoreMember.store_id == store_id, StoreMember.user_id == user_id)
        )
        return result.scalar_one_or_none()
        
    async def delete_member(self, db: AsyncSession, store_id: UUID, user_id: UUID) -> None:
        member = await self.get_member(db, store_id, user_id)
        if member:
            await db.delete(member)
            await db.commit()

store_repo = StoreRepository()
store_member_repo = StoreMemberRepository()
