"use client";

import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { useRef, type ReactNode } from "react";
import { useMotionAllowed } from "@/components/calm/CalmModeProvider";
import { cn } from "@/lib/utils";

export interface ParallaxProps {
  children: ReactNode;
  /**
   * How far the element drifts against the scroll, as a percentage of the
   * viewport. Positive drifts up (moves slower than the page), negative
   * drifts down. Keep it under ~18 or it reads as a glitch.
   */
  speed?: number;
  className?: string;
  /** Adds a slow scale change on the way through. */
  zoom?: boolean;
}

/**
 * Splitting the decision from the animated body matters: `useScroll` warns
 * if its target ref is never attached, so the hook only ever mounts inside
 * a component that is guaranteed to render the ref'd element.
 */
export function Parallax({ children, speed = 10, className, zoom = false }: ParallaxProps) {
  const animate = useMotionAllowed();

  if (!animate) {
    return <div className={className}>{children}</div>;
  }

  return (
    <ParallaxBody speed={speed} className={className} zoom={zoom}>
      {children}
    </ParallaxBody>
  );
}

function ParallaxBody({ children, speed = 10, className, zoom }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Spring smoothing stops the drift from feeling mechanically linear.
  const smooth = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 30,
    restDelta: 0.001,
  });

  const y = useTransform(smooth, [0, 1], [`${speed}%`, `${-speed}%`]);
  const scale = useTransform(smooth, [0, 0.5, 1], [1.06, 1.12, 1.06]);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <motion.div style={{ y, scale: zoom ? scale : undefined }} className="h-full w-full">
        {children}
      </motion.div>
    </div>
  );
}

/**
 * Parallax for a background image that fills its container. The wrapper
 * clips; the inner layer is oversized so the drift never exposes an edge.
 */
export function ParallaxLayer({
  children,
  speed = 14,
  className,
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const animate = useMotionAllowed();

  if (!animate) {
    return (
      <div className={cn("relative overflow-hidden", className)}>
        <div className="absolute inset-0">{children}</div>
      </div>
    );
  }

  return (
    <ParallaxLayerBody speed={speed} className={className}>
      {children}
    </ParallaxLayerBody>
  );
}

function ParallaxLayerBody({
  children,
  speed = 14,
  className,
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`-${speed}%`, `${speed}%`]);

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div
        style={{ y, height: `${100 + speed * 2}%`, top: `-${speed}%` }}
        className="absolute inset-x-0"
      >
        {children}
      </motion.div>
    </div>
  );
}
