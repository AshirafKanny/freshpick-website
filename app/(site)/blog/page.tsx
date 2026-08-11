import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { BlogCard } from "@/components/blog/BlogCard";
import { getAllPosts } from "@/lib/data/blog";
import { buildMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/lib/config/site";

export const metadata: Metadata = buildMetadata({
  title: "Blog",
  description: `Articles and updates from ${siteConfig.name}.`,
  path: "/blog",
});

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <Section as="div">
      <Container>
        <h1 className="text-3xl font-semibold tracking-tight">Blog</h1>
        {posts.length === 0 ? (
          <p className="mt-4 text-sm text-muted">
            No articles have been published yet — check back soon.
          </p>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
}
