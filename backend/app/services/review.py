from uuid import UUID
from typing import Tuple, List
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import HTTPException

from app.models.review import Review
from app.repositories.review import review_repo
from app.schemas.review import ReviewCreate, ReviewUpdate

class ReviewService:
    @staticmethod
    async def list_product_reviews(
        db: AsyncSession, product_id: UUID, skip: int = 0, limit: int = 20
    ) -> Tuple[List[Review], int]:
        return await review_repo.list_by_product(db, product_id=product_id, skip=skip, limit=limit)

    @staticmethod
    async def create_review(
        db: AsyncSession, user_id: UUID, product_id: UUID, review_in: ReviewCreate
    ) -> Review:
        has_delivered = await review_repo.check_user_has_delivered_order(db, user_id, product_id)
        if not has_delivered:
            raise HTTPException(
                status_code=403, 
                detail="You can only review products you have purchased and received."
            )
        return await review_repo.create_review(db, user_id, product_id, review_in)

    @staticmethod
    async def update_review(
        db: AsyncSession, user_id: UUID, review_id: UUID, review_in: ReviewUpdate
    ) -> Review:
        review = await review_repo.get_by_id(db, id=review_id)
        if not review:
            raise HTTPException(status_code=404, detail="Review not found")
        if review.user_id != user_id:
            raise HTTPException(status_code=403, detail="Not authorized to update this review")
        
        return await review_repo.update_review(db, db_obj=review, review_in=review_in)

    @staticmethod
    async def delete_review(
        db: AsyncSession, user_id: UUID, review_id: UUID
    ):
        review = await review_repo.get_by_id(db, id=review_id)
        if not review:
            raise HTTPException(status_code=404, detail="Review not found")
        if review.user_id != user_id:
            raise HTTPException(status_code=403, detail="Not authorized to delete this review")
        
        await review_repo.delete(db, id=review_id)
