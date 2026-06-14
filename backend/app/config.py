from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    PORT: int = 8000
    DATABASE_URL: str = "postgresql://postgres:postgres@localhost:5432/repair_shop"
    JWT_SECRET: str = "dev_jwt_secret_key_1234567890"
    JWT_ALGORITHM: str = "HS256"
    JWT_EXPIRE_MINUTES: int = 10080  # 7 days

    SMTP_HOST: str = ""
    SMTP_PORT: int = 587
    SMTP_USER: str = ""
    SMTP_PASS: str = ""
    EMAIL_FROM: str = "noreply@electronicsrepair.com"

    REDIS_URL: str = "redis://localhost:6379/0"

    TELNYX_API_KEY: str = ""
    TELNYX_FROM_NUMBER: str = ""

    STRIPE_SECRET_KEY: str = ""

    model_config = {"env_file": ".env", "env_file_encoding": "utf-8", "extra": "ignore", "env_ignore_empty": True}


@lru_cache()
def get_settings():
    return Settings()


settings = get_settings()
