import type { Metadata } from "next";
import SignupForm from "@/components/SignupForm";
import DivergenceChart from "@/components/DivergenceChart";

export const metadata: Metadata = {
  title: "Mission",
  description:
    "AI compute demand is growing 13× faster than energy supply. qAI37's mission: unlimited, sustainable, cost-effective AI, by bending the power curve with quantum-native infrastructure.",
};

export default function Mission() {
  return (
    <div className="p-mission">
      <section className="intro">
        <div className="wrap">
          <span className="eyebrow reveal">Our mission</span>
          <h1 className="reveal s1">Make AI <em>unlimited</em> — without breaking the planet&apos;s power supply.</h1>
          <p className="lede reveal s2">qAI37 exists to solve the fundamental constraint on AI: compute. Our goal is a future where artificial intelligence is unlimited, sustainable, and cost-effective — not rationed by the grid.</p>
        </div>
      </section>

      <section className="reality">
        <div className="wrap reality-grid">
          <div>
            <span className="sec-eyebrow amber reveal">Today&apos;s reality</span>
            <h2 className="reveal s1">Compute is outgrowing our ability to power it.</h2>
            <p className="sec-lede reveal s2">Every leap in AI demands more processing, more memory, more energy. But the grid doesn&apos;t scale the way models do — and the lines have already split.</p>
            <div className="bignum reveal s2">13×</div>
            <p className="bignum-cap reveal s2">Compute energy demand is growing roughly 26% a year. Energy production grows about 2%. That gap compounds — every year.</p>
            <p className="src reveal s3">Source: Decadal Plan for Semiconductors — SRC</p>
          </div>
          <DivergenceChart title="Compute energy demand vs. supply" subtitle="2024 → 2034" />
        </div>
      </section>

      <section className="storm">
        <div className="wrap">
          <div className="storm-head">
            <span className="sec-eyebrow reveal">The perfect storm</span>
            <h2 className="reveal s1">Three pressures, converging at once.</h2>
            <p className="sec-lede reveal s2">Scale, silicon, and infrastructure used to advance together. They&apos;ve come apart — and they&apos;re all hitting the same wall.</p>
          </div>
          <div className="storm-list">
            <div className="storm-row reveal">
              <div className="lbl"><span className="k">Pressure · Scale</span><span className="t">AI&apos;s insatiable demand</span></div>
              <p>Realizing the promise of AI takes ever-increasing scale. Each breakthrough wants more processing, more memory, more storage — driving exponential growth in infrastructure requirements.</p>
            </div>
            <div className="storm-row reveal">
              <div className="lbl"><span className="k">Pressure · Silicon</span><span className="t">The end of efficiency gains</span></div>
              <p>Moore&apos;s Law no longer delivers the power-efficiency benefits silicon once did. Progress has shifted to brute force — more cores, more chips, more servers, bigger data centers — with no matching efficiency gain.</p>
            </div>
            <div className="storm-row reveal">
              <div className="lbl"><span className="k">Pressure · Grid</span><span className="t">The infrastructure breaking point</span></div>
              <p>Together, these break existing data-center power and exceed the limits of today&apos;s electrical grid. Scaling AI now demands a power buildout that simply can&apos;t keep pace — at unsustainable capital and operating cost.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="need">
        <div className="wrap">
          <span className="sec-eyebrow reveal">Tomorrow&apos;s need</span>
          <h2 className="reveal s1">To unlock AI&apos;s potential, the foundation has to change.</h2>
          <p className="sec-lede reveal s2">Not a faster version of today&apos;s approach — a fundamentally different one, built on two non-negotiables.</p>
          <div className="need-grid">
            <div className="need-card reveal s1">
              <div className="ic"><svg viewBox="0 0 24 24"><path d="M4 18V8M10 18V4M16 18v-7M22 18H2" /></svg></div>
              <h3>Unlimited scale</h3>
              <p>Hardware and software that scale efficiently with AI&apos;s appetite — so capability isn&apos;t capped by what the infrastructure can bear.</p>
            </div>
            <div className="need-card reveal s2">
              <div className="ic"><svg viewBox="0 0 24 24"><path d="M13 2L4 14h7l-1 8 9-12h-7z" /></svg></div>
              <h3>Power efficiency</h3>
              <p>Unprecedented efficiency, so growth no longer means overwhelming the global electrical grid to get there.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="sol">
        <div className="wrap">
          <span className="sec-eyebrow reveal">Our quantum AI solution</span>
          <h2 className="reveal s1">A hybrid quantum architecture that bends the curve.</h2>
          <p className="sec-lede sol-lede reveal s2">qAI37 uses advanced quantum technology to disrupt the economics of unleashing AI at scale — delivered as a hybrid system that drops into <b>today&apos;s software ecosystem</b>, not one that replaces it.</p>
          <div className="solpills">
            <div className="solpill reveal"><div className="ic"><svg viewBox="0 0 24 24"><path d="M13 2L4 14h7l-1 8 9-12h-7z" /></svg></div><h3>Low power</h3><p>Order-of-magnitude efficiency, so scale stops meaning an unsustainable energy bill.</p></div>
            <div className="solpill reveal s1"><div className="ic"><svg viewBox="0 0 24 24"><path d="M4 18V8M10 18V4M16 18v-7M22 18H2" /></svg></div><h3>Massively scalable</h3><p>An architecture that grows with AI&apos;s demand instead of buckling under it.</p></div>
            <div className="solpill reveal s2"><div className="ic"><svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" /></svg></div><h3>No software disruption</h3><p>Hybrid by design — disrupt the economics of AI, not the stack teams already run.</p></div>
          </div>
        </div>
      </section>

      <section className="cta-band" id="join">
        <div className="wrap">
          <span className="eyebrow reveal">Join us</span>
          <h2 className="reveal s1">Help us revolutionize AI compute.</h2>
          <p className="sec-lede reveal s2">We&apos;re building the foundation for the next generations of AI. Be the first to know as it comes to light.</p>
          <div className="reveal s2"><SignupForm centered /></div>
        </div>
      </section>
    </div>
  );
}
