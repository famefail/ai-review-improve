import { useTheme } from "@/contexts/ThemeContext";
import { Deployment } from "@/types/dashboard";

import ScoreSection from "../molecules/ScoreSection";

interface LatestScoresProps {
  deployment: Deployment;
}

export default function LatestScores({ deployment }: LatestScoresProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  if (!deployment.scores) return null;

  return (
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-300" />
      <div
        className={`relative ${
          isDark ? "bg-gray-800/90" : "bg-white/90"
        } backdrop-blur-lg rounded-xl shadow-lg overflow-hidden`}
      >
        <div
          className={`px-4 sm:px-6 py-4 border-b ${
            isDark
              ? "border-gray-700 bg-gradient-to-r from-green-900/50 to-emerald-900/50"
              : "border-gray-100 bg-gradient-to-r from-green-50 to-emerald-50"
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <h2
              className={`text-lg sm:text-xl font-semibold ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              รายละเอียดคะแนนล่าสุด
            </h2>
            <div className="flex items-center">
              <span
                className={`px-3 py-1 text-sm font-medium rounded-full ${
                  isDark
                    ? "text-green-300 bg-green-900/50"
                    : "text-green-700 bg-green-100"
                }`}
              >
                Latest Assessment
              </span>
            </div>
          </div>
        </div>
        <div className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h3
                className={`font-semibold text-lg sm:text-xl ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                {deployment.projectName}
              </h3>
              <p
                className={`text-sm mt-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}
              >
                Branch:{" "}
                <span
                  className={`font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}
                >
                  {deployment.branch}
                </span>
              </p>
            </div>
            <div className="text-left sm:text-right">
              <div
                className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}
              >
                Overall Score
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-green-600">
                {deployment.scores.overall}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <ScoreSection
              icon="✨"
              score={deployment.scores.bestPractices}
              title="Best Practices"
            />
            <ScoreSection
              icon="📚"
              score={deployment.scores.documentation}
              title="Documentation"
            />
            <ScoreSection
              icon="⚡"
              score={deployment.scores.performance}
              title="Performance"
            />
            <ScoreSection icon="🔍" score={deployment.scores.seo} title="SEO" />
          </div>

          {deployment.feedback && (
            <div className="mt-6">
              <h4
                className={`font-medium mb-3 flex items-center ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                <svg
                  className="w-5 h-5 mr-2 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
                ข้อเสนอแนะ
              </h4>
              <div
                className={`rounded-lg p-4 ${
                  isDark
                    ? "bg-blue-900/30 border border-blue-800/50 text-blue-300"
                    : "bg-blue-50 border border-blue-100 text-blue-800"
                }`}
              >
                {deployment.feedback}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
