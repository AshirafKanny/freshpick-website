import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { MenuGrid } from "@/components/menu/MenuGrid";
import { OrderButton } from "@/components/ui/OrderButton";
import { Badge } from "@/components/ui/Badge";
import { MENU_CATEGORIES, MENU_ITEMS, getMenuItemBySlug, getMenuItemsByCategory } from "@/lib/data/menu";
import { buildMetadata } from "@/lib/seo/metadata";
import { getProductSchema } from "@/lib/seo/schema";
import { formatCurrency } from "@/lib/utils";

export function generateStaticParams() {
  return MENU_ITEMS.map((item) => ({ slug: item.slug }));
}

// Menu content only changes via a rebuild (no live database), so slugs not
// known at build time should 404 immediately at the routing layer instead
// of falling back to an on-demand-rendered 200 response.
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getMenuItemBySlug(slug);
  if (!item) return {};

  return buildMetadata({
    title: item.name,
    description: item.description,
    path: `/menu/${item.slug}`,
    image: item.image,
    imageAlt: item.alt,
  });
}

export default async function MenuItemPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getMenuItemBySlug(slug);
  if (!item) notFound();

  const category = MENU_CATEGORIES.find((c) => c.slug === item.category);
  const related = getMenuItemsByCategory(item.category).filter((i) => i.slug !== item.slug).slice(0, 3);

  return (
    <Section as="div">
      <Container>
        <JsonLd data={getProductSchema(item)} />
        <Breadcrumbs
          items={[
            { name: "Menu", path: "/menu" },
            ...(category ? [{ name: category.name, path: `/menu?category=${category.slug}` }] : []),
            { name: item.name, path: `/menu/${item.slug}` },
          ]}
        />

        <div className="mt-6 grid gap-10 lg:grid-cols-2">
          {item.image ? (
            <Image
              src={item.image}
              alt={item.alt ?? item.name}
              width={700}
              height={525}
              className="w-full rounded-2xl object-cover"
              priority
            />
          ) : (
            <div className="aspect-4/3 w-full rounded-2xl bg-primary-light" aria-hidden="true" />
          )}

          <div>
            {category && <Badge>{category.name}</Badge>}
            <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              {item.name}
            </h1>
            <p className="mt-3 text-muted">{item.description}</p>

            {item.price !== undefined && item.currency && (
              <p className="mt-6 text-2xl font-semibold">
                {formatCurrency(item.price, item.currency)}
              </p>
            )}

            {item.ingredients && item.ingredients.length > 0 && (
              <div className="mt-6">
                <p className="text-sm font-semibold">Ingredients</p>
                <p className="mt-1 text-sm text-muted">{item.ingredients.join(", ")}</p>
              </div>
            )}

            {!item.available && (
              <p className="mt-6 text-sm font-medium text-secondary">Currently unavailable</p>
            )}

            <div className="mt-8">
              <OrderButton size="lg" />
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="font-display text-2xl font-semibold">You might also like</h2>
            <div className="mt-6">
              <MenuGrid items={related} />
            </div>
          </div>
        )}
      </Container>
    </Section>
  );
}
