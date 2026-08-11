import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { buildMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/lib/config/site";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description: `Learn about ${siteConfig.name}, a fresh-food business in ${siteConfig.country}.`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <Section as="div">
      <Container>
        <h1 className="text-3xl font-semibold tracking-tight">About {siteConfig.name}</h1>
        <p className="mt-4 max-w-2xl text-muted">
          Our full story is being written and will appear here soon.
        </p>
      </Container>
    </Section>
  );
}
