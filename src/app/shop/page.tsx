import Image from "next/image";
import Link from "next/link";
import { Capsule, Chip, Container, JsonLd, SectionHeading, buttonClasses } from "@/components/ui";
import { FavoriteCard } from "@/components/FavoriteCard";
import { formatPrice, products } from "@/lib/products";
import { links } from "@/lib/links";
import { breadcrumbJsonLd, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Shop — The Lymphatic Reset Method™, 1:1 coaching & my favorite tools",
  description:
    "Julia Warter's programs and the tools she actually uses: the 21-day Lymphatic Reset Method™, private gut & lymphatic coaching, and discount codes for Fodzyme, ModifyHealth, FoodMarble, Organised and more.",
  path: "/shop",
});

export default function ShopPage() {
  const favs = links.filter((l) => l.sponsored).slice(0, 6);
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Shop", path: "/shop" }])} />
      <section>
        <Container className="pb-10 pt-10 lg:pt-16">
          <SectionHeading as="h1" title="Shop" intro="Two things I made, and the handful of things I buy on repeat. Everything is instant access or ships from the brand directly." />
        </Container>
      </section>

      <section className="pb-16">
        <Container className="grid gap-6 lg:grid-cols-2">
          {products.map((p) => (
            <article key={p.slug} className="grid gap-6 rounded-card bg-white p-6 ring-1 ring-line/60 sm:grid-cols-[0.6fr_1fr] sm:items-center">
              <Capsule className="aspect-[3/4] w-full">
                <Image src={p.image} alt={p.imageAlt} fill sizes="(min-width: 640px) 25vw, 90vw" className="object-cover" />
              </Capsule>
              <div>
                <Chip tone={p.kind === "course" ? "matcha" : "shell"}>{p.kind === "course" ? "Program" : "Coaching"}</Chip>
                <h2 className="mt-3 text-2xl">{p.name}</h2>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{p.tagline}</p>
                <p className="mt-4 font-display text-3xl font-semibold">
                  {p.tiers ? `from ${formatPrice(Math.min(...p.tiers.map((t) => t.price)))}` : formatPrice(p.price)}
                </p>
                <Link href={p.kind === "coaching" ? "/coaching" : `/${p.slug}`} className={buttonClasses("tide", "md", "mt-5")}>
                  {p.kind === "coaching" ? "Book a call" : "See what's inside"}
                </Link>
              </div>
            </article>
          ))}
        </Container>
      </section>

      <section className="bg-shell py-16 lg:py-20">
        <Container>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading title="Things I actually use" intro="With every discount code I've been given. Affiliate links — same price for you, a small commission for me." />
            <Link href="/favorites" className={buttonClasses("outline", "md")}>
              All favorites & codes
            </Link>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {favs.map((l) => (
              <FavoriteCard key={l.slug} link={l} source="shop" />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
