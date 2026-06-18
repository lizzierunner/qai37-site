"use client";

import { useEffect, useRef } from "react";

type Props = {
  title?: string;
  subtitle?: string;
  counter?: boolean;
  caption?: string;
};

export default function DivergenceChart({
  title = "Compute energy demand vs. supply",
  subtitle = "SRC · Decadal Plan for Semiconductors",
  counter = false,
  caption = "the gap between what AI needs and what the grid can give — and widening.",
}: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const runCounter = () => {
      const el = counterRef.current;
      if (!el) return;
      if (reduce) { el.textContent = "13×"; return; }
      let raf = 0;
      let start: number | null = null;
      const dur = 1600, target = 13;
      const step = (now: number) => {
        if (start === null) start = now;
        const p = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(eased * target) + "×";
        if (p < 1) raf = requestAnimationFrame(step);
        else el.textContent = "13×";
      };
      raf = requestAnimationFrame(step);
    };

    if (reduce) { root.classList.add("in"); if (counter) runCounter(); return; }

    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => {
        if (en.isIntersecting) {
          root.classList.add("in");
          if (counter) setTimeout(runCounter, 1400);
          io.disconnect();
        }
      }),
      { threshold: 0.3 }
    );
    io.observe(root);
    return () => io.disconnect();
  }, [counter]);

  return (
    <div ref={rootRef} className="chart-card chart-anim">
      <div className="chart-head">
        <span className="chart-title">{title}</span>
        <span className="chart-src">{subtitle}</span>
      </div>
      <svg className="chart" viewBox="0 0 600 380" role="img" aria-label="Two curves diverging: AI compute energy demand rising 26 percent per year, energy supply rising 2 percent per year, opening a widening gap.">
        <g stroke="rgba(255,255,255,.06)" strokeWidth="1">
          <line x1="40" y1="60" x2="580" y2="60" /><line x1="40" y1="140" x2="580" y2="140" />
          <line x1="40" y1="220" x2="580" y2="220" /><line x1="40" y1="300" x2="580" y2="300" />
        </g>
        <line x1="40" y1="40" x2="40" y2="320" stroke="rgba(255,255,255,.2)" strokeWidth="1" />
        <line x1="40" y1="320" x2="580" y2="320" stroke="rgba(255,255,255,.2)" strokeWidth="1" />
        <text className="axis-label" x="40" y="350">2024</text>
        <text className="axis-label" x="540" y="350">2034 →</text>
        <text className="axis-label" x="14" y="56" transform="rotate(-90 14 56)">Power</text>
        <path id="gapfill" d="M40,300 C260,296 420,250 580,60 L580,288 C420,300 260,303 40,304 Z" fill="url(#gapgrad)" />
        <defs><linearGradient id="gapgrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(248,169,60,.30)" /><stop offset="100%" stopColor="rgba(248,169,60,.02)" />
        </linearGradient></defs>
        <path className="curve supply" d="M40,304 C200,300 400,294 580,288" />
        <path className="curve demand" d="M40,300 C260,296 420,250 580,60" />
        <g className="reveal-late">
          <text className="tag amber" x="470" y="48">+26% / yr · demand</text>
          <text className="tag cyan" x="455" y="305">+2% / yr · supply</text>
          <text className="gap-tag" x="430" y="180">THE GAP</text>
          <circle cx="580" cy="60" r="4" fill="#F8A93C" />
          <circle cx="580" cy="288" r="4" fill="#5FE3C0" />
        </g>
      </svg>
      {counter && (
        <div className="chart-readout">
          <span className="big" ref={counterRef}>0×</span>
          <span className="cap">{caption}</span>
        </div>
      )}
    </div>
  );
}
