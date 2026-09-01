"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BASE_PATH } from "@/lib/basePath";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/wiki", label: "Wiki" },
  { href: "/team", label: "Team" },
  { href: "/news", label: "News" },
  { href: "/contact", label: "Contact" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={scrolled ? "scrolled" : ""}>
      <div className="wrap nav">
        <Link className="logo" href="/" aria-label="qAI37 home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`${BASE_PATH}/images/qai37_logo.png`} alt="qAI37" className="logo-img" />
        </Link>
        <nav className="nav-links" aria-label="Primary">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className={pathname === l.href ? "active" : ""} aria-current={pathname === l.href ? "page" : undefined}>
              {l.label}
            </Link>
          ))}
          <button
            type="button"
            className="cmd-trigger-btn"
            onClick={() => {
              window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }));
            }}
            title="Open Search (Cmd + K)"
            aria-label="Open search command palette"
          >
            <span className="cmd-trigger-text">Search</span>
            <kbd className="cmd-trigger-kbd">⌘K</kbd>
          </button>
          <Link className="btn" href="/#join">Get updates</Link>
        </nav>
      </div>
    </header>
  );
}
