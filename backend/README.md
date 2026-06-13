# Electronics Repair Shop — FastAPI Backend

**Stack:** Python · FastAPI · SQLAlchemy (ORM) · PostgreSQL · Alembic · Pydantic v2

---

## Project Structure

```
backend/
├── app/
│   ├── main.py            # FastAPI app — mounts all routers, creates tables on startup
│   ├── config.py          # Pydantic settings (reads .env automatically)
│   ├── database.py        # SQLAlchemy engine, session factory, get_db() dependency
│   ├── models.py          # ORM models: User, Otp, Service, Appointment, Repair
│   ├── schemas.py         # Pydantic request/response schemas
│   ├── dependencies.py    # JWT auth guard, role checker, optional-user helper
│   ├── utils/
│   │   ├── helpers.py     # bcrypt, JWT, OTP generator, tracking ID
│   │   └── mailer.py      # SMTP email + console fallback for local dev
│   └── routers/
│       ├── auth.py        # /api/auth/*
│       ├── otp.py         # /api/otp/*
│       ├── view.py        # /api/view/*
│       ├── bookings.py    # /api/bookings/*
│       └── repairs.py     # /api/repairs/*
├── seed.py                # One-shot seed: services + admin user
├── alembic.ini            # Alembic migration config
├── requirements.txt
└── .env
```

---

## Quick Start

### 1. Create & activate a virtual environment

```bash
python -m venv venv
# Windows:
venv\Scripts\activate
```

### 2. Install dependencies

```bash
pip install -r requirements.txt
```

### 3. Configure `.env`

Edit `.env` with your PostgreSQL credentials:

```env
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/repair_shop
JWT_SECRET=change_me_in_production
```

### 4. Create the database

```sql
CREATE DATABASE repair_shop;
```

### 5. Run the server (tables are auto-created on first start)

```bash
uvicorn app.main:app --reload
```

### 6. Seed services + admin user

```bash
python seed.py
```

### 7. Open the interactive API docs

```
http://localhost:8000/docs        ← Swagger UI (try every endpoint here)
http://localhost:8000/redoc       ← ReDoc
```

---

## API Reference

### Auth `/api/auth`

| Method | Endpoint           | Access | Description                   |
| ------ | ------------------ | ------ | ----------------------------- |
| POST   | `/signup`          | Public | Register — sends OTP to email |
| POST   | `/verify-email`    | Public | Verify email with OTP         |
| POST   | `/login`           | Public | Login — returns JWT token     |
| POST   | `/forgot-password` | Public | Send password reset OTP       |
| POST   | `/reset-password`  | Public | Reset password with OTP       |
| GET    | `/me`              | 🔒 Any | Get current user profile      |

### OTP `/api/otp`

| Method | Endpoint  | Access | Description              |
| ------ | --------- | ------ | ------------------------ |
| POST   | `/send`   | Public | Send / resend OTP        |
| POST   | `/verify` | Public | Verify OTP independently |

### Website View `/api/view`

| Method | Endpoint    | Access | Description                                         |
| ------ | ----------- | ------ | --------------------------------------------------- |
| GET    | `/services` | Public | List all active repair services                     |
| GET    | `/stats`    | Public | Live shop statistics (repairs, bookings, customers) |

### Bookings `/api/bookings`

| Method | Endpoint       | Access               | Description                                        |
| ------ | -------------- | -------------------- | -------------------------------------------------- |
| POST   | `/create`      | Public / 🔒 Customer | Create appointment (links to account if logged in) |
| GET    | `/my-bookings` | 🔒 Customer          | View own bookings                                  |
| GET    | `/all`         | 🔒 Admin / Tech      | List all bookings                                  |
| PUT    | `/{id}/status` | 🔒 Admin / Tech      | Update booking status                              |

> Booking statuses: `pending` → `confirmed` → `completed` / `cancelled`

### Repairs `/api/repairs`

| Method | Endpoint                | Access          | Description                               |
| ------ | ----------------------- | --------------- | ----------------------------------------- |
| POST   | `/create`               | 🔒 Admin / Tech | Create repair ticket, returns tracking ID |
| GET    | `/track/{tracking_id}`  | Public          | Track device status + progress %          |
| PUT    | `/{tracking_id}/status` | 🔒 Admin / Tech | Update repair status & notes              |
| GET    | `/all`                  | 🔒 Admin / Tech | List all repair tickets                   |

> Repair stages: `received`(20%) → `diagnosed`(40%) → `repairing`(60%) → `testing`(80%) → `collection`(100%)

---

## Authentication

All protected routes require a `Bearer` token in the `Authorization` header:

```
Authorization: Bearer <your_jwt_token>
```

Get the token from `/api/auth/login` or `/api/auth/verify-email`.

---

## Default Admin Credentials (after seeding)

```
Email:    admin@repairshop.com
Password: AdminPassword123
```
