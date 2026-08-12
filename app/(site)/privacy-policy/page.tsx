import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { buildMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/lib/config/site";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description: `Privacy policy for ${siteConfig.name}.`,
  path: "/privacy-policy",
  noIndex: true,
});

export default function PrivacyPolicyPage() {
  return (
    <Section as="div">
      <Container className="max-w-2xl">
        <h1 className="font-display text-3xl font-semibold tracking-tight">Privacy Policy</h1>

        <div className="mt-4 rounded-lg border border-secondary/40 bg-secondary-light p-4 text-sm text-secondary-dark">
          This page is a draft template and has not yet been reviewed by {siteConfig.name}{" "}
          management or legal counsel. Do not treat it as {siteConfig.name}&apos;s confirmed
          privacy practices until it has been reviewed and this notice is removed.
        </div>

        <div className="mt-8 space-y-8 text-sm text-muted">
          <section>
            <h2 className="font-display text-lg font-semibold text-foreground">Introduction</h2>
            <p className="mt-2">
              This Privacy Policy explains how {siteConfig.name} may collect, use and protect
              information when you visit {siteConfig.url} or contact us directly.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-foreground">
              Information We Collect
            </h2>
            <p className="mt-2">
              We may collect information you voluntarily provide, such as your name, phone
              number, email address or message content, when you contact us through this website,
              WhatsApp, phone or email.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-foreground">
              How We Use Information
            </h2>
            <p className="mt-2">
              Information you provide may be used to respond to enquiries, process orders and
              improve our service. We do not sell personal information to third parties.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-foreground">Cookies</h2>
            <p className="mt-2">
              This website does not currently use cookies for advertising or tracking. If that
              changes, this policy will be updated to describe what is used and why.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-foreground">Your Rights</h2>
            <p className="mt-2">
              You may contact us at any time to ask what information we hold about you or to
              request that it be corrected or deleted.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-foreground">
              Changes to This Policy
            </h2>
            <p className="mt-2">
              This policy may be updated from time to time. Changes will be posted on this page.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-foreground">Contact Us</h2>
            <p className="mt-2">
              Questions about this policy can be sent through the details on our{" "}
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
