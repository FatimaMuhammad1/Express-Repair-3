import sys, os
from dotenv import load_dotenv
load_dotenv('backend/.env')
import psycopg2

conn = psycopg2.connect(os.environ['DATABASE_URL'])
cur = conn.cursor()
try:
    cur.execute("UPDATE products SET category = 'smartphone' WHERE category::text = 'smartphones'")
    print(f"Updated {cur.rowcount} rows in products")
    conn.commit()
except Exception as e:
    print(e)
finally:
    cur.close()
    conn.close()
