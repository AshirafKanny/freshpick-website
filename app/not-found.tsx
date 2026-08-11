import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { LinkButton } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Section as="div">
      <Container className="text-center">
        <h1 className="text-3xl font-semibold tracking-tight">Page not found</h1>
        <p className="mt-2 text-muted">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>
        <div className="mt-6">
          <LinkButton href="/">Back to Home</LinkButton>
        </div>
      </Container>
    </Section>
  );
}
