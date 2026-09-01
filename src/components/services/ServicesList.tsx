"use client";

import { Clock, Phone, ShieldCheck } from "lucide-react";
import { audienceMeta, servicesFor, type Audience } from "@/content/data/services";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { Section, Eyebrow } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { Img } from "@/components/ui/Img";
import { site } from "@/lib/site";
import { telHref, cn } from "@/lib/utils";

const order: Audience[] = ["families", "schools", "adults"];
const heroImages: Record<Audience, string> = {
  families: "service-aba",
  schools: "service-schools",
  adults: "service-counseling",
};

export function ServicesList() {
  const { t, pick } = useLocale();

  return (
    <>
      {order.map((audience, groupIndex) => {
        const meta = audienceMeta[audience];
        const list = servicesFor(audience);
        const alt = groupIndex % 2 === 1;

        return (
          <Section
            key={audience}
            id={audience}
            tone={alt ? "white" : "cream"}
            size="md"
          >
            <div className="container-page">
              <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
                {/* Group header */}
                <div className="lg:col-span-4">
                  <div className="lg:sticky lg:top-[calc(var(--header-h)+2.5rem)]">
                    <Reveal variant="up">
                      <Eyebrow>{`0${groupIndex + 1}`}</Eyebrow>
                    </Reveal>
                    <SplitText
                      as="h2"
                      text={pick(meta.label)}
                      className="type-display-sm mt-5 text-navy-900"
                    />
                    <Reveal variant="up" delay={0.1}>
                      <p className="mt-5 text-[0.9375rem] leading-relaxed text-ink-500">
                        {pick(meta.blurb)}
                      </p>
                    </Reveal>
                    <Reveal variant="mask" delay={0.16} duration={1.1}>
                      <Img
                        name={heroImages[audience]}
                        wrapperClassName="grain mt-8 aspect-[4/3] rounded-2xl"
                        sizes="(max-width: 1024px) 92vw, 30vw"
                      />
                    </Reveal>
                  </div>
                </div>

                {/* Rate list */}
                <div className="lg:col-span-8">
                  <RevealGroup
                    className="divide-y divide-cream-300 border-y border-cream-300"
                    stagger={0.06}
                  >
                    {list.map((service) => (
                      <RevealItem key={service.slug} variant="up">
                        <div
                          id={service.slug}
                          style={{ scrollMarginTop: "calc(var(--header-h) + 2rem)" }}
                          className="group flex flex-col gap-3 py-7 sm:flex-row sm:items-baseline sm:gap-8"
                        >
                          <div className="flex-1">
                            <h3 className="font-display text-[1.375rem] leading-snug text-navy-900">
                              {pick(service.name)}
                            </h3>
                            {service.blurb && (
                              <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-500">
                                {pick(service.blurb)}
                              </p>
                            )}
                            {service.detail && (
                              <p className="mt-3 max-w-xl border-l-2 border-cyan-200 pl-4 text-[0.875rem] leading-relaxed text-ink-500">
                                {pick(service.detail)}
                              </p>
                            )}
                          </div>

                          <div className="flex shrink-0 items-baseline gap-5 sm:w-56 sm:justify-end">
                            {service.duration && (
                              <span className="inline-flex items-center gap-1.5 text-[0.8125rem] text-ink-400">
                                <Clock className="size-3.5" aria-hidden />
                                {pick(service.duration)}
                              </span>
                            )}
                            <span
                              className={cn(
                                "font-display text-right text-[1.25rem] whitespace-nowrap text-navy-900",
                                pick(service.rate).startsWith("$")
                                  ? ""
                                  : "font-sans text-[0.8125rem] font-semibold text-cyan-600",
                              )}
                            >
                              {pick(service.rate)}
                            </span>
                          </div>
                        </div>
                      </RevealItem>
                    ))}
                  </RevealGroup>

                  <Reveal variant="up" delay={0.1}>
                    <p className="mt-6 text-[0.8125rem] leading-relaxed text-ink-400">
                      {t.servicesPage.rateNote}
                    </p>
                  </Reveal>
                </div>
              </div>
            </div>
          </Section>
        );
      })}

      {/* ---------------------------------------------- Insurance */}
      <Section tone="deep" size="md" id="insurance">
        <div className="container-page">
          <div className="surface-card grid gap-8 p-8 sm:p-12 lg:grid-cols-12 lg:gap-14 lg:p-14">
            <div className="lg:col-span-5">
              <Reveal variant="up">
                <span className="inline-grid size-12 place-items-center rounded-full bg-cyan-100 text-cyan-600">
                  <ShieldCheck className="size-6" aria-hidden />
                </span>
                <h2 className="type-display-sm mt-6 text-navy-900">
                  {t.servicesPage.insuranceHeading}
                </h2>
              </Reveal>
            </div>
            <div className="lg:col-span-7">
              <Reveal variant="up" delay={0.1}>
                <p className="type-lead">{t.servicesPage.insuranceBody}</p>
                <p className="mt-5 rounded-xl border border-dashed border-cream-400 bg-cream-100 p-4 text-[0.875rem] leading-relaxed text-ink-500">
                  {t.servicesPage.insurancePlaceholder}
                </p>
                <a
                  href={telHref(site.phone)}
                  className="mt-7 inline-flex h-13 items-center gap-2.5 rounded-full bg-navy-900 px-7 py-3.5 font-semibold text-cream-50 transition-colors hover:bg-navy-800"
                >
                  <Phone className="size-4" aria-hidden />
                  {site.phone}
                </a>
              </Reveal>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
