"use client";

import { Sparkles } from "lucide-react";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { Section, Eyebrow } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { Parallax } from "@/components/motion/Parallax";
import { Img } from "@/components/ui/Img";
import { ButtonLink } from "@/components/ui/Button";

export function AbaContent() {
  const { t, href, locale } = useLocale();

  return (
    <>
      {/* ------------------------------------------------ Not only autism */}
      <Section tone="cream" size="lg">
        <div className="container-page">
          <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <Reveal variant="up">
                <Eyebrow>{t.abaPage.title}</Eyebrow>
              </Reveal>
              <SplitText
                as="h2"
                text={t.abaPage.heading}
                className="type-display-md mt-6 text-navy-900"
              />
              <Reveal variant="up" delay={0.12}>
                <p className="type-lead mt-7">{t.abaPage.intro}</p>
              </Reveal>
              <Reveal variant="up" delay={0.2}>
                <p className="mt-6 inline-flex items-center gap-2.5 rounded-full bg-cyan-100 px-5 py-2.5 text-[0.875rem] font-semibold text-cyan-600">
                  <Sparkles className="size-4" aria-hidden />
                  {t.abaPage.statAges}
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-6">
              <div className="grid grid-cols-2 gap-4">
                <Reveal variant="mask" duration={1.1}>
                  <Parallax speed={6}>
                    <Img
                      name="aba-01"
                      wrapperClassName="grain aspect-[4/5] rounded-2xl"
                      sizes="(max-width: 1024px) 45vw, 25vw"
                    />
                  </Parallax>
                </Reveal>
                <Reveal variant="mask" delay={0.14} duration={1.1} className="mt-10">
                  <Parallax speed={-5}>
                    <Img
                      name="aba-02"
                      wrapperClassName="grain aspect-[4/5] rounded-2xl"
                      sizes="(max-width: 1024px) 45vw, 25vw"
                    />
                  </Parallax>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ------------------------------------------------ The 27 methods */}
      <section className="relative overflow-hidden bg-navy-950 py-24 text-cream-100 lg:py-36">
        <div
          aria-hidden
          className="decor absolute -top-32 -left-32 size-[32rem] rounded-full opacity-30 blur-3xl"
          style={{
            background: "radial-gradient(circle, rgba(3,187,248,0.5) 0%, transparent 70%)",
          }}
        />
        <div className="container-page relative">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Reveal variant="up">
                <Eyebrow tone="light">{t.abaPage.howHeading}</Eyebrow>
              </Reveal>
              <Reveal variant="up" delay={0.08}>
                <p className="font-display mt-6 flex items-baseline gap-4 leading-none">
                  <span className="text-[clamp(5rem,12vw,9rem)] text-cyan-400">27</span>
                </p>
                <p className="mt-4 max-w-xs text-[1.0625rem] leading-snug text-cream-100/70">
                  {t.abaPage.statMethods}
                </p>
              </Reveal>
              <Reveal variant="up" delay={0.16}>
                <p className="mt-8 text-[0.9375rem] leading-relaxed text-cream-100/60">
                  {t.abaPage.howIntro}
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-7">
              <RevealGroup
                className="divide-y divide-cream-100/12 border-y border-cream-100/12"
                stagger={0.1}
              >
                {t.abaPage.methods.map((method, i) => (
                  <RevealItem key={method.name} variant="up">
                    <div className="flex gap-6 py-7">
                      <span className="font-display shrink-0 text-[0.875rem] text-cyan-300 tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="font-display text-[1.375rem] text-cream-50">
                          {method.name}
                        </h3>
                        <p className="mt-2 text-[0.9375rem] leading-relaxed text-cream-100/65">
                          {method.desc}
                        </p>
                      </div>
                    </div>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ Critics + our answer */}
      <Section tone="white" size="lg">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
            <Reveal variant="up">
              <div className="h-full rounded-[1.25rem] border border-cream-300 bg-cream-100 p-8 lg:p-10">
                <p className="type-eyebrow text-ink-400">
                  {locale === "es" ? "La crítica" : "The critique"}
                </p>
                <p className="mt-5 text-[1.0625rem] leading-relaxed text-ink-700">
                  {t.abaPage.critics}
                </p>
              </div>
            </Reveal>

            <Reveal variant="up" delay={0.12}>
              <div className="h-full rounded-[1.25rem] border border-cyan-500/30 bg-cyan-100/40 p-8 lg:p-10">
                <p className="type-eyebrow text-cyan-600">
                  {locale === "es" ? "Nuestro enfoque" : "Our approach"}
                </p>
                <p className="mt-5 text-[1.0625rem] leading-relaxed text-navy-800">
                  {t.abaPage.approach}
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal variant="up" delay={0.18}>
            <div className="mt-12 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <ButtonLink href={href("/services")} size="lg" arrow>
                {t.home.servicesCta}
              </ButtonLink>
              <ButtonLink href={href("/start-here")} variant="secondary" size="lg">
                {t.home.heroCtaPrimary}
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
