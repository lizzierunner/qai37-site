"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
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
  const currentPath = pathname.replace(/\/$/, "") || "/";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 641px)");
    const closeOnDesktop = () => { if (desktop.matches) setMenuOpen(false); };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const dismiss = (event: PointerEvent) => {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target)) setMenuOpen(false);
    };
    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  }, [menuOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header ref={headerRef} className={scrolled || menuOpen ? "scrolled" : ""} onKeyDown={(event) => {
      if (menuOpen && event.key === "Escape") {
        event.preventDefault();
        event.stopPropagation();
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    }}>
      <div className="wrap nav">
        <Link className="logo" href="/" aria-label="qAI37 home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`${BASE_PATH}/images/qai37_logo.png`} alt="qAI37" className="logo-img" />
        </Link>
        <nav className="nav-links" aria-label="Primary">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className={currentPath === l.href ? "active" : ""} aria-current={currentPath === l.href ? "page" : undefined}>
              {l.label}
            </Link>
          ))}
          <button
            type="button"
            className="cmd-trigger-btn"
            onClick={() => {
              setMenuOpen(false);
              window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }));
            }}
            title="Open Search (Cmd + K)"
            aria-label="Open search command palette"
          >
            <span className="cmd-trigger-text">Search</span>
            <kbd className="cmd-trigger-kbd">⌘K</kbd>
          </button>
          <button ref={menuButtonRef} type="button" className="mobile-menu-toggle" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen((previous) => !previous)}>
            {menuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </nav>
      </div>
      <nav id="mobile-navigation" className="mobile-navigation" aria-label="Mobile" hidden={!menuOpen} onBlur={(event) => {
        if (event.relatedTarget instanceof Node && !headerRef.current?.contains(event.relatedTarget)) setMenuOpen(false);
      }}>
        <div className="wrap">
          {LINKS.map((link) => (
            <Link key={link.href} href={link.href} aria-current={currentPath === link.href ? "page" : undefined} onClick={() => setMenuOpen(false)}>{link.label}</Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
