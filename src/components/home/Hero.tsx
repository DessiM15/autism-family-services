"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, type MotionValue } from "motion/react";
import { ArrowDown, Phone } from "lucide-react";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { useMotionAllowed } from "@/components/calm/CalmModeProvider";
import { Img } from "@/components/ui/Img";
import { ButtonLink } from "@/components/ui/Button";
import { site } from "@/lib/site";
import { telHref, cn } from "@/lib/utils";

/**
 * Each photograph gets a lane: where it sits, how big it is, how fast it
 * travels against the scroll, and the slice of the scroll during which it
 * arrives. Staggering all four is what makes the montage read as depth
 * rather than as a grid that happens to move.
 *
 * Everything is deliberately kept out of the centre column — the headline
 * has to stay perfectly legible while the photographs pass it.
 */
interface Layer {
  key: string;
  /** Position within the pinned stage, as percentages. */
  x: string;
  y: string;
  w: string;
  ratio: string;
  /** Travel distance in vh. Bigger = closer to the viewer. */
  depth: number;
  /** Scroll progress at which this photo starts arriving. */
  start: number;
  rotate?: number;
}

/* A full scatter: photographs cross the whole frame, including behind the
   headline, and keep replenishing from below so the stage is never empty.
   Legibility is handled by the veil in the middle of the stack rather than
   by keeping the centre column clear. */
const desktopLayers: Layer[] = [
  // Left
  { key: "hero-01", x: "-5%", y: "4%",   w: "clamp(180px, 20vw, 360px)", ratio: "4/5", depth: 44, start: 0.00, rotate: -2 },
  { key: "hero-04", x: "8%",  y: "40%",  w: "clamp(170px, 19vw, 340px)", ratio: "3/2", depth: 56, start: 0.06, rotate: 2 },
  { key: "hero-09", x: "-3%", y: "78%",  w: "clamp(175px, 19vw, 345px)", ratio: "3/2", depth: 40, start: 0.13, rotate: 1.5 },
  { key: "hero-10", x: "6%",  y: "118%", w: "clamp(160px, 17vw, 300px)", ratio: "4/5", depth: 62, start: 0.21, rotate: 3 },

  // Through the centre — these pass behind the type
  { key: "hero-03", x: "30%", y: "-8%",  w: "clamp(150px, 17vw, 310px)", ratio: "4/3", depth: 50, start: 0.03, rotate: -1.5 },
  { key: "cta-02",  x: "40%", y: "92%",  w: "clamp(160px, 18vw, 330px)", ratio: "3/2", depth: 66, start: 0.10, rotate: 2 },
  { key: "story-connection", x: "26%", y: "148%", w: "clamp(165px, 18vw, 320px)", ratio: "3/2", depth: 46, start: 0.24, rotate: -2 },
  { key: "aba-01",  x: "46%", y: "186%", w: "clamp(150px, 16vw, 290px)", ratio: "4/5", depth: 58, start: 0.31, rotate: 1.5 },

  // Right
  { key: "hero-02", x: "76%", y: "0%",   w: "clamp(175px, 19vw, 345px)", ratio: "3/4", depth: 52, start: 0.02, rotate: 3 },
  { key: "hero-05", x: "86%", y: "36%",  w: "clamp(165px, 18vw, 320px)", ratio: "3/4", depth: 38, start: 0.08, rotate: -2 },
  { key: "hero-06", x: "74%", y: "74%",  w: "clamp(155px, 16vw, 295px)", ratio: "3/4", depth: 60, start: 0.15, rotate: -3 },
  { key: "hero-08", x: "84%", y: "112%", w: "clamp(150px, 16vw, 280px)", ratio: "1/1", depth: 44, start: 0.19, rotate: 2 },
  { key: "hero-07", x: "70%", y: "152%", w: "clamp(170px, 18vw, 330px)", ratio: "3/2", depth: 64, start: 0.27, rotate: -1.5 },
  { key: "testimonial-01", x: "88%", y: "190%", w: "clamp(150px, 16vw, 285px)", ratio: "3/2", depth: 50, start: 0.34, rotate: 2.5 },
];

/* On a phone there is no room to scatter behind the type, so the
   photographs rise in procession from below the fold instead. */
const mobileLayers: Layer[] = [
  { key: "hero-01", x: "-10%", y: "98%",  w: "56vw", ratio: "4/5", depth: 16, start: 0.02, rotate: -3 },
  { key: "hero-02", x: "52%",  y: "116%", w: "54vw", ratio: "3/4", depth: 24, start: 0.10, rotate: 3 },
  { key: "hero-03", x: "-8%",  y: "136%", w: "60vw", ratio: "4/3", depth: 26, start: 0.18, rotate: 2 },
  { key: "hero-05", x: "50%",  y: "158%", w: "56vw", ratio: "3/4", depth: 28, start: 0.26, rotate: -2.5 },
];

