from app.database import SessionLocal
from app.models import Product

db = SessionLocal()
products = db.query(Product).all()
print(f"Total products: {len(products)}")
for p in products[:5]:
    print(f'ID: {p.id}, Name: {p.name}, SKU: {p.sku}')
db.close()
