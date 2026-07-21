import time
import uuid
import structlog
from fastapi import Request, Response
from starlette.middleware.base import BaseHTTPMiddleware
from app.core import redis
import re
import json

XSS_PATTERN = re.compile(r"(<script|javascript:|onerror=|onload=|<iframe|<object|<embed|<applet)", re.IGNORECASE)

logger = structlog.get_logger()

class RequestIDMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        request_id = str(uuid.uuid4())
        request.state.request_id = request_id
        
        # Bind request_id to structlog context
        structlog.contextvars.bind_contextvars(request_id=request_id)
        
        response = await call_next(request)
        response.headers["X-Request-ID"] = request_id
        
        structlog.contextvars.clear_contextvars()
        return response

class LoggingMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        start_time = time.time()
        
        logger.info(
            "request_started",
            method=request.method,
            url=str(request.url.path)
        )
        
        response = await call_next(request)
        
        process_time = time.time() - start_time
        logger.info(
            "request_finished",
            method=request.method,
            url=str(request.url.path),
            status_code=response.status_code,
            duration=process_time
        )
        return response

class RateLimitMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        if not redis.redis_client:
            return await call_next(request)
            
        client_ip = request.client.host if request.client else "unknown"
        path = request.url.path
        if path.startswith("/api/v1/auth") or "/checkout" in path or "/proof" in path or "/images" in path:
            limit = 20
            key = f"rate_limit:strict:{client_ip}:{path}"
        else:
            limit = 100
            key = f"rate_limit:normal:{client_ip}"
            
        current = await redis.redis_client.get(key)
        if current and int(current) > limit:
            return Response(content="Too many requests", status_code=429)
            
        pipe = redis.redis_client.pipeline()
        pipe.incr(key)
        pipe.expire(key, 60)
        await pipe.execute()
        
        
        return await call_next(request)

class SanitizationMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        if request.method in ["POST", "PUT", "PATCH"]:
            content_type = request.headers.get("content-type", "")
            if content_type.startswith("application/json") or content_type.startswith("application/x-www-form-urlencoded"):
                body = await request.body()
                if body:
                    try:
                        text_body = body.decode()
                        if XSS_PATTERN.search(text_body):
                            return Response(content="Invalid input: Potential XSS detected", status_code=400)
                    except UnicodeDecodeError:
                        pass
                    
                    async def receive():
                        return {"type": "http.request", "body": body}
                    request._receive = receive

        return await call_next(request)
