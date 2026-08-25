"use client";

const ITEMS = [
  "Low power",
  "Massively scalable",
  "Quantum-native AI",
  "No software disruption",
  "Zero code changes",
  "Founded 2025",
  "13× the gap",
  "Hybrid architecture",
  "Unlimited AI",
  "Bend the curve",
];

export default function Ticker() {
  // Duplicate for seamless infinite scroll
  const doubled = [...ITEMS, ...ITEMS];
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-track">
        {doubled.map((item, i) => (
          <span key={i} className="ticker-item">
            {item}<span className="ticker-dot">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
