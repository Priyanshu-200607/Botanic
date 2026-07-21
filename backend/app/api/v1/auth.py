from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi.security import HTTPAuthorizationCredentials
import jwt

from app.core.database import get_db
from app.core.security import get_current_user, security
from app.core.config import settings
from app.models.user import User
from app.schemas.user import UserResponse
from app.services.auth import AuthService

router = APIRouter()

@router.get("/me", response_model=UserResponse)
async def get_me(current_user: User = Depends(get_current_user)):
    """Get current user profile from JWT"""
    return current_user

@router.post("/sync", response_model=UserResponse)
async def sync_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: AsyncSession = Depends(get_db)
):
    """
    Sync user from Supabase Auth to public.users table.
    Call this right after login on the frontend.
    """
    token = credentials.credentials
    payload = jwt.decode(
        token, 
        settings.SUPABASE_JWT_SECRET, 
        algorithms=["HS256"],
        options={"verify_aud": False}
    )
    user = await AuthService.sync_user(db, token_payload=payload)
    return user
