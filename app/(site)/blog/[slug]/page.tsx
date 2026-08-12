import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { Badge } from "@/components/ui/Badge";
import { getAllPosts, getPostBySlug } from "@/lib/data/blog";
import { buildMetadata } from "@/lib/seo/metadata";
import { getBlogPostingSchema } from "@/lib/seo/schema";
import { formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

// Blog content only changes via a rebuild (no live database), so slugs not
// known at build time should 404 immediately at the routing layer instead
// of falling back to an on-demand-rendered 200 response.
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return buildMetadata({
    title: post.seoTitle ?? post.title,
    description: post.seoDescription ?? post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.featuredImage,
    imageAlt: post.imageAlt,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <Section as="div">
      <Container className="max-w-3xl">
        <JsonLd data={getBlogPostingSchema(post)} />
        <Breadcrumbs items={[{ name: "Blog", path: "/blog" }, { name: post.title, path: `/blog/${post.slug}` }]} />

        <div className="mt-6">
          <Badge>{post.category}</Badge>
          <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-3 text-sm text-muted">
            By {post.author} &middot; {formatDate(post.publishedAt)} &middot; {post.readingTime} min read
          </p>
        </div>

        {post.featuredImage && (
          <Image
            src={post.featuredImage}
            alt={post.imageAlt ?? post.title}
            width={800}
            height={450}
            className="mt-8 h-auto w-full rounded-2xl object-cover"
            priority
          />
        )}

        <div className="mt-8 max-w-none whitespace-pre-line leading-relaxed text-foreground">
          {post.content}
        </div>
      </Container>
    </Section>
  );
}
