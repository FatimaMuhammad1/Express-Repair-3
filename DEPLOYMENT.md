# Deployment Guide

## Prerequisites

- Python 3.14+
- PostgreSQL database
- Node.js 18+
- PM2 (for process management)

## Environment Variables

Create a `.env` file in the backend directory:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/foundation_db
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
ENV=production
SENTRY_DSN=optional-sentry-dsn
```

## Backend Deployment

### 1. Install Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 2. Run Database Migration

```bash
python migrate_db.py
```

### 3. Start Backend Server

**Development:**
```bash
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

**Production with PM2:**
```bash
pm2 start "python -m uvicorn app.main:app --host 0.0.0.0 --port 8000" --name foundation-backend
pm2 save
pm2 startup
```

## Frontend Deployment

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Build for Production

```bash
npm run build
```

### 3. Serve with Nginx or similar

```bash
# Serve the dist folder with your web server
# Example with simple http-server:
npx http-server dist -p 3000
```

**Production with PM2:**
```bash
pm2 start "npx http-server dist -p 3000" --name foundation-frontend
pm2 save
```

## Nginx Configuration (Optional)

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    # Frontend
    location / {
        root /path/to/frontend/dist;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # Static files
    location /static {
        proxy_pass http://localhost:8000;
    }
}
```

## Database Setup

### PostgreSQL

```bash
# Create database
createdb foundation_db

# Run migrations
cd backend
python migrate_db.py
```

### Create SUPER_ADMIN User

```bash
cd backend
python create_staff_user.py
```

## Role System

The system uses 3 roles:
- **SUPER_ADMIN**: Full access to all features
- **staff**: Can create walk-in repairs, view dashboard
- **customer**: Can track repairs, view public pages

## Key Features

### Excel Import for Inventory

Endpoint: `POST /api/inventory/import/excel`

Required columns: `name`, `category`, `price`, `stock_quantity`
Optional columns: `description`, `brand`, `model`, `condition`, `reorder_threshold`, `reorder_quantity`

### Finance Endpoints

- `GET /api/finance/stats` - Financial overview
- `GET /api/finance/transactions` - All transactions
- `GET /api/finance/expenses` - Expenses
- `GET /api/finance/revenue` - Revenue
- `GET /api/finance/online-sales` - Online sales
- `GET /api/finance/inhouse-sales` - In-house sales

### Repair Endpoints

- `GET /api/repairs/stats` - Repair statistics
- `POST /api/repairs/create` - Create repair
- `PUT /api/repairs/{tracking_id}/status` - Update status
- `GET /api/repairs/my` - User's repairs

### Walk-in Intake

- `POST /api/walkin/intake` - Create walk-in repair (staff only)

## Monitoring

### PM2 Commands

```bash
pm2 list              # List all processes
pm2 logs foundation-backend  # View backend logs
pm2 logs foundation-frontend # View frontend logs
pm2 restart foundation-backend
pm2 stop foundation-backend
```

### Health Checks

Backend: `GET http://your-domain.com/`
Frontend: `http://your-domain.com/`

## Troubleshooting

### Backend won't start
- Check DATABASE_URL is correct
- Ensure PostgreSQL is running
- Check port 8000 is not in use

### Frontend can't connect to API
- Check CORS settings in backend
- Verify API_BASE_URL in frontend
- Ensure backend is running

### Database errors
- Run `python migrate_db.py` to ensure schema is up to date
- Check PostgreSQL connection

## Security Notes

1. Change SECRET_KEY in production
2. Use HTTPS in production
3. Keep dependencies updated
4. Use environment variables for sensitive data
5. Enable Sentry for error tracking (optional)

## Backup Strategy

### Database Backup

```bash
pg_dump foundation_db > backup_$(date +%Y%m%d).sql
```

### Restore Database

```bash
psql foundation_db < backup_20240627.sql
```

## Support

For issues, check:
1. Backend logs: `pm2 logs foundation-backend`
2. Frontend console: Browser DevTools
3. Database connection: Verify DATABASE_URL
