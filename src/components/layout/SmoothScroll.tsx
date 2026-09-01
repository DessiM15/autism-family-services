"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { useCalm } from "@/components/calm/CalmModeProvider";

/**
 * Owns scrolling for the whole site:
 *
 *  1. Lenis smooth scrolling (switched off entirely in Calm Mode).
 *  2. Every navigation and every refresh lands at the top of the page —
 *     unless the URL carries a hash, in which case we go to that section.
 */
export function SmoothScroll() {
  const pathname = usePathname();
  const { calm, ready } = useCalm();
  const lenisRef = useRef<Lenis | null>(null);
  const firstRun = useRef(true);

  /* --- Refresh always starts at the top -------------------------------- */
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
  }, []);

  /* --- Lenis lifecycle -------------------------------------------------- */
  useEffect(() => {
    if (!ready || calm) {
      lenisRef.current?.destroy();
      lenisRef.current = null;
      return;
    }

    const lenis = new Lenis({
      duration: 1.05,
      // A gentle exponential ease — fast at the start, unhurried at the end.
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
      // Native scrolling on touch feels better than emulated momentum.
      syncTouch: false,
    });
    lenisRef.current = lenis;

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [ready, calm]);

  /* --- Scroll position on navigation ------------------------------------ */
  useEffect(() => {
    const hash = window.location.hash;

    const goTop = () => {
      const lenis = lenisRef.current;
      if (lenis) lenis.scrollTo(0, { immediate: true });
      window.scrollTo(0, 0);
    };

    if (!hash) {
      goTop();
      // A second pass after layout settles catches late-loading images that
      // would otherwise shift the page under the visitor.
      requestAnimationFrame(goTop);
      firstRun.current = false;
      return;
    }

    // Hash present: let the section mount, then move to it.
    const target = document.querySelector(hash);
    if (!target) {
      goTop();
      firstRun.current = false;
      return;
    }
    const id = window.setTimeout(() => {
      const lenis = lenisRef.current;
      if (lenis) {
        lenis.scrollTo(target as HTMLElement, { offset: -100 });
      } else {
        target.scrollIntoView({ behavior: "auto", block: "start" });
      }
    }, 60);
    firstRun.current = false;
    return () => window.clearTimeout(id);
  }, [pathname]);

  /* --- In-page anchor clicks -------------------------------------------- */
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement | null)?.closest?.(
        'a[href*="#"]',
      ) as HTMLAnchorElement | null;
      if (!anchor || anchor.target === "_blank") return;

      const url = new URL(anchor.href, window.location.href);
      if (url.pathname !== window.location.pathname || !url.hash) return;

      const target = document.querySelector(url.hash);
      if (!target) return;

      event.preventDefault();
      history.pushState(null, "", url.hash);
      const lenis = lenisRef.current;
      if (lenis) {
        lenis.scrollTo(target as HTMLElement, { offset: -100 });
      } else {
        target.scrollIntoView({ behavior: "auto", block: "start" });
      }
      (target as HTMLElement).focus?.({ preventScroll: true });
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
