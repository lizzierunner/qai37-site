import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BLOG_POSTS } from "@/lib/blog-data";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Ideas from qAI37 on AI infrastructure, quantum computing, and the neutral route to post-silicon AI.",
};

export default function BlogPage() {
  return (
    <div className="p-blog">
      <section className="blog-intro">
        <div className="wrap">
          <span className="eyebrow reveal">Ideas from qAI37</span>
          <h1 className="reveal s1">Blog</h1>
          <p className="lede reveal s2">
            Notes on the changing foundations of AI, and what might come next.
          </p>
        </div>
      </section>
      <section className="blog-list" aria-label="Blog posts">
        <div className="wrap">
          {BLOG_POSTS.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="blog-item reveal">
              <span className="blog-kicker">qAI37 · Substack</span>
              <h2>{post.title}</h2>
              <p>{post.subtitle}</p>
              <span className="blog-read">Read article <ArrowUpRight size={18} aria-hidden="true" /></span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}