const QualityBadge = ({ score }) => {
  if (score == null) return null;
  const color = score >= 80
    ? 'bg-green-50 text-green-700 border-green-200'
    : score >= 60
    ? 'bg-yellow-50 text-yellow-700 border-yellow-200'
    : 'bg-red-50 text-red-600 border-red-200';
  const label = score >= 80 ? 'Good' : score >= 60 ? 'Fair' : 'Needs Work';

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border ${color}`}>
      <span className="font-bold text-lg">{score}</span>
      <div>
        <p className="text-xs font-semibold">{label}</p>
        <p className="text-xs opacity-70">quality score</p>
      </div>
    </div>
  );
};

export default QualityBadge;
