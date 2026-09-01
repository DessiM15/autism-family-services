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

  /* --- Clicks on links that point at where we already are ---------------- */
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (event.button !== 0) return;

      const anchor = (event.target as HTMLElement | null)?.closest?.("a") as
        | HTMLAnchorElement
        | null;
      if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) return;

      let url: URL;
      try {
        url = new URL(anchor.href, window.location.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return;
      if (url.pathname !== window.location.pathname) return;

      /*
       * Same page. Next sees no navigation for an identical URL, so nothing
       * resets the scroll — clicking the logo from halfway down the homepage
       * simply did nothing. Handle both cases ourselves.
       */
      if (url.hash) {
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
        return;
      }

      // No hash: take them to the top, which is what a logo click means.
      event.preventDefault();
      if (window.location.hash) {
        history.replaceState(null, "", url.pathname + url.search);
      }
      const lenis = lenisRef.current;
      if (lenis) {
        lenis.scrollTo(0, { immediate: false, force: true });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    /*
     * Capture phase on purpose. Next's <Link> calls preventDefault on the
     * anchor itself, so a bubble-phase listener sees an already-handled
     * event and bails — which is why clicking the logo from halfway down
     * the homepage did nothing at all.
     */
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
