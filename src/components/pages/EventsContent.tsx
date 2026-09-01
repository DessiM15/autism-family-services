"use client";

import { CalendarDays, MapPin, Phone, Repeat } from "lucide-react";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { Section, Eyebrow } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { services } from "@/content/data/services";
import { site, fullAddress } from "@/lib/site";
import { telHref } from "@/lib/utils";

/**
 * The clinic runs its calendar elsewhere, so this page presents the standing,
 * recurring programmes they publish — and hands off to the phone to book.
 * Ready to swap for a live feed whenever they choose one.
 */
export function EventsContent() {
  const { t, pick } = useLocale();

  const recurring = [
    "parent-support-workshops",
    "social-skills-groups",
    "parent-training",
  ]
    .map((slug) => services.find((s) => s.slug === slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <Section tone="cream" size="lg">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-[calc(var(--header-h)+2.5rem)]">
              <Reveal variant="up">
                <span className="grid size-12 place-items-center rounded-full bg-cyan-100 text-cyan-600">
                  <CalendarDays className="size-5" aria-hidden />
                </span>
                <Eyebrow className="mt-6">{t.events.title}</Eyebrow>
                <h2 className="type-display-sm mt-5 text-navy-900">
                  {t.events.heading}
                </h2>
                <p className="type-lead mt-5">{t.events.body}</p>
              </Reveal>

              <Reveal variant="up" delay={0.12}>
                <div className="mt-8 space-y-3 border-t border-cream-300 pt-7 text-[0.9375rem]">
                  <p className="flex items-start gap-3 text-ink-700">
                    <MapPin className="mt-0.5 size-4 shrink-0 text-cyan-600" aria-hidden />
                    {fullAddress()}
                  </p>
                  <a
                    href={telHref(site.phone)}
                    className="flex items-start gap-3 font-semibold text-navy-900 hover:text-cyan-600"
                  >
                    <Phone className="mt-0.5 size-4 shrink-0 text-cyan-600" aria-hidden />
                    {site.phone}
                  </a>
                </div>
              </Reveal>
            </div>
          </div>

          <div className="lg:col-span-8">
            <RevealGroup className="space-y-5" stagger={0.1}>
              {recurring.map((item) => (
                <RevealItem key={item.slug} variant="up">
                  <article className="surface-card flex flex-col gap-6 p-7 sm:flex-row sm:items-center lg:p-8">
                    <div className="flex-1">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-100 px-3 py-1 text-[0.6875rem] font-semibold text-cyan-600">
                        <Repeat className="size-3" aria-hidden />
                        {t.events.monthly}
                      </span>
                      <h3 className="font-display mt-4 text-[1.5rem] leading-snug text-navy-900">
                        {pick(item.name)}
                      </h3>
                      {item.blurb && (
                        <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-500">
                          {pick(item.blurb)}
                        </p>
                      )}
                    </div>
                    <div className="flex shrink-0 flex-col items-start gap-3 sm:items-end">
                      <span className="font-display text-[1.5rem] text-navy-900">
                        {pick(item.rate)}
                      </span>
                      <a
                        href={telHref(site.phone)}
                        className="inline-flex h-11 items-center gap-2 rounded-full bg-navy-900 px-5 text-[0.875rem] font-semibold text-cream-50 transition-colors hover:bg-navy-800"
                      >
                        <Phone className="size-3.5" aria-hidden />
                        {t.events.callToRegister}
                      </a>
                    </div>
                  </article>
                </RevealItem>
              ))}
            </RevealGroup>

            <Reveal variant="up" delay={0.14}>
              <p className="mt-8 rounded-2xl border border-dashed border-cream-400 p-7 text-center text-[0.9375rem] text-ink-500">
                {t.events.empty}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </Section>
  );
}
