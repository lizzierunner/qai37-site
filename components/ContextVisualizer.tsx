"use client";

import { useState } from "react";

const STAGES = [
  { label: "A moment", explanation: "Every request begins with some context." },
  { label: "Growing", explanation: "Conversations can accumulate more history over time." },
  { label: "Long-running", explanation: "Ongoing work can connect many details across a session." },
  { label: "Over time", explanation: "The idea: keep relevant context available as work continues." },
];

function ContextBars({ variant, index }: { variant: "traditional" | "memory"; index: number }) {
  const traditionalWidths = [24, 48, 74, 100];
  const rows = variant === "traditional" ? 2 + index : 4;
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
    <div className="context-viz-card reveal" role="region" aria-labelledby="context-viz-title">
      <div className="context-viz-header">
        <div>
          <span className="context-viz-eyebrow">A conceptual model</span>
          <h2 className="context-viz-title" id="context-viz-title">When context keeps growing</h2>
          <p className="context-viz-sub">Explore how persistent context changes the way we think about long-running work.</p>
        </div>
        <div className="context-viz-token-badge" aria-label={`Selected context stage: ${stage.label}`}>
          <span className="context-viz-token-val">{stage.label}</span><span className="context-viz-token-unit">context stage</span>
        </div>
      </div>
      <div className="context-viz-slider-container">
        <label className="context-viz-slider-label" htmlFor="context-length">Explore a work timeline</label>
        <input id="context-length" type="range" min="0" max={STAGES.length - 1} step="1" value={index} onChange={(event) => setIndex(Number(event.target.value))} className="context-viz-range" aria-valuetext={stage.label} />
        <div className="context-viz-ticks" aria-label="Work timeline stages">
          {STAGES.map((item, itemIndex) => <button type="button" key={item.label} onClick={() => setIndex(itemIndex)} className={`context-viz-tick ${itemIndex === index ? "active" : ""}`} aria-pressed={itemIndex === index}>{item.label}</button>)}
        </div>
      </div>
      <div className="context-viz-comparison" aria-label="Conceptual context handling comparison">
        <article className="context-viz-col traditional"><header className="col-header"><span className="col-label">Repeated context</span><span className="col-indicator">More to revisit</span></header><p className="col-desc">A simple illustration of history accumulating as work continues.</p><ContextBars variant="traditional" index={index} /></article>
        <article className="context-viz-col qai37"><header className="col-header"><span className="col-label">Persistent context</span><span className="col-indicator">A different idea</span></header><p className="col-desc">A conceptual view of keeping relevant context close to ongoing work.</p><ContextBars variant="memory" index={index} /></article>
      </div>
      <div className="context-viz-footer"><p className="context-viz-explanation" aria-live="polite">{stage.explanation}</p><p className="context-viz-caption">Illustrative concept only. Not a performance comparison.</p></div>
    </div>
  );
}
