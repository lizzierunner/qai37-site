import type { Metadata } from "next";
import NewsFeed from "@/components/NewsFeed";
import { ArrowUpRight } from "lucide-react";
import readings from "@/content/reading-room.json";

export const metadata: Metadata = {
  title: "News",
  description:
    "Company announcements and notable developments in neutral-atom quantum computing and AI inference.",
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
      <section className="reading-room" id="reading-room" aria-labelledby="reading-room-title">
        <div className="wrap">
          <h2 id="reading-room-title">Reading room</h2>
          <p className="reading-disclosure">Independent research. Inclusion does not imply affiliation or validate qAI37&apos;s technology.</p>
          <div className="reading-list">
            {readings.map((reading) => (
              <article className="reading-entry" key={reading.id}>
                <span className="news-kicker">{reading.topic}</span>
                <h3 className="reading-title">
                  <a href={reading.url} target="_blank" rel="noopener noreferrer" aria-label={`${reading.title} (opens in a new tab)`}>
                    <span>{reading.title}</span>
                    <ArrowUpRight size={20} aria-hidden="true" />
                  </a>
                </h3>
                <p className="reading-credit">{reading.authors} · {reading.date} · arXiv</p>
                <p className="reading-note">{reading.note}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
