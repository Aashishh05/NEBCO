# NEBCO

Backend for the NEBCO clone project (construction, consulting and investments company site, Nepal). Frontend comes later and reads everything through the API below.

## Tech stack (what we used, for what)

| Piece | Package | Why |
|---|---|---|
| API framework | Express 4 | HTTP server and routing |
| Database | MongoDB Atlas + Mongoose 8 | stores users, roles, content, enquiries |
| Cache / rate limits / RBAC | Redis (ioredis) | content cache (`X-Cache`), login & form limits, user permission cache |
| Auth | jsonwebtoken + httpOnly cookie | login sessions; nothing in localStorage |
| Password hashing | bcryptjs | cost 12 |
| Validation | zod | every write route validates the body |
| Images | Cloudinary + multer | uploads go straight to Cloudinary, never the server disk |
| Email | nodemailer | confirmation + notification emails for forms |
| Logging | pino + pino-pretty | clean colored server logs |
| Security | helmet, express-mongo-sanitize, cors | headers, injection guard, CORS for `CLIENT_URL` |
| Seeding | `npm run seed` | roles, permissions, admin user, all NEBCO content |

## How to run

```bash
cd Server
npm install
# copy .env.example to .env and fill every value
npm run seed       # roles, permissions, admin user + content
npm run dev        # nodemon on port 5000
```

Health check: `GET http://localhost:5000/api/health` → `{ "mongo": "up", "redis": "up" }`

## Folder layout

```
src/
  app.js              express app (middleware stack, mounts /api)
  server.js           start point, boot checks (DB, Redis, Cloudinary)
  config/             db, redis, cloudinary, nodemailer
  constants/          modulesConstant (module list), rolesConstant (role names),
                      permissionsConstant (permission matrix builder)
  middleware/         auth, permission, validate, rateLimit, cache, upload, error
  routes/mainRoutes.js  mounts every module route under /api
  seed/               seed.js + nebcoSeed.js (all copy + content)
  utils/              ApiError, asyncHandler, response, logger, cache, rbacCache, sendEmail
  modules/<name>/     model → repository → service → controller → validation → route
```

Every module follows one pattern: `model` (schema) → `repository` (DB queries) → `service` (business rules) → `controller` (request/response) → `validation` (zod) → `route` (mount + guards).

> Hero, about, services and homepage stats are **static frontend text** (not editable via admin). Only projects, testimonials, team, contact and forms come from this API.

## Modules (what each one does)

### auth
Login, logout, "me" and change password. Issues the JWT cookie. **No register/forgot-password** — admin accounts are created by a Super Admin or the seed.

- `POST /api/auth/login` · `POST /api/auth/logout`
- `GET /api/auth/me` · `PUT /api/auth/password`

### roles
Job titles: super-admin, admin, editor, sales, viewer. Role itself only stores `name/slug/description`. System roles can't be deleted.

- `GET/POST /api/roles`, `PUT/DELETE /api/roles/:id`

### permissions
**One document per role** — a matrix `{ module: { read, create, update, delete } }`. This is what answers "can this user do X?" on every request. Edited from `PUT /permissions/role/:roleId`, caches in Redis (`rbac:user:<id>`) and clears it on change.

- `GET /api/permissions`
- `GET /api/permissions/role/:roleId` · `PUT /api/permissions/role/:roleId`

### users
Staff accounts (name, email, password, role, active). Safety rules: can't delete yourself, last active super admin can't be removed or demoted.

- `GET/POST /api/users`, `PUT/DELETE /api/users/:id`

### audit
Read-only log of logins, logouts and admin writes (who, what action, on what resource, IP).

- `GET /api/audit`

### contact
The single contact card (company, email, phones, address, socials) shown in the footer and Contact page.

- `GET /api/contact` (public) · `PUT /api/contact` (admin, settings)

### project
Portfolio items: title, slug, category (residential/commercial/hospitality), location, year, status, `image` + `gallery` as `{ publicId, url }`, featured toggle.

- `GET /api/projects` (category/featured filters, paginated) · `GET /api/projects/:slug` · `GET /api/projects/featured` (public)
- `GET /api/projects/admin/all`, `POST`, `PUT /:id`, `DELETE /:id` (admin)

### team
Staff: name, position, bio, `photo { publicId, url }`, socials, order.

- `GET /api/team` (public) · admin list/create/update/delete

### testimonial
Client quotes with rating; **only published ones** appear publicly.

- `GET /api/testimonials` (public) · admin list/create/update/delete (has `isPublished` toggle)

### media
The image library. Uploads a file field to Cloudinary, stores `{ publicId, url }`; those objects plug into any content field. Admin uses it as a picker.

- `GET /api/media` · `POST /api/media` (multipart field `file`, JPG/PNG/WebP max 5 MB) · `DELETE /api/media/:id`

### enquiry
Public enquiry form submissions. Honeypot (`website`) drops bots, `formLimiter` caps 5/hour/IP, emails: confirmation to visitor + notification to `NOTIFY_EMAIL`. Admin can filter, assign, add notes, change status and export CSV.

- `POST /api/enquiries` (public, formLimiter)
- `GET /api/enquiries`, `PUT /:id`, `DELETE /:id`, `GET /api/enquiries/export` (admin)

### appointment
"Schedule a call" requests: name, email, phone, preferred date/time. Same honeypot + limiter + emails. Admin confirms (stores `confirmedTime`), cancels, assigns, adds notes.

- `POST /api/appointments` (public, formLimiter)
- `GET /api/appointments`, `PUT /:id`, `DELETE /:id` (admin)

## How one request flows

```
login → authService loads role's permission matrix → stored on req.user + Redis cache
GET /api/projects → cache middleware → MISS/DB or HIT/Redis → response has X-Cache header
POST /api/projects (admin) → authMiddleware → checkPermission("projects","create")
  → zod validation → save → clear Redis cache → audit entry
```

## Every image field

`publicId` + `url` pair (from Cloudinary). Applies to `project.image` + `project.gallery[]`, `team.photo`, `testimonial.avatar`.

## Environment variables

See `Server/.env.example`:

- `MONGO_URI`, `REDIS_URL`, `CACHE_ENABLED`, `CACHE_TTL_SECONDS`
- `JWT_SECRET`, `JWT_EXPIRES_IN`, `CLIENT_URL`
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `MAIL_FROM`, `NOTIFY_EMAIL`
- `ADMIN_NAME`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`
- `PORT`, `NODE_ENV`, `LOG_LEVEL`

## What's next

- Frontend (Vite + React + Redux Toolkit + Tailwind + shadcn/ui + lucide-react) — Phases 5–7 of the plan
- Replaces placeholder copy/images with the real NEBCO assets