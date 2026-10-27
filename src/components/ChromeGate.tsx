"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/** Hides site chrome (header/footer) on chrome-free pages like the bio link page. */
export function ChromeGate({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname === "/links") return null;
  return <>{children}</>;
}
