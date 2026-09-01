import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { ResourcesContent } from "@/components/pages/ResourcesContent";
import { getDictionary } from "@/lib/dictionary";
import { buildMetadata, resolveLocale, type LocaleParams } from "@/lib/page-meta";

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  return buildMetadata(params, "/resources", (t) => ({
    title: t.resources.title,
    description: t.resources.body,
  }));
}

export default async function ResourcesPage({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  const t = getDictionary(locale);

  return (
    <>
      <PageHero
        eyebrow={t.resources.title}
        title={t.resources.heading}
        lead={t.resources.body}
        image="story-mission"
      />
      <ResourcesContent />
    </>
  );
}
