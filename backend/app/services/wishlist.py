from uuid import UUID
from typing import Tuple, List
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import HTTPException

from app.models.wishlist import Wishlist
from app.repositories.wishlist import wishlist_repo

class WishlistService:
    @staticmethod
    async def toggle_wishlist_item(
        db: AsyncSession, user_id: UUID, product_id: UUID
    ) -> bool:
        # Idempotent toggle
        return await wishlist_repo.toggle_item(db, user_id=user_id, product_id=product_id)

    @staticmethod
    async def list_wishlist(
        db: AsyncSession, user_id: UUID, skip: int = 0, limit: int = 20
    ) -> Tuple[List[Wishlist], int]:
        return await wishlist_repo.list_by_user(db, user_id=user_id, skip=skip, limit=limit)
