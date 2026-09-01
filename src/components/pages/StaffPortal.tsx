"use client";

import { useState, useSyncExternalStore } from "react";
import { ExternalLink, Lock, LogOut } from "lucide-react";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { staffLinks } from "@/content/data/nav";
import { Section, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";

const KEY = "afs-staff-unlocked";
const EVENT = "afs:staff-unlock";

/**
 * A light gate, not a security boundary.
 *
 * It keeps internal SHAPE forms out of the public navigation and out of
 * search results. The linked documents are the clinic's own; if any of them
 * ever holds client information, they need real authentication, not this.
 */
const subscribe = (onChange: () => void) => {
  window.addEventListener(EVENT, onChange);
  return () => window.removeEventListener(EVENT, onChange);
};

const readUnlocked = () => {
  try {
    return sessionStorage.getItem(KEY) === "1";
  } catch {
    /* storage blocked — the visitor just re-enters the code */
    return false;
  }
};

export function StaffPortal({ accessCode }: { accessCode: string }) {
  const { t, pick } = useLocale();
  const [value, setValue] = useState("");
  const [wrong, setWrong] = useState(false);

  // sessionStorage is an external store, so read it as one rather than
  // copying it into state inside an effect.
  const unlocked = useSyncExternalStore(subscribe, readUnlocked, () => false);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (value.trim().toLowerCase() === accessCode.toLowerCase()) {
      setWrong(false);
      try {
        sessionStorage.setItem(KEY, "1");
      } catch {
        /* ignore */
      }
      window.dispatchEvent(new Event(EVENT));
    } else {
      setWrong(true);
    }
  };

  const signOut = () => {
    setValue("");
    try {
      sessionStorage.removeItem(KEY);
    } catch {
      /* ignore */
    }
    window.dispatchEvent(new Event(EVENT));
  };

  return (
    <Section tone="cream" size="lg">
      <div className="container-prose">
        {!unlocked ? (
          <Reveal variant="up">
            <form onSubmit={submit} className="surface-card p-8 lg:p-10">
              <span className="grid size-12 place-items-center rounded-full bg-cyan-100 text-cyan-600">
                <Lock className="size-5" aria-hidden />
              </span>
              <h2 className="font-display mt-6 text-[1.75rem] text-navy-900">
                {t.staff.heading}
              </h2>
              <p className="type-lead mt-3">{t.staff.body}</p>

              <label className="mt-8 block">
                <span className="text-[0.8125rem] font-semibold text-ink-700">
                  {t.staff.passwordLabel}
                </span>
                <input
                  type="password"
                  value={value}
                  onChange={(e) => {
                    setValue(e.target.value);
                    setWrong(false);
                  }}
                  placeholder={t.staff.passwordPlaceholder}
                  autoComplete="off"
                  className="mt-2 h-12 w-full rounded-xl border border-cream-400 bg-cream-100 px-4 text-[0.9375rem] text-ink-900 focus:border-cyan-500 focus:bg-white focus:outline-none"
                />
              </label>

              {wrong && (
                <p className="mt-3 text-[0.875rem] text-ember-600">{t.staff.wrong}</p>
              )}

              <Button type="submit" size="lg" className="mt-7 w-full sm:w-auto" arrow>
                {t.staff.submit}
              </Button>
            </form>
          </Reveal>
        ) : (
          <Reveal variant="up">
            <div className="flex items-start justify-between gap-6">
              <div>
                <Eyebrow>{t.staff.title}</Eyebrow>
                <h2 className="type-display-sm mt-4 text-navy-900">
                  {t.staff.heading}
                </h2>
              </div>
              <button
                type="button"
                onClick={signOut}
                className="inline-flex shrink-0 items-center gap-2 rounded-full border border-cream-400 px-4 py-2 text-[0.8125rem] font-semibold text-ink-700 transition-colors hover:border-navy-300 hover:text-navy-900"
              >
                <LogOut className="size-3.5" aria-hidden />
                {t.staff.signOut}
              </button>
            </div>

            <ul className="mt-9 divide-y divide-cream-300 border-y border-cream-300">
              {staffLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group flex items-center justify-between gap-4 py-5"
                  >
                    <span className="font-display text-[1.25rem] text-navy-900 transition-colors group-hover:text-cyan-600">
                      {pick(link.label)}
                    </span>
                    <ExternalLink
                      className="size-4 shrink-0 text-ink-400 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan-600"
                      aria-hidden
                    />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        )}
      </div>
    </Section>
  );
}
