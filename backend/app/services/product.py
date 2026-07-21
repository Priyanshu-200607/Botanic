from uuid import UUID
from datetime import datetime
from typing import List, Optional
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import HTTPException, status, UploadFile
import httpx
import mimetypes

from app.models.product import Product, ProductImage, ProductStatus
from app.repositories.product import product_repo, product_image_repo
from app.schemas.product import ProductCreate, ProductUpdate, ProductListParams
from app.core.config import settings

class ProductService:
    @staticmethod
    async def create_product(db: AsyncSession, store_id: UUID, product_data: ProductCreate) -> Product:
        obj_in = product_data.model_dump()
        obj_in["store_id"] = store_id
        obj_in["status"] = ProductStatus.draft
        return await product_repo.create(db, obj_in=obj_in)

    @staticmethod
    async def update_product(db: AsyncSession, product_id: UUID, update_data: ProductUpdate) -> Product:
        product = await product_repo.get_by_id(db, id=product_id)
        if not product:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
            
        obj_in = update_data.model_dump(exclude_unset=True)
        if obj_in:
            product = await product_repo.update(db, db_obj=product, obj_in=obj_in)
        return product

    @staticmethod
    async def soft_delete_product(db: AsyncSession, product_id: UUID) -> None:
        product = await product_repo.get_by_id(db, id=product_id)
        if not product:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
            
        await product_repo.update(db, db_obj=product, obj_in={"deleted_at": datetime.utcnow()})

    @staticmethod
    async def upload_image(db: AsyncSession, product_id: UUID, file: UploadFile, display_order: int = 0) -> ProductImage:
        product = await product_repo.get_by_id(db, id=product_id)
        if not product:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
            
        if not file.content_type.startswith("image/"):
            raise HTTPException(status_code=400, detail="File must be an image")

        content = await file.read()
        if len(content) > 5 * 1024 * 1024:
            raise HTTPException(status_code=400, detail="File size exceeds 5MB limit")

        if not settings.SUPABASE_URL or not settings.SUPABASE_SERVICE_ROLE_KEY:
            image_url = f"https://mock-storage/{product_id}/{file.filename}"
        else:
            mime_type, _ = mimetypes.guess_type(file.filename)
            if not mime_type:
                mime_type = "application/octet-stream"
                
            storage_url = f"{settings.SUPABASE_URL}/storage/v1/object/product-images/{product_id}/{file.filename}"
            headers = {
                "Authorization": f"Bearer {settings.SUPABASE_SERVICE_ROLE_KEY}",
                "apikey": settings.SUPABASE_SERVICE_ROLE_KEY,
                "Content-Type": mime_type
            }
            
            async with httpx.AsyncClient() as client:
                response = await client.post(storage_url, content=content, headers=headers)
                if response.status_code not in (200, 201):
                    print(f"Storage upload error: {response.text}")
            
            image_url = f"{settings.SUPABASE_URL}/storage/v1/object/public/product-images/{product_id}/{file.filename}"

        obj_in = {
            "product_id": product_id,
            "image_url": image_url,
            "display_order": display_order
        }
        return await product_image_repo.create(db, obj_in=obj_in)

    @staticmethod
    async def delete_image(db: AsyncSession, product_id: UUID, image_id: UUID) -> None:
        image = await product_image_repo.get_by_id(db, id=image_id)
        if not image or image.product_id != product_id:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Image not found")
            
        await product_image_repo.delete(db, id=image_id)

    @staticmethod
    async def get_public_products(db: AsyncSession, params: ProductListParams) -> List[Product]:
        return await product_repo.get_list(db, params=params)

    @staticmethod
    async def get_public_product(db: AsyncSession, product_id: UUID) -> Product:
        product = await product_repo.get_by_id_with_images(db, id=product_id)
        if not product or product.status != ProductStatus.active or product.is_hidden:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
        return product

    @staticmethod
    async def hide_product(db: AsyncSession, product_id: UUID) -> Product:
        product = await product_repo.get_by_id(db, id=product_id)
        if not product:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
            
        return await product_repo.update(db, db_obj=product, obj_in={"is_hidden": True})

    @staticmethod
    async def approve_product(db: AsyncSession, product_id: UUID, admin_id: UUID) -> Product:
        product = await product_repo.get_by_id(db, id=product_id)
        if not product:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
            
        obj_in = {
            "status": ProductStatus.active,
            "approved_by": admin_id,
            "approved_at": datetime.utcnow()
        }
        return await product_repo.update(db, db_obj=product, obj_in=obj_in)
