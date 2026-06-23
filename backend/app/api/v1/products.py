from fastapi import APIRouter, Depends, HTTPException, Query
from typing import List, Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.core.database import get_db
from app.models.product import Product, ProductStatus
from app.schemas.product import ProductResponse

router = APIRouter()

@router.get("/", response_model=List[ProductResponse])
async def get_products(
    db: AsyncSession = Depends(get_db),
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    store_id: Optional[str] = None,
    status: Optional[ProductStatus] = ProductStatus.active
):
    query = select(Product)
    
    if store_id:
        query = query.where(Product.store_id == store_id)
    if status:
        query = query.where(Product.status == status)
        
    query = query.offset(skip).limit(limit)
    result = await db.execute(query)
    products = result.scalars().all()
    
    return products

@router.get("/{product_id}", response_model=ProductResponse)
async def get_product(
    product_id: str,
    db: AsyncSession = Depends(get_db)
):
    query = select(Product).where(Product.id == product_id)
    result = await db.execute(query)
    product = result.scalar_one_or_none()
    
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
        
    return product
