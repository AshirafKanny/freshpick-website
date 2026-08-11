import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { NAV_LINKS } from "@/components/navigation/nav-links";
import { SocialLinks } from "@/components/navigation/SocialLinks";
import { OpeningHours } from "@/components/contact/OpeningHours";
import { siteConfig } from "@/lib/config/site";
import { isPlaceholder } from "@/lib/utils";

const LEGAL_LINKS = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface">
      <Container className="grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <Link href="/" className="flex items-center gap-2.5">
            <Image src={siteConfig.logo} alt={`${siteConfig.name} logo`} width={36} height={32} />
            <span className="font-display text-lg font-semibold">{siteConfig.name}</span>
          </Link>
          <p className="mt-3 text-sm text-muted">{siteConfig.description}</p>
          <SocialLinks className="mt-4" />
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
                <a href={`tel:${siteConfig.phone}`} className="hover:text-primary">
                  {siteConfig.phone}
                </a>
              </li>
            )}
            {!isPlaceholder(siteConfig.email) && (
              <li className="flex items-center gap-2">
                <Mail size={16} aria-hidden="true" />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-primary">
                  {siteConfig.email}
                </a>
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
        </div>

        <OpeningHours />
      </Container>

      <div className="border-t border-border py-6">
        <Container className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted">
            &copy; {year} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-muted">
            {LEGAL_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-primary">
                {link.label}
              </Link>
            ))}
          </div>
        </Container>
      </div>
    </footer>
  );
}
