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
  return (
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-300" />
      <div className="relative bg-white/90 backdrop-blur-lg rounded-xl shadow-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              ประวัติการ Deploy
            </h2>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">
                {deployments.length} deployments
              </span>
              <button className="px-3 py-1 text-sm text-blue-600 hover:text-blue-700 font-medium bg-blue-50 hover:bg-blue-100 rounded-md transition-colors">
                View All
              </button>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  โปรเจ็ค
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  BRANCH
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ผู้ DEPLOY
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  COMMIT
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  เวลา
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  คะแนนรวม
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
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
