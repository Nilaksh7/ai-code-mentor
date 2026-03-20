// pages/AnalysisDetail.jsx
// Shows the full details of a single past analysis when clicked from History

import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import Layout from '../components/Layout';
import ResultPanel from '../components/ResultPanel';
import { analysisAPI } from '../services/api';

const EDITOR_OPTIONS = {
  fontSize: 13,
  fontFamily: '"Fira Code", monospace',
  minimap: { enabled: false },
  scrollBeyondLastLine: false,
  lineNumbers: 'on',
  padding: { top: 12, bottom: 12 },
  readOnly: true, // view-only — this is a past submission
  wordWrap: 'on',
};

const AnalysisDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await analysisAPI.getAnalysis(id);
        setAnalysis(res.data.analysis);
      } catch (err) {
        setError('Could not load this analysis.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) return (
    <Layout>
      <div className="flex items-center justify-center py-24 text-slate-400 text-sm">
        Loading analysis...
      </div>
    </Layout>
  );

  if (error) return (
    <Layout>
      <div className="text-center py-24">
        <p className="text-red-500 text-sm">{error}</p>
        <button onClick={() => navigate('/history')}
          className="mt-4 text-blue-600 text-sm hover:underline">
          ← Back to History
        </button>
      </div>
    </Layout>
  );

  return (
    <Layout>
      <div className="animate-fade-in">

        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => navigate('/history')}
            className="text-slate-500 hover:text-slate-800 border border-slate-200 hover:border-slate-300 px-3 py-1.5 rounded-lg text-sm transition-all">
            ← Back
          </button>
          <div>
            <h1 className="text-xl font-bold text-slate-800">Analysis Detail</h1>
            <p className="text-slate-400 text-xs mt-0.5">
              {analysis.language} · {new Date(analysis.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              {' at '}
              {new Date(analysis.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
        </div>

        {/* Two column layout — same as Analyzer page */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

          {/* LEFT: Code viewer */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1 rounded-full">
                {analysis.language}
              </span>
              <span className="text-slate-400 text-xs">
                {analysis.code?.split('\n').length} lines · read only
              </span>
            </div>

            <div className="card overflow-hidden shadow-sm" style={{ height: '460px' }}>
              <div className="flex items-center justify-between bg-slate-800 px-4 py-2.5">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <span className="text-slate-400 text-xs font-mono">
                  {analysis.language === 'javascript' ? 'script.js'
                    : analysis.language === 'python' ? 'main.py'
                    : analysis.language === 'typescript' ? 'index.ts'
                    : `file.${analysis.language}`}
                </span>
                <span className="text-slate-500 text-xs">
                  {analysis.code?.split('\n').length} lines
                </span>
              </div>
              <Editor
                height="calc(100% - 40px)"
                language={analysis.language}
                value={analysis.code}
                theme="vs-dark"
                options={EDITOR_OPTIONS}
              />
            </div>

            {/* Re-analyze button */}
            <button
              onClick={() => navigate('/analyzer')}
              className="w-full border border-blue-200 text-blue-600 hover:bg-blue-50 text-sm font-medium py-2.5 rounded-lg transition-all">
              Open in Analyzer →
            </button>
          </div>

          {/* RIGHT: AI result */}
          <div className="overflow-y-auto" style={{ maxHeight: '600px' }}>
            <ResultPanel result={analysis} />
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default AnalysisDetail;
