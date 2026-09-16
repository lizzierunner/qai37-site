// Rubidium-87 nod: 3 tilted orbitals with electrons in motion — qAI37's chat glyph.
const ORBIT_PATH = "M 36,20 A 16,6 0 1,1 4,20 A 16,6 0 1,1 36,20";

export default function AtomIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <circle cx="20" cy="20" r="3" fill="currentColor" />
      {[0, 60, 120].map((angle, i) => (
        <g key={angle} transform={`rotate(${angle} 20 20)`}>
          <ellipse cx="20" cy="20" rx="16" ry="6" fill="none" stroke="currentColor" strokeOpacity="0.45" strokeWidth="1" />
          <circle r="2" fill="currentColor">
            <animateMotion dur={`${3 + i}s`} repeatCount="indefinite" path={ORBIT_PATH} />
          </circle>
        </g>
      ))}
    </svg>
  );
}
