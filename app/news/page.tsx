import type { Metadata } from "next";
import NewsFeed from "@/components/NewsFeed";

export const metadata: Metadata = {
  title: "News",
  description:
    "The most-discussed stories in AI, quantum computing, and compute infrastructure — sourced live from Hacker News.",
};

export default function NewsPage() {
  return (
    <div className="p-news">
      <section className="intro">
        <div className="wrap">
          <span className="eyebrow reveal">From the field</span>
          <h1 className="reveal s1">What&apos;s moving AI right now.</h1>
          <p className="lede reveal s2">
            The most-discussed stories in AI, quantum computing, and compute
            infrastructure — sourced live from Hacker News.
          </p>
        </div>
      </section>

      <section className="news-list">
        <div className="wrap">
          <NewsFeed />
        </div>
      </section>
    </div>
  );
}
