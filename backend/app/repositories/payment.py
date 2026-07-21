from typing import List, Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload
from uuid import UUID

from app.models.payment import Payment, PaymentProof, PaymentStatus
from app.repositories.base import BaseRepository

class PaymentRepository(BaseRepository[Payment]):
    def __init__(self):
        super().__init__(Payment)
        
    async def get_by_order_id(self, db: AsyncSession, order_id: UUID) -> Optional[Payment]:
        result = await db.execute(
            select(Payment).options(selectinload(Payment.proofs)).filter(Payment.order_id == order_id)
        )
        return result.scalar_one_or_none()

class PaymentProofRepository(BaseRepository[PaymentProof]):
    def __init__(self):
        super().__init__(PaymentProof)
        
    async def get_pending_proofs(self, db: AsyncSession, skip: int = 0, limit: int = 100) -> List[PaymentProof]:
        result = await db.execute(
            select(PaymentProof)
            .options(selectinload(PaymentProof.payment))
            .filter(PaymentProof.status == "pending")
            .order_by(PaymentProof.uploaded_at.asc())
            .offset(skip).limit(limit)
        )
        return list(result.scalars().all())

payment_repo = PaymentRepository()
payment_proof_repo = PaymentProofRepository()
