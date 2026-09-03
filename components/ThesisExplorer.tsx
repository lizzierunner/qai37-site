"use client";

import { useState } from "react";

const THESIS = [
  {
    number: "01",
    title: "A different kind of AI on a different kind of machine.",
    summary: "Not a faster chip - a fundamentally different execution path.",
    detail: "The software interface stays familiar; the execution changes beneath it.",
    signal: "Rethink the path",
  },
  {
    number: "02",
    title: "It remembers, so every response improves with context.",
    summary: "Working context should stay close to the work.",
    detail: "The machine holds working memory the way a person does, instead of re-reading the entire history before every answer.",
    signal: "Keep the thread",
  },
  {
    number: "03",
    title: "A proven idea that is, for the first time, applicable.",
    summary: "The foundation is established; the timing has changed.",
    detail: "The scientific foundation is decades old and peer-reviewed. The hardware that makes it work now exists.",
    signal: "Apply the idea",
  },
];

export default function ThesisExplorer() {
  const [active, setActive] = useState(0);
  const thesis = THESIS[active];

  return (
    <div className="thesis-explorer reveal" aria-label="qAI37 thesis explorer">
      <div className="thesis-nodes" role="tablist" aria-label="Thesis statements">
        {THESIS.map((item, index) => (
          <button
            type="button"
            key={item.number}
            className={`thesis-node ${active === index ? "active" : ""}`}
            onClick={() => setActive(index)}
            onFocus={() => setActive(index)}
            aria-selected={active === index}
            role="tab"
            aria-controls="thesis-detail"
            id={`thesis-tab-${index}`}
          >
            <span className="thesis-node-number">{item.number}</span>
            <span className="thesis-node-signal">{item.signal}</span>
          </button>
        ))}
      </div>
      <div className="thesis-detail" id="thesis-detail" role="tabpanel" aria-labelledby={`thesis-tab-${active}`} aria-live="polite">
        <div className="thesis-detail-mark" aria-hidden="true">{thesis.number}</div>
        <div>
          <span className="thesis-detail-kicker">Perspective {thesis.number}</span>
          <h3>{thesis.title}</h3>
          <p className="thesis-detail-summary">{thesis.summary}</p>
          <p className="thesis-detail-body">{thesis.detail}</p>
        </div>
      </div>
    </div>
  );
}
