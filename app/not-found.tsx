import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Page Not Found",
};

export default function NotFound() {
  return (
    <div className="p-notfound">
      <section className="intro">
        <div className="wrap">
          <span className="eyebrow reveal">Error 404</span>
          <h1 className="reveal s1">Out of bounds.</h1>
          <p className="lede reveal s2">
            The requested state or route does not exist in the qAI37 execution grid.
          </p>
          <div className="reveal s3" style={{ marginTop: 32 }}>
            <Link href="/" className="btn">
              Return to primary route →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
