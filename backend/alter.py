from app.database import engine
from sqlalchemy import text

try:
    with engine.connect() as conn:
        conn.execute(text('ALTER TABLE users ADD COLUMN is_active BOOLEAN DEFAULT true;'))
        conn.commit()
    print("Added is_active")
except Exception as e:
    print(f"Error: {e}")
