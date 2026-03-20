// routes/analysis.js — All routes are protected (require login)
import express from "express";
import {
  analyze,
  getHistory,
  getAnalysis,
  getStats,
} from "../controllers/analysisController.js";
import protect from "../middleware/auth.js";

const router = express.Router();

// All analysis routes require a valid JWT token
router.use(protect);

router.post("/analyze", analyze);
router.get("/history", getHistory);
router.get("/stats", getStats);
router.get("/:id", getAnalysis);

export default router;
