import { useTheme } from "@/contexts/ThemeContext";

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
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const getScoreColor = (score?: number) => {
    if (!score) return "from-gray-400 to-gray-500";
    if (score >= 80) return "from-green-500 to-emerald-500";
    if (score >= 60) return "from-yellow-500 to-orange-500";

    return "from-red-500 to-rose-500";
  };

  const getScoreTextColor = (score?: number) => {
    if (!score) return isDark ? "text-gray-400" : "text-gray-600";
    if (score >= 80) return isDark ? "text-green-400" : "text-green-600";
    if (score >= 60) return isDark ? "text-yellow-400" : "text-yellow-600";

    return isDark ? "text-red-400" : "text-red-600";
  };

  const getScoreBackground = (score?: number) => {
    if (!score) return isDark ? "bg-gray-800/50" : "bg-gray-50";
    if (score >= 80) return isDark ? "bg-green-900/20" : "bg-green-50";
    if (score >= 60) return isDark ? "bg-yellow-900/20" : "bg-yellow-50";

    return isDark ? "bg-red-900/20" : "bg-red-50";
  };

  return (
    <div
      className={`relative overflow-hidden rounded-lg ${getScoreBackground(score)} p-4 transition-all duration-300 hover:shadow-md hover:scale-[1.02]`}
    >
      {/* Gradient Background */}
      <div
        className={`absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br ${getScoreColor(score)} opacity-10 rounded-full transform translate-x-12 sm:translate-x-16 -translate-y-12 sm:-translate-y-16`}
      />

      <div className="relative">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            {icon && <span className="text-base sm:text-lg">{icon}</span>}
            <div
              className={`text-sm font-medium ${
                isDark ? "text-gray-200" : "text-gray-700"
              }`}
            >
              {title}
            </div>
          </div>
        </div>
        <div
          className={`text-2xl sm:text-3xl font-bold ${getScoreTextColor(score)}`}
        >
          {score ?? "N/A"}
        </div>
        {score && (
          <div
            className={`mt-2 h-1.5 w-full rounded-full overflow-hidden ${
              isDark ? "bg-gray-700" : "bg-gray-200"
            }`}
          >
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
