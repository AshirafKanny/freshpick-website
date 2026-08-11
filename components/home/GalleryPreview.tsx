import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";

export function GalleryPreview() {
  return (
    <Section as="div">
      <Container className="flex flex-col items-center gap-6 text-center">
        <FadeIn className="flex flex-col items-center gap-6">
          <SectionHeading
            eyebrow="Gallery"
            title="See FreshPick in pictures"
            description="Photos of our juices, food and restaurant are on their way."
            align="center"
          />
          <LinkButton href="/gallery" variant="outline">
            View Gallery
          </LinkButton>
        </FadeIn>
      </Container>
    </Section>
  );
}
