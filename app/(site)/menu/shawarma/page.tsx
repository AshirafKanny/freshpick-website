import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { MenuGrid } from "@/components/menu/MenuGrid";
import { getMenuItemsByCategory } from "@/lib/data/menu";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Shawarma",
  description: "Shawarma from FreshPick.",
  path: "/menu/shawarma",
});

export default function ShawarmaMenuPage() {
  const items = getMenuItemsByCategory("shawarma");

  return (
    <Section as="div">
      <Container>
        <h1 className="text-3xl font-semibold tracking-tight">Shawarma</h1>
        <div className="mt-8">
          <MenuGrid items={items} />
        </div>
      </Container>
    </Section>
  );
}
