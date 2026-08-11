import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";

export function CategoryTile({
  href,
  icon: Icon,
  name,
  description,
}: {
  href: string;
  icon: LucideIcon;
  name: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-primary"
    >
      <Icon size={28} className="text-primary" aria-hidden="true" />
      <div className="mt-8">
        <h3 className="font-display text-xl font-semibold">{name}</h3>
        <p className="mt-1 text-sm text-muted">{description}</p>
      </div>
      <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-primary">
        View {name}
        <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
      </span>
    </Link>
  );
}
