"use client";

import { useLocale } from "@/components/i18n/LocaleProvider";
import {
  VerseSection,
  MissionSection,
  CACSection,
  ValuesSection,
  JenniferSection,
  ClosingCTA,
} from "@/components/home/Sections";
import { Section, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { Img } from "@/components/ui/Img";
import { Parallax } from "@/components/motion/Parallax";
import { ButtonLink } from "@/components/ui/Button";

export function AboutContent() {
  const { t, href } = useLocale();

  return (
    <>
      <MissionSection />
      <VerseSection />
      <CACSection />
      <ValuesSection />
      <JenniferSection />

      {/* ------------------------------------------------ SHAPE */}
      <Section tone="deep" size="lg">
        <div className="container-page">
          <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <Reveal variant="up">
                <Eyebrow tone="ember">{t.whatsHappening.title}</Eyebrow>
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
                <div className="mt-9">
                  <ButtonLink href={href("/whats-happening")} size="lg" arrow>
                    {t.whatsHappening.registerCta}
                  </ButtonLink>
                </div>
              </Reveal>
            </div>
            <div className="lg:col-span-5">
              <Reveal variant="mask" duration={1.1}>
                <Parallax speed={6}>
                  <Img
                    name="service-social-skills"
                    wrapperClassName="grain aspect-[4/5] rounded-[1.5rem]"
                    sizes="(max-width: 1024px) 92vw, 38vw"
                  />
                </Parallax>
              </Reveal>
            </div>
          </div>
        </div>
      </Section>

      <ClosingCTA />
    </>
  );
}
