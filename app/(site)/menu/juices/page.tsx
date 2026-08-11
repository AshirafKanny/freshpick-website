import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { MenuGrid } from "@/components/menu/MenuGrid";
import { getMenuItemsByCategories } from "@/lib/data/menu";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Juices & Smoothies",
  description: "Fresh juices, juice blends, smoothies and fruit cocktails from FreshPick.",
  path: "/menu/juices",
});

export default function JuicesMenuPage() {
  const items = getMenuItemsByCategories(["juices", "juice-blends", "smoothies", "fruit-cocktails"]);

  return (
    <Section as="div">
      <Container>
        <h1 className="text-3xl font-semibold tracking-tight">Juices & Smoothies</h1>
        <p className="mt-2 text-muted">
          Fresh juices, juice blends, smoothies and fruit cocktails.
        </p>
        <div className="mt-8">
          <MenuGrid items={items} />
        </div>
      </Container>
    </Section>
  );
}
