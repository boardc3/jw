import Link from "next/link";
import { Container, buttonClasses } from "@/components/ui";
import { getProduct } from "@/lib/products";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMeta({ title: "You're in", description: "Thank you for your purchase.", path: "/thank-you", noIndex: true });

export default async function ThankYouPage({ searchParams }: { searchParams: Promise<{ product?: string; tier?: string }> }) {
  const { product: slug } = await searchParams;
  const product = slug ? getProduct(slug) : undefined;
  const isCoaching = product?.kind === "coaching";

  return (
    <section className="py-16 lg:py-28">
      <Container className="max-w-2xl text-center">
        <p className="text-sm font-semibold text-tide">Order confirmed</p>
        <h1 className="mt-3 text-4xl sm:text-5xl">{isCoaching ? "Your call is booked" : "You're in. Welcome."}</h1>
        <p className="mt-5 text-lg leading-relaxed text-ink-soft">
          {isCoaching
            ? "Check your inbox for the scheduling link and a short intake form — the more you share, the more we get done on the call."
            : `Your access email is on its way. If it isn't there in ten minutes, check spam and add ${site.email} to your contacts.`}
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/blog/how-my-lymphatic-drainage-massage-for-weight-loss-video-broke-tiktok" className={buttonClasses("tide", "lg")}>
            Read how the routine started
          </Link>
          <Link href="/favorites" className={buttonClasses("outline", "lg")}>
            Grab the fascia ball
          </Link>
        </div>
        <p className="mt-10 text-sm text-ink-soft">
          Questions? Email <a className="font-semibold text-tide" href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      </Container>
    </section>
  );
}
