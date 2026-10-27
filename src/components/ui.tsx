import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

export function Container({ className = "", children, ...rest }: ComponentProps<"div">) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`} {...rest}>
      {children}
    </div>
  );
}

type Tone = "tide" | "matcha" | "outline" | "ghost" | "white";
type Size = "sm" | "md" | "lg";

const toneClass: Record<Tone, string> = {
  tide: "bg-tide text-white hover:bg-tide-deep",
  matcha: "bg-matcha text-ink hover:bg-[#a9cc45]",
  outline: "border border-ink/25 text-ink hover:border-ink hover:bg-white/60",
  ghost: "text-tide hover:bg-tide/8",
  white: "bg-white text-tide hover:bg-mist",
};
const sizeClass: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-[15px]",
  lg: "h-13 px-8 text-base",
};

export function buttonClasses(tone: Tone = "tide", size: Size = "md", extra = "") {
  return `inline-flex items-center justify-center gap-2 rounded-pill font-semibold tracking-[-0.01em] transition-colors duration-150 whitespace-nowrap ${toneClass[tone]} ${sizeClass[size]} ${extra}`;
}

export function Button({
  href,
  tone = "tide",
  size = "md",
  className = "",
  children,
  external,
  ...rest
}: {
  href?: string;
  tone?: Tone;
  size?: Size;
  className?: string;
  children: ReactNode;
  external?: boolean;
} & Omit<ComponentProps<"button">, "children">) {
  const cls = buttonClasses(tone, size, className);
  if (href) {
    if (external || href.startsWith("http") || href.startsWith("mailto:")) {
      return (
        <a href={href} className={cls} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener" : undefined}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}

export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function SectionHeading({
  title,
  intro,
  align = "left",
  as: Tag = "h2",
  className = "",
}: {
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
  className?: string;
}) {
  return (
    <div className={`${align === "center" ? "mx-auto text-center" : ""} max-w-2xl ${className}`}>
      <Tag className={Tag === "h1" ? "text-4xl sm:text-5xl lg:text-6xl" : "text-3xl sm:text-4xl"}>{title}</Tag>
      {intro ? <p className="mt-4 text-lg leading-relaxed text-ink-soft">{intro}</p> : null}
    </div>
  );
}

/** Capsule-masked image frame — the site's one signature device (fluid / drop). */
export function Capsule({ className = "", children }: { className?: string; children: ReactNode }) {
  return <div className={`capsule relative bg-shell ${className}`}>{children}</div>;
}

export function Chip({ children, tone = "shell" }: { children: ReactNode; tone?: "shell" | "matcha" | "tide" }) {
  const t =
    tone === "matcha" ? "bg-matcha text-ink" : tone === "tide" ? "bg-tide text-white" : "bg-shell text-ink-soft";
  return <span className={`inline-flex items-center self-start rounded-pill px-3 py-1 text-xs font-semibold ${t}`}>{children}</span>;
}
