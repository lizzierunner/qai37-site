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
    keywords: ["qai37", "startup", "product"],
    answer:
      "qAI37 is building a vendor-agnostic software layer between conventional AI applications and neutral-atom quantum systems — the neutral route to post-silicon AI.",
    linkLabel: "Read the mission",
    linkUrl: "/mission",
  },
  {
    id: "quantum-computer",
    keywords: ["quantum", "computer", "hardware"],
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
    keywords: ["hybrid", "disrupt", "disrupting", "integrate", "replace"],
    answer:
      "The model is hybrid by design: teams keep their existing software interfaces and conventional execution, while eligible work can take an alternate route through neutral-atom systems.",
    linkLabel: "See the execution model",
    linkUrl: "/wiki#execution",
  },
  {
    id: "mission",
    keywords: ["mission", "energy", "sustainable", "grid"],
    answer:
      "AI compute demand is growing roughly 13x faster than energy supply. Our mission is unlimited, sustainable, cost-effective AI — bending the power curve with quantum-native infrastructure.",
    linkLabel: "Read the mission",
    linkUrl: "/mission",
  },
  {
    id: "team",
    keywords: ["team", "founder", "founders", "founded", "ceo", "cto", "leadership"],
    answer:
      "qAI37 is founded by Ted Stockwell (CEO), with Michelle Holtmann (President & Chief Strategy Officer), Steve Jahnke (CTO), and a team spanning Microsoft, Intel, Pasqal, and embedded-systems veterans.",
    linkLabel: "Meet the team",
    linkUrl: "/team",
  },
  {
    id: "contact",
    keywords: ["contact", "email", "reach", "touch"],
    answer: "You can reach the founding team directly at contact@qai37.com.",
    linkLabel: "Contact page",
    linkUrl: "/contact",
  },
  {
    id: "news",
    keywords: ["news", "announcement", "press"],
    answer: "Company announcements and neutral-atom industry news are posted on our News page.",
    linkLabel: "See News",
    linkUrl: "/news",
  },
  {
    id: "join",
    keywords: ["career", "hiring", "invest", "investors", "partner"],
    answer:
      "We're building the foundation for the next generation of AI infrastructure. Reach out or sign up to be the first to know as things come to light.",
    linkLabel: "Join us",
    linkUrl: "/mission#join",
  },
  {
    id: "wiki",
    keywords: ["wiki", "glossary", "post-silicon", "context"],
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
  // Keep both the hyphenated token ("post-silicon") and its split parts ("neutral", "atom")
  // so compound and separate-word keywords both still match.
  const rawTokens = input.toLowerCase().match(/[a-z0-9'-]+/g) ?? [];
  const tokens = new Set<string>();
  for (const t of rawTokens) {
    tokens.add(t);
    for (const part of t.split("-")) {
      if (part) tokens.add(part);
    }
  }
  let best: ChatAnswer | undefined;
  let bestRatio = 0;

  for (const entry of CHAT_ANSWERS) {
    const matched = entry.keywords.filter((keyword) => tokens.has(keyword)).length;
    if (matched === 0) continue;
    // Ratio, not raw count, so a short list of precise keywords can outrank a longer one.
    const ratio = matched / entry.keywords.length;
    if (ratio > bestRatio) {
      bestRatio = ratio;
      best = entry;
    }
  }

  return best;
}
