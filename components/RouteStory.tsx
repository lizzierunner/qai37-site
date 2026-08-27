"use client";

import { useState } from "react";

const MODES = {
  today: {
    label: "Today’s path",
    title: "Every turn carries the whole history",
    description: "As context grows, the application repeatedly moves more history through the same conventional path before it can answer.",
    steps: ["Prompt arrives", "History is re-read", "Answer returns"],
    metric: "Context grows → work repeats",
  },
  qai37: {
    label: "With qAI37",
    title: "Working memory stays close to the work",
    description: "qAI37 preserves the familiar application interface while the translation layer retains working context and routes supported operations to the best available backend.",
    steps: ["Request arrives", "State is remembered", "Operation is routed"],
    metric: "Interface stays → execution changes",
  },
} as const;

export default function RouteStory() {
  const [mode, setMode] = useState<keyof typeof MODES>("qai37");
  const story = MODES[mode];

  return (
    <section className="route-story-section">
      <div className="wrap">
        <div className="route-story-head">
          <div>
            <span className="sec-eyebrow reveal">The difference</span>
            <h2 className="reveal s1">Same question.<br />Different execution path.</h2>
          </div>
          <div className="route-story-switch reveal s2" role="group" aria-label="Compare execution paths">
            {(Object.keys(MODES) as Array<keyof typeof MODES>).map((key) => (
              <button type="button" key={key} className={mode === key ? "active" : ""} onClick={() => setMode(key)} aria-pressed={mode === key}>
                {MODES[key].label}
              </button>
            ))}
          </div>
        </div>

        <div className={`route-story-panel ${mode}`} aria-live="polite">
          <div className="route-story-copy">
            <span className="route-story-kicker">{story.label}</span>
            <h3>{story.title}</h3>
            <p>{story.description}</p>
            <span className="route-story-metric">{story.metric}</span>
          </div>
          <div className="route-story-path" aria-label={`${story.label} process`}>
            {story.steps.map((step, index) => (
              <div className="route-story-step" key={step}>
                <span className="route-story-step-number">0{index + 1}</span>
                <span>{step}</span>
                {index < story.steps.length - 1 && <span className="route-story-arrow" aria-hidden="true">→</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}