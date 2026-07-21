from typing import Optional, List
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import delete
from sqlalchemy.orm import selectinload
from uuid import UUID

from app.models.cart import Cart, CartItem
from app.repositories.base import BaseRepository

class CartRepository(BaseRepository[Cart]):
    def __init__(self):
        super().__init__(Cart)
        
    async def get_by_user_id(self, db: AsyncSession, user_id: UUID) -> Optional[Cart]:
        result = await db.execute(
            select(Cart)
            .options(
                selectinload(Cart.items).selectinload(CartItem.product).selectinload("images")
            )
            .filter(Cart.user_id == user_id)
        )
        return result.scalar_one_or_none()

    async def get_or_create(self, db: AsyncSession, user_id: UUID) -> Cart:
        cart = await self.get_by_user_id(db, user_id)
        if not cart:
            cart = await self.create(db, obj_in={"user_id": user_id})
        return cart

class CartItemRepository(BaseRepository[CartItem]):
    def __init__(self):
        super().__init__(CartItem)
        
    async def get_item(self, db: AsyncSession, cart_id: UUID, product_id: UUID) -> Optional[CartItem]:
        result = await db.execute(
            select(CartItem).filter(CartItem.cart_id == cart_id, CartItem.product_id == product_id)
        )
        return result.scalar_one_or_none()
        
    async def clear_cart(self, db: AsyncSession, cart_id: UUID) -> None:
        await db.execute(delete(CartItem).filter(CartItem.cart_id == cart_id))
        await db.commit()

cart_repo = CartRepository()
cart_item_repo = CartItemRepository()
