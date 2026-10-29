import posts from "@/content/blog-posts.json";

export type BlogSection = {
  heading?: string;
  paragraphs: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  subtitle: string;
  sections: BlogSection[];
  externalLink?: {
    label: string;
    url: string;
  };
};

export const BLOG_POSTS = posts as BlogPost[];

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}
export function getReadingMinutes(post: BlogPost): number {
  const words = post.sections
    .flatMap((section) => [section.heading ?? "", ...section.paragraphs])
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

export function getAdjacentPosts(slug: string): { newer?: BlogPost; older?: BlogPost } {
  const index = BLOG_POSTS.findIndex((post) => post.slug === slug);
  if (index === -1) return {};
  return { newer: BLOG_POSTS[index - 1], older: BLOG_POSTS[index + 1] };
}
