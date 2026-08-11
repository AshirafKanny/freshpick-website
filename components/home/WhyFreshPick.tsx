import { Droplets, Leaf, Sparkles, UtensilsCrossed } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/ui/FadeIn";

const REASONS = [
  {
    icon: Leaf,
    title: "Fresh Ingredients",
    description: "Juices and blends made from real fruit.",
  },
  {
    icon: Droplets,
    title: "Refreshing Variety",
    description: "From single-fruit juices to smoothies and cocktails.",
  },
  {
    icon: Sparkles,
    title: "Made for Every Craving",
    description: "Something on the menu for however you're feeling.",
  },
  {
    icon: UtensilsCrossed,
    title: "Food & Drinks in One Place",
    description: "Fresh juices alongside shawarma and chips, all in one visit.",
  },
];

export function WhyFreshPick() {
  return (
    <Section as="div">
      <Container>
        <FadeIn>
          <SectionHeading eyebrow="Why FreshPick" title="What sets us apart" align="center" className="mx-auto" />
        </FadeIn>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {REASONS.map((reason, index) => (
            <FadeIn key={reason.title} delay={index * 0.06} className="text-center">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary-light text-primary">
                <reason.icon size={22} aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold">{reason.title}</h3>
              <p className="mt-1 text-sm text-muted">{reason.description}</p>
            </FadeIn>
          ))}
        </div>
      </Container>
    </Section>
  );
}
