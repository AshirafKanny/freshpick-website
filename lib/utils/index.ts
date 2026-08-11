/** Joins class names, dropping falsy values. No dependency needed at this scale. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

export function formatCurrency(amount: number, currency: "UGX" = "UGX"): string {
  return new Intl.NumberFormat("en-UG", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(isoDate: string): string {
  return new Intl.DateTimeFormat("en-UG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(isoDate));
}

/** Rough reading-time estimate for blog content authored as plain text/markdown. */
export function estimateReadingTime(content: string, wordsPerMinute = 200): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / wordsPerMinute));
}

/** True for unfilled siteConfig placeholders like "[FRESHPICK_PHONE]", or empty values. */
export function isPlaceholder(value: string | undefined): value is undefined {
  return !value || value.startsWith("[");
}
