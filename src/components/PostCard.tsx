import Image from "next/image";
import Link from "next/link";
import type { PostMeta } from "@/lib/blog";
import { tagLabels } from "@/lib/blog";

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });

export function PostCard({ post, large = false }: { post: PostMeta; large?: boolean }) {
  return (
    <article className={`group flex flex-col ${large ? "lg:flex-row lg:gap-8" : ""}`}>
      <Link href={`/blog/${post.slug}`} className={`block overflow-hidden rounded-card bg-shell ${large ? "lg:w-1/2" : ""}`}>
        <div className={`relative ${large ? "aspect-[16/10]" : "aspect-[16/10]"}`}>
          {post.cover ? (
            <Image
              src={post.cover}
              alt={post.coverAlt}
              fill
              sizes={large ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 768px) 33vw, 100vw"}
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-ink-soft">No image</div>
          )}
        </div>
      </Link>
      <div className={`mt-4 flex flex-col ${large ? "lg:mt-0 lg:w-1/2 lg:justify-center" : ""}`}>
        <div className="flex flex-wrap items-center gap-2 text-xs text-ink-soft">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden>·</span>
          <span>{post.readingMinutes} min read</span>
          {post.tags[0] ? (
            <>
              <span aria-hidden>·</span>
              <Link href={`/blog/tag/${post.tags[0]}`} className="text-tide hover:underline">
                {tagLabels[post.tags[0]] ?? post.tags[0]}
              </Link>
            </>
          ) : null}
        </div>
        <h3 className={`mt-2 leading-snug ${large ? "text-2xl sm:text-3xl" : "text-xl"}`}>
          <Link href={`/blog/${post.slug}`} className="hover:text-tide">
            {post.title}
          </Link>
        </h3>
        <p className={`mt-2 text-[15px] leading-relaxed text-ink-soft ${large ? "" : "line-clamp-3"}`}>{post.excerpt}</p>
      </div>
    </article>
  );
}
