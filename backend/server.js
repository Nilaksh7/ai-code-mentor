import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db.js";
import authRoutes from "./routes/auth.js";
import analysisRoutes from "./routes/analysis.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  "http://localhost:5173",
  "https://ai-code-mentor-tau.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like Postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("CORS not allowed"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

// 🔥 THIS LINE IS CRITICAL (fixes your exact error)
app.options("*", cors());

app.use(express.json({ limit: "10mb" }));

app.get("/", (req, res) => {
  res.json({ message: "AI Code Mentor API is running!", status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api/analysis", analysisRoutes);

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message || "Internal server error" });
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