/** Shared by the blur layer and its mask so the two stay in step. */
const VEIL_MASK =
  "radial-gradient(58% 40% at 50% 40%, #000 0%, #000 48%, rgba(0,0,0,0.45) 76%, transparent 100%)";

export function Hero() {
  const animate = useMotionAllowed();

  /* Calm Mode gets a still, composed version of the same idea — a hero
     that is beautiful without ever moving. Kept as a sibling rather than an
     early return so the montage's scroll ref is always attached when it
     mounts. */
  return animate ? <HeroMontage /> : <StillHero />;
}

function HeroMontage() {
  const { t, href } = useLocale();
  const stageRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start start", "end end"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 32,
    restDelta: 0.001,
  });

  /* The headline settles back a little as the photographs arrive, then the
     whole stage simply scrolls away — no fade to an empty frame. */
  const titleScale = useTransform(progress, [0, 1], [1, 0.93]);
  const titleY = useTransform(progress, [0, 1], ["0%", "-4%"]);
  const cueOpacity = useTransform(progress, [0, 0.1], [1, 0]);

  return (
    <section
      ref={stageRef}
      className="relative h-[170svh] bg-cream-100"
      aria-label={`${t.home.heroLine1} ${t.home.heroLine2} ${t.home.heroEmphasis} ${t.home.heroLine3}`.trim()}
    >
      <div className="sticky top-0 grid h-svh place-items-center overflow-hidden">
        {/* Warm light behind everything */}
        <div
          aria-hidden
          className="decor pointer-events-none absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(120% 80% at 50% 6%, #ffffff 0%, #fbf9f5 44%, #f1eae0 100%)",
          }}
        />

        {/* ------------------------------------------------ Photographs */}
        <div aria-hidden className="absolute inset-0 z-10">
          {desktopLayers.map((layer) => (
            <PhotoLayer key={layer.key} layer={layer} progress={progress} hideBelowMd />
          ))}
          {mobileLayers.map((layer) => (
            <PhotoLayer key={`m-${layer.key}`} layer={layer} progress={progress} mobileOnly />
          ))}
        </div>

        {/* Two layers guarantee the headline reads even with photographs
            crossing behind it: a masked backdrop blur softens whatever is
            passing through the centre, and a cream veil sits on top. The
            mask means photographs out at the edges stay perfectly crisp. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-20 backdrop-blur-[4px]"
          style={{
            WebkitMaskImage: VEIL_MASK,
            maskImage: VEIL_MASK,
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-20"
          style={{
            background:
              "radial-gradient(60% 42% at 50% 40%, rgba(251,249,245,0.95) 0%, rgba(251,249,245,0.89) 46%, rgba(251,249,245,0.46) 76%, rgba(251,249,245,0) 100%)",
          }}
        />

        {/* ------------------------------------------------ Headline */}
        <motion.div
          style={{ scale: titleScale, y: titleY }}
          className="relative z-30 flex w-full flex-col items-center px-6 text-center"
        >
          <Credentials />

          <h1 className="font-display mt-7 max-w-[min(52rem,70vw)] text-[clamp(2.5rem,6.1vw,5.75rem)] leading-[0.98] tracking-[-0.03em] text-navy-900">
            <Rise delay={0.15}>{t.home.heroLine1}</Rise>{" "}
            <Rise delay={0.28}>{t.home.heroLine2}</Rise>{" "}
            <Rise delay={0.4}>
              <em className="brand-gradient not-italic">{t.home.heroEmphasis}</em>
            </Rise>
            {t.home.heroLine3 ? (
              <>
                {" "}
                <Rise delay={0.5}>{t.home.heroLine3}</Rise>
              </>
            ) : null}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="type-lead mt-7 max-w-xl text-balance"
          >
            {t.home.heroSub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="mt-9 flex flex-col items-center gap-3 sm:flex-row"
          >
            <ButtonLink href={href("/start-here")} size="lg" arrow>
              {t.home.heroCtaPrimary}
            </ButtonLink>
            <a
              href={telHref(site.phone)}
              className="group inline-flex h-14 items-center gap-2.5 rounded-full border border-cream-400 bg-cream-50/80 px-7 font-semibold text-navy-900 backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-navy-300 hover:bg-white"
            >
              <Phone className="size-4 text-cyan-600" aria-hidden />
              {t.home.heroCtaSecondary}
            </a>
          </motion.div>
        </motion.div>

        {/* ------------------------------------------------ Scroll cue */}
        <motion.div
          style={{ opacity: cueOpacity }}
          className="absolute bottom-7 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-2"
        >
          <span className="type-eyebrow text-ink-400">{t.common.scrollToExplore}</span>
          <motion.span
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            className="grid size-9 place-items-center rounded-full border border-cream-400 bg-cream-50/80 text-navy-900 backdrop-blur"
          >
            <ArrowDown className="size-4" aria-hidden />
          </motion.span>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function PhotoLayer({
  layer,
  progress,
  hideBelowMd = false,
  mobileOnly = false,
}: {
  layer: Layer;
  progress: MotionValue<number>;
  hideBelowMd?: boolean;
  mobileOnly?: boolean;
}) {
  const arrive = Math.min(layer.start + 0.34, 1);

  // Travels the whole way through — no exit fade, so the stage is never empty.
  const y = useTransform(
    progress,
    [layer.start, 1],
    [`${layer.depth}vh`, `${-layer.depth * 0.85}vh`],
  );
  const opacity = useTransform(
    progress,
    [layer.start, layer.start + 0.09],
    [0, 1],
  );
  const scale = useTransform(progress, [layer.start, arrive], [0.86, 1]);

  return (
    <motion.div
      style={{ y, opacity, scale, left: layer.x, top: layer.y, width: layer.w }}
      className={cn(
        "absolute will-change-transform",
        hideBelowMd && "hidden md:block",
        mobileOnly && "md:hidden",
      )}
    >
      <div
        style={{ aspectRatio: layer.ratio, rotate: `${layer.rotate ?? 0}deg` }}
        className="grain relative overflow-hidden shadow-[0_34px_70px_-26px_rgba(0,30,100,0.5)] ring-1 ring-black/5"
      >
        <Img
          name={layer.key}
          alt=""
          wrapperClassName="absolute inset-0"
          sizes="(max-width: 768px) 48vw, 22vw"
          priority={layer.start < 0.06}
        />
      </div>
    </motion.div>
  );
}

/** A word group that lifts out of a mask as the hero opens. */
function Rise({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <span className="inline-block overflow-hidden pb-[0.06em] align-bottom">
      <motion.span
        initial={{ y: "112%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1.15, delay, ease: [0.16, 1, 0.3, 1] }}
        className="inline-block"
      >
        {children}
      </motion.span>
    </span>
  );
}

/**
 * The credential, set as editorial credit type between two hairline rules.
 * It was a pair of rounded chips, which read as interface furniture rather
 * than as an earned distinction.
 */
function Credentials() {
  const { t } = useLocale();
  return (
    <div className="flex flex-col items-center">
      <span aria-hidden className="h-px w-14 bg-navy-900/25" />
      <p className="type-eyebrow mt-5 text-navy-800">{t.home.creds.cacShort}</p>
      <p className="mt-2.5 text-[0.8125rem] tracking-wide text-ink-500">
        {t.home.creds.cacQualifier}
        <span aria-hidden className="mx-2.5 text-ink-300">
          &middot;
        </span>
        <span lang="es">{t.spanish.badge}</span>
      </p>
      <span aria-hidden className="mt-5 h-px w-14 bg-navy-900/25" />
    </div>
  );
}

/** Calm Mode hero: composed, generous, entirely still. */
function StillHero() {
  const { t, href } = useLocale();
  return (
    <section className="relative overflow-hidden bg-cream-100 pt-[calc(var(--header-h)+3rem)] pb-20 lg:pb-28">
      <div className="container-page">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Credentials />
            <h1 className="font-display type-display-lg mt-7 text-navy-900">
              {t.home.heroLine1} {t.home.heroLine2}{" "}
              <em className="brand-gradient not-italic">{t.home.heroEmphasis}</em>
              {t.home.heroLine3 ? ` ${t.home.heroLine3}` : ""}
            </h1>
            <p className="type-lead mt-6 max-w-xl">{t.home.heroSub}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={href("/start-here")} size="lg">
                {t.home.heroCtaPrimary}
              </ButtonLink>
              <a
                href={telHref(site.phone)}
                className="inline-flex h-14 items-center justify-center gap-2.5 rounded-full border border-cream-400 bg-cream-50 px-7 font-semibold text-navy-900"
              >
                <Phone className="size-4 text-cyan-600" aria-hidden />
                {t.home.heroCtaSecondary}
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Img
              name="hero-01"
              wrapperClassName="aspect-[4/5] calm-soften"
              sizes="(max-width: 1024px) 45vw, 25vw"
              priority
            />
            <Img
              name="hero-03"
              wrapperClassName="mt-10 aspect-[4/5] calm-soften"
              sizes="(max-width: 1024px) 45vw, 25vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
