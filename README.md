# S&B Retail — React / Node / PostgreSQL rebuild

Three independent apps:

```
sandb-retail/
├── backend/    Express API + Prisma + PostgreSQL   → http://localhost:5000
├── frontend/   Customer-facing site (Vite + React)  → http://localhost:5173
├── admin/      Admin dashboard (Vite + React)        → http://localhost:5174
└── docker-compose.yml   Local Postgres for development
```

## 1. Start PostgreSQL

```bash
docker compose up -d
```

This starts Postgres on `localhost:5432` with db `sandb_retail`, user/pass `postgres`/`postgres`.
(No Docker? Point `DATABASE_URL` in `backend/.env` at any Postgres instance instead.)

## 2. Backend

```bash
cd backend
cp .env.example .env      # fill in real secrets before deploying
npm install
npm run prisma:migrate    # creates tables
npm run seed               # creates an admin user + sample products
npm run dev                 # http://localhost:5000
```

Default seeded admin login: `admin@sandbretailltd.com` / `ChangeMe123!` — change this immediately.

## 3. Frontend (customer site)

```bash
cd frontend
cp .env.example .env
npm install
npm run dev    # http://localhost:5173
```

## 4. Admin dashboard

```bash
cd admin
cp .env.example .env
npm install
npm run dev    # http://localhost:5174
```

## Notes

- Auth uses httpOnly JWT cookies (access + refresh), shared across the two frontends via CORS + `credentials: true`.
- The `admin` app checks `role === 'ADMIN'` on login and refuses customer accounts.
- File uploads (resumes) are stored locally under `backend/uploads/` and served at `/uploads/...`; swap `upload.middleware.js` for S3/Cloudinary before going to production.
- Payments (Stripe) and email (Nodemailer) are stubbed in as dependencies but not wired up yet — add `payment.service.js` / `email.service.js` under `backend/src/services/` when ready.
- Update the brand palette in `frontend/tailwind.config.js` and `admin/tailwind.config.js` (`brand.500` = `#1fbfde`, taken from the original site) to match final branding.

## Deployment sketch

- Backend: any Node host (Render, Railway, Fly.io) + managed Postgres (Neon, Supabase, RDS)
- Frontend & Admin: static hosts (Vercel, Netlify) — two separate deployments, two separate domains/subdomains (e.g. `sandbretailltd.com` and `admin.sandbretailltd.com`)
- Set `CLIENT_URL` / `ADMIN_URL` in backend `.env` to the deployed URLs so CORS allows them
