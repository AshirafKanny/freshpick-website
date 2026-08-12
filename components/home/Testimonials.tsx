import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TestimonialCard } from "@/components/home/TestimonialCard";
import { TESTIMONIALS } from "@/lib/data/testimonials";

/** Renders nothing until real, permissioned testimonials exist — see lib/data/testimonials.ts. */
export function Testimonials() {
  if (TESTIMONIALS.length === 0) return null;

  return (
    <Section as="div" className="bg-surface">
      <Container>
        <SectionHeading eyebrow="Customers" title="What people are saying" align="center" className="mx-auto" />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((testimonial) => (
            <TestimonialCard key={testimonial.author} testimonial={testimonial} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
