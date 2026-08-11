import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ContactInfo } from "@/components/contact/ContactInfo";
import { buildMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/lib/config/site";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description: `Get in touch with ${siteConfig.name}.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <Section as="div">
      <Container>
        <h1 className="text-3xl font-semibold tracking-tight">Contact Us</h1>
        <div className="mt-8 max-w-md">
          <ContactInfo />
        </div>
      </Container>
    </Section>
  );
}
