"use client";

import { useState } from "react";

const STAGES = [
  { label: "10k", tokens: 10000, desc: "Standard chat / short document" },
  { label: "100k", tokens: 100000, desc: "Codebase context / long document" },
  { label: "500k", tokens: 500000, desc: "Multi-file repo / technical manual" },
  { label: "1M", tokens: 1000000, desc: "Full software architecture / enterprise spec" },
  { label: "2M", tokens: 2000000, desc: "Continuous live agent execution state" },
];

export default function ContextVisualizer() {
  const [index, setIndex] = useState(2); // default 500k
  const stage = STAGES[index];

  // Standard LLM attention matrix ops scaling ~ (tokens/10k000)^2
  const factor = stage.tokens / 10000;
  const standardAttentionCost = Math.round(factor * factor);

  return (
    <div className="context-viz-card reveal">
      <div className="context-viz-header">
        <div>
          <span className="context-viz-eyebrow">Interactive scaling model</span>
          <h3 className="context-viz-title">The Context Math Penalty</h3>
        </div>
        <div className="context-viz-token-badge">
          <span className="context-viz-token-val">{stage.tokens.toLocaleString()}</span>
          <span className="context-viz-token-unit">tokens</span>
        </div>
      </div>

      <p className="context-viz-sub">{stage.desc}</p>

      {/* Slider */}
      <div className="context-viz-slider-container">
        <input
          type="range"
          min="0"
          max={STAGES.length - 1}
          value={index}
          onChange={(e) => setIndex(Number(e.target.value))}
          className="context-viz-range"
          aria-label="Select context length in tokens"
        />
        <div className="context-viz-ticks">
          {STAGES.map((s, i) => (
            <button
              key={s.label}
              onClick={() => setIndex(i)}
              className={`context-viz-tick ${i === index ? "active" : ""}`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="context-viz-comparison">
        <div className="context-viz-col standard">
          <div className="col-header">
            <span className="col-label">Standard LLM Architecture</span>
            <span className="col-math">Quadratic O(N²)</span>
          </div>
          <div className="col-stat">
            <span className="col-stat-num">{standardAttentionCost}×</span>
            <span className="col-stat-unit">attention compute multiplier</span>
          </div>
          <p className="col-desc">
            Re-reads entire prompt history on every turn. Slower responses & ballooning token costs.
          </p>
          <div className="bar-track">
            <div
              className="bar-fill amber"
              style={{ width: `${Math.min(100, Math.max(8, (standardAttentionCost / 400) * 100))}%` }}
            />
          </div>
        </div>

        <div className="context-viz-col qai37">
          <div className="col-header">
            <span className="col-label">qAI37 Memory Layer</span>
            <span className="col-math">Constant O(1)</span>
          </div>
          <div className="col-stat">
            <span className="col-stat-num teal">1×</span>
            <span className="col-stat-unit">constant lookup cost</span>
          </div>
          <p className="col-desc">
            Holds state natively in hardware memory. Response speed remains flat regardless of context length.
          </p>
          <div className="bar-track">
            <div className="bar-fill teal" style={{ width: "4%" }} />
          </div>
        </div>
      </div>
    </div>
  );
}
