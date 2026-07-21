from uuid import UUID
from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Dict

from app.core.database import get_db
from app.core.security import get_current_user
from app.models.user import User
from app.schemas.payment import PaymentProofResponse, PaymentResponse
from app.services.payment import PaymentService
from app.repositories.payment import payment_repo
from app.repositories.order import order_repo

router = APIRouter()

@router.get("/{order_id}/qr", response_model=Dict[str, str])
async def get_payment_qr(
    order_id: UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Return platform QR URL for payment"""
    qr_url = await PaymentService.get_platform_qr(db)
    return {"qr_url": qr_url}

@router.post("/{order_id}/proof", response_model=PaymentProofResponse)
async def upload_payment_proof(
    order_id: UUID,
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Upload payment proof image"""
    return await PaymentService.upload_proof(db, order_id=order_id, user_id=current_user.id, file=file)

@router.get("/{order_id}/status", response_model=PaymentResponse)
async def get_payment_status(
    order_id: UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Check payment status for an order"""
    payment = await payment_repo.get_by_order_id(db, order_id=order_id)
    if not payment:
        raise HTTPException(status_code=404, detail="Payment not found")
    
    order = await order_repo.get_by_id(db, id=order_id)
    if not order or order.user_id != current_user.id:
        raise HTTPException(status_code=404, detail="Order not found")
        
    return payment
