"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import type { Locale } from "@/lib/i18n";
import { localeHref } from "@/lib/i18n";
import { dictionaries, type Dictionary } from "@/lib/dictionary";

interface LocaleContextValue {
  locale: Locale;
  t: Dictionary;
  /** Prefixes a path with the active locale. */
  href: (path: string) => string;
  /** Picks the right string from a `{ en, es }` pair. */
  pick: <T>(value: Record<Locale, T>) => T;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      t: dictionaries[locale],
      href: (path: string) => localeHref(locale, path),
      pick: <T,>(v: Record<Locale, T>) => v[locale],
    }),
    [locale],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used inside <LocaleProvider>");
  return ctx;
}

/** Shorthand for the common case: `const t = useT();` */
export function useT() {
  return useLocale().t;
}
