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
};

export const BLOG_POSTS = posts as BlogPost[];

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}