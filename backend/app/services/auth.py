from uuid import UUID
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import HTTPException, status

from app.repositories.user import user_repo
from app.models.user import User

class AuthService:
    @staticmethod
    async def sync_user(db: AsyncSession, token_payload: dict) -> User:
        """
        Syncs a user from Supabase Auth to the public.users table.
        This is called after a user logs in via Google/Email on the frontend.
        """
        user_id = token_payload.get("sub")
        if not user_id:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid token payload")

        email = token_payload.get("email")
        
        user_metadata = token_payload.get("user_metadata", {})
        full_name = user_metadata.get("full_name", "")
        avatar_url = user_metadata.get("avatar_url")
        
        first_name = None
        last_name = None
        if full_name:
            parts = full_name.split(" ", 1)
            first_name = parts[0]
            if len(parts) > 1:
                last_name = parts[1]

        user = await user_repo.get_by_id(db, id=UUID(user_id))
        
        if not user:
            obj_in = {
                "id": UUID(user_id),
                "email": email,
                "first_name": first_name,
                "last_name": last_name,
                "avatar_url": avatar_url
            }
            user = await user_repo.create(db, obj_in=obj_in)
        else:
            obj_in = {}
            if not user.first_name and first_name:
                obj_in["first_name"] = first_name
            if not user.last_name and last_name:
                obj_in["last_name"] = last_name
            if not user.avatar_url and avatar_url:
                obj_in["avatar_url"] = avatar_url
                
            if obj_in:
                user = await user_repo.update(db, db_obj=user, obj_in=obj_in)
                
        return user
