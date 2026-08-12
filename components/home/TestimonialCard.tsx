import { Quote } from "lucide-react";
import type { Testimonial } from "@/lib/data/testimonials";

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="rounded-2xl border border-border bg-surface p-6">
      <Quote size={22} className="text-primary" aria-hidden="true" />
      <blockquote className="mt-4 text-foreground">&ldquo;{testimonial.quote}&rdquo;</blockquote>
      <figcaption className="mt-4 text-sm text-muted">
        {testimonial.author}
        {testimonial.role && `, ${testimonial.role}`}
      </figcaption>
    </figure>
  );
}
