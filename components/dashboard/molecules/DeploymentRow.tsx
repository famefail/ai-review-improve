import { useTheme } from "@/contexts/ThemeContext";
import { Deployment } from "@/types/dashboard";

import BranchBadge from "../atoms/BranchBadge";
import ScoreCircle from "../atoms/ScoreCircle";

interface DeploymentRowProps {
  deployment: Deployment;
  formatDate: (date: string) => string;
}

export default function DeploymentRow({
  deployment,
  formatDate,
}: DeploymentRowProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <tr
      key={deployment.id}
      className={`transition-colors ${
        isDark ? "hover:bg-gray-700/50" : "hover:bg-gray-50"
      }`}
    >
      <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
        <div
          className={`text-sm font-medium ${isDark ? "text-gray-100" : "text-gray-900"}`}
        >
          <a
            className={`hover:underline ${
              isDark ? "hover:text-blue-400" : "hover:text-blue-600"
            }`}
            href={deployment.repositoryUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            {deployment.projectName}
          </a>
        </div>
      </td>
      <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
        <BranchBadge branch={deployment.branch} />
      </td>
      <td
        className={`hidden sm:table-cell px-6 py-4 whitespace-nowrap text-sm ${
          isDark ? "text-gray-300" : "text-gray-700"
        }`}
      >
        {deployment.deployedBy}
      </td>
      <td
        className={`hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm ${
          isDark ? "text-gray-300" : "text-gray-700"
        }`}
      >
        <a
          className={`hover:underline truncate block max-w-xs ${
            isDark ? "hover:text-blue-400" : "hover:text-blue-600"
          }`}
          href={deployment.commitUrl}
          rel="noopener noreferrer"
          target="_blank"
        >
          {deployment.commitMessage}
        </a>
      </td>
      <td
        className={`px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm ${
          isDark ? "text-gray-400" : "text-gray-600"
        }`}
      >
        {formatDate(deployment.timestamp)}
      </td>
      <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
        <ScoreCircle score={deployment.scores?.overall} />
      </td>
    </tr>
  );
}
