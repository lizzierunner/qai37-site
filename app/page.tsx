import SignupForm from "@/components/SignupForm";

const ROSTER = [
  { name: "Ted Stockwell", role: "Founder & CEO" },
  { name: "Michelle Holtmann", role: "President & Chief Strategy Officer" },
  { name: "Steve Jahnke", role: "Chief Technical Officer" },
  { name: "Laverne Masaki", role: "Chief People Officer" },
  { name: "Rick Jahnke", role: "Principal Engineer" },
  { name: "Ruben Marroquin", role: "Senior Engineer" },
];

export default function Home() {
  return (
    <div className="p-home">
      {/* HERO */}
      <section className="hero">
        <div className="wrap">
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
      </section>

      {/* THESIS */}
      <section className="thesis">
        <div className="wrap">
          <span className="eyebrow reveal">The thesis</span>
          <div className="thesis-list">
            <div className="thesis-item reveal">
              <span className="thesis-n" aria-hidden="true">01</span>
              <div>
                <p className="thesis-head">A different kind of AI on a different kind of machine.</p>
                <p className="thesis-body">Not a faster chip — a fundamentally different execution path. The software interface stays familiar; the execution changes beneath it.</p>
              </div>
            </div>
            <div className="thesis-item reveal s1">
              <span className="thesis-n" aria-hidden="true">02</span>
              <div>
                <p className="thesis-head">It remembers, so every response improves with context.</p>
                <p className="thesis-body">The machine holds working memory the way a person does, instead of re-reading the entire history before every answer.</p>
              </div>
            </div>
            <div className="thesis-item reveal s2">
              <span className="thesis-n" aria-hidden="true">03</span>
              <div>
                <p className="thesis-head">A proven idea that is, for the first time, applicable.</p>
                <p className="thesis-body">The scientific foundation is decades old and peer-reviewed. The hardware that makes it work now exists.</p>
              </div>
            </div>
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

      {/* POSITIONING */}
      <section className="positioning">
        <div className="wrap">
          <span className="sec-eyebrow reveal">What qAI37 is not</span>
          <div className="not-list">
            <p className="not-item reveal">Not another quantum machine.</p>
            <p className="not-item reveal s1">Not a replacement for the data center.</p>
            <p className="not-item reveal s2">Not a bet that one hardware vendor wins.</p>
            <p className="not-item reveal s3">Not a bet against silicon.</p>
          </div>
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
