import { goHref, type OutboundLink } from "@/lib/links";
import { CopyCode } from "./CopyCode";
import { TrackedLink } from "./TrackedLink";
import { Chip, buttonClasses } from "./ui";

export function FavoriteCard({ link, source }: { link: OutboundLink; source: string }) {
  return (
    <article className="flex flex-col rounded-card bg-white p-5 ring-1 ring-line/60">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg leading-snug">{link.title}</h3>
        {link.discount ? <Chip tone="matcha">{link.discount}</Chip> : null}
      </div>
      <p className="mt-2 flex-1 text-[15px] leading-relaxed text-ink-soft">{link.tagline}</p>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <TrackedLink href={goHref(link.slug, source)} className={buttonClasses("tide", "sm")}>
          {link.buttonText}
        </TrackedLink>
        {link.code ? <CopyCode code={link.code} slug={link.slug} /> : null}
      </div>
    </article>
  );
}
