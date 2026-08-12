import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";
import { CategoryTile } from "@/components/menu/CategoryTile";
import { CATEGORY_ICONS } from "@/components/menu/category-icons";
import { MENU_CATEGORIES } from "@/lib/data/menu";
import { buildMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/lib/config/site";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description: `Learn about ${siteConfig.name}, a fresh-food business in ${siteConfig.country}.`,
  path: "/about",
});

const CATEGORY_HREF: Record<string, string> = {
  juices: "/menu/juices",
  "juice-blends": "/menu/juices",
  smoothies: "/menu/juices",
  "fruit-cocktails": "/menu/juices",
  shawarma: "/menu/shawarma",
  chips: "/menu/chips",
  food: "/menu/food",
};

export default function AboutPage() {
  return (
    <>
      <Section as="div">
        <Container className="max-w-3xl">
          <FadeIn>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">About Us</p>
            <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              {siteConfig.name}
            </h1>
            <p className="mt-6 text-lg text-muted">{siteConfig.description}</p>
          </FadeIn>

          <FadeIn delay={0.1} className="mt-10 rounded-2xl border border-border bg-surface p-6">
            <h2 className="font-display text-xl font-semibold">Our Story</h2>
            <p className="mt-2 text-sm text-muted">
              {siteConfig.name}&apos;s full story — how it started and what drives it — is being
              written and will appear here soon.
            </p>
          </FadeIn>
        </Container>
      </Section>

      <Section as="div" className="bg-surface">
        <Container>
          <FadeIn>
            <SectionHeading eyebrow="What We Offer" title="Fresh drinks and food, together" />
          </FadeIn>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {MENU_CATEGORIES.map((category, index) => (
              <FadeIn key={category.slug} delay={index * 0.05}>
                <CategoryTile
                  href={CATEGORY_HREF[category.slug]}
                  icon={CATEGORY_ICONS[category.slug]}
                  name={category.name}
                  description={category.description}
                />
              </FadeIn>
            ))}
          </div>
        </Container>
      </Section>

      <Section as="div">
        <Container className="flex flex-col items-center gap-6 text-center">
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">
            Ready to try {siteConfig.name}?
          </h2>
          <LinkButton href="/menu" size="lg">
            Explore Menu
          </LinkButton>
        </Container>
      </Section>
    </>
  );
}
