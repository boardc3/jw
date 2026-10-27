import Link from "next/link";
import { Container, buttonClasses } from "@/components/ui";

export default function NotFound() {
  return (
    <section>
      <Container className="max-w-2xl py-24 text-center">
        <p className="text-sm font-semibold text-tide">404</p>
        <h1 className="mt-3 text-4xl sm:text-5xl">That page moved — or never existed.</h1>
        <p className="mt-4 text-lg text-ink-soft">Try one of these instead.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/blog" className={buttonClasses("tide", "lg")}>
            Read the blog
          </Link>
          <Link href="/the-lymphatic-reset-method" className={buttonClasses("outline", "lg")}>
            The Lymphatic Reset Method™
          </Link>
        </div>
      </Container>
    </section>
  );
}
