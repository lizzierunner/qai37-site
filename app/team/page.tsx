import type { Metadata } from "next";
import Link from "next/link";
import MemberAvatar from "@/components/MemberAvatar";

export const metadata: Metadata = {
  title: "Team",
  description:
    "The people behind qAI37: leaders across quantum computing, AI, data-center infrastructure, and enterprise software building the next generation of AI infrastructure.",
};

function LinkedIn() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.4 20.4h-3.6v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9v5.7H9.2V9h3.4v1.6h.1c.5-.9 1.7-1.9 3.4-1.9 3.6 0 4.3 2.4 4.3 5.5v6.2zM5.3 7.4a2.1 2.1 0 110-4.2 2.1 2.1 0 010 4.2zM7.1 20.4H3.5V9h3.6v11.4zM22.2 0H1.8C.8 0 0 .8 0 1.7v20.6c0 .9.8 1.7 1.8 1.7h20.4c1 0 1.8-.8 1.8-1.7V1.7c0-.9-.8-1.7-1.8-1.7z" /></svg>
  );
}

type Member = { name: string; role: string; initials: string; img: string; bio: string; li: string };

const FOUNDER: Member = {
  name: "Ted Stockwell", role: "CEO & Founder", initials: "TS",
  img: "https://www.qai37.com/images/ted-stockwell.jpeg",
  bio: "Technology leader and entrepreneur across AI, quantum computing, and enterprise software, with a track record of building companies and leading teams from zero to scale.",
  li: "https://www.linkedin.com/in/jtedstockwell/",
};

const TEAM: Member[] = [
  { name: "John Williams", role: "Chief Product Officer", initials: "JW", img: "https://www.qai37.com/images/john-williams.jpeg",
    bio: "Product leader spanning enterprise and high-performance computing and data-center infrastructure, focused on solutions that disrupt markets and outpace what customers expect.",
    li: "https://www.linkedin.com/in/johnwilliams68/" },
  { name: "Rupesh Srivastava", role: "VP of Quantum Engineering", initials: "RS", img: "https://www.qai37.com/images/rupesh-srivastava.jpeg",
    bio: "Quantum computing specialist developing the algorithms and architectures that bridge quantum mechanics and practical AI.",
    li: "https://www.linkedin.com/in/rupesh-srivastava/" },
  { name: "Vicki Mitchell", role: "VP of Software Engineering", initials: "VM", img: "https://www.qai37.com/images/vicki-mitchell.jpeg",
    bio: "Engineering leader who builds and scales the teams that ship hard technology, with deep roots in software development and delivery.",
    li: "https://www.linkedin.com/in/vickibmitchell/" },
  { name: "Laverne Masaki", role: "Chief People Officer", initials: "LM", img: "https://www.qai37.com/images/laverne-masaki.jpeg",
    bio: "People leader and executive recruiter who builds the culture and talent density that lets hard engineering happen — from org design to inclusive hiring.",
    li: "https://www.linkedin.com/in/laverne-masaki/" },
];

export default function Team() {
  return (
    <div className="p-team">
      <section className="intro">
        <div className="wrap">
          <span className="eyebrow reveal">The team</span>
          <h1 className="reveal s1">The people teaching AI to run on less.</h1>
          <p className="lede reveal s2">qAI37 brings together leaders across quantum computing, artificial intelligence, and data-center infrastructure — the rare mix the problem actually demands.</p>
          <div className="domains reveal s3">
            <span className="domain"><b>Quantum</b> computing</span>
            <span className="domain"><b>Artificial</b> intelligence</span>
            <span className="domain"><b>Data-center</b> infrastructure</span>
            <span className="domain"><b>Enterprise</b> software</span>
          </div>
        </div>
      </section>

      <section className="people">
        <div className="wrap">
          <div className="featured reveal">
            <MemberAvatar src={FOUNDER.img} alt={FOUNDER.name} initials={FOUNDER.initials} />
            <div>
              <div className="role mono">{FOUNDER.role}</div>
              <h2>{FOUNDER.name}</h2>
              <p>{FOUNDER.bio}</p>
              <Link className="li" href={FOUNDER.li} target="_blank" rel="noopener"><LinkedIn /> LinkedIn</Link>
            </div>
          </div>

          <div className="grid">
            {TEAM.map((m, i) => (
              <article key={m.name} className={`card reveal${i % 2 ? " s1" : ""}`}>
                <MemberAvatar src={m.img} alt={m.name} initials={m.initials} />
                <div>
                  <div className="role">{m.role}</div>
                  <h3>{m.name}</h3>
                  <p>{m.bio}</p>
                  <Link className="li" href={m.li} target="_blank" rel="noopener"><LinkedIn /> LinkedIn</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="hire" id="join">
        <div className="wrap">
          <span className="eyebrow reveal">Join us</span>
          <h2 className="reveal s1">We&apos;re hiring the people who&apos;ll build the rest of it.</h2>
          <p className="reveal s2">If bending the power curve of AI sounds like your kind of problem, we&apos;d like to hear from you.</p>
          <Link className="btn reveal s2" href="mailto:careers@qai37.com">See open roles</Link>
        </div>
      </section>
    </div>
  );
}
