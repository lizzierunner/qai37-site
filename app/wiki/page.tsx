import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wiki",
  description:
    "A working reference for qAI37's approach to quantum-native AI infrastructure.",
};

const TERMS = [
  {
    term: "Post-silicon AI",
    description:
      "An approach to AI infrastructure that looks beyond conventional silicon-only execution paths where the economics of scale begin to break down.",
  },
  {
    term: "Neutral-atom system",
    description:
      "A quantum-computing modality that uses individually controlled neutral atoms as the underlying physical system.",
  },
  {
    term: "Working context",
    description:
      "The live information required to complete a task. qAI37 explores execution paths that preserve this context rather than repeatedly reconstructing it.",
  },
  {
    term: "Hybrid execution",
    description:
      "A practical operating model where conventional software and infrastructure remain in place while eligible operations can take another execution route.",
  },
];

export default function WikiPage() {
  return (
    <div className="p-wiki">
      <section className="wiki-hero">
        <div className="wrap">
          <span className="eyebrow reveal">qAI37 reference</span>
          <h1 className="reveal s1">The <em>wiki</em></h1>
          <p className="lede reveal s2">
            A plain-language map of the ideas, terms, and architecture behind qAI37&apos;s
            work on a new execution layer for AI infrastructure.
          </p>
        </div>
      </section>

      <section className="wiki-content">
        <div className="wrap wiki-layout">
          <aside className="wiki-index reveal" aria-label="Wiki sections">
            <span className="wiki-index-label">On this page</span>
            <a href="#overview">Overview</a>
            <a href="#execution">Execution model</a>
            <a href="#terms">Key terms</a>
            <a href="#questions">Common questions</a>
          </aside>

          <div className="wiki-articles">
            <article className="wiki-entry reveal" id="overview">
              <span className="sec-eyebrow">01 / Overview</span>
              <h2>A software layer for a new route through AI compute.</h2>
              <p>
                qAI37 is building an access layer between conventional AI applications and
                emerging neutral-atom systems. The intention is not to ask teams to abandon
                the tools they use today. It is to create a practical path for compatible
                work to reach a different kind of underlying machine.
              </p>
              <p>
                The problem begins with context. As AI work becomes longer, more live, and
                more complicated, repeatedly processing the full history can increase cost,
                latency, and infrastructure demand. qAI37 is investigating architectures
                that treat working context as an active part of execution.
              </p>
            </article>

            <article className="wiki-entry reveal" id="execution">
              <span className="sec-eyebrow">02 / Execution model</span>
              <h2>Keep the interface familiar. Change the route beneath it.</h2>
              <ol className="wiki-flow">
                <li><strong>Intercept</strong><span>A supported inference call enters through an existing application interface.</span></li>
                <li><strong>Qualify</strong><span>The layer determines whether the operation and target are eligible for the alternate route.</span></li>
                <li><strong>Translate</strong><span>The work is mapped into inspectable instructions tailored to the selected backend.</span></li>
                <li><strong>Return</strong><span>Results rejoin the conventional application flow, with a classical fallback remaining available.</span></li>
              </ol>
            </article>

            <article className="wiki-entry reveal" id="terms">
              <span className="sec-eyebrow">03 / Key terms</span>
              <h2>The vocabulary in use.</h2>
              <dl className="wiki-terms">
                {TERMS.map((item) => (
                  <div key={item.term}>
                    <dt>{item.term}</dt>
                    <dd>{item.description}</dd>
                  </div>
                ))}
              </dl>
            </article>

            <article className="wiki-entry reveal" id="questions">
              <span className="sec-eyebrow">04 / Common questions</span>
              <h2>What this work is, and is not.</h2>
              <div className="wiki-questions">
                <details open>
                  <summary>Is qAI37 building a quantum computer?</summary>
                  <p>No. qAI37 focuses on the software access layer that can connect AI workloads to suitable quantum hardware paths.</p>
                </details>
                <details>
                  <summary>Does this replace a team&apos;s current AI stack?</summary>
                  <p>No. The intended model is hybrid: keep existing software interfaces and conventional execution available while adding an alternate route for eligible work.</p>
                </details>
                <details>
                  <summary>Why neutral atoms?</summary>
                  <p>Neutral-atom systems offer a promising physical platform for quantum computing. qAI37 is pursuing a vendor-agnostic layer so the software approach is not dependent on one hardware provider.</p>
                </details>
              </div>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}