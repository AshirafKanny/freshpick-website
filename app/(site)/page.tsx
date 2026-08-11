import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { QuickInfo } from "@/components/home/QuickInfo";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { FoodShowcase } from "@/components/home/FoodShowcase";
import { WhyFreshPick } from "@/components/home/WhyFreshPick";
import { FreshnessStory } from "@/components/home/FreshnessStory";
import { GalleryPreview } from "@/components/home/GalleryPreview";
import { BlogPreview } from "@/components/home/BlogPreview";
import { ContactCTA } from "@/components/home/ContactCTA";
import { buildMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/lib/config/site";

export const metadata: Metadata = buildMetadata({
  title: "FreshPick | Fresh Juices & Food in Uganda",
  description: siteConfig.description,
  path: "/",
  absoluteTitle: true,
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <QuickInfo />
      <FeaturedProducts />
      <FoodShowcase />
      <WhyFreshPick />
      <FreshnessStory />
      <GalleryPreview />
      <BlogPreview />
      <ContactCTA />
    </>
  );
}
