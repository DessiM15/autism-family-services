import manifest from "@/content/data/images.json";
import type { Locale } from "./i18n";

export interface ImageEntry {
  src: string;
  width: number;
  height: number;
  alt: Record<Locale, string>;
  blurDataURL: string;
  credit: {
    creator: string | null;
    license: string | null;
    source: string | null;
    url: string | null;
  };
}

const images = manifest as unknown as Record<string, ImageEntry>;

export type ImageKey = keyof typeof manifest;

export function getImage(key: string): ImageEntry | undefined {
  return images[key];
}

/** Every image, for the credits list and for sanity checks in dev. */
export const allImages = images;

/**
 * Every photograph is licensed CC0, so no attribution is legally required.
 * These are kept so the client can trace provenance — and so real clinic
 * photography can replace them one key at a time.
 */
export function imageCredits() {
  return Object.entries(images).map(([key, entry]) => ({ key, ...entry.credit }));
}
