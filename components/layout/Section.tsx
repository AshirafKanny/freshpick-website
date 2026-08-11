import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Section({
  children,
  className,
  as: Tag = "section",
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  return <Tag className={cn("py-12 sm:py-16", className)}>{children}</Tag>;
}
