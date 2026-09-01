"use client";

import { useLocale } from "@/components/i18n/LocaleProvider";
import { Section, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { StartHereWizard } from "@/components/start/StartHereWizard";

/**
 * The wizard, inline on the homepage directly under the hero. It is the one
 * question every visitor arrives with, so it earns the position — and it
 * works here rather than being a link to somewhere it works.
 */
export function StartHereSection() {
  const { t } = useLocale();

  return (
    <Section tone="cream" size="md" id="start-here">
      <div className="container-page">
        <div className="max-w-2xl">
          <Reveal variant="up">
            <Eyebrow>{t.home.startHereEyebrow}</Eyebrow>
          </Reveal>
          <SplitText
            as="h2"
            text={t.home.startHereHeading}
            className="type-display-md mt-6 text-navy-900"
          />
          <Reveal variant="up" delay={0.12}>
            <p className="type-lead mt-6">{t.home.startHereBody}</p>
          </Reveal>
        </div>
      </div>

      <div className="mt-12">
        <StartHereWizard />
      </div>
    </Section>
  );
}
