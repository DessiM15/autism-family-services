"use client";

import { motion, useInView, type Variants } from "motion/react";
import { useRef, type ElementType, type ReactNode } from "react";
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

const EASE = [0.16, 1, 0.3, 1] as const;

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

/**
 * Plays once when the element scrolls into view.
 *
 * The decision and the animated body are separate components on purpose.
 * `useMotionAllowed()` is false until hydration, so a single component that
 * early-returned a plain tag would run `useInView` against a ref that was
 * never attached — the observer would watch nothing and the element would
 * stay at its hidden state forever. Splitting them means the ref is attached
 * on the animated body's very first render.
 */
export function Reveal({
  children,
  className,
  as = "div",
  id,
  ...rest
}: RevealProps) {
  const animate = useMotionAllowed();

  if (!animate) {
    const Tag = as as ElementType;
    return (
      <Tag id={id} className={className}>
        {children}
      </Tag>
    );
  }

  return (
    <RevealBody className={className} as={as} id={id} {...rest}>
      {children}
    </RevealBody>
  );
}

function RevealBody({
  children,
  variant = "up",
  delay = 0,
  duration = 0.85,
  className,
  as = "div",
  amount = 0.2,
  id,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount });
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  /**
   * The mask variant hides the element with `clip-path`, and Chrome's
   * IntersectionObserver reports zero intersection for a clip-collapsed
   * element — so observing the clipped element itself deadlocks: it can
   * never come into view because it is invisible. The observer therefore
   * goes on an unclipped outer element and the clip animates on a child.
   */
  if (variant === "mask") {
    return (
      <MotionTag
        ref={ref}
        id={id}
        className={cn(className)}
        initial="hidden"
        animate={inView ? "shown" : "hidden"}
        variants={{ hidden: {}, shown: {} }}
      >
        <motion.div
          variants={variants.mask}
          transition={{ duration, delay, ease: EASE }}
        >
          {children}
        </motion.div>
      </MotionTag>
    );
  }

  return (
    <MotionTag
      ref={ref}
      id={id}
      className={cn(className)}
      initial="hidden"
      animate={inView ? "shown" : "hidden"}
      variants={variants[variant]}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </MotionTag>
  );
}

/* ------------------------------------------------------------------ */

interface GroupProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  amount?: number;
  as?: ElementType;
}

/** Staggers its direct children. Pair with `RevealItem` inside. */
export function RevealGroup({ children, className, as = "div", ...rest }: GroupProps) {
  const animate = useMotionAllowed();

  if (!animate) {
    const Tag = as as ElementType;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <RevealGroupBody className={className} as={as} {...rest}>
      {children}
    </RevealGroupBody>
  );
}

function RevealGroupBody({
  children,
  className,
  stagger = 0.09,
  delay = 0,
  amount = 0.15,
  as = "div",
}: GroupProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount });
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  return (
    <MotionTag
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "shown" : "hidden"}
      variants={{
        hidden: {},
        shown: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {children}
    </MotionTag>
  );
}

/** A child of `RevealGroup`. Inherits the group's stagger. */
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
      transition={{ duration, ease: EASE }}
    >
      {children}
    </MotionTag>
  );
}
