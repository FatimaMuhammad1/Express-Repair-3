from app.database import engine
from sqlalchemy import text

conn = engine.connect()
result = conn.execute(text("SELECT column_name FROM information_schema.columns WHERE table_name = 'repairs' ORDER BY ordinal_position"))
columns = [row[0] for row in result]
print("Repairs table columns:")
for col in columns:
    print(f"  - {col}")
conn.close()
