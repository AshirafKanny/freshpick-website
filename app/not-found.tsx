import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { LinkButton } from "@/components/ui/Button";
import { siteConfig } from "@/lib/config/site";

export default function NotFound() {
  return (
    <Section as="div">
      <Container className="text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">404</p>
        <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Looks like this page isn&apos;t on today&apos;s menu.
        </h1>
        <p className="mt-3 text-muted">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>
        <div className="mt-8">
          <LinkButton href="/">Back to {siteConfig.name}</LinkButton>
        </div>
      </Container>
    </Section>
  );
}
