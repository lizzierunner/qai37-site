import SignupForm from "@/components/SignupForm";

const ROSTER = [
  { name: "Ted Stockwell", role: "Founder & CEO" },
  { name: "Michelle Holtmann", role: "President & Chief Strategy Officer" },
  { name: "Steve Jahnke", role: "Chief Technical Officer" },
  { name: "Laverne Masaki", role: "Chief People Officer" },
  { name: "Rick Jahnke", role: "Principal Engineer" },
  { name: "Ruben Marroquin", role: "Senior Engineer" },
];

export default function Home() {
  return (
    <div className="p-home">
      {/* HERO */}
      <section className="hero">
        <div className="wrap">
          <h1 className="rise d1">A new software layer for AI infrastructure.</h1>
          <p className="lede rise d2">
            Every time you ask AI a question, it re-reads everything you&apos;ve given it
            before it answers. The more it knows, the slower and more expensive every
            answer gets, which is why AI stalls exactly where it becomes most valuable:
            long, live, complicated work. We&apos;re building the software layer that
            changes that math.
          </p>
          <div className="rise d3">
            <SignupForm />
          </div>
        </div>
      </section>

      {/* TEAM ROSTER */}
      <section className="roster-section" id="team">
        <div className="wrap">
          <span className="eyebrow reveal">The team</span>
          <div className="roster">
            {ROSTER.map((m) => (
              <div key={m.name} className="roster-item reveal">
                <span className="roster-name">{m.name}</span>
                <span className="roster-role">{m.role}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-band" id="join">
        <div className="wrap">
          <h2 className="reveal">Stay in the loop.</h2>
          <p className="sec-lede reveal s1">Early access and founding updates when we&apos;re ready to talk.</p>
          <div className="reveal s1"><SignupForm centered /></div>
        </div>
      </section>
    </div>
  );
}
