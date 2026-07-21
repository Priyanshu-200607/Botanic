from uuid import UUID
from typing import List
from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.security import get_current_user, require_store_owner
from app.models.user import User
from app.schemas.product import ProductResponse, ProductUpdate, ProductListParams, ProductImageResponse
from app.schemas.common import BaseAPIResponse
from app.services.product import ProductService
from app.repositories.product import product_repo

router = APIRouter()

@router.get("", response_model=List[ProductResponse])
async def list_products(
    params: ProductListParams = Depends(),
    db: AsyncSession = Depends(get_db)
):
    """Public product listing"""
    return await ProductService.get_public_products(db, params=params)

@router.get("/{id}", response_model=ProductResponse)
async def get_product(
    id: UUID,
    db: AsyncSession = Depends(get_db)
):
    """Public product detail"""
    return await ProductService.get_public_product(db, product_id=id)

@router.put("/{id}", response_model=ProductResponse)
async def update_product(
    id: UUID,
    update_data: ProductUpdate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Update product (seller: own store only)"""
    product = await product_repo.get_by_id(db, id=id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
        
    await require_store_owner(str(product.store_id), current_user, db)
    return await ProductService.update_product(db, product_id=id, update_data=update_data)

@router.delete("/{id}", response_model=BaseAPIResponse)
async def delete_product(
    id: UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Soft-delete product"""
    product = await product_repo.get_by_id(db, id=id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
        
    await require_store_owner(str(product.store_id), current_user, db)
    await ProductService.soft_delete_product(db, product_id=id)
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
    product = await product_repo.get_by_id(db, id=id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
        
    await require_store_owner(str(product.store_id), current_user, db)
    return await ProductService.upload_image(db, product_id=id, file=file, display_order=display_order)

@router.delete("/{id}/images/{image_id}", response_model=BaseAPIResponse)
async def delete_product_image(
    id: UUID,
    image_id: UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Delete product image"""
    product = await product_repo.get_by_id(db, id=id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
        
    await require_store_owner(str(product.store_id), current_user, db)
    await ProductService.delete_image(db, product_id=id, image_id=image_id)
    return BaseAPIResponse(message="Image deleted successfully")
