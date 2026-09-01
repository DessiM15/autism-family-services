"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { team, type TeamMember } from "@/content/data/team";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { useMotionAllowed } from "@/components/calm/CalmModeProvider";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { SplitText, LineReveal } from "@/components/motion/SplitText";
import { cn } from "@/lib/utils";

export function TeamProfiles() {
  return (
    <div>
      {team.map((member, index) => (
        <Profile key={member.slug} member={member} index={index} total={team.length} />
      ))}
    </div>
  );
}

function Profile({
  member,
  index,
  total,
}: {
  member: TeamMember;
  index: number;
  total: number;
}) {
  const animate = useMotionAllowed();
  const flipped = index % 2 === 1;
  const dark = index % 2 === 0;

  return (
    <section
      id={member.slug}
      style={{ scrollMarginTop: "var(--header-h)" }}
      className={cn(
        "relative overflow-hidden py-20 lg:py-28",
        dark ? "bg-navy-950 text-cream-100" : "bg-cream-100 text-ink-900",
      )}
    >
      <div className="container-page">
        <div
          className={cn(
            "grid items-center gap-12 lg:grid-cols-12 lg:gap-16",
            flipped && "lg:[&>*:first-child]:order-2",
          )}
        >
          {/* ------------------------------------------------ Portrait */}
          <div className="lg:col-span-5">
            {animate ? (
              <SaturatingPortrait member={member} />
            ) : (
              <div className="grain relative aspect-[4/5] overflow-hidden rounded-[1.5rem]">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(max-width: 1024px) 90vw, 38vw"
                  quality={90}
                  className="object-cover object-top"
                />
              </div>
            )}
          </div>

          {/* ------------------------------------------------ Copy */}
          <div className="lg:col-span-7">
            <Reveal variant="up">
              <p
                className={cn(
                  "type-eyebrow tabular-nums",
                  dark ? "text-cyan-300" : "text-cyan-600",
                )}
              >
                {String(index + 1).padStart(2, "0")}
                <span className="mx-2 opacity-40">/</span>
                {String(total).padStart(2, "0")}
              </p>
            </Reveal>

            <SplitText
              as="h2"
              text={member.name}
              className={cn(
                "type-display-md mt-4",
                dark ? "text-cream-50" : "text-navy-900",
              )}
            />

            <Reveal variant="up" delay={0.1}>
              <p
                className={cn(
                  "mt-3 text-[1.0625rem] font-semibold",
                  dark ? "text-cyan-300" : "text-cyan-600",
                )}
              >
                <MemberRole member={member} />
              </p>
              <MemberNote member={member} dark={dark} />
            </Reveal>

            {/* Credential pills */}
            <RevealGroup className="mt-6 flex flex-wrap gap-2" delay={0.14} stagger={0.06}>
              {member.credentials.map((c) => (
                <RevealItem
                  key={c}
                  as="span"
                  variant="scale"
                  className={cn(
                    "rounded-full border px-3.5 py-1.5 text-[0.75rem] font-semibold tracking-wide",
                    dark
                      ? "border-cyan-300/30 bg-cyan-500/10 text-cyan-200"
                      : "border-cyan-500/30 bg-cyan-100/70 text-cyan-600",
                  )}
                >
                  {c}
                </RevealItem>
              ))}
            </RevealGroup>

            {/* The one line that earns trust in a breath */}
            <MemberPull member={member} dark={dark} />

            <BioLines member={member} dark={dark} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function SaturatingPortrait({ member }: { member: TeamMember }) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const smooth = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Desaturated as it enters, full colour once it settles — the portrait
  // "arrives" rather than simply being there.
  const filter = useTransform(
    smooth,
    [0, 1],
    ["grayscale(1) contrast(1.05)", "grayscale(0) contrast(1)"],
  );
  const scale = useTransform(smooth, [0, 1], [1.12, 1]);
  const clip = useTransform(
    smooth,
    [0, 0.85],
    ["inset(18% 0% 0% 0%)", "inset(0% 0% 0% 0%)"],
  );

  return (
    <div ref={ref} className="relative">
      <motion.div
        style={{ clipPath: clip }}
        className="grain relative aspect-[4/5] overflow-hidden rounded-[1.5rem] ring-1 ring-black/5"
      >
        <motion.div style={{ filter, scale }} className="absolute inset-0">
          <Image
            src={member.image}
            alt={member.name}
            fill
            sizes="(max-width: 1024px) 90vw, 38vw"
            quality={90}
            className="object-cover object-top"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

function MemberRole({ member }: { member: TeamMember }) {
  const { pick } = useLocale();
  return <>{pick(member.role)}</>;
}

function MemberNote({ member, dark }: { member: TeamMember; dark: boolean }) {
  const { pick } = useLocale();
  if (!member.note) return null;
  return (
    <p className={cn("mt-1.5 text-[0.875rem]", dark ? "text-cream-100/50" : "text-ink-500")}>
      {pick(member.note)}
    </p>
  );
}

function MemberPull({ member, dark }: { member: TeamMember; dark: boolean }) {
  const { pick } = useLocale();
  if (!member.pull) return null;
  return (
    <Reveal variant="up" delay={0.2}>
      <p
        className={cn(
          "font-display mt-8 border-l-2 pl-5 text-[clamp(1.125rem,1.7vw,1.5rem)] leading-snug",
          dark ? "border-cyan-400 text-cream-50" : "border-cyan-500 text-navy-900",
        )}
      >
        {pick(member.pull)}
      </p>
    </Reveal>
  );
}

function BioLines({ member, dark }: { member: TeamMember; dark: boolean }) {
  const { locale } = useLocale();
  return (
    <LineReveal
      lines={member.bio[locale]}
      className="mt-8 space-y-5"
      lineClassName={cn(
        "text-[0.9375rem] leading-relaxed lg:text-[1rem]",
        dark ? "text-cream-100/70" : "text-ink-700",
      )}
    />
  );
}
