"use client";

import { useEffect, useState } from "react";

import ErrorMessage from "@/components/dashboard/atoms/ErrorMessage";
import LoadingSpinner from "@/components/dashboard/atoms/LoadingSpinner";
import ConnectionStatus from "@/components/dashboard/organisms/ConnectionStatus";
import DashboardHeader from "@/components/dashboard/organisms/DashboardHeader";
import DeploymentHistory from "@/components/dashboard/organisms/DeploymentHistory";
import FeaturesOverview from "@/components/dashboard/organisms/FeaturesOverview";
import LatestScores from "@/components/dashboard/organisms/LatestScores";
import { Deployment } from "@/types/dashboard";

export default function DashboardOverview() {
  const [deployments, setDeployments] = useState<Deployment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
    <div className="min-h-screen p-8">
      <DashboardHeader />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <ConnectionStatus />
        <FeaturesOverview />
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : (
        <div className="grid gap-6 mb-8">
          <DeploymentHistory
            deployments={deployments}
            formatDate={formatDate}
          />

          {deployments.length > 0 && deployments[0].scores && (
            <LatestScores deployment={deployments[0]} />
          )}
        </div>
      )}
    </div>
  );
}
