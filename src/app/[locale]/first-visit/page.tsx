import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { FirstVisitContent } from "@/components/pages/FirstVisitContent";
import { getDictionary } from "@/lib/dictionary";
import { buildMetadata, resolveLocale, type LocaleParams } from "@/lib/page-meta";

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  return buildMetadata(params, "/first-visit", (t) => ({
    title: t.firstVisit.title,
    description: t.firstVisit.body.slice(0, 155),
  }));
}

export default async function FirstVisitPage({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  const t = getDictionary(locale);

  return (
    <>
      <PageHero
        eyebrow={t.firstVisit.title}
        title={t.firstVisit.heading}
        lead={t.firstVisit.body}
        image="visit-02"
        tone="dark"
      />
      <FirstVisitContent />
    </>
  );
}
