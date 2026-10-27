export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-line rounded-card bg-white ring-1 ring-line/60">
      {items.map((f) => (
        <details key={f.q} className="group px-6 py-5 open:bg-mist/60">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-semibold [&::-webkit-details-marker]:hidden">
            {f.q}
            <span className="shrink-0 text-tide transition-transform duration-200 group-open:rotate-45" aria-hidden>
              +
            </span>
          </summary>
          <p className="mt-3 max-w-prose text-[15px] leading-relaxed text-ink-soft">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
