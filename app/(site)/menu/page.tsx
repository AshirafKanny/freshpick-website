import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CategoryFilter, type FilterOption } from "@/components/menu/CategoryFilter";
import { MenuGrid } from "@/components/menu/MenuGrid";
import { MENU_CATEGORIES, MENU_ITEMS, getMenuItemsByCategory } from "@/lib/data/menu";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Menu",
  description: "Browse FreshPick's fresh juices, smoothies, shawarma, chips and food.",
  path: "/menu",
});

const FILTER_OPTIONS: FilterOption[] = [
  { slug: "all", label: "All" },
  ...MENU_CATEGORIES.map((category) => ({ slug: category.slug, label: category.name })),
];

export default async function MenuPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const active = category && MENU_CATEGORIES.some((c) => c.slug === category) ? category : "all";
  const items = active === "all" ? MENU_ITEMS : getMenuItemsByCategory(active);

  return (
    <Section as="div">
      <Container>
        <SectionHeading
          eyebrow="Menu"
          title="Everything on the menu"
          description="Filter by category to find exactly what you're craving."
        />
        <div className="mt-8">
          <CategoryFilter options={FILTER_OPTIONS} active={active} />
        </div>
        <div className="mt-10">
          <MenuGrid items={items} />
        </div>
      </Container>
    </Section>
  );
}
