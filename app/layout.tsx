import "./globals.css";
import type { Metadata } from "next";
import { display, body, mono } from "@/lib/fonts";
import Lattice from "@/components/Lattice";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Reveals from "@/components/Reveals";
import CommandPalette from "@/components/CommandPalette";
import ChatBot from "@/components/ChatBot";

const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "qAI37",
  url: "https://www.qai37.com",
  logo: "https://www.qai37.com/images/qai37_logo.png",
  description:
    "qAI37 is building the vendor-agnostic software access point between conventional AI and neutral-atom systems.",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.qai37.com"),
  title: {
    default: "qAI37 — Quantum-native AI infrastructure",
    template: "%s — qAI37",
  },
  description:
    "qAI37 is building the vendor-agnostic software access point between conventional AI and neutral-atom systems — the neutral route to post-silicon AI.",
  alternates: { canonical: "./" },
  openGraph: {
    title: "qAI37 — The Neutral Route to Post-Silicon AI",
    description:
      "A new software layer for AI infrastructure. Building the vendor-agnostic access point between conventional AI and neutral-atom systems.",
    type: "website",
    url: "https://www.qai37.com",
    images: [{ url: "/images/og/default.png", width: 1200, height: 630, alt: "qAI37 — The Neutral Route to Post-Silicon AI" }],
  },
  twitter: { card: "summary_large_image", title: "qAI37 — The Neutral Route to Post-Silicon AI", description: "A new software layer for AI infrastructure.", images: ["/images/og/default.png"] },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_JSON_LD) }}
        />
        <a className="skip" href="#main">Skip to content</a>
        <Lattice />
        <div className="field" aria-hidden="true" />
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <CommandPalette />
        <ChatBot />
        <Reveals />
      </body>
    </html>
  );
}
