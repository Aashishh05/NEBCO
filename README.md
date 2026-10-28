# NEBCO — Construction Company Website

Full-stack MERN monorepo for the NEBCO company website (Nepal construction,
consulting, investments): marketing site with admin-managed content.

```
NEBCO/
├── Client/   React 19 + Vite 8 + Tailwind 4 + Redux Toolkit frontend (deployed on Vercel)
└── Server/   Express + MongoDB + Redis backend API (deployed on Render)
```

## Quick start

```bash
# Backend (http://localhost:5000)
cd Server
npm install
cp .env.example .env      # fill in MONGO_URI, JWT_SECRET, ...
npm run seed              # roles + admin + site content
npm run dev

# Frontend (http://localhost:5173)
cd Client
npm install
cp .env.example .env      # VITE_API_URL (default /api proxies to the backend)
npm run dev
```

Lint/build:

```bash
cd Client && npm run lint && npm run build
cd Server && npm run lint
```

- `Client/.env.example` — one variable: `VITE_API_URL`. Set it to `/api` to
  proxy through the frontend domain (keeps the auth cookie first-party on
  Vercel — see `Client/vercel.json`), or the backend URL directly.
- `Server/.env.example` — full list with per-feature docs in `Server/README.md`.

## Production layout

| Piece | Where | Notes |
| --- | --- | --- |
| Frontend | Vercel | rewrites `/api/*` to the backend origin (`Client/vercel.json`) |
| Backend | Render (`nebco.onrender.com`) | MongoDB + optional Redis |
| Media | Cloudinary | uploaded via the server's admin panel |
| Mail | SMTP (nodemailer) | enquiries, appointments, forgot-password |

## Documentation

- `Client/README.md` — frontend overview
- `Client/docs/nebco-homepage-design-reference.md` — homepage design spec and
  audit against the reference design
- `Server/README.md` — backend architecture, module list, environment variables
