import ReactMarkdown from 'react-markdown';
import QualityBadge from './QualityBadge';

const Section = ({ icon, title, color, children }) => {
  const colors = {
    blue:   'border-blue-200 bg-blue-50 text-blue-700',
    red:    'border-red-200 bg-red-50 text-red-700',
    yellow: 'border-yellow-200 bg-yellow-50 text-yellow-700',
    purple: 'border-purple-200 bg-purple-50 text-purple-700',
    green:  'border-green-200 bg-green-50 text-green-700',
  };

  return (
    <div className="card overflow-hidden">
      <div className={`flex items-center gap-2 px-4 py-3 border-b ${colors[color]}`}>
        <span>{icon}</span>
        <h3 className="text-sm font-semibold">{title}</h3>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
};

const ItemList = ({ items, emptyMsg, dotColor = 'bg-blue-500' }) => {
  if (!items?.length) return <p className="text-slate-400 text-sm italic">{emptyMsg}</p>;
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3 items-start">
          <span className={`w-1.5 h-1.5 rounded-full ${dotColor} mt-2 shrink-0`} />
          <span className="text-slate-700 text-sm leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  );
};

const ResultPanel = ({ result }) => {
  if (!result) return null;
  const { explanation, bugs, optimization, complexity, interviewQuestions, qualityScore } = result;

  return (
    <div className="space-y-4 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-800">Analysis Result</h2>
        <QualityBadge score={qualityScore} />
      </div>

      <Section icon="📖" title="What this code does" color="blue">
        <div className="text-slate-700 text-sm leading-relaxed prose prose-sm max-w-none">
          <ReactMarkdown>{explanation || 'No explanation provided.'}</ReactMarkdown>
        </div>
      </Section>

      <Section icon="🐛" title={`Bugs Found (${bugs?.length || 0})`} color="red">
        <ItemList items={bugs} emptyMsg="✓ No bugs detected" dotColor="bg-red-500" />
      </Section>

      <Section icon="⚡" title="Optimization Tips" color="yellow">
        <ItemList items={optimization} emptyMsg="No suggestions" dotColor="bg-yellow-500" />
      </Section>

      <Section icon="⏱️" title="Time Complexity" color="purple">
        <p className="text-slate-700 text-sm leading-relaxed">{complexity || 'Not analyzed'}</p>
      </Section>

      <Section icon="🎯" title="Interview Questions" color="green">
        <ItemList items={interviewQuestions} emptyMsg="No questions generated" dotColor="bg-green-500" />
      </Section>
    </div>
  );
};

export default ResultPanel;
