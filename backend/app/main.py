from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.core.exceptions import register_exception_handlers
from app.core.middleware import RequestIDMiddleware, LoggingMiddleware, RateLimitMiddleware, SanitizationMiddleware
from app.core.redis import init_redis, close_redis

# Try to import routers safely
try:
    from app.api.v1 import products, auth, users, stores, admin, cart, orders, payments, wishlist, reviews, notifications, dashboard
except ImportError:
    products = None
    auth = None
    users = None
    stores = None
    admin = None
    cart = None
    orders = None
    payments = None
    wishlist = None
    reviews = None
    notifications = None
    dashboard = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_redis()
    yield
    await close_redis()

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    lifespan=lifespan
)

# Middleware (Bottom up: RequestID -> Logging -> CORS -> RateLimit)
app.add_middleware(RateLimitMiddleware)
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.add_middleware(SanitizationMiddleware)
app.add_middleware(LoggingMiddleware)
app.add_middleware(RequestIDMiddleware)

register_exception_handlers(app)

# Routers
if auth:
    app.include_router(auth.router, prefix=f"{settings.API_V1_STR}/auth", tags=["auth"])
if users:
    app.include_router(users.router, prefix=f"{settings.API_V1_STR}/users", tags=["users"])
if stores:
    app.include_router(stores.router, prefix=f"{settings.API_V1_STR}/stores", tags=["stores"])
if products:
    app.include_router(products.router, prefix=f"{settings.API_V1_STR}/products", tags=["products"])
if cart:
    app.include_router(cart.router, prefix=f"{settings.API_V1_STR}/cart", tags=["cart"])
if orders:
    app.include_router(orders.router, prefix=f"{settings.API_V1_STR}/orders", tags=["orders"])
if payments:
    app.include_router(payments.router, prefix=f"{settings.API_V1_STR}/payments", tags=["payments"])
if admin:
    app.include_router(admin.router, prefix=f"{settings.API_V1_STR}/admin", tags=["admin"])
if wishlist:
    app.include_router(wishlist.router, prefix=f"{settings.API_V1_STR}", tags=["wishlist"])
if reviews:
    app.include_router(reviews.router, prefix=f"{settings.API_V1_STR}", tags=["reviews"])
if notifications:
    app.include_router(notifications.router, prefix=f"{settings.API_V1_STR}/notifications", tags=["notifications"])
if dashboard:
    app.include_router(dashboard.router, prefix=f"{settings.API_V1_STR}", tags=["dashboard"])

@app.get("/health")
async def health_check():
    return {"status": "ok"}
