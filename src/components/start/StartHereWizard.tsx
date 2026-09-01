"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, Phone, RotateCcw } from "lucide-react";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { useMotionAllowed } from "@/components/calm/CalmModeProvider";
import { services, type Service } from "@/content/data/services";
import { site } from "@/lib/site";
import { telHref, cn } from "@/lib/utils";

type Who = "child" | "self" | "school" | "adult";
type Need =
  | "diagnosis"
  | "therapy"
  | "school"
  | "parent"
  | "talk"
  | "cost"
  | "unsure";

/** Which service slugs to surface for each answer pair. */
const routes: Record<Who, Partial<Record<Need, string[]>> & { default: string[] }> = {
  child: {
    default: ["aba-therapy", "autism-diagnostic-services", "parent-training"],
    diagnosis: ["autism-diagnostic-services", "functional-behavior-assessment", "aba-therapy"],
    therapy: ["aba-therapy", "social-skills-groups", "parent-training"],
    school: ["academic-sped-tutoring", "school-district-support", "behavior-intervention-plan"],
    parent: ["parent-training", "parent-support-workshops", "social-skills-groups"],
    talk: ["individual-counseling", "couples-family-counseling"],
    cost: [],
  },
  self: {
    default: ["individual-counseling", "couples-family-counseling"],
    talk: ["individual-counseling", "couples-family-counseling"],
    therapy: ["individual-counseling", "aba-therapy"],
    diagnosis: ["autism-diagnostic-services", "individual-counseling"],
    cost: [],
  },
  school: {
    default: [
      "school-district-support",
      "professional-development",
      "esy-autism-support",
      "school-mental-health",
    ],
    school: ["school-district-support", "esy-autism-support", "crisis-intervention-plan"],
    therapy: ["school-district-support", "school-mental-health"],
    talk: ["school-mental-health", "professional-development"],
    cost: [],
  },
  adult: {
    default: ["aba-therapy", "individual-counseling", "couples-family-counseling"],
    therapy: ["aba-therapy", "individual-counseling"],
    talk: ["individual-counseling", "couples-family-counseling"],
    diagnosis: ["autism-diagnostic-services"],
    cost: [],
  },
};

const whoKeys: Who[] = ["child", "self", "school", "adult"];
const needKeys: Need[] = [
  "diagnosis",
  "therapy",
  "school",
  "parent",
  "talk",
  "cost",
  "unsure",
];

