import type { Metadata } from "next";
import TeamAvatar from "@/components/TeamAvatar";
import { BASE_PATH } from "@/lib/basePath";

export const metadata: Metadata = {
  title: "Team",
  description:
    "The people behind qAI37 — leaders in infrastructure software, processor architecture, quantum computing, and enterprise engineering.",
};

type Member = {
  name: string;
  role: string;
  bio: string;
  img?: string;
  initials: string;
  li?: string;
  signal: string;
};
const TEAM: Member[] = [
  {
    name: "Ted Stockwell",
    role: "Founder & CEO",
    initials: "TS",
    img: `${BASE_PATH}/images/team/ted-stockwell.jpg`,
    bio: "Former General Manager of Microsoft's Online Services Division. Created Bing as a Platform, transforming search into a programmable infrastructure layer across Microsoft. Ted has spent his career turning hard infrastructure problems into platform businesses — that is exactly the commercial motion qAI37 needs to execute.",
    signal: "Microsoft · Online Services · Platform businesses",
    li: "https://www.linkedin.com/in/jtedstockwell/",
  },
  {
    name: "Michelle Holtmann",
    role: "President & Chief Strategy Officer",
    initials: "MH",
    img: `${BASE_PATH}/images/team/michelle-holtmann.jpg`,
    bio: "Michelle started her career as a software engineer at Boeing, then spent 25 years at Microsoft designing and building infrastructure products that hundreds of millions of people depend on every day — including Windows Genuine Advantage, the Software Protection Platform, and the technical foundation behind Windows Defender. She joined qAI37 after extensive study of whether the approach was actually buildable, and designed the roadmap to prove it.",
    signal: "Boeing · Microsoft · Infrastructure products",
  },
  {
    name: "Steve Jahnke",
    role: "CTO / Principal Architect",
    initials: "SJ",
    img: `${BASE_PATH}/images/team/steve-jahnke.jpg`,
    bio: "Steve spent 30 years at Intel, Altera, and TI building processor architecture and systems software engineered to never go down. The translation-layer problem qAI37 is solving is the same class of problem Steve has spent his career solving in silicon.",
    signal: "Intel · Altera · TI · Processor architecture",
  },
  {
    name: "Laverne Masaki",
    role: "Chief People Officer",
    initials: "LM",
    img: `${BASE_PATH}/images/team/laverne-masaki.jpg`,
    bio: "Former executive recruiter at Microsoft and Google, specializing in building senior technical teams for complex, high-stakes programs. Laverne's network and judgment are a core operational asset at a company whose execution depends entirely on assembling the right people at the right moment.",
    signal: "Microsoft · Google · Technical recruiting",
    li: "https://www.linkedin.com/in/laverne-masaki/",
  },
  {
    name: "Vincent E. Elfving",
    role: "Chief Quantum Advisor",
    initials: "VE",
    img: `${BASE_PATH}/images/team/vincent-elfving.jpg`,
    bio: "Former Head of Algorithms at Pasqal, where he led a team of over 40 researchers developing AI workflows for neutral atom hardware. Google Quantum AI alumnus and co-founder of Qu & Co (merged with Pasqal). PhD in Quantum Information Processing.",
    signal: "Pasqal · Google Quantum AI · PhD",
  },
  {
    name: "Rick Jahnke",
    role: "Principal Engineer",
    initials: "RJ",
    img: `${BASE_PATH}/images/team/Team%20Photos/Rick.jpg`,
    bio: "Rick has 30 years of experience at the intersection of embedded systems, heterogeneous computing, and advanced system architecture. He was Director of Engineering at Galixsys Networks and holds 24 patents across heterogeneous computing, SoC design, and embedded systems.",
    signal: "30 years · 24 patents · Heterogeneous computing",
  },
  {
    name: "Ruben Marroquin",
    role: "Senior Engineer",
    initials: "RM",
    img: `${BASE_PATH}/images/team/ruben-marroquin.jpg`,
    bio: "Ruben is an FPGA and embedded systems engineer with experience at Intel and Altera and holds a BS in Electrical Engineering from Rice University.",
    signal: "Intel · Altera · Rice University",
  },
];

type ExtendedMember = {
  name: string;
  role: string;
  bio: string;
};

const EXTENDED_TEAM: ExtendedMember[] = [
  {
    name: "Gregor Barry",
    role: "Advisor",
    bio: "Managing Director, Accenture, Toronto — twelve years in enterprise relationships with Fortune 500 clients.",
  },
  {
    name: "Vicki Mitchell",
    role: "Advisor",
    bio: "Former VP of Engineering at Google, ARM, Altera, and Intel, where she led large-scale silicon, systems, and infrastructure engineering programs across global organizations. Featured in the inaugural Top 100 List of senior women leaders in engineering, Vicki has spent her career at the intersection of hardware and software, including instruction sets, programmable hardware, and full-stack infrastructure engineering.",
  },
  {
    name: "Rupesh Srivastava",
    role: "Quantum Advisor",
    bio: "PhD in Physics, Royal Holloway, University of London. Five years developing the UK quantum-computing ecosystem at Oxford's Department of Physics (the NQIT and QCS national quantum technology hubs, 2016–2021). Chief Quantum Officer, Entangled Positions.",
  },
  {
    name: "John Williams",
    role: "Strategic Advisor",
    bio: "Strategic advisor to qAI37.",
  },
];

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
        <div className="wrap">
          <span className="eyebrow reveal">The team</span>
          <h1 className="reveal s1">The people building it.</h1>
        </div>
      </section>

      <section>
        <div className="wrap bio-list">
          {TEAM.map((m) => (
            <div key={m.name} className="bio-row reveal">
              <div className="bio-left">
                <TeamAvatar img={m.img} name={m.name} initials={m.initials} />
                <div className="bio-meta">
                  <p className="bio-name">{m.name}</p>
                  <p className="bio-role">{m.role}</p>
                  <p className="bio-signal">{m.signal}</p>
                  {m.li && (
                    <a href={m.li} target="_blank" rel="noopener noreferrer" className="bio-li">
                      <LinkedInIcon /> LinkedIn
                    </a>
                  )}
                </div>
              </div>
              <p className="bio-body">{m.bio}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="advisory-section">
        <div className="wrap">
          <span className="eyebrow reveal">Extended team</span>
          <div className="extended-list">
            {EXTENDED_TEAM.map((m) => (
              <div key={m.name} className="bio-row reveal">
                <div className="bio-meta">
                  <p className="bio-name">{m.name}</p>
                  <p className="bio-role">{m.role}</p>
                </div>
                <p className="bio-body">{m.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
