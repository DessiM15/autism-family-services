import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { StartHereWizard } from "@/components/start/StartHereWizard";
import { Section } from "@/components/ui/Section";
import { getDictionary } from "@/lib/dictionary";
import { buildMetadata, resolveLocale, type LocaleParams } from "@/lib/page-meta";

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  return buildMetadata(params, "/start-here", (t) => ({
    title: t.startHere.title,
    description: t.startHere.body,
  }));
}

export default async function StartHerePage({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  const t = getDictionary(locale);

  return (
    <>
      <PageHero
        eyebrow={t.startHere.title}
        title={t.startHere.heading}
        lead={t.startHere.body}
        image="cta-02"
      />
      <Section tone="cream" size="md">
        <StartHereWizard />
      </Section>
    </>
  );
}
