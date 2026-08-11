import { Clock } from "lucide-react";
import { siteConfig } from "@/lib/config/site";
import { isPlaceholder } from "@/lib/utils";

export function OpeningHours() {
  const ranges = siteConfig.openingHours.filter(
    (range) => !isPlaceholder(range.opens) && !isPlaceholder(range.closes)
  );

  return (
    <div>
      <div className="flex items-center gap-2 text-sm font-semibold">
        <Clock size={18} className="text-primary" aria-hidden="true" />
        Opening Hours
      </div>
      {ranges.length === 0 ? (
        <p className="mt-2 text-sm text-muted">Hours will be published here soon.</p>
      ) : (
        <ul className="mt-2 space-y-1 text-sm text-muted">
          {ranges.map((range) => (
            <li key={range.days.join(",")} className="flex justify-between gap-6">
              <span>{formatDayRange(range.days)}</span>
              <span className="text-foreground">
                {range.opens} – {range.closes}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function formatDayRange(days: string[]): string {
  if (days.length === 7) return "Every day";
  if (days.length === 1) return days[0];
  return `${days[0]} – ${days[days.length - 1]}`;
}
