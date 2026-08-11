import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { LinkButton } from "@/components/ui/Button";
import { OrderButton } from "@/components/ui/OrderButton";
import { FadeIn } from "@/components/ui/FadeIn";
import { siteConfig } from "@/lib/config/site";

export function ContactCTA() {
  return (
    <Section as="div">
      <Container>
        <FadeIn className="flex flex-col items-center gap-6 rounded-3xl bg-primary px-6 py-16 text-center text-white sm:px-16">
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">
            Visit {siteConfig.name} Today
          </h2>
          <p className="max-w-md text-white/90">
            Explore the full menu or reach out directly to place an order.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <OrderButton variant="secondary" size="lg" />
            <LinkButton href="/contact" variant="outline" size="lg" className="border-white/40 text-white hover:bg-white/10">
              Contact Us
            </LinkButton>
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}
