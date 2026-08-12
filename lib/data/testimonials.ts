export interface Testimonial {
  quote: string;
  author: string;
  role?: string;
}

/**
 * Intentionally empty: FreshPick has no verified customer testimonials yet.
 * Never fill this with invented reviews, ratings or quotes — populate only
 * with real, permissioned customer feedback. No page renders testimonials
 * while this stays empty (see components/home/Testimonials.tsx).
 */
export const TESTIMONIALS: Testimonial[] = [];
