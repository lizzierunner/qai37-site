import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join qAI37 and help build the next generation of AI infrastructure by solving the power and cost bottleneck holding modern AI back.",
};

const pillars = [
  {
    title: "Solve a real bottleneck",
    text: "We’re building the foundation for the next generation of AI by attacking the core constraint on compute: power and cost.",
  },
  {
    title: "Learn fast, build hard",
    text: "The work is technical, the pace is real, and the people in the room are expected to move quickly with clarity and conviction.",
  },
  {
    title: "Work with people who have done it before",
    text: "qAI37 brings together leaders across quantum computing, AI, infrastructure, and enterprise software — a rare mix for a problem this hard.",
  },
];

const roles = [
  {
    title: "Quantum research",
    text: "Algorithms, systems, and architectures that connect quantum computing with practical AI workloads.",
  },
  {
    title: "Hardware & systems",
    text: "From low-level engineering to system integration, validation, and deployment of energy-efficient compute stacks.",
  },
  {
    title: "Software & AI",
    text: "Build the software layers, models, and tooling that unlock hybrid quantum-AI performance in real environments.",
  },
  {
    title: "Product & strategy",
    text: "Translate customer pain, technical reality, and market opportunity into a roadmap the team can actually execute.",
  },
];

const leaders = [
  { name: "Ted Stockwell", role: "CEO & Founder" },
  { name: "John Williams", role: "Chief Product Officer" },
  { name: "Rupesh Srivastava", role: "VP of Quantum Engineering" },
  { name: "Vicki Mitchell", role: "VP of Software Engineering" },
  { name: "Laverne Masaki", role: "Chief People Officer" },
];

export default function Careers() {
  return (
    <div className="p-careers">
      <section className="careers-hero wrap">
        <div className="careers-copy">
          <span className="eyebrow reveal">Join us</span>
          <h1 className="reveal s1">Build the infrastructure that lets AI scale without breaking the grid.</h1>
          <p className="lede reveal s2">
            qAI37 is building quantum-native AI infrastructure to bend the power curve and make artificial intelligence sustainable, scalable, and cost-effective.
          </p>
          <div className="careers-actions reveal s3">
            <a className="btn" href="mailto:careers@qai37.com">Apply now</a>
            <Link className="btn secondary" href="/mission">Learn our mission</Link>
          </div>
        </div>

        <aside className="careers-aside reveal s2" aria-label="Quick facts">
          <div className="stat-block">
            <span className="label">The problem</span>
            <strong>13×</strong>
            <span className="detail">AI compute demand is growing faster than the grid can keep up.</span>
          </div>
          <div className="stat-block">
            <span className="label">The goal</span>
            <strong>Unlimited</strong>
            <span className="detail">Power-efficient AI infrastructure built for the next wave of growth.</span>
          </div>
        </aside>
      </section>

      <section className="careers-overview wrap">
        <div className="section-head reveal">
          <span className="eyebrow">Why qAI37</span>
          <h2>We’re solving a problem that affects every AI company.</h2>
        </div>

        <div className="pillars-grid">
          {pillars.map((item, index) => (
            <article key={item.title} className={`pillar-card reveal${index > 0 ? ` s${index}` : ""}`}>
              <span className="card-index">0{index + 1}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="careers-roles wrap">
        <div className="section-head reveal">
          <span className="eyebrow">What we’re building</span>
          <h2>We need people who are comfortable working on the hardest part of the stack.</h2>
        </div>

        <div className="role-grid">
          {roles.map((role, index) => (
            <article key={role.title} className={`role-card reveal${index > 0 ? ` s${index}` : ""}`}>
              <span className="role-tag">Focus area</span>
              <h3>{role.title}</h3>
              <p>{role.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="careers-team wrap">
        <div className="section-head reveal">
          <span className="eyebrow">The people</span>
          <h2>The team brings together quantum, AI, infrastructure, and operating experience.</h2>
        </div>

        <div className="leader-grid">
          {leaders.map((leader, index) => (
            <div key={leader.name} className={`leader reveal${index > 0 ? ` s${index}` : ""}`}>
              <span className="leader-role">{leader.role}</span>
              <h3>{leader.name}</h3>
            </div>
          ))}
        </div>
      </section>

      <section className="careers-cta wrap">
        <div className="cta-panel reveal">
          <span className="eyebrow">Get in touch</span>
          <h2>If this sounds like the kind of problem you want to work on, we’d love to hear from you.</h2>
          <p>
            We’re hiring people who want to help build the next generation of AI infrastructure — with a bias toward curiosity, speed, and technical rigor.
          </p>
          <div className="careers-actions">
            <a className="btn" href="mailto:careers@qai37.com">careers@qai37.com</a>
            <Link className="btn secondary" href="/team">Meet the team</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
