import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import useAuthStore from '../store/authStore';
import useAnalysisStore from '../store/analysisStore';

const Row = ({ label, value }) => (
  <div className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
    <span className="text-slate-500 text-sm">{label}</span>
    <span className="text-slate-800 text-sm font-medium">{value}</span>
  </div>
);

const Profile = () => {
  const { user, logout } = useAuthStore();
  const { stats, history, fetchStats, fetchHistory } = useAnalysisStore();
  const navigate = useNavigate();

  useEffect(() => { fetchStats(); fetchHistory(); }, []);

  const topLang = stats?.languageCounts?.[0]?._id ?? '—';
  const bugsFound = history.filter(a => a.bugs?.length > 0).length;
  const bugRate = history.length > 0 ? Math.round((bugsFound / history.length) * 100) : null;

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <Layout>
      <div className="animate-fade-in max-w-xl space-y-5">

        <div>
          <h1 className="text-2xl font-bold text-slate-800">Profile</h1>
          <p className="text-slate-500 text-sm mt-1">Your account details and usage stats</p>
        </div>

        {/* Avatar card */}
        <div className="card p-5 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold shrink-0">
            {user?.name?.[0]?.toUpperCase()}
          </div>
          <div>
            <p className="font-semibold text-slate-800 text-lg">{user?.name}</p>
            <p className="text-slate-500 text-sm">{user?.email}</p>
          </div>
        </div>

        {/* Account info */}
        <div className="card p-5 shadow-sm">
          <p className="font-semibold text-slate-700 mb-3">Account Info</p>
          <Row label="Name" value={user?.name} />
          <Row label="Email" value={user?.email} />
          <Row label="Member since" value={user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long' }) : '—'} />
        </div>

        {/* Stats */}
        <div className="card p-5 shadow-sm">
          <p className="font-semibold text-slate-700 mb-3">Usage Statistics</p>
          <Row label="Total analyses" value={stats?.total ?? '—'} />
          <Row label="Average quality score" value={stats?.avgScore != null ? `${stats.avgScore} / 100` : '—'} />
          <Row label="Most used language" value={topLang} />
          <Row label="Analyses with bugs" value={bugRate != null ? `${bugRate}%` : '—'} />
          <Row label="Languages tried" value={stats?.languageCounts?.length ?? '—'} />
        </div>

        {/* Language bars */}
        {stats?.languageCounts?.length > 0 && (
          <div className="card p-5 shadow-sm">
            <p className="font-semibold text-slate-700 mb-4">Languages Breakdown</p>
            <div className="space-y-3">
              {stats.languageCounts.map(({ _id, count }, i) => {
                const pct = Math.round((count / (stats.total || 1)) * 100);
                const colors = ['bg-blue-500','bg-yellow-400','bg-green-500','bg-purple-500','bg-pink-500'];
                return (
                  <div key={_id}>
                    <div className="flex justify-between mb-1">
                      <span className="text-slate-700 text-sm">{_id}</span>
                      <span className="text-slate-400 text-sm">{count} × ({pct}%)</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${colors[i % 5]} transition-all duration-700`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Logout */}
        <div className="card p-5 shadow-sm border-red-100">
          <p className="font-semibold text-slate-700 mb-3">Account Actions</p>
          <button onClick={handleLogout}
            className="text-sm text-red-500 border border-red-200 hover:bg-red-50 px-4 py-2 rounded-lg transition-all">
            Sign out
          </button>
        </div>

      </div>
    </Layout>
  );
};

export default Profile;
