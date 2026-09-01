import type { MetadataRoute } from "next";
import { LOCALES } from "@/lib/i18n";
import { site } from "@/lib/site";

const paths = [
  "",
  "/start-here",
  "/services",
  "/aba",
  "/team",
  "/about",
  "/first-visit",
  "/resources",
  "/grants",
  "/careers",
  "/gen-xy",
  "/whats-happening",
  "/events",
  "/contact",
];

/** Every page, in both languages, cross-linked with hreflang alternates. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return LOCALES.flatMap((locale) =>
    paths.map((path) => ({
      url: `${site.url}/${locale}${path}`,
      lastModified: now,
      changeFrequency: path === "" ? ("weekly" as const) : ("monthly" as const),
      priority: path === "" ? 1 : path === "/services" || path === "/team" ? 0.9 : 0.7,
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map((l) => [l, `${site.url}/${l}${path}`]),
        ),
      },
    })),
  );
}
