from uuid import UUID
from datetime import datetime
from fastapi import HTTPException, status, UploadFile
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
import httpx
import mimetypes

from app.models.payment import Payment, PaymentProof, PaymentStatus
from app.models.order import OrderStatus
from app.models.platform_settings import PlatformSettings
from app.repositories.payment import payment_repo, payment_proof_repo
from app.repositories.order import order_repo
from app.services.audit import AuditService
from app.services.notification import NotificationService
from app.core.config import settings
from app.core.redis import arq_pool

class PaymentService:
    @staticmethod
    async def get_platform_qr(db: AsyncSession) -> str:
        result = await db.execute(select(PlatformSettings).limit(1))
        platform_settings = result.scalar_one_or_none()
        if not platform_settings or not platform_settings.payment_qr_url:
            raise HTTPException(status_code=404, detail="Payment QR not configured")
        return platform_settings.payment_qr_url

    @staticmethod
    async def upload_proof(db: AsyncSession, order_id: UUID, user_id: UUID, file: UploadFile) -> PaymentProof:
        order = await order_repo.get_by_id(db, id=order_id)
        if not order or order.user_id != user_id:
            raise HTTPException(status_code=404, detail="Order not found")
            
        payment = await payment_repo.get_by_order_id(db, order_id=order.id)
        if not payment:
            raise HTTPException(status_code=404, detail="Payment not found for order")
            
        if payment.status == PaymentStatus.success:
            raise HTTPException(status_code=400, detail="Payment is already successful")

        if not file.content_type.startswith("image/"):
            raise HTTPException(status_code=400, detail="File must be an image")

        content = await file.read()
        if len(content) > 5 * 1024 * 1024:
            raise HTTPException(status_code=400, detail="File size exceeds 5MB limit")

        if not settings.SUPABASE_URL or not settings.SUPABASE_SERVICE_ROLE_KEY:
            proof_url = f"https://mock-storage/proofs/{payment.id}/{file.filename}"
        else:
            mime_type = file.content_type
                
            storage_url = f"{settings.SUPABASE_URL}/storage/v1/object/payment-proofs/{user_id}/{file.filename}"
            headers = {
                "Authorization": f"Bearer {settings.SUPABASE_SERVICE_ROLE_KEY}",
                "apikey": settings.SUPABASE_SERVICE_ROLE_KEY,
                "Content-Type": mime_type
            }
            
            async with httpx.AsyncClient() as client:
                response = await client.post(storage_url, content=content, headers=headers)
                if response.status_code not in (200, 201):
                    print(f"Storage upload error: {response.text}")
            
            proof_url = f"{settings.SUPABASE_URL}/storage/v1/object/public/payment-proofs/{user_id}/{file.filename}"

        obj_in = {
            "payment_id": payment.id,
            "proof_url": proof_url,
            "status": "pending"
        }
        
        await payment_repo.update(db, db_obj=payment, obj_in={"status": PaymentStatus.verifying})
        
        return await payment_proof_repo.create(db, obj_in=obj_in)

    @staticmethod
    async def approve_proof(db: AsyncSession, proof_id: UUID, admin_id: UUID) -> PaymentProof:
        proof = await payment_proof_repo.get_by_id(db, id=proof_id)
        if not proof or proof.status != "pending":
            raise HTTPException(status_code=404, detail="Pending proof not found")
            
        payment = await payment_repo.get_by_id(db, id=proof.payment_id)
        order = await order_repo.get_by_id(db, id=payment.order_id)
        
        proof = await payment_proof_repo.update(db, db_obj=proof, obj_in={
            "status": "verified",
            "verified_by": admin_id,
            "verified_at": datetime.utcnow()
        })
        
        await payment_repo.update(db, db_obj=payment, obj_in={"status": PaymentStatus.success})
        await order_repo.update(db, db_obj=order, obj_in={"status": OrderStatus.processing})
        
        await AuditService.log_action(
            db, actor_id=admin_id, action="approve_payment",
            entity="payment_proof", entity_id=proof.id,
            old_data={"status": "pending"}, new_data={"status": "verified"}
        )
        
        await NotificationService.create_notification(
            db, user_id=order.user_id,
            title="Payment Approved",
            message=f"Your payment for order {order.id} has been verified.",
            type="order_update", reference_id=order.id
        )
        
        from app.repositories.store import store_repo
        store = await store_repo.get_by_id(db, id=order.store_id)
        if store:
            await NotificationService.create_notification(
                db, user_id=store.owner_id,
                title="New Order Received",
                message=f"Order {order.id} has been paid and is ready to process.",
                type="new_order", reference_id=order.id
            )
            if arq_pool:
                await arq_pool.enqueue_job('send_email_task', 'seller@botanic.com', 'New Order Received', f'Order {order.id} has been paid.')

        if arq_pool:
            await arq_pool.enqueue_job('send_email_task', 'buyer@botanic.com', 'Payment Approved', f'Your payment for order {order.id} was verified.')

        return proof

    @staticmethod
    async def reject_proof(db: AsyncSession, proof_id: UUID, admin_id: UUID, remarks: str) -> PaymentProof:
        proof = await payment_proof_repo.get_by_id(db, id=proof_id)
        if not proof or proof.status != "pending":
            raise HTTPException(status_code=404, detail="Pending proof not found")
            
        payment = await payment_repo.get_by_id(db, id=proof.payment_id)
        order = await order_repo.get_by_id(db, id=payment.order_id)
        
        proof = await payment_proof_repo.update(db, db_obj=proof, obj_in={
            "status": "rejected",
            "remarks": remarks,
            "verified_by": admin_id,
            "verified_at": datetime.utcnow()
        })
        
        await payment_repo.update(db, db_obj=payment, obj_in={"status": PaymentStatus.pending})
        
        await AuditService.log_action(
            db, actor_id=admin_id, action="reject_payment",
            entity="payment_proof", entity_id=proof.id,
            old_data={"status": "pending"}, new_data={"status": "rejected", "remarks": remarks}
        )
        
        await NotificationService.create_notification(
            db, user_id=order.user_id,
            title="Payment Rejected",
            message=f"Your payment proof for order {order.id} was rejected. Reason: {remarks}. Please re-upload.",
            type="payment_issue", reference_id=order.id
        )
            
        return proof
