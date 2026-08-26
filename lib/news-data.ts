import posts from "../content/news-posts.json";

export type NewsPost = {
  type: "company" | "industry";
  title: string;
  date: string;
  description: string;
  url: string;
};

// Reverse chronological order — newest first
export const NEWS: NewsPost[] = posts as NewsPost[];
