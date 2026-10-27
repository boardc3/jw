import Image from "next/image";
import { ContactForm } from "@/components/ContactForm";
import { Capsule, Container, JsonLd, SectionHeading } from "@/components/ui";
import { breadcrumbJsonLd, pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMeta({
  title: "Work with Julia — brand partnerships, consulting & speaking",
  description:
    "Partner with Julia Warter Wellness: sponsored content for gut-health and lymphatic brands, social media consulting, and speaking engagements. Honest reviews, an engaged audience, and a creator who only recommends what she uses.",
  path: "/work-with-me",
  image: site.images.workWith,
});

const offers = [
  {
    title: "Brand partnerships",
    body: "Sponsored TikTok, Instagram and YouTube content plus a dedicated blog review with a tracked link and code. One-off videos start at $500; monthly partnerships get the best results and the best rate.",
  },
  {
    title: "Social media consulting",
    body: "For wellness and consumer brands that want a creator's playbook: hooks, formats, posting cadence and the review style that made my videos travel.",
  },
  {
    title: "Speaking",
    body: "Root-cause health, self-advocacy in a broken medical system, and building a community around an uncomfortable diagnosis. Available across the U.S. and abroad from Costa Mesa, CA.",
  },
];

const proof = [
  { stat: "1.5M", label: "views on one lymphatic drainage video" },
  { stat: "80K+", label: "engaged followers on TikTok" },
  { stat: "8 yrs", label: "of lived IBS, liver & gut experience" },
  { stat: "Honest", label: "reviews — I say when something's a waste of money" },
];

export default function WorkWithMePage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Work with Julia", path: "/work-with-me" }])} />
      <section>
        <Container className="grid items-center gap-10 pb-12 pt-10 lg:grid-cols-[1.1fr_0.9fr] lg:pb-20 lg:pt-16">
          <div className="max-w-xl">
            <h1 className="text-[2.6rem] leading-[1.02] sm:text-6xl">Let&apos;s work together</h1>
            <p className="mt-6 text-lg leading-relaxed text-ink-soft sm:text-xl">
              Are you a brand seeking a passionate creator in the wellness space? A business looking for social media
              consulting? I partner with products I genuinely use — and my audience knows it, which is why the links convert.
            </p>
            <dl className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {proof.map((p) => (
                <div key={p.label}>
                  <dt className="font-display text-3xl font-semibold">{p.stat}</dt>
                  <dd className="mt-1 text-sm text-ink-soft">{p.label}</dd>
                </div>
              ))}
            </dl>
          </div>
          <Capsule className="mx-auto aspect-[3/4] w-full max-w-sm">
            <Image src={site.images.workWith} alt="Julia Warter outdoors holding a green drink" fill priority sizes="(min-width: 1024px) 35vw, 90vw" className="object-cover" />
          </Capsule>
        </Container>
      </section>

      <section className="bg-shell py-16 lg:py-20">
        <Container>
          <SectionHeading title="Three ways to partner" />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {offers.map((o) => (
              <div key={o.title} className="rounded-card bg-white p-6 ring-1 ring-line/60">
                <h3 className="text-xl">{o.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{o.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 max-w-prose text-sm text-ink-soft">
            Past partners include Fodzyme, ModifyHealth, FoodMarble, Organised, Seed, Nerva and Prolon. I decline products I
            wouldn&apos;t use with my own gut.
          </p>
        </Container>
      </section>

      <section id="contact" className="scroll-mt-20 py-16 lg:py-24">
        <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            title="Tell me about the project"
            intro={
              <>
                Fill out the form and I&apos;ll reply within two business days. Prefer email? <a className="font-semibold text-tide" href={`mailto:${site.email}`}>{site.email}</a>
              </>
            }
          />
          <ContactForm />
        </Container>
      </section>
    </>
  );
}
