import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { GrantFinder } from "@/components/grants/GrantFinder";
import { Section } from "@/components/ui/Section";
import { getDictionary } from "@/lib/dictionary";
import { buildMetadata, resolveLocale, type LocaleParams } from "@/lib/page-meta";

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  return buildMetadata(params, "/grants", (t) => ({
    title: t.grantsPage.title,
    description: t.grantsPage.subheading,
  }));
}

export default async function GrantsPage({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  const t = getDictionary(locale);

  return (
    <>
      <PageHero
        eyebrow={t.grantsPage.subheading}
        title={t.grantsPage.heading}
        image="grants-01"
      />
      <Section tone="cream" size="md">
        <GrantFinder />
      </Section>
    </>
  );
}
