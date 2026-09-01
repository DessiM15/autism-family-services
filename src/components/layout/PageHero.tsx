"use client";

import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { Eyebrow } from "@/components/ui/Section";
import { Img } from "@/components/ui/Img";
import { ParallaxLayer } from "@/components/motion/Parallax";
import { cn } from "@/lib/utils";
import { useDeclareHeaderTone } from "./HeaderTone";

/**
 * The opening frame for every interior page. Dark variant for pages that
 * want weight (team, first visit); light for everything else.
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  image,
  tone = "light",
  children,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  /** Image manifest key. Omit for a plain typographic opening. */
  image?: string;
  tone?: "light" | "dark";
  children?: ReactNode;
  align?: "left" | "center";
}) {
  const dark = tone === "dark";

  // Tell the header to switch to light type while this hero is on screen.
  useDeclareHeaderTone(dark ? "dark" : "light");

  return (
    <section
      className={cn(
        "relative isolate overflow-hidden",
        dark ? "bg-navy-950 text-cream-100" : "bg-cream-100 text-ink-900",
      )}
    >
      {image && (
        <>
          <ParallaxLayer speed={10} className="absolute inset-0 -z-10">
            <div className="relative h-full w-full">
              <Img
                name={image}
                alt=""
                wrapperClassName="absolute inset-0"
                className={dark ? "opacity-40" : "opacity-20"}
                sizes="100vw"
                priority
              />
            </div>
          </ParallaxLayer>
          <div
            aria-hidden
            className={cn(
              "absolute inset-0 -z-10",
              dark
                ? "scrim-full"
                : "bg-gradient-to-b from-cream-100/70 via-cream-100/85 to-cream-100",
            )}
          />
        </>
      )}

      <div className="container-page pt-[calc(var(--header-h)+5rem)] pb-20 lg:pt-[calc(var(--header-h)+8rem)] lg:pb-28">
        <div
          className={cn(
            "max-w-4xl",
            align === "center" && "mx-auto text-center",
          )}
        >
          {eyebrow && (
            <Reveal variant="up">
              <Eyebrow
                tone={dark ? "light" : "cyan"}
                className={align === "center" ? "justify-center" : undefined}
              >
                {eyebrow}
              </Eyebrow>
            </Reveal>
          )}

          <SplitText
            as="h1"
            text={title}
            immediate
            className={cn(
              "type-display-lg mt-6",
              dark ? "text-cream-50" : "text-navy-900",
            )}
          />

          {lead && (
            <Reveal variant="up" delay={0.2}>
              <p
                className={cn(
                  "mt-7 max-w-2xl text-[1.0625rem] leading-relaxed lg:text-[1.1875rem]",
                  align === "center" && "mx-auto",
                  dark ? "text-cream-100/75" : "text-ink-700",
                )}
              >
                {lead}
              </p>
            </Reveal>
          )}

          {children && (
            <Reveal variant="up" delay={0.3}>
              <div className="mt-10">{children}</div>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
