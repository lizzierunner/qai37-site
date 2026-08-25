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
      <section className="news-intro">
        <div className="wrap">
          <h1 className="reveal">News</h1>
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
