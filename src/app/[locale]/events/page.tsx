import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { EventsContent } from "@/components/pages/EventsContent";
import { getDictionary } from "@/lib/dictionary";
import { buildMetadata, resolveLocale, type LocaleParams } from "@/lib/page-meta";

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  return buildMetadata(params, "/events", (t) => ({
    title: t.events.title,
    description: t.events.body,
  }));
}

export default async function EventsPage({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  const t = getDictionary(locale);

  return (
    <>
      <PageHero
        eyebrow={t.events.title}
        title={t.events.heading}
        lead={t.events.body}
        image="story-community"
      />
      <EventsContent />
    </>
  );
}
