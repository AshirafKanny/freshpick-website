import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const VARIANT_CLASSES = {
  primary: "bg-primary text-white hover:bg-primary-dark",
  secondary: "bg-secondary text-white hover:bg-secondary-dark",
  outline: "border border-border text-foreground hover:bg-border/30",
  ghost: "text-foreground hover:bg-border/30",
} as const;

const SIZE_CLASSES = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3.5 text-base",
} as const;

type Variant = keyof typeof VARIANT_CLASSES;
type Size = keyof typeof SIZE_CLASSES;

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
};

export function Button({ variant = "primary", size = "md", icon, className, children, ...props }: ButtonProps) {
  return (
    <button className={cn(baseClasses, VARIANT_CLASSES[variant], SIZE_CLASSES[size], className)} {...props}>
      {children}
      {icon}
    </button>
  );
}

type LinkButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
};

export function LinkButton({
  variant = "primary",
  size = "md",
  icon,
  className,
  href,
  children,
  ...props
}: LinkButtonProps) {
  const isExternal = href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:");
  const classes = cn(baseClasses, VARIANT_CLASSES[variant], SIZE_CLASSES[size], className);

  if (isExternal) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
        {icon}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...props}>
      {children}
      {icon}
    </Link>
  );
}
