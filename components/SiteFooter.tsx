import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer>
      <div className="wrap foot">
        <span className="logo" style={{ fontSize: 18 }}>qAI<b>37</b></span>
        <span className="mono">© {new Date().getFullYear()} qAI37 — All rights reserved</span>
        <span>
          <Link href="/">Home</Link> · <Link href="/mission">Mission</Link> · <Link href="/team">Team</Link>
        </span>
      </div>
    </footer>
  );
}
