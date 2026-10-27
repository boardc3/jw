import { NextResponse, type NextRequest } from "next/server";
import { linkBySlug } from "@/lib/links";
import { trackServer, withUtm } from "@/lib/tracking";

/**
 * /go/<slug> — first-party outbound redirect.
 * Every affiliate, storefront and social link on the site routes through here so
 * clicks are counted on juliawarter.com (not just on Stan/ShopMy/Amazon dashboards).
 */
const SHORTENERS = ["a.co", "amzn.to", "amzn.markable.ai", "bit.ly"];

export async function GET(req: NextRequest, ctx: { params: Promise<{ slug: string }> }) {
  const { slug } = await ctx.params;
  const link = linkBySlug(slug);
  if (!link) return NextResponse.redirect(new URL("/links", req.url), 302);

  const source = req.nextUrl.searchParams.get("src") ?? "direct";
  const host = (() => {
    try {
      return new URL(link.url).hostname;
    } catch {
      return "";
    }
  })();
  const dest = SHORTENERS.some((s) => host.endsWith(s)) ? link.url : withUtm(link.url, source, "referral", slug);

  await trackServer({
    event: "outbound_click",
    slug,
    source,
    path: req.headers.get("referer") ?? undefined,
    ua: req.headers.get("user-agent") ?? undefined,
    referer: req.headers.get("referer") ?? undefined,
    meta: { category: link.category, host },
  });

  const res = NextResponse.redirect(dest, 302);
  res.headers.set("Cache-Control", "no-store");
  res.headers.set("X-Robots-Tag", "noindex, nofollow");
  return res;
}
