from typing import Optional, List
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import update, delete, func
from sqlalchemy.orm import selectinload
from uuid import UUID

from app.models.product import Product, ProductImage, ProductStatus
from app.repositories.base import BaseRepository
from app.schemas.product import ProductListParams

class ProductRepository(BaseRepository[Product]):
    def __init__(self):
        super().__init__(Product)
        
    async def get_by_id_with_images(self, db: AsyncSession, id: UUID) -> Optional[Product]:
        result = await db.execute(
            select(Product).options(selectinload(Product.images)).filter(Product.id == id)
        )
        return result.scalar_one_or_none()

    async def get_list(self, db: AsyncSession, params: ProductListParams, skip: int = 0, limit: int = 100) -> List[Product]:
        query = select(Product).options(selectinload(Product.images))
        
        # Default filters: active and not hidden
        query = query.filter(Product.status == ProductStatus.active, Product.is_hidden == False)
        
        if params.category:
            query = query.filter(Product.category == params.category)
        if params.store_id:
            query = query.filter(Product.store_id == params.store_id)
        if params.min_price is not None:
            query = query.filter(Product.price >= params.min_price)
        if params.max_price is not None:
            query = query.filter(Product.price <= params.max_price)
            
        query = query.offset(skip).limit(limit)
        result = await db.execute(query)
        return list(result.scalars().all())

class ProductImageRepository(BaseRepository[ProductImage]):
    def __init__(self):
        super().__init__(ProductImage)
        
    async def get_by_product_id(self, db: AsyncSession, product_id: UUID) -> List[ProductImage]:
        result = await db.execute(
            select(ProductImage).filter(ProductImage.product_id == product_id).order_by(ProductImage.display_order)
        )
        return list(result.scalars().all())

product_repo = ProductRepository()
product_image_repo = ProductImageRepository()
