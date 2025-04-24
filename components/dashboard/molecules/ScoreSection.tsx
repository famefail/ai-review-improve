interface ScoreSectionProps {
  title: string;
  score?: number;
  icon?: string;
}

export default function ScoreSection({
  title,
  score,
  icon,
}: ScoreSectionProps) {
  const getScoreColor = (score?: number) => {
    if (!score) return "from-gray-400 to-gray-500";
    if (score >= 80) return "from-green-500 to-emerald-500";
    if (score >= 60) return "from-yellow-500 to-orange-500";

    return "from-red-500 to-rose-500";
  };

  const getScoreTextColor = (score?: number) => {
    if (!score) return "text-gray-600";
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";

    return "text-red-600";
  };

  const getScoreBackground = (score?: number) => {
    if (!score) return "bg-gray-50";
    if (score >= 80) return "bg-green-50";
    if (score >= 60) return "bg-yellow-50";

    return "bg-red-50";
  };

  return (
    <div
      className={`relative overflow-hidden rounded-lg ${getScoreBackground(score)} p-4 transition-all duration-300 hover:shadow-md hover:scale-[1.02]`}
    >
      <div
        className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${getScoreColor(score)} opacity-10 rounded-full transform translate-x-16 -translate-y-16`}
      />

      <div className="relative">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            {icon && <span className="text-lg">{icon}</span>}
            <div className="text-sm font-medium text-gray-700">{title}</div>
          </div>
        </div>
        <div className={`text-3xl font-bold ${getScoreTextColor(score)}`}>
          {score ?? "N/A"}
        </div>
        {score && (
          <div className="mt-2 h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full bg-gradient-to-r ${getScoreColor(score)} transition-all duration-500`}
              style={{ width: `${score}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
