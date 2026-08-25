import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer>
      <div className="wrap foot">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/qai37-site/images/qai37_logo_transparent.jpg" alt="qAI37" className="logo-img" style={{ height: 36 }} />
        <span className="mono">© {new Date().getFullYear()} qAI37 — All rights reserved</span>
        <span>
          <Link href="/">Home</Link> · <Link href="/mission">Mission</Link> · <Link href="/team">Team</Link>
        </span>
      </div>
    </footer>
  );
}
