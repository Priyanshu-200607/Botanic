from uuid import UUID
from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.cart import Cart, CartItem
from app.repositories.cart import cart_repo, cart_item_repo
from app.repositories.product import product_repo
from app.schemas.cart import CartItemAdd, CartItemUpdate, MergeGuestCartRequest

class CartService:
    @staticmethod
    async def get_my_cart(db: AsyncSession, user_id: UUID) -> Cart:
        return await cart_repo.get_or_create(db, user_id=user_id)
        
    @staticmethod
    async def add_item(db: AsyncSession, user_id: UUID, item_data: CartItemAdd) -> CartItem:
        cart = await cart_repo.get_or_create(db, user_id=user_id)
        product = await product_repo.get_by_id(db, id=item_data.product_id)
        
        if not product:
            raise HTTPException(status_code=404, detail="Product not found")
        if product.inventory_count < item_data.quantity:
            raise HTTPException(status_code=400, detail="Not enough stock available")
            
        existing_item = await cart_item_repo.get_item(db, cart_id=cart.id, product_id=item_data.product_id)
        
        if existing_item:
            new_qty = existing_item.quantity + item_data.quantity
            if product.inventory_count < new_qty:
                raise HTTPException(status_code=400, detail="Not enough stock available for combined quantity")
            return await cart_item_repo.update(db, db_obj=existing_item, obj_in={"quantity": new_qty})
        else:
            obj_in = {
                "cart_id": cart.id,
                "product_id": item_data.product_id,
                "quantity": item_data.quantity
            }
            return await cart_item_repo.create(db, obj_in=obj_in)
            
    @staticmethod
    async def update_item(db: AsyncSession, user_id: UUID, item_id: UUID, update_data: CartItemUpdate) -> CartItem:
        cart = await cart_repo.get_by_user_id(db, user_id)
        if not cart:
            raise HTTPException(status_code=404, detail="Cart not found")
            
        item = await cart_item_repo.get_by_id(db, id=item_id)
        if not item or item.cart_id != cart.id:
            raise HTTPException(status_code=404, detail="Item not found in cart")
            
        product = await product_repo.get_by_id(db, id=item.product_id)
        if product.inventory_count < update_data.quantity:
            raise HTTPException(status_code=400, detail="Not enough stock available")
            
        return await cart_item_repo.update(db, db_obj=item, obj_in={"quantity": update_data.quantity})
        
    @staticmethod
    async def remove_item(db: AsyncSession, user_id: UUID, item_id: UUID) -> None:
        cart = await cart_repo.get_by_user_id(db, user_id)
        if not cart:
            raise HTTPException(status_code=404, detail="Cart not found")
            
        item = await cart_item_repo.get_by_id(db, id=item_id)
        if not item or item.cart_id != cart.id:
            raise HTTPException(status_code=404, detail="Item not found in cart")
            
        await cart_item_repo.delete(db, id=item_id)
        
    @staticmethod
    async def clear_cart(db: AsyncSession, user_id: UUID) -> None:
        cart = await cart_repo.get_by_user_id(db, user_id)
        if cart:
            await cart_item_repo.clear_cart(db, cart_id=cart.id)
            
    @staticmethod
    async def merge_guest_cart(db: AsyncSession, user_id: UUID, merge_data: MergeGuestCartRequest) -> Cart:
        for item in merge_data.items:
            try:
                await CartService.add_item(db, user_id, item)
            except HTTPException:
                pass
        return await CartService.get_my_cart(db, user_id)
