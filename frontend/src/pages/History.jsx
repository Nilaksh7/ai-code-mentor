import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import useAnalysisStore from '../store/analysisStore';

const scoreColor = s => !s ? 'text-slate-400' : s >= 80 ? 'text-green-600' : s >= 60 ? 'text-yellow-600' : 'text-red-500';

const History = () => {
  const { history, historyLoading, fetchHistory } = useAnalysisStore();
  const navigate = useNavigate();

  useEffect(() => { fetchHistory(); }, []);

  return (
    <Layout>
      <div className="animate-fade-in">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-800">Analysis History</h1>
          <p className="text-slate-500 text-sm mt-1">Click any entry to view the full analysis</p>
        </div>

        {historyLoading && (
          <div className="text-center py-16 text-slate-400 text-sm">Loading...</div>
        )}

        {!historyLoading && history.length === 0 && (
          <div className="card text-center py-16 shadow-sm">
            <p className="text-4xl mb-4">📂</p>
            <p className="text-slate-500 text-sm font-medium">No analyses yet</p>
            <button onClick={() => navigate('/analyzer')}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg transition-all">
              Analyze your first code →
            </button>
          </div>
        )}

        {!historyLoading && history.length > 0 && (
          <div className="card shadow-sm divide-y divide-slate-100">
            {history.map((item, i) => (
              <div
                key={item._id}
                onClick={() => navigate(`/history/${item._id}`)}
                className="flex items-center justify-between px-5 py-4 hover:bg-slate-50 cursor-pointer transition-all group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-slate-400 text-xs w-5 text-right">{i + 1}</span>
                  <span className="bg-blue-100 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-full">
                    {item.language}
                  </span>
                  {item.bugs?.length > 0
                    ? <span className="bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full">
                        {item.bugs.length} bug{item.bugs.length > 1 ? 's' : ''}
                      </span>
                    : <span className="bg-green-100 text-green-600 text-xs px-2 py-0.5 rounded-full">Clean</span>
                  }
                  <span className="text-slate-400 text-xs hidden sm:block">
                    {new Date(item.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    {' · '}
                    {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  {item.qualityScore != null && (
                    <div className="text-right">
                      <p className={`font-bold text-lg ${scoreColor(item.qualityScore)}`}>{item.qualityScore}</p>
                      <p className="text-slate-400 text-xs">score</p>
                    </div>
                  )}
                  <span className="text-slate-300 group-hover:text-blue-500 transition-colors text-lg">›</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default History;
