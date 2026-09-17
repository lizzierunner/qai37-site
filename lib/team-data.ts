import { BASE_PATH } from "./basePath";

export const TEAM_INTRO =
  "A focused group spanning infrastructure software, processor architecture, quantum computing, product strategy, and company building.";

type Member = {
  name: string;
  role: string;
  bio: string;
  img?: string;
  initials: string;
  li?: string;
  signal: string;
};

export const TEAM: Member[] = [
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
    role: "Founding Advisor, Product & Strategic Partnerships",
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
    name: "Vincent E. Elfving",
    role: "Chief Quantum Advisor",
    initials: "VE",
    img: `${BASE_PATH}/images/team/vincent-elfving.jpg`,
    bio: "Former Head of Algorithms at Pasqal, where he led a team of over 40 researchers developing AI workflows for neutral atom hardware. Google Quantum AI alumnus and co-founder of Qu & Co (merged with Pasqal). PhD in Quantum Information Processing.",
    signal: "Pasqal · Google Quantum AI · PhD",
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
  {
    name: "Rupesh Srivastava",
    role: "Quantum Advisor",
    initials: "RS",
    img: `${BASE_PATH}/images/team/rupesh-srivastava.jpg`,
    bio: "PhD in Physics, Royal Holloway, University of London. Five years developing the UK quantum-computing ecosystem at Oxford's Department of Physics (the NQIT and QCS national quantum technology hubs, 2016–2021). Chief Quantum Officer, Entangled Positions.",
    signal: "Oxford · UK Quantum Ecosystem · PhD",
  },
];

type ExtendedMember = {
  name: string;
  role: string;
  bio: string;
  img?: string;
  initials?: string;
};

export const EXTENDED_TEAM: ExtendedMember[] = [
  {
    name: "Richard Wood",
    role: "Advisor",
    initials: "RW",
    img: `${BASE_PATH}/images/team/Team%20Photos/Richard%20Wood.jpeg`,
    bio: "Richard has more than 30 years of investment banking experience spanning both boutique and middle market firms. He co-founded First Hill Partners in 2010.",
  },
  {
    name: "Vicki Mitchell",
    role: "Advisor",
    initials: "VM",
    img: `${BASE_PATH}/images/team/vicki-mitchell.jpg`,
    bio: "Former VP of Engineering at Google, ARM, Altera, and Intel, where she led large-scale silicon, systems, and infrastructure engineering programs across global organizations. Featured in the inaugural Top 100 List of senior women leaders in engineering, Vicki has spent her career at the intersection of hardware and software, including instruction sets, programmable hardware, and full-stack infrastructure engineering.",
  },
  {
    name: "John Williams",
    role: "Strategic Advisor",
    initials: "JW",
    img: `${BASE_PATH}/images/team/Team%20Photos/john-williams.jpeg`,
    bio: "Technical executive in product management and marketing in cloud computing, compute systems, semiconductors, and software.",
  },
  {
    name: "Lizzie Johnson",
    role: "Web Engineering Intern",
    initials: "LJ",
    img: `${BASE_PATH}/images/team/Team%20Photos/Lizzie%20Johnson.jpeg`,
    bio: "Lizzie Johnson is a Web Engineering Intern at qAI37 and a Full Stack Web Development student at Arizona State University passionate about web development, design, and creative problem-solving.",
  },
];