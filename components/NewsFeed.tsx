import { NEWS } from "@/lib/news-data";

export default function NewsFeed() {
  return (
    <>
      {NEWS.map((post, i) => (
        <a
          key={i}
          href={post.url}
          target="_blank"
          rel="noopener noreferrer"
          className="news-item reveal"
        >
          <span className="news-kicker">
            {post.type === "company" ? "Company News" : "Industry News"}
          </span>
          <p className="news-title">{post.title}</p>
          <p className="news-desc">{post.description}</p>
          <div className="news-foot">
            <span className="news-date">{post.date.toUpperCase()}</span>
            <span className="news-arrow" aria-hidden="true">→</span>
          </div>
        </a>
      ))}
    </>
  );
}
