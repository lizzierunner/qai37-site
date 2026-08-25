import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer>
      <div className="wrap foot-grid">
        <div className="foot-brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/qai37-site/images/qai37_logo_transparent.jpg" alt="qAI37" className="logo-img" style={{ height: 40 }} />
          <p className="foot-tagline">The neutral route to post-silicon AI</p>
          <p className="foot-meta">Founded 2025 · Stealth</p>
        </div>
        <nav className="foot-links" aria-label="Footer">
          <Link href="/">Home</Link>
          <Link href="/team">Team</Link>
          <Link href="/news">News</Link>
          <Link href="/contact">Contact</Link>
        </nav>
        <div className="foot-contact">
          <a href="mailto:teds@qai37.com" className="foot-email">teds@qai37.com</a>
          <a href="mailto:michelle@qai37.com" className="foot-email">michelle@qai37.com</a>
        </div>
      </div>
      <div className="wrap foot-copy">
        <span className="mono">© {new Date().getFullYear()} qAI37 Inc. — All rights reserved</span>
      </div>
    </footer>
  );
}
