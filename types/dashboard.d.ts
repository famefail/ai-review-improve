export interface Deployment {
  id: string;
  projectName: string;
  branch: string;
  deployedBy: string;
  commitMessage: string;
  commitUrl: string;
  timestamp: string;
  repositoryUrl: string;
  scores?: {
    bestPractices?: number;
    documentation?: number;
    performance?: number;
    seo?: number;
    overall?: number;
  };
  feedback?: string;
}
