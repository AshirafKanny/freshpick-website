import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { GalleryFilter } from "@/components/gallery/GalleryFilter";
import { GALLERY_CATEGORIES, GALLERY_IMAGES } from "@/lib/data/gallery";
import { buildMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/lib/config/site";

export const metadata: Metadata = buildMetadata({
  title: "Gallery",
  description: `Photos from ${siteConfig.name}.`,
  path: "/gallery",
});

export default async function GalleryPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const active =
    category && GALLERY_CATEGORIES.some((c) => c.slug === category) ? category : "all";
  const images = active === "all" ? GALLERY_IMAGES : GALLERY_IMAGES.filter((img) => img.category === active);

  return (
    <Section as="div">
      <Container>
        <SectionHeading eyebrow="Gallery" title="FreshPick in pictures" />
        <div className="mt-8">
          <GalleryFilter categories={GALLERY_CATEGORIES} active={active} />
        </div>
        <div className="mt-10">
          <GalleryGrid images={images} />
        </div>
      </Container>
    </Section>
  );
}
