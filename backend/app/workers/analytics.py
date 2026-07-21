from typing import Dict, Any
from app.core.database import async_session_maker
from sqlalchemy.future import select
from sqlalchemy import func
from datetime import datetime, timedelta
from app.models.order import Order, OrderStatus

async def daily_revenue_aggregation_task(ctx: Dict[Any, Any]):
    print("Running daily_revenue_aggregation_task...")
    yesterday = datetime.utcnow() - timedelta(days=1)
    
    async with async_session_maker() as db:
        result = await db.execute(
            select(func.sum(Order.total_amount))
            .where(Order.status == OrderStatus.paid)
            .where(Order.created_at >= yesterday)
        )
        total_revenue = result.scalar() or 0
        print(f"Total revenue for past 24 hours: {total_revenue}")
        # Could save this to a daily_analytics table in production
    return True
