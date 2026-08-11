import { MenuItemCard } from "@/components/menu/MenuItemCard";
import type { MenuItem } from "@/types/menu";

export function MenuGrid({ items }: { items: MenuItem[] }) {
  if (items.length === 0) {
    return (
      <p className="text-sm text-muted">
        This menu is being finalized — items will appear here soon.
      </p>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <MenuItemCard key={item.id} item={item} />
      ))}
    </div>
  );
}
