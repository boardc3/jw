"use client";

import Link from "next/link";
import type { ComponentProps, MouseEvent } from "react";
import { trackClient, type TrackEvent } from "@/lib/tracking";

/**
 * Link that fires a first-party analytics event on click.
 * For /go/ links the server also logs the redirect, so we only send a light client ping.
 */
export function TrackedLink({
  event = "cta_click",
  slug,
  source,
  tier,
  onClick,
  href,
  children,
  ...rest
}: ComponentProps<typeof Link> & { event?: TrackEvent; slug?: string; source?: string; tier?: string }) {
  const h = typeof href === "string" ? href : "";
  const isGo = h.startsWith("/go/");
  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    trackClient({ event: isGo ? "outbound_click" : event, slug: slug ?? (isGo ? h.split("/")[2]?.split("?")[0] : undefined), source, tier });
    onClick?.(e);
  };
  if (isGo) {
    return (
      <a href={h} onClick={handle} target="_blank" rel="noopener sponsored" {...(rest as ComponentProps<"a">)}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} onClick={handle} {...rest}>
      {children}
    </Link>
  );
}
