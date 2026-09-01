"use client";

import { useMemo, useState } from "react";
import { ExternalLink, Search, SlidersHorizontal, X } from "lucide-react";
import {
  grants,
  grantUseLabels,
  type GrantUse,
} from "@/content/data/grants";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

type ScopeFilter = "all" | "texas" | "national";

const amountSteps = [0, 500, 1000, 2500, 5000] as const;

export function GrantFinder() {
  const { t, pick, locale } = useLocale();

  const [query, setQuery] = useState("");
  const [use, setUse] = useState<GrantUse | "all">("all");
  const [minAmount, setMinAmount] = useState<number>(0);
  const [scope, setScope] = useState<ScopeFilter>("all");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return grants.filter((g) => {
      if (use !== "all" && !g.uses.includes(use)) return false;
      if (scope !== "all" && g.scope !== scope) return false;
      // A grant with no published ceiling stays in the list — filtering it
      // out would hide options that may well be large enough.
      if (minAmount > 0 && g.maxAward !== null && g.maxAward < minAmount) return false;
      if (q) {
        const haystack = `${g.name} ${g.description[locale]}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [query, use, minAmount, scope, locale]);

  const dirty = query !== "" || use !== "all" || minAmount !== 0 || scope !== "all";

  const reset = () => {
    setQuery("");
    setUse("all");
    setMinAmount(0);
    setScope("all");
  };

  return (
    <div className="container-page">
      {/* ------------------------------------------------ Disclaimer */}
      <Reveal variant="up">
        <div className="rounded-2xl border border-ember-300/50 bg-ember-100/60 p-6 lg:p-7">
          <p className="text-[1.0625rem] font-semibold text-navy-900">
            {t.grantsPage.disclaimer}
          </p>
          <p className="mt-2 text-[0.875rem] leading-relaxed text-ink-500">
            {t.grantsPage.disclaimerNote}
          </p>
        </div>
      </Reveal>

      {/* ------------------------------------------------ Controls */}
      <div className="mt-10 lg:sticky lg:top-0 lg:z-30 lg:bg-cream-100 lg:pt-4 lg:pb-3">
        <div className="rounded-2xl border border-cream-300 bg-cream-50/95 p-4 shadow-[0_10px_30px_-20px_rgba(0,30,100,0.4)] backdrop-blur-lg lg:p-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <label className="relative flex-1">
              <span className="sr-only">{t.grantsPage.search}</span>
              <Search
                className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-ink-400"
                aria-hidden
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t.grantsPage.searchPlaceholder}
                className="h-12 w-full rounded-full border border-cream-400 bg-cream-100 pr-4 pl-11 text-[0.9375rem] text-ink-900 placeholder:text-ink-400 focus:border-cyan-500 focus:bg-white focus:outline-none"
              />
            </label>

            <button
              type="button"
              onClick={() => setFiltersOpen((v) => !v)}
              aria-expanded={filtersOpen}
              className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full border border-cream-400 px-5 text-[0.875rem] font-semibold text-navy-900 transition-colors hover:border-navy-300 lg:hidden"
            >
              <SlidersHorizontal className="size-4" aria-hidden />
              {t.grantsPage.filterUse}
            </button>
          </div>

          <div className={cn("mt-4 space-y-4", !filtersOpen && "hidden lg:block")}>
            {/* Use */}
            <Filter label={t.grantsPage.filterUse}>
              <Chip active={use === "all"} onClick={() => setUse("all")}>
                {t.grantsPage.allUses}
              </Chip>
              {(Object.keys(grantUseLabels) as GrantUse[]).map((key) => (
                <Chip key={key} active={use === key} onClick={() => setUse(key)}>
                  {pick(grantUseLabels[key])}
                </Chip>
              ))}
            </Filter>

            {/* Amount */}
            <Filter label={t.grantsPage.filterAmount}>
              {amountSteps.map((amount) => (
                <Chip
                  key={amount}
                  active={minAmount === amount}
                  onClick={() => setMinAmount(amount)}
                >
                  {amount === 0
                    ? t.grantsPage.allAmounts
                    : `$${amount.toLocaleString()}+`}
                </Chip>
              ))}
            </Filter>

            {/* Scope */}
            <Filter label={t.grantsPage.filterScope}>
              <Chip active={scope === "all"} onClick={() => setScope("all")}>
                {t.grantsPage.allScopes}
              </Chip>
              <Chip active={scope === "texas"} onClick={() => setScope("texas")}>
                {t.grantsPage.texasOnly}
              </Chip>
              <Chip active={scope === "national"} onClick={() => setScope("national")}>
                {t.grantsPage.nationwide}
              </Chip>
            </Filter>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------ Result count */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
        <p aria-live="polite" className="text-[0.9375rem] font-semibold text-navy-900">
          <span className="font-display text-[1.5rem]">{results.length}</span>{" "}
          {results.length === 1 ? t.grantsPage.resultsOne : t.grantsPage.resultsMany}
        </p>
        {dirty && (
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-1.5 text-[0.875rem] font-semibold text-cyan-600 hover:text-navy-900"
          >
            <X className="size-3.5" aria-hidden />
            {t.grantsPage.clearFilters}
          </button>
        )}
      </div>

      {/* ------------------------------------------------ Results */}
      {results.length === 0 ? (
        <p className="mt-12 rounded-2xl border border-dashed border-cream-400 p-12 text-center text-ink-500">
          {t.grantsPage.noResults}
        </p>
      ) : (
        <ul className="mt-6 grid gap-5 md:grid-cols-2">
          {results.map((grant) => (
            <li key={grant.slug}>
              <article className="surface-card flex h-full flex-col p-7 transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:shadow-[0_24px_50px_-24px_rgba(0,30,100,0.32)]">
                <div className="flex flex-wrap items-center gap-2">
                  {grant.maxAward !== null ? (
                    <span className="rounded-full bg-navy-900 px-3 py-1 text-[0.75rem] font-semibold text-cream-50">
                      {t.grantsPage.upTo} ${grant.maxAward.toLocaleString()}
                    </span>
                  ) : (
                    <span className="rounded-full bg-cream-300 px-3 py-1 text-[0.75rem] font-semibold text-ink-700">
                      {t.grantsPage.unspecified}
                    </span>
                  )}
                  {grant.scope === "texas" && (
                    <span className="rounded-full bg-ember-100 px-3 py-1 text-[0.75rem] font-semibold text-ember-600">
                      {t.grantsPage.texasOnly}
                    </span>
                  )}
                  {grant.incomeCap !== null && (
                    <span className="rounded-full border border-cream-400 px-3 py-1 text-[0.75rem] font-semibold text-ink-500">
                      {t.grantsPage.incomeUnder} ${grant.incomeCap.toLocaleString()}
                    </span>
                  )}
                </div>

                <h3 className="font-display mt-5 text-[1.375rem] leading-snug text-navy-900">
                  {grant.name}
                </h3>
                <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-ink-500">
                  {pick(grant.description)}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-1.5">
                  {grant.uses.map((u) => (
                    <span
                      key={u}
                      className="rounded-md bg-cyan-100/70 px-2 py-1 text-[0.6875rem] font-semibold text-cyan-600"
                    >
                      {pick(grantUseLabels[u])}
                    </span>
                  ))}
                </div>

                <a
                  href={grant.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="mt-6 inline-flex items-center gap-2 border-t border-cream-300 pt-5 text-[0.9375rem] font-semibold text-navy-900 transition-colors hover:text-cyan-600"
                >
                  {t.grantsPage.visitSite}
                  <ExternalLink className="size-3.5" aria-hidden />
                </a>
              </article>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */

function Filter({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <fieldset className="flex flex-wrap items-center gap-2">
      <legend className="sr-only">{label}</legend>
      <span className="type-eyebrow mr-1 w-full text-ink-400 lg:w-auto">{label}</span>
      {children}
    </fieldset>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-full border px-3.5 py-1.5 text-[0.8125rem] font-semibold transition-colors duration-200",
        active
          ? "border-navy-900 bg-navy-900 text-cream-50"
          : "border-cream-400 text-ink-700 hover:border-navy-300 hover:text-navy-900",
      )}
    >
      {children}
    </button>
  );
}
