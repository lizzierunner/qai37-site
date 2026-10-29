import type { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/lib/blog-data";

export const dynamic = "force-static";

const SITE = "https://www.qai37.com";
const PAGES = ["", "/mission/", "/team/", "/news/", "/wiki/", "/blog/", "/contact/"];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...PAGES.map((path) => ({ url: `${SITE}${path}` })),
    ...BLOG_POSTS.map(({ slug }) => ({ url: `${SITE}/blog/${slug}/` })),
  ];
}
