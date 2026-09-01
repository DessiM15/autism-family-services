import type { Metadata } from "next";
import { getDictionary } from "./dictionary";
import { isLocale, DEFAULT_LOCALE, type Locale } from "./i18n";
import type { Dictionary } from "@/content/dictionaries/en";

export interface LocaleParams {
  params: Promise<{ locale: string }>;
}

export async function resolveLocale(
  params: Promise<{ locale: string }>,
): Promise<Locale> {
  const { locale } = await params;
  return isLocale(locale) ? locale : DEFAULT_LOCALE;
}

/**
 * Builds per-page metadata with the right hreflang alternates, so both
 * language versions of every page are discoverable.
 */
export async function buildMetadata(
  params: Promise<{ locale: string }>,
  path: string,
  pick: (t: Dictionary) => { title: string; description: string },
): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const { title, description } = pick(getDictionary(locale));
  const clean = path === "/" ? "" : path;

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}${clean}`,
      languages: {
        en: `/en${clean}`,
        es: `/es${clean}`,
        "x-default": `/en${clean}`,
      },
    },
    openGraph: { title, description, url: `/${locale}${clean}` },
  };
}
