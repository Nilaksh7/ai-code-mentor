# 🚀 AI Code Mentor

An AI-powered full-stack web application that analyzes code, detects bugs, suggests optimizations, and generates interview questions using Google Gemini API.

---

## 🌐 Live Demo

👉 https://ai-code-mentor-tau.vercel.app

---

## 📸 Screenshots

### 🔐 Authentication (Register / Login)

![Register](./frontend/public/screenshots/register.png)

---

### 🧑‍💻 Code Analyzer (Input + Output)

![Analyzer 1](./frontend/public/screenshots/analyzer1.png)
![Analyzer 2](./frontend/public/screenshots/analyzer2.png)
![Analyzer 3](./frontend/public/screenshots/analyzer3.png)

---

### 📊 Dashboard

![Dashboard](./frontend/public/screenshots/dashboard.png)

---

### 📜 Analysis History

![History](./frontend/public/screenshots/history.png)

---

### 👤 Profile

![Profile](./frontend/public/screenshots/profile.png)

---

## ✨ Features

- 🔐 JWT Authentication (Register / Login)
- 🖥️ Monaco Editor (VS Code-like experience in browser)
- 🤖 AI Code Analysis using Gemini:
  - Code explanation
  - Bug detection
  - Optimization suggestions
  - Time complexity analysis
  - Interview question generation
- 📂 Analysis history tracking
- 📁 File upload support (15+ languages)

---

## ⚙️ Tech Stack

| Layer    | Technology                 |
| -------- | -------------------------- |
| Frontend | React + Vite + TailwindCSS |
| Editor   | Monaco Editor              |
| State    | Zustand                    |
| HTTP     | Axios                      |
| Backend  | Node.js + Express          |
| Database | MongoDB Atlas              |
| Auth     | JWT + bcrypt               |
| AI       | Google Gemini API          |

---

## 🛠️ Local Development

```bash
# Clone the repo
git clone https://github.com/Nilaksh7/ai-code-mentor.git
cd ai-code-mentor

# Backend setup
cd backend
cp .env.example .env
npm install
npm run dev

# Frontend setup (new terminal)
cd frontend
npm install
npm run dev
```

---

## 🚀 Deployment

- Frontend → Vercel
- Backend → Render
- Database → MongoDB Atlas

---

## 🧠 What I Learned

- Full-stack development with MERN
- API integration with Gemini AI
- Authentication using JWT
- Deployment (Vercel + Render + MongoDB Atlas)
- Handling CORS issues in production

---

## 📌 Future Improvements

- 🌙 Dark mode
- 📊 Advanced analytics dashboard
- 🔐 Google OAuth login
- ⚡ Performance optimization

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!
