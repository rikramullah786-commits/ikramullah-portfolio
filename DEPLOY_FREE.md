# Free Deployment — Ikramullah Portfolio

This project is prepared for:

- GitHub — source control
- Vercel — React/Vite frontend
- Render — Node/Express API
- MongoDB Atlas — production MongoDB
- Cloudinary — persistent project screenshots

## 1. Push to GitHub

Create a new GitHub repository and upload the contents of `final_portfolio`.

Do not commit:

- `node_modules/`
- `server/.env`
- `client/dist/`
- production secrets

The included `.gitignore` already excludes these.

## 2. Create MongoDB Atlas

Create a free MongoDB Atlas cluster and database named `ikramullah_portfolio`.
Create a database user and allow the deployment IP access required by Atlas.
Copy the SRV connection string.

## 3. Deploy the API to Render

Create a new Render Web Service from the GitHub repository.

If the repository contains this project at the repository root:

- Root Directory: `server`
- Runtime: Node
- Build Command: `npm ci`
- Start Command: `npm start`

Set these environment variables in Render:

- `MONGODB_URI` = your MongoDB Atlas SRV URI
- `JWT_SECRET` = a long random secret
- `ADMIN_USERNAME` = your admin username
- `ADMIN_PASSWORD` = a strong admin password
- `FRONTEND_URL` = your Vercel URL
- `CLOUDINARY_CLOUD_NAME` = Cloudinary cloud name
- `CLOUDINARY_API_KEY` = Cloudinary API key
- `CLOUDINARY_API_SECRET` = Cloudinary API secret

After deployment, test:

`https://YOUR-RENDER-SERVICE.onrender.com/api/health`

It should return JSON with `ok: true` and `database: true`.

## 4. Configure Cloudinary

Create a Cloudinary account and copy the cloud name, API key and API secret into Render.

Project screenshot uploads from the Admin page are uploaded to the `ikramullah-portfolio` Cloudinary folder, so they persist across Render restarts/redeployments.

## 5. Deploy the React frontend to Vercel

Import the same GitHub repository into Vercel.

Set the project root directory to `client`.

Build command:

`npm run build`

Output directory:

`dist`

Add this Vercel environment variable:

- `VITE_API_URL` = your Render API URL, for example `https://YOUR-RENDER-SERVICE.onrender.com`

Deploy.

## 6. Connect the two services

Copy the final Vercel URL into Render's `FRONTEND_URL` variable.
If you change the Vercel domain later, update `FRONTEND_URL` in Render and redeploy.

## 7. Seed the production database

The server includes `seed.js`. Run it once against your Atlas database from a local terminal using the Atlas `MONGODB_URI`:

`npm --prefix server run seed`

Alternatively, use Render Shell and run:

`npm run seed`

Do not run the seed repeatedly if you do not want to overwrite/duplicate your initial portfolio data.

## 8. Admin

Open:

`https://YOUR-VERCEL-DOMAIN.vercel.app/admin`

Use the `ADMIN_USERNAME` and `ADMIN_PASSWORD` configured in Render.

After Cloudinary is configured, use the Admin cockpit to upload project screenshots and add a title/description for each screenshot.

## Important

Render's local filesystem is not a reliable permanent location for uploaded images. This version therefore uses Cloudinary for new screenshot uploads in production.
