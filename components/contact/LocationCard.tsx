import { MapPin } from "lucide-react";
import { siteConfig } from "@/lib/config/site";
import { isPlaceholder } from "@/lib/utils";

export function LocationCard() {
  const hasAddress = !isPlaceholder(siteConfig.address);
  const fullAddress = hasAddress
    ? `${siteConfig.address}, ${siteConfig.city}, ${siteConfig.country}`
    : undefined;

  return (
    <div>
      <div className="flex items-center gap-2 text-sm font-semibold">
        <MapPin size={18} className="text-primary" aria-hidden="true" />
        Location
      </div>

      {!hasAddress ? (
        <p className="mt-2 text-sm text-muted">Our address will be published here soon.</p>
      ) : (
        <>
          <p className="mt-2 text-sm text-muted">{fullAddress}</p>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress!)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-sm font-medium text-primary hover:text-primary-dark"
          >
            Get directions
          </a>
        </>
      )}

      {siteConfig.geo && (
        <div className="mt-4 overflow-hidden rounded-lg border border-border">
          <iframe
            title={`${siteConfig.name} location map`}
            src={`https://www.google.com/maps?q=${siteConfig.geo.latitude},${siteConfig.geo.longitude}&z=15&output=embed`}
            className="h-56 w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      )}
    </div>
  );
}
