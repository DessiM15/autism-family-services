import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { ContactContent } from "@/components/pages/ContactContent";
import { getDictionary } from "@/lib/dictionary";
import { buildMetadata, resolveLocale, type LocaleParams } from "@/lib/page-meta";

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  return buildMetadata(params, "/contact", (t) => ({
    title: t.contact.title,
    description: t.contact.body,
  }));
}

export default async function ContactPage({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  const t = getDictionary(locale);

  return (
    <>
      <PageHero
        eyebrow={t.contact.title}
        title={t.contact.heading}
        lead={t.contact.body}
        image="cta-01"
        tone="dark"
      />
      <ContactContent />
    </>
  );
}
