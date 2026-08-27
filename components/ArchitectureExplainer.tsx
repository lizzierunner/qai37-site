"use client";

import { useState } from "react";

const LAYERS = [
  {
    label: "Application layer",
    number: "01",
    title: "The software teams already use",
    description: "Existing AI applications and model interfaces stay in place. qAI37 does not ask teams to rewrite their stack to reach a new execution path.",
    nodes: ["AI workload", "Model interface", "Agent state"],
  },
  {
    label: "qAI37 layer",
    number: "02",
    title: "The translation and memory layer",
    description: "qAI37 intercepts supported operations, retains working context, and translates the workload into inspectable instructions for the target backend.",
    nodes: ["Intercept", "Remember", "Translate"],
  },
  {
    label: "Hardware layer",
    number: "03",
    title: "Multiple paths beneath the interface",
    description: "Neutral-atom and future hardware backends become interchangeable execution targets, with a classical fallback path intact.",
    nodes: ["Neutral atom", "Vendor B", "Classical fallback"],
  },
];

export default function ArchitectureExplainer() {
  const [active, setActive] = useState(1);
  const layer = LAYERS[active];

  return (
    <section className="architecture-section">
      <div className="wrap">
        <span className="sec-eyebrow reveal">The architecture</span>
        <div className="architecture-intro">
          <div>
            <h2 className="reveal s1">One interface.<br />A different path beneath it.</h2>
          </div>
          <p className="sec-lede reveal s2">qAI37 is the access layer between the AI software teams already run and the hardware that makes the next order of scale possible.</p>
        </div>

        <div className="architecture-shell reveal s2">
          <div className="architecture-diagram" aria-label="qAI37 three-layer architecture">
            {LAYERS.map((item, index) => (
              <button
                type="button"
                key={item.label}
                className={`architecture-layer ${index === active ? "active" : ""}`}
                onClick={() => setActive(index)}
                aria-pressed={index === active}
              >
                <span className="architecture-layer-number">{item.number}</span>
                <span className="architecture-layer-label">{item.label}</span>
                <span className="architecture-nodes">
                  {item.nodes.map((node) => <span key={node}>{node}</span>)}
                </span>
              </button>
            ))}
          </div>

          <div className="architecture-detail" aria-live="polite">
            <span className="architecture-detail-kicker">Selected layer · {layer.number}</span>
            <h3>{layer.title}</h3>
            <p>{layer.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
}