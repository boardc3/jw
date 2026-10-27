import Link from "next/link";
import { Container, SectionHeading, buttonClasses } from "@/components/ui";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Support the mission",
  description: "Everything on juliawarter.com is free to read. If it helped you, you can support the work — or just share it with someone who needs it.",
  path: "/donate",
});

export default function DonatePage() {
  const paymentLink = process.env.NEXT_PUBLIC_DONATE_LINK; // Stripe Payment Link or PayPal.me
  return (
    <section>
      <Container className="max-w-2xl pb-20 pt-10 lg:pt-16">
        <SectionHeading
          as="h1"
          title="Support the mission"
          intro="Every post, routine and code on this site is free. If something here saved you a specialist visit or a bad week, this is where you can say thanks."
        />
        <div className="mt-10 rounded-card bg-shell p-7 sm:p-10">
          {paymentLink ? (
            <a href={paymentLink} className={buttonClasses("tide", "lg")} target="_blank" rel="noopener">
              Buy Julia a green juice
            </a>
          ) : (
            <p className="text-ink-soft">Donations are being set up. In the meantime, the most helpful thing you can do is share a post with someone who needs it.</p>
          )}
          <p className="mt-6 text-sm text-ink-soft">
            Prefer to support by shopping? Using the codes on the{" "}
            <Link href="/favorites" className="font-semibold text-tide">
              favorites page
            </Link>{" "}
            does the same thing at no cost to you.
          </p>
        </div>
      </Container>
    </section>
  );
}
