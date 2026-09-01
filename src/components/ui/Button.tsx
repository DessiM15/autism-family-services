"use client";

import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "onDark";
type Size = "sm" | "md" | "lg";

const base =
  "group relative inline-flex items-center justify-center gap-2.5 rounded-full font-semibold " +
  "transition-[transform,background-color,color,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] " +
  "active:scale-[0.985] disabled:pointer-events-none disabled:opacity-55 whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary:
    "bg-navy-900 text-cream-50 shadow-[0_1px_2px_rgba(0,19,63,0.2)] hover:bg-navy-800 hover:shadow-[0_10px_30px_-8px_rgba(0,30,100,0.5)] hover:-translate-y-0.5",
  secondary:
    "bg-cream-50 text-navy-900 border border-cream-400 hover:border-navy-300 hover:bg-white hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-12px_rgba(0,30,100,0.3)]",
  ghost:
    "bg-transparent text-navy-900 hover:bg-navy-900/[0.055]",
  onDark:
    "bg-cream-50/95 text-navy-900 backdrop-blur hover:bg-white hover:-translate-y-0.5 hover:shadow-[0_12px_36px_-10px_rgba(0,0,0,0.55)]",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-5 text-[0.875rem]",
  md: "h-12 px-6 text-[0.9375rem]",
  lg: "h-14 px-8 text-base",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  /** Adds an arrow that slides on hover. */
  arrow?: boolean;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  arrow = false,
  ...rest
}: CommonProps & ComponentProps<"button">) {
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
      {arrow && <Arrow />}
    </button>
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  children,
  arrow = false,
  href,
  ...rest
}: CommonProps & ComponentProps<typeof Link>) {
  return (
    <Link href={href} className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
      {arrow && <Arrow />}
    </Link>
  );
}

function Arrow() {
  return (
    <ArrowRight
      className="size-4 shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
      aria-hidden
    />
  );
}
