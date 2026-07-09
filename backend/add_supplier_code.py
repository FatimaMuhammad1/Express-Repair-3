from app.database import engine
from sqlalchemy import text

with engine.connect() as conn:
    try:
        conn.execute(text('ALTER TABLE suppliers ADD COLUMN IF NOT EXISTS supplier_code VARCHAR(50)'))
        conn.execute(text('CREATE UNIQUE INDEX IF NOT EXISTS ix_suppliers_supplier_code ON suppliers(supplier_code)'))
        conn.commit()
        print('Column added successfully')
    except Exception as e:
        print(f'Error: {e}')
        conn.rollback()
