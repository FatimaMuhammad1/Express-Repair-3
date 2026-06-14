# 🚀 Quick Deployment Checklist

**Copy & paste these commands to deploy in ~30 minutes.**

---

## Prerequisites

- GitHub account with repo pushed
- Render account (https://render.com)
- Vercel account (https://vercel.com)
- Supabase account (https://supabase.com)

---

## Step 1: Supabase Database (5 min)

```bash
# 1. Create Supabase project at https://supabase.com
# 2. Go to Settings → Database → Connection string
# 3. Copy the connection string (replace [YOUR-PASSWORD])

# Save this for later:
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@db.xxxxx.supabase.co:5432/postgres"

# 4. Run migrations locally first to test:
cd backend
export DATABASE_URL="your_connection_string"
pip install -r requirements.txt
alembic upgrade head
python seed.py
echo "✅ Database ready!"
```

---

## Step 2: Deploy Backend to Render (10 min)

```bash
# 1. Go to https://render.com/dashboard
# 2. Click "New +" → "Web Service"
# 3. Select your GitHub repo → "Connect"

# 4. Configure:
#    - Name: fixora-backend
#    - Root Directory: backend
#    - Environment: Python 3
#    - Build Command: pip install -r requirements.txt
#    - Start Command: uvicorn app.main:app --host 0.0.0.0 --port $PORT

# 5. Add these environment variables in Render dashboard:
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@db.xxxxx.supabase.co:5432/postgres
JWT_SECRET=generate_a_really_long_random_string_at_least_32_chars
JWT_ALGORITHM=HS256
JWT_EXPIRE_MINUTES=10080
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_gmail_app_password
TELNYX_API_KEY=your_telnyx_key
TELNYX_FROM_NUMBER=+447415278767
STRIPE_SECRET_KEY=sk_live_your_stripe_live_key
STRIPE_PUBLISHABLE_KEY=pk_live_your_stripe_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
ALLOWED_ORIGINS=https://fixora.co.uk,https://www.fixora.co.uk
SENTRY_DSN=https://your_sentry_dsn@sentry.io/xxx (optional)

# 6. Click "Create Web Service" and wait ~2-3 minutes
# Get the URL: https://fixora-backend.onrender.com

echo "✅ Backend deployed!"
```

---

## Step 3: Deploy Frontend to Vercel (10 min)

```bash
# 1. Go to https://vercel.com/new
# 2. Select "Import Git Repository"
# 3. Choose your GitHub repo → "Import"

# 4. Configure:
#    - Framework: Vite
#    - Build Command: npm run build
#    - Output Directory: dist
#    - Root Directory: . (root)

# 5. Add environment variables:
VITE_API_URL=https://fixora-backend.onrender.com/api
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_your_stripe_key

# 6. Click "Deploy" and wait ~2-3 minutes
# Get the URL: https://fixora.vercel.app

echo "✅ Frontend deployed!"
```

---

## Step 4: Configure Custom Domain (5 min)

### Point Domain to Vercel

```bash
# In your domain registrar (GoDaddy, Namecheap, etc.):
# Add CNAME record: fixora.vercel.app

# In Vercel dashboard → Settings → Domains
# Add your domain: fixora.co.uk
# Auto-redirects https

echo "✅ Domain configured!"
```

---

## Step 5: Stripe Webhooks (5 min)

```bash
# 1. Get your Render backend URL: https://fixora-backend.onrender.com

# 2. Go to Stripe Dashboard → Developers → Webhooks
# 3. Click "Add endpoint"
#    - Endpoint URL: https://fixora-backend.onrender.com/api/payments/webhook
#    - Events: checkout.session.completed
#    - Click "Add endpoint"

# 4. Copy the Signing Secret
# 5. Add to Render environment: STRIPE_WEBHOOK_SECRET=whsec_xxx

echo "✅ Webhooks configured!"
```

---

## Step 6: Test Everything (5 min)

```bash
# Test backend health
curl https://fixora-backend.onrender.com/

# Test API docs
# Visit: https://fixora-backend.onrender.com/docs

# Test frontend
# Visit: https://fixora.co.uk/

# Test Privacy & Terms
# https://fixora.co.uk/privacy
# https://fixora.co.uk/terms

# Test dark logo in footer
# Should see dark logo that switches with theme

echo "✅ All systems go!"
```

---

## Quick Troubleshooting

### Backend won't start
```bash
# Check logs in Render dashboard → "Logs" tab
# Likely issue: DATABASE_URL not set or invalid
# Fix: Verify connection string in Render environment
```

### Frontend build fails
```bash
# Check logs in Vercel dashboard
# Likely issue: TypeScript error or missing environment variable
# Fix: Run npm run build locally to reproduce
```

### Stripe webhooks failing
```bash
# Check Render logs for 404 or 401 errors
# Likely issue: Wrong webhook URL or missing STRIPE_WEBHOOK_SECRET
# Fix: Verify webhook URL and secret in Render environment
```

### Database connection timeout
```bash
# Likely issue: Supabase database not reachable or credentials wrong
# Fix: Test locally first: python -c "import sqlalchemy; ..."
# Verify DATABASE_URL format is correct
```

---

## Production Checklist

- [ ] Backend deployed to Render and health check passes
- [ ] Frontend deployed to Vercel and loads
- [ ] Custom domain points to Vercel
- [ ] Stripe live keys configured (not test keys)
- [ ] Database migrations applied (alembic upgrade head)
- [ ] Admin account created and password reset works
- [ ] Email delivery tested (signup should send OTP)
- [ ] SMS delivery tested (booking should send SMS)
- [ ] Payment flow tested end-to-end
- [ ] Dark logo displays in footer
- [ ] Privacy & Terms pages load and are accessible
- [ ] Sentry error reporting is active
- [ ] All CI/CD pipelines are passing

---

## You're Live! 🎉

**Your website is now live at:**
- Frontend: https://fixora.co.uk
- Backend API: https://fixora-backend.onrender.com
- API Docs: https://fixora-backend.onrender.com/docs

---

## Daily Maintenance

```bash
# Check Render logs for errors
# Monitor Sentry dashboard for exceptions
# Review Stripe payments in dashboard
# Backup database (automatic in Supabase)

# Deploy updates automatically:
git push origin main  # Triggers CI/CD → auto-deploys
```

---

## Need Help?

- **Stuck on deployment?** → See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
- **API questions?** → See backend/README.md
- **Security issues?** → See [SECURITY.md](./SECURITY.md)
- **Development?** → See [CONTRIBUTING.md](./CONTRIBUTING.md)

---

**That's it! You're deployed! 🚀**
