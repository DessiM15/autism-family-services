"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { nav } from "@/content/data/nav";
import { site } from "@/lib/site";
import { cn, telHref } from "@/lib/utils";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { LanguageToggle } from "@/components/i18n/LanguageToggle";
import { CalmToggle } from "@/components/calm/CalmToggle";
import { useMotionAllowed } from "@/components/calm/CalmModeProvider";

export function MobileNav({ onDark = false }: { onDark?: boolean }) {
  const { t, href, pick } = useLocale();
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const animate = useMotionAllowed();

  // Lock the page behind the drawer.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={t.common.openMenu}
        className={cn(
          "grid size-11 place-items-center rounded-full border backdrop-blur transition-colors lg:hidden",
          onDark
            ? "border-cream-100/30 bg-cream-100/10 text-cream-50 hover:border-cream-100/60"
            : "border-cream-400 bg-cream-50/80 text-navy-900 hover:border-navy-300",
        )}
      >
        <Menu className="size-5" aria-hidden />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] lg:hidden"
            initial={animate ? { opacity: 0 } : false}
            animate={{ opacity: 1 }}
            exit={animate ? { opacity: 0 } : undefined}
            transition={{ duration: 0.25 }}
            role="dialog"
            aria-modal="true"
            aria-label={t.common.menu}
          >
            <div className="absolute inset-0 bg-cream-100" />

            <div className="relative flex h-full flex-col overflow-y-auto overscroll-contain">
              <div className="container-page flex h-[64px] shrink-0 items-center justify-between">
                <span className="font-display text-lg text-navy-900">
                  {t.common.menu}
                </span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label={t.common.closeMenu}
                  className="grid size-11 place-items-center rounded-full border border-cream-400 text-navy-900"
                >
                  <X className="size-5" aria-hidden />
                </button>
              </div>

              <nav className="container-page flex-1 pb-10" aria-label="Mobile">
                <ul className="divide-y divide-cream-300 border-y border-cream-300">
                  {nav.map((item, index) => {
                    const isExpanded = expanded === item.href;
                    return (
                      <li key={item.href}>
                        <div className="flex items-stretch">
                          <Link
                            href={href(item.href)}
                            onClick={() => setOpen(false)}
                            className="flex-1 py-5 font-display text-2xl text-navy-900"
                          >
                            <span className="mr-3 align-middle font-sans text-[0.6875rem] font-semibold tracking-widest text-cyan-600">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            {pick(item.label)}
                          </Link>
                          {item.panel && (
                            <button
                              type="button"
                              onClick={() => setExpanded(isExpanded ? null : item.href)}
                              aria-expanded={isExpanded}
                              aria-label={`${pick(item.label)} — ${t.common.menu}`}
                              className="grid w-14 shrink-0 place-items-center text-ink-500"
                            >
                              <ChevronDown
                                className={cn(
                                  "size-5 transition-transform duration-300",
                                  isExpanded && "rotate-180",
                                )}
                                aria-hidden
                              />
                            </button>
                          )}
                        </div>

                        <AnimatePresence initial={false}>
                          {item.panel && isExpanded && (
                            <motion.div
                              initial={animate ? { height: 0, opacity: 0 } : false}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={animate ? { height: 0, opacity: 0 } : undefined}
                              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                              className="overflow-hidden"
                            >
                              <div className="space-y-6 pb-6">
                                {item.panel.columns.map((col) => (
                                  <div key={pick(col.heading)}>
                                    <p className="type-eyebrow mb-3 text-cyan-600">
                                      {pick(col.heading)}
                                    </p>
                                    <ul className="space-y-3 border-l border-cream-300 pl-4">
                                      {col.links.map((link) => (
                                        <li key={link.href}>
                                          <Link
                                            href={href(link.href)}
                                            onClick={() => setOpen(false)}
                                            className="block text-[0.9375rem] font-semibold text-navy-800"
                                          >
                                            {pick(link.label)}
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </li>
                    );
                  })}
                </ul>

                <div className="mt-8 space-y-4">
                  <a
                    href={telHref(site.phone)}
                    className="flex flex-col items-center gap-1 rounded-2xl bg-navy-900 px-6 py-4 font-semibold text-cream-50"
                  >
                    <span className="flex items-center gap-3">
                      <Phone className="size-4" aria-hidden />
                      {site.phone}
                    </span>
                    <span lang="es" className="text-[0.75rem] font-normal text-cyan-300">
                      {t.spanish.badge}
                    </span>
                  </a>

                  <div className="flex items-center justify-between rounded-2xl border border-cream-300 bg-cream-50 p-4">
                    <span className="text-[0.8125rem] font-semibold text-ink-700">
                      {t.footer.languageHeading}
                    </span>
                    <LanguageToggle />
                  </div>
                  <div className="flex items-center justify-between rounded-2xl border border-cream-300 bg-cream-50 p-4">
                    <span className="text-[0.8125rem] font-semibold text-ink-700">
                      {t.calm.label}
                    </span>
                    <CalmToggle showLabel={false} />
                  </div>
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
