interface GitHubPayload {
  repository: {
    name: string;
    full_name: string;
    html_url: string;
  };
  ref?: string;
  ref_name?: string;
  pusher?: {
    name: string;
    email: string;
  };
  sender: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
  commits?: Array<{
    id: string;
    message: string;
    url: string;
    timestamp: string;
  }>;
  head_commit?: {
    id: string;
    message: string;
    url: string;
    timestamp: string;
  };
}
