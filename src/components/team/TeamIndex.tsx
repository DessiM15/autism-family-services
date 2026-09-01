"use client";

import Image from "next/image";
import { team } from "@/content/data/team";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { Section } from "@/components/ui/Section";

/**
 * A quick roster at the top of the page. Clicking a face jumps straight to
 * that person's full profile below — six long bios is a lot to scroll past
 * when you only came to read about one of them.
 */
export function TeamIndex() {
  const { pick } = useLocale();

  return (
    <Section tone="white" size="sm">
      <div className="container-page">
        <RevealGroup
          className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 lg:grid-cols-6"
          stagger={0.07}
        >
          {team.map((member) => (
            <RevealItem key={member.slug} variant="up">
              <a href={`#${member.slug}`} className="group block text-center">
                <div className="relative mx-auto aspect-square w-full max-w-[9rem] overflow-hidden rounded-full ring-1 ring-cream-300 transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1 group-hover:shadow-[0_18px_40px_-16px_rgba(0,30,100,0.45)]">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 640px) 40vw, 12vw"
                    quality={90}
                    className="object-cover object-top grayscale transition-[filter,transform] duration-700 group-hover:scale-105 group-hover:grayscale-0"
                  />
                </div>
                <p className="font-display mt-4 text-[1.0625rem] leading-tight text-navy-900">
                  {member.name}
                </p>
                <p className="mt-1 line-clamp-2 text-[0.75rem] leading-snug text-ink-500">
                  {pick(member.role).split(" · ")[0].split(",")[0]}
                </p>
              </a>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
}
