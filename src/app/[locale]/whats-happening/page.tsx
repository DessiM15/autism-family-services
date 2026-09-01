import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { HappeningContent } from "@/components/pages/HappeningContent";
import { getDictionary } from "@/lib/dictionary";
import { buildMetadata, resolveLocale, type LocaleParams } from "@/lib/page-meta";

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  return buildMetadata(params, "/whats-happening", (t) => ({
    title: t.whatsHappening.title,
    description: t.whatsHappening.heading,
  }));
}

export default async function WhatsHappeningPage({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  const t = getDictionary(locale);

  return (
    <>
      <PageHero
        eyebrow={t.whatsHappening.title}
        title={t.whatsHappening.heading}
        lead={t.whatsHappening.body}
        image="service-social-skills"
      />
      <HappeningContent />
    </>
  );
}
