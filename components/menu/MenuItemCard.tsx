import Image from "next/image";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import type { MenuItem } from "@/types/menu";

export function MenuItemCard({ item }: { item: MenuItem }) {
  return (
    <Link
      href={`/menu/${item.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-colors hover:border-primary"
    >
      {item.image ? (
        <Image
          src={item.image}
          alt={item.alt ?? item.name}
          width={400}
          height={300}
          className="h-48 w-full object-cover"
        />
      ) : (
        <div className="h-48 w-full bg-primary-light" aria-hidden="true" />
      )}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-lg font-semibold">{item.name}</h3>
          {item.tags?.[0] && <Badge>{item.tags[0]}</Badge>}
        </div>
        <p className="mt-1 line-clamp-2 text-sm text-muted">{item.description}</p>
        <div className="mt-4 flex items-center justify-between">
          {item.price !== undefined && item.currency && (
            <span className="font-semibold">{formatCurrency(item.price, item.currency)}</span>
          )}
          {!item.available && (
            <span className="text-xs font-medium text-secondary">Currently unavailable</span>
          )}
        </div>
      </div>
    </Link>
  );
}
