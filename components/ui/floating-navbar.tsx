"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface FloatingNavItem {
  name: string;
  link: string;
}

/**
 * A centered, floating pill navbar (Aceternity-style), restyled to FreshPick's
 * design tokens. Unlike the original component, this stays visible at all times
 * rather than hiding at the top of the page — this is a restaurant site where
 * "Menu" and "Order Now" need to be reachable the instant a page loads.
 */
export function FloatingNav({
  navItems,
  logo,
  cta,
  mobileMenu,
  className,
}: {
  navItems: FloatingNavItem[];
  logo: ReactNode;
  cta: ReactNode;
  mobileMenu?: ReactNode;
  className?: string;
}) {
  return (
    <header className={cn("sticky inset-x-0 top-0 z-50 flex justify-center px-4 pt-4", className)}>
      <div className="flex w-full max-w-4xl items-center justify-between gap-4 rounded-full border border-border bg-surface/90 px-4 py-2 shadow-lg shadow-foreground/5 backdrop-blur-md">
        {logo}

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.link}>
                <Link
                  href={item.link}
                  className="block rounded-full px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-primary-light hover:text-primary-dark"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden lg:block">{cta}</div>

        {mobileMenu && <div className="lg:hidden">{mobileMenu}</div>}
      </div>
    </header>
  );
}
