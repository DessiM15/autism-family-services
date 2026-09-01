"use client";

import { motion, useInView } from "motion/react";
import { Fragment, useRef, type ElementType, type ReactNode } from "react";
import { useMotionAllowed } from "@/components/calm/CalmModeProvider";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

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
 *
 * Split into decision + body for the same reason as `Reveal`: the ref must
 * be attached on the animated body's first render.
 */
export function SplitText({ text, className, as = "span", children, ...rest }: SplitTextProps) {
  const animate = useMotionAllowed();
  const Tag = as as ElementType;

  if (!animate) {
    return (
      <Tag className={className}>
        {text}
        {children}
      </Tag>
    );
  }

  return (
    <SplitTextBody text={text} className={className} as={as} {...rest}>
      {children}
    </SplitTextBody>
  );
}

function SplitTextBody({
  text,
  className,
  as = "span",
  delay = 0,
  stagger = 0.055,
  duration = 0.9,
  immediate = false,
  children,
}: SplitTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const Tag = as as ElementType;
  const words = text.split(" ").filter(Boolean);

  const play = immediate || inView;

  return (
    <Tag className={className} aria-label={text}>
      <motion.span
        ref={ref}
        aria-hidden
        className="inline"
        initial="hidden"
        animate={play ? "shown" : "hidden"}
        variants={{
          hidden: {},
          shown: { transition: { staggerChildren: stagger, delayChildren: delay } },
        }}
      >
        {words.map((w, i) => (
          <Fragment key={`${w}-${i}`}>
            <span className="inline-block overflow-hidden align-bottom pb-[0.08em]">
              <motion.span
                className="inline-block"
                variants={{ hidden: { y: "110%" }, shown: { y: "0%" } }}
                transition={{ duration, ease: EASE }}
              >
                {w}
              </motion.span>
            </span>
            {/* The separator must sit outside the inline-block, or the
                browser collapses it and the words run together. */}
            {i < words.length - 1 ? " " : null}
          </Fragment>
        ))}
      </motion.span>
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------ */

interface LineRevealProps {
  lines: string[];
  className?: string;
  lineClassName?: string;
  stagger?: number;
}

/**
 * Reveals a block of text line by line as it scrolls into view — used for
 * the team bios, where the copy should feel like it is being told to you.
 */
export function LineReveal({ lines, className, lineClassName, ...rest }: LineRevealProps) {
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
    <LineRevealBody
      lines={lines}
      className={className}
      lineClassName={lineClassName}
      {...rest}
    />
  );
}

function LineRevealBody({
  lines,
  className,
  lineClassName,
  stagger = 0.14,
}: LineRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "shown" : "hidden"}
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
          transition={{ duration: 0.85, ease: EASE }}
        >
          {line}
        </motion.p>
      ))}
    </motion.div>
  );
}
