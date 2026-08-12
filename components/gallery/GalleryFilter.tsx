import Link from "next/link";
import { cn } from "@/lib/utils";
import type { GalleryCategory } from "@/lib/data/gallery";

export function GalleryFilter({ categories, active }: { categories: GalleryCategory[]; active: string }) {
  const options = [{ slug: "all", name: "All" }, ...categories];

  return (
    <div className="flex flex-wrap gap-2" role="tablist" aria-label="Gallery categories">
      {options.map((option) => {
        const isActive = option.slug === active;
        return (
          <Link
            key={option.slug}
            href={option.slug === "all" ? "/gallery" : `/gallery?category=${option.slug}`}
            role="tab"
            aria-selected={isActive}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              isActive
                ? "border-primary bg-primary text-white"
                : "border-border text-foreground hover:border-primary"
            )}
          >
            {option.name}
          </Link>
        );
      })}
    </div>
  );
}
