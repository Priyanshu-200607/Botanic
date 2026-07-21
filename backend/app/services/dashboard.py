from uuid import UUID
from typing import List
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import func, desc
from decimal import Decimal

from app.models.order import Order, OrderStatus, OrderItem
from app.models.product import Product
from app.schemas.dashboard import SellerStatsResponse, RecentOrderResponse, TopProductResponse

class DashboardService:
    @staticmethod
    async def get_seller_stats(db: AsyncSession, store_id: UUID) -> SellerStatsResponse:
        total_revenue = await db.scalar(
            select(func.sum(Order.total_amount))
            .where(Order.store_id == store_id)
            .where(Order.status != OrderStatus.cancelled)
        )
        total_orders = await db.scalar(
            select(func.count(Order.id))
            .where(Order.store_id == store_id)
        )
        product_count = await db.scalar(
            select(func.count(Product.id))
            .where(Product.store_id == store_id)
        )
        pending_orders = await db.scalar(
            select(func.count(Order.id))
            .where(Order.store_id == store_id)
            .where(Order.status == OrderStatus.paid)
        )

        return SellerStatsResponse(
            total_revenue=total_revenue or Decimal('0.0'),
            total_orders=total_orders or 0,
            product_count=product_count or 0,
            pending_orders=pending_orders or 0
        )

    @staticmethod
    async def get_recent_orders(db: AsyncSession, store_id: UUID, limit: int = 10) -> List[Order]:
        query = select(Order).where(Order.store_id == store_id).order_by(desc(Order.created_at)).limit(limit)
        result = await db.execute(query)
        return list(result.scalars().all())

    @staticmethod
    async def get_top_products(db: AsyncSession, store_id: UUID, limit: int = 5) -> List[TopProductResponse]:
        query = (
            select(
                Product.id,
                Product.name,
                func.sum(OrderItem.quantity).label("units_sold"),
                func.sum(OrderItem.line_total).label("revenue")
            )
            .join(OrderItem, OrderItem.product_id == Product.id)
            .join(Order, Order.id == OrderItem.order_id)
            .where(Product.store_id == store_id)
            .where(Order.status != OrderStatus.cancelled)
            .group_by(Product.id)
            .order_by(desc("units_sold"))
            .limit(limit)
        )
        result = await db.execute(query)
        
        top_products = []
        for row in result.all():
            top_products.append(
                TopProductResponse(
                    id=row.id,
                    name=row.name,
                    units_sold=row.units_sold or 0,
                    revenue=row.revenue or Decimal('0.0')
                )
            )
        return top_products
