# AI Code Mentor

A full-stack AI-powered code analysis tool built with the MERN stack and Google Gemini API.

## Features

- 🔐 JWT Authentication (register / login)
- 🖥️ Monaco Editor (VS Code in the browser)
- 🤖 AI Code Analysis via Gemini:
  - Code explanation
  - Bug detection
  - Optimization suggestions
  - Time complexity analysis
  - Interview question generation
- 📊 Dashboard with Chart.js analytics
- 📂 Analysis history
- 👤 Profile with usage stats
- 📁 File upload support (15+ languages)

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React + Vite + TailwindCSS |
| Editor | Monaco Editor |
| State | Zustand |
| HTTP | Axios |
| Charts | Chart.js |
| Backend | Node.js + Express |
| Database | MongoDB + Mongoose |
| Auth | JWT + bcrypt |
| AI | Google Gemini 1.5 Flash |

## Local Development

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/ai-code-mentor.git
cd ai-code-mentor

# 2. Backend setup
cd backend
cp .env.example .env    # Fill in your keys
npm install
npm run dev             # → http://localhost:5000

# 3. Frontend setup (new terminal)
cd frontend
npm install
npm run dev             # → http://localhost:5173
```

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for the full deployment guide.

- Frontend → Vercel
- Backend → Render
- Database → MongoDB Atlas
