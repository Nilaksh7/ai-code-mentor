import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import useAuthStore from "../store/authStore";
import useAnalysisStore from "../store/analysisStore";

const StatCard = ({ label, value, icon, color = "text-blue-600" }) => (
  <div className="card p-5 shadow-sm">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-slate-500 text-sm">{label}</p>
        <p className={`text-3xl font-bold mt-1 ${color}`}>{value ?? "—"}</p>
      </div>
      <span className="text-2xl">{icon}</span>
    </div>
  </div>
);

const scoreColor = (s) =>
  !s
    ? "text-slate-400"
    : s >= 80
      ? "text-green-600"
      : s >= 60
        ? "text-yellow-600"
        : "text-red-500";

const Dashboard = () => {
  const user = useAuthStore((s) => s.user);
  const { stats, fetchStats, history, fetchHistory, historyLoading } =
    useAnalysisStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchStats();
    fetchHistory();
  }, []);

  return (
    <Layout>
      <div className="animate-fade-in space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
            <p className="text-slate-500 text-sm mt-0.5">
              Welcome back, {user?.name} 👋
            </p>
          </div>
          <button
            onClick={() => navigate("/analyzer")}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-all"
          >
            + New Analysis
          </button>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard
            label="Total Analyses"
            value={stats?.total}
            icon="📊"
            color="text-blue-600"
          />
          <StatCard
            label="Avg Quality Score"
            value={stats?.avgScore}
            icon="⭐"
            color={scoreColor(stats?.avgScore)}
          />
          <StatCard
            label="Languages Used"
            value={stats?.languageCounts?.length}
            icon="💻"
            color="text-purple-600"
          />
        </div>

        {/* Recent analyses */}
        <div className="card shadow-sm">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <p className="font-semibold text-slate-700">Recent Analyses</p>
            <button
              onClick={() => navigate("/history")}
              className="text-blue-600 text-sm hover:underline"
            >
              View all →
            </button>
          </div>
          {historyLoading ? (
            <div className="px-5 py-8 text-slate-400 text-sm">Loading...</div>
          ) : history.length === 0 ? (
            <div className="px-5 py-10 text-center">
              <p className="text-slate-400 text-sm">No analyses yet</p>
              <button
                onClick={() => navigate("/analyzer")}
                className="mt-3 text-blue-600 text-sm hover:underline"
              >
                Start analyzing →
              </button>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {history.slice(0, 6).map((item) => (
                <div
                  key={item._id}
                  onClick={() => navigate("/history")}
                  className="flex items-center justify-between px-5 py-3 hover:bg-slate-50 cursor-pointer transition-all"
                >
                  <div className="flex items-center gap-3">
                    <span className="bg-blue-100 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-full">
                      {item.language}
                    </span>
                    {item.bugs?.length > 0 && (
                      <span className="bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full">
                        {item.bugs.length} bug{item.bugs.length > 1 ? "s" : ""}
                      </span>
                    )}
                    <span className="text-slate-400 text-xs">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  {item.qualityScore != null && (
                    <span
                      className={`font-bold ${scoreColor(item.qualityScore)}`}
                    >
                      {item.qualityScore}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
