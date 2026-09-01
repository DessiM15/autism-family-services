"use client";

import { Ban, BadgeCheck, Clock3, GraduationCap } from "lucide-react";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { Section, Eyebrow } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { Img } from "@/components/ui/Img";
import { Parallax } from "@/components/motion/Parallax";
import { CallbackForm } from "@/components/contact/CallbackForm";

export function CareersContent() {
  const { t } = useLocale();

  return (
    <>
      {/* ------------------------------------------------ Open roles */}
      <Section tone="cream" size="lg">
        <div className="container-page">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <Reveal variant="up">
                <Eyebrow>{t.careers.title}</Eyebrow>
              </Reveal>
              <SplitText
                as="h2"
                text={t.careers.heading}
                className="type-display-md mt-6 text-navy-900"
              />

              <RevealGroup
                className="mt-10 divide-y divide-cream-300 border-y border-cream-300"
                stagger={0.09}
              >
                {t.careers.positions.map((role, i) => (
                  <RevealItem key={role} variant="up">
                    <div className="flex items-baseline gap-6 py-6">
                      <span className="font-display text-[0.875rem] text-cyan-600 tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="font-display text-[1.5rem] leading-snug text-navy-900">
                        {role}
                      </h3>
                    </div>
                  </RevealItem>
                ))}
              </RevealGroup>

              <Reveal variant="up" delay={0.14}>
                <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-cream-300 px-4 py-2 text-[0.8125rem] font-semibold text-ink-700">
                  {t.careers.terms}
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-5">
              <Reveal variant="mask" duration={1.2}>
                <Parallax speed={6}>
                  <Img
                    name="careers-01"
                    wrapperClassName="grain aspect-[4/5] rounded-[1.5rem]"
                    sizes="(max-width: 1024px) 92vw, 38vw"
                  />
                </Parallax>
              </Reveal>
            </div>
          </div>
        </div>
      </Section>

      {/* ------------------------------------------------ Details */}
      <Section tone="white" size="md">
        <div className="container-page">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card
              icon={<BadgeCheck className="size-5" aria-hidden />}
              title={t.careers.requirementsHeading}
              body={t.careers.requirements}
            />
            <Card
              icon={<Clock3 className="size-5" aria-hidden />}
              title={t.careers.payHeading}
              body={t.careers.pay}
            />
            <Card
              icon={<GraduationCap className="size-5" aria-hidden />}
              title={t.careers.internship}
              body={t.careers.terms}
            />
            <Card
              icon={<Ban className="size-5" aria-hidden />}
              title={t.careers.policy}
              body={t.careers.applyBody}
            />
          </div>
        </div>
      </Section>

      {/* ------------------------------------------------ Apply */}
      <Section tone="deep" size="md" id="apply">
        <div className="container-page">
          <div className="mx-auto max-w-3xl">
            <Reveal variant="up">
              <Eyebrow>{t.careers.applyHeading}</Eyebrow>
              <h2 className="type-display-sm mt-5 text-navy-900">
                {t.careers.applyBody}
              </h2>
            </Reveal>
            <Reveal variant="up" delay={0.1}>
              <div className="mt-9">
                <CallbackForm defaultReason="careers" />
              </div>
            </Reveal>
          </div>
        </div>
      </Section>
    </>
  );
}

function Card({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <Reveal variant="up" className="h-full">
      <div className="surface-card flex h-full flex-col p-7">
        <span className="grid size-11 place-items-center rounded-full bg-cyan-100 text-cyan-600">
          {icon}
        </span>
        <h3 className="font-display mt-5 text-[1.125rem] leading-snug text-navy-900">
          {title}
        </h3>
        <p className="mt-3 text-[0.875rem] leading-relaxed text-ink-500">{body}</p>
      </div>
    </Reveal>
  );
}
