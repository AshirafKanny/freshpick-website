import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/ui/FadeIn";
import { CategoryTile } from "@/components/menu/CategoryTile";
import { MenuGrid } from "@/components/menu/MenuGrid";
import { CATEGORY_ICONS } from "@/components/menu/category-icons";
import { MENU_CATEGORIES, getFeaturedMenuItems } from "@/lib/data/menu";

const JUICE_CATEGORY_SLUGS = ["juices", "juice-blends", "smoothies", "fruit-cocktails"];

export function FeaturedProducts() {
  const categories = MENU_CATEGORIES.filter((category) => JUICE_CATEGORY_SLUGS.includes(category.slug));
  const featured = getFeaturedMenuItems().filter((item) => JUICE_CATEGORY_SLUGS.includes(item.category));

  return (
    <Section as="div">
      <Container>
        <FadeIn>
          <SectionHeading
            eyebrow="Fresh Picks"
            title="Fruit juices, blends & smoothies"
            description="Cold, fresh and made from real fruit."
          />
        </FadeIn>

        <div className="mt-10">
          {featured.length > 0 ? (
            <MenuGrid items={featured} />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {categories.map((category, index) => (
                <FadeIn key={category.slug} delay={index * 0.06}>
                  <CategoryTile
                    href={`/menu/juices`}
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
