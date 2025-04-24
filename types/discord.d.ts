interface DiscordEmbed {
  title?: string;
  description?: string;
  url?: string;
  color?: number; // สีของ embed (เป็นเลขฐาน 10)
  timestamp?: string;
  footer?: {
    text: string;
    icon_url?: string;
  };
  thumbnail?: {
    url: string;
  };
  author?: {
    name: string;
    url?: string;
    icon_url?: string;
  };
  fields?: Array<{
    name: string;
    value: string;
    inline?: boolean;
  }>;
}
