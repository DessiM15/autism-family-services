import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { AboutContent } from "@/components/pages/AboutContent";
import { getDictionary } from "@/lib/dictionary";
import { buildMetadata, resolveLocale, type LocaleParams } from "@/lib/page-meta";

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  return buildMetadata(params, "/about", (t) => ({
    title: t.about.title,
    description: t.home.missionP1.slice(0, 155),
  }));
}

export default async function AboutPage({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  const t = getDictionary(locale);

  return (
    <>
      <PageHero
        eyebrow={t.about.title}
        title={t.about.heading}
        lead={t.home.missionHeading}
        image="story-community"
      />
      <AboutContent />
    </>
  );
}
