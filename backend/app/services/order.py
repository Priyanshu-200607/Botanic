from uuid import UUID
from collections import defaultdict
from typing import List
from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import text

from app.models.order import Order, OrderItem, OrderStatus
from app.models.payment import Payment, PaymentStatus
from app.repositories.cart import cart_repo, cart_item_repo
from app.repositories.order import order_repo, order_item_repo
from app.repositories.user import address_repo
from app.schemas.order import CheckoutRequest
from app.models.platform_settings import PlatformSettings

class OrderService:
    @staticmethod
    async def get_platform_fee(db: AsyncSession) -> float:
        result = await db.execute(select(PlatformSettings).limit(1))
        settings = result.scalar_one_or_none()
        return float(settings.platform_fee_percent) if settings else 5.0

    @staticmethod
    async def checkout(db: AsyncSession, user_id: UUID, checkout_data: CheckoutRequest) -> List[Order]:
        address = await address_repo.get_by_id(db, id=checkout_data.address_id)
        if not address or address.user_id != user_id:
            raise HTTPException(status_code=404, detail="Address not found")
            
        cart = await cart_repo.get_by_user_id(db, user_id)
        if not cart or not cart.items:
            raise HTTPException(status_code=400, detail="Cart is empty")
            
        platform_fee_percent = await OrderService.get_platform_fee(db)
        
        store_items = defaultdict(list)
        for item in cart.items:
            store_items[item.product.store_id].append(item)
            
        created_orders = []
        
        for store_id, items in store_items.items():
            total_amount = 0.0
            order_items_to_create = []
            
            for item in items:
                result = await db.execute(
                    text("SELECT decrement_product_stock(:prod_id, :qty)"),
                    {"prod_id": str(item.product_id), "qty": item.quantity}
                )
                success = result.scalar()
                if not success:
                    raise HTTPException(status_code=400, detail=f"Product '{item.product.name}' is out of stock")
                
                unit_price = float(item.product.price)
                line_total = unit_price * item.quantity
                total_amount += line_total
                
                order_items_to_create.append({
                    "product_id": item.product_id,
                    "quantity": item.quantity,
                    "unit_price": unit_price,
                    "total_price": line_total
                })
                
            shipping_fee = 50.0
            platform_fee = total_amount * (platform_fee_percent / 100)
            grand_total = total_amount + shipping_fee + platform_fee
            
            order_in = {
                "user_id": user_id,
                "store_id": store_id,
                "address_id": address.id,
                "status": OrderStatus.pending,
                "total_amount": total_amount,
                "platform_fee": platform_fee,
                "shipping_fee": shipping_fee,
                "grand_total": grand_total
            }
            
            order = await order_repo.create(db, obj_in=order_in)
            
            for o_item in order_items_to_create:
                o_item["order_id"] = order.id
                await order_item_repo.create(db, obj_in=o_item)
                
            payment = Payment(
                order_id=order.id,
                amount=grand_total,
                status=PaymentStatus.pending
            )
            db.add(payment)
            await db.commit()
            
            created_orders.append(order)
            
        await cart_item_repo.clear_cart(db, cart_id=cart.id)
        
        return created_orders

    @staticmethod
    async def get_my_orders(db: AsyncSession, user_id: UUID) -> List[Order]:
        return await order_repo.get_by_user_id(db, user_id=user_id)

    @staticmethod
    async def get_order_detail(db: AsyncSession, order_id: UUID, user_id: UUID) -> Order:
        order = await order_repo.get_order_with_items(db, order_id=order_id)
        if not order:
            raise HTTPException(status_code=404, detail="Order not found")
        # Check IDOR: user is either the customer or the owner of the store
        # Here we only check customer. For store owner we have a different function or we check both.
        if order.user_id != user_id:
            # Check if user owns the store
            from app.repositories.store import store_member_repo
            member = await store_member_repo.get_member(db, store_id=order.store_id, user_id=user_id)
            if not member:
                raise HTTPException(status_code=403, detail="Not authorized to view this order")
        return order

    @staticmethod
    async def cancel_order(db: AsyncSession, order_id: UUID, user_id: UUID) -> Order:
        order = await order_repo.get_by_id(db, id=order_id)
        if not order:
            raise HTTPException(status_code=404, detail="Order not found")
            
        is_customer = (order.user_id == user_id)
        
        if is_customer:
            if order.status not in (OrderStatus.pending, OrderStatus.processing):
                raise HTTPException(status_code=400, detail="Order cannot be cancelled by customer at this stage")
        else:
            from app.repositories.store import store_member_repo
            member = await store_member_repo.get_member(db, store_id=order.store_id, user_id=user_id)
            if not member:
                raise HTTPException(status_code=403, detail="Not authorized to cancel this order")
            if order.status == OrderStatus.shipped or order.status == OrderStatus.delivered:
                raise HTTPException(status_code=400, detail="Order has already been shipped")
                
        # In a real app we'd also reverse the stock decrement here!
        return await order_repo.update(db, db_obj=order, obj_in={"status": OrderStatus.cancelled})

    @staticmethod
    async def update_status(db: AsyncSession, order_id: UUID, store_id: UUID, new_status: OrderStatus) -> Order:
        order = await order_repo.get_by_id(db, id=order_id)
        if not order or order.store_id != store_id:
            raise HTTPException(status_code=404, detail="Order not found")
            
        return await order_repo.update(db, db_obj=order, obj_in={"status": new_status})
