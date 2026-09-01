"use client";

import { Ear, Info, Phone, Printer } from "lucide-react";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { Section, Eyebrow } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { Img } from "@/components/ui/Img";
import { ButtonLink } from "@/components/ui/Button";
import { site, fullAddress, mapsHref } from "@/lib/site";
import { telHref } from "@/lib/utils";

/* One photograph per step, so the sequence reads as a picture story. */
const stepImages = [
  "hero-07",            // arriving together
  "aba-02",             // checking in
  "service-tutoring",   // waiting
  "visit-05",           // meeting the clinician
  "visit-01",           // the therapy room
  "visit-02",           // starting with play
  "service-counseling", // talking before you leave
];

/**
 * A visual social story: the seven things that will happen, in order,
 * with a picture for each. Designed to be looked at with a child at home,
 * and to be printed.
 */
export function FirstVisitContent() {
  const { t, href } = useLocale();

  return (
    <>
      <Section tone="cream" size="md">
        <div className="container-page">
          <div className="no-print flex flex-wrap items-center gap-3">
            <Reveal variant="up">
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex h-12 items-center gap-2.5 rounded-full border border-cream-400 bg-cream-50 px-6 font-semibold text-navy-900 transition-colors hover:border-navy-300"
              >
                <Printer className="size-4 text-cyan-600" aria-hidden />
                {t.firstVisit.printCta}
              </button>
            </Reveal>
          </div>

          {/* -------------------------------------------- The seven steps */}
          <ol className="mt-14 space-y-16 lg:space-y-24">
            {t.firstVisit.steps.map((step, i) => {
              const flipped = i % 2 === 1;
              return (
                <li key={step.title}>
                  <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
                    <div
                      className={`lg:col-span-5 ${flipped ? "lg:order-2" : ""}`}
                    >
                      <Reveal variant="mask" duration={1.1}>
                        <Img
                          name={stepImages[i] ?? "visit-01"}
                          wrapperClassName="grain aspect-[4/3] rounded-2xl"
                          sizes="(max-width: 1024px) 92vw, 38vw"
                          alt=""
                        />
                      </Reveal>
                    </div>

                    <div className={`lg:col-span-7 ${flipped ? "lg:order-1" : ""}`}>
                      <Reveal variant="up">
                        <span className="font-display inline-grid size-14 place-items-center rounded-full bg-navy-900 text-[1.25rem] text-cream-50">
                          {i + 1}
                        </span>
                      </Reveal>
                      <SplitText
                        as="h2"
                        text={step.title}
                        className="type-display-sm mt-6 text-navy-900"
                      />
                      <Reveal variant="up" delay={0.1}>
                        <p className="type-lead mt-4 max-w-xl">{step.body}</p>
                      </Reveal>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </Section>

      {/* -------------------------------------------- Sensory notes */}
      <section className="relative overflow-hidden bg-navy-950 py-24 text-cream-100 lg:py-32">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Reveal variant="up">
                <span className="inline-grid size-12 place-items-center rounded-full bg-cyan-500/15 text-cyan-300">
                  <Ear className="size-5" aria-hidden />
                </span>
                <Eyebrow tone="light" className="mt-6">
                  {t.firstVisit.sensoryHeading}
                </Eyebrow>
              </Reveal>
              <SplitText
                as="h2"
                text={t.firstVisit.sensoryBody}
                className="font-display mt-6 text-[clamp(1.375rem,2.6vw,2rem)] leading-snug text-cream-50"
              />
            </div>

            <div className="lg:col-span-7">
              <RevealGroup
                className="divide-y divide-cream-100/12 border-y border-cream-100/12"
                stagger={0.09}
              >
                {t.firstVisit.sensoryList.map((item) => (
                  <RevealItem key={item} variant="up">
                    <p className="py-5 text-[1.0625rem] leading-relaxed text-cream-100/75">
                      {item}
                    </p>
                  </RevealItem>
                ))}
              </RevealGroup>

              <Reveal variant="up" delay={0.14}>
                <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={telHref(site.phone)}
                    className="inline-flex h-14 items-center justify-center gap-2.5 rounded-full bg-cream-50 px-7 font-semibold text-navy-900 transition-transform hover:-translate-y-0.5"
                  >
                    <Phone className="size-4 text-cyan-600" aria-hidden />
                    {site.phone}
                  </a>
                  <ButtonLink
                    href={href("/contact")}
                    variant="ghost"
                    size="lg"
                    className="text-cream-100 hover:bg-cream-100/10"
                  >
                    {t.common.requestCallback}
                  </ButtonLink>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------- Where */}
      <Section tone="white" size="md">
        <div className="container-page">
          <div className="surface-card overflow-hidden">
            <div className="grid lg:grid-cols-2">
              <div className="p-8 sm:p-12">
                <Reveal variant="up">
                  <Eyebrow>{t.contact.hoursHeading}</Eyebrow>
                  <p className="font-display mt-5 text-[1.75rem] leading-snug text-navy-900">
                    {fullAddress()}
                  </p>
                  <p className="type-lead mt-4">{t.firstVisit.steps[0].body}</p>
                  <a
                    href={mapsHref()}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-8 inline-flex h-13 items-center gap-2.5 rounded-full bg-navy-900 px-7 py-3.5 font-semibold text-cream-50 transition-colors hover:bg-navy-800"
                  >
                    {t.common.getDirections}
                  </a>
                </Reveal>
              </div>
              <div className="min-h-[320px] bg-cream-200">
                <iframe
                  title={t.contact.mapLabel}
                  src={`https://www.google.com/maps?q=${encodeURIComponent(fullAddress())}&output=embed`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-full min-h-[320px] w-full border-0"
                />
              </div>
            </div>
          </div>

          <Reveal variant="up" delay={0.1}>
            <p className="mt-8 flex items-start gap-2.5 text-[0.8125rem] leading-relaxed text-ink-400">
              <Info className="mt-0.5 size-4 shrink-0" aria-hidden />
              {t.firstVisit.photoNote}
            </p>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
