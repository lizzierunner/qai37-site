"use client";

import { useEffect, useState } from "react";

const CHAPTERS = [
  { id: "why-ai-stalls", label: "Route" },
  { id: "context-model", label: "Context" },
  { id: "home-thesis", label: "Thesis" },
];

export default function HomeChapterRail() {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const viewportCenter = window.innerHeight / 2;
      const sections = CHAPTERS.map(({ id }) => {
        const bounds = document.getElementById(id)?.getBoundingClientRect();
        return bounds ? { id, top: bounds.top, bottom: bounds.bottom } : null;
      }).filter((section): section is { id: string; top: number; bottom: number } => section !== null);
      const first = sections[0];
      const last = sections[sections.length - 1];

      if (!first || !last || viewportCenter < first.top || viewportCenter > last.bottom) {
        setActiveId(null);
        return;
      }

      const current = sections.reduce(
        (nearest, section) => {
          const distance = viewportCenter < section.top
            ? section.top - viewportCenter
            : viewportCenter > section.bottom
              ? viewportCenter - section.bottom
              : 0;
          return distance < nearest.distance ? { id: section.id, distance } : nearest;
        },
        { id: "", distance: Infinity },
      );
      setActiveId(current.id || null);
    };
    const scheduleUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);

  const activeIndex = CHAPTERS.findIndex(({ id }) => id === activeId);

  return (
    <nav
      className={`home-chapter-rail${activeId ? " is-visible" : ""}`}
      aria-label="Homepage chapters"
      aria-hidden={!activeId}
    >
      <span className="home-chapter-track" aria-hidden="true">
        <span style={{ height: `${Math.max(0, activeIndex) / (CHAPTERS.length - 1) * 100}%` }} />
      </span>
      {CHAPTERS.map(({ id, label }, index) => (
        <a
          className={`home-chapter-link${activeId === id ? " active" : ""}`}
          href={`#${id}`}
          key={id}
          aria-current={activeId === id ? "location" : undefined}
          tabIndex={activeId ? 0 : -1}
        >
          <span className="home-chapter-label">{label}</span>
          <span className="home-chapter-number">0{index + 1}</span>
          <span className="home-chapter-dot" aria-hidden="true" />
        </a>
      ))}
    </nav>
  );
}
