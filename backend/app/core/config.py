from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    PROJECT_NAME: str = "Botanic Premium Marketplace API"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    BACKEND_CORS_ORIGINS: list[str] = ["http://localhost:3000"]
    
    # Supabase Database URL (AsyncPG)
    DATABASE_URL: str = "postgresql+asyncpg://postgres:postgres@localhost:5432/botanic"
    
    # Redis
    REDIS_URL: str = "redis://localhost:6379/0"
    
    # Supabase JWT
    SUPABASE_JWT_SECRET: str = "your-supabase-jwt-secret"
    
    # Sentry
    SENTRY_DSN: str | None = None

    model_config = SettingsConfigDict(env_file=".env", case_sensitive=True)

settings = Settings()
