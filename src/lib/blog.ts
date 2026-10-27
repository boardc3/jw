import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeStringify from "rehype-stringify";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export interface PostMeta {
  title: string;
  slug: string;
  date: string; // ISO
  excerpt: string;
  cover: string;
  coverAlt: string;
  tags: string[];
  author: string;
  featured: boolean;
  readingMinutes: number;
  migrationNote?: string;
}

export interface Post extends PostMeta {
  html: string;
  headings: { id: string; text: string; depth: number }[];
}

export const tagLabels: Record<string, string> = {
  "gut-health": "Gut health",
  ibs: "IBS",
  lymphatic: "Lymphatic drainage",
  liver: "Liver & gallbladder",
  "low-fodmap": "Low-FODMAP",
  supplements: "Supplements",
  "product-review": "Product reviews",
  recipe: "Recipes",
  interview: "Interviews",
  lifestyle: "Lifestyle",
  hair: "Hair & skin",
  fasting: "Fasting",
  news: "News",
};

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

function readAllFiles(): { slug: string; raw: string }[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"))
    .map((f) => ({ slug: f.replace(/\.mdx?$/, ""), raw: fs.readFileSync(path.join(BLOG_DIR, f), "utf8") }));
}

function toMeta(slug: string, raw: string): PostMeta & { content: string } {
  const { data, content } = matter(raw);
  const rt = readingTime(content);
  return {
    title: String(data.title ?? slug),
    slug: String(data.slug ?? slug),
    date: new Date(String(data.date ?? "2023-01-01")).toISOString(),
    excerpt: String(data.excerpt ?? ""),
    cover: String(data.cover ?? "").replace(/^http:\/\//, "https://"),
    coverAlt: String(data.coverAlt ?? data.title ?? ""),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    author: String(data.author ?? "Julia Warter"),
    featured: Boolean(data.featured),
    readingMinutes: Number(data.readingTimeOverride) || Math.max(1, Math.round(rt.minutes)),
    migrationNote: data.migrationNote ? String(data.migrationNote) : undefined,
    content,
  };
}

export function getAllPosts(): PostMeta[] {
  return readAllFiles()
    .map(({ slug, raw }) => {
      const m = toMeta(slug, raw);
      const { content: _c, ...meta } = m;
      void _c;
      return meta;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getFeaturedPosts(limit = 3): PostMeta[] {
  const all = getAllPosts();
  const featured = all.filter((p) => p.featured);
  return [...featured, ...all.filter((p) => !p.featured)].slice(0, limit);
}

export function getAllTags(): { tag: string; label: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const p of getAllPosts()) for (const t of p.tags) counts.set(t, (counts.get(t) ?? 0) + 1);
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, label: tagLabels[tag] ?? tag, count }))
    .sort((a, b) => b.count - a.count);
}

export function getPostsByTag(tag: string): PostMeta[] {
  return getAllPosts().filter((p) => p.tags.includes(tag));
}

export function getRelatedPosts(post: PostMeta, limit = 3): PostMeta[] {
  const others = getAllPosts().filter((p) => p.slug !== post.slug);
  const scored = others.map((p) => ({
    p,
    score: p.tags.filter((t) => post.tags.includes(t)).length,
  }));
  return scored
    .sort((a, b) => b.score - a.score || (a.p.date < b.p.date ? 1 : -1))
    .slice(0, limit)
    .map((s) => s.p);
}

export async function getPost(slug: string): Promise<Post | null> {
  const file = readAllFiles().find((f) => f.slug === slug);
  if (!file) return null;
  const meta = toMeta(slug, file.raw);

  const headings: Post["headings"] = [];
  for (const line of meta.content.split("\n")) {
    const m = /^(#{2,3})\s+(.+?)\s*#*\s*$/.exec(line);
    if (m) {
      const text = m[2].replace(/\[(.*?)\]\(.*?\)/g, "$1").replace(/[*_`]/g, "");
      headings.push({ id: slugify(text), text, depth: m[1].length });
    }
  }

  const processed = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, { behavior: "wrap" })
    .use(rehypeStringify)
    .process(meta.content);

  // Outbound links: open in new tab, nofollow sponsored.
  const html = String(processed).replace(/<a href="(https?:\/\/[^"]+)"/g, (_m, href: string) => {
    const isOwn = /juliawarter\.com/.test(href);
    return isOwn ? `<a href="${href}"` : `<a href="${href}" target="_blank" rel="noopener sponsored nofollow"`;
  });

  const { content: _c, ...rest } = meta;
  void _c;
  return { ...rest, html, headings };
}
