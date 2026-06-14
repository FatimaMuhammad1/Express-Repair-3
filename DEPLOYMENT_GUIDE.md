# Complete Deployment Guide

This guide walks through deploying Express Phone & Laptop Repair (Fixora) to production using Render (backend), Vercel (frontend), and Supabase (database).

---

## Prerequisites

- GitHub repository connected and pushed
- Render account (https://render.com)
- Vercel account (https://vercel.com)
- Supabase account (https://supabase.com)
- Credit card for production services (all providers offer free tier for testing)

---

## Step 1: Set up Supabase Database

### 1.1 Create Supabase Project

1. Go to https://supabase.com → Sign up or log in
2. Click **New Project**
3. Enter project name: `fixora-prod` (or your choice)
4. Set region: UK (London recommended for Nuneaton)
5. Enter strong database password and save it
6. Wait for database to be provisioned (~2 min)

### 1.2 Get Connection String

1. Go to **Settings** → **Database**
2. Copy the **Connection string** (PostgreSQL URI format)
3. Replace `[YOUR-PASSWORD]` with the password you set
4. Copy the full string — you'll need it in Step 2

Example:
```
postgresql://postgres:YOUR_PASSWORD@db.atnmhsujmdwouxhmowqo.supabase.co:5432/postgres
```

### 1.3 Run Migrations

Run this locally (or on a temporary machine with the backend code):

```bash
cd backend
export DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@db.atnmhsujmdwouxhmowqo.supabase.co:5432/postgres"
pip install -r requirements.txt
alembic upgrade head
python seed.py
```

On **Windows PowerShell**:
```powershell
$env:DATABASE_URL = "postgresql://postgres:YOUR_PASSWORD@db.atnmhsujmdwouxhmowqo.supabase.co:5432/postgres"
pip install -r requirements.txt
alembic upgrade head
python seed.py
```

---

## Step 2: Deploy Backend to Render

### 2.1 Create Web Service on Render

1. Go to https://render.com → Dashboard
2. Click **New +** → **Web Service**
3. Select **Connect a repository** → Choose your GitHub repo
4. Fill in:
   - **Name:** `fixora-backend`
   - **Root Directory:** `backend`
   - **Environment:** Python 3
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `uvicorn app.main:app --host 0.0.0.0 --port $PORT`

### 2.2 Add Environment Variables

In the Render dashboard, go to **Environment** and add:

```
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@db.atnmhsujmdwouxhmowqo.supabase.co:5432/postgres
JWT_SECRET=generate_a_long_random_string_here_use_32_chars_min
JWT_ALGORITHM=HS256
JWT_EXPIRE_MINUTES=10080

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password_from_google

TELNYX_API_KEY=your_telnyx_key
TELNYX_FROM_NUMBER=+447415278767

STRIPE_SECRET_KEY=sk_live_your_live_key_here
STRIPE_PUBLISHABLE_KEY=pk_live_your_live_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

REDIS_URL=redis://localhost:6379/0

ALLOWED_ORIGINS=https://fixora.co.uk,https://www.fixora.co.uk,http://localhost:5173
SENTRY_DSN=https://your-sentry-key@sentry.io/project-id
```

### 2.3 Deploy

Click **Create Web Service** — deployment starts automatically. Once live, you'll get a URL like `fixora-backend.onrender.com`.

---

## Step 3: Deploy Frontend to Vercel

### 3.1 Import Project

1. Go to https://vercel.com → **New Project**
2. Import your GitHub repository
3. Configure:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Root Directory:** `.` (root)

### 3.2 Set Environment Variables

In **Settings** → **Environment Variables**, add:

```
VITE_API_URL=https://fixora-backend.onrender.com/api
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_your_key
```

### 3.3 Deploy

Click **Deploy** — builds and deploys automatically. You'll get a URL like `fixora.vercel.app`.

### 3.4 Custom Domain

1. Go to **Settings** → **Domains**
2. Add your domain (e.g., `fixora.co.uk`)
3. Update DNS records as instructed by Vercel

---

## Step 4: Configure Payments (Stripe Webhooks)

### 4.1 Get Render Backend URL

From your Render service page, copy the service URL: `https://fixora-backend.onrender.com`

### 4.2 Add Webhook Endpoint

1. Go to Stripe Dashboard → **Developers** → **Webhooks**
2. Click **Add endpoint**
3. Enter: `https://fixora-backend.onrender.com/api/payments/webhook`
4. Select events: `checkout.session.completed`
5. Copy the **Signing Secret** and add to Render environment as `STRIPE_WEBHOOK_SECRET`

---

## Step 5: Configure CI/CD

### 5.1 Set GitHub Secrets

1. Go to GitHub repo → **Settings** → **Secrets and variables** → **Actions**
2. Add (if deploying via Actions):
   - `RENDER_API_KEY` (from Render account settings)
   - `VERCEL_TOKEN` (from Vercel account settings)
   - `VERCEL_PROJECT_ID` (from Vercel project settings)

### 5.2 Workflows

Two GitHub Actions workflows are included:
- `.github/workflows/deploy-backend.yml` — Runs tests, builds backend
- `.github/workflows/deploy-frontend.yml` — Runs tests, builds frontend

Both trigger on pushes to `main` or `master` branches.

---

## Step 6: Monitor & Maintain

### 6.1 Error Reporting (Sentry)

1. Create account at https://sentry.io
2. Create a project for Python (FastAPI)
3. Get `SENTRY_DSN` and add to Render environment
4. Set `SENTRY_DSN` in Vercel for frontend (if using Sentry on frontend)

### 6.2 Logs

- **Render:** Dashboard → **Logs** tab (live logs)
- **Vercel:** Dashboard → **Deployments** → **Logs**
- **Supabase:** **SQL Editor** or **Database** tab for queries

### 6.3 Health Checks

Test endpoints after deployment:

```bash
# Backend health
curl https://fixora-backend.onrender.com/

# Frontend (should return 200)
curl https://fixora.vercel.app/

# API docs (FastAPI Swagger)
curl https://fixora-backend.onrender.com/docs
```

---

## Troubleshooting

### Backend fails to deploy

**Check:**
- All environment variables are set (especially `DATABASE_URL`)
- Database connection works: test locally first with same URL
- Python version is 3.9+ (Render uses latest by default)

### Frontend build fails

**Check:**
- `npm run build` works locally: `npm ci && npm run build`
- All frontend environment variables are set (`VITE_*`)
- No TypeScript errors: run `npm run lint`

### Payments not working

**Check:**
- Stripe keys are correct (live, not test)
- Webhook endpoint is registered in Stripe
- `STRIPE_WEBHOOK_SECRET` is set in Render

### SMS not sending

**Check:**
- Telnyx API key is correct
- `TELNYX_FROM_NUMBER` is verified in Telnyx dashboard
- Phone numbers are in E.164 format: `+44...`

### Database connection timeout

**Check:**
- Supabase database is running (check Supabase dashboard)
- Network firewall allows external connections (Supabase allows by default)
- Connection string includes password correctly

---

## Security Checklist

- [ ] All secrets are in environment variables (not in code)
- [ ] JWT_SECRET is a strong random string
- [ ] SMTP password is an app-specific password (not your Gmail password)
- [ ] Stripe keys are live keys, not test keys (for production)
- [ ] CORS origins are restricted to your domain (not `*` in production)
- [ ] HTTPS is enforced on all URLs
- [ ] Sensitive logs are not exposed (disable debug mode in production)
- [ ] Database backups are configured in Supabase
- [ ] Error reporting (Sentry) is configured

---

## Rollback

If deployment fails:

1. **Render:** Go to **Deployments** → Select previous successful build → Click **Deploy**
2. **Vercel:** Go to **Deployments** → Click previous version → Click **Redeploy**

---

## Support

For issues:

1. Check Render/Vercel logs first
2. Review `.github/workflows/` for CI errors
3. Contact:
   - Render Support: https://render.com/docs
   - Vercel Support: https://vercel.com/support
   - Supabase Docs: https://supabase.com/docs

---

**Deployed! 🚀 Your site is now live.**
