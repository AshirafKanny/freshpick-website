import type { Metadata } from "next";
import { Search } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BlogCard } from "@/components/blog/BlogCard";
import { cn } from "@/lib/utils";
import { BLOG_CATEGORIES, getAllPosts, searchPosts } from "@/lib/data/blog";
import { buildMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/lib/config/site";

export const metadata: Metadata = buildMetadata({
  title: "Blog",
  description: `Articles and updates from ${siteConfig.name}.`,
  path: "/blog",
});

export default async function BlogIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string }>;
}) {
  const { category, q } = await searchParams;
  const allPosts = getAllPosts();
  const [featured, ...rest] = allPosts;
  const isFiltering = Boolean(category || q);
  const results = isFiltering ? searchPosts(q ?? "", category) : rest;

  return (
    <Section as="div">
      <Container>
        <SectionHeading eyebrow="Blog" title="Fresh reads from FreshPick" />

        <form method="get" className="mt-8 flex max-w-sm items-center gap-2 rounded-full border border-border px-4 py-2">
          <Search size={16} className="text-muted" aria-hidden="true" />
          <input
            type="search"
            name="q"
            defaultValue={q}
            placeholder="Search articles"
            aria-label="Search articles"
            className="w-full bg-transparent text-sm outline-none"
          />
        </form>

        <div className="mt-6 flex flex-wrap gap-2" role="tablist" aria-label="Blog categories">
          <Link
            href="/blog"
            role="tab"
            aria-selected={!category}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              !category ? "border-primary bg-primary text-white" : "border-border hover:border-primary"
            )}
          >
            All
          </Link>
          {BLOG_CATEGORIES.map((cat) => (
            <Link
              key={cat}
              href={`/blog?category=${encodeURIComponent(cat)}`}
              role="tab"
              aria-selected={category === cat}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                category === cat
                  ? "border-primary bg-primary text-white"
                  : "border-border hover:border-primary"
              )}
            >
              {cat}
            </Link>
          ))}
        </div>

        {allPosts.length === 0 ? (
          <p className="mt-10 text-sm text-muted">
            No articles have been published yet — check back soon.
          </p>
        ) : (
          <>
            {!isFiltering && featured && (
              <div className="mt-10">
                <BlogCard post={featured} featured />
              </div>
            )}
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
            {isFiltering && results.length === 0 && (
              <p className="mt-10 text-sm text-muted">No articles match your search.</p>
            )}
          </>
        )}
      </Container>
    </Section>
  );
}
