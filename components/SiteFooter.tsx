import Link from "next/link";
import ContactButton from "@/components/ContactButton";
import { BASE_PATH } from "@/lib/basePath";

export default function SiteFooter() {
  return (
    <footer>
      <div className="wrap foot-grid">
        <div className="foot-brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`${BASE_PATH}/images/qai37_logo.png`} alt="qAI37" className="logo-img" style={{ height: 46 }} />
          <p className="foot-tagline">The neutral route to post-silicon AI</p>
          <p className="foot-meta">Founded 2025 · Stealth</p>
        </div>
        <nav className="foot-links" aria-label="Footer">
          <Link href="/">Home</Link>
          <Link href="/wiki">Wiki</Link>
          <Link href="/team">Team</Link>
          <Link href="/careers">Careers</Link>
          <Link href="/news">News</Link>
          <Link href="/contact">Contact</Link>
        </nav>
        <div className="foot-contact">
          <ContactButton className="foot-email" />
        </div>
      </div>
      <div className="wrap foot-copy">
        <span className="mono">© {new Date().getFullYear()} qAI37 Inc. — All rights reserved</span>
      </div>
    </footer>
  );
}
