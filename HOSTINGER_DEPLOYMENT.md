# Hostinger Deployment Guide

This guide covers deploying Express Phone & Laptop Repair (Fixora) to Hostinger.

---

## Prerequisites

- Hostinger account with VPS or Shared Hosting
- Domain name (optional)
- PostgreSQL database access
- SSH access (for VPS) or File Manager (for Shared Hosting)

---

## Step 1: Prepare Files for Deployment

### 1.1 Clean Up Files

Remove these files/folders before uploading:

```bash
# Remove development files
rm -rf .git/
rm -rf .venv/
rm -rf node_modules/
rm -rf __pycache__/
rm -rf backend/__pycache__/
rm -rf src/__pycache__/
rm -f *.log
rm -f .deployignore
rm -f create_staff_user.py
rm -f fix_categories.py
rm -f cleanup_test_data.py
rm -f DEPLOYMENT_VERIFICATION_REPORT.md
rm -f E2E_INTEGRATION_QA_REPORT.md
```

### 1.2 Keep These Files

```
foundation-framework/
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── models.py
│   │   ├── database.py
│   │   ├── config.py
│   │   ├── dependencies.py
│   │   └── routers/
│   ├── alembic/
│   │   └── versions/
│   ├── requirements.txt
│   └── alembic.ini
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── routes/
│   │   └── admin.tsx
│   ├── components/
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
├── .env.example
└── HOSTINGER_DEPLOYMENT.md
```

---

## Step 2: Backend Deployment (VPS)

### 2.1 Upload Backend Files

1. Connect to Hostinger VPS via SSH
2. Create directory: `mkdir /var/www/fixora`
3. Upload `backend/` folder to `/var/www/fixora/backend/`

### 2.2 Install Dependencies

```bash
cd /var/www/fixora/backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### 2.3 Configure Environment

Create `.env` file:

```bash
DATABASE_URL=postgresql://user:password@localhost:5432/fixora
JWT_SECRET=your_long_random_secret_key_here
JWT_ALGORITHM=HS256
JWT_EXPIRE_MINUTES=10080
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
ALLOWED_ORIGINS=https://yourdomain.com
```

### 2.4 Run Database Migrations

```bash
source venv/bin/activate
alembic upgrade head
```

### 2.5 Setup Systemd Service

Create `/etc/systemd/system/fixora.service`:

```ini
[Unit]
Description=Fixora Backend API
After=network.target

[Service]
User=www-data
WorkingDirectory=/var/www/fixora/backend
Environment="PATH=/var/www/fixora/backend/venv/bin"
ExecStart=/var/www/fixora/backend/venv/bin/uvicorn app.main:app --host 0.0.0.0 --port 8000
Restart=always

[Install]
WantedBy=multi-user.target
```

Start service:

```bash
sudo systemctl daemon-reload
sudo systemctl start fixora
sudo systemctl enable fixora
```

### 2.6 Setup Nginx Reverse Proxy

Create `/etc/nginx/sites-available/fixora`:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location /api {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location / {
        root /var/www/fixora/frontend/dist;
        try_files $uri $uri/ /index.html;
    }
}
```

Enable site:

```bash
sudo ln -s /etc/nginx/sites-available/fixora /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

## Step 3: Frontend Deployment

### 3.1 Build Frontend Locally

```bash
cd src
npm install
npm run build
```

### 3.2 Upload Built Files

Upload `src/dist/` folder to `/var/www/fixora/frontend/dist/`

---

## Step 4: SSL Certificate (HTTPS)

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

---

## Step 5: Shared Hosting Alternative

If using Hostinger Shared Hosting:

### 5.1 Backend (Python via CGI)

1. Upload backend files to `public_html/backend/`
2. Create `.htaccess` in `public_html/backend/`:

```apache
Options +ExecCGI
AddHandler cgi-script .py
```

3. Create `cgi-bin/main.py` entry point

### 5.2 Frontend (Static Files)

1. Build frontend locally: `npm run build`
2. Upload `dist/` contents to `public_html/`

---

## Step 6: Database Setup

### 6.1 Create Database via Hostinger Panel

1. Go to Hostinger hPanel → Databases → MySQL Databases
2. Create database: `fixora`
3. Create user with strong password
4. Note down credentials

### 6.2 Update .env

```bash
DATABASE_URL=postgresql://user:password@localhost:5432/fixora
```

---

## Step 7: Verify Deployment

```bash
# Check backend
curl https://yourdomain.com/api/

# Check frontend
curl https://yourdomain.com/

# Check service status
sudo systemctl status fixora

# Check nginx logs
sudo tail -f /var/log/nginx/error.log
```

---

## Troubleshooting

### Backend not starting

```bash
# Check logs
sudo journalctl -u fixora -f

# Check if port is in use
sudo netstat -tlnp | grep 8000

# Restart service
sudo systemctl restart fixora
```

### Database connection failed

- Verify DATABASE_URL in .env
- Check if PostgreSQL is running: `sudo systemctl status postgresql`
- Test connection: `psql -U user -d fixora`

### Frontend not loading

- Check Nginx config: `sudo nginx -t`
- Check file permissions: `sudo chown -R www-data:www-data /var/www/fixora`
- Restart Nginx: `sudo systemctl restart nginx`

---

## Security Checklist

- [ ] Change default passwords
- [ ] Enable firewall (ufw)
- [ ] Use HTTPS (SSL certificate)
- [ ] Restrict file permissions
- [ ] Keep dependencies updated
- [ ] Enable automatic backups
- [ ] Monitor logs regularly

---

**Deployed! 🚀 Your site is now live on Hostinger.**
