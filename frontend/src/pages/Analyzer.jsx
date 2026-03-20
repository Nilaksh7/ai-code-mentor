import { useRef } from 'react';
import Editor from '@monaco-editor/react';
import Layout from '../components/Layout';
import LanguageSelector from '../components/LanguageSelector';
import ResultPanel from '../components/ResultPanel';
import useAnalysisStore from '../store/analysisStore';

const EDITOR_OPTIONS = {
  fontSize: 13,
  fontFamily: '"Fira Code", monospace',
  minimap: { enabled: false },
  scrollBeyondLastLine: false,
  lineNumbers: 'on',
  padding: { top: 12, bottom: 12 },
  tabSize: 2,
  wordWrap: 'on',
};

const Analyzer = () => {
  const fileInputRef = useRef(null);
  const { code, language, result, loading, error, setCode, setLanguage, analyze, clearResult } = useAnalysisStore();

  const handleAnalyze = async () => {
    if (!code.trim()) return;
    await analyze(code, language);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const ext = file.name.split('.').pop().toLowerCase();
    const extMap = { js:'javascript', jsx:'javascript', ts:'typescript', tsx:'typescript', py:'python', java:'java', cpp:'cpp', c:'c', go:'go', rs:'rust', php:'php', rb:'ruby', swift:'swift', kt:'kotlin', sql:'sql', html:'html', css:'css' };
    if (extMap[ext]) setLanguage(extMap[ext]);
    const reader = new FileReader();
    reader.onload = (ev) => { setCode(ev.target.result); clearResult(); };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <Layout>
      <div className="animate-fade-in">

        {/* Page header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-800">Code Analyzer</h1>
          <p className="text-slate-500 text-sm mt-1">Paste your code and get instant AI feedback</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

          {/* LEFT: Editor */}
          <div className="flex flex-col gap-4">

            {/* Toolbar */}
            <div className="flex items-center justify-between gap-3">
              <LanguageSelector value={language} onChange={val => { setLanguage(val); clearResult(); }} />
              <div className="flex items-center gap-2">
                <input ref={fileInputRef} type="file"
                  accept=".js,.jsx,.ts,.tsx,.py,.java,.cpp,.c,.go,.rs,.php,.rb,.swift,.kt,.sql,.html,.css,.txt"
                  onChange={handleFileUpload} className="hidden" />
                <button onClick={() => fileInputRef.current.click()}
                  className="text-sm text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 px-3 py-2 rounded-lg transition-all">
                  ↑ Upload File
                </button>
                <button onClick={() => { setCode(''); clearResult(); }}
                  className="text-sm text-slate-500 hover:text-red-500 border border-slate-200 hover:border-red-200 px-3 py-2 rounded-lg transition-all">
                  Clear
                </button>
              </div>
            </div>

            {/* Editor box */}
            <div className="card overflow-hidden shadow-sm" style={{ height: '460px' }}>
              <div className="flex items-center justify-between bg-slate-800 px-4 py-2.5">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <span className="text-slate-400 text-xs font-mono">
                  {language === 'javascript' ? 'script.js' : language === 'python' ? 'main.py' : language === 'typescript' ? 'index.ts' : `file.${language}`}
                </span>
                <span className="text-slate-500 text-xs">{code.split('\n').length} lines</span>
              </div>
              <Editor
                height="calc(100% - 40px)"
                language={language}
                value={code}
                onChange={val => setCode(val || '')}
                theme="vs-dark"
                options={EDITOR_OPTIONS}
              />
            </div>

            {/* Analyze button */}
            <button onClick={handleAnalyze} disabled={loading || !code.trim()} className="btn-primary flex items-center justify-center gap-2 py-3">
              {loading
                ? <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Analyzing...</>
                : '🤖 Analyze with AI'
              }
            </button>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3">
                {error}
              </div>
            )}
          </div>

          {/* RIGHT: Results */}
          <div className="overflow-y-auto" style={{ maxHeight: '600px' }}>
            {!result && !loading && (
              <div className="h-full flex flex-col items-center justify-center text-center py-20 border-2 border-dashed border-slate-200 rounded-xl">
                <div className="text-5xl mb-4">🤖</div>
                <p className="text-slate-500 text-sm font-medium">Paste code and click Analyze</p>
                <p className="text-slate-400 text-sm mt-1">Results will appear here</p>
              </div>
            )}
            {loading && (
              <div className="h-full flex flex-col items-center justify-center py-20 border-2 border-dashed border-blue-200 rounded-xl bg-blue-50">
                <div className="w-10 h-10 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mb-4" />
                <p className="text-blue-600 text-sm font-medium">AI is analyzing your code...</p>
                <p className="text-blue-400 text-xs mt-1">This takes about 5-10 seconds</p>
              </div>
            )}
            {result && <ResultPanel result={result} />}
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default Analyzer;
