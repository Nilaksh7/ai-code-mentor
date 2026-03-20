# AI Code Mentor — Deployment Guide

Stack: MongoDB Atlas + Render (backend) + Vercel (frontend)

---

## Step 1 — MongoDB Atlas (Database)

1. Go to https://mongodb.com/atlas and sign up (free)
2. Create a new **free M0 cluster**
3. Under **Database Access** → Add a database user
   - Username: `admin`
   - Password: generate a strong one, save it
4. Under **Network Access** → Add IP Address → **Allow Access from Anywhere** (0.0.0.0/0)
5. Click **Connect** → **Compass** → copy the connection string
   - It looks like: `mongodb+srv://admin:<password>@cluster0.xxxxx.mongodb.net/`
   - Replace `<password>` with your actual password
   - Append database name: `mongodb+srv://admin:yourpass@cluster0.xxxxx.mongodb.net/ai-code-mentor`
6. Save this — it's your `MONGO_URI`

---

## Step 2 — Deploy Backend to Render

1. Push your project to GitHub (see Git Setup below)
2. Go to https://render.com and sign up (free)
3. Click **New → Web Service**
4. Connect your GitHub repo
5. Configure:
   - **Name**: `ai-code-mentor-backend`
   - **Root Directory**: `backend`
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

6. Under **Environment Variables**, add all of these:

   | Key | Value |
   |-----|-------|
   | `MONGO_URI` | your MongoDB Atlas connection string |
   | `JWT_SECRET` | any long random string (e.g. `xK9mP2qR8vL5nJ3wA7bE1cY4uH6tG0s`) |
   | `GEMINI_API_KEY` | your key from https://aistudio.google.com |
   | `FRONTEND_URL` | leave blank for now, update after Vercel deploy |
   | `NODE_ENV` | `production` |

7. Click **Create Web Service**
8. Wait ~3 minutes for the first deploy
9. Copy your backend URL: `https://ai-code-mentor-backend.onrender.com`

---

## Step 3 — Deploy Frontend to Vercel

1. Go to https://vercel.com and sign up (free)
2. Click **Add New → Project**
3. Import your GitHub repo
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

5. Under **Environment Variables**, add:

   | Key | Value |
   |-----|-------|
   | `VITE_API_URL` | `https://ai-code-mentor-backend.onrender.com/api` |

6. Click **Deploy**
7. Wait ~2 minutes
8. Copy your frontend URL: `https://ai-code-mentor.vercel.app`

---

## Step 4 — Connect Frontend URL to Backend

1. Go back to Render → your backend service
2. Under **Environment Variables**, update:
   - `FRONTEND_URL` = `https://ai-code-mentor.vercel.app`
3. Click **Save Changes** → Render will redeploy automatically

---

## Step 5 — Verify Everything Works

Test these URLs in order:

```
# 1. Backend health check
GET https://ai-code-mentor-backend.onrender.com/
→ should return: { "message": "🚀 AI Code Mentor API is running!" }

# 2. Frontend
https://ai-code-mentor.vercel.app
→ should show the Login page

# 3. Register an account and run an analysis
```

---

## Git Setup (if not done yet)

```bash
# From the root ai-code-mentor/ folder
git init
git add .
git commit -m "initial commit"

# Create a repo on github.com, then:
git remote add origin https://github.com/YOUR_USERNAME/ai-code-mentor.git
git branch -M main
git push -u origin main
```

---

## Important Notes

### Render Free Tier
- The free tier **spins down after 15 minutes of inactivity**
- First request after sleep takes ~30 seconds (cold start)
- To avoid this, upgrade to Render Starter ($7/mo) or use a cron job to ping the health endpoint

### Gemini API
- Get your free API key at: https://aistudio.google.com/app/apikey
- Free tier: 15 requests/minute, 1 million tokens/day (plenty for dev)

### MongoDB Atlas
- Free M0 cluster: 512MB storage (enough for thousands of analyses)
- Never commit your `.env` file to GitHub

---

## Environment Variables Summary

### Backend (.env)
```
PORT=5000
MONGO_URI=mongodb+srv://...
JWT_SECRET=your_long_random_secret
GEMINI_API_KEY=your_gemini_key
FRONTEND_URL=https://your-app.vercel.app
NODE_ENV=production
```

### Frontend (.env or Vercel dashboard)
```
VITE_API_URL=https://your-backend.onrender.com/api
```
