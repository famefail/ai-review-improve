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
  return (
    <tr key={deployment.id} className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">
          <a
            className="hover:text-blue-500"
            href={deployment.repositoryUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            {deployment.projectName}
          </a>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <BranchBadge branch={deployment.branch} />
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
        {deployment.deployedBy}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
        <a
          className="hover:text-blue-600 truncate block max-w-xs"
          href={deployment.commitUrl}
          rel="noopener noreferrer"
          target="_blank"
        >
          {deployment.commitMessage}
        </a>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
        {formatDate(deployment.timestamp)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <ScoreCircle score={deployment.scores?.overall} />
      </td>
    </tr>
  );
}
