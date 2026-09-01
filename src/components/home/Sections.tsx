"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Check, Quote } from "lucide-react";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { Section, Eyebrow } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { Parallax, ParallaxLayer } from "@/components/motion/Parallax";
import { Img } from "@/components/ui/Img";
import { ButtonLink } from "@/components/ui/Button";
import { audienceMeta, servicesFor, type Audience } from "@/content/data/services";
import { cn } from "@/lib/utils";

/* ================================================================== */
/*  The verse. A single quiet full-bleed moment.                       */
/* ================================================================== */
export function VerseSection() {
  const { t } = useLocale();

  return (
    <section className="relative isolate overflow-hidden bg-navy-950 py-28 text-cream-100 lg:py-40">
      <ParallaxLayer speed={12} className="absolute inset-0 -z-10">
        <div className="relative h-full w-full">
          <Img
            name="story-hope"
            alt=""
            wrapperClassName="absolute inset-0"
            className="opacity-40"
            sizes="100vw"
          />
        </div>
      </ParallaxLayer>
      <div className="scrim-full absolute inset-0 -z-10" />

      <div className="container-prose relative text-center">
        <Reveal variant="fade" duration={1.2}>
          <p className="type-eyebrow text-cyan-300">{t.home.verseRef}</p>
        </Reveal>
        <SplitText
          as="p"
          text={t.home.verse}
          className="font-display mt-8 text-[clamp(1.5rem,3.6vw,2.75rem)] leading-[1.25] text-cream-50"
          stagger={0.045}
        />
      </div>
    </section>
  );
}

