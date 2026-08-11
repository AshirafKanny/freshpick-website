import { Clock, MapPin, MessageCircle } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { siteConfig } from "@/lib/config/site";
import { isPlaceholder } from "@/lib/utils";

function summarizeHours(): string {
  const range = siteConfig.openingHours[0];
  if (!range || isPlaceholder(range.opens) || isPlaceholder(range.closes)) {
    return "Hours coming soon";
  }
  return `${range.opens} – ${range.closes}`;
}

export function QuickInfo() {
  const items = [
    {
      icon: Clock,
      label: "Opening Hours",
      value: summarizeHours(),
    },
    {
      icon: MapPin,
      label: "Location",
      value: !isPlaceholder(siteConfig.address)
        ? `${siteConfig.city}, ${siteConfig.country}`
        : "Address coming soon",
    },
    {
      icon: MessageCircle,
      label: "Order",
      value: !isPlaceholder(siteConfig.whatsapp) ? "Order via WhatsApp" : "Contact us to order",
    },
  ];

  return (
    <section className="border-b border-border bg-surface">
      <Container className="grid gap-6 py-8 sm:grid-cols-3">
        {items.map((item) => (
          <div key={item.label} className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-light text-primary">
              <item.icon size={18} aria-hidden="true" />
            </span>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted">{item.label}</p>
              <p className="text-sm font-semibold">{item.value}</p>
            </div>
          </div>
        ))}
      </Container>
    </section>
  );
}
