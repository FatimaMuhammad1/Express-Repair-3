Deployment checklist and steps
==============================

This project uses Vercel for frontend, Render for backend, and Supabase for the PostgreSQL database.

Prepare secrets
---------------
- Add backend environment variables in Render service settings (do NOT commit secrets to the repo). Use the keys from `backend/.env` or `backend/.env.example` as a reference.
- Add `DATABASE_URL` from Supabase to Render.
- Add `STRIPE_SECRET_KEY`, `STRIPE_PUBLISHABLE_KEY`, and `STRIPE_WEBHOOK_SECRET` to Render.
- Add `TELNYX_API_KEY` (or other SMS provider) to Render.
- Add email SMTP credentials to Render (`SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`).

Backend (Render)
-----------------
1. Create a new Web Service on Render. Connect your GitHub repository.
2. Use the `backend/Dockerfile` (already present) or set the run command to `uvicorn app.main:app --host 0.0.0.0 --port $PORT`.
3. Add the required environment variables in the Render dashboard.
4. Set health check and scale settings as needed.
5. Add a cron or worker service for Celery if needed.

Run migrations and seed
----------------------
On the Render instance (or locally):

```bash
# export DATABASE_URL=your_supabase_database_url
cd backend
./run_migrations.sh
./run_seed.sh
```

Frontend (Vercel)
------------------
1. Connect the repo to Vercel and set the build command to `npm run build` and the output directory to `dist` (Vite default)
2. Add environment variables used by the frontend (e.g. public Stripe keys) in Vercel dashboard.

Supabase (Database)
--------------------
1. Create a Supabase project and database.
2. Configure your `DATABASE_URL` (connection string) and use it in Render environment.

CI/CD
-----
- Two workflow templates were added under `.github/workflows/` to build frontend and backend. They are templates — set secrets in the repository settings to enable automated deploys.

Monitoring & Error Reporting
---------------------------
- Optional: set `SENTRY_DSN` in Render and initialize Sentry in backend and frontend.

Notes
-----
- Replace placeholder privacy policy content in `src/routes/privacy.tsx` with your final policy or link to an external URL.
- The footer uses the dark logo; the navbar switches based on theme and uses `src/assets/dark-logo.png`.
