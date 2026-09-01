"use client";

import { useCallback, useRef } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { useMotionAllowed } from "@/components/calm/CalmModeProvider";
import { Img } from "@/components/ui/Img";

/**
 * The section pins to the viewport and the verse illuminates one word at a
 * time as you scroll through it. When the last word lands, the section
 * releases and the page carries on — so you scroll *through* the sentence
 * rather than past it.
 */
export function VerseReveal() {
  const animate = useMotionAllowed();
  return animate ? <PinnedVerse /> : <StillVerse />;
}

/* Timing of the illumination across the pin. Words finish before the end so
   the completed sentence gets a beat to itself before the section releases. */
const FIRST_WORD_AT = 0.06;
const LAST_WORD_BY = 0.78;
/** How much of a word's own slot it takes to come fully up. */
const WORD_RAMP = 2.2;

const DIM = 0.16;
const MAX_BLUR = 4;

function PinnedVerse() {
  const { t } = useLocale();
  const ref = useRef<HTMLElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const words = t.home.verse.split(" ").filter(Boolean);

  /**
   * One subscription drives every word, with the clamp written out by hand.
   * Giving each word its own `useTransform` looked tidier but did not clamp
   * the way it appeared to — words lit up and then faded back out as the
   * scroll continued. This is both correct and far cheaper than thirty
   * motion values.
   */
  const paint = useCallback((p: number) => {
    const n = wordRefs.current.length;
    if (!n) return;
    const slot = (LAST_WORD_BY - FIRST_WORD_AT) / n;

    for (let i = 0; i < n; i++) {
      const el = wordRefs.current[i];
      if (!el) continue;
      const start = FIRST_WORD_AT + i * slot;
      const t = Math.min(1, Math.max(0, (p - start) / (slot * WORD_RAMP)));
      el.style.opacity = String(DIM + t * (1 - DIM));
      el.style.filter = t >= 1 ? "none" : `blur(${((1 - t) * MAX_BLUR).toFixed(2)}px)`;
    }
  }, []);

  useMotionValueEvent(scrollYProgress, "change", paint);

  /* The image drifts and lifts slightly across the pin, so the frame is
     never completely static while the words arrive. */
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.12, 1]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"]);

  return (
    <section
      ref={ref}
      /* Shorter on a phone: a long pin on a small screen reads as a frozen page. */
      className="relative h-[150svh] bg-navy-950 lg:h-[190svh]"
      aria-label={t.home.verse}
    >
      <div className="sticky top-0 flex h-svh items-center overflow-hidden">
        <motion.div style={{ scale: imageScale, y: imageY }} className="absolute inset-0">
          <Img
            name="story-hope"
            alt=""
            wrapperClassName="absolute inset-0"
            className="opacity-45"
            sizes="100vw"
          />
        </motion.div>
        <div aria-hidden className="scrim-full absolute inset-0" />

        <div className="container-prose relative text-center">
          <p className="type-eyebrow justify-center text-cyan-300">{t.home.verseRef}</p>

          {/* Exposed to assistive tech as one sentence, not a pile of words. */}
          <p
            aria-label={t.home.verse}
            className="font-display mt-9 text-[clamp(1.75rem,4.4vw,3.5rem)] leading-[1.28] text-cream-50"
          >
            <span aria-hidden>
              {words.map((word, i) => (
                <span key={`${word}-${i}`}>
                  <span
                    ref={(el) => {
                      wordRefs.current[i] = el;
                    }}
                    className="inline-block will-change-[opacity,filter]"
                    style={{ opacity: DIM, filter: `blur(${MAX_BLUR}px)` }}
                  >
                    {word}
                  </span>
                  {i < words.length - 1 ? " " : null}
                </span>
              ))}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

/** Calm Mode: the whole verse, legible immediately, nothing pinned. */
function StillVerse() {
  const { t } = useLocale();
  return (
    <section className="relative isolate overflow-hidden bg-navy-950 py-28 text-cream-100 lg:py-40">
      <Img
        name="story-hope"
        alt=""
        wrapperClassName="absolute inset-0 -z-10"
        className="calm-soften opacity-40"
        sizes="100vw"
      />
      <div aria-hidden className="scrim-full absolute inset-0 -z-10" />
      <div className="container-prose relative text-center">
        <p className="type-eyebrow justify-center text-cyan-300">{t.home.verseRef}</p>
        <p className="font-display mt-8 text-[clamp(1.5rem,3.6vw,2.75rem)] leading-[1.25] text-cream-50">
          {t.home.verse}
        </p>
      </div>
    </section>
  );
}
