import mongoose from "mongoose";

const analysisSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
      default: "javascript",
    },

    // AI-generated fields

    explanation: {
      type: String,
      default: "",
    },
    bugs: {
      type: [String],
      default: [],
    },
    optimization: {
      type: [String],
      default: [],
    },
    complexity: {
      type: String,
      default: "",
    },
    interviewQuestions: {
      type: [String],
      default: [],
    },
    // Quality score (0-100) computed from AI output
    qualityScore: {
      type: Number,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Analysis", analysisSchema);
