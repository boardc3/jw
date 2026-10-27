import Link from "next/link";
import { PostCard } from "@/components/PostCard";
import { Container, JsonLd, SectionHeading } from "@/components/ui";
import { getAllPosts, getAllTags } from "@/lib/blog";
import { breadcrumbJsonLd, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Blog — lymphatic drainage, IBS, gut health & honest product reviews",
  description:
    "Julia Warter's blog: root-cause stories about IBS, liver and gallbladder health, lymphatic drainage routines, low-FODMAP done right, and brutally honest reviews of gut-health products.",
  path: "/blog",
});

export default async function BlogIndex({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;
  const all = getAllPosts();
  const query = (q ?? "").trim().toLowerCase();
  const posts = query
    ? all.filter((p) => `${p.title} ${p.excerpt} ${p.tags.join(" ")}`.toLowerCase().includes(query))
    : all;
  const [lead, ...rest] = posts;
  const tags = getAllTags();

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }])} />
      <section>
        <Container className="pb-8 pt-10 lg:pt-16">
          <SectionHeading as="h1" title="The blog" intro="Root-cause stories, brutal reviews, and the things that actually moved the needle — written from eight years of living it." />
          <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <nav className="flex flex-wrap gap-2" aria-label="Topics">
              <Link href="/blog" className={`rounded-pill px-4 py-1.5 text-sm font-medium ring-1 ${query ? "bg-white ring-line" : "bg-tide text-white ring-tide"}`}>
                All
              </Link>
              {tags.map((t) => (
                <Link key={t.tag} href={`/blog/tag/${t.tag}`} className="rounded-pill bg-white px-4 py-1.5 text-sm font-medium ring-1 ring-line hover:ring-tide">
                  {t.label} <span className="text-ink-soft">{t.count}</span>
                </Link>
              ))}
            </nav>
            <form action="/blog" method="get" role="search" className="flex gap-2">
              <input
                type="search"
                name="q"
                defaultValue={q ?? ""}
                placeholder="Search posts"
                aria-label="Search posts"
                className="h-10 w-full rounded-pill border border-line bg-white px-4 text-sm outline-none focus:border-tide lg:w-56"
              />
              <button type="submit" className="h-10 rounded-pill bg-tide px-4 text-sm font-semibold text-white">
                Search
              </button>
            </form>
          </div>
        </Container>
      </section>

      <section className="pb-20">
        <Container>
          {query ? (
            <p className="mb-6 text-sm text-ink-soft">
              {posts.length} result{posts.length === 1 ? "" : "s"} for “{q}”
            </p>
          ) : null}
          {lead ? <PostCard post={lead} large /> : <p className="text-ink-soft">No posts match that yet. Try “bloating” or “FODMAP”.</p>}
          {rest.length ? (
            <div className="mt-14 grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          ) : null}
        </Container>
      </section>
    </>
  );
}
