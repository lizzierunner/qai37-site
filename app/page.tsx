import SignupForm from "@/components/SignupForm";
import HeroViz from "@/components/HeroViz";
import ContextVisualizer from "@/components/ContextVisualizer";
import ThesisExplorer from "@/components/ThesisExplorer";
import ArchitectureExplainer from "@/components/ArchitectureExplainer";
import PositioningExplorer from "@/components/PositioningExplorer";
import RouteStory from "@/components/RouteStory";

const ROSTER = [
  { name: "Ted Stockwell", role: "Founder & CEO" },
  { name: "Michelle Holtmann", role: "President & Chief Strategy Officer" },
  { name: "Steve Jahnke", role: "CTO / Principal Architect" },
  { name: "Laverne Masaki", role: "Chief People Officer" },
  { name: "Vincent E. Elfving", role: "Chief Quantum Advisor" },
  { name: "Rick Jahnke", role: "Principal Engineer" },
  { name: "Ruben Marroquin", role: "Senior Engineer" },
];

export default function Home() {
  return (
    <div className="p-home">
      {/* HERO */}
      <section className="hero">
        <div className="wrap hero-inner">
          <div className="hero-text">
            <span className="eyebrow rise d1">The neutral route to post-silicon AI</span>
            <h1 className="rise d2">A new software layer for AI infrastructure.</h1>
          <p className="lede rise d3">
            Every time you ask AI a question, it re-reads everything you&apos;ve given it
            before it answers. The more it knows, the slower and more expensive every
            answer gets, which is why AI stalls exactly where it becomes most valuable:
            long, live, complicated work. We&apos;re building the software layer that
            changes that math.
          </p>
          <div className="rise d4">
            <SignupForm />
          </div>
          </div>
          <HeroViz />
        </div>
      </section>

      <RouteStory />

      {/* THESIS */}
      <section className="thesis">
        <div className="wrap">
          <span className="eyebrow reveal">The thesis</span>
          <ThesisExplorer />

          <div style={{ marginTop: 64 }}>
            <ContextVisualizer />
          </div>
        </div>
      </section>

      {/* PIPELINE */}
      <section className="pipeline">
        <div className="wrap">
          <span className="sec-eyebrow reveal">What the product does</span>
          <h2 className="reveal s1">The interface stays familiar.<br />The execution path changes beneath it.</h2>
          <div className="pipeline-steps reveal s2">
            <div className="pipeline-step">
              <span className="pipeline-num">01</span>
              <p className="pipeline-label">Intercept</p>
              <p className="pipeline-desc">Capture a supported inference call through the existing application interface.</p>
            </div>
            <div className="pipeline-connector" aria-hidden="true" />
            <div className="pipeline-step">
              <span className="pipeline-num">02</span>
              <p className="pipeline-label">Qualify</p>
              <p className="pipeline-desc">Determine whether the selected operation and target backend are eligible.</p>
            </div>
            <div className="pipeline-connector" aria-hidden="true" />
            <div className="pipeline-step">
              <span className="pipeline-num">03</span>
              <p className="pipeline-label">Translate</p>
              <p className="pipeline-desc">Map the operation into inspectable, vendor-targeted instructions.</p>
            </div>
            <div className="pipeline-connector" aria-hidden="true" />
            <div className="pipeline-step">
              <span className="pipeline-num">04</span>
              <p className="pipeline-label">Return</p>
              <p className="pipeline-desc">Bring the result back into the conventional application and fallback path.</p>
            </div>
          </div>
          <p className="pipeline-note reveal s3">One application integration · multiple target formats · classical fallback intact</p>
        </div>
      </section>

      <ArchitectureExplainer />

      {/* POSITIONING */}
      <section className="positioning">
        <div className="wrap">
          <span className="sec-eyebrow reveal">What qAI37 is not</span>
          <PositioningExplorer />
        </div>
      </section>

      {/* TEAM ROSTER */}
      <section className="roster-section" id="team">
        <div className="wrap">
          <span className="eyebrow reveal">The team</span>
          <div className="roster">
            {ROSTER.map((m) => (
              <div key={m.name} className="roster-item reveal">
                <span className="roster-name">{m.name}</span>
                <span className="roster-role">{m.role}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-band" id="join">
        <div className="wrap">
          <h2 className="reveal">Stay in the loop.</h2>
          <p className="sec-lede reveal s1">Early access and founding updates when we&apos;re ready to talk.</p>
          <div className="reveal s1"><SignupForm centered /></div>
        </div>
      </section>
    </div>
  );
}
