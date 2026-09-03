"use client";

import { useState } from "react";

const STAGES = [
  { label: "10K", explanation: "At smaller context sizes, the infrastructure requirements are more manageable." },
  { label: "25K", explanation: "At smaller context sizes, the infrastructure requirements are more manageable." },
  { label: "50K", explanation: "As context grows, systems must handle increasingly large amounts of information." },
  { label: "100K", explanation: "As context grows, systems must handle increasingly large amounts of information." },
  { label: "250K", explanation: "As context grows, systems must handle increasingly large amounts of information." },
  { label: "500K", explanation: "As context grows, systems must handle increasingly large amounts of information." },
  { label: "1M", explanation: "Large context windows can create significant memory and infrastructure demands." },
  { label: "2M", explanation: "Large context windows can create significant memory and infrastructure demands." },
];

function ContextBars({ variant, index }: { variant: "traditional" | "memory"; index: number }) {
  const traditionalWidths = [22, 31, 42, 56, 71, 84, 94, 100];
  const rows = variant === "traditional" ? Math.min(6, 2 + Math.ceil(index / 2)) : 4;
  const width = variant === "traditional" ? traditionalWidths[index] : 38;

  return (
    <div className={`context-bars ${variant}`} aria-hidden="true">
      <div className="context-bars-grid" />
      <div className="context-bars-label">Context</div>
      <div className="context-bars-stack">
        {Array.from({ length: rows }, (_, rowIndex) => (
          <span className="context-bar" key={rowIndex} style={{ width: `${Math.max(14, width - rowIndex * (variant === "traditional" ? 5 : 0))}%` }} />
        ))}
      </div>
      <div className="context-bars-nodes"><i /><i /><i /></div>
    </div>
  );
}

export default function ContextVisualizer() {
  const [index, setIndex] = useState(3);
  const stage = STAGES[index];

  return (
    <section className="context-viz-card reveal" aria-labelledby="context-viz-title">
      <div className="context-viz-header">
        <div>
          <span className="context-viz-eyebrow">Interactive context model</span>
          <h2 className="context-viz-title" id="context-viz-title">Context Changes Everything</h2>
          <p className="context-viz-sub">As AI workloads grow, the amount of information systems need to work with grows with them.</p>
        </div>
        <div className="context-viz-token-badge" aria-label={`Selected context length: ${stage.label}`}>
          <span className="context-viz-token-val">{stage.label}</span><span className="context-viz-token-unit">context</span>
        </div>
      </div>
      <div className="context-viz-slider-container">
        <label className="context-viz-slider-label" htmlFor="context-length">Select context length</label>
        <input id="context-length" type="range" min="0" max={STAGES.length - 1} step="1" value={index} onChange={(event) => setIndex(Number(event.target.value))} className="context-viz-range" aria-valuetext={stage.label} />
        <div className="context-viz-ticks" aria-label="Context length presets">
          {STAGES.map((item, itemIndex) => <button type="button" key={item.label} onClick={() => setIndex(itemIndex)} className={`context-viz-tick ${itemIndex === index ? "active" : ""}`} aria-pressed={itemIndex === index}>{item.label}</button>)}
        </div>
      </div>
      <div className="context-viz-comparison" aria-label="Conceptual context handling comparison">
        <article className="context-viz-col traditional"><header className="col-header"><span className="col-label">Traditional Context Handling</span><span className="col-indicator">Expanding load</span></header><p className="col-desc">More context means more information to repeatedly organize and work through.</p><ContextBars variant="traditional" index={index} /></article>
        <article className="context-viz-col qai37"><header className="col-header"><span className="col-label">qAI37 Memory Layer</span><span className="col-indicator">Stable layer</span></header><p className="col-desc">A conceptual memory layer keeps the working structure visually stable as context grows.</p><ContextBars variant="memory" index={index} /></article>
      </div>
      <div className="context-viz-footer"><p className="context-viz-explanation" aria-live="polite">{stage.explanation}</p><p className="context-viz-caption">Conceptual comparison - illustrative, not a benchmark.</p></div>
    </section>
  );
}
