from app.database import engine
from sqlalchemy import text

with engine.connect() as conn:
    conn.execute(text('DELETE FROM alembic_version'))
    conn.commit()
    print('Cleared alembic version table')
