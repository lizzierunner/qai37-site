"use client";

import { useState } from "react";
import Link from "next/link";
import { NEWS } from "@/lib/news-data";

export default function NewsFeed() {
  const [filter, setFilter] = useState<"all" | "company" | "industry">("all");
  const visible = filter === "all" ? NEWS : NEWS.filter((post) => post.type === filter);

  return (
    <>
      <div className="news-controls reveal" role="group" aria-label="Filter news">
        {(["all", "company", "industry"] as const).map((value) => (
          <button type="button" key={value} className={`news-filter ${filter === value ? "active" : ""}`} onClick={() => setFilter(value)} aria-pressed={filter === value}>
            {value === "all" ? "All signals" : value === "company" ? "Company" : "Industry"}
          </button>
        ))}
        <span className="news-count" aria-live="polite">{visible.length} {visible.length === 1 ? "signal" : "signals"}</span>
      </div>
      {visible.map((post, i) => {
        const isExternal = /^https?:\/\//.test(post.url);
        const content = (
          <>
            <span className="news-kicker">
              {post.type === "company" ? "Company News" : "Industry News"}
            </span>
            <p className="news-title">{post.title}</p>
            <p className="news-desc">{post.description}</p>
            <div className="news-foot">
              <span className="news-date">{post.date.toUpperCase()} · {post.type === "industry" ? "EXTERNAL SOURCE" : "QAI37"}</span>
              <span className="news-arrow" aria-hidden="true">→</span>
            </div>
          </>
        );
        return isExternal ? (
          <a key={i} href={post.url} target="_blank" rel="noopener noreferrer" className="news-item reveal">
            {content}
          </a>
        ) : (
          <Link key={i} href={post.url} className="news-item reveal">
            {content}
          </Link>
        );
      })}
    </>
  );
}

