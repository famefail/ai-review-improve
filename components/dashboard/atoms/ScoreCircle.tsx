interface ScoreCircleProps {
  score?: number;
}

export default function ScoreCircle({ score }: ScoreCircleProps) {
  const getScoreColor = (score?: number) => {
    if (!score) return "bg-gray-200";
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-yellow-500";

    return "bg-red-500";
  };

  return score ? (
    <div className="flex items-center">
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${getScoreColor(score)}`}
      >
        {score}
      </div>
    </div>
  ) : (
    <span className="text-gray-400">ไม่มีข้อมูล</span>
  );
}
