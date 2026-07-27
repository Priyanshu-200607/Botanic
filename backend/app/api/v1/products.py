import httpx
import mimetypes
from uuid import UUID
from typing import List
from datetime import datetime
from fastapi import APIRouter, Depends, UploadFile, File, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload

from app.core.database import get_db
from app.core.security import get_current_user, require_store_owner
from app.core.config import settings
from app.models.user import User
from app.models.product import Product, ProductImage, ProductStatus
from app.schemas.product import ProductResponse, ProductUpdate, ProductListParams, ProductImageResponse
from app.schemas.common import BaseAPIResponse

router = APIRouter()

@router.get("", response_model=List[ProductResponse])
async def list_products(
    params: ProductListParams = Depends(),
    db: AsyncSession = Depends(get_db)
):
    """Public product listing"""
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
        
    query = query.offset(0).limit(100)
    result = await db.execute(query)
    return list(result.scalars().all())

@router.get("/{id}", response_model=ProductResponse)
async def get_product(
    id: UUID,
    db: AsyncSession = Depends(get_db)
):
    """Public product detail"""
    result = await db.execute(
        select(Product).options(selectinload(Product.images)).filter(Product.id == id)
    )
    product = result.scalar_one_or_none()
    
    if not product or product.status != ProductStatus.active or product.is_hidden:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
        
    return product

@router.put("/{id}", response_model=ProductResponse)
async def update_product(
    id: UUID,
    update_data: ProductUpdate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Update product (seller: own store only)"""
    result = await db.execute(select(Product).filter(Product.id == id))
    product = result.scalar_one_or_none()
    
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
        
    await require_store_owner(str(product.store_id), current_user, db)
    
    obj_in = update_data.model_dump(exclude_unset=True)
    if obj_in:
        for field, value in obj_in.items():
            setattr(product, field, value)
        db.add(product)
        await db.commit()
        await db.refresh(product)
        
    return product

@router.delete("/{id}", response_model=BaseAPIResponse)
async def delete_product(
    id: UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Soft-delete product"""
    result = await db.execute(select(Product).filter(Product.id == id))
    product = result.scalar_one_or_none()
    
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
        
    await require_store_owner(str(product.store_id), current_user, db)
    
    product.deleted_at = datetime.utcnow()
    db.add(product)
    await db.commit()
    
    return BaseAPIResponse(message="Product deleted successfully")

@router.post("/{id}/images", response_model=ProductImageResponse)
async def upload_product_image(
    id: UUID,
    file: UploadFile = File(...),
    display_order: int = 0,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Upload product image"""
    result = await db.execute(select(Product).filter(Product.id == id))
    product = result.scalar_one_or_none()
    
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
        
    await require_store_owner(str(product.store_id), current_user, db)
    
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image")

    content = await file.read()
    if len(content) > 5 * 1024 * 1024:
        raise HTTPException(status_code=400, detail="File size exceeds 5MB limit")

    if not settings.SUPABASE_URL or not settings.SUPABASE_SERVICE_ROLE_KEY:
        image_url = f"https://mock-storage/{id}/{file.filename}"
    else:
        mime_type, _ = mimetypes.guess_type(file.filename)
        if not mime_type:
            mime_type = "application/octet-stream"
            
        storage_url = f"{settings.SUPABASE_URL}/storage/v1/object/product-images/{id}/{file.filename}"
        headers = {
            "Authorization": f"Bearer {settings.SUPABASE_SERVICE_ROLE_KEY}",
            "apikey": settings.SUPABASE_SERVICE_ROLE_KEY,
            "Content-Type": mime_type
        }
        
        async with httpx.AsyncClient() as client:
            response = await client.post(storage_url, content=content, headers=headers)
            if response.status_code not in (200, 201):
                print(f"Storage upload error: {response.text}")
        
        image_url = f"{settings.SUPABASE_URL}/storage/v1/object/public/product-images/{id}/{file.filename}"

    db_obj = ProductImage(product_id=id, image_url=image_url, display_order=display_order)
    db.add(db_obj)
    await db.commit()
    await db.refresh(db_obj)
    return db_obj

@router.delete("/{id}/images/{image_id}", response_model=BaseAPIResponse)
async def delete_product_image(
    id: UUID,
    image_id: UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Delete product image"""
    result = await db.execute(select(Product).filter(Product.id == id))
    product = result.scalar_one_or_none()
    
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
        
    await require_store_owner(str(product.store_id), current_user, db)
    
    result = await db.execute(select(ProductImage).filter(ProductImage.id == image_id))
    image = result.scalar_one_or_none()
    
    if not image or image.product_id != id:
        raise HTTPException(status_code=404, detail="Image not found")
        
    await db.delete(image)
    await db.commit()
    
    return BaseAPIResponse(message="Image deleted successfully")
