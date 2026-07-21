from uuid import UUID
from typing import List
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import HTTPException, status

from app.models.user import User, Address
from app.repositories.user import user_repo, address_repo
from app.schemas.user import UserUpdate, AddressCreate, AddressUpdate

class UserService:
    @staticmethod
    async def update_profile(db: AsyncSession, user: User, update_data: UserUpdate) -> User:
        obj_in = update_data.model_dump(exclude_unset=True)
        if obj_in:
            user = await user_repo.update(db, db_obj=user, obj_in=obj_in)
        return user

    @staticmethod
    async def get_addresses(db: AsyncSession, user_id: UUID) -> List[Address]:
        return await address_repo.get_by_user_id(db, user_id=user_id)

    @staticmethod
    async def create_address(db: AsyncSession, user_id: UUID, address_data: AddressCreate) -> Address:
        obj_in = address_data.model_dump()
        obj_in["user_id"] = user_id
        
        if obj_in.get("is_default"):
            await address_repo.unset_default_for_user(db, user_id=user_id)
            
        return await address_repo.create(db, obj_in=obj_in)

    @staticmethod
    async def update_address(db: AsyncSession, user_id: UUID, address_id: UUID, address_data: AddressUpdate) -> Address:
        address = await address_repo.get_by_id(db, id=address_id)
        if not address or address.user_id != user_id:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Address not found")
            
        obj_in = address_data.model_dump(exclude_unset=True)
        if obj_in.get("is_default") and not address.is_default:
            await address_repo.unset_default_for_user(db, user_id=user_id)
            
        return await address_repo.update(db, db_obj=address, obj_in=obj_in)

    @staticmethod
    async def delete_address(db: AsyncSession, user_id: UUID, address_id: UUID) -> None:
        address = await address_repo.get_by_id(db, id=address_id)
        if not address or address.user_id != user_id:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Address not found")
            
        await address_repo.delete(db, id=address_id)

    @staticmethod
    async def set_default_address(db: AsyncSession, user_id: UUID, address_id: UUID) -> Address:
        address = await address_repo.get_by_id(db, id=address_id)
        if not address or address.user_id != user_id:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Address not found")
            
        if not address.is_default:
            await address_repo.unset_default_for_user(db, user_id=user_id)
            address = await address_repo.update(db, db_obj=address, obj_in={"is_default": True})
            
        return address