/* ================================================================== */
/*  Mission                                                            */
/* ================================================================== */
export function MissionSection() {
  const { t } = useLocale();

  return (
    <Section tone="cream" size="lg" id="mission">
      <div className="container-page">
        <div className="grid items-start gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal variant="up">
              <Eyebrow>{t.home.missionEyebrow}</Eyebrow>
            </Reveal>
            <SplitText
              as="h2"
              text={t.home.missionHeading}
              className="type-display-md mt-6 text-navy-900"
            />
            <div className="mt-8 space-y-6">
              <Reveal variant="up" delay={0.1}>
                <p className="type-lead">{t.home.missionP1}</p>
              </Reveal>
              <Reveal variant="up" delay={0.18}>
                <p className="type-lead">{t.home.missionP2}</p>
              </Reveal>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-12 gap-4 sm:gap-5">
              <Reveal variant="mask" className="col-span-7" duration={1.1}>
                <Parallax speed={5}>
                  <Img
                    name="story-mission"
                    wrapperClassName="grain aspect-[4/5] rounded-2xl"
                    sizes="(max-width: 1024px) 55vw, 32vw"
                  />
                </Parallax>
              </Reveal>
              <Reveal variant="mask" delay={0.14} className="col-span-5 self-end" duration={1.1}>
                <Parallax speed={-6}>
                  <Img
                    name="story-connection"
                    wrapperClassName="grain aspect-square rounded-2xl"
                    sizes="(max-width: 1024px) 40vw, 24vw"
                  />
                </Parallax>
              </Reveal>
              <Reveal variant="mask" delay={0.22} className="col-span-12" duration={1.1}>
                <Img
                  name="story-values"
                  wrapperClassName="grain aspect-[16/8] rounded-2xl"
                  sizes="(max-width: 1024px) 92vw, 56vw"
                />
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ================================================================== */
/*  Certified Autism Center                                            */
/* ================================================================== */
export function CACSection() {
  const { t } = useLocale();

  return (
    <Section tone="white" size="md" id="certified-autism-center">
      <div className="container-page">
        <div className="surface-card grain relative overflow-hidden">
          <div className="grid gap-10 p-8 sm:p-12 lg:grid-cols-12 lg:gap-14 lg:p-16">
            <div className="lg:col-span-4">
              <Reveal variant="scale">
                <Image
                  src="/brand/cac-badge.png"
                  alt="Certified Autism Center badge"
                  width={1200}
                  height={1200}
                  className="w-40 lg:w-52"
                />
              </Reveal>
              <Reveal variant="up" delay={0.12}>
                <p className="font-display mt-7 text-[clamp(1.5rem,2.4vw,2.125rem)] leading-tight text-navy-900">
                  {t.home.cacHeading}
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-8">
              <Reveal variant="up" delay={0.08}>
                <Eyebrow>{t.home.cacEyebrow}</Eyebrow>
                <h2 className="type-display-sm mt-5 text-navy-900">
                  {t.home.cacQuestion}
                </h2>
                <p className="type-lead mt-6">{t.home.cacBody}</p>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ================================================================== */
/*  Jennifer                                                           */
/* ================================================================== */
export function JenniferSection() {
  const { t, href } = useLocale();

  return (
    <section className="relative overflow-hidden bg-navy-950 py-24 text-cream-100 lg:py-36">
      <div
        aria-hidden
        className="decor absolute -top-40 -right-40 size-[36rem] rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(3,187,248,0.55) 0%, transparent 68%)",
        }}
      />

      <div className="container-page relative">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <Reveal variant="mask" duration={1.2}>
              <Parallax speed={6}>
                <div className="grain relative aspect-[4/5] overflow-hidden rounded-[1.5rem] ring-1 ring-cream-100/10">
                  <Image
                    src="/images/team/jennifer.jpg"
                    alt="Jennifer Ramirez, Clinic Director"
                    fill
                    sizes="(max-width: 1024px) 90vw, 38vw"
                    className="object-cover object-top"
                  />
                </div>
              </Parallax>
            </Reveal>

            <Reveal variant="up" delay={0.2}>
              <div className="mt-6 flex items-center gap-4 rounded-2xl border border-cream-100/12 bg-cream-100/5 p-4">
                <Image
                  src="/brand/acas-badge.png"
                  alt=""
                  width={420}
                  height={574}
                  className="h-16 w-auto"
                />
                <p className="text-[0.8125rem] leading-relaxed text-cream-100/70">
                  {t.home.creds.acas}
                </p>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal variant="up">
              <Eyebrow tone="light">{t.home.jenEyebrow}</Eyebrow>
            </Reveal>
            <SplitText
              as="h2"
              text={t.home.jenHeading}
              className="type-display-md mt-6 text-cream-50"
            />
            <Reveal variant="up" delay={0.14}>
              <p className="mt-7 text-[1.0625rem] leading-relaxed text-cream-100/70">
                {t.home.jenBody}
              </p>
            </Reveal>

            <RevealGroup className="mt-9 flex flex-wrap gap-2.5" delay={0.2}>
              {["M.Ed.", "LPC", "LBA", "ACAS", "QBA"].map((c) => (
                <RevealItem
                  key={c}
                  variant="scale"
                  as="span"
                  className="rounded-full border border-cyan-300/30 bg-cyan-500/10 px-4 py-2 text-[0.8125rem] font-semibold tracking-wide text-cyan-200"
                >
                  {c}
                </RevealItem>
              ))}
            </RevealGroup>

            <Reveal variant="up" delay={0.3}>
              <div className="mt-10">
                <ButtonLink href={href("/team#jennifer-ramirez")} variant="onDark" size="lg" arrow>
                  {t.home.jenCta}
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  Services — three doors                                             */
/* ================================================================== */
const doors: { audience: Audience; image: string }[] = [
  { audience: "families", image: "service-aba" },
  { audience: "schools", image: "service-schools" },
  { audience: "adults", image: "service-counseling" },
];

export function ServicesSection() {
  const { t, href, pick } = useLocale();

  return (
    <Section tone="cream" size="lg" id="services">
      <div className="container-page">
        <div className="max-w-3xl">
          <Reveal variant="up">
            <Eyebrow>{t.home.servicesEyebrow}</Eyebrow>
          </Reveal>
          <SplitText
            as="h2"
            text={t.home.servicesHeading}
            className="type-display-md mt-6 text-navy-900"
          />
          <Reveal variant="up" delay={0.12}>
            <p className="type-lead mt-6">{t.home.servicesBody}</p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {doors.map((door, i) => {
            const meta = audienceMeta[door.audience];
            const list = servicesFor(door.audience);

            return (
              <Reveal key={door.audience} variant="up" delay={i * 0.1} className="h-full">
                <Link
                  href={href(`/services#${door.audience}`)}
                  className="group surface-card relative flex h-full flex-col overflow-hidden transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:shadow-[0_28px_60px_-24px_rgba(0,30,100,0.35)]"
                >
                  <div className="grain relative aspect-[16/10] overflow-hidden">
                    <Img
                      name={door.image}
                      alt=""
                      wrapperClassName="absolute inset-0"
                      className="transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.07]"
                      sizes="(max-width: 768px) 92vw, 30vw"
                    />
                  </div>

                  <div className="flex flex-1 flex-col p-7">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-display text-2xl text-navy-900">
                        {pick(meta.label)}
                      </h3>
                      <ArrowUpRight
                        className="size-5 shrink-0 text-ink-400 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-cyan-600"
                        aria-hidden
                      />
                    </div>
                    <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-500">
                      {pick(meta.blurb)}
                    </p>

                    <ul className="mt-6 space-y-2 border-t border-cream-300 pt-5">
                      {list.slice(0, 4).map((s) => (
                        <li
                          key={s.slug}
                          className="flex items-start gap-2.5 text-[0.875rem] text-ink-700"
                        >
                          <Check
                            className="mt-0.5 size-3.5 shrink-0 text-cyan-500"
                            aria-hidden
                          />
                          {pick(s.name)}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>

        <Reveal variant="up" delay={0.15}>
          <div className="mt-12 flex justify-center">
            <ButtonLink href={href("/services")} variant="secondary" size="lg" arrow>
              {t.home.servicesCta}
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/* ================================================================== */
/*  ABA approach — split with a big pinned number                      */
/* ================================================================== */
export function AbaSection() {
  const { t, href } = useLocale();

  return (
    <Section tone="deep" size="lg">
      <div className="container-page">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div className="order-2 lg:order-1">
            <Reveal variant="mask" duration={1.2}>
              <Parallax speed={7}>
                <Img
                  name="aba-01"
                  wrapperClassName="grain aspect-[4/5] rounded-[1.5rem]"
                  sizes="(max-width: 1024px) 92vw, 46vw"
                />
              </Parallax>
            </Reveal>
          </div>

          <div className="order-1 lg:order-2">
            <Reveal variant="up">
              <Eyebrow>{t.home.abaEyebrow}</Eyebrow>
            </Reveal>
            <SplitText
              as="h2"
              text={t.home.abaHeading}
              className="type-display-md mt-6 text-navy-900"
            />
            <Reveal variant="up" delay={0.12}>
              <p className="type-lead mt-7">{t.home.abaBody}</p>
            </Reveal>

            <Reveal variant="up" delay={0.2}>
              <div className="mt-10 flex items-end gap-5 border-t border-cream-400 pt-8">
                <span className="font-display text-[clamp(3.5rem,8vw,6rem)] leading-[0.85] brand-gradient">
                  27
                </span>
                <p className="max-w-[16rem] pb-2 text-[0.9375rem] leading-snug text-ink-500">
                  {t.abaPage.statMethods}
                </p>
              </div>
            </Reveal>

            <Reveal variant="up" delay={0.28}>
              <div className="mt-9">
                <ButtonLink href={href("/aba")} size="lg" arrow>
                  {t.home.abaCta}
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ================================================================== */
/*  Values                                                             */
/* ================================================================== */
export function ValuesSection() {
  const { t } = useLocale();

  return (
    <Section tone="white" size="lg">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal variant="up">
              <Eyebrow tone="ember">{t.home.valuesEyebrow}</Eyebrow>
            </Reveal>
            <SplitText
              as="h2"
              text={t.home.valuesHeading}
              className="type-display-md mt-6 text-navy-900"
            />
            <Reveal variant="mask" delay={0.15} duration={1.1}>
              <Img
                name="story-community"
                wrapperClassName="grain mt-10 aspect-[4/3] rounded-2xl"
                sizes="(max-width: 1024px) 92vw, 38vw"
              />
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <RevealGroup className="divide-y divide-cream-300 border-y border-cream-300" stagger={0.07}>
              {t.home.values.map((value, i) => (
                <RevealItem key={value} variant="up">
                  <div className="group flex items-baseline gap-5 py-5">
                    <span className="font-display w-9 shrink-0 text-[0.875rem] text-cyan-600 tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p
                      className={cn(
                        "text-[1.0625rem] leading-snug text-ink-700 transition-colors duration-300 group-hover:text-navy-900",
                        i === t.home.values.length - 1 &&
                          "font-display text-2xl text-navy-900",
                      )}
                    >
                      {value}
                    </p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ================================================================== */
/*  First visit teaser                                                 */
/* ================================================================== */
export function FirstVisitSection() {
  const { t, href } = useLocale();

  return (
    <section className="relative isolate overflow-hidden bg-navy-950 py-24 text-cream-100 lg:py-36">
      <ParallaxLayer speed={10} className="absolute inset-0 -z-10">
        <div className="relative h-full w-full">
          <Img
            name="visit-05"
            alt=""
            wrapperClassName="absolute inset-0"
            className="opacity-35"
            sizes="100vw"
          />
        </div>
      </ParallaxLayer>
      <div className="scrim-full absolute inset-0 -z-10" />

      <div className="container-page relative">
        <div className="max-w-2xl">
          <Reveal variant="up">
            <Eyebrow tone="light">{t.home.visitEyebrow}</Eyebrow>
          </Reveal>
          <SplitText
            as="h2"
            text={t.home.visitHeading}
            className="type-display-md mt-6 text-cream-50"
          />
          <Reveal variant="up" delay={0.14}>
            <p className="mt-7 text-[1.0625rem] leading-relaxed text-cream-100/75">
              {t.home.visitBody}
            </p>
          </Reveal>
          <Reveal variant="up" delay={0.24}>
            <div className="mt-10">
              <ButtonLink href={href("/first-visit")} variant="onDark" size="lg" arrow>
                {t.home.visitCta}
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  Testimonials                                                       */
/* ================================================================== */
export function TestimonialsSection() {
  const { t } = useLocale();

  return (
    <Section tone="cream" size="lg">
      <div className="container-page">
        <div className="max-w-2xl">
          <Reveal variant="up">
            <Eyebrow>{t.home.testimonialsEyebrow}</Eyebrow>
          </Reveal>
          <SplitText
            as="h2"
            text={t.home.testimonialsHeading}
            className="type-display-md mt-6 text-navy-900"
          />
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {t.testimonials.map((item, i) => (
            <Reveal key={item.author + i} variant="up" delay={i * 0.1} className="h-full">
              <figure className="surface-card flex h-full flex-col p-8">
                <Quote className="size-7 text-cyan-500" aria-hidden />
                <blockquote className="mt-6 flex-1 text-[1.0625rem] leading-relaxed text-ink-700">
                  {item.quote}
                </blockquote>
                <figcaption className="mt-7 border-t border-cream-300 pt-5">
                  <span className="font-display block text-lg text-navy-900">
                    {item.author}
                  </span>
                  <span className="text-[0.8125rem] text-ink-500">{item.role}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ================================================================== */
/*  Closing CTA                                                        */
/* ================================================================== */
export function ClosingCTA() {
  const { t, href } = useLocale();

  return (
    <Section tone="white" size="lg">
      <div className="container-page">
        <div className="grain relative overflow-hidden rounded-[1.75rem]">
          <Img
            name="cta-01"
            alt=""
            wrapperClassName="absolute inset-0"
            className="scale-105"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-navy-950/78" />

          <div className="relative px-8 py-20 text-center sm:px-12 lg:px-16 lg:py-28">
            <SplitText
              as="h2"
              text={t.home.ctaHeading}
              className="type-display-md mx-auto max-w-3xl text-cream-50"
            />
            <Reveal variant="up" delay={0.14}>
              <p className="mx-auto mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-cream-100/75">
                {t.home.ctaBody}
              </p>
            </Reveal>
            <Reveal variant="up" delay={0.22}>
              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <ButtonLink href={href("/contact")} variant="onDark" size="lg" arrow>
                  {t.common.requestCallback}
                </ButtonLink>
                <ButtonLink href={href("/start-here")} variant="ghost" size="lg" className="text-cream-100 hover:bg-cream-100/10">
                  {t.home.heroCtaPrimary}
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </Section>
  );
}
