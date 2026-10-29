import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOG_POSTS, getAdjacentPosts, getBlogPost, getReadingMinutes } from "@/lib/blog-data";

type BlogArticleProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return BLOG_POSTS.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: BlogArticleProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: "Article not found" };
  const image = `/images/og/${post.slug}.png`;
  return {
    title: post.title,
    description: post.subtitle,
    alternates: { canonical: `/blog/${post.slug}/` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.subtitle,
      url: `/blog/${post.slug}/`,
      authors: ["The qAI37 team"],
      images: [{ url: image, width: 1200, height: 630, alt: post.title }],
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.subtitle, images: [image] },
  };
}

export default async function BlogArticle({ params }: BlogArticleProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();
  const { newer, older } = getAdjacentPosts(slug);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.subtitle,
    mainEntityOfPage: `https://www.qai37.com/blog/${post.slug}/`,
    author: { "@type": "Organization", name: "qAI37" },
    publisher: { "@type": "Organization", name: "qAI37", url: "https://www.qai37.com" },
  };

  return (
    <article className="p-blog-article">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <header className="article-intro">
        <div className="wrap article-wrap">
          <Link href="/blog" className="article-back">← All posts</Link>
          <span className="eyebrow reveal">qAI37 · Substack · {getReadingMinutes(post)} min read</span>
          <h1 className="reveal s1">{post.title}</h1>
          <p className="article-subtitle reveal s2">{post.subtitle}</p>
        </div>
      </header>
      <div className="article-body">
        <div className="wrap article-wrap">
          {post.sections.map((section, index) => (
            <section className="article-section" key={`${section.heading ?? "opening"}-${index}`}>
              {section.heading && <h2>{section.heading}</h2>}
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </section>
          ))}
          {post.externalLink && (
            <p className="article-external-link">
              <a href={post.externalLink.url} target="_blank" rel="noopener noreferrer">
                {post.externalLink.label}
              </a>
            </p>
          )}
          <p className="article-signoff">- The qAI37 team</p>
          {(newer || older) && (
            <nav className="article-pager" aria-label="More posts">
              {older ? (
                <Link href={`/blog/${older.slug}`} rel="prev">
                  <span>← Previous</span>
                  {older.title}
                </Link>
              ) : <span />}
              {newer ? (
                <Link href={`/blog/${newer.slug}`} rel="next" className="article-pager-next">
                  <span>Next →</span>
                  {newer.title}
                </Link>
              ) : <span />}
            </nav>
          )}
          <Link href="/blog" className="article-back article-back-bottom">← Back to all posts</Link>
        </div>
      </div>
    </article>
  );
}