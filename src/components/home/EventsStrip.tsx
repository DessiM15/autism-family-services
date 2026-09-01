"use client";

import Link from "next/link";
import { Phone, Repeat } from "lucide-react";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { Section, Eyebrow } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { ButtonLink } from "@/components/ui/Button";
import { services } from "@/content/data/services";
import { site } from "@/lib/site";
import { telHref } from "@/lib/utils";

/**
 * The clinic has no dated event feed, only programmes that run on a regular
 * cadence, so this shows those rather than a calendar grid that would sit
 * empty. Registration points at their own live JotForm.
 */
const PROGRAMMES = [
  { slug: "parent-support-workshops", cadence: { en: "Monthly", es: "Mensual" }, register: true },
  { slug: "social-skills-groups", cadence: { en: "Ages 5–17", es: "De 5 a 17 años" }, register: true },
  { slug: "parent-training", cadence: { en: "In person or online", es: "Presencial o en línea" }, register: false },
] as const;

export function EventsStrip() {
  const { t, href, pick, locale } = useLocale();

  return (
    <Section tone="deep" size="md">
      <div className="container-page">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <Reveal variant="up">
              <Eyebrow tone="ember">{t.home.eventsEyebrow}</Eyebrow>
            </Reveal>
            <SplitText
              as="h2"
              text={t.home.eventsHeading}
              className="type-display-md mt-6 text-navy-900"
            />
            <Reveal variant="up" delay={0.12}>
              <p className="type-lead mt-5">{t.home.eventsBody}</p>
            </Reveal>
          </div>

          <Reveal variant="up" delay={0.18}>
            <ButtonLink href={href("/events")} variant="secondary" arrow>
              {t.home.eventsCta}
            </ButtonLink>
          </Reveal>
        </div>

        <RevealGroup className="mt-12 grid gap-5 md:grid-cols-3" stagger={0.09}>
          {PROGRAMMES.map((programme) => {
            const service = services.find((s) => s.slug === programme.slug);
            if (!service) return null;

            return (
              <RevealItem key={programme.slug} variant="up" className="h-full">
                <article className="surface-card flex h-full flex-col p-7">
                  <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-ember-100 px-3 py-1 text-[0.6875rem] font-semibold text-ember-600">
                    <Repeat className="size-3" aria-hidden />
                    {programme.cadence[locale]}
                  </span>

                  <h3 className="font-display mt-5 text-[1.375rem] leading-snug text-navy-900">
                    {pick(service.name)}
                  </h3>
                  {service.blurb && (
                    <p className="mt-2.5 flex-1 text-[0.9375rem] leading-relaxed text-ink-500">
                      {pick(service.blurb)}
                    </p>
                  )}

                  <div className="mt-6 flex items-center justify-between gap-4 border-t border-cream-300 pt-5">
                    <span className="font-display text-[1.375rem] text-navy-900">
                      {pick(service.rate)}
                    </span>

                    {programme.register ? (
                      <a
                        href={site.registrationUrl}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex h-10 items-center rounded-full bg-navy-900 px-4 text-[0.8125rem] font-semibold text-cream-50 transition-colors hover:bg-navy-800"
                      >
                        {t.home.register}
                      </a>
                    ) : (
                      <a
                        href={telHref(site.phone)}
                        className="inline-flex h-10 items-center gap-1.5 rounded-full border border-cream-400 px-4 text-[0.8125rem] font-semibold text-navy-900 transition-colors hover:border-navy-300"
                      >
                        <Phone className="size-3.5 text-cyan-600" aria-hidden />
                        {t.home.askUs}
                      </a>
                    )}
                  </div>
                </article>
              </RevealItem>
            );
          })}
        </RevealGroup>

        <Reveal variant="up" delay={0.14}>
          <p className="mt-7 text-[0.875rem] text-ink-500">
            {t.home.alsoRunning}{" "}
            <Link
              href={href("/whats-happening")}
              className="link-draw font-semibold text-navy-900"
            >
              {t.whatsHappening.shapeHeading}
            </Link>
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
