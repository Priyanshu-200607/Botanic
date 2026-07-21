from fastapi import Request, FastAPI
from fastapi.responses import JSONResponse
from starlette.status import HTTP_400_BAD_REQUEST, HTTP_403_FORBIDDEN, HTTP_404_NOT_FOUND, HTTP_409_CONFLICT, HTTP_500_INTERNAL_SERVER_ERROR
import structlog

logger = structlog.get_logger()

class BaseAPIException(Exception):
    def __init__(self, message: str, status_code: int = HTTP_400_BAD_REQUEST, payload: dict = None):
        self.message = message
        self.status_code = status_code
        self.payload = payload

class NotFoundException(BaseAPIException):
    def __init__(self, message: str = "Resource not found"):
        super().__init__(message, HTTP_404_NOT_FOUND)

class ForbiddenException(BaseAPIException):
    def __init__(self, message: str = "Not enough permissions"):
        super().__init__(message, HTTP_403_FORBIDDEN)

class ConflictException(BaseAPIException):
    def __init__(self, message: str = "Resource conflict"):
        super().__init__(message, HTTP_409_CONFLICT)

def register_exception_handlers(app: FastAPI):
    @app.exception_handler(BaseAPIException)
    async def base_api_exception_handler(request: Request, exc: BaseAPIException):
        content = {"detail": exc.message}
        if exc.payload:
            content["payload"] = exc.payload
        return JSONResponse(
            status_code=exc.status_code,
            content=content,
        )

    @app.exception_handler(Exception)
    async def global_exception_handler(request: Request, exc: Exception):
        logger.error("unhandled_exception", exc_info=exc)
        return JSONResponse(
            status_code=HTTP_500_INTERNAL_SERVER_ERROR,
            content={"detail": "Internal server error"},
        )
