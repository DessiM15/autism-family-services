import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { ServicesList } from "@/components/services/ServicesList";
import { ClosingCTA } from "@/components/home/Sections";
import { getDictionary } from "@/lib/dictionary";
import { buildMetadata, resolveLocale, type LocaleParams } from "@/lib/page-meta";
import { services } from "@/content/data/services";
import { site } from "@/lib/site";

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  return buildMetadata(params, "/services", (t) => ({
    title: t.servicesPage.title,
    description: t.servicesPage.body,
  }));
}

export default async function ServicesPage({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  const t = getDictionary(locale);

  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: t.servicesPage.title,
    itemListElement: services.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: s.name[locale],
        description: s.blurb?.[locale] ?? s.detail?.[locale],
        provider: { "@type": "Organization", name: site.legalName },
        areaServed: "Southeast Texas",
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
        eyebrow={t.servicesPage.title}
        title={t.servicesPage.heading}
        lead={t.servicesPage.body}
        image="service-aba"
      />
      <ServicesList />
      <ClosingCTA />
    </>
  );
}
