import Link from "next/link";
import { Hero } from "@/components/home/Hero";
import { StartHere } from "@/components/home/StartHere";
import { MethodFeature } from "@/components/home/MethodFeature";
import { Story } from "@/components/home/Story";
import { LeadMagnet } from "@/components/LeadMagnet";
import { FavoriteCard } from "@/components/FavoriteCard";
import { PostCard } from "@/components/PostCard";
import { Container, SectionHeading, buttonClasses } from "@/components/ui";
import { links } from "@/lib/links";
import { getFeaturedPosts } from "@/lib/blog";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMeta({
  title: `${site.name} — Lymphatic drainage, fascia release & gut health`,
  description: site.description,
  path: "/",
});

export default function HomePage() {
  const posts = getFeaturedPosts(3);
  const topFavorites = ["lymphatic-massager", "fascia-ball", "fodzyme", "organised"]
    .map((s) => links.find((l) => l.slug === s))
    .filter((l): l is NonNullable<typeof l> => Boolean(l));

  return (
    <>
      <Hero />
      <StartHere />
      <MethodFeature />
      <Story />
      <LeadMagnet source="home-lead" />

      <section className="bg-shell py-16 lg:py-24">
        <Container>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              title="Looking for something I've raved about?"
              intro="The tools from my videos, with every discount code in one place. I only link what I actually use."
            />
            <Link href="/favorites" className={buttonClasses("outline", "md")}>
              All favorites & codes
            </Link>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {topFavorites.map((l) => (
              <FavoriteCard key={l.slug} link={l} source="home" />
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-24">
        <Container>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading title="Recently on the blog" intro="Root-cause stories, brutal reviews and the things that actually moved the needle." />
            <Link href="/blog" className={buttonClasses("outline", "md")}>
              Read all posts
            </Link>
          </div>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {posts.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-8">
        <Container>
          <div className="rounded-card bg-tide px-7 py-10 text-white sm:px-10 lg:flex lg:items-center lg:justify-between lg:px-14">
            <div className="max-w-xl">
              <h2 className="text-3xl sm:text-4xl">Not sure what&apos;s causing your bloat?</h2>
              <p className="mt-3 text-lg text-white/85">
                Two minutes, six questions. I&apos;ll point you to the right starting place and the exact post or tool for it.
              </p>
            </div>
            <Link href="/quiz" className={buttonClasses("matcha", "lg", "mt-6 lg:mt-0")}>
              Take the bloat quiz
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
