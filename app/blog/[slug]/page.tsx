import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOG_POSTS, getBlogPost } from "@/lib/blog-data";

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
  return { title: post.title, description: post.subtitle };
}

export default async function BlogArticle({ params }: BlogArticleProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  return (
    <article className="p-blog-article">
      <header className="article-intro">
        <div className="wrap article-wrap">
          <Link href="/blog" className="article-back">← All posts</Link>
          <span className="eyebrow reveal">qAI37 · Substack</span>
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
          <p className="article-signoff">- The qAI37 team</p>
          <Link href="/blog" className="article-back article-back-bottom">← Back to all posts</Link>
        </div>
      </div>
    </article>
  );
}