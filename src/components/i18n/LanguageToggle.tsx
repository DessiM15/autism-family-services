"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "./LocaleProvider";
import { LOCALES, rememberLocale, stripLocale, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/**
 * EN | ES. Keeps you on the same page, and remembers the choice for a year
 * so the browser-language guess never overrides a deliberate decision.
 */
export function LanguageToggle({
  className,
  tone = "dark",
}: {
  className?: string;
  tone?: "dark" | "light";
}) {
  const { locale, t } = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const light = tone === "light";

  const switchTo = (next: Locale) => {
    if (next === locale) return;
    rememberLocale(next);
    router.push(`/${next}${stripLocale(pathname) === "/" ? "" : stripLocale(pathname)}`);
  };

  return (
    <div
      className={cn(
        "flex items-center rounded-full border p-0.5 text-[0.75rem] font-semibold",
        light ? "border-cream-100/30" : "border-cream-400",
        className,
      )}
      role="group"
      aria-label={t.footer.languageHeading}
    >
      {LOCALES.map((code) => {
        const active = code === locale;
        return (
          <button
            key={code}
            type="button"
            onClick={() => switchTo(code)}
            aria-current={active ? "true" : undefined}
            title={active ? undefined : t.meta.switchTo}
            className={cn(
              "rounded-full px-2.5 py-1 uppercase tracking-wider transition-colors duration-300",
              active
                ? "bg-navy-900 text-cream-50"
                : light
                  ? "text-cream-100/70 hover:text-cream-100"
                  : "text-ink-500 hover:text-navy-900",
            )}
          >
            {code}
          </button>
        );
      })}
    </div>
  );
}
