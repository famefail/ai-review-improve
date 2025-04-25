import { useTheme } from "@/contexts/ThemeContext";
import { Deployment } from "@/types/dashboard";

import DeploymentRow from "../molecules/DeploymentRow";

interface DeploymentHistoryProps {
  deployments: Deployment[];
  formatDate: (date: string) => string;
}

export default function DeploymentHistory({
  deployments,
  formatDate,
}: DeploymentHistoryProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <div className="relative group">
      <div
        className={`absolute -inset-0.5 bg-gradient-to-r ${
          isDark ? "from-gray-700 to-gray-600" : "from-gray-200 to-gray-300"
        } rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-300`}
      />
      <div
        className={`relative ${
          isDark ? "bg-gray-800/90" : "bg-white/90"
        } backdrop-blur-lg rounded-xl shadow-lg overflow-hidden`}
      >
        <div
          className={`px-4 sm:px-6 py-4 border-b ${
            isDark
              ? "border-gray-700 bg-gradient-to-r from-gray-800 to-gray-700"
              : "border-gray-100 bg-gradient-to-r from-gray-50 to-gray-100"
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <h2
              className={`text-lg sm:text-xl font-semibold ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              ประวัติการ Deploy
            </h2>
            <div className="flex items-center space-x-2">
              <span
                className={`text-sm ${isDark ? "text-gray-300" : "text-gray-500"}`}
              >
                {deployments.length} deployments
              </span>
              <button
                className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                  isDark
                    ? "text-blue-400 bg-blue-950/50 hover:bg-blue-900/50"
                    : "text-blue-600 bg-blue-50 hover:bg-blue-100"
                }`}
              >
                View All
              </button>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table
            className={`min-w-full divide-y ${isDark ? "divide-gray-700" : "divide-gray-200"}`}
          >
            <thead className={isDark ? "bg-gray-800/50" : "bg-gray-50/50"}>
              <tr>
                <th
                  className={`px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-medium uppercase tracking-wider ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  โปรเจ็ค
                </th>
                <th
                  className={`px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-medium uppercase tracking-wider ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  BRANCH
                </th>
                <th
                  className={`hidden sm:table-cell px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  ผู้ DEPLOY
                </th>
                <th
                  className={`hidden md:table-cell px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  COMMIT
                </th>
                <th
                  className={`px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-medium uppercase tracking-wider ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  เวลา
                </th>
                <th
                  className={`px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-medium uppercase tracking-wider ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  คะแนนรวม
                </th>
              </tr>
            </thead>
            <tbody
              className={`divide-y ${
                isDark
                  ? "divide-gray-700 bg-gray-800/30"
                  : "divide-gray-100 bg-white"
              }`}
            >
              {deployments.map((deployment) => (
                <DeploymentRow
                  key={deployment.id}
                  deployment={deployment}
                  formatDate={formatDate}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
