import Image from "next/image";
import { formatCurrency } from "@/lib/utils";
import type { MenuItem } from "@/types/menu";

export function MenuItemCard({ item }: { item: MenuItem }) {
  return (
    <article className="rounded-lg border border-border p-4">
      {item.image && (
        <Image
          src={item.image}
          alt={item.alt ?? item.name}
          width={400}
          height={300}
          className="mb-4 h-48 w-full rounded-md object-cover"
        />
      )}
      <h3 className="text-lg font-semibold">{item.name}</h3>
      <p className="mt-1 text-sm text-muted">{item.description}</p>
      <div className="mt-3 flex items-center justify-between">
        {item.price !== undefined && item.currency && (
          <span className="font-medium">{formatCurrency(item.price, item.currency)}</span>
        )}
        {!item.available && (
          <span className="text-xs font-medium text-secondary">
            Currently unavailable
          </span>
        )}
      </div>
    </article>
  );
}
