from uuid import UUID
from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.security import get_current_user
from app.models.user import User
from app.schemas.user import UserResponse, UserUpdate, AddressCreate, AddressUpdate, AddressResponse
from app.schemas.common import BaseAPIResponse
from app.services.user import UserService

router = APIRouter()

@router.put("/me", response_model=UserResponse)
async def update_profile(
    update_data: UserUpdate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Update current user profile"""
    return await UserService.update_profile(db, user=current_user, update_data=update_data)

@router.get("/me/addresses", response_model=List[AddressResponse])
async def get_addresses(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Get all addresses for current user"""
    return await UserService.get_addresses(db, user_id=current_user.id)

@router.post("/me/addresses", response_model=AddressResponse)
async def create_address(
    address_data: AddressCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Create a new address"""
    return await UserService.create_address(db, user_id=current_user.id, address_data=address_data)

@router.put("/me/addresses/{address_id}", response_model=AddressResponse)
async def update_address(
    address_id: UUID,
    address_data: AddressUpdate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Update an existing address"""
    return await UserService.update_address(db, user_id=current_user.id, address_id=address_id, address_data=address_data)

@router.delete("/me/addresses/{address_id}", response_model=BaseAPIResponse)
async def delete_address(
    address_id: UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Delete an address"""
    await UserService.delete_address(db, user_id=current_user.id, address_id=address_id)
    return BaseAPIResponse(message="Address deleted successfully")

@router.put("/me/addresses/{address_id}/set-default", response_model=AddressResponse)
async def set_default_address(
    address_id: UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Set an address as default"""
    return await UserService.set_default_address(db, user_id=current_user.id, address_id=address_id)
