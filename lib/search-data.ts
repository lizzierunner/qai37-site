import { NEWS } from "./news-data";

export type SearchItem = {
  id: string;
  category: "Navigation" | "News";
  title: string;
  subtitle: string;
  url: string;
  keywords?: string;
  isExternal?: boolean;
};

export const SEARCH_ITEMS: SearchItem[] = [
  { id: "nav-home", category: "Navigation", title: "Home", subtitle: "A new software layer for AI infrastructure", url: "/" },
  { id: "nav-wiki", category: "Navigation", title: "Wiki", subtitle: "qAI37 terms, architecture, and common questions", url: "/wiki" },
  { id: "nav-team", category: "Navigation", title: "Team", subtitle: "Leadership, engineers, and scientific advisors", url: "/team" },
  { id: "nav-news", category: "Navigation", title: "News", subtitle: "Company announcements & neutral-atom industry updates", url: "/news" },
  { id: "nav-contact", category: "Navigation", title: "Contact", subtitle: "Get in touch with the qAI37 founding team", url: "/contact" },
  ...NEWS.map((post, index) => ({
    id: `news-${index}`,
    category: "News" as const,
    title: post.title,
    subtitle: `${post.date} · ${post.type.toUpperCase()} NEWS`,
    url: post.url,
    isExternal: true,
  })),
];

function normalize(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

export function searchSite(query: string): SearchItem[] {
  const normalized = normalize(query);
  if (!normalized) return SEARCH_ITEMS.slice(0, 8);
  const terms = normalized.split(" ");

  return SEARCH_ITEMS.map((item) => {
    const title = normalize(item.title);
    const subtitle = normalize(item.subtitle);
    const searchable = `${title} ${subtitle} ${normalize(item.category)} ${normalize(item.keywords ?? "")}`;
    if (!terms.every((term) => searchable.includes(term))) return { item, score: 0 };
    const score = (title === normalized ? 1000 : title.startsWith(normalized) ? 300 : 0)
      + terms.reduce((total, term) => total + (title.includes(term) ? 10 : subtitle.includes(term) ? 3 : 1), 0);
    return { item, score };
  })
    .filter((result) => result.score > 0)
    .sort((first, second) => second.score - first.score)
    .map((result) => result.item);
}