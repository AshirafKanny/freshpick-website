import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { JsonLd } from "@/components/seo/JsonLd";
import { FAQ_ITEMS } from "@/lib/data/faq";
import { buildMetadata } from "@/lib/seo/metadata";
import { getFaqSchema } from "@/lib/seo/schema";
import { siteConfig } from "@/lib/config/site";

export const metadata: Metadata = buildMetadata({
  title: "FAQ",
  description: `Frequently asked questions about ${siteConfig.name}.`,
  path: "/faq",
});

export default function FaqPage() {
  return (
    <Section as="div">
      <Container className="max-w-2xl">
        {FAQ_ITEMS.length > 0 && <JsonLd data={getFaqSchema(FAQ_ITEMS)} />}
        <SectionHeading eyebrow="FAQ" title="Frequently Asked Questions" />
        {FAQ_ITEMS.length === 0 ? (
          <p className="mt-8 text-sm text-muted">
            Answers to common questions will be published here soon.
          </p>
        ) : (
          <div className="mt-8">
            <FAQAccordion items={FAQ_ITEMS} />
          </div>
        )}
      </Container>
    </Section>
  );
}
