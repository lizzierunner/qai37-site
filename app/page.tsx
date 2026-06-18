import SignupForm from "@/components/SignupForm";
import DivergenceChart from "@/components/DivergenceChart";

export default function Home() {
  return (
    <div className="p-home">
      {/* HERO */}
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <span className="eyebrow rise d1">Quantum-native AI infrastructure</span>
            <h1 className="rise d2">AI&apos;s hunger for power is growing <span className="x13">13×</span> faster than the grid can feed it.</h1>
            <p className="lede rise d3"><strong>qAI37 breaks that curve.</strong> A hybrid quantum architecture that runs AI at scale on a fraction of the power — without touching the software stack you already run.</p>
            <div className="rise d4">
              <SignupForm />
              <p className="capture-note">No spam — occasional founding updates, then a heads-up at launch.</p>
            </div>
          </div>
          <DivergenceChart counter />
        </div>
      </section>

      {/* GAP BAND */}
      <section className="band" aria-label="The scale of the gap">
        <div className="wrap">
          <div className="huge reveal">13×</div>
          <div className="sub reveal s1">Demand is compounding. The grid is not.</div>
          <div className="stats">
            <div className="stat reveal s1"><div className="n a">+26%</div><div className="l">Compute demand / yr</div></div>
            <div className="stat reveal s2"><div className="n c">+2%</div><div className="l">Energy supply / yr</div></div>
            <div className="stat reveal s3"><div className="n">2034</div><div className="l">When it breaks</div></div>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section id="problem">
        <div className="wrap">
          <div className="forces-head">
            <span className="sec-eyebrow reveal">The collision</span>
            <h2 className="reveal s1">Three forces are hitting the same wall at once.</h2>
            <p className="sec-lede reveal s2">Scale, silicon, and infrastructure used to advance together. They no longer do — and the gap is where they break.</p>
          </div>
          <div className="forces">
            <div className="force reveal"><span className="k">FORCE 01 — Scale</span><h3>An insatiable demand for compute</h3><p>Every breakthrough wants more processing, more memory, more storage. The promise of AI is built on a relentless pursuit of &quot;more.&quot;</p></div>
            <div className="force reveal s1"><span className="k">FORCE 02 — Silicon</span><h3>The end of free efficiency</h3><p>Moore&apos;s Law no longer delivers the power savings it once did. Progress has shifted to brute force: more cores, more chips, more racks.</p></div>
            <div className="force reveal s2"><span className="k">FORCE 03 — Grid</span><h3>The infrastructure breaking point</h3><p>That brute force outruns data-center power and the grid itself — turning scale into an unsustainable capital and energy bill.</p></div>
          </div>
        </div>
      </section>

      {/* APPROACH */}
      <section className="sol" id="approach">
        <div className="wrap sol-grid">
          <div>
            <span className="sec-eyebrow reveal">Our approach</span>
            <h2 className="reveal s1">A quantum answer that fits the world you already built.</h2>
            <p className="sec-lede reveal s2" style={{ marginBottom: 34 }}>qAI37 brings together AI, quantum computing, and data-center infrastructure into one hybrid architecture — engineered to bend the cost and power curve, not your codebase.</p>
            <div>
              <div className="pillar reveal s1"><span className="mark"><svg viewBox="0 0 24 24"><path d="M13 2L4 14h7l-1 8 9-12h-7z" /></svg></span><div><h3>Low power</h3><p>Order-of-magnitude efficiency, so scale no longer means overwhelming the grid.</p></div></div>
              <div className="pillar reveal s2"><span className="mark"><svg viewBox="0 0 24 24"><path d="M4 18V8M10 18V4M16 18v-7M22 18H2" /></svg></span><div><h3>Massively scalable</h3><p>Hardware and software that grow with AI&apos;s demand instead of buckling under it.</p></div></div>
              <div className="pillar reveal s3"><span className="mark"><svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" /></svg></span><div><h3>No software disruption</h3><p>Drops into today&apos;s ecosystem — disrupt the economics of AI, not the stack teams already run.</p></div></div>
            </div>
          </div>
          <aside className="sol-note reveal s1">
            <p className="q">We&apos;re building the foundation for the <b>next generations of AI</b> — sustainably, and at a scale today&apos;s infrastructure can&apos;t reach.</p>
            <p className="meta">Stealth · founded 2025</p>
          </aside>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-band" id="join">
        <div className="wrap">
          <span className="sec-eyebrow reveal" style={{ display: "block" }}>Be first</span>
          <h2 className="reveal s1">See it before the rest of the market does.</h2>
          <p className="sec-lede reveal s2">Join the list for founding updates and early access when we&apos;re ready to talk.</p>
          <div className="reveal s2"><SignupForm centered /></div>
        </div>
      </section>
    </div>
  );
}
