from arq import cron
from arq.connections import RedisSettings
from app.core.config import settings
from app.workers.email import send_email_task
from app.workers.inventory import check_low_stock_task
from app.workers.analytics import daily_revenue_aggregation_task

async def startup(ctx):
    print("Worker starting up...")

async def shutdown(ctx):
    print("Worker shutting down...")

class WorkerSettings:
    functions = [send_email_task, check_low_stock_task, daily_revenue_aggregation_task]
    redis_settings = RedisSettings.from_dsn(settings.REDIS_URL)
    on_startup = startup
    on_shutdown = shutdown
    cron_jobs = [
        # Run daily at midnight
        cron(daily_revenue_aggregation_task, hour=0, minute=0)
    ]
