import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/ui/FadeIn";

const STEPS = [
  { number: "01", title: "Select", description: "Fruit is selected for juicing and blending." },
  { number: "02", title: "Prepare", description: "Washed and prepared for the day's menu." },
  { number: "03", title: "Blend", description: "Pressed or blended into juices and smoothies." },
  { number: "04", title: "Serve", description: "Served fresh, ready to enjoy." },
];

export function FreshnessStory() {
  return (
    <Section as="div" className="bg-surface">
      <Container>
        <FadeIn>
          <SectionHeading eyebrow="Our Process" title="From Fresh Fruit to FreshPick" align="center" className="mx-auto" />
        </FadeIn>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, index) => (
            <FadeIn key={step.number} delay={index * 0.08} className="relative">
              <span className="font-display text-4xl font-semibold text-primary-light">{step.number}</span>
              <h3 className="mt-2 font-display text-lg font-semibold">{step.title}</h3>
              <p className="mt-1 text-sm text-muted">{step.description}</p>
            </FadeIn>
          ))}
        </div>
      </Container>
    </Section>
  );
}
