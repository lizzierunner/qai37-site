"use client";
import { useEffect, useState } from "react";

type HNStory = {
  objectID: string;
  title: string;
  url: string;
  created_at: string;
};

function formatDate(date: string) {
  return new Date(date)
    .toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
    .toUpperCase();
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
      {stories.map((s) => (
        <a
          key={s.objectID}
          href={s.url || `https://news.ycombinator.com/item?id=${s.objectID}`}
          target="_blank"
          rel="noopener noreferrer"
          className="news-item reveal"
        >
          <p className="news-title">{s.title}</p>
          <div className="news-foot">
            <span className="news-date">{formatDate(s.created_at)}</span>
            <span className="news-arrow" aria-hidden="true">→</span>
          </div>
        </a>
      ))}
    </>
  );
}
