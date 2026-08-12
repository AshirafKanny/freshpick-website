import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactInfo } from "@/components/contact/ContactInfo";
import { OpeningHours } from "@/components/contact/OpeningHours";
import { LocationCard } from "@/components/contact/LocationCard";
import { ContactForm } from "@/components/contact/ContactForm";
import { SocialLinks } from "@/components/navigation/SocialLinks";
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
        <SectionHeading eyebrow="Contact" title="Get in Touch" />

        <div className="mt-10 grid gap-12 lg:grid-cols-2">
          <div className="space-y-10">
            <ContactInfo />
            <OpeningHours />
            <LocationCard />
            <SocialLinks />
          </div>

          <div className="rounded-2xl border border-border bg-surface p-6">
            <h2 className="font-display text-xl font-semibold">Send a Message</h2>
            <div className="mt-4">
              <ContactForm />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
