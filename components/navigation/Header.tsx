"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { NAV_LINKS } from "@/components/navigation/nav-links";
import { OrderButton } from "@/components/ui/OrderButton";
import { siteConfig } from "@/lib/config/site";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <Container className="flex h-18 items-center justify-between py-3">
        <Link href="/" className="flex items-center gap-2.5" onClick={() => setIsOpen(false)}>
          <Image src={siteConfig.logo} alt={`${siteConfig.name} logo`} width={44} height={39} priority />
          <span className="font-display text-xl font-semibold">{siteConfig.name}</span>
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-8 text-sm font-medium">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-primary">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden lg:block">
          <OrderButton size="sm" />
        </div>

        <button
          type="button"
          className="lg:hidden"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-nav"
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </Container>

      {isOpen && (
        <nav id="mobile-nav" aria-label="Primary" className="border-t border-border lg:hidden">
          <Container>
            <ul className="flex flex-col gap-1 py-3 text-sm font-medium">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block rounded px-2 py-2 hover:bg-border/30"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="pb-4">
              <OrderButton className="w-full" />
            </div>
          </Container>
        </nav>
      )}
    </header>
  );
}
