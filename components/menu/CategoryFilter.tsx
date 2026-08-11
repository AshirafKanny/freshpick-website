import Link from "next/link";
import { cn } from "@/lib/utils";

export interface FilterOption {
  slug: string;
  label: string;
}

/**
 * Server-rendered filter pills that navigate via ?category=slug — filtering
 * happens on the server (the page reads searchParams), so no client JS is
 * needed just to browse the menu.
 */
export function CategoryFilter({ options, active }: { options: FilterOption[]; active: string }) {
  return (
    <div className="flex flex-wrap gap-2" role="tablist" aria-label="Menu categories">
      {options.map((option) => {
        const isActive = option.slug === active;
        return (
          <Link
            key={option.slug}
            href={option.slug === "all" ? "/menu" : `/menu?category=${option.slug}`}
            role="tab"
            aria-selected={isActive}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              isActive
                ? "border-primary bg-primary text-white"
                : "border-border text-foreground hover:border-primary"
            )}
          >
            {option.label}
          </Link>
        );
      })}
    </div>
  );
}
