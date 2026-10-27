import Link from "next/link";
import { Container, SectionHeading } from "@/components/ui";

const paths = [
  {
    symptom: "Bloated after meals",
    title: "Garlic, onion, beans — and suddenly you look six months pregnant",
    body: "Start with the two pressure points that ease bloat fast, then the enzyme and breath-test tools that let me eat out again.",
    href: "/free",
    cta: "Get the pressure-point guide",
    posts: ["/blog/top-10-things-that-saved-my-ibs-symptoms", "/blog/the-only-way-to-attempt-the-low-fodmap-diet"],
  },
  {
    symptom: "Puffy, heavy, water retention",
    title: "Your face is puffier than last night and your rings feel snug",
    body: "That's fluid sitting still. The Lymphatic Reset Method™ is the 12-step, 2-minute sequence that gets it moving.",
    href: "/the-lymphatic-reset-method",
    cta: "See the Method",
    posts: ["/blog/how-my-lymphatic-drainage-massage-for-weight-loss-video-broke-tiktok"],
  },
  {
    symptom: "Diagnosed, then dismissed",
    title: "“Just take Metamucil” didn't fix it, and nobody is looking for the root cause",
    body: "Read how my “severe IBS” turned out to be gallbladder attacks and an enlarged liver — and the questions to bring to your doctor.",
    href: "/about",
    cta: "Read my story",
    posts: ["/blog/gallbladder-attack-symptoms-amp-ibs-overlapping-symptoms-amp-misdiagnosis", "/blog/liverhealth"],
  },
];

export function StartHere() {
  return (
    <section className="bg-shell py-16 lg:py-24">
      <Container>
        <SectionHeading
          title="Start where it hurts"
          intro="Three paths, one for each thing people DM me about every single day. Pick the one that sounds like your morning."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {paths.map((p) => (
            <article key={p.symptom} className="flex flex-col rounded-card bg-white p-6 ring-1 ring-line/60">
              <p className="text-sm font-semibold text-tide">{p.symptom}</p>
              <h3 className="mt-2 text-xl leading-snug">{p.title}</h3>
              <p className="mt-3 flex-1 text-[15px] leading-relaxed text-ink-soft">{p.body}</p>
              <Link href={p.href} className="mt-5 inline-flex items-center gap-1 font-semibold text-tide hover:text-tide-deep">
                {p.cta}
                <span aria-hidden>↗</span>
              </Link>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
