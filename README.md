# qAI37 — site

Complete Next.js (App Router) marketing site for qAI37: Home, Mission, and Team,
built on one shared design system.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
```

Build for production: `npm run build && npm start`.

No extra UI dependencies — fonts (`next/font`) and styling (global CSS) are built in.

## Structure

```
app/
  layout.tsx        Root layout: fonts, metadata, shared header/footer/lattice
  globals.css       The whole design system (tokens + per-page styles)
  page.tsx          Home  (.p-home)
  mission/page.tsx  Mission (.p-mission)
  team/page.tsx     Team   (.p-team)
components/
  Lattice.tsx          Animated quantum-lattice canvas background
  SiteHeader.tsx       Sticky nav, active route, scroll state
  SiteFooter.tsx
  SignupForm.tsx       Mailing-list form (UI confirm; wire to your provider)
  Reveals.tsx          Scroll-reveal coordinator (re-runs per route)
  DivergenceChart.tsx  The demand-vs-supply chart (scroll-draw + optional count-up)
lib/
  fonts.ts          Space Grotesk / IBM Plex Sans / IBM Plex Mono
```

## Things to wire before launch

1. **Mailing list.** `components/SignupForm.tsx` currently confirms in the UI only.
   Uncomment the `fetch("/api/subscribe", …)` line and add a route handler (or call
   Mailchimp/Resend directly).

2. **Team headshots.** They load from `https://www.qai37.com/images/...` via plain
   `<img>` with an initials fallback. To use `next/image`, add the host to
   `next.config.mjs` `images.remotePatterns` and swap the tags.

3. **The "13×" claim.** It's the ratio of growth rates (≈26% demand vs ≈2% supply,
   per SRC's Decadal Plan for Semiconductors). It appears on Home and Mission — make
   sure the team is comfortable defending it, or soften to "the gap widens every year."

4. **Bios.** They're faithful to the current site and intentionally generic. The single
   highest-impact edit is one concrete, verifiable credential per person.

## Notes

- Accessibility floor: visible focus, skip link, reduced-motion disables all animation,
  the lattice pauses when the tab is hidden and scales node count to viewport.
- The global CSS uses page-scoped prefixes (`.p-home` / `.p-mission` / `.p-team`) for
  page-specific rules. If you drop this into a larger app with its own design system,
  consider wrapping everything in a single namespace to avoid collisions.
```
