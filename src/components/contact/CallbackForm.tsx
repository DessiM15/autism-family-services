"use client";

import { useState } from "react";
import { AlertCircle, Check, ShieldAlert } from "lucide-react";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type Status = "idle" | "sending" | "sent" | "error";

/**
 * Deliberately NOT a clinical intake form.
 *
 * The moment a public form asks about a child's diagnosis it is collecting
 * protected health information, which brings HIPAA obligations that a
 * marketing site should not be carrying. So this collects only what is
 * needed to return a phone call, and says so plainly.
 */
export function CallbackForm({ defaultReason }: { defaultReason?: string }) {
  const { t, locale } = useLocale();
  const [status, setStatus] = useState<Status>("idle");

  const bestTimes = ["morning", "afternoon", "evening", "anytime"] as const;
  const reasons = [
    "newClient",
    "existingClient",
    "school",
    "billing",
    "careers",
    "other",
  ] as const;

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    // Honeypot — a real person never fills this in.
    if (data.company) return;

    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, locale }),
      });
      if (!response.ok) throw new Error("Request failed");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="surface-card flex flex-col items-start p-8 lg:p-10">
        <span className="grid size-12 place-items-center rounded-full bg-cyan-100 text-cyan-600">
          <Check className="size-6" aria-hidden />
        </span>
        <h3 className="font-display mt-6 text-[1.75rem] text-navy-900">
          {t.contact.successHeading}
        </h3>
        <p className="type-lead mt-3">{t.contact.successBody}</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-7 text-[0.9375rem] font-semibold text-cyan-600 hover:text-navy-900"
        >
          {t.startHere.startOver}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="surface-card p-7 lg:p-9" noValidate={false}>
      <h2 className="font-display text-[1.75rem] text-navy-900">
        {t.contact.formHeading}
      </h2>

      {/* The rule that keeps this form out of HIPAA territory. */}
      <p className="mt-5 flex items-start gap-3 rounded-xl border border-ember-300/50 bg-ember-100/50 p-4 text-[0.8125rem] leading-relaxed text-ink-700">
        <ShieldAlert className="mt-0.5 size-4 shrink-0 text-ember-600" aria-hidden />
        {t.contact.phiNotice}
      </p>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <Field label={t.contact.fields.name} name="name" required autoComplete="name" />
        <Field
          label={t.contact.fields.phone}
          name="phone"
          type="tel"
          required
          autoComplete="tel"
        />
        <Field
          label={t.contact.fields.email}
          name="email"
          type="email"
          autoComplete="email"
          className="sm:col-span-2"
          optional
        />

        <Select label={t.contact.fields.reason} name="reason" defaultValue={defaultReason}>
          {reasons.map((key) => (
            <option key={key} value={key}>
              {t.contact.reasons[key]}
            </option>
          ))}
        </Select>

        <Select label={t.contact.fields.bestTime} name="bestTime">
          {bestTimes.map((key) => (
            <option key={key} value={key}>
              {t.contact.bestTimes[key]}
            </option>
          ))}
        </Select>

        <Select
          label={t.contact.fields.preferredLanguage}
          name="preferredLanguage"
          defaultValue={locale}
          className="sm:col-span-2"
        >
          <option value="en">English</option>
          <option value="es">Español</option>
        </Select>

        <div className="sm:col-span-2">
          <label className="block">
            <span className="text-[0.8125rem] font-semibold text-ink-700">
              {t.contact.fields.message}{" "}
              <span className="font-normal text-ink-400">({t.common.optional})</span>
            </span>
            <textarea
              name="message"
              rows={4}
              maxLength={1200}
              placeholder={t.contact.fields.messagePlaceholder}
              className="mt-2 w-full resize-none rounded-xl border border-cream-400 bg-cream-100 px-4 py-3 text-[0.9375rem] text-ink-900 placeholder:text-ink-400 focus:border-cyan-500 focus:bg-white focus:outline-none"
            />
          </label>
        </div>
      </div>

      {/* Honeypot */}
      <div aria-hidden className="absolute h-0 w-0 overflow-hidden">
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {status === "error" && (
        <p className="mt-6 flex items-start gap-2.5 rounded-xl bg-ember-100 p-4 text-[0.875rem] text-ember-600">
          <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden />
          <span>
            <strong className="block">{t.contact.errorHeading}</strong>
            {t.contact.errorBody}
          </span>
        </p>
      )}

      <Button
        type="submit"
        size="lg"
        arrow
        disabled={status === "sending"}
        className="mt-8 w-full sm:w-auto"
      >
        {status === "sending" ? t.contact.submitting : t.contact.submit}
      </Button>
    </form>
  );
}

/* ------------------------------------------------------------------ */

function Field({
  label,
  name,
  type = "text",
  required = false,
  optional = false,
  autoComplete,
  className,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  optional?: boolean;
  autoComplete?: string;
  className?: string;
}) {
  const { t } = useLocale();
  return (
    <label className={cn("block", className)}>
      <span className="text-[0.8125rem] font-semibold text-ink-700">
        {label}{" "}
        {optional && <span className="font-normal text-ink-400">({t.common.optional})</span>}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        autoComplete={autoComplete}
        maxLength={160}
        className="mt-2 h-12 w-full rounded-xl border border-cream-400 bg-cream-100 px-4 text-[0.9375rem] text-ink-900 focus:border-cyan-500 focus:bg-white focus:outline-none"
      />
    </label>
  );
}

function Select({
  label,
  name,
  children,
  defaultValue,
  className,
}: {
  label: string;
  name: string;
  children: React.ReactNode;
  defaultValue?: string;
  className?: string;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="text-[0.8125rem] font-semibold text-ink-700">{label}</span>
      <select
        name={name}
        defaultValue={defaultValue}
        className="mt-2 h-12 w-full rounded-xl border border-cream-400 bg-cream-100 px-4 text-[0.9375rem] text-ink-900 focus:border-cyan-500 focus:bg-white focus:outline-none"
      >
        {children}
      </select>
    </label>
  );
}
