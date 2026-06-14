# Express Phone & Laptop Repair (Fixora)

**A full-stack web application for managing phone and laptop repair services.**

Built with **React + TanStack Router** (frontend), **FastAPI** (backend), **PostgreSQL** (database), and deployed on **Vercel**, **Render**, and **Supabase**.

---

## Features

✅ **Service Booking** — Schedule repairs with real-time status tracking  
✅ **Admin Dashboard** — Manage repairs, bookings, and customer data  
✅ **User Authentication** — Signup, login, password reset with OTP  
✅ **Payment Processing** — Stripe integration for online payments  
✅ **SMS Notifications** — Real-time updates via Telnyx  
✅ **Email Confirmations** — Transactional emails for bookings and repairs  
✅ **Responsive Design** — Mobile-first, works on all devices  
✅ **Dark Mode** — Theme toggle with persistent storage  
✅ **SEO Ready** — Meta tags, sitemap, structured data  

---

## Tech Stack

### Frontend
- **React 19** — UI library
- **TanStack Router** — Type-safe routing
- **Vite** — Lightning-fast build tool
- **Tailwind CSS** — Utility-first styling
- **Shadcn/ui** — Accessible component library
- **Framer Motion** — Smooth animations

### Backend
- **FastAPI** — Modern Python API framework
- **SQLAlchemy** — ORM for database queries
- **PostgreSQL** — Relational database
- **Alembic** — Database migrations
- **Celery** — Task queue (async jobs)
- **Pydantic v2** — Data validation

### DevOps & Infra
- **Render** — Backend hosting
- **Vercel** — Frontend hosting
- **Supabase** — PostgreSQL database
- **GitHub Actions** — CI/CD pipelines
- **Stripe** — Payment processing
- **Telnyx** — SMS delivery
- **Sentry** — Error monitoring

---

## Project Structure

```
project-root/
├── frontend/
│   ├── src/
│   │   ├── components/          # Reusable React components
│   │   ├── routes/              # TanStack Router pages
│   │   ├── lib/                 # Utilities and helpers
│   │   └── styles.css           # Global styles
│   ├── package.json
│   ├── vite.config.ts
│   └── vitest.config.ts         # Unit tests
├── backend/
│   ├── app/
│   │   ├── main.py              # FastAPI app entry
│   │   ├── models.py            # SQLAlchemy ORM models
│   │   ├── schemas.py           # Pydantic request/response
│   │   ├── database.py          # DB connection & session
│   │   ├── routers/             # API route handlers
│   │   └── utils/               # Helpers & utilities
│   ├── tests/                   # Pytest test files
│   ├── alembic/                 # Database migrations
│   ├── requirements.txt         # Python dependencies
│   └── Dockerfile
├── .github/workflows/           # CI/CD pipelines
├── e2e/                         # Playwright end-to-end tests
├── DEPLOYMENT_GUIDE.md          # Step-by-step deploy instructions
├── README_DEPLOY.md             # Quick deploy reference
└── README.md                    # This file
```

---

## Quick Start (Local Development)

### Frontend

```bash
npm install
npm run dev
```

Open http://localhost:5173

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate      # On Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env           # Update DATABASE_URL and secrets
uvicorn app.main:app --reload
```

Open http://localhost:8000/docs (Swagger API docs)

### Database

Create a local PostgreSQL database:

```bash
createdb repair_shop
```

Update `backend/.env`:
```
DATABASE_URL=postgresql://postgres:password@localhost:5432/repair_shop
```

Run migrations:
```bash
cd backend
alembic upgrade head
python seed.py
```

---

## Testing

### Frontend Unit Tests
```bash
npm run test:unit
```

### Frontend E2E Tests
```bash
npx playwright install --with-deps
npm run test:e2e
```

### Backend Tests
```bash
cd backend
pip install -r requirements-dev.txt
pytest -q
```

---

## Environment Variables

### Backend (`backend/.env`)

```env
DATABASE_URL=postgresql://user:pass@host:5432/database
JWT_SECRET=your_secret_key_here
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
STRIPE_SECRET_KEY=sk_test_...
TELNYX_API_KEY=your_key
REDIS_URL=redis://localhost:6379/0
SENTRY_DSN=https://...@sentry.io/...
```

### Frontend (`.env` or Vercel dashboard)

```env
VITE_API_URL=http://localhost:8000/api
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
VITE_SENTRY_DSN=https://...@sentry.io/...
```

---

## API Documentation

Auto-generated API docs available at:
- **Swagger UI:** http://localhost:8000/docs
- **ReDoc:** http://localhost:8000/redoc

### Key Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/signup` | — | Register new user |
| POST | `/api/auth/login` | — | Login with email/password |
| GET | `/api/auth/me` | ✅ | Get current user profile |
| POST | `/api/bookings/create` | — | Create repair booking |
| GET | `/api/repairs/track/{id}` | — | Track repair status |
| GET | `/api/admin/repairs` | 🔒 Admin | List all repairs |

See `backend/README.md` for complete API reference.

---

## Deployment

For production deployment, follow the **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** for step-by-step instructions on:

1. Setting up Supabase PostgreSQL database
2. Deploying backend to Render
3. Deploying frontend to Vercel
4. Configuring Stripe webhooks
5. Setting up CI/CD pipelines
6. Error monitoring with Sentry

### Quick Deploy Checklist

- [ ] Database migrations run (`alembic upgrade head`)
- [ ] Seeds applied (`python seed.py`)
- [ ] All environment variables set in production
- [ ] Stripe live keys configured
- [ ] SMS provider API keys added
- [ ] SMTP credentials set for email
- [ ] CORS origins restricted to your domain
- [ ] HTTPS enforced on all endpoints
- [ ] Backups configured in Supabase
- [ ] Error monitoring (Sentry) active

---

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

### Development Workflow

1. Create a branch: `git checkout -b feature/my-feature`
2. Make changes and test locally
3. Commit: `git commit -m "feat: description"`
4. Push: `git push origin feature/my-feature`
5. Open a Pull Request

### Code Style

- **Frontend:** ESLint + Prettier (`npm run lint && npm run format`)
- **Backend:** Black + Flake8 (auto-formatted on commit)

---

## Troubleshooting

### Frontend build fails
```bash
npm ci
npm run build
```

### Backend won't start
```bash
cd backend
pip install -r requirements.txt
alembic upgrade head
python seed.py
```

### Database connection errors
Check that `DATABASE_URL` is correct and the database is running.

### Tests fail
Ensure all dependencies are installed:
```bash
npm ci                                    # frontend
pip install -r requirements-dev.txt       # backend
```

---

## License

This project is proprietary. All rights reserved © 2026 Express Phone & Laptop Repair.

---

## Support & Contact

- **Website:** https://fixora.co.uk
- **Email:** noreply@fixora.com
- **Phone:** 07415 278767
- **Address:** 6 Harefield Road, Nuneaton, CV11 4HD

---

## Roadmap

- [ ] Mobile app (React Native)
- [ ] Advanced analytics dashboard
- [ ] Appointment calendar sync
- [ ] Multi-location support
- [ ] Customer portal with device history
- [ ] AI repair diagnostics

---

**Happy coding! 🚀**
