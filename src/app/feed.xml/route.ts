import { getAllPosts } from "@/lib/blog";
import { absoluteUrl, site } from "@/lib/site";

const esc = (s: string) => s.replace(/[<>&'"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" })[c] as string);

export function GET() {
  const posts = getAllPosts().slice(0, 30);
  const items = posts
    .map(
      (p) => `<item>
  <title>${esc(p.title)}</title>
  <link>${absoluteUrl(`/blog/${p.slug}`)}</link>
  <guid isPermaLink="true">${absoluteUrl(`/blog/${p.slug}`)}</guid>
  <pubDate>${new Date(p.date).toUTCString()}</pubDate>
  <description>${esc(p.excerpt)}</description>
  ${p.tags.map((t) => `<category>${esc(t)}</category>`).join("")}
</item>`,
    )
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>${esc(site.name)}</title>
  <link>${site.url}</link>
  <atom:link href="${absoluteUrl("/feed.xml")}" rel="self" type="application/rss+xml"/>
  <description>${esc(site.description)}</description>
  <language>en-us</language>
  ${items}
</channel>
</rss>`;
  return new Response(xml, { headers: { "content-type": "application/rss+xml; charset=utf-8", "cache-control": "s-maxage=3600, stale-while-revalidate" } });
}
