from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base
from fastapi.staticfiles import StaticFiles
from app.routers import auth, otp, view, bookings, repairs, uploads, payments, products, users, communications, finance, repair_details, warranty, notifications, branches, inventory, customers, search, dashboard, audit, walkin, roles, financials, repair_parts, reorder, purchase_orders, tax, reminders, invoices, payments_stripe
import os

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
        print("[DB] Tables verified / created successfully.")
    except Exception as e:
        print(f"[DB] WARNING: Could not connect to database on startup: {e}")
        print("[DB] Make sure PostgreSQL is running and DATABASE_URL in .env is correct.")
    yield  # app runs here


app = FastAPI(
    lifespan=lifespan,
    title="Electronics Repair Shop API",
    description="Full backend for an electronics repair shop — auth, OTP, bookings, and repair tracking.",
    version="2.0.0",
)

# CORS — read from environment or allow all for development
allowed_origins = os.getenv("ALLOWED_ORIGINS", "*").split(",") if os.getenv("ALLOWED_ORIGINS") else ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
