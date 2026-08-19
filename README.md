# Ikramullah Portfolio — Final Stable Build

This version keeps the original UI and animation direction. The homepage is still one continuous visual experience; the code is separated into pages, sections, API modules, MongoDB models, controllers and routes.

## Important stability fix
The API server now starts **before** MongoDB is connected. If MongoDB is not running, `/api/portfolio` returns built-in fallback data, so the first page still renders instead of becoming blank. The server retries MongoDB every 5 seconds. Once MongoDB is available, the same API automatically switches to database mode.

## Install
```bash
npm install
npm run install:all
```

## Start everything (Windows)
Double-click `start.bat` or run:
```bash
npm run dev
```

## Optional MongoDB setup
Default:
```text
mongodb://127.0.0.1:27017/ikramullah_portfolio
```

Copy `server/.env.example` to `server/.env` if you want custom settings.

Seed initial database data:
```bash
npm run seed
```

## URLs
Portfolio: http://localhost:5173
Admin: http://localhost:5173/admin
API health: http://localhost:5000/api/health

Development admin login:
- username/password come from `server/.env`
- never commit production credentials

## Public API
- GET `/api/portfolio`
- GET `/api/profile`
- GET `/api/skills`
- GET `/api/experience`
- GET `/api/projects`
- GET `/api/projects/:slug`
- GET `/api/guestbook`
- POST `/api/guestbook`

## Admin API
- POST `/api/admin/login`
- GET/PUT `/api/admin/profile`
- POST `/api/admin/projects`
- PUT/DELETE `/api/admin/projects/:id`
- POST/DELETE `/api/admin/projects/:id/screenshots...`
- POST/PUT/DELETE `/api/admin/skills...`
- POST/PUT/DELETE `/api/admin/experience...`

## Architecture
```text
client/src/
  api/
  components/
  data/
  hooks/
  layout/
  pages/
  sections/
  styles/

server/
  config/
  controllers/
  data/
  middleware/
  models/
  routes/
  uploads/
```


## Free production deployment
See `DEPLOY_FREE.md` for the exact GitHub + Vercel + Render + MongoDB Atlas + Cloudinary setup.
