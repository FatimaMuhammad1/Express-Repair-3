from contextlib import asynccontextmanager
import time
import logging
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base, SessionLocal
from fastapi.staticfiles import StaticFiles
from app.routers import auth, otp, view, bookings, repairs, uploads, payments, products, users, communications, finance, repair_details, warranty, notifications, branches, inventory, customers, search, dashboard, audit, walkin, roles, financials, repair_parts, reorder, purchase_orders, tax, reminders, invoices, payments_stripe, suppliers, settings, history
from app.models import DeletedItem, DeletedItemStatus
from datetime import datetime, timezone
import os
import asyncio

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Sentry integration (optional)
try:
    import sentry_sdk
    if os.getenv("SENTRY_DSN"):
        sentry_sdk.init(
            dsn=os.getenv("SENTRY_DSN"),
            traces_sample_rate=1.0,
            environment=os.getenv("ENV", "production"),
        )
except ImportError:
    pass

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Create tables on startup — graceful warning if DB is not yet reachable
    try:
        Base.metadata.create_all(bind=engine)
        logger.info("[DB] Tables verified / created successfully.")
    except Exception as e:
        logger.warning(f"[DB] WARNING: Could not connect to database on startup: {e}")
        logger.warning("[DB] Make sure PostgreSQL is running and DATABASE_URL in .env is correct.")
    
    # Start background task to clean up expired deleted items
    async def cleanup_expired_deleted_items():
        while True:
            try:
                db = SessionLocal()
                try:
                    now = datetime.now(timezone.utc)
                    expired_items = db.query(DeletedItem).filter(
                        DeletedItem.hide_from_ui_at <= now,
                        DeletedItem.status == DeletedItemStatus.active
                    ).all()
                    
                    for item in expired_items:
                        item.status = DeletedItemStatus.archived
                        logger.info(f"[Cleanup] Archived deleted item: {item.item_name} (ID: {item.id})")
                    
                    if expired_items:
                        db.commit()
                        logger.info(f"[Cleanup] Archived {len(expired_items)} expired deleted items")
                finally:
                    db.close()
            except Exception as e:
                logger.error(f"[Cleanup] Error cleaning up expired deleted items: {e}")
            
            # Run every hour
            await asyncio.sleep(3600)
    
    # Start the background task
    asyncio.create_task(cleanup_expired_deleted_items())
    logger.info("[Cleanup] Started background task to clean up expired deleted items")
    
    yield  # app runs here

app = FastAPI(
    lifespan=lifespan,
    title="Electronics Repair Shop API",
    description="Full backend for an electronics repair shop — auth, OTP, bookings, and repair tracking.",
    version="2.0.0",
    redirect_slashes=False,
    root_path="/api"
)

# CORS — allow the local frontend and any configured origins
allowed_origins = [
    "http://localhost:8080",
    "http://127.0.0.1:8080",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]
configured_origins = os.getenv("ALLOWED_ORIGINS", "").split(",") if os.getenv("ALLOWED_ORIGINS") else []
for origin in configured_origins:
    origin = origin.strip()
    if origin:
        allowed_origins.append(origin)

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allow_headers=["*"],
    expose_headers=["*"],
)

@app.middleware("http")
async def log_requests(request: Request, call_next):
    start_time = time.perf_counter()
    response = await call_next(request)
    process_time = time.perf_counter() - start_time
    # Only log slow requests (>500ms) in production
    if process_time > 0.5 or os.getenv("ENV") != "production":
        logger.info(f"[REQUEST] {request.method} {request.url.path} -> {response.status_code} ({process_time:.3f}s)")
    return response

# Mount routers
app.include_router(auth.router)
app.include_router(otp.router)
app.include_router(view.router)
app.include_router(bookings.router)
app.include_router(repairs.router)
app.include_router(uploads.router)
app.include_router(payments.router)
app.include_router(products.router)
app.include_router(users.router)
app.include_router(communications.router)
app.include_router(finance.router)
app.include_router(repair_details.router)
app.include_router(warranty.router)
app.include_router(notifications.router)
app.include_router(branches.router)
app.include_router(inventory.router)
app.include_router(customers.router)
app.include_router(search.router)
app.include_router(dashboard.router)
app.include_router(audit.router)
app.include_router(walkin.router)
app.include_router(roles.router)
app.include_router(financials.router)
app.include_router(repair_parts.router)
app.include_router(reorder.router)
app.include_router(purchase_orders.router)
app.include_router(tax.router)
app.include_router(reminders.router)
app.include_router(invoices.router)
app.include_router(payments_stripe.router)
app.include_router(suppliers.router)
app.include_router(settings.router)
app.include_router(history.router)

os.makedirs("static/uploads", exist_ok=True)
app.mount("/static", StaticFiles(directory="static"), name="static")
@app.get("/", tags=["Health"])
def root():
    return {
        "success": True,
        "message": "Electronics Repair Shop API is running.",
        "version": "2.0.0",
        "docs": "/docs",
    }
