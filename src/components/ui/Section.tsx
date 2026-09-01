import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Section({
  children,
  className,
  id,
  tone = "cream",
  size = "md",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: "cream" | "white" | "deep" | "navy" | "none";
  size?: "sm" | "md" | "lg" | "none";
}) {
  const tones = {
    cream: "bg-cream-100 text-ink-900",
    white: "bg-cream-50 text-ink-900",
    deep: "bg-cream-200 text-ink-900",
    navy: "bg-navy-950 text-cream-100",
    none: "",
  } as const;

  const sizes = {
    sm: "py-16 sm:py-20",
    md: "py-20 sm:py-28 lg:py-36",
    lg: "py-28 sm:py-36 lg:py-48",
    none: "",
  } as const;

  return (
    <section
      id={id}
      className={cn("relative", tones[tone], sizes[size], className)}
      style={id ? { scrollMarginTop: "var(--header-h)" } : undefined}
    >
      {children}
    </section>
  );
}

export function Eyebrow({
  children,
  className,
  tone = "cyan",
}: {
  children: ReactNode;
  className?: string;
  tone?: "cyan" | "ember" | "light";
}) {
  const tones = {
    cyan: "text-cyan-600",
    ember: "text-ember-600",
    light: "text-cyan-300",
  } as const;

  return (
    <p className={cn("type-eyebrow flex items-center gap-3", tones[tone], className)}>
      <span aria-hidden className="h-px w-8 bg-current opacity-50" />
      {children}
    </p>
  );
}
