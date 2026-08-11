import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import type { BlogPost } from "@/types/blog";

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="rounded-lg border border-border p-4">
      {post.featuredImage && (
        <Image
          src={post.featuredImage}
          alt={post.imageAlt ?? post.title}
          width={400}
          height={250}
          className="mb-4 h-40 w-full rounded-md object-cover"
        />
      )}
      <p className="text-xs text-muted">
        {formatDate(post.publishedAt)} &middot; {post.readingTime} min read
      </p>
      <h3 className="mt-1 text-lg font-semibold">
        <Link href={`/blog/${post.slug}`} className="hover:text-primary">
          {post.title}
        </Link>
      </h3>
      <p className="mt-1 text-sm text-muted">{post.excerpt}</p>
    </article>
  );
}
