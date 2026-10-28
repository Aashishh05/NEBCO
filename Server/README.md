# NEBCO Server

Express + MongoDB backend API for NEBCO (construction company site). Node >= 20,
ES modules, module-per-feature structure with controller / service / repository /
model layers, Zod validation, JWT cookie auth and Redis-backed rate limiting.

## Scripts

```bash
npm run dev     # nodemon dev server
npm start       # production start
npm run seed    # seed roles, admin user and site content
npm run lint    # oxlint
```

## Environment

Copy `.env.example` to `.env` (already gitignored). Required by feature:

| Variable | Used for |
| --- | --- |
| `PORT` | HTTP port (default 5000) |
| `NODE_ENV` | `production` enables secure cookies, `sameSite: none`, terse errors |
| `MONGO_URI` | MongoDB connection — required by `src/config/db.js` |
| `JWT_SECRET` / `JWT_EXPIRES_IN` | Token signing (default expiry `7d`) |
| `CLIENT_URL` | Comma-separated CORS origins, e.g. `http://localhost:5173,https://nebco.vercel.app` |
| `CLOUDINARY_CLOUD_NAME` / `CLOUDINARY_API_KEY` / `CLOUDINARY_API_SECRET` | Image uploads |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_USER` / `SMTP_PASS` | Nodemailer transport (port 465 -> secure) |
| `MAIL_FROM` | From address on outgoing mail |
| `NOTIFY_EMAIL` | Inbox for enquiry/appointment notifications (optional) |
| `REDIS_URL` | Optional — enables Redis-backed rate limiting |
| `CACHE_ENABLED` / `CACHE_TTL_SECONDS` | Optional response cache (`false` disables; TTL default 600s) |
| `LOG_LEVEL` | pino log level (default `info`) |
| `ADMIN_EMAIL` / `ADMIN_NAME` / `ADMIN_PASSWORD` | `npm run seed` creates/refreshes this admin |

`REDIS_URL` unset or `CACHE_ENABLED=false` -> in-memory fallback, API still works.

## Structure

```
src/
  server.js            # entrypoint: connect DB + cloudinary check, then listen
  app.js               # express app (helmet, cors, cookies, sanitize, rate limit)
  routes/mainRoutes.js # mounts every module router under /api
  config/              # db, cloudinary, nodemailer, redis
  middleware/          # auth, rbac permissions, cache, uploads, validation, rate limit
  modules/             # one folder per feature, each with route/model/service/
                       # repository/controller/validation
  utils/               # jwt, mail, cache, logger, ApiError, response
  seed/                # roles + permissions + admin + site content (nebcoSeed.js)
```

Modules: `auth`, `user`, `role`, `permission`, `audit`, `appointment`, `enquiry`,
`contact`, `project`, `team`, `testimonial`, `media`.

## API notes

- REST under `/api`; health check at `/api/health`.
- Auth is a signed JWT in an httpOnly cookie (`sameSite: none` + `secure` in
  production), which is why the client optionally proxies `/api` through its own
  domain (see `Client/vercel.json`) to keep the cookie first-party.
- CORS allows configured `CLIENT_URL` origins, any `localhost` port and any
  `*.vercel.app` preview.
- File uploads go through Multer to Cloudinary.
