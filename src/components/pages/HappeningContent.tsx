"use client";

import Image from "next/image";
import { CalendarDays, Phone, Users } from "lucide-react";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { Section, Eyebrow } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { Img } from "@/components/ui/Img";
import { Parallax } from "@/components/motion/Parallax";
import { ButtonLink } from "@/components/ui/Button";
import { site } from "@/lib/site";
import { telHref } from "@/lib/utils";

export function HappeningContent() {
  const { t, href } = useLocale();

  const programmes = [
    {
      title: t.whatsHappening.shapeHeading,
      body: t.whatsHappening.shapeBody,
      image: "service-social-skills",
    },
    {
      title: t.whatsHappening.adhdHeading,
      body: t.whatsHappening.adhdBody,
      image: "service-parent-training",
    },
    {
      title: t.whatsHappening.socialHeading,
      body: t.whatsHappening.socialBody,
      image: "aba-01",
    },
  ];

  return (
    <>
      {/* ------------------------------------------------ SHAPE flyer */}
      <Section tone="cream" size="lg">
        <div className="container-page">
          <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <Reveal variant="up">
                <Eyebrow>{t.whatsHappening.title}</Eyebrow>
              </Reveal>
              <SplitText
                as="h2"
                text={t.whatsHappening.shapeHeading}
                className="type-display-md mt-6 text-navy-900"
              />
              <Reveal variant="up" delay={0.12}>
                <p className="type-lead mt-7">{t.whatsHappening.shapeBody}</p>
              </Reveal>
              <Reveal variant="up" delay={0.2}>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={telHref(site.phone)}
                    className="inline-flex h-14 items-center justify-center gap-2.5 rounded-full bg-navy-900 px-7 font-semibold text-cream-50 transition-colors hover:bg-navy-800"
                  >
                    <Phone className="size-4" aria-hidden />
                    {t.whatsHappening.registerCta}
                  </a>
                  <ButtonLink href={href("/events")} variant="secondary" size="lg" arrow>
                    {t.events.title}
                  </ButtonLink>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-6">
              <Reveal variant="mask" duration={1.2}>
                <Parallax speed={5}>
                  <div className="grain relative overflow-hidden rounded-[1.5rem] border border-cream-300 bg-cream-50 p-3">
                    <Image
                      src="/brand/shape.png"
                      alt={t.whatsHappening.shapeHeading}
                      width={1000}
                      height={1536}
                      className="h-auto w-full rounded-xl"
                    />
                  </div>
                </Parallax>
              </Reveal>
            </div>
          </div>
        </div>
      </Section>

      {/* ------------------------------------------------ Programmes */}
      <Section tone="white" size="md">
        <div className="container-page">
          <div className="max-w-2xl">
            <Reveal variant="up">
              <Eyebrow>{t.whatsHappening.body}</Eyebrow>
              <h2 className="type-display-sm mt-5 text-navy-900">
                {t.whatsHappening.heading}
              </h2>
            </Reveal>
          </div>

          <RevealGroup className="mt-12 grid gap-6 md:grid-cols-3" stagger={0.1}>
            {programmes.map((item) => (
              <RevealItem key={item.title} variant="up" className="h-full">
                <article className="surface-card flex h-full flex-col overflow-hidden">
                  <div className="grain relative aspect-[16/10]">
                    <Img
                      name={item.image}
                      alt=""
                      wrapperClassName="absolute inset-0"
                      sizes="(max-width: 768px) 92vw, 30vw"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-7">
                    <h3 className="font-display text-[1.375rem] leading-snug text-navy-900">
                      {item.title}
                    </h3>
                    <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-ink-500">
                      {item.body}
                    </p>
                  </div>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* ------------------------------------------------ CTA */}
      <Section tone="deep" size="md">
        <div className="container-page">
          <div className="flex flex-col items-start justify-between gap-8 rounded-[1.5rem] bg-navy-950 p-9 text-cream-100 lg:flex-row lg:items-center lg:p-12">
            <div className="flex items-start gap-5">
              <span className="grid size-12 shrink-0 place-items-center rounded-full bg-cyan-500/15 text-cyan-300">
                <Users className="size-5" aria-hidden />
              </span>
              <div>
                <p className="font-display text-[1.5rem] leading-snug text-cream-50">
                  {t.whatsHappening.registerCta}
                </p>
                <p className="mt-2 text-[0.9375rem] text-cream-100/65">
                  {t.events.body}
                </p>
              </div>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <a
                href={telHref(site.phone)}
                className="inline-flex h-14 items-center justify-center gap-2.5 rounded-full bg-cream-50 px-7 font-semibold text-navy-900 transition-transform hover:-translate-y-0.5"
              >
                <Phone className="size-4 text-cyan-600" aria-hidden />
                {site.phone}
              </a>
              <ButtonLink
                href={href("/events")}
                variant="ghost"
                size="lg"
                className="text-cream-100 hover:bg-cream-100/10"
              >
                <CalendarDays className="size-4" aria-hidden />
                {t.events.title}
              </ButtonLink>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
