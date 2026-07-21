from typing import Dict, Any
from app.core.database import async_session_maker
from sqlalchemy.future import select
from app.models.product import Product

async def check_low_stock_task(ctx: Dict[Any, Any]):
    print("Running check_low_stock_task...")
    async with async_session_maker() as db:
        result = await db.execute(select(Product).where(Product.stock < 10))
        low_stock_products = result.scalars().all()
        for product in low_stock_products:
            print(f"Alert: Product {product.id} ({product.name}) is low on stock! ({product.stock} left)")
            # Here we could enqueue an email to the store owner
            # await ctx['redis'].enqueue_job('send_email_task', ...)
    return True
