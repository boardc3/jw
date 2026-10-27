import type { MetadataRoute } from "next";
import { getAllPosts, getAllTags } from "@/lib/blog";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/the-lymphatic-reset-method"), lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: absoluteUrl("/free"), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/favorites"), lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: absoluteUrl("/shop"), lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: absoluteUrl("/coaching"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/blog"), lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: absoluteUrl("/about"), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: absoluteUrl("/quiz"), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: absoluteUrl("/work-with-me"), lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: absoluteUrl("/newsletter"), lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: absoluteUrl("/contact"), lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: absoluteUrl("/donate"), lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: absoluteUrl("/privacy"), lastModified: now, changeFrequency: "yearly", priority: 0.1 },
    { url: absoluteUrl("/terms"), lastModified: now, changeFrequency: "yearly", priority: 0.1 },
    { url: absoluteUrl("/disclaimer"), lastModified: now, changeFrequency: "yearly", priority: 0.1 },
  ];
  const posts: MetadataRoute.Sitemap = getAllPosts().map((p) => ({
    url: absoluteUrl(`/blog/${p.slug}`),
    lastModified: new Date(p.date),
    changeFrequency: "monthly",
    priority: p.featured ? 0.8 : 0.6,
  }));
  const tags: MetadataRoute.Sitemap = getAllTags().map((t) => ({
    url: absoluteUrl(`/blog/tag/${t.tag}`),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.4,
  }));
  return [...staticRoutes, ...posts, ...tags];
}
