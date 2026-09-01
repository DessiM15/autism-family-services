"use client";

import { useEffect, useRef, type RefObject } from "react";
import { useMotionAllowed } from "@/components/calm/CalmModeProvider";
import { cn } from "@/lib/utils";

const BARS = 21;

/**
 * Bars that move to the actual amplitude of the microphone. Two reasons it
 * is worth the animation frame: it tells someone their microphone is really
 * picking them up, and it makes the pause before the answer feel considered
 * rather than broken.
 *
 * Calm Mode gets a still version, since a moving element is exactly what
 * that switch exists to remove.
 */
export function Waveform({
  levelRef,
  className,
}: {
  levelRef: RefObject<number>;
  className?: string;
}) {
  const animate = useMotionAllowed();
  const barsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const rafRef = useRef(0);
  const phase = useRef(0);

  useEffect(() => {
    if (!animate) return;

    const tick = () => {
      phase.current += 0.14;
      const level = levelRef.current ?? 0;

      for (let i = 0; i < BARS; i++) {
        const bar = barsRef.current[i];
        if (!bar) continue;

        // Centre bars react most, so the shape reads as a voice rather than
        // as a row of equal meters.
        const fromCentre = Math.abs(i - (BARS - 1) / 2) / ((BARS - 1) / 2);
        const weight = 1 - fromCentre * 0.72;
        // A slow travelling wave keeps it alive during quiet moments.
        const shimmer = 0.5 + 0.5 * Math.sin(phase.current + i * 0.55);
        const height = 10 + level * 100 * weight * (0.55 + shimmer * 0.45);

        bar.style.height = `${Math.max(10, Math.min(100, height))}%`;
        bar.style.opacity = String(0.35 + Math.min(0.65, level * weight * 1.4));
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [animate, levelRef]);

  return (
    <div
      aria-hidden
      className={cn("flex h-9 items-center justify-center gap-[3px]", className)}
    >
      {Array.from({ length: BARS }, (_, i) => (
        <span
          key={i}
          ref={(el) => {
            barsRef.current[i] = el;
          }}
          className={cn(
            "w-[3px] rounded-full bg-cyan-400",
            // A fixed, gentle silhouette when motion is off.
            !animate && "opacity-60",
          )}
          style={
            animate
              ? { height: "10%" }
              : {
                  height: `${28 + Math.round(46 * Math.sin((i / (BARS - 1)) * Math.PI))}%`,
                }
          }
        />
      ))}
    </div>
  );
}
