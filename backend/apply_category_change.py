from app.database import engine
from sqlalchemy import text

with engine.connect() as conn:
    conn.execute(text('ALTER TABLE products ALTER COLUMN category TYPE VARCHAR(100)'))
    conn.commit()
    print('Category column changed to VARCHAR(100)')
