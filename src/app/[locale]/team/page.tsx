import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { TeamProfiles } from "@/components/team/TeamProfiles";
import { TeamIndex } from "@/components/team/TeamIndex";
import { ClosingCTA } from "@/components/home/Sections";
import { getDictionary } from "@/lib/dictionary";
import { buildMetadata, resolveLocale, type LocaleParams } from "@/lib/page-meta";
import { team } from "@/content/data/team";
import { site } from "@/lib/site";

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  return buildMetadata(params, "/team", (t) => ({
    title: t.teamPage.title,
    description: t.teamPage.body,
  }));
}

export default async function TeamPage({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  const t = getDictionary(locale);

  /* Each clinician as a Person, so search results can surface them by name. */
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: team.map((m, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Person",
        name: m.name,
        honorificSuffix: m.credentials.join(", "),
        jobTitle: m.role[locale],
        image: `${site.url}${m.image}`,
        worksFor: { "@type": "Organization", name: site.legalName },
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <PageHero
        eyebrow={t.teamPage.title}
        title={t.teamPage.heading}
        lead={t.teamPage.body}
        image="team-bg"
        tone="dark"
      />
      <TeamIndex />
      <TeamProfiles />
      <ClosingCTA />
    </>
  );
}
