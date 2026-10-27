import { Container } from "@/components/ui";
import { NewsletterForm } from "@/components/NewsletterForm";

export function LeadMagnet({ source = "home-lead" }: { source?: string }) {
  return (
    <section className="py-16 lg:py-24">
      <Container>
        <div className="grid gap-8 rounded-card bg-shell p-7 sm:p-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:p-14">
          <div>
            <p className="text-sm font-semibold text-tide">Free guide</p>
            <h2 className="mt-3 text-3xl sm:text-4xl">The two viral pressure points I use to ease bloating</h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">
              The exact spots, how long to hold, and the 2-minute morning sequence that goes with them. Sent straight to
              your inbox, then one short email a week with what I&apos;m actually testing.
            </p>
          </div>
          <NewsletterForm source={source} tags={["lead:pressure-points"]} withName cta="Send me the guide" />
        </div>
      </Container>
    </section>
  );
}
