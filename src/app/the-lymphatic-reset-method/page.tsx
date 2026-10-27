import Image from "next/image";
import Link from "next/link";
import { BuyButton } from "@/components/BuyButton";
import { Faq } from "@/components/Faq";
import { StickyBuyBar } from "@/components/StickyBuyBar";
import { Capsule, Chip, Container, JsonLd, SectionHeading } from "@/components/ui";
import { formatPrice, getProduct } from "@/lib/products";
import { breadcrumbJsonLd, faqJsonLd, pageMeta, productJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";

const lrm = getProduct("the-lymphatic-reset-method")!;

export const metadata = pageMeta({
  title: lrm.seoTitle,
  description: lrm.seoDescription,
  path: "/the-lymphatic-reset-method",
  image: lrm.image,
});

const steps = [
  {
    n: "Step 1",
    title: "Learn the sequence",
    body: "Follow the 12-step LRM™ sequence — the exact order and light touch that guides fluid movement safely and simply. No guesswork, no pressure points to memorize.",
  },
  {
    n: "Step 2",
    title: "Press play, not pause",
    body: "Use the 2-minute follow-along video every morning. You don't need to remember the steps. You just need to press play and move with me.",
  },
  {
    n: "Step 3",
    title: "Go deeper when you're ready",
    body: "Once the basics feel natural, unlock the bonus techniques for stubborn spots — abdominal fascia release and Spleen 9 — for the days your body needs a little extra.",
  },
];

const modules = [
  { title: "The science of fluid movement", body: "Why you're retaining water in the first place. Your lymphatic system has no pump; here's what actually moves it." },
  { title: "Your baseline", body: "A simple way to track puffiness, heaviness and bloat so you can see the change — not just hope for it." },
  { title: "Tools in place", body: "What you need (almost nothing), what you don't, and how to set up a morning that makes the routine automatic." },
  { title: "The 12-step LRM™ sequence", body: "The method itself, taught slowly and completely, so the 2-minute version makes sense in your hands." },
  { title: "The 2-minute daily follow-along", body: "Press play every morning. Shorter than brushing your teeth, so it's the habit you actually keep." },
  { title: "Bonus: fascia release + Spleen 9", body: "Abdominal fascia release with a ball, and the acupressure point from the viral video, for the stuck days." },
];

const testimonials = [
  { quote: "I noticed real reduction in puffiness within days of following the daily 2-minute routine.", name: "Member, LRM™ community" },
  { quote: "My bloating finally eased once I understood exactly why my body was retaining fluid.", name: "Member, LRM™ community" },
  { quote: "The step-by-step modules made it simple to see lasting results without overhauling my life.", name: "Member, LRM™ community" },
];

export default function MethodPage() {
  const tiers = lrm.tiers!;
  const main = tiers.find((t) => t.highlight)!;
  const low = Math.min(...tiers.map((t) => t.price));
  const high = Math.max(...tiers.map((t) => t.price));

  return (
    <>
      <JsonLd
        data={[
          productJsonLd({
            name: lrm.name,
            description: lrm.seoDescription,
            image: lrm.image,
            path: "/the-lymphatic-reset-method",
            priceCents: lrm.price,
            lowPriceCents: low,
            highPriceCents: high,
          }),
          faqJsonLd(lrm.faqs),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "The Lymphatic Reset Method™", path: "/the-lymphatic-reset-method" },
          ]),
        ]}
      />

      {/* Hero */}
      <section className="overflow-hidden">
        <Container className="grid items-center gap-10 pb-16 pt-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:pb-24 lg:pt-16">
          <div className="max-w-xl">
            <Chip tone="matcha">21-day daily practice</Chip>
            <h1 className="mt-5 text-[2.6rem] leading-[1.02] sm:text-6xl lg:text-[4.2rem]">The Lymphatic Reset Method™</h1>
            <p className="mt-5 text-xl leading-relaxed text-ink-soft">
              Clear stagnant fluid, soothe bloating and support natural drainage — in two minutes a morning, with no
              equipment and no 45-minute routine you&apos;ll quit by week two.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <BuyButton product={lrm.slug} tier={main.id} source="method-hero" label={`Get instant access — ${formatPrice(main.price)}`} className="sm:w-auto" />
              <Link href="#inside" className="text-center font-semibold text-tide hover:text-tide-deep sm:text-left">
                What&apos;s inside ↓
              </Link>
            </div>
            <p className="mt-4 text-sm text-ink-soft">Instant access · Lifetime updates · Private community · 7-day make-it-right promise</p>
          </div>
          <Capsule className="mx-auto aspect-[3/4] w-full max-w-sm lg:max-w-none">
            <Image src={lrm.image} alt={lrm.imageAlt} fill priority sizes="(min-width: 1024px) 40vw, 90vw" className="object-cover" />
          </Capsule>
        </Container>
      </section>

      {/* Problem */}
      <section className="bg-shell py-16 lg:py-24">
        <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl">You know the feeling.</h2>
          <div className="space-y-5 text-lg leading-relaxed text-ink-soft">
            <p>
              You wake up and your face looks puffier than it did last night. Your legs feel heavy before you&apos;ve left the
              bedroom. Your rings feel snug and you can&apos;t point to why — you haven&apos;t done anything wrong. You&apos;ve tried
              drinking more water. You&apos;ve tried cutting salt. Some days it feels like your body is just… stuck.
            </p>
            <p>
              <strong className="text-ink">Here&apos;s what&apos;s actually happening:</strong> your lymphatic system has no pump of its
              own. Unlike your heart, it only moves when you move. When life gets busy and movement gets small — a desk,
              adrenaline, skipped stretch breaks — your lymph slows down. Fluid sits. That&apos;s the puffiness. That&apos;s the
              heaviness. That&apos;s the tightness that shows up for no clear reason.
            </p>
            <p className="font-display text-2xl font-semibold text-ink">It&apos;s not a mystery you&apos;re failing to solve. It&apos;s a system waiting to be switched back on.</p>
          </div>
        </Container>
      </section>

      {/* Why Julia */}
      <section className="py-16 lg:py-24">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <Capsule className="mx-auto aspect-[4/5] w-full max-w-md">
            <Image src={site.images.methodSide} alt="Julia Warter" fill sizes="(min-width: 1024px) 40vw, 90vw" className="object-cover" />
          </Capsule>
          <div>
            <h2 className="text-3xl sm:text-4xl">I&apos;ve been exactly where you are</h2>
            <div className="mt-5 space-y-4 text-lg leading-relaxed text-ink-soft">
              <p>
                I didn&apos;t come to this work from a textbook. I came to it from my own puffy mornings, my own heavy legs,
                and my own frustration with routines that promised the world and asked for 45 minutes I didn&apos;t have.
              </p>
              <p>
                I built the Lymphatic Reset Method™ because I needed something that worked <em>with</em> a real life, not
                instead of one. I&apos;m not here to hand you another program to feel guilty about abandoning. I&apos;m here to hand
                you the one thing that actually works, and walk you through it step by step.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Plan */}
      <section className="bg-tide py-16 text-white lg:py-24">
        <Container>
          <SectionHeading title="You don't need a new routine. You need a new two minutes." intro={<span className="text-white/80">Three simple steps to feeling lighter. That&apos;s the whole plan.</span>} />
          <ol className="mt-10 grid gap-5 md:grid-cols-3">
            {steps.map((s) => (
              <li key={s.n} className="rounded-card bg-white/8 p-6 ring-1 ring-white/15">
                <p className="text-sm font-semibold text-matcha">{s.n}</p>
                <h3 className="mt-2 text-2xl">{s.title}</h3>
                <p className="mt-3 leading-relaxed text-white/80">{s.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* What's inside */}
      <section id="inside" className="scroll-mt-20 py-16 lg:py-24">
        <Container>
          <SectionHeading title="What's inside" intro="Six modules that start with the actual science of fluid movement, then set your baseline and your tools before diving into the method itself." />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {modules.map((m, i) => (
              <div key={m.title} className="rounded-card bg-white p-6 ring-1 ring-line/60">
                <p className="text-sm font-semibold text-tide">Module {i + 1}</p>
                <h3 className="mt-2 text-xl">{m.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{m.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-prose text-ink-soft">
            By the end you&apos;re not just following a routine — you have a full framework for keeping your body&apos;s drainage
            system working <em>for</em> you instead of against you, plus a community of people doing this alongside you.
          </p>
        </Container>
      </section>

      {/* Testimonials */}
      <section className="bg-shell py-16 lg:py-24">
        <Container>
          <SectionHeading title="What members notice first" />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.quote} className="rounded-card bg-white p-6 ring-1 ring-line/60">
                <blockquote className="font-display text-xl font-semibold leading-snug">“{t.quote}”</blockquote>
                <figcaption className="mt-4 text-sm text-ink-soft">{t.name}</figcaption>
              </figure>
            ))}
          </div>
          <p className="mt-6 text-xs text-ink-soft">Individual results vary. Educational program; not medical advice.</p>
        </Container>
      </section>

      {/* Pricing */}
      <section id="pricing" className="scroll-mt-20 py-16 lg:py-24">
        <Container>
          <SectionHeading align="center" title="Pick your reset" intro="Every tier is instant access, lifetime updates. Start with the Method — it's the one people DM me about." />
          <div className="mt-12 grid gap-5 lg:grid-cols-3 lg:items-stretch">
            {tiers.map((t) => (
              <div
                key={t.id}
                className={`flex flex-col rounded-card p-7 ${t.highlight ? "bg-tide text-white ring-4 ring-matcha lg:-my-4 lg:py-11" : "bg-white ring-1 ring-line/60"}`}
              >
                {t.highlight ? <Chip tone="matcha">Most popular</Chip> : <span className="h-6" />}
                <h3 className="mt-4 text-2xl">{t.name}</h3>
                <p className={`mt-2 text-[15px] leading-relaxed ${t.highlight ? "text-white/80" : "text-ink-soft"}`}>{t.blurb}</p>
                <p className="mt-6 font-display text-5xl font-semibold tracking-tight">{formatPrice(t.price)}</p>
                <ul className={`mt-6 flex-1 space-y-2.5 text-[15px] ${t.highlight ? "text-white/90" : ""}`}>
                  {t.includes.map((i) => (
                    <li key={i} className="flex gap-2.5">
                      <span className={`mt-[7px] h-2 w-2 shrink-0 rounded-full ${t.highlight ? "bg-matcha" : "bg-matcha-deep"}`} aria-hidden />
                      {i}
                    </li>
                  ))}
                </ul>
                <BuyButton
                  product={lrm.slug}
                  tier={t.id}
                  source="method-pricing"
                  label={t.highlight ? "Get instant access" : `Choose ${t.shortName}`}
                  tone={t.highlight ? "matcha" : "tide"}
                  className="mt-8"
                />
              </div>
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-prose text-center text-sm text-ink-soft">
            Secure checkout. 7-day make-it-right promise: if the Method isn&apos;t for you, email {site.email} within seven days.
          </p>
        </Container>
      </section>

      {/* Why it works / What if you don't */}
      <section className="bg-shell py-16 lg:py-24">
        <Container className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl">Why it works</h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">
              This isn&apos;t another 45-minute routine you&apos;ll quit by week two. It&apos;s short enough to actually do every single
              day — and consistency, not intensity, is what your lymphatic system responds to. A two-minute habit you keep is
              worth infinitely more than a perfect routine you abandon by Thursday.
            </p>
          </div>
          <div>
            <h2 className="text-3xl">In 21 days, you&apos;ll have</h2>
            <ul className="mt-4 space-y-3 text-lg text-ink-soft">
              <li>A simple daily habit that takes less time than brushing your teeth</li>
              <li>A body that feels lighter, less puffy, less “stuck”</li>
              <li>A repeatable tool you&apos;ll come back to for life, not just this month</li>
            </ul>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-24">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading title="Questions, answered" intro="Still unsure? Email me — no question is too embarrassing." />
          <Faq items={lrm.faqs} />
        </Container>
      </section>

      {/* Final CTA */}
      <section className="pb-24">
        <Container>
          <div className="rounded-card bg-tide px-7 py-12 text-center text-white sm:px-10">
            <h2 className="text-3xl sm:text-4xl">Start today. Feel the difference by tomorrow morning.</h2>
            <p className="mx-auto mt-3 max-w-xl text-lg text-white/85">
              No equipment. No gym clothes. No overhauling your routine. Just the two minutes that becomes the thing you
              actually stick with.
            </p>
            <BuyButton product={lrm.slug} tier={main.id} source="method-final" label={`Get the Lymphatic Reset Method™ — ${formatPrice(main.price)}`} tone="matcha" className="mx-auto mt-8 max-w-md" />
            <p className="mt-6 text-xs text-white/70">
              Educational only. Julia is self-taught and not a doctor or certified lymphatic therapist. Consult your physician
              before starting; temporary detox responses (fatigue, mild headache, increased urination) can occur as fluid moves.
            </p>
          </div>
        </Container>
      </section>

      <StickyBuyBar product={lrm.slug} tier={main.id} price={formatPrice(main.price)} name={lrm.name} />
    </>
  );
}
