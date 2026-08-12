import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { buildMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/lib/config/site";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Service",
  description: `Terms of service for ${siteConfig.name}.`,
  path: "/terms",
  noIndex: true,
});

export default function TermsPage() {
  return (
    <Section as="div">
      <Container className="max-w-2xl">
        <h1 className="font-display text-3xl font-semibold tracking-tight">Terms of Service</h1>

        <div className="mt-4 rounded-lg border border-secondary/40 bg-secondary-light p-4 text-sm text-secondary-dark">
          This page is a draft template and has not yet been reviewed by {siteConfig.name}{" "}
          management or legal counsel. Do not treat it as {siteConfig.name}&apos;s confirmed
          terms until it has been reviewed and this notice is removed.
        </div>

        <div className="mt-8 space-y-8 text-sm text-muted">
          <section>
            <h2 className="font-display text-lg font-semibold text-foreground">Introduction</h2>
            <p className="mt-2">
              These Terms govern your use of {siteConfig.url}. By using this website, you agree
              to these Terms.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-foreground">Use of Website</h2>
            <p className="mt-2">
              This website is provided to help you browse {siteConfig.name}&apos;s menu and get
              in touch with us. Content is provided for general information and may be updated
              without notice.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-foreground">
              Menu &amp; Pricing
            </h2>
            <p className="mt-2">
              Menu items, descriptions and prices shown on this website are subject to change and
              availability. Orders are currently arranged directly via phone, WhatsApp or in
              person rather than through this website.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-foreground">
              Intellectual Property
            </h2>
            <p className="mt-2">
              The {siteConfig.name} name, logo and website content are the property of{" "}
              {siteConfig.name} and may not be reproduced without permission.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-foreground">
              Limitation of Liability
            </h2>
            <p className="mt-2">
              {siteConfig.name} is not liable for any indirect or consequential loss arising from
              use of this website, to the extent permitted by law.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-foreground">
              Changes to These Terms
            </h2>
            <p className="mt-2">
              These Terms may be updated from time to time. Changes will be posted on this page.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-foreground">Contact Us</h2>
            <p className="mt-2">
              Questions about these Terms can be sent through the details on our{" "}
              <a href="/contact" className="text-primary hover:text-primary-dark">
                Contact page
              </a>
              .
            </p>
          </section>
        </div>
      </Container>
    </Section>
  );
}
