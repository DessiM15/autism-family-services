"use client";

import { Check, Phone } from "lucide-react";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { Section, Eyebrow } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { Parallax } from "@/components/motion/Parallax";
import { Img } from "@/components/ui/Img";
import { ButtonLink } from "@/components/ui/Button";
import { audienceMeta, servicesFor } from "@/content/data/services";
import { site } from "@/lib/site";
import { telHref } from "@/lib/utils";

/**
 * Gen XY is a distinct sub-brand aimed at teens and adults, so it leans on
 * the warmer ember accent rather than the clinic's cyan.
 */
export function GenXYContent() {
  const { t, href, pick } = useLocale();
  const counseling = servicesFor("adults");

  return (
    <>
      <Section tone="cream" size="lg">
        <div className="container-page">
          <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <Reveal variant="up">
                <Eyebrow tone="ember">{t.genXY.title}</Eyebrow>
              </Reveal>
              <SplitText
                as="h2"
                text={t.genXY.heading}
                className="type-display-md mt-6 text-navy-900"
              />
              <Reveal variant="up" delay={0.12}>
                <p className="type-lead mt-7">{t.genXY.body}</p>
              </Reveal>

              <Reveal variant="up" delay={0.2}>
                <p className="type-eyebrow mt-10 text-ember-600">{t.genXY.forWho}</p>
              </Reveal>
              <RevealGroup className="mt-5 space-y-3.5" delay={0.24} stagger={0.08}>
                {t.genXY.forWhoList.map((item) => (
                  <RevealItem key={item} variant="up">
                    <p className="flex items-start gap-3 text-[1.0625rem] leading-snug text-ink-700">
                      <Check className="mt-1 size-4 shrink-0 text-ember-500" aria-hidden />
                      {item}
                    </p>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>

            <div className="lg:col-span-6">
              <Reveal variant="mask" duration={1.2}>
                <Parallax speed={7}>
                  <Img
                    name="service-genxy"
                    wrapperClassName="grain aspect-[4/5] rounded-[1.5rem]"
                    sizes="(max-width: 1024px) 92vw, 46vw"
                  />
                </Parallax>
              </Reveal>
            </div>
          </div>
        </div>
      </Section>

      {/* ------------------------------------------------ Rates */}
      <Section tone="white" size="md">
        <div className="container-page">
          <div className="max-w-2xl">
            <Reveal variant="up">
              <Eyebrow tone="ember">{t.servicesPage.heading}</Eyebrow>
              <h2 className="type-display-sm mt-5 text-navy-900">
                {pick(audienceMeta.adults.label)}
              </h2>
              <p className="type-lead mt-4">{pick(audienceMeta.adults.blurb)}</p>
            </Reveal>
          </div>

          <RevealGroup
            className="mt-10 divide-y divide-cream-300 border-y border-cream-300"
            stagger={0.08}
          >
            {counseling.map((service) => (
              <RevealItem key={service.slug} variant="up">
                <div className="flex flex-col gap-2 py-7 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
                  <div>
                    <h3 className="font-display text-[1.375rem] text-navy-900">
                      {pick(service.name)}
                    </h3>
                    {service.blurb && (
                      <p className="mt-2 text-[0.9375rem] text-ink-500">
                        {pick(service.blurb)}
                      </p>
                    )}
                  </div>
                  <div className="flex items-baseline gap-5">
                    {service.duration && (
                      <span className="text-[0.8125rem] text-ink-400">
                        {pick(service.duration)}
                      </span>
                    )}
                    <span className="font-display text-[1.25rem] text-navy-900">
                      {pick(service.rate)}
                    </span>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal variant="up" delay={0.12}>
            <div className="mt-11 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={href("/contact")} size="lg" arrow>
                {t.common.requestCallback}
              </ButtonLink>
              <a
                href={telHref(site.phone)}
                className="inline-flex h-14 items-center justify-center gap-2.5 rounded-full border border-cream-400 bg-cream-50 px-7 font-semibold text-navy-900 transition-colors hover:border-navy-300"
              >
                <Phone className="size-4 text-ember-500" aria-hidden />
                {site.phone}
              </a>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
