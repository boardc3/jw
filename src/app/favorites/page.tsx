import Link from "next/link";
import { FavoriteCard } from "@/components/FavoriteCard";
import { Container, JsonLd, SectionHeading, buttonClasses } from "@/components/ui";
import { favoriteCategories, links } from "@/lib/links";
import { breadcrumbJsonLd, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "My favorites & discount codes — Fodzyme, ModifyHealth, FoodMarble, Organised & more",
  description:
    "Every product Julia Warter has raved about, with the exclusive discount codes: Fodzyme (MINDFULJULIA), ModifyHealth (JULIA), FoodMarble (JULIAW), Organised protein (JULIA), Seed, Nerva, Prolon, the fascia ball and the lymphatic massager.",
  path: "/favorites",
});

export default function FavoritesPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Favorites & codes", path: "/favorites" }])} />
      <section>
        <Container className="pb-10 pt-10 lg:pt-16">
          <SectionHeading
            as="h1"
            title="Looking for something I've raved about?"
            intro="Every product from my videos and posts, with the discount code next to it. I only link what I use with my own gut — and I'll tell you when something is a waste of money."
          />
          <nav className="mt-6 flex flex-wrap gap-2" aria-label="Jump to category">
            {favoriteCategories.map((c) => (
              <a key={c.key} href={`#${c.key}`} className="rounded-pill bg-white px-4 py-1.5 text-sm font-medium ring-1 ring-line hover:ring-tide">
                {c.title}
              </a>
            ))}
          </nav>
        </Container>
      </section>

      {favoriteCategories.map((c, i) => {
        const items = links.filter((l) => l.category === c.key && l.sponsored);
        if (!items.length) return null;
        return (
          <section key={c.key} id={c.key} className={`scroll-mt-20 py-12 lg:py-16 ${i % 2 === 1 ? "bg-shell" : ""}`}>
            <Container>
              <h2 className="text-2xl sm:text-3xl">{c.title}</h2>
              <p className="mt-2 max-w-prose text-ink-soft">{c.blurb}</p>
              <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((l) => (
                  <FavoriteCard key={l.slug} link={l} source="favorites" />
                ))}
              </div>
            </Container>
          </section>
        );
      })}

      <section className="py-16">
        <Container>
          <div className="rounded-card bg-white p-7 ring-1 ring-line/60 sm:p-10 lg:flex lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <h2 className="text-2xl sm:text-3xl">Want the routine, not just the tools?</h2>
              <p className="mt-2 text-ink-soft">The Lymphatic Reset Method™ shows you exactly how I use the ball and the massager — in two minutes a morning.</p>
            </div>
            <Link href="/the-lymphatic-reset-method" className={buttonClasses("tide", "lg", "mt-6 lg:mt-0")}>
              See the Method
            </Link>
          </div>
          <p className="mt-6 text-xs text-ink-soft">
            Affiliate disclosure: links on this page may earn Julia a commission at no extra cost to you. Codes and
            discounts are set by each brand and can change without notice.
          </p>
        </Container>
      </section>
    </>
  );
}
