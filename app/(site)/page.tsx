import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { LinkButton } from "@/components/ui/Button";
import { buildMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/lib/config/site";

export const metadata: Metadata = buildMetadata({
  title: "FreshPick | Fresh Juices & Food in Uganda",
  description: siteConfig.description,
  path: "/",
});

export default function HomePage() {
  return (
    <Section as="div">
      <Container className="text-center">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">{siteConfig.name}</h1>
        <p className="mt-4 text-lg text-muted">{siteConfig.description}</p>
        <div className="mt-8 flex justify-center gap-4">
          <LinkButton href="/menu">View Menu</LinkButton>
          <LinkButton href="/contact" variant="outline">
            Contact Us
          </LinkButton>
        </div>
      </Container>
    </Section>
  );
}
