import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import type { BlogPost } from "@/types/blog";

export function BlogCard({ post, featured = false }: { post: BlogPost; featured?: boolean }) {
  return (
    <article
      className={
        featured
          ? "grid gap-6 overflow-hidden rounded-2xl border border-border bg-surface md:grid-cols-2"
          : "overflow-hidden rounded-2xl border border-border bg-surface"
      }
    >
      {post.featuredImage ? (
        <Image
          src={post.featuredImage}
          alt={post.imageAlt ?? post.title}
          width={featured ? 700 : 400}
          height={featured ? 525 : 250}
          className={featured ? "h-64 w-full object-cover md:h-full" : "h-40 w-full object-cover"}
        />
      ) : (
        <div className={featured ? "h-64 w-full bg-primary-light md:h-full" : "h-40 w-full bg-primary-light"} aria-hidden="true" />
      )}
      <div className="flex flex-col justify-center p-5">
        <p className="text-xs text-muted">
          {formatDate(post.publishedAt)} &middot; {post.readingTime} min read
        </p>
        <h3 className={featured ? "mt-2 font-display text-2xl font-semibold" : "mt-1 font-display text-lg font-semibold"}>
          <Link href={`/blog/${post.slug}`} className="hover:text-primary">
            {post.title}
          </Link>
        </h3>
        <p className="mt-2 text-sm text-muted">{post.excerpt}</p>
      </div>
    </article>
  );
}
