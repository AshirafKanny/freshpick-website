"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { OrderButton } from "@/components/ui/OrderButton";
import { NAV_LINKS } from "@/components/navigation/nav-links";
import { siteConfig } from "@/lib/config/site";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const logo = (
    <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
      <Image src={siteConfig.logo} alt={`${siteConfig.name} logo`} width={36} height={32} priority />
      <span className="font-display text-lg font-semibold">{siteConfig.name}</span>
    </Link>
  );

  return (
    <>
      <FloatingNav
        navItems={NAV_LINKS.map((link) => ({ name: link.label, link: link.href }))}
        logo={logo}
        cta={<OrderButton size="sm" />}
        mobileMenu={
          <button
            type="button"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
            onClick={() => setIsOpen((open) => !open)}
          >
            {isOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        }
      />

      {isOpen && (
        <div className="fixed inset-x-0 top-20 z-40 flex justify-center px-4 lg:hidden">
          <nav
            id="mobile-nav"
            aria-label="Primary"
            className="w-full max-w-4xl rounded-2xl border border-border bg-surface p-4 shadow-lg shadow-foreground/5"
          >
            <ul className="space-y-1 text-sm font-medium">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block rounded-lg px-3 py-2 hover:bg-primary-light hover:text-primary-dark"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-3">
              <OrderButton className="w-full" />
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
