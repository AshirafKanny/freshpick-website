import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { JsonLd } from "@/components/seo/JsonLd";
import { getAllPosts, getPostBySlug } from "@/lib/data/blog";
import { buildMetadata } from "@/lib/seo/metadata";
import { getBlogPostingSchema, getBreadcrumbSchema } from "@/lib/seo/schema";
import { formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

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
        <JsonLd
          data={getBreadcrumbSchema([
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ])}
        />
        <p className="text-xs text-muted">
          {formatDate(post.publishedAt)} &middot; {post.readingTime} min read
        </p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight">{post.title}</h1>
        {post.featuredImage && (
          <Image
            src={post.featuredImage}
            alt={post.imageAlt ?? post.title}
            width={800}
            height={450}
            className="mt-6 h-auto w-full rounded-lg object-cover"
            priority
          />
        )}
        <div className="prose mt-8 max-w-none">{post.content}</div>
      </Container>
    </Section>
  );
}
