import "./globals.css";
import type { Metadata } from "next";
import { display, body, mono } from "@/lib/fonts";
import Lattice from "@/components/Lattice";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Reveals from "@/components/Reveals";
import CommandPalette from "@/components/CommandPalette";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.qai37.com"),
  title: {
    default: "qAI37 — Quantum-native AI infrastructure",
    template: "%s — qAI37",
  },
  description:
    "qAI37 is building the vendor-agnostic software access point between conventional AI and neutral-atom systems — the neutral route to post-silicon AI.",
  openGraph: {
    title: "qAI37 — The Neutral Route to Post-Silicon AI",
    description:
      "A new software layer for AI infrastructure. Building the vendor-agnostic access point between conventional AI and neutral-atom systems.",
    type: "website",
    url: "https://www.qai37.com",
    images: [{ url: "https://www.qai37.com/images/qai37_logo.png", width: 212, height: 254, alt: "qAI37" }],
  },
  twitter: { card: "summary_large_image", title: "qAI37 — The Neutral Route to Post-Silicon AI", description: "A new software layer for AI infrastructure." },
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
        <CommandPalette />
        <Reveals />
      </body>
    </html>
  );
}
