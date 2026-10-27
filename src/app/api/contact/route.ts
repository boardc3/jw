import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { site } from "@/lib/site";
import { trackServer } from "@/lib/tracking";

/**
 * Contact / brand-partnership inquiries.
 * Sends via Resend if RESEND_API_KEY is set, otherwise forwards to CONTACT_WEBHOOK_URL.
 */
const Body = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email(),
  company: z.string().max(120).optional(),
  type: z.enum(["brand", "consulting", "speaking", "press", "other"]).default("other"),
  budget: z.string().max(60).optional(),
  message: z.string().min(10).max(4000),
  website: z.string().optional(), // honeypot
});

export async function POST(req: NextRequest) {
  const parsed = Body.safeParse(await req.json().catch(() => ({})));
  if (!parsed.success) return NextResponse.json({ ok: false, error: "Please fill in your name, email and a short message." }, { status: 400 });
  const d = parsed.data;
  if (d.website) return NextResponse.json({ ok: true });

  const subject = `[${d.type}] ${d.name}${d.company ? ` — ${d.company}` : ""}`;
  const text = `Name: ${d.name}\nEmail: ${d.email}\nCompany: ${d.company ?? "-"}\nType: ${d.type}\nBudget: ${d.budget ?? "-"}\n\n${d.message}`;

  try {
    if (process.env.RESEND_API_KEY) {
      const r = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { "content-type": "application/json", authorization: `Bearer ${process.env.RESEND_API_KEY}` },
        body: JSON.stringify({
          from: process.env.CONTACT_FROM ?? "Website <hello@juliawarter.com>",
          to: [process.env.CONTACT_TO ?? site.email],
          reply_to: d.email,
          subject,
          text,
        }),
      });
      if (!r.ok) throw new Error(`Resend ${r.status}`);
    } else if (process.env.CONTACT_WEBHOOK_URL) {
      const r = await fetch(process.env.CONTACT_WEBHOOK_URL, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(d) });
      if (!r.ok) throw new Error(`Webhook ${r.status}`);
    } else if (process.env.NODE_ENV === "production") {
      return NextResponse.json({ ok: false, error: `Form isn't connected yet — email ${site.email} directly.` }, { status: 503 });
    } else {
      console.info("[contact]", subject, text);
    }
  } catch (err) {
    console.error("[contact]", err);
    return NextResponse.json({ ok: false, error: `Something went wrong — email ${site.email} directly.` }, { status: 502 });
  }

  await trackServer({ event: "contact_submit", meta: { type: d.type } });
  return NextResponse.json({ ok: true });
}
