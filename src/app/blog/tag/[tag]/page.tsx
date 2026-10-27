import Link from "next/link";
import { notFound } from "next/navigation";
import { PostCard } from "@/components/PostCard";
import { Container, JsonLd, SectionHeading } from "@/components/ui";
import { getAllTags, getPostsByTag, tagLabels } from "@/lib/blog";
import { breadcrumbJsonLd, pageMeta } from "@/lib/seo";

export function generateStaticParams() {
  return getAllTags().map((t) => ({ tag: t.tag }));
}

export async function generateMetadata({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params;
  const label = tagLabels[tag] ?? tag;
  return pageMeta({
    title: `${label} — posts by Julia Warter`,
    description: `Every post about ${label.toLowerCase()} from Julia Warter Wellness: lived experience, root causes and honest reviews.`,
    path: `/blog/tag/${tag}`,
  });
}

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params;
  const posts = getPostsByTag(tag);
  if (!posts.length) notFound();
  const label = tagLabels[tag] ?? tag;

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }, { name: label, path: `/blog/tag/${tag}` }])} />
      <section>
        <Container className="pb-8 pt-10 lg:pt-16">
          <Link href="/blog" className="text-sm font-semibold text-tide">
            ← All posts
          </Link>
          <SectionHeading as="h1" title={label} intro={`${posts.length} post${posts.length === 1 ? "" : "s"}`} className="mt-4" />
        </Container>
      </section>
      <section className="pb-20">
        <Container>
          <div className="grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
