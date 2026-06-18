import "./globals.css";
import type { Metadata } from "next";
import { display, body, mono } from "@/lib/fonts";
import Lattice from "@/components/Lattice";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Reveals from "@/components/Reveals";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.qai37.com"),
  title: {
    default: "qAI37 — Quantum-native AI infrastructure",
    template: "%s — qAI37",
  },
  description:
    "AI's hunger for power is growing 13× faster than the grid can feed it. qAI37 uses a hybrid quantum architecture to run AI at scale on a fraction of the power.",
  openGraph: {
    title: "qAI37 — Quantum-native AI infrastructure",
    description:
      "AI's hunger for power is growing 13× faster than the grid can feed it. qAI37 breaks that curve.",
    type: "website",
    url: "https://www.qai37.com",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        <a className="skip" href="#main">Skip to content</a>
        <Lattice />
        <div className="field" aria-hidden="true" />
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <Reveals />
      </body>
    </html>
  );
}
