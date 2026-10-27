import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { NewsletterForm } from "@/components/NewsletterForm";
import { PostCard, formatDate } from "@/components/PostCard";
import { ShareBar } from "@/components/ShareBar";
import { Container, JsonLd, buttonClasses } from "@/components/ui";
import { getAllPosts, getPost, getRelatedPosts, tagLabels } from "@/lib/blog";
import { articleJsonLd, breadcrumbJsonLd, pageMeta } from "@/lib/seo";
import { absoluteUrl, site } from "@/lib/site";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return pageMeta({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.cover || undefined,
    type: "article",
    publishedTime: post.date,
    tags: post.tags,
  });
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();
  const related = getRelatedPosts(post, 3);
  const url = absoluteUrl(`/blog/${post.slug}`);
  const isLymph = post.tags.includes("lymphatic");

  return (
    <>
      <JsonLd
        data={[
          articleJsonLd({ title: post.title, description: post.excerpt, path: `/blog/${post.slug}`, image: post.cover, datePublished: post.date, tags: post.tags }),
          breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }, { name: post.title, path: `/blog/${post.slug}` }]),
        ]}
      />
      <article>
        <header>
          <Container className="max-w-3xl pb-8 pt-10 lg:pt-16">
            <div className="flex flex-wrap items-center gap-2 text-sm text-ink-soft">
              <Link href="/blog" className="font-semibold text-tide">
                Blog
              </Link>
              {post.tags.map((t) => (
                <Link key={t} href={`/blog/tag/${t}`} className="rounded-pill bg-white px-3 py-0.5 text-xs font-semibold ring-1 ring-line hover:ring-tide">
                  {tagLabels[t] ?? t}
                </Link>
              ))}
            </div>
            <h1 className="mt-4 text-3xl leading-tight sm:text-5xl">{post.title}</h1>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">{post.excerpt}</p>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-y border-line py-4 text-sm text-ink-soft">
              <div>
                By <Link href="/about" className="font-semibold text-ink">{post.author}</Link> · <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingMinutes} min read
              </div>
              <ShareBar url={url} title={post.title} />
            </div>
          </Container>
          {post.cover ? (
            <Container className="max-w-4xl">
              <div className="relative aspect-[16/9] overflow-hidden rounded-card bg-shell">
                <Image src={post.cover} alt={post.coverAlt} fill priority sizes="(min-width: 1024px) 896px, 100vw" className="object-cover" />
              </div>
            </Container>
          ) : null}
        </header>

        <Container className="mt-10 grid gap-12 lg:grid-cols-[1fr_17rem]">
          <div className="min-w-0">
            {post.migrationNote ? <p className="mb-6 rounded-card bg-matcha/30 p-4 text-sm">Editor&apos;s note: {post.migrationNote}</p> : null}
            <div className="prose-jw" dangerouslySetInnerHTML={{ __html: post.html }} />

            <div className="mt-12 rounded-card bg-shell p-6 sm:p-8">
              <p className="font-display text-2xl font-semibold">Want the routine that goes with this?</p>
              <p className="mt-2 text-ink-soft">
                {isLymph
                  ? "The two viral pressure points and my 2-minute morning lymphatic flush — free, in your inbox."
                  : "The two viral pressure points for bloat and my 2-minute morning routine — free, in your inbox."}
              </p>
              <NewsletterForm source={`post:${post.slug}`} tags={["lead:pressure-points"]} cta="Send it to me" className="mt-4" />
            </div>

            <p className="mt-8 text-xs leading-relaxed text-ink-soft">
              This post reflects Julia&apos;s personal experience and is not medical advice. Some links are affiliate links;
              Julia may earn a commission at no extra cost to you. Always talk to your doctor before trying a new
              supplement, cleanse or routine.
            </p>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              {post.headings.length > 2 ? (
                <nav aria-label="On this page" className="rounded-card bg-white p-5 ring-1 ring-line/60">
                  <p className="font-display text-sm font-semibold">On this page</p>
                  <ol className="mt-3 space-y-2 text-sm">
                    {post.headings
                      .filter((h) => h.depth === 2)
                      .slice(0, 12)
                      .map((h) => (
                        <li key={h.id}>
                          <a href={`#${h.id}`} className="text-ink-soft hover:text-tide">
                            {h.text}
                          </a>
                        </li>
                      ))}
                  </ol>
                </nav>
              ) : null}
              <div className="rounded-card bg-tide p-5 text-white">
                <p className="font-display text-lg font-semibold">The Lymphatic Reset Method™</p>
                <p className="mt-1 text-sm text-white/80">The 2-minute daily routine for puffiness, bloat and heavy legs.</p>
                <Link href="/the-lymphatic-reset-method" className={buttonClasses("matcha", "sm", "mt-4")}>
                  See what&apos;s inside
                </Link>
              </div>
              <div className="rounded-card bg-white p-5 ring-1 ring-line/60">
                <p className="font-display text-sm font-semibold">Follow along</p>
                <ul className="mt-2 space-y-1 text-sm">
                  {site.socials.slice(0, 3).map((s) => (
                    <li key={s.key}>
                      <a href={s.href} target="_blank" rel="noopener" className="text-tide hover:underline">
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </Container>
      </article>

      {related.length ? (
        <section className="mt-20 border-t border-line bg-shell py-16">
          <Container>
            <h2 className="text-2xl sm:text-3xl">Keep reading</h2>
            <div className="mt-8 grid gap-8 md:grid-cols-3">
              {related.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </Container>
        </section>
      ) : null}
    </>
  );
}
