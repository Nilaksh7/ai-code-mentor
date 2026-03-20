import { create } from "zustand";
import { analysisAPI } from "../services/api";

const useAnalysisStore = create((set) => ({
  // Current editor state
  code: "// Paste your code here or upload a file\n\nfunction example(arr) {\n  return arr.map(x => x * 2);\n}",
  language: "javascript",

  // Analysis result
  result: null,
  loading: false,
  error: null,

  // History
  history: [],
  historyLoading: false,

  // Stats
  stats: null,

  // Actions
  setCode: (code) => set({ code }),
  setLanguage: (language) => set({ language }),

  analyze: async (code, language) => {
    set({ loading: true, error: null, result: null });
    try {
      const res = await analysisAPI.analyze(code, language);
      set({ result: res.data.analysis, loading: false });
      return { success: true };
    } catch (err) {
      const message =
        err.response?.data?.message || "Analysis failed. Please try again.";
      set({ error: message, loading: false });
      return { success: false, message };
    }
  },

  fetchHistory: async () => {
    set({ historyLoading: true });
    try {
      const res = await analysisAPI.getHistory();
      set({ history: res.data.analyses, historyLoading: false });
    } catch {
      set({ historyLoading: false });
    }
  },

  fetchStats: async () => {
    try {
      const res = await analysisAPI.getStats();
      set({ stats: res.data });
    } catch {
      // silently fail — stats are non-critical
    }
  },

  clearResult: () => set({ result: null, error: null }),
}));

export default useAnalysisStore;
