import { NextResponse, type NextRequest } from "next/server";
import { trackServer, type TrackPayload } from "@/lib/tracking";

export async function POST(req: NextRequest) {
  let body: Partial<TrackPayload> = {};
  try {
    body = (await req.json()) as Partial<TrackPayload>;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  if (!body.event) return NextResponse.json({ ok: false }, { status: 400 });
  await trackServer({
    event: body.event,
    slug: body.slug,
    source: body.source,
    tier: body.tier,
    value: body.value,
    path: body.path,
    meta: body.meta,
    ua: req.headers.get("user-agent") ?? undefined,
    referer: req.headers.get("referer") ?? undefined,
  });
  return NextResponse.json({ ok: true });
}
