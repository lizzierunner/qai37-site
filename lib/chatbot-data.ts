// Client-side knowledge base for the "Ask qAI37" widget — no backend, no API keys.
export type ChatAnswer = {
  id: string;
  keywords: string[];
  answer: string;
  linkLabel?: string;
  linkUrl?: string;
};

export const CHAT_ANSWERS: ChatAnswer[] = [
  {
    id: "what-is-qai37",
    keywords: ["what", "qai37", "company", "about", "do", "does"],
    answer:
      "qAI37 is building a vendor-agnostic software layer between conventional AI applications and neutral-atom quantum systems — the neutral route to post-silicon AI.",
    linkLabel: "Read the mission",
    linkUrl: "/mission",
  },
  {
    id: "quantum-computer",
    keywords: ["quantum", "computer", "building", "hardware", "build"],
    answer:
      "No — qAI37 isn't building a quantum computer itself. We focus on the software access layer that connects AI workloads to suitable quantum hardware paths.",
    linkLabel: "See common questions",
    linkUrl: "/wiki#questions",
  },
  {
    id: "neutral-atom",
    keywords: ["neutral", "atom", "atoms", "modality"],
    answer:
      "A neutral-atom system is a quantum-computing modality that uses individually controlled neutral atoms as the underlying physical system. qAI37 is pursuing a vendor-agnostic layer so our software isn't dependent on one hardware provider.",
    linkLabel: "See key terms",
    linkUrl: "/wiki#terms",
  },
  {
    id: "hybrid",
    keywords: ["hybrid", "replace", "existing", "stack", "disrupt", "integrate"],
    answer:
      "The model is hybrid by design: teams keep their existing software interfaces and conventional execution, while eligible work can take an alternate route through neutral-atom systems.",
    linkLabel: "See the execution model",
    linkUrl: "/wiki#execution",
  },
  {
    id: "mission",
    keywords: ["mission", "why", "energy", "power", "sustainable", "grid"],
    answer:
      "AI compute demand is growing roughly 13x faster than energy supply. Our mission is unlimited, sustainable, cost-effective AI — bending the power curve with quantum-native infrastructure.",
    linkLabel: "Read the mission",
    linkUrl: "/mission",
  },
  {
    id: "team",
    keywords: ["team", "who", "founder", "ceo", "cto", "leadership", "people"],
    answer:
      "qAI37 is founded by Ted Stockwell (CEO), with Michelle Holtmann (President & Chief Strategy Officer), Steve Jahnke (CTO), and a team spanning Microsoft, Intel, Pasqal, and embedded-systems veterans.",
    linkLabel: "Meet the team",
    linkUrl: "/team",
  },
  {
    id: "contact",
    keywords: ["contact", "email", "reach", "talk", "touch", "call"],
    answer: "You can reach the founding team directly at contact@qai37.com.",
    linkLabel: "Contact page",
    linkUrl: "/contact",
  },
  {
    id: "news",
    keywords: ["news", "announcement", "press", "latest", "update"],
    answer: "Company announcements and neutral-atom industry news are posted on our News page.",
    linkLabel: "See News",
    linkUrl: "/news",
  },
  {
    id: "join",
    keywords: ["join", "career", "job", "hiring", "work", "invest", "partner"],
    answer:
      "We're building the foundation for the next generation of AI infrastructure. Reach out or sign up to be the first to know as things come to light.",
    linkLabel: "Join us",
    linkUrl: "/mission#join",
  },
  {
    id: "wiki",
    keywords: ["wiki", "glossary", "terms", "post-silicon", "context", "definition"],
    answer:
      "The Wiki has a plain-language map of qAI37's ideas, terms, and architecture — including \"post-silicon AI\" and \"working context.\"",
    linkLabel: "Open the Wiki",
    linkUrl: "/wiki",
  },
];

export const CHAT_SUGGESTIONS = [
  "What is qAI37?",
  "Are you building a quantum computer?",
  "Who's on the team?",
  "How do I get in touch?",
];

export function findChatAnswer(input: string): ChatAnswer | undefined {
  const normalized = input.toLowerCase();
  let best: ChatAnswer | undefined;
  let bestScore = 0;

  for (const entry of CHAT_ANSWERS) {
    const score = entry.keywords.reduce(
      (count, keyword) => (normalized.includes(keyword) ? count + 1 : count),
      0
    );
    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  }

  return bestScore > 0 ? best : undefined;
}
