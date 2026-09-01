import { en, type Dictionary } from "@/content/dictionaries/en";
import { es } from "@/content/dictionaries/es";
import type { Locale } from "./i18n";

/**
 * Server-safe dictionary access. Lives outside the client provider so
 * server components (layouts, metadata, sitemaps) can read copy too.
 *
 * `en` is declared `as const`, so its literal/readonly types need widening.
 */
export const dictionaries: Record<Locale, Dictionary> = {
  en: en as unknown as Dictionary,
  es,
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export type { Dictionary };
