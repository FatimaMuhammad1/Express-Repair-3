from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base
from fastapi.staticfiles import StaticFiles
from app.routers import auth, otp, view, bookings, repairs, uploads, payments, products
import os

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

# CORS — adjust origins for production
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
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
