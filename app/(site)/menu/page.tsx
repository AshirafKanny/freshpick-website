import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Menu",
  description: "Browse FreshPick's fresh juices, smoothies, shawarma, chips and food.",
  path: "/menu",
});

const MENU_SECTIONS = [
  { href: "/menu/juices", name: "Juices & Smoothies", description: "Fresh juices, juice blends, smoothies and fruit cocktails" },
  { href: "/menu/food", name: "Food", description: "Restaurant food" },
  { href: "/menu/shawarma", name: "Shawarma", description: "" },
  { href: "/menu/chips", name: "Chips", description: "" },
];

export default function MenuPage() {
  return (
    <Section as="div">
      <Container>
        <h1 className="text-3xl font-semibold tracking-tight">Menu</h1>
        <p className="mt-2 text-muted">
          Explore FreshPick&apos;s menu categories below.
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {MENU_SECTIONS.map((section) => (
            <Link
              key={section.href}
              href={section.href}
              className="rounded-lg border border-border p-6 transition-colors hover:border-primary"
            >
              <h2 className="text-xl font-semibold">{section.name}</h2>
              {section.description && (
                <p className="mt-1 text-sm text-muted">{section.description}</p>
              )}
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
