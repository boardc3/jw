import type { ReactNode } from "react";
import { Container } from "./ui";

export function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <section>
      <Container className="max-w-3xl pb-20 pt-10 lg:pt-16">
        <h1 className="text-4xl sm:text-5xl">{title}</h1>
        <p className="mt-3 text-sm text-ink-soft">Last updated {updated}</p>
        <div className="prose-jw mt-8">{children}</div>
      </Container>
    </section>
  );
}
