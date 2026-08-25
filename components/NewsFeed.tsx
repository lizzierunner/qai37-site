"use client";
import { useEffect, useState } from "react";

type HNStory = {
  objectID: string;
  title: string;
  url: string;
  author: string;
  created_at: string;
  points: number;
};

function hostname(url: string) {
  try { return new URL(url).hostname.replace(/^www\./, ""); }
  catch { return "news.ycombinator.com"; }
}

function timeAgo(date: string) {
  const secs = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  if (secs < 3600) return `${Math.floor(secs / 60)}m ago`;
  if (secs < 86400) return `${Math.floor(secs / 3600)}h ago`;
  return `${Math.floor(secs / 86400)}d ago`;
}

export default function NewsFeed() {
  const [stories, setStories] = useState<HNStory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(
      "https://hn.algolia.com/api/v1/search?query=AI+quantum+LLM+compute+machine+learning&tags=story&hitsPerPage=16"
    )
      .then(r => r.json())
      .then(data => {
        setStories((data.hits ?? []).filter((s: HNStory) => s.url));
        setLoading(false);
      })
      .catch(() => { setError(true); setLoading(false); });
  }, []);

  if (loading) return <p className="news-status">Loading stories…</p>;
  if (error || stories.length === 0) return <p className="news-status">Could not load stories. Try refreshing.</p>;

  return (
    <>
      {stories.map((s, i) => (
        <a
          key={s.objectID}
          href={s.url || `https://news.ycombinator.com/item?id=${s.objectID}`}
          target="_blank"
          rel="noopener noreferrer"
          className="news-item reveal"
        >
          <span className="news-n">{String(i + 1).padStart(2, "0")}</span>
          <div className="news-body">
            <p className="news-title">{s.title}</p>
            <div className="news-meta">
              <span className="news-src">{hostname(s.url)}</span>
              <span>{timeAgo(s.created_at)}</span>
              <span>{s.points} pts</span>
            </div>
          </div>
          <span className="news-arrow" aria-hidden="true">→</span>
        </a>
      ))}
    </>
  );
}
