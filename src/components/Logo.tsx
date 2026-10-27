/** A single drop — lymph, flow, the green drink. Drawn once, reused for favicon/OG. */
export function Logo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" focusable="false">
      <path
        d="M16 2.5c4.2 6.1 9.5 11.2 9.5 17.1 0 5.5-4.3 9.9-9.5 9.9S6.5 25.1 6.5 19.6c0-5.9 5.3-11 9.5-17.1Z"
        fill="var(--tide)"
      />
      <path d="M12.2 20.2c.4 3 2.3 4.9 4.6 5.3" stroke="var(--matcha)" strokeWidth="2.2" strokeLinecap="round" fill="none" />
    </svg>
  );
}
