import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { CareersContent } from "@/components/pages/CareersContent";
import { getDictionary } from "@/lib/dictionary";
import { buildMetadata, resolveLocale, type LocaleParams } from "@/lib/page-meta";

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  return buildMetadata(params, "/careers", (t) => ({
    title: t.careers.title,
    description: t.careers.heading,
  }));
}

export default async function CareersPage({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  const t = getDictionary(locale);

  return (
    <>
      <PageHero
        eyebrow={t.careers.title}
        title={t.careers.heading}
        lead={t.careers.applyBody}
        image="careers-01"
      />
      <CareersContent />
    </>
  );
}
