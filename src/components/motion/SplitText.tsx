"use client";

import { motion } from "motion/react";
import type { ElementType, ReactNode } from "react";
import { useMotionAllowed } from "@/components/calm/CalmModeProvider";
import { cn } from "@/lib/utils";

export interface SplitTextProps {
  text: string;
  className?: string;
  as?: ElementType;
  delay?: number;
  stagger?: number;
  duration?: number;
  /** Play as soon as it mounts rather than waiting to be scrolled into view. */
  immediate?: boolean;
  /** Renders after the animated words — e.g. a gradient-styled word. */
  children?: ReactNode;
}

/**
 * Rises each word out of a mask, one after another. The whole string is
 * exposed to assistive technology as a single label so the animation never
 * turns a sentence into a list of fragments.
 */
export function SplitText({
  text,
  className,
  as = "span",
  delay = 0,
  stagger = 0.055,
  duration = 0.9,
  immediate = false,
  children,
}: SplitTextProps) {
  const animate = useMotionAllowed();
  const Tag = as as ElementType;
  const words = text.split(" ").filter(Boolean);

  if (!animate) {
    return (
      <Tag className={className}>
        {text}
        {children}
      </Tag>
    );
  }

  const container = {
    hidden: {},
    shown: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };

  const word = {
    hidden: { y: "110%" },
    shown: { y: "0%" },
  };

  const viewProps = immediate
    ? { animate: "shown" as const }
    : { whileInView: "shown" as const, viewport: { once: true, amount: 0.4 } };

  return (
    <Tag className={className} aria-label={text}>
      <motion.span
        aria-hidden
        className="inline"
        initial="hidden"
        variants={container}
        {...viewProps}
      >
        {words.map((w, i) => (
          <span
            key={`${w}-${i}`}
            className="inline-block overflow-hidden align-bottom pb-[0.08em]"
          >
            <motion.span
              className="inline-block"
              variants={word}
              transition={{ duration, ease: [0.16, 1, 0.3, 1] }}
            >
              {w}
              {i < words.length - 1 ? " " : ""}
            </motion.span>
          </span>
        ))}
      </motion.span>
      {children}
    </Tag>
  );
}

/**
 * Reveals a block of text line by line as it scrolls into view — used for
 * the team bios, where the copy should feel like it is being told to you.
 */
export function LineReveal({
  lines,
  className,
  lineClassName,
  stagger = 0.14,
}: {
  lines: string[];
  className?: string;
  lineClassName?: string;
  stagger?: number;
}) {
  const animate = useMotionAllowed();

  if (!animate) {
    return (
      <div className={className}>
        {lines.map((line, i) => (
          <p key={i} className={lineClassName}>
            {line}
          </p>
        ))}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.15 }}
      variants={{ hidden: {}, shown: { transition: { staggerChildren: stagger } } }}
    >
      {lines.map((line, i) => (
        <motion.p
          key={i}
          className={cn(lineClassName)}
          variants={{
            hidden: { opacity: 0, y: 24 },
            shown: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        >
          {line}
        </motion.p>
      ))}
    </motion.div>
  );
}
