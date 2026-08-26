"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { NEWS } from "@/lib/news-data";

type SearchItem = {
  id: string;
  category: "Navigation" | "Team Member" | "News";
  title: string;
  subtitle: string;
  url: string;
  isExternal?: boolean;
};

const ITEMS: SearchItem[] = [
  // Navigation
  { id: "nav-home", category: "Navigation", title: "Home", subtitle: "A new software layer for AI infrastructure", url: "/" },
  { id: "nav-team", category: "Navigation", title: "Team", subtitle: "Leadership, engineers, and scientific advisors", url: "/team" },
  { id: "nav-news", category: "Navigation", title: "News", subtitle: "Company announcements & neutral-atom industry updates", url: "/news" },
  { id: "nav-contact", category: "Navigation", title: "Contact", subtitle: "Get in touch with the qAI37 founding team", url: "/contact" },

  // Team
  { id: "team-ted", category: "Team Member", title: "Ted Stockwell", subtitle: "Founder & CEO · Bing as a Platform", url: "/team" },
  { id: "team-michelle", category: "Team Member", title: "Michelle Holtmann", subtitle: "President & CSO · 25 years Microsoft Infrastructure", url: "/team" },
  { id: "team-steve", category: "Team Member", title: "Steve Jahnke", subtitle: "CTO · 30 years Intel, Altera, TI", url: "/team" },
  { id: "team-vicki", category: "Team Member", title: "Vicki Mitchell", subtitle: "Chief Engineering Officer · Google, ARM, Altera", url: "/team" },
  { id: "team-vincent", category: "Team Member", title: "Vincent Elfving", subtitle: "Chief Quantum Advisor · Former Head of Algorithms Pasqal", url: "/team" },
  { id: "team-laverne", category: "Team Member", title: "Laverne Masaki", subtitle: "Chief People Officer · Microsoft, Google Recruiting", url: "/team" },
  { id: "team-rick", category: "Team Member", title: "Rick Jahnke", subtitle: "Principal Engineer · 30+ years embedded systems", url: "/team" },
  { id: "team-ruben", category: "Team Member", title: "Ruben Marroquin", subtitle: "Senior Engineer · FPGA & Embedded Systems", url: "/team" },

  // Dynamic news
  ...NEWS.map((n, i) => ({
    id: `news-${i}`,
    category: "News" as const,
    title: n.title,
    subtitle: `${n.date} · ${n.type.toUpperCase()} NEWS`,
    url: n.url,
    isExternal: true,
  })),
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const filtered = query.trim() === ""
    ? ITEMS.slice(0, 8)
    : ITEMS.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.subtitle.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase())
      );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleSelect = (item: SearchItem) => {
    setOpen(false);
    setQuery("");
    if (item.isExternal) {
      window.open(item.url, "_blank", "noopener,noreferrer");
    } else {
      router.push(item.url);
    }
  };

  const handleKeyDownInMenu = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((i) => (i + 1) % Math.max(1, filtered.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((i) => (i - 1 + filtered.length) % Math.max(1, filtered.length));
    } else if (e.key === "Enter" && filtered[selectedIndex]) {
      e.preventDefault();
      handleSelect(filtered[selectedIndex]);
    }
  };

  if (!open) return null;

  return (
    <div className="cmd-backdrop" onClick={() => setOpen(false)}>
      <div className="cmd-dialog" onClick={(e) => e.stopPropagation()} onKeyDown={handleKeyDownInMenu}>
        <div className="cmd-search-wrap">
          <svg className="cmd-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            className="cmd-input"
            placeholder="Search pages, team bios, industry news... (ESC to close)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          <span className="cmd-kbd">ESC</span>
        </div>

        <div className="cmd-results">
          {filtered.length === 0 ? (
            <div className="cmd-empty">No results found for &quot;{query}&quot;</div>
          ) : (
            filtered.map((item, i) => (
              <button
                key={item.id}
                className={`cmd-item ${i === selectedIndex ? "selected" : ""}`}
                onClick={() => handleSelect(item)}
                onMouseEnter={() => setSelectedIndex(i)}
              >
                <div className="cmd-item-main">
                  <span className="cmd-item-title">{item.title}</span>
                  <span className="cmd-item-sub">{item.subtitle}</span>
                </div>
                <span className="cmd-item-cat">{item.category}</span>
              </button>
            ))
          )}
        </div>

        <div className="cmd-footer">
          <span><kbd className="cmd-mini-kbd">↑↓</kbd> navigate</span>
          <span><kbd className="cmd-mini-kbd">↵</kbd> select</span>
          <span><kbd className="cmd-mini-kbd">esc</kbd> close</span>
        </div>
      </div>
    </div>
  );
}
