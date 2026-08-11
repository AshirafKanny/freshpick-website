import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { MenuGrid } from "@/components/menu/MenuGrid";
import { getMenuItemsByCategory } from "@/lib/data/menu";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Food",
  description: "Restaurant food from FreshPick.",
  path: "/menu/food",
});

export default function FoodMenuPage() {
  const items = getMenuItemsByCategory("food");

  return (
    <Section as="div">
      <Container>
        <h1 className="text-3xl font-semibold tracking-tight">Food</h1>
        <div className="mt-8">
          <MenuGrid items={items} />
        </div>
      </Container>
    </Section>
  );
}
