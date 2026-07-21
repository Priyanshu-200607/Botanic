import pytest
from fastapi import HTTPException
from unittest.mock import AsyncMock, patch
from app.core.security import require_admin, require_seller, get_current_user
from app.models.user import User, UserRole

@pytest.mark.asyncio
async def test_require_admin():
    admin_user = User(id="123", email="admin@test.com", role=UserRole.admin, is_active=True)
    
    # Should not raise
    result = await require_admin(admin_user)
    assert result.role == UserRole.admin

    customer_user = User(id="456", email="customer@test.com", role=UserRole.customer, is_active=True)
    with pytest.raises(HTTPException) as exc_info:
        await require_admin(customer_user)
    
    assert exc_info.value.status_code == 403
    assert exc_info.value.detail == "Admin privileges required"

@pytest.mark.asyncio
async def test_require_seller():
    seller_user = User(id="123", email="seller@test.com", role=UserRole.seller, is_active=True)
    
    # Should not raise
    result = await require_seller(seller_user)
    assert result.role == UserRole.seller

    customer_user = User(id="456", email="customer@test.com", role=UserRole.customer, is_active=True)
    with pytest.raises(HTTPException) as exc_info:
        await require_seller(customer_user)
    
    assert exc_info.value.status_code == 403
    assert exc_info.value.detail == "Seller privileges required"

@pytest.mark.asyncio
async def test_inactive_user_rejected():
    inactive_user = User(id="123", email="seller@test.com", role=UserRole.seller, is_active=False)
    with pytest.raises(HTTPException) as exc_info:
        await require_seller(inactive_user)
    
    assert exc_info.value.status_code == 400
    assert exc_info.value.detail == "Inactive user"
