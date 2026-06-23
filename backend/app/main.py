from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.v1 import auth, products, stores, cart, orders, users, reviews, dashboard, payments
from app.core.exceptions import APIException, api_exception_handler, global_exception_handler

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,

    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
# app.include_router(auth.router, prefix=f"{settings.API_V1_STR}/auth", tags=["auth"])
app.include_router(products.router, prefix=f"{settings.API_V1_STR}/products", tags=["products"])
# app.include_router(stores.router, prefix=f"{settings.API_V1_STR}/stores", tags=["stores"])
# app.include_router(cart.router, prefix=f"{settings.API_V1_STR}/cart", tags=["cart"])
# app.include_router(orders.router, prefix=f"{settings.API_V1_STR}/orders", tags=["orders"])
# app.include_router(users.router, prefix=f"{settings.API_V1_STR}/users", tags=["users"])
# app.include_router(reviews.router, prefix=f"{settings.API_V1_STR}/reviews", tags=["reviews"])
# app.include_router(dashboard.router, prefix=f"{settings.API_V1_STR}/dashboard", tags=["dashboard"])
# app.include_router(payments.router, prefix=f"{settings.API_V1_STR}/payments", tags=["payments"])

@app.get("/health")
async def health_check():
    return {"status": "ok"}

app.add_exception_handler(APIException, api_exception_handler)
app.add_exception_handler(Exception, global_exception_handler)
