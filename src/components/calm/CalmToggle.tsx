"use client";

import { useState } from "react";
import { Waves } from "lucide-react";
import { useCalm } from "./CalmModeProvider";
import { useT } from "@/components/i18n/LocaleProvider";
import { cn } from "@/lib/utils";

/**
 * The switch that makes the whole site go still. Placed in the header on
 * every page — for an autism organisation, sensory control should not be
 * buried in a settings menu.
 */
export function CalmToggle({
  className,
  tone = "dark",
  showLabel = true,
}: {
  className?: string;
  tone?: "dark" | "light";
  showLabel?: boolean;
}) {
  const { calm, toggle, ready } = useCalm();
  const t = useT();
  const [tipOpen, setTipOpen] = useState(false);

  const light = tone === "light";

  return (
    <div className={cn("relative", className)}>
      <button
        type="button"
        role="switch"
        aria-checked={calm}
        onClick={toggle}
        onMouseEnter={() => setTipOpen(true)}
        onMouseLeave={() => setTipOpen(false)}
        onFocus={() => setTipOpen(true)}
        onBlur={() => setTipOpen(false)}
        className={cn(
          "group flex items-center gap-2 rounded-full border px-2.5 py-1.5 text-[0.75rem] font-semibold transition-colors duration-300",
          light
            ? "border-cream-100/30 text-cream-100 hover:border-cream-100/60"
            : "border-cream-400 text-ink-700 hover:border-navy-300 hover:text-navy-900",
          calm && (light ? "border-cyan-300 text-cyan-200" : "border-cyan-500 text-cyan-600 bg-cyan-100/60"),
        )}
      >
        <span
          className={cn(
            "relative flex h-4 w-7 shrink-0 items-center rounded-full transition-colors duration-300",
            calm ? "bg-cyan-500" : light ? "bg-cream-100/30" : "bg-cream-400",
          )}
        >
          <span
            className={cn(
              "absolute size-3 rounded-full bg-white shadow-sm transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
              calm ? "translate-x-3.5" : "translate-x-0.5",
            )}
          />
        </span>
        {showLabel && (
          <span className="flex items-center gap-1.5">
            <Waves className="size-3.5" aria-hidden />
            {t.calm.label}
          </span>
        )}
      </button>

      {tipOpen && (
        <span
          role="tooltip"
          className={cn(
            "absolute top-full right-0 z-50 mt-2 w-64 rounded-xl border border-cream-300 bg-cream-50 p-3 text-[0.75rem] leading-relaxed font-normal text-ink-700 shadow-[0_16px_40px_-12px_rgba(0,30,100,0.28)]",
          )}
        >
          {t.calm.tooltip}
        </span>
      )}

      {/* Announced to screen readers when the state flips. */}
      <span aria-live="polite" className="sr-only">
        {ready ? (calm ? t.calm.announce : t.calm.announceOff) : ""}
      </span>
    </div>
  );
}
