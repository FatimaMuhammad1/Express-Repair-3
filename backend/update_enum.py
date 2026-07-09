from app.database import engine
from sqlalchemy import text

try:
    with engine.connect() as conn:
        conn.execute(text("ALTER TYPE onlinesalestatus RENAME VALUE 'PENDING' TO 'pending'"))
        conn.execute(text("ALTER TYPE onlinesalestatus RENAME VALUE 'COMPLETED' TO 'completed'"))
        conn.execute(text("ALTER TYPE onlinesalestatus RENAME VALUE 'CANCELLED' TO 'cancelled'"))
        conn.commit()
        print("Enum values updated to lowercase")
except Exception as e:
    print(f"Error: {e}")
