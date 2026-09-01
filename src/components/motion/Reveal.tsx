"use client";

import { motion, type Variants } from "motion/react";
import type { ElementType, ReactNode } from "react";
import { useMotionAllowed } from "@/components/calm/CalmModeProvider";
import { cn } from "@/lib/utils";

type Variant = "up" | "fade" | "mask" | "scale" | "blur";

const variants: Record<Variant, Variants> = {
  up: {
    hidden: { opacity: 0, y: 34 },
    shown: { opacity: 1, y: 0 },
  },
  fade: {
    hidden: { opacity: 0 },
    shown: { opacity: 1 },
  },
  // The cinematic one: the image wipes up from behind a mask.
  mask: {
    hidden: { clipPath: "inset(0% 0% 100% 0%)", scale: 1.08 },
    shown: { clipPath: "inset(0% 0% 0% 0%)", scale: 1 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.94 },
    shown: { opacity: 1, scale: 1 },
  },
  blur: {
    hidden: { opacity: 0, filter: "blur(14px)", y: 18 },
    shown: { opacity: 1, filter: "blur(0px)", y: 0 },
  },
};

export interface RevealProps {
  children: ReactNode;
  variant?: Variant;
  delay?: number;
  duration?: number;
  className?: string;
  as?: ElementType;
  /** Fraction of the element that must be visible before it plays. */
  amount?: number;
  id?: string;
}

export function Reveal({
  children,
  variant = "up",
  delay = 0,
  duration = 0.85,
  className,
  as = "div",
  amount = 0.25,
  id,
}: RevealProps) {
  const animate = useMotionAllowed();
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  // Calm Mode (and the pre-hydration pass) renders the finished state.
  if (!animate) {
    const Tag = as as ElementType;
    return (
      <Tag id={id} className={className}>
        {children}
      </Tag>
    );
  }

  return (
    <MotionTag
      id={id}
      className={cn(className)}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount }}
      variants={variants[variant]}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Staggers its direct children. Pair with <Reveal> inside, or use the
 * `RevealItem` below for the simple case.
 */
export function RevealGroup({
  children,
  className,
  stagger = 0.09,
  delay = 0,
  amount = 0.2,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  amount?: number;
  as?: ElementType;
}) {
  const animate = useMotionAllowed();
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  if (!animate) {
    const Tag = as as ElementType;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount }}
      variants={{
        hidden: {},
        shown: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {children}
    </MotionTag>
  );
}

export function RevealItem({
  children,
  className,
  variant = "up",
  duration = 0.8,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  variant?: Variant;
  duration?: number;
  as?: ElementType;
}) {
  const animate = useMotionAllowed();
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  if (!animate) {
    const Tag = as as ElementType;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      variants={variants[variant]}
      transition={{ duration, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionTag>
  );
}
