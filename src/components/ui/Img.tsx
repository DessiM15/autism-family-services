"use client";

import NextImage from "next/image";
import { getImage } from "@/lib/images";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { cn } from "@/lib/utils";

export interface ImgProps {
  /** Key from the image manifest, e.g. "hero-01". */
  name: string;
  className?: string;
  /** Wrapper classes; the image itself always fills it. */
  wrapperClassName?: string;
  sizes?: string;
  priority?: boolean;
  /** Overrides the manifest alt text. Pass "" for decorative images. */
  alt?: string;
  quality?: number;
}

/**
 * Every photograph on the site goes through here. It pulls dimensions, alt
 * text in the active language and a blur-up placeholder from the manifest,
 * which means swapping in the client's real photography later is a one-line
 * change per image.
 */
export function Img({
  name,
  className,
  wrapperClassName,
  sizes = "100vw",
  priority = false,
  alt,
  quality = 82,
}: ImgProps) {
  const { locale } = useLocale();
  const entry = getImage(name);

  if (!entry) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(`[Img] Unknown image key: "${name}"`);
    }
    return <div className={cn("bg-cream-300", wrapperClassName, className)} />;
  }

  return (
    <div className={cn("relative overflow-hidden", wrapperClassName)}>
      <NextImage
        src={entry.src}
        alt={alt ?? entry.alt[locale]}
        fill
        sizes={sizes}
        priority={priority}
        quality={quality}
        placeholder="blur"
        blurDataURL={entry.blurDataURL}
        className={cn("object-cover", className)}
      />
    </div>
  );
}
