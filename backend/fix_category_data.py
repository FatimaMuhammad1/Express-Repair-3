"""Diagnose what category values are actually stored in the products table."""
import sys
import os

sys.path.insert(0, os.path.dirname(__file__))

from app.database import SessionLocal
from sqlalchemy import text

db = SessionLocal()
try:
    rows = db.execute(text("SELECT category::text, count(*) FROM products GROUP BY category::text")).fetchall()
    print("Category values in DB:")
    for row in rows:
        print(f"  '{row[0]}' -> {row[1]} rows")
except Exception as e:
    print(f"Error: {e}")
finally:
    db.close()
