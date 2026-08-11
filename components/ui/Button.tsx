import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const VARIANT_CLASSES = {
  primary: "bg-primary text-white hover:bg-primary-dark",
  secondary: "bg-secondary text-white hover:bg-secondary-dark",
  outline:
    "border border-border text-foreground hover:bg-border/30",
} as const;

type Variant = keyof typeof VARIANT_CLASSES;

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
};

export function Button({ variant = "primary", className, ...props }: ButtonProps) {
  return (
    <button className={cn(baseClasses, VARIANT_CLASSES[variant], className)} {...props} />
  );
}

type LinkButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  variant?: Variant;
};

export function LinkButton({ variant = "primary", className, href, ...props }: LinkButtonProps) {
  return (
    <Link
      href={href}
      className={cn(baseClasses, VARIANT_CLASSES[variant], className)}
      {...props}
    />
  );
}
