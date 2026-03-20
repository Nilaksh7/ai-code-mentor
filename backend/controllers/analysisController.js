import Analysis from "../models/Analysis.js";
import { analyzeCode } from "../services/geminiService.js";

// POST /api/analysis/analyze
export const analyze = async (req, res) => {
  try {
    const { code, language } = req.body;

    if (!code || code.trim().length === 0) {
      return res.status(400).json({ message: "Code is required" });
    }
    if (code.length > 50000) {
      return res
        .status(400)
        .json({ message: "Code is too large. Max 50,000 characters." });
    }

    const aiResult = await analyzeCode(code, language || "javascript");

    const analysis = await Analysis.create({
      userId: req.user._id,
      code,
      language: language || "javascript",
      explanation: aiResult.explanation,
      bugs: aiResult.bugs || [],
      optimization: aiResult.optimization || [],
      complexity: aiResult.complexity,
      interviewQuestions: aiResult.interviewQuestions || [],
      qualityScore: aiResult.qualityScore || null,
    });

    res.status(201).json({ message: "Analysis complete", analysis });
  } catch (error) {
    console.error("Analysis error:", error.message);
    res.status(500).json({ message: error.message || "Analysis failed" });
  }
};

// GET /api/analysis/history
export const getHistory = async (req, res) => {
  try {
    const analyses = await Analysis.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .select("-code")
      .limit(50);
    res.json({ analyses });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch history" });
  }
};

// GET /api/analysis/:id
export const getAnalysis = async (req, res) => {
  try {
    const analysis = await Analysis.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });
    if (!analysis)
      return res.status(404).json({ message: "Analysis not found" });
    res.json({ analysis });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch analysis" });
  }
};

// GET /api/analysis/stats
export const getStats = async (req, res) => {
  try {
    const total = await Analysis.countDocuments({ userId: req.user._id });

    // Recent analyses for dashboard list
    const recentAnalyses = await Analysis.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .limit(5)
      .select("language qualityScore createdAt bugs");

    // Average quality score
    const scored = await Analysis.find({
      userId: req.user._id,
      qualityScore: { $ne: null },
    }).select("qualityScore");

    const avgScore =
      scored.length > 0
        ? Math.round(
            scored.reduce((sum, a) => sum + a.qualityScore, 0) / scored.length,
          )
        : null;

    // Language breakdown
    const languageCounts = await Analysis.aggregate([
      { $match: { userId: req.user._id } },
      { $group: { _id: "$language", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    res.json({ total, avgScore, recentAnalyses, languageCounts });
  } catch (error) {
    console.error("Stats error:", error);
    res.status(500).json({ message: "Failed to fetch stats" });
  }
};
