from typing import Optional, List
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import update
from uuid import UUID

from app.models.user import User, Address
from app.repositories.base import BaseRepository

class UserRepository(BaseRepository[User]):
    def __init__(self):
        super().__init__(User)

    async def get_by_email(self, db: AsyncSession, email: str) -> Optional[User]:
        result = await db.execute(select(User).filter(User.email == email))
        return result.scalar_one_or_none()

class AddressRepository(BaseRepository[Address]):
    def __init__(self):
        super().__init__(Address)
        
    async def get_by_user_id(self, db: AsyncSession, user_id: UUID) -> List[Address]:
        result = await db.execute(select(Address).filter(Address.user_id == user_id))
        return list(result.scalars().all())
        
    async def unset_default_for_user(self, db: AsyncSession, user_id: UUID):
        await db.execute(
            update(Address)
            .where(Address.user_id == user_id)
            .values(is_default=False)
        )
        await db.commit()

user_repo = UserRepository()
address_repo = AddressRepository()
