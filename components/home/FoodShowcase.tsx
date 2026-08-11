import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/ui/FadeIn";
import { CategoryTile } from "@/components/menu/CategoryTile";
import { MenuGrid } from "@/components/menu/MenuGrid";
import { CATEGORY_ICONS } from "@/components/menu/category-icons";
import { MENU_CATEGORIES, getFeaturedMenuItems } from "@/lib/data/menu";

const FOOD_CATEGORY_SLUGS = ["shawarma", "chips", "food"];
const FOOD_CATEGORY_HREF: Record<string, string> = {
  shawarma: "/menu/shawarma",
  chips: "/menu/chips",
  food: "/menu/food",
};

export function FoodShowcase() {
  const categories = MENU_CATEGORIES.filter((category) => FOOD_CATEGORY_SLUGS.includes(category.slug));
  const featured = getFeaturedMenuItems().filter((item) => FOOD_CATEGORY_SLUGS.includes(item.category));

  return (
    <Section as="div" className="bg-surface">
      <Container>
        <FadeIn>
          <SectionHeading
            eyebrow="More Than Juice"
            title="Shawarma, chips & food"
            description="Satisfying favourites alongside every fresh drink."
          />
        </FadeIn>

        <div className="mt-10">
          {featured.length > 0 ? (
            <MenuGrid items={featured} />
          ) : (
            <div className="grid gap-6 sm:grid-cols-3">
              {categories.map((category, index) => (
                <FadeIn key={category.slug} delay={index * 0.06}>
                  <CategoryTile
                    href={FOOD_CATEGORY_HREF[category.slug]}
                    icon={CATEGORY_ICONS[category.slug]}
                    name={category.name}
                    description={category.description}
                  />
                </FadeIn>
              ))}
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
}
