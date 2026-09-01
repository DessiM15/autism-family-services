"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, Phone } from "lucide-react";
import { nav } from "@/content/data/nav";
import { site } from "@/lib/site";
import { telHref, cn } from "@/lib/utils";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { LanguageToggle } from "@/components/i18n/LanguageToggle";
import { CalmToggle } from "@/components/calm/CalmToggle";
import { useMotionAllowed } from "@/components/calm/CalmModeProvider";
import { MobileNav } from "./MobileNav";
import { ButtonLink } from "@/components/ui/Button";
import { stripLocale } from "@/lib/i18n";
import { useHeaderTone } from "./HeaderTone";

export function Header() {
  const { t, href, pick } = useLocale();
  const pathname = usePathname();
  const path = stripLocale(pathname);
  const animate = useMotionAllowed();
  const { tone } = useHeaderTone();

  // Over a dark hero the header inverts; once the page scrolls it picks up
  // its cream background and returns to navy type.

  const [scrolled, setScrolled] = useState(false);
  const [openPanel, setOpenPanel] = useState<string | null>(null);
  const closeTimer = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the panel whenever we navigate. Adjusting state during render is
  // the sanctioned pattern here — an effect would paint the open panel first.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpenPanel(null);
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenPanel(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const open = useCallback((key: string) => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setOpenPanel(key);
  }, []);

  // A short grace period stops the panel snapping shut when the pointer
  // crosses the gap between the trigger and the panel.
  const scheduleClose = useCallback(() => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpenPanel(null), 140);
  }, []);

  const active = openPanel ? nav.find((i) => i.href === openPanel) : null;

  // Over a dark hero the header inverts; once the page scrolls it picks up
  // its cream background and returns to navy type.
  const onDark = tone === "dark" && !scrolled;

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-navy-900 focus:px-5 focus:py-3 focus:text-cream-50"
      >
        {t.common.skipToContent}
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500",
          scrolled
            ? "bg-cream-100/85 shadow-[0_1px_0_rgba(0,30,100,0.08),0_12px_40px_-24px_rgba(0,30,100,0.35)] backdrop-blur-xl"
            : "bg-transparent",
        )}
        onMouseLeave={scheduleClose}
      >
        {/* Announcement strip — verbatim from their current site */}
        <div
          className={cn(
            "hidden overflow-hidden border-b border-navy-900/10 bg-navy-950 text-cream-100 transition-[height,opacity] duration-500 lg:block",
            scrolled ? "h-0 opacity-0" : "h-9 opacity-100",
          )}
        >
          <div className="container-page flex h-9 items-center justify-between text-[0.75rem]">
            <p className="flex items-center gap-2.5">
              <span className="relative flex size-1.5">
                <span
                  className={cn(
                    "absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75",
                    animate && "animate-ping",
                  )}
                />
                <span className="relative inline-flex size-1.5 rounded-full bg-cyan-400" />
              </span>
              <span className="font-semibold">{t.banner.accepting}</span>
              <span className="text-cream-100/40">|</span>
              <span className="text-cream-100/70">{t.banner.location}</span>
            </p>
            <div className="flex items-center gap-5">
              <CalmToggle tone="light" />
              <LanguageToggle tone="light" />
            </div>
          </div>
        </div>

        <div className="container-page">
          <div
            className={cn(
              "flex items-center justify-between transition-[height] duration-500",
              scrolled ? "h-[64px]" : "h-[76px]",
            )}
          >
            {/* Logo */}
            <Link
              href={href("/")}
              className={cn(
                "relative z-10 flex shrink-0 items-center transition-[background-color,padding] duration-500",
                onDark && "rounded-xl bg-cream-50/95 px-3 py-2 backdrop-blur",
              )}
              aria-label={site.legalName}
            >
              <Image
                src="/brand/logo-lockup.png"
                alt={site.name}
                width={1018}
                height={421}
                priority
                className={cn(
                  "w-auto transition-[height] duration-500",
                  scrolled ? "h-9 lg:h-10" : "h-10 lg:h-12",
                )}
              />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
              {nav.map((item) => {
                const isActive =
                  path === item.href || (item.href !== "/" && path.startsWith(item.href));
                const hasPanel = Boolean(item.panel);
                const isOpen = openPanel === item.href;

                return (
                  <div
                    key={item.href}
                    onMouseEnter={() => (hasPanel ? open(item.href) : setOpenPanel(null))}
                  >
                    <Link
                      href={href(item.href)}
                      aria-expanded={hasPanel ? isOpen : undefined}
                      aria-current={isActive ? "page" : undefined}
                      onFocus={() => (hasPanel ? open(item.href) : setOpenPanel(null))}
                      className={cn(
                        "relative flex items-center gap-1 rounded-full px-4 py-2 text-[0.9375rem] font-semibold transition-colors duration-300",
                        onDark
                          ? isActive || isOpen
                            ? "text-cream-50"
                            : "text-cream-100/75 hover:text-cream-50"
                          : isActive || isOpen
                            ? "text-navy-900"
                            : "text-ink-700 hover:text-navy-900",
                      )}
                    >
                      {pick(item.label)}
                      {hasPanel && (
                        <ChevronDown
                          className={cn(
                            "size-3.5 transition-transform duration-300",
                            isOpen && "rotate-180",
                          )}
                          aria-hidden
                        />
                      )}
                      {isActive && (
                        <span
                          aria-hidden
                          className="absolute inset-x-4 -bottom-0.5 h-[2px] rounded-full bg-cyan-500"
                        />
                      )}
                    </Link>
                  </div>
                );
              })}
            </nav>

            {/* Right rail */}
            <div className="flex items-center gap-3">
              <a
                href={telHref(site.phone)}
                className={cn(
                  "hidden items-center gap-2 text-[0.9375rem] font-semibold transition-colors duration-300 xl:flex",
                  onDark ? "text-cream-50" : "text-navy-900",
                )}
              >
                <span
                  className={cn(
                    "grid size-9 place-items-center rounded-full transition-colors duration-300",
                    onDark ? "bg-cream-100/15 text-cyan-300" : "bg-cyan-100 text-cyan-600",
                  )}
                >
                  <Phone className="size-4" aria-hidden />
                </span>
                {site.phone}
              </a>
              <ButtonLink
                href={href("/start-here")}
                size="sm"
                variant={onDark ? "onDark" : "primary"}
                className="hidden sm:inline-flex"
                arrow
              >
                {t.home.heroCtaPrimary}
              </ButtonLink>
              <MobileNav onDark={onDark} />
            </div>
          </div>
        </div>

        {/* ------------------------------- Mega panel ------------------------ */}
        <AnimatePresence>
          {active?.panel && (
            <motion.div
              key={active.href}
              initial={animate ? { opacity: 0, y: -8 } : false}
              animate={{ opacity: 1, y: 0 }}
              exit={animate ? { opacity: 0, y: -8 } : undefined}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-x-0 top-full hidden lg:block"
              onMouseEnter={() => open(active.href)}
            >
              <div className="container-page pb-6">
                <div className="overflow-hidden rounded-[1.75rem] border border-cream-300 bg-cream-50/97 shadow-[0_32px_80px_-24px_rgba(0,30,100,0.32)] backdrop-blur-xl">
                  <div className="grid grid-cols-12">
                    <div className="col-span-8 grid grid-cols-3 gap-x-8 gap-y-8 p-9">
                      {active.panel.columns.map((col) => (
                        <div key={pick(col.heading)}>
                          <p className="type-eyebrow mb-4 text-cyan-600">
                            {pick(col.heading)}
                          </p>
                          <ul className="space-y-3.5">
                            {col.links.map((link) => (
                              <li key={link.href}>
                                <Link
                                  href={href(link.href)}
                                  className="group block"
                                  onClick={() => setOpenPanel(null)}
                                >
                                  <span className="block text-[0.9375rem] font-semibold text-navy-900 transition-colors group-hover:text-cyan-600">
                                    {pick(link.label)}
                                  </span>
                                  {link.desc && (
                                    <span className="mt-0.5 block text-[0.8125rem] leading-snug text-ink-500">
                                      {pick(link.desc)}
                                    </span>
                                  )}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}

                      {active.panel.footerLink && (
                        <div className="col-span-3 border-t border-cream-300 pt-5">
                          <Link
                            href={href(active.panel.footerLink.href)}
                            onClick={() => setOpenPanel(null)}
                            className="link-draw text-[0.9375rem] font-semibold text-navy-900"
                          >
                            {pick(active.panel.footerLink.label)} →
                          </Link>
                        </div>
                      )}
                    </div>

                    {/* Feature card */}
                    <Link
                      href={href(active.panel.feature.href)}
                      onClick={() => setOpenPanel(null)}
                      className="group relative col-span-4 overflow-hidden bg-navy-950"
                    >
                      <Image
                        src={active.panel.feature.image}
                        alt=""
                        fill
                        sizes="33vw"
                        className="object-cover opacity-70 transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                      />
                      <div className="scrim-full absolute inset-0" />
                      <div className="relative flex h-full flex-col justify-end p-8">
                        <p className="type-eyebrow mb-2.5 text-cyan-300">
                          {pick(active.panel.feature.eyebrow)}
                        </p>
                        <p className="font-display text-[1.375rem] leading-tight text-cream-50">
                          {pick(active.panel.feature.title)}
                        </p>
                        <span className="mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-cream-50 px-5 py-2.5 text-[0.875rem] font-semibold text-navy-900 transition-transform duration-300 group-hover:translate-x-1">
                          {pick(active.panel.feature.cta)} →
                        </span>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
