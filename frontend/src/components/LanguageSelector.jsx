const LANGUAGES = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'python',     label: 'Python' },
  { value: 'java',       label: 'Java' },
  { value: 'cpp',        label: 'C++' },
  { value: 'c',          label: 'C' },
  { value: 'go',         label: 'Go' },
  { value: 'rust',       label: 'Rust' },
  { value: 'php',        label: 'PHP' },
  { value: 'ruby',       label: 'Ruby' },
  { value: 'swift',      label: 'Swift' },
  { value: 'kotlin',     label: 'Kotlin' },
  { value: 'sql',        label: 'SQL' },
  { value: 'html',       label: 'HTML' },
  { value: 'css',        label: 'CSS' },
];

const LanguageSelector = ({ value, onChange }) => (
  <select value={value} onChange={e => onChange(e.target.value)}
    className="bg-white border border-slate-200 text-slate-700 text-sm px-3 py-2 rounded-lg outline-none cursor-pointer hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all">
    {LANGUAGES.map(l => (
      <option key={l.value} value={l.value}>{l.label}</option>
    ))}
  </select>
);

export default LanguageSelector;
export { LANGUAGES };
