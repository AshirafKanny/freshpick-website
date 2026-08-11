import { LinkButton } from "@/components/ui/Button";
import { siteConfig } from "@/lib/config/site";
import { isPlaceholder } from "@/lib/utils";

const DEFAULT_MESSAGE = "Hi FreshPick, I'd like to place an order.";

/**
 * Centralizes the "Order Now" CTA. Prefers WhatsApp (prefilled message),
 * falls back to phone, and finally to the Contact page — never a dead link,
 * and never an invented number.
 */
export function OrderButton({
  variant = "primary",
  size = "md",
  className,
  children = "Order Now",
}: {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  children?: React.ReactNode;
}) {
  if (!isPlaceholder(siteConfig.whatsapp)) {
    const digits = siteConfig.whatsapp!.replace(/[^\d]/g, "");
    return (
      <LinkButton
        href={`https://wa.me/${digits}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`}
        target="_blank"
        rel="noopener noreferrer"
        variant={variant}
        size={size}
        className={className}
      >
        {children}
      </LinkButton>
    );
  }

  if (!isPlaceholder(siteConfig.phone)) {
    return (
      <LinkButton href={`tel:${siteConfig.phone}`} variant={variant} size={size} className={className}>
        {children}
      </LinkButton>
    );
  }

  return (
    <LinkButton href="/contact" variant={variant} size={size} className={className}>
      {children}
    </LinkButton>
  );
}
