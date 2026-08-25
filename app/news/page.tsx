import type { Metadata } from "next";
import Link from "next/link";
import { NEWS, type NewsPost } from "@/lib/news-data";

export const metadata: Metadata = {
  title: "News",
  description:
    "Company announcements and notable developments in neutral-atom quantum computing and AI inference.",
};

function NewsItem({ post }: { post: NewsPost }) {
  return (
    <a
      href={post.url}
      target={post.type === "industry" ? "_blank" : undefined}
      rel={post.type === "industry" ? "noopener noreferrer" : undefined}
      className="news-item reveal"
    >
      <p className="news-title">{post.title}</p>
      <p className="news-desc">{post.description}</p>
      <div className="news-foot">
        <span className="news-date">{post.date.toUpperCase()}</span>
        <span className="news-arrow" aria-hidden="true">→</span>
      </div>
    </a>
  );
}

export default function NewsPage() {
  const company = NEWS.filter((p) => p.type === "company");
  const industry = NEWS.filter((p) => p.type === "industry");

  return (
    <div className="p-news">
      <section className="news-intro">
        <div className="wrap">
          <h1 className="reveal">News</h1>
        </div>
      </section>

      <section className="news-list">
        <div className="wrap">
          <div className="news-section-head reveal">
            <span className="news-section-label">Company News</span>
          </div>
          {company.length === 0 ? (
            <p className="news-empty reveal s1">Company announcements will appear here.</p>
          ) : (
            company.map((post, i) => <NewsItem key={i} post={post} />)
          )}

          <div className="news-section-head reveal">
            <span className="news-section-label">Industry News</span>
          </div>
          {industry.map((post, i) => <NewsItem key={i} post={post} />)}
        </div>
      </section>
    </div>
  );
}
