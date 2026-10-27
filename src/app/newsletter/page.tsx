import { NewsletterForm } from "@/components/NewsletterForm";
import { Container, SectionHeading } from "@/components/ui";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "The newsletter — one short email a week on gut & lymphatic health",
  description: "Join Julia Warter's newsletter: what she's testing, eating and getting rid of, plus the 2-minute lymphatic flush and the two viral pressure points for bloat.",
  path: "/newsletter",
});

const topics = [
  "What I'm actually testing that week (and whether it's a waste of money)",
  "The gut-health product codes before they go anywhere else",
  "Follow-along routines you can do before coffee",
  "The questions to bring to your doctor when you've been dismissed",
];

export default function NewsletterPage() {
  return (
    <section>
      <Container className="grid gap-12 pb-20 pt-10 lg:grid-cols-2 lg:pt-16">
        <div>
          <SectionHeading as="h1" title="One short email a week. That's it." intro="Written by me, from Costa Mesa, usually on Sunday. The first one sends you the pressure-point guide and the 2-minute flush." />
          <ul className="mt-8 space-y-3 text-lg text-ink-soft">
            {topics.map((t) => (
              <li key={t} className="flex gap-3">
                <span className="mt-[11px] h-2 w-2 shrink-0 rounded-full bg-matcha-deep" aria-hidden />
                {t}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-card bg-shell p-7 sm:p-10">
          <NewsletterForm source="newsletter-page" tags={["lead:pressure-points"]} withName cta="Subscribe" />
        </div>
      </Container>
    </section>
  );
}
