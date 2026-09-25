import HeroViz from "@/components/HeroViz";
import ThesisExplorer from "@/components/ThesisExplorer";
import PositioningExplorer from "@/components/PositioningExplorer";

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
          </div>
          <HeroViz />
        </div>
      </section>

      {/* THESIS */}
      <section className="thesis">
        <div className="wrap">
          <span className="eyebrow reveal">The thesis</span>
          <ThesisExplorer />
        </div>
      </section>

      {/* POSITIONING */}
      <section className="positioning">
        <div className="wrap">
          <span className="sec-eyebrow reveal">What qAI37 is not</span>
          <PositioningExplorer />
        </div>
      </section>

      {/* CAREERS */}
      <section className="careers-section" id="careers">
        <div className="wrap careers-inner">
          <div>
            <span className="eyebrow reveal">Careers</span>
            <h2 className="reveal s1">Build the route beneath the interface.</h2>
          </div>
          <div className="careers-action reveal s2">
            <p>
              We&apos;re assembling a small team for a problem that sits between AI infrastructure,
              systems software, and quantum computing.
            </p>
            <a className="btn" href="mailto:careers@qAI37.com">Contact us</a>
          </div>
        </div>
      </section>
    </div>
  );
}