export function StartHereWizard() {
  const { t, href, pick } = useLocale();
  const animate = useMotionAllowed();

  const [step, setStep] = useState(0);
  const [who, setWho] = useState<Who | null>(null);
  const [need, setNeed] = useState<Need | null>(null);

  const chooseWho = (value: Who) => {
    setWho(value);
    setStep(1);
  };
  const chooseNeed = (value: Need) => {
    setNeed(value);
    setStep(2);
  };
  const reset = () => {
    setWho(null);
    setNeed(null);
    setStep(0);
  };

  const matched: Service[] = (() => {
    if (!who) return [];
    const table = routes[who];
    const slugs =
      (need && table[need]?.length ? table[need] : table.default) ?? table.default;
    return slugs
      .map((slug) => services.find((s) => s.slug === slug))
      .filter((s): s is Service => Boolean(s));
  })();

  const showGrants = need === "cost";

  const transition = { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const };

  return (
    <div className="container-page">
      {/* -------------------------------------------- Progress */}
      <div className="flex items-center gap-4">
        <p className="type-eyebrow text-cyan-600">
          {t.startHere.step} {Math.min(step + 1, 3)} {t.startHere.of} 3
        </p>
        <div className="h-1 flex-1 overflow-hidden rounded-full bg-cream-300">
          <motion.div
            className="h-full rounded-full bg-cyan-500"
            initial={false}
            animate={{ width: `${((step + 1) / 3) * 100}%` }}
            transition={animate ? transition : { duration: 0 }}
          />
        </div>
        {step > 0 && (
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-1.5 text-[0.8125rem] font-semibold text-ink-500 hover:text-navy-900"
          >
            <RotateCcw className="size-3.5" aria-hidden />
            {t.startHere.startOver}
          </button>
        )}
      </div>

      <div className="mt-10 min-h-[26rem]">
        <AnimatePresence mode="wait">
          {/* ---------------------------------------- Step 1: who */}
          {step === 0 && (
            <motion.div
              key="who"
              initial={animate ? { opacity: 0, y: 18 } : false}
              animate={{ opacity: 1, y: 0 }}
              exit={animate ? { opacity: 0, y: -14 } : undefined}
              transition={transition}
            >
              <h2 className="type-display-sm text-navy-900">{t.startHere.q1}</h2>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {whoKeys.map((key) => (
                  <OptionCard
                    key={key}
                    label={t.startHere.options[key].label}
                    desc={t.startHere.options[key].desc}
                    onClick={() => chooseWho(key)}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {/* ---------------------------------------- Step 2: need */}
          {step === 1 && (
            <motion.div
              key="need"
              initial={animate ? { opacity: 0, y: 18 } : false}
              animate={{ opacity: 1, y: 0 }}
              exit={animate ? { opacity: 0, y: -14 } : undefined}
              transition={transition}
            >
              <button
                type="button"
                onClick={() => setStep(0)}
                className="mb-6 inline-flex items-center gap-1.5 text-[0.875rem] font-semibold text-ink-500 hover:text-navy-900"
              >
                <ArrowLeft className="size-4" aria-hidden />
                {t.startHere.back}
              </button>
              <h2 className="type-display-sm text-navy-900">{t.startHere.q2}</h2>
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {needKeys.map((key) => (
                  <OptionCard
                    key={key}
                    label={t.startHere.needs[key].label}
                    desc={t.startHere.needs[key].desc}
                    onClick={() => chooseNeed(key)}
                    compact
                  />
                ))}
              </div>
            </motion.div>
          )}

          {/* ---------------------------------------- Step 3: result */}
          {step === 2 && (
            <motion.div
              key="result"
              initial={animate ? { opacity: 0, y: 18 } : false}
              animate={{ opacity: 1, y: 0 }}
              exit={animate ? { opacity: 0, y: -14 } : undefined}
              transition={transition}
            >
              <button
                type="button"
                onClick={() => setStep(1)}
                className="mb-6 inline-flex items-center gap-1.5 text-[0.875rem] font-semibold text-ink-500 hover:text-navy-900"
              >
                <ArrowLeft className="size-4" aria-hidden />
                {t.startHere.back}
              </button>

              <h2 className="type-display-sm text-navy-900">
                {t.startHere.resultHeading}
              </h2>
              <p className="type-lead mt-4">{t.startHere.resultBody}</p>

              {showGrants && (
                <Link
                  href={href("/grants")}
                  className="mt-8 flex items-center justify-between gap-6 rounded-2xl border border-ember-300/60 bg-ember-100/60 p-7 transition-transform duration-300 hover:-translate-y-0.5"
                >
                  <span>
                    <span className="font-display block text-[1.375rem] text-navy-900">
                      {t.grantsPage.title}
                    </span>
                    <span className="mt-1.5 block text-[0.9375rem] text-ink-500">
                      {t.grantsPage.heading}
                    </span>
                  </span>
                  <ArrowRight className="size-5 shrink-0 text-ember-600" aria-hidden />
                </Link>
              )}

              <ul className="mt-8 grid gap-4 md:grid-cols-2">
                {matched.map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={href(`/services#${service.slug}`)}
                      className="surface-card group flex h-full flex-col p-6 transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:shadow-[0_22px_48px_-24px_rgba(0,30,100,0.32)]"
                    >
                      <h3 className="font-display text-[1.25rem] leading-snug text-navy-900">
                        {pick(service.name)}
                      </h3>
                      {service.blurb && (
                        <p className="mt-2 flex-1 text-[0.875rem] leading-relaxed text-ink-500">
                          {pick(service.blurb)}
                        </p>
                      )}
                      <span className="mt-5 flex items-center justify-between border-t border-cream-300 pt-4">
                        <span className="font-display text-[1.0625rem] text-navy-900">
                          {pick(service.rate)}
                        </span>
                        <ArrowRight
                          className="size-4 text-ink-400 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-cyan-600"
                          aria-hidden
                        />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Always offer a person */}
              <div className="mt-10 rounded-2xl bg-navy-950 p-8 text-cream-100 lg:p-10">
                <p className="font-display text-[1.5rem] leading-snug">
                  {t.startHere.talkToSomeone}
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={telHref(site.phone)}
                    className="inline-flex h-14 items-center justify-center gap-2.5 rounded-full bg-cream-50 px-7 font-semibold text-navy-900 transition-transform hover:-translate-y-0.5"
                  >
                    <Phone className="size-4 text-cyan-600" aria-hidden />
                    {site.phone}
                  </a>
                  <Link
                    href={href("/contact")}
                    className="inline-flex h-14 items-center justify-center rounded-full border border-cream-100/25 px-7 font-semibold text-cream-100 transition-colors hover:bg-cream-100/10"
                  >
                    {t.common.requestCallback}
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

function OptionCard({
  label,
  desc,
  onClick,
  compact = false,
}: {
  label: string;
  desc: string;
  onClick: () => void;
  compact?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "surface-card group flex flex-col text-left transition-[transform,border-color,box-shadow] duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-cyan-500 hover:shadow-[0_22px_48px_-24px_rgba(0,30,100,0.32)]",
        compact ? "p-5" : "p-7",
      )}
    >
      <span className="flex items-start justify-between gap-4">
        <span
          className={cn(
            "font-display leading-snug text-navy-900",
            compact ? "text-[1.125rem]" : "text-[1.5rem]",
          )}
        >
          {label}
        </span>
        <ArrowRight
          className="mt-1 size-4 shrink-0 text-ink-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-cyan-600"
          aria-hidden
        />
      </span>
      <span
        className={cn(
          "mt-2 leading-relaxed text-ink-500",
          compact ? "text-[0.8125rem]" : "text-[0.9375rem]",
        )}
      >
        {desc}
      </span>
    </button>
  );
}
