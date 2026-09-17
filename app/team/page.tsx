import type { Metadata } from "next";
import TeamAvatar from "@/components/TeamAvatar";
import { TEAM, EXTENDED_TEAM, TEAM_INTRO } from "@/lib/team-data";

export const metadata: Metadata = {
  title: "Team",
  description: TEAM_INTRO,
};

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.4 20.4h-3.6v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9v5.7H9.2V9h3.4v1.6h.1c.5-.9 1.7-1.9 3.4-1.9 3.6 0 4.3 2.4 4.3 5.5v6.2zM5.3 7.4a2.1 2.1 0 110-4.2 2.1 2.1 0 010 4.2zM7.1 20.4H3.5V9h3.6v11.4zM22.2 0H1.8C.8 0 0 .8 0 1.7v20.6c0 .9.8 1.7 1.8 1.7h20.4c1 0 1.8-.8 1.8-1.7V1.7c0-.9-.8-1.7-1.8-1.7z" />
    </svg>
  );
}

export default function Team() {
  return (
    <div className="p-team2">
      <section className="bio-intro">
        <div className="wrap team-hero-grid">
          <div>
            <span className="eyebrow reveal">The team</span>
            <h1 className="reveal s1">The people building it.</h1>
          </div>
          <div className="team-hero-side reveal s2">
            <p>{TEAM_INTRO}</p>
            <div className="team-sort" aria-label="Team sections">
              <span>Sort by</span>
              <a href="#core-team">Core team</a>
              <a href="#extended-team">Extended team</a>
            </div>
          </div>
        </div>
      </section>

      <section className="team-grid-section" id="core-team">
        <div className="wrap">
          <div className="team-section-head reveal">
            <span className="team-section-label">Core team</span>
            <p>{TEAM.length} people</p>
          </div>
          <div className="team-card-grid">
            {TEAM.map((m, i) => (
              <article key={m.name} className="team-card reveal" style={{ "--i": i } as React.CSSProperties}>
                <TeamAvatar img={m.img} name={m.name} initials={m.initials} />
                <div className="team-card-copy">
                  <p className="team-card-name">{m.name}</p>
                  <p className="team-card-role">{m.role}</p>
                  <p className="team-card-signal">{m.signal}</p>
                  <p className="team-card-bio">{m.bio}</p>
                  {m.li && (
                    <a href={m.li} target="_blank" rel="noopener noreferrer" className="bio-li">
                      <LinkedInIcon /> LinkedIn
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="team-grid-section advisory-section" id="extended-team">
        <div className="wrap">
          <div className="team-section-head reveal">
            <span className="team-section-label">Extended team</span>
            <p>{EXTENDED_TEAM.filter((m) => m.role.includes("Advisor")).length} advisors</p>
          </div>
          <div className="team-card-grid extended-grid">
            {EXTENDED_TEAM.map((m, i) => (
              <article key={m.name} className="team-card reveal" style={{ "--i": i } as React.CSSProperties}>
                {m.img && <TeamAvatar img={m.img} name={m.name} initials={m.initials ?? ""} />}
                <div className="team-card-copy">
                  <p className="team-card-name">{m.name}</p>
                  <p className="team-card-role">{m.role}</p>
                  <p className="team-card-bio">{m.bio}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
