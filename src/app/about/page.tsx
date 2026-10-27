import Image from "next/image";
import Link from "next/link";
import { Capsule, Container, JsonLd, buttonClasses } from "@/components/ui";
import { LeadMagnet } from "@/components/LeadMagnet";
import { breadcrumbJsonLd, pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMeta({
  title: "About Julia Warter — From root-cause crisis to the Lymphatic Reset",
  description:
    "At 29 Julia Warter was diagnosed with an enlarged liver, gallbladder issues and severe IBS — and a pre-cancerous polyp doctors nearly missed. Here's how lymphatic drainage and cellular health changed everything.",
  path: "/about",
  image: site.images.aboutPortrait,
});

const milestones = [
  { when: "8 years", what: "of unexplained symptoms, IBS, and being told to manage my stress" },
  { when: "$20,000", what: "out of pocket on specialists and standard band-aids" },
  { when: "Age 29", what: "an enlarged liver, gallbladder sludge, and a massive pre-cancerous polyp found by the colonoscopy I had to beg for" },
  { when: "Today", what: "liver no longer enlarged, symptoms manageable, 25 lbs kept off, and a daily routine I'll never skip" },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "About", path: "/about" }])} />
      <section>
        <Container className="grid items-center gap-10 pb-16 pt-10 lg:grid-cols-[1fr_0.8fr] lg:pb-24 lg:pt-16">
          <div className="max-w-xl">
            <h1 className="text-[2.6rem] leading-[1.02] sm:text-6xl">From root-cause crisis to the Lymphatic Reset</h1>
            <p className="mt-6 text-lg leading-relaxed text-ink-soft sm:text-xl">
              Sharing my health journey openly has profoundly changed my life — but it was born out of deep isolation.
            </p>
          </div>
          <Capsule className="mx-auto aspect-[3/4] w-full max-w-sm">
            <Image src={site.images.aboutPortrait} alt="Julia Warter holding a green iced drink in front of white flowering plants" fill priority sizes="(min-width: 1024px) 35vw, 90vw" className="object-cover" />
          </Capsule>
        </Container>
      </section>

      <section className="bg-shell py-16 lg:py-24">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <ol className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            {milestones.map((m) => (
              <li key={m.when} className="border-l-2 border-matcha pl-5">
                <p className="font-display text-3xl font-semibold">{m.when}</p>
                <p className="mt-1 text-[15px] text-ink-soft">{m.what}</p>
              </li>
            ))}
          </ol>
          <div className="prose-jw">
            <p>
              At 29, after years of unexplained symptoms, I was diagnosed with an enlarged liver, gallbladder issues and
              severe IBS. It took persistent self-advocacy to finally get a colonoscopy, which revealed a massive,
              pre-cancerous polyp. The doctor said that without it, I&apos;d have developed colon cancer within five years.
            </p>
            <p>
              Navigating a broken medical system, I spent over $20,000 out of pocket visiting specialists who dismissed my
              pain with standard band-aids: <em>“Just take Metamucil.” “Manage your stress.” “Come back in six weeks.”</em>
            </p>
            <p>
              Terrified but determined, I reached a breaking point and took control of my health. I dove into the research
              to uncover the actual root causes of my ailments — healing not just my physical body, but also the emotional
              eating patterns I used to cope.
            </p>
            <h2>Reclaiming my health at the cellular level</h2>
            <p>
              That crisis led me to the missing piece of my healing: <strong>lymphatic drainage and cellular health</strong>.
              By learning how to support my body&apos;s natural detoxification pathways and reduce systemic inflammation,
              everything changed. Today my liver is no longer enlarged, my symptoms are manageable, and I&apos;ve reclaimed my
              vitality.
            </p>
            <p>
              This transformation inspired me to create <Link href="/the-lymphatic-reset-method">The Lymphatic Reset Method™</Link>.
              I combine my professional marketing background with deep wellness research to distill complex biohacking and
              lymphatic protocols into actionable, daily practices for a rapidly growing community.
            </p>
            <p>
              If you&apos;re navigating chronic gut issues, liver challenges, or looking to unlock your highest health — welcome.
              We aren&apos;t just managing symptoms here. We&apos;re getting to the root cause. I&apos;m so glad you&apos;re here.
            </p>
            <h2>What I am, and what I&apos;m not</h2>
            <p>
              I&apos;m not a doctor, licensed nutritionist or certified lymphatic therapist, and I don&apos;t diagnose, treat or cure
              anything. I&apos;m the friend who already spent the money and the years — and who reads the studies so you don&apos;t
              have to. Please run anything you try here past your own physician.
            </p>
            <p>
              I live and write in Costa Mesa, CA, and I&apos;m available to travel for speaking engagements throughout the United
              States and abroad.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/work-with-me" className={buttonClasses("tide", "md")}>
                Work with me
              </Link>
              <Link href="/blog/myhealthjourneyjuliawarter" className={buttonClasses("outline", "md")}>
                Read the long version
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-24">
        <Container className="grid items-center gap-10 lg:grid-cols-2">
          <Capsule className="mx-auto aspect-[4/5] w-full max-w-sm">
            <Image src={site.images.yogaMat} alt="Julia Warter carrying a rolled yoga mat on a brick walkway" fill sizes="(min-width: 1024px) 35vw, 90vw" className="object-cover" />
          </Capsule>
          <div>
            <h2 className="text-3xl sm:text-4xl">Where to start</h2>
            <ul className="mt-6 space-y-4 text-lg">
              <li>
                <Link href="/free" className="font-semibold text-tide hover:underline">The free pressure-point guide</Link>
                <span className="text-ink-soft"> — the two spots from the viral video, and the 2-minute routine.</span>
              </li>
              <li>
                <Link href="/blog/top-10-things-that-saved-my-ibs-symptoms" className="font-semibold text-tide hover:underline">11 things that dramatically improved my IBS</Link>
                <span className="text-ink-soft"> — the most-read post on the site.</span>
              </li>
              <li>
                <Link href="/blog/gallbladder-attack-symptoms-amp-ibs-overlapping-symptoms-amp-misdiagnosis" className="font-semibold text-tide hover:underline">Gallbladder attacks vs. IBS</Link>
                <span className="text-ink-soft"> — if you&apos;ve been diagnosed and dismissed.</span>
              </li>
            </ul>
          </div>
        </Container>
      </section>

      <LeadMagnet source="about-lead" />
    </>
  );
}
