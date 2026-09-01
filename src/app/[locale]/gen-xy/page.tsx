import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { GenXYContent } from "@/components/pages/GenXYContent";
import { ClosingCTA } from "@/components/home/Sections";
import { getDictionary } from "@/lib/dictionary";
import { buildMetadata, resolveLocale, type LocaleParams } from "@/lib/page-meta";

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  return buildMetadata(params, "/gen-xy", (t) => ({
    title: t.genXY.title,
    description: t.genXY.body.slice(0, 155),
  }));
}

export default async function GenXYPage({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  const t = getDictionary(locale);

  return (
    <>
      <PageHero
        eyebrow={t.genXY.title}
        title={t.genXY.heading}
        lead={t.genXY.body}
        image="service-counseling"
        tone="dark"
      />
      <GenXYContent />
      <ClosingCTA />
    </>
  );
}
