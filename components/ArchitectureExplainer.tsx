"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Cpu, Layers, Monitor, RotateCcw } from "lucide-react";

const STAGES = ["Intercept", "Qualify", "Translate", "Execute", "Return"];

const PATHS = {
  eligible: {
    label: "Eligible operation",
    backend: "Neutral-atom system",
    stages: [
      { title: "A familiar request enters.", detail: "An application asks for a summary of a project's latest updates. In the proposed flow, a supported inference call enters the qAI37 access layer through a familiar software interface.", signal: "Application request received" },
      { title: "Eligibility comes before routing.", detail: "The layer would check whether an operation within this request is compatible with an available target. This example assumes one operation qualifies; it does not imply that an entire language model runs on quantum hardware.", signal: "Assumption: operation and target are eligible" },
      { title: "The operation gets a new representation.", detail: "The eligible operation would be mapped into instructions tailored to the selected backend. The application keeps its interface while qAI37 handles this translation beneath it.", signal: "Proposed mapping to target instructions" },
      { title: "Eligible work takes the alternate route.", detail: "The selected operation would execute on a suitable neutral-atom system. Conventional infrastructure remains part of the workflow; qAI37 is building the software access layer, not the quantum computer.", signal: "Illustrative target: neutral-atom system" },
      { title: "The result rejoins the application.", detail: "The operation's result would return to the conventional application flow, where the response is assembled. The user receives the project summary through the same application interface.", signal: "Proposed result handoff; no generated output" },
    ],
  },
  conventional: {
    label: "Conventional fallback",
    backend: "Conventional compute",
    stages: [
      { title: "The same request enters.", detail: "The application asks for the same project summary. A supported inference call would reach the qAI37 layer without requiring the application to choose a hardware route itself.", signal: "Application request received" },
      { title: "Not every operation qualifies.", detail: "This example assumes the operation or available target is not eligible for the alternate route. Keeping a conventional path available is part of the intended hybrid execution model.", signal: "Assumption: alternate route is not eligible" },
      { title: "Alternate translation is bypassed.", detail: "Because the operation did not qualify, this example keeps it on the conventional execution path. It does not need instructions for a neutral-atom backend.", signal: "Neutral-atom translation bypassed" },
      { title: "Existing compute carries the work.", detail: "The operation stays on conventional infrastructure. The proposed access layer adds an execution option for compatible work, rather than requiring every request to use quantum hardware.", signal: "Illustrative target: conventional compute" },
      { title: "The interface stays the same.", detail: "The conventional result returns to the application, which assembles the project summary. Both example routes end at the same application boundary; neither demonstrates measured performance.", signal: "Proposed result handoff; no generated output" },
    ],
  },
} as const;

export default function ArchitectureExplainer() {
  const [active, setActive] = useState(0);
  const [route, setRoute] = useState<keyof typeof PATHS>("eligible");
  const path = PATHS[route];
  const stage = path.stages[active];

  return (
    <section className="request-walkthrough" id="request-walkthrough" aria-labelledby="request-title">
      <div className="wrap">
        <div className="request-heading">
          <div>
            <span className="sec-eyebrow">Inside the proposed architecture</span>
            <h2 id="request-title">Follow one AI request.</h2>
          </div>
          <p>A familiar application. A software decision. Two possible execution paths.</p>
        </div>

        <div className="request-example">
          <span className="request-label">Illustrative request</span>
          <blockquote>Summarize the latest updates to this project.</blockquote>
          <p>Conceptual flow, not a live computation or benchmark. Routing eligibility is assumed for this example, not evaluated against real hardware.</p>
        </div>

        <div className="request-route" role="group" aria-label="Assumed routing outcome">
          {(Object.keys(PATHS) as Array<keyof typeof PATHS>).map((key) => (
            <button type="button" key={key} aria-pressed={route === key} onClick={() => { setRoute(key); setActive(0); }}>
              {key === "eligible" ? <Layers aria-hidden="true" size={16} /> : <Cpu aria-hidden="true" size={16} />}
              {PATHS[key].label}
            </button>
          ))}
        </div>

        <nav className="request-stages" aria-label="Request stages">
          {STAGES.map((title, index) => (
            <button type="button" key={title} aria-current={active === index ? "step" : undefined} aria-label={`Step ${index + 1}: ${title}`} onClick={() => setActive(index)}>
              <span className="request-stage-number">{index < active ? <Check size={16} aria-hidden="true" /> : `0${index + 1}`}</span>
              <span>{title}</span>
            </button>
          ))}
        </nav>

        <div className={`request-scene route-${route}`}>
          <div className="request-diagram" role="img" aria-label={`Proposed path: application to qAI37 access layer to ${path.backend}, then back to the application. Current stage: ${STAGES[active]}.`}>
            <div className={`request-node ${active === 0 || active === 4 ? "is-active" : ""}`}>
              <Monitor size={22} aria-hidden="true" />
              <span>AI application<small>{active === 4 ? "Result returns" : "Request originates"}</small></span>
            </div>
            <div className="request-wire" aria-hidden="true"><span>{active === 4 ? "Return" : "Supported call"}</span></div>
            <div className={`request-node request-layer ${active === 1 || active === 2 ? "is-active" : ""}`}>
              <Layers size={24} aria-hidden="true" />
              <span>qAI37<small>Software access layer</small></span>
            </div>
            <div className="request-branches" aria-hidden="true">
              <div className={`request-branch ${route === "eligible" ? "is-selected" : ""}`}>
                <span className="request-branch-line" />
                <div className={`request-backend ${route === "eligible" && active === 3 ? "is-active" : ""}`}>
                  <span className="request-atom-grid">{Array.from({ length: 9 }, (_, index) => <i key={index} />)}</span>
                  <strong>Neutral-atom</strong><small>{route === "eligible" ? "Assumed eligible" : "Not selected"}</small>
                </div>
              </div>
              <div className={`request-branch ${route === "conventional" ? "is-selected" : ""}`}>
                <span className="request-branch-line" />
                <div className={`request-backend ${route === "conventional" && active === 3 ? "is-active" : ""}`}>
                  <Cpu size={28} />
                  <strong>Conventional</strong><small>{route === "conventional" ? "Fallback selected" : "Remains available"}</small>
                </div>
              </div>
            </div>
          </div>

          <div className="request-detail" aria-live="polite" aria-atomic="true">
            <span className="request-label">{`0${active + 1} / ${STAGES[active]}`}</span>
            <h3>{stage.title}</h3>
            <p>{stage.detail}</p>
            <div className="request-signal"><span aria-hidden="true" />{stage.signal}</div>
          </div>
        </div>

        <div className="request-controls">
          <span className="request-progress">Step {active + 1} of {STAGES.length}</span>
          <div className="request-control-buttons">
            <button type="button" className="request-icon-button" onClick={() => setActive(0)} disabled={active === 0} title="Restart request" aria-label="Restart request"><RotateCcw size={18} aria-hidden="true" /></button>
            <button type="button" className="request-icon-button" onClick={() => setActive((previous) => Math.max(0, previous - 1))} disabled={active === 0} title="Previous stage" aria-label="Previous stage"><ArrowLeft size={18} aria-hidden="true" /></button>
            <button type="button" className="request-next" onClick={() => setActive((previous) => Math.min(STAGES.length - 1, previous + 1))} disabled={active === STAGES.length - 1}>Next stage <ArrowRight size={18} aria-hidden="true" /></button>
          </div>
        </div>
        <Link href="/wiki#execution" className="request-reference">Read the execution model <ArrowRight size={16} aria-hidden="true" /></Link>
      </div>
    </section>
  );
}