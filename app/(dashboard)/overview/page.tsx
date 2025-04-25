"use client";

import { useEffect, useState } from "react";

import ErrorMessage from "@/components/dashboard/atoms/ErrorMessage";
import LoadingSpinner from "@/components/dashboard/atoms/LoadingSpinner";
import ConnectionStatus from "@/components/dashboard/organisms/ConnectionStatus";
import DashboardHeader from "@/components/dashboard/organisms/DashboardHeader";
import DeploymentHistory from "@/components/dashboard/organisms/DeploymentHistory";
import FeaturesOverview from "@/components/dashboard/organisms/FeaturesOverview";
import LatestScores from "@/components/dashboard/organisms/LatestScores";
import { useTheme } from "@/contexts/ThemeContext";
import { Deployment } from "@/types/dashboard";

export default function DashboardOverview() {
  const [deployments, setDeployments] = useState<Deployment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  useEffect(() => {
    const fetchDeployments = async () => {
      try {
        const response = await fetch("/api/deployments");

        if (!response.ok) {
          throw new Error("ไม่สามารถดึงข้อมูล deployments ได้");
        }
        const data = await response.json();

        setDeployments(data.deployments);
      } catch (err) {
        setError("เกิดข้อผิดพลาดในการดึงข้อมูล: " + (err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchDeployments();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen">
      {/* Modern Header Section */}
      <div className="relative overflow-hidden">
        <div
          className={`absolute inset-0 ${
            isDark
              ? "bg-gradient-to-r from-gray-800 to-gray-900"
              : "bg-gradient-to-r from-blue-600 to-indigo-600"
          }`}
        />
        <div
          className={`absolute inset-0 ${
            isDark ? "bg-grid-white/5" : "bg-grid-white/10"
          }`}
        />
        <div className="relative px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <DashboardHeader />
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Features Overview Section */}
        <div className="mb-6 sm:mb-8">
          <FeaturesOverview />
        </div>

        {/* Statistics Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Stat cards */}
          <div
            className={`${
              isDark
                ? "bg-gray-800/90 border-gray-700"
                : "bg-white/90 border-gray-100"
            } backdrop-blur-lg rounded-xl shadow-lg border p-4 sm:p-6 transform hover:scale-105 transition-transform duration-300`}
          >
            <div className="flex items-center">
              <div
                className={`p-2 sm:p-3 rounded-full ${
                  isDark
                    ? "bg-blue-900/50 text-blue-400"
                    : "bg-blue-100 text-blue-600"
                }`}
              >
                <svg
                  className="w-6 h-6 sm:w-8 sm:h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
              </div>
              <div className="ml-3 sm:ml-4">
                <p
                  className={`text-xs sm:text-sm font-medium ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Total Deployments
                </p>
                <p
                  className={`text-xl sm:text-2xl font-semibold ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  {deployments.length}
                </p>
              </div>
            </div>
          </div>

          <div
            className={`${
              isDark
                ? "bg-gray-800/90 border-gray-700"
                : "bg-white/90 border-gray-100"
            } backdrop-blur-lg rounded-xl shadow-lg border p-4 sm:p-6 transform hover:scale-105 transition-transform duration-300`}
          >
            <div className="flex items-center">
              <div
                className={`p-2 sm:p-3 rounded-full ${
                  isDark
                    ? "bg-green-900/50 text-green-400"
                    : "bg-green-100 text-green-600"
                }`}
              >
                <svg
                  className="w-6 h-6 sm:w-8 sm:h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
              </div>
              <div className="ml-3 sm:ml-4">
                <p
                  className={`text-xs sm:text-sm font-medium ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Success Rate
                </p>
                <p
                  className={`text-xl sm:text-2xl font-semibold ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  98%
                </p>
              </div>
            </div>
          </div>

          <div
            className={`${
              isDark
                ? "bg-gray-800/90 border-gray-700"
                : "bg-white/90 border-gray-100"
            } backdrop-blur-lg rounded-xl shadow-lg border p-4 sm:p-6 transform hover:scale-105 transition-transform duration-300`}
          >
            <div className="flex items-center">
              <div
                className={`p-2 sm:p-3 rounded-full ${
                  isDark
                    ? "bg-purple-900/50 text-purple-400"
                    : "bg-purple-100 text-purple-600"
                }`}
              >
                <svg
                  className="w-6 h-6 sm:w-8 sm:h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
              </div>
              <div className="ml-3 sm:ml-4">
                <p
                  className={`text-xs sm:text-sm font-medium ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Avg. Performance
                </p>
                <p
                  className={`text-xl sm:text-2xl font-semibold ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  92
                </p>
              </div>
            </div>
          </div>

          <div
            className={`${
              isDark
                ? "bg-gray-800/90 border-gray-700"
                : "bg-white/90 border-gray-100"
            } backdrop-blur-lg rounded-xl shadow-lg border p-4 sm:p-6 transform hover:scale-105 transition-transform duration-300`}
          >
            <div className="flex items-center">
              <div
                className={`p-2 sm:p-3 rounded-full ${
                  isDark
                    ? "bg-orange-900/50 text-orange-400"
                    : "bg-orange-100 text-orange-600"
                }`}
              >
                <svg
                  className="w-6 h-6 sm:w-8 sm:h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
              </div>
              <div className="ml-3 sm:ml-4">
                <p
                  className={`text-xs sm:text-sm font-medium ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Documentation
                </p>
                <p
                  className={`text-xl sm:text-2xl font-semibold ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  88
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
          <div className="lg:col-span-2">
            {/* Latest Scores Section */}
            {deployments.length > 0 && deployments[0].scores && (
              <div className="animate-slideUp mb-6 sm:mb-8">
                <LatestScores deployment={deployments[0]} />
              </div>
            )}

            {/* Deployment History Section */}
            {loading ? (
              <LoadingSpinner />
            ) : error ? (
              <ErrorMessage message={error} />
            ) : (
              <div className="animate-fadeIn">
                <DeploymentHistory
                  deployments={deployments}
                  formatDate={formatDate}
                />
              </div>
            )}
          </div>

          <div className="space-y-6 sm:space-y-8">
            <ConnectionStatus />

            {/* Additional Info Card */}
            <div
              className={`${
                isDark
                  ? "bg-gray-800/90 border-gray-700"
                  : "bg-white/90 border-gray-100"
              } backdrop-blur-lg rounded-xl shadow-lg border p-4 sm:p-6`}
            >
              <h3
                className={`text-lg font-semibold mb-4 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                Quick Stats
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className={isDark ? "text-gray-300" : "text-gray-600"}>
                    Active Projects
                  </span>
                  <span
                    className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}
                  >
                    12
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className={isDark ? "text-gray-300" : "text-gray-600"}>
                    Team Members
                  </span>
                  <span
                    className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}
                  >
                    8
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className={isDark ? "text-gray-300" : "text-gray-600"}>
                    Open Issues
                  </span>
                  <span
                    className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}
                  >
                    24
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
