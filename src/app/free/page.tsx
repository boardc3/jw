import Image from "next/image";
import { NewsletterForm } from "@/components/NewsletterForm";
import { Capsule, Container, JsonLd, SectionHeading } from "@/components/ui";
import { breadcrumbJsonLd, pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMeta({
  title: "Free guide — the two viral pressure points for bloating + the 2-minute lymphatic routine",
  description:
    "Get Julia Warter's free guide: the two viral acupressure points (including Spleen 9) she uses to ease bloating, plus the 2-minute morning lymphatic drainage routine. Sent to your inbox.",
  path: "/free",
});

const freebies = [
  {
    title: "The two viral pressure points for bloat",
    body: "The exact spots from the video, how long to hold each, and when in the day they work best.",
    tag: "lead:pressure-points",
  },
  {
    title: "The 2-minute morning lymphatic flush",
    body: "A printable follow-along of the short sequence — the one I do before coffee.",
    tag: "lead:2-minute-flush",
  },
  {
    title: "My low-FODMAP reintroduction tracker",
    body: "The simple sheet I used to stop living in elimination mode and start eating out again.",
    tag: "lead:fodmap-tracker",
  },
];

export default function FreePage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Free resources", path: "/free" }])} />
      <section>
        <Container className="grid items-center gap-10 pb-16 pt-10 lg:grid-cols-[1.1fr_0.9fr] lg:pb-24 lg:pt-16">
          <div className="max-w-xl">
            <p className="text-sm font-semibold text-tide">Free resources</p>
            <h1 className="mt-3 text-[2.6rem] leading-[1.02] sm:text-6xl">The pressure points everyone asks me about</h1>
            <p className="mt-6 text-lg leading-relaxed text-ink-soft sm:text-xl">
              Drop your email and I&apos;ll send all three guides, then one short note a week with what I&apos;m testing, eating and
              getting rid of. No spam, ever.
            </p>
            <NewsletterForm source="free-page" tags={freebies.map((f) => f.tag)} withName cta="Send me the guides" className="mt-8" />
          </div>
          <Capsule className="mx-auto aspect-[3/4] w-full max-w-sm">
            <Image src={site.images.medicineBall} alt="Julia Warter tossing a medicine ball in a workout" fill priority sizes="(min-width: 1024px) 35vw, 90vw" className="object-cover" />
          </Capsule>
        </Container>
      </section>

      <section className="bg-shell py-16 lg:py-20">
        <Container>
          <SectionHeading title="What's in the bundle" />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {freebies.map((f) => (
              <div key={f.title} className="rounded-card bg-white p-6 ring-1 ring-line/60">
                <h3 className="text-xl">{f.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{f.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
