import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { GalleryGrid, type GalleryImage } from "@/components/gallery/GalleryGrid";
import { buildMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/lib/config/site";

export const metadata: Metadata = buildMetadata({
  title: "Gallery",
  description: `Photos from ${siteConfig.name}.`,
  path: "/gallery",
});

// Intentionally empty until real FreshPick photography is provided.
const GALLERY_IMAGES: GalleryImage[] = [];

export default function GalleryPage() {
  return (
    <Section as="div">
      <Container>
        <h1 className="text-3xl font-semibold tracking-tight">Gallery</h1>
        <div className="mt-8">
          <GalleryGrid images={GALLERY_IMAGES} />
        </div>
      </Container>
    </Section>
  );
}
