# ERP QA Audit Report - 2026-07-01

## Scope Verified

- Frontend production build with `npm.cmd run build`.
- Frontend lint with `npm.cmd exec eslint src -- --max-warnings=0`.
- Backend import/compile with `python -m compileall backend\app`.
- Backend health check with FastAPI `TestClient`.
- Authenticated backend smoke tests against the live local PostgreSQL database using seeded `SUPER_ADMIN` and staff users.
- Static route/API wiring review across `src`, `backend/app/routers`, and `backend/app/models`.

Browser-level end-to-end workflow verification was blocked because Playwright browsers are not installed locally. `npm.cmd exec playwright test` failed before launch with a missing Chromium executable.

## Fully Working

- Frontend production build completes successfully.
- Backend app imports and root health check returns `200`.
- Database connection is live for DB-backed endpoints.
- Authentication login works for seeded `SUPER_ADMIN` and staff users.
- Anonymous access to protected ERP endpoints returns `401`.
- Authenticated smoke checks returned `200` for:
  - Auth profile
  - Bookings list
  - Repairs list and repair stats
  - Products and categories
  - Trade requests
  - Staff list
  - Communications history
  - Finance stats, transactions, invoices, expenses, revenue, online sales, in-house sales
  - Financial reports
  - Customers
  - Global search
  - Dashboard activity, upcoming bookings, low stock, technician performance
  - Audit logs
  - Notifications
  - Branches
  - Suppliers
  - Inventory suppliers, stock movements, low stock
  - Repair parts inventory
  - Services catalog
  - Tax rates
  - Invoice tax rates
  - Reminders upcoming
  - Roles

## Partially Working

- Purchase orders now work after the applied schema migration, but need full browser CRUD verification.
- Warranty routes now align between frontend and backend, but need full browser verification for create, edit, extend, and history display.
- Services and trade-request admin managers now call the correct API paths, but need browser confirmation of UI refresh and toast states.
- Dashboard numbers return from the database, but the exact calculations were not independently reconciled table-by-table.
- Security/RBAC exists on many endpoints, but permission coverage is inconsistent: several endpoints use any authenticated user where stricter role checks may be expected.
- Real-time notifications are not verified as real-time; current smoke only verified notification CRUD/list endpoints.
- Import/export endpoints exist, but file import/export was not fully exercised with browser download/upload flows.
- The frontend dev server runs in foreground but background launch was not reachable in this environment.

## Broken

- Playwright E2E cannot run until browsers are installed:
  - Missing executable: `chromium_headless_shell-1223`.
- ESLint fails heavily, mostly Prettier/line-ending issues plus `any` type violations.
- Several frontend files still hardcode `http://localhost:8000/api` instead of centralized `buildUrl`, including public/profile/contact/booking pages.
- Some frontend calls still reference nonexistent or suspicious endpoints:
  - `src/components/admin/EnhancedInventory.tsx` calls paths such as `/api/inventory`, `/api/suppliers`, `/api/purchase-orders`, causing double `/api` and route mismatches.
  - `src/routes/admin.repairs.$id.tsx` calls repair detail paths under `/repairs/...` where backend detail routes are under `/repair-details/...` or repair-parts routes.
  - `src/components/admin/AppointmentCalendar.tsx` calls `/bookings`, but backend provides `/bookings/all`, `/bookings/create`, and `/bookings/my-bookings`.
- No automated backend test suite can run because `pytest` is not installed in the active Python environment.

## Unused / Suspicious

- `src/components/admin/EnhancedInventory.tsx` appears disconnected from the main admin route and has multiple broken API paths.
- `src/components/admin/InvoiceGenerator.tsx` contains placeholder logic.
- Backend has duplicate purchase-order implementations under `/api/inventory/purchase-orders` and `/api/purchase-orders`.
- Backend has duplicate supplier routes under `/api/inventory/suppliers` and `/api/suppliers`.
- `backend/app/routers/two_factor.py` is mounted under `/auth/2fa`, not `/api/auth/2fa`, unlike the rest of the API.
- Empty tables in current data are not necessarily unused, but need product-owner confirmation: audit logs, notifications, communications, roles, permissions, tax rates, trade requests, suppliers, online sales.

## Fixes Applied

- Added Alembic migration `9f2c1a7d0b6e_add_purchase_order_approval_columns.py`.
- Applied the migration to the local database.
- Fixed purchase-order endpoint crashes caused by missing `requested_by`, `approved_by`, `approved_at`, and `rejection_reason` columns.
- Verified purchase-order list, pending, stats, create, and history after migration.
- Removed accidental `/api` duplication in:
  - `TradeRequestsManager`
  - `ServicesManager`
- Moved warranty backend prefix to `/api/warranty`.
- Updated `WarrantyManager` frontend calls to `/warranty/repairs/{repairId}` through `buildUrl`.
- Fixed warranty date payload/parsing so ISO dates and `YYYY-MM-DD` values are accepted.
- Rebuilt frontend successfully after fixes.
- Recompiled backend successfully after fixes.

## Remaining Issues Before Deployment

- Install Playwright browsers and run full browser E2E across public and admin workflows.
- Fix ESLint/Prettier failures before treating CI as deployment-ready.
- Replace all hardcoded frontend API URLs with centralized API config.
- Finish API-path cleanup for repair detail, appointment calendar, and enhanced inventory components.
- Add backend tests for every router, including CRUD, RBAC, validation, and error states.
- Reconcile every dashboard/finance number against source database queries.
- Decide whether duplicate route families should be consolidated.
- Add CSRF strategy if cookie-based auth is introduced; current token-in-storage flow mainly depends on bearer tokens and CORS.
- Run a real import/export test with files and downloaded CSVs.
- Run responsive UI screenshots after Playwright browser installation.
- Confirm production environment secrets: `JWT_SECRET`, CORS origins, database URL, SMTP, Telnyx, Stripe, Redis.
