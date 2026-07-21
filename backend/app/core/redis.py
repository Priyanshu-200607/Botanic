import json
from typing import Any, Optional
import redis.asyncio as redis
from arq import create_pool
from arq.connections import RedisSettings

from app.core.config import settings

# Global Redis client
redis_client: redis.Redis | None = None
arq_pool = None

async def init_redis():
    global redis_client, arq_pool
    # Initialize main redis client
    redis_client = redis.from_url(settings.REDIS_URL, decode_responses=True)
    
    try:
        # Initialize ARQ pool (background jobs)
        arq_pool = await create_pool(RedisSettings.from_dsn(settings.REDIS_URL))
    except Exception as e:
        print(f"Failed to connect to Redis for ARQ: {e}")
        arq_pool = None

async def close_redis():
    global redis_client, arq_pool
    if redis_client:
        await redis_client.aclose()
    if arq_pool:
        await arq_pool.close()

async def get_cache(key: str) -> Optional[Any]:
    if not redis_client:
        return None
    val = await redis_client.get(key)
    if val:
        try:
            return json.loads(val)
        except json.JSONDecodeError:
            return val
    return None

async def set_cache(key: str, value: Any, ex: int = 3600):
    if not redis_client:
        return
    if isinstance(value, (dict, list)):
        value = json.dumps(value)
    await redis_client.set(key, value, ex=ex)

async def delete_cache(key: str):
    if not redis_client:
        return
    await redis_client.delete(key)
