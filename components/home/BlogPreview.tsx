import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";
import { BlogCard } from "@/components/blog/BlogCard";
import { getAllPosts } from "@/lib/data/blog";

export function BlogPreview() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <Section as="div" className="bg-surface">
      <Container>
        <FadeIn className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow="From the Blog" title="Fresh reads" />
          <LinkButton href="/blog" variant="outline" size="sm">
            All Articles
          </LinkButton>
        </FadeIn>

        <div className="mt-10">
          {posts.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted">
              Our first articles about fresh juice and food are on the way — check back soon.
            </p>
          )}
        </div>
      </Container>
    </Section>
  );
}
