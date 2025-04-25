import { useTheme } from "@/contexts/ThemeContext";

interface ScoreCircleProps {
  score?: number;
}

export default function ScoreCircle({ score }: ScoreCircleProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const getScoreColor = (score?: number) => {
    if (!score) return isDark ? "bg-gray-700" : "bg-gray-200";
    if (score >= 80) return isDark ? "bg-green-500" : "bg-green-500";
    if (score >= 60) return isDark ? "bg-yellow-500" : "bg-yellow-500";

    return isDark ? "bg-red-500" : "bg-red-500";
  };

  const getTextColor = (score?: number) => {
    if (!score) return isDark ? "text-gray-300" : "text-gray-500";

    return "text-white";
  };

  return score ? (
    <div className="flex items-center justify-center">
      <div
        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold text-sm sm:text-base transition-transform hover:scale-110 ${getScoreColor(score)} ${getTextColor(score)}`}
      >
        {score}
      </div>
    </div>
  ) : (
    <span className={`text-sm ${isDark ? "text-gray-400" : "text-gray-400"}`}>
      ไม่มีข้อมูล
    </span>
  );
}
