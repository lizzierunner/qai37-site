"use client";

import { useState } from "react";

const STATEMENTS = [
  { label: "Another quantum machine.", perspective: "qAI37 is focused on the software layer that helps applications reach different execution paths." },
  { label: "A replacement for the data center.", perspective: "The familiar application environment remains part of the picture." },
  { label: "A bet that one hardware vendor wins.", perspective: "The point of view is about keeping the path beneath the interface open and adaptable." },
  { label: "A bet against silicon.", perspective: "qAI37 explores another route where it is useful, alongside the systems teams already rely on." },
];

export default function PositioningExplorer() {
  const [active, setActive] = useState<number | null>(null);
  const statement = active === null ? null : STATEMENTS[active];

  return (
    <div className="positioning-explorer reveal" aria-label="What qAI37 is not">
      <div className="positioning-list">
        {STATEMENTS.map((item, index) => (
          <button
            type="button"
            key={item.label}
            className={`positioning-item ${active === index ? "active" : ""}`}
            onClick={() => setActive(active === index ? null : index)}
            aria-expanded={active === index}
            aria-controls="positioning-detail"
          >
            <span className="positioning-index">0{index + 1}</span>
            <span className="positioning-strike" aria-hidden="true" />
            <span className="positioning-label">{item.label}</span>
            <span className="positioning-toggle" aria-hidden="true">{active === index ? "-" : "+"}</span>
          </button>
        ))}
      </div>
      <div className={`positioning-detail ${statement ? "open" : ""}`} id="positioning-detail" aria-live="polite">
        <span className="positioning-detail-kicker">A clearer frame</span>
        <p>{statement ? statement.perspective : "Select a statement to explore the perspective behind qAI37's approach."}</p>
      </div>
    </div>
  );
}
