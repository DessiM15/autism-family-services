import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { AbaContent } from "@/components/pages/AbaContent";
import { getDictionary } from "@/lib/dictionary";
import { buildMetadata, resolveLocale, type LocaleParams } from "@/lib/page-meta";

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  return buildMetadata(params, "/aba", (t) => ({
    title: t.abaPage.title,
    description: t.abaPage.intro.slice(0, 155),
  }));
}

export default async function AbaPage({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  const t = getDictionary(locale);

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: t.abaPage.heading,
        acceptedAnswer: { "@type": "Answer", text: t.abaPage.intro },
      },
      {
        "@type": "Question",
        name: t.abaPage.howHeading,
        acceptedAnswer: { "@type": "Answer", text: t.abaPage.approach },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
      />
      <PageHero
        eyebrow={t.home.abaEyebrow}
        title={t.abaPage.heading}
        lead={t.home.abaHeading}
        image="service-aba"
        tone="dark"
      />
      <AbaContent />
    </>
  );
}
