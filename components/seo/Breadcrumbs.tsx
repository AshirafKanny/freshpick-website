import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { getBreadcrumbSchema } from "@/lib/seo/schema";
import type { BreadcrumbItem } from "@/types/seo";

/** Renders a visible breadcrumb trail and its matching BreadcrumbList JSON-LD. */
export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const trail: BreadcrumbItem[] = [{ name: "Home", path: "/" }, ...items];

  return (
    <nav aria-label="Breadcrumb" className="text-sm text-muted">
      <JsonLd data={getBreadcrumbSchema(trail)} />
      <ol className="flex flex-wrap items-center gap-1.5">
        {trail.map((item, index) => (
          <li key={item.path} className="flex items-center gap-1.5">
            {index > 0 && <ChevronRight size={14} aria-hidden="true" />}
            {index === trail.length - 1 ? (
              <span aria-current="page" className="text-foreground">
                {item.name}
              </span>
            ) : (
              <Link href={item.path} className="hover:text-primary">
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
