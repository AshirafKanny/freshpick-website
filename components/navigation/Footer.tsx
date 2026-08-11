import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { NAV_LINKS } from "@/components/navigation/nav-links";
import { siteConfig } from "@/lib/config/site";
import { isPlaceholder } from "@/lib/utils";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <Container className="grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <p className="text-lg font-semibold">{siteConfig.name}</p>
          <p className="mt-2 text-sm text-muted">{siteConfig.description}</p>
        </div>

        <nav aria-label="Footer">
          <p className="text-sm font-semibold">Explore</p>
          <ul className="mt-3 space-y-2 text-sm">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-muted hover:text-primary">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-sm font-semibold">Contact</p>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            {!isPlaceholder(siteConfig.phone) && (
              <li className="flex items-center gap-2">
                <Phone size={16} aria-hidden="true" />
                <a href={`tel:${siteConfig.phone}`}>{siteConfig.phone}</a>
              </li>
            )}
            {!isPlaceholder(siteConfig.email) && (
              <li className="flex items-center gap-2">
                <Mail size={16} aria-hidden="true" />
                <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
              </li>
            )}
            {!isPlaceholder(siteConfig.address) && (
              <li className="flex items-center gap-2">
                <MapPin size={16} aria-hidden="true" />
                <span>
                  {siteConfig.address}, {siteConfig.city}, {siteConfig.country}
                </span>
              </li>
            )}
          </ul>

          {(!isPlaceholder(siteConfig.socialLinks.facebook) ||
            !isPlaceholder(siteConfig.socialLinks.instagram)) && (
            <div className="mt-4 flex gap-4 text-sm font-medium">
              {!isPlaceholder(siteConfig.socialLinks.facebook) && (
                <a href={siteConfig.socialLinks.facebook} className="hover:text-primary">
                  Facebook
                </a>
              )}
              {!isPlaceholder(siteConfig.socialLinks.instagram) && (
                <a href={siteConfig.socialLinks.instagram} className="hover:text-primary">
                  Instagram
                </a>
              )}
            </div>
          )}
        </div>
      </Container>

      <div className="border-t border-border py-4">
        <Container>
          <p className="text-xs text-muted">
            &copy; {year} {siteConfig.name}. All rights reserved.
          </p>
        </Container>
      </div>
    </footer>
  );
}
