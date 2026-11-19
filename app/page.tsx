import HeroViz from "@/components/HeroViz";
import ThesisExplorer from "@/components/ThesisExplorer";
import PositioningExplorer from "@/components/PositioningExplorer";
import RouteStory from "@/components/RouteStory";
import ContextVisualizer from "@/components/ContextVisualizer";

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
          <div className="hero-visual" role="img" aria-label="Live visualization of incoming context, persistent state, and an adaptive route">
            <div className="hero-visual-head" aria-hidden="true">
              <span>Context engine</span>
              <span className="hero-visual-live"><i /> Live</span>
            </div>
            <HeroViz />
            <div className="hero-visual-footer" aria-hidden="true">
              <span>Incoming context</span>
              <span>Persistent state</span>
              <span>Adaptive route</span>
            </div>
          </div>
        </div>
      </section>

      {/* STEALTH-SAFE CONTEXT STORY */}
      <RouteStory />
      <section className="home-interlude" aria-label="qAI37 perspective">
        <div className="wrap home-interlude-inner">
          <div className="home-interlude-copy">
            <span className="eyebrow reveal">A different relationship with context</span>
            <p className="home-interlude-statement reveal s1">
              AI remembers.
              <br />
              <em>It should not have to reread.</em>
            </p>
          </div>
          <div className="home-interlude-orbit reveal s2" aria-hidden="true">
            <span />
            <i />
          </div>
        </div>
      </section>
      <section className="context-viz-section" id="context-model">
        <div className="wrap">
          <ContextVisualizer />
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
