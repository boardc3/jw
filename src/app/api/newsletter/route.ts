import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { trackServer } from "@/lib/tracking";

/**
 * Newsletter subscribe endpoint.
 * Supports Kit (ConvertKit), Beehiiv or a generic webhook — whichever env vars are set.
 * With nothing configured it still returns ok in development so the UI can be reviewed.
 */
const Body = z.object({
  email: z.string().email(),
  firstName: z.string().max(80).optional(),
  source: z.string().max(80).optional(), // where on the site the signup happened
  tags: z.array(z.string().max(60)).max(10).optional(), // segments, e.g. ["quiz:puffy", "lead:2-minute-flush"]
  website: z.string().optional(), // honeypot
});

export async function POST(req: NextRequest) {
  const parsed = Body.safeParse(await req.json().catch(() => ({})));
  if (!parsed.success) return NextResponse.json({ ok: false, error: "Enter a valid email address." }, { status: 400 });
  const { email, firstName, source, tags, website } = parsed.data;
  if (website) return NextResponse.json({ ok: true }); // bot filled the honeypot

  const tagList = [...(tags ?? []), source ? `source:${source}` : ""].filter(Boolean);

  try {
    if (process.env.KIT_API_KEY && process.env.KIT_FORM_ID) {
      // Kit (formerly ConvertKit) v3 form subscribe
      const r = await fetch(`https://api.convertkit.com/v3/forms/${process.env.KIT_FORM_ID}/subscribe`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ api_key: process.env.KIT_API_KEY, email, first_name: firstName, tags: tagList }),
      });
      if (!r.ok) throw new Error(`Kit ${r.status}`);
    } else if (process.env.BEEHIIV_API_KEY && process.env.BEEHIIV_PUBLICATION_ID) {
      const r = await fetch(`https://api.beehiiv.com/v2/publications/${process.env.BEEHIIV_PUBLICATION_ID}/subscriptions`, {
        method: "POST",
        headers: { "content-type": "application/json", authorization: `Bearer ${process.env.BEEHIIV_API_KEY}` },
        body: JSON.stringify({
          email,
          reactivate_existing: true,
          send_welcome_email: true,
          utm_source: "juliawarter.com",
          utm_medium: source ?? "website",
          custom_fields: firstName ? [{ name: "First Name", value: firstName }] : [],
        }),
      });
      if (!r.ok) throw new Error(`Beehiiv ${r.status}`);
    } else if (process.env.NEWSLETTER_WEBHOOK_URL) {
      const r = await fetch(process.env.NEWSLETTER_WEBHOOK_URL, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, firstName, source, tags: tagList, ts: new Date().toISOString() }),
      });
      if (!r.ok) throw new Error(`Webhook ${r.status}`);
    } else if (process.env.NODE_ENV === "production") {
      return NextResponse.json({ ok: false, error: "Newsletter isn't connected yet." }, { status: 503 });
    }
  } catch (err) {
    console.error("[newsletter]", err);
    return NextResponse.json({ ok: false, error: "Something went wrong. Try again in a moment." }, { status: 502 });
  }

  await trackServer({ event: "newsletter_subscribe", source, meta: { tags: tagList.join(",") } });
  return NextResponse.json({ ok: true });
}
