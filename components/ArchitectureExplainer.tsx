"use client";

import { useEffect, useState } from "react";

const STAGES = [
  { number: "01", title: "Intercept", description: "Identify the incoming AI workload and make it available to the qAI37 layer.", diagram: ["AI WORKLOAD", "qAI37"] },
  { number: "02", title: "Qualify", description: "Determine how the workload can be handled within the available execution environment.", diagram: ["WORKLOAD", "QUALIFY", "PATH A  /  PATH B"] },
  { number: "03", title: "Translate", description: "Map the appropriate operation into instructions understood by the underlying execution environment.", diagram: ["AI OPERATION", "qAI37 LAYER", "TARGET INSTRUCTIONS"] },
  { number: "04", title: "Return", description: "Return the resulting output to the application.", diagram: ["EXECUTION", "RESULT", "APPLICATION"] },
];

export default function ArchitectureExplainer() {
  const [active, setActive] = useState(0);
  const [following, setFollowing] = useState(false);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    if (!following) return;
    const timers = STAGES.map((_, index) => window.setTimeout(() => setActive(index), index * 650));
    const finish = window.setTimeout(() => { setFollowing(false); setComplete(true); }, STAGES.length * 650);
    return () => { timers.forEach(window.clearTimeout); window.clearTimeout(finish); };
  }, [following]);

  function followPath() {
    if (following) return;
    setComplete(false);
    setActive(0);
    setFollowing(true);
  }

  return (
    <section className="architecture-section">
      <div className="wrap">
        <span className="sec-eyebrow reveal">The architecture</span>
        <div className="architecture-intro">
          <div><h2 className="reveal s1">One interface.<br />A different path beneath it.</h2></div>
          <p className="sec-lede reveal s2">qAI37 is the access layer between the AI software teams already run and the hardware that makes the next order of scale possible.</p>
        </div>
        <div className={`architecture-flow reveal s2 ${following ? "is-following" : ""}`} aria-label="Conceptual qAI37 workload architecture">
          <div className="architecture-app architecture-app-start"><span>AI Application</span><i aria-hidden="true" /></div>
          <div className="architecture-stages">
            {STAGES.map((stage, index) => (
              <div className="architecture-stage-wrap" key={stage.title}>
                <button type="button" className={`architecture-stage ${active === index ? "active" : ""}`} onClick={() => setActive(index)} onFocus={() => setActive(index)} onMouseEnter={() => setActive(index)} aria-pressed={active === index} aria-label={`${stage.number} ${stage.title}: ${stage.description}`}>
                  <span className="architecture-stage-number">{stage.number}</span>
                  <span className="architecture-stage-title">{stage.title}</span>
                  <span className="architecture-stage-description">{stage.description}</span>
                  <span className={`architecture-mini-diagram stage-${index + 1}`} aria-hidden="true">
                    {stage.diagram.map((label, diagramIndex) => <span key={label}>{label}{diagramIndex < stage.diagram.length - 1 && <i />}</span>)}
                  </span>
                </button>
                {index < STAGES.length - 1 && <span className={`architecture-connector ${active === index || active === index + 1 ? "active" : ""}`} aria-hidden="true"><i /></span>}
              </div>
            ))}
          </div>
          <div className="architecture-app architecture-app-end"><i aria-hidden="true" /><span>AI Application</span></div>
        </div>
        <div className="architecture-actions reveal s3">
          <button type="button" className="architecture-follow" onClick={followPath} disabled={following}>{following ? "Following Path..." : "Follow the Path"}</button>
          <p className="architecture-caption" aria-live="polite">{complete ? "Conceptual architecture - showing the flow of a workload through the qAI37 layer." : "Select a stage to explore the conceptual workload flow."}</p>
        </div>
      </div>
    </section>
  );
}