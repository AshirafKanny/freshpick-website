import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
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
      <Container className="max-w-3xl">
        {FAQ_ITEMS.length > 0 && <JsonLd data={getFaqSchema(FAQ_ITEMS)} />}
        <h1 className="text-3xl font-semibold tracking-tight">Frequently Asked Questions</h1>
        {FAQ_ITEMS.length === 0 ? (
          <p className="mt-4 text-sm text-muted">
            Answers to common questions will be published here soon.
          </p>
        ) : (
          <dl className="mt-8 space-y-6">
            {FAQ_ITEMS.map((item) => (
              <div key={item.question}>
                <dt className="font-semibold">{item.question}</dt>
                <dd className="mt-1 text-muted">{item.answer}</dd>
              </div>
            ))}
          </dl>
        )}
      </Container>
    </Section>
  );
}
