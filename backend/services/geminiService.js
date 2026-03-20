import { GoogleGenerativeAI } from "@google/generative-ai";

export const analyzeCode = async (code, language) => {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is missing from environment variables");
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `You are a senior software engineer and code reviewer.

Analyze the following ${language} code and return ONLY a valid JSON object (no markdown, no backticks, no explanation outside the JSON).

The JSON must have exactly these fields:
{
  "explanation": "A clear explanation of what this code does",
  "bugs": ["bug 1", "bug 2"],
  "optimization": ["suggestion 1", "suggestion 2"],
  "complexity": "Time complexity analysis (e.g. O(n log n)) with explanation",
  "interviewQuestions": ["question 1", "question 2", "question 3"],
  "qualityScore": 75
}

Rules:
- bugs: array of strings describing each bug found (empty array if none)
- optimization: array of improvement suggestions (empty array if none)
- qualityScore: integer from 0 to 100 based on code quality, readability, and bugs
- Return ONLY the JSON object, nothing else

Code to analyze (${language}):
\`\`\`${language}
${code}
\`\`\``;

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  const cleaned = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  try {
    return JSON.parse(cleaned);
  } catch (err) {
    console.error("Gemini JSON parse failed:", cleaned);
    throw new Error("AI returned invalid response. Please try again.");
  }
};
