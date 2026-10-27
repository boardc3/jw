import Image from "next/image";
import Link from "next/link";
import { CopyCode } from "@/components/CopyCode";
import { TrackedLink } from "@/components/TrackedLink";
import { NewsletterForm } from "@/components/NewsletterForm";
import { Logo } from "@/components/Logo";
import { goHref, links, stanMirror } from "@/lib/links";
import { formatPrice, products } from "@/lib/products";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMeta({
  title: "Julia Warter — all my links",
  description: "The Lymphatic Reset Method™, 1:1 coaching, free pressure-point guide, and every product + discount code from my videos.",
  path: "/links",
  noIndex: true, // bio-link page; we want search traffic landing on the real pages
});

/**
 * Link-in-bio page. Point TikTok / Instagram / YouTube bios here instead of stan.store.
 * Mirrors every item that was on the Stan store, in the same order, but every tap is
 * tracked first-party via /go/<slug>?src=bio and the paid offers check out natively.
 */
export default function LinksPage() {
  const lrm = products.find((p) => p.slug === "the-lymphatic-reset-method")!;
  const coaching = products.find((p) => p.slug === "coaching")!;
  const socials = links.filter((l) => l.category === "social");

  return (
    <div className="min-h-screen bg-shell">
      <div className="mx-auto flex max-w-md flex-col gap-4 px-4 pb-16 pt-10">
        <header className="flex flex-col items-center text-center">
          <div className="capsule relative h-28 w-28 ring-4 ring-white">
            <Image src={site.images.heroPortrait} alt="Julia Warter" fill sizes="112px" className="object-cover" priority />
          </div>
          <h1 className="mt-4 text-2xl font-semibold">Julia Warter</h1>
          <p className="mt-1 text-sm text-ink-soft">Lymphatic drainage, fascia release & gut health</p>
          <div className="mt-3 flex gap-3">
            {socials.map((s) => (
              <TrackedLink key={s.slug} href={goHref(s.slug, "bio")} className="rounded-pill bg-white px-3 py-1 text-xs font-semibold ring-1 ring-line hover:ring-tide">
                {s.buttonText}
              </TrackedLink>
            ))}
          </div>
        </header>

        {/* Primary offer */}
        <Link href="/the-lymphatic-reset-method?src=bio" className="block rounded-card bg-tide p-5 text-white shadow-[0_18px_40px_-24px_rgba(11,91,82,0.6)]">
          <p className="text-xs font-semibold text-matcha">New · 21-day program</p>
          <p className="mt-1 text-xl font-semibold">{lrm.name}</p>
          <p className="mt-1 text-sm text-white/80">{lrm.tagline}</p>
          <span className="mt-3 inline-flex rounded-pill bg-matcha px-4 py-1.5 text-sm font-semibold text-ink">Get instant access — {formatPrice(lrm.price)}</span>
        </Link>

        {/* Free guide — the top lead magnet gets prime placement */}
        <div className="rounded-card bg-white p-5 ring-1 ring-line/60">
          <p className="text-xl font-semibold">Free: the two viral pressure points for bloat</p>
          <p className="mt-1 text-sm text-ink-soft">Plus the 2-minute morning routine. Straight to your inbox.</p>
          <NewsletterForm source="bio" tags={["lead:pressure-points"]} cta="Send it" compact className="mt-3" />
        </div>

        <Link href="/coaching?src=bio" className="block rounded-card bg-white p-5 ring-1 ring-line/60 hover:ring-tide">
          <p className="text-lg font-semibold">{coaching.name}</p>
          <p className="mt-1 text-sm text-ink-soft">Looking to reset your gut and lymphatic health? Book a personalized session.</p>
          <span className="mt-2 inline-block text-sm font-semibold text-tide">Book a 1:1 call — {formatPrice(coaching.price)}</span>
        </Link>

        <Link href="/quiz?src=bio" className="block rounded-card bg-white p-5 ring-1 ring-line/60 hover:ring-tide">
          <p className="text-lg font-semibold">Not sure what&apos;s causing your bloat?</p>
          <p className="mt-1 text-sm text-ink-soft">Take the 2-minute quiz and I&apos;ll point you to the right place.</p>
        </Link>

        <p className="mt-4 px-1 text-sm font-semibold text-ink-soft">Products & codes</p>
        {stanMirror
          .filter((l) => !l.internalHref)
          .map((l) => (
            <div key={l.slug} className="rounded-card bg-white p-4 ring-1 ring-line/60">
              <TrackedLink href={goHref(l.slug, "bio")} className="block">
                <p className="font-semibold">{l.title}</p>
                <p className="mt-0.5 text-sm text-ink-soft">{l.tagline}</p>
              </TrackedLink>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <TrackedLink href={goHref(l.slug, "bio")} className="rounded-pill bg-tide px-4 py-1.5 text-sm font-semibold text-white">
                  {l.buttonText}
                </TrackedLink>
                {l.code ? <CopyCode code={l.code} slug={l.slug} /> : null}
              </div>
            </div>
          ))}

        <Link href="/favorites?src=bio" className="block rounded-card bg-white p-4 text-center font-semibold ring-1 ring-line/60 hover:ring-tide">
          All favorites & discount codes →
        </Link>
        <Link href="/blog?src=bio" className="block rounded-card bg-white p-4 text-center font-semibold ring-1 ring-line/60 hover:ring-tide">
          Read the blog
        </Link>
        <Link href="/work-with-me?src=bio" className="block rounded-card bg-white p-4 text-center font-semibold ring-1 ring-line/60 hover:ring-tide">
          Brands: work with me
        </Link>

        <footer className="mt-6 flex flex-col items-center gap-2 text-center text-xs text-ink-soft">
          <Link href="/" className="flex items-center gap-1.5 font-semibold text-ink">
            <Logo className="h-5 w-5" /> juliawarter.com
          </Link>
          <p>Some links are affiliate links. Not medical advice.</p>
        </footer>
      </div>
    </div>
  );
}
