import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { siteConfig } from "@/lib/config/site";
import { isPlaceholder } from "@/lib/utils";

export function ContactInfo() {
  const rows = [
    { icon: Phone, label: "Phone", value: siteConfig.phone, href: `tel:${siteConfig.phone}` },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: siteConfig.whatsapp,
      href: `https://wa.me/${siteConfig.whatsapp}`,
    },
    { icon: Mail, label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
    {
      icon: MapPin,
      label: "Address",
      value: !isPlaceholder(siteConfig.address)
        ? `${siteConfig.address}, ${siteConfig.city}, ${siteConfig.country}`
        : undefined,
      href: undefined,
    },
  ].filter((row) => !isPlaceholder(row.value));

  if (rows.length === 0) {
    return (
      <p className="text-sm text-muted">
        Contact details are being finalized and will appear here soon.
      </p>
    );
  }

  return (
    <ul className="space-y-4">
      {rows.map((row) => (
        <li key={row.label} className="flex items-center gap-3">
          <row.icon size={20} className="text-primary" aria-hidden="true" />
          <div>
            <p className="text-xs text-muted">{row.label}</p>
            {row.href ? (
              <a href={row.href} className="font-medium hover:text-primary">
                {row.value}
              </a>
            ) : (
              <p className="font-medium">{row.value}</p>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
