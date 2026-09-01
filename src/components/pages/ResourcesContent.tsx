"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { Section } from "@/components/ui/Section";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { Img } from "@/components/ui/Img";
import { ClosingCTA } from "@/components/home/Sections";

export function ResourcesContent() {
  const { t, href } = useLocale();

  const cards = [
    {
      href: "/grants",
      title: t.grantsPage.title,
      blurb: t.resources.grantsBlurb,
      image: "grants-01",
      wide: true,
    },
    {
      href: "/first-visit",
      title: t.firstVisit.title,
      blurb: t.resources.firstVisitBlurb,
      image: "visit-02",
      wide: true,
    },
    {
      href: "/aba",
      title: t.abaPage.title,
      blurb: t.resources.abaBlurb,
      image: "service-aba",
    },
    {
      href: "/whats-happening",
      title: t.whatsHappening.title,
      blurb: t.resources.happeningBlurb,
      image: "service-social-skills",
    },
    {
      href: "/events",
      title: t.events.title,
      blurb: t.resources.eventsBlurb,
      image: "story-community",
    },
    {
      href: "/team",
      title: t.teamPage.title,
      blurb: t.resources.teamBlurb,
      image: "team-bg",
    },
  ];

  return (
    <>
      <Section tone="cream" size="md">
        <div className="container-page">
          <RevealGroup className="grid gap-6 md:grid-cols-2" stagger={0.08}>
            {cards.map((card) => (
              <RevealItem
                key={card.href}
                variant="up"
                className={card.wide ? "md:col-span-1" : ""}
              >
                <Link
                  href={href(card.href)}
                  className="group surface-card flex h-full flex-col overflow-hidden transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:shadow-[0_28px_60px_-24px_rgba(0,30,100,0.35)]"
                >
                  <div className="grain relative aspect-[16/9] overflow-hidden">
                    <Img
                      name={card.image}
                      alt=""
                      wrapperClassName="absolute inset-0"
                      className="transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                      sizes="(max-width: 768px) 92vw, 46vw"
                    />
                  </div>

                  <div className="flex flex-1 flex-col p-7 lg:p-8">
                    <div className="flex items-start justify-between gap-4">
                      <h2 className="font-display text-[1.5rem] leading-snug text-navy-900">
                        {card.title}
                      </h2>
                      <ArrowUpRight
                        className="mt-1 size-5 shrink-0 text-ink-400 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-cyan-600"
                        aria-hidden
                      />
                    </div>
                    <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-ink-500">
                      {card.blurb}
                    </p>
                    <span className="mt-6 border-t border-cream-300 pt-5 text-[0.875rem] font-semibold text-navy-900 transition-colors group-hover:text-cyan-600">
                      {t.resources.open} →
                    </span>
                  </div>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      <ClosingCTA />
    </>
  );
}
