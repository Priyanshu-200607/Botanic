from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from uuid import UUID

from app.api.deps import get_db
from app.core.security import get_current_user
from app.models.user import User
from app.schemas.review import ReviewCreate, ReviewUpdate, ReviewResponse
from app.schemas.common import PaginatedResponse, FilterParams
from app.services.review import ReviewService

router = APIRouter(tags=["reviews"])

@router.get("/products/{product_id}/reviews", response_model=PaginatedResponse[ReviewResponse])
async def list_product_reviews(
    product_id: UUID,
    params: FilterParams = Depends(),
    db: AsyncSession = Depends(get_db)
):
    items, total = await ReviewService.list_product_reviews(
        db, product_id=product_id, skip=(params.page - 1) * params.size, limit=params.size
    )
    pages = (total + params.size - 1) // params.size if total > 0 else 0
    return {
        "items": items,
        "total": total,
        "page": params.page,
        "size": params.size,
        "pages": pages
    }

@router.post("/products/{product_id}/reviews", response_model=ReviewResponse)
async def create_review(
    product_id: UUID,
    review_in: ReviewCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return await ReviewService.create_review(
        db, user_id=current_user.id, product_id=product_id, review_in=review_in
    )

@router.put("/reviews/{review_id}", response_model=ReviewResponse)
async def update_review(
    review_id: UUID,
    review_in: ReviewUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return await ReviewService.update_review(
        db, user_id=current_user.id, review_id=review_id, review_in=review_in
    )

@router.delete("/reviews/{review_id}", response_model=dict)
async def delete_review(
    review_id: UUID,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    await ReviewService.delete_review(db, user_id=current_user.id, review_id=review_id)
    return {"message": "Review deleted successfully", "status": "success"}
