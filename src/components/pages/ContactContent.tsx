"use client";

import { Mail, MapPin, Phone, Printer } from "lucide-react";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { Section, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { CallbackForm } from "@/components/contact/CallbackForm";
import { site, fullAddress, mapsHref } from "@/lib/site";
import { telHref } from "@/lib/utils";

export function ContactContent() {
  const { t } = useLocale();

  return (
    <>
      <Section tone="cream" size="md">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
            {/* -------------------------------------- Details */}
            <div className="lg:col-span-5">
              <Reveal variant="up">
                <Eyebrow>{t.contact.title}</Eyebrow>
              </Reveal>

              <div className="mt-8 space-y-6">
                <Reveal variant="up" delay={0.05}>
                  <Detail
                    icon={<Phone className="size-5" aria-hidden />}
                    label={t.common.phoneLabel}
                  >
                    <a
                      href={telHref(site.phone)}
                      className="font-display text-[2rem] leading-none text-navy-900 hover:text-cyan-600"
                    >
                      {site.phone}
                    </a>
                  </Detail>
                </Reveal>

                <Reveal variant="up" delay={0.1}>
                  <Detail
                    icon={<Mail className="size-5" aria-hidden />}
                    label={t.common.emailLabel}
                  >
                    <a
                      href={`mailto:${site.email}`}
                      className="link-draw break-all text-[1.0625rem] text-ink-700"
                    >
                      {site.email}
                    </a>
                  </Detail>
                </Reveal>

                <Reveal variant="up" delay={0.15}>
                  <Detail
                    icon={<Printer className="size-5" aria-hidden />}
                    label={t.common.faxLabel}
                  >
                    <span className="text-[1.0625rem] text-ink-700">{site.fax}</span>
                  </Detail>
                </Reveal>

                <Reveal variant="up" delay={0.2}>
                  <Detail
                    icon={<MapPin className="size-5" aria-hidden />}
                    label={t.common.clinicLocation}
                  >
                    <a
                      href={mapsHref()}
                      target="_blank"
                      rel="noreferrer"
                      className="link-draw text-[1.0625rem] text-ink-700"
                    >
                      {fullAddress()}
                    </a>
                  </Detail>
                </Reveal>
              </div>

              {/* Map */}
              <Reveal variant="up" delay={0.26}>
                <div className="mt-10 overflow-hidden rounded-2xl border border-cream-300">
                  <iframe
                    title={t.contact.mapLabel}
                    src={`https://www.google.com/maps?q=${encodeURIComponent(fullAddress())}&output=embed`}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="h-[300px] w-full border-0"
                  />
                </div>
              </Reveal>
            </div>

            {/* -------------------------------------- Form */}
            <div className="lg:col-span-7">
              <Reveal variant="up" delay={0.1}>
                <CallbackForm />
              </Reveal>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

function Detail({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4">
      <span className="mt-0.5 grid size-11 shrink-0 place-items-center rounded-full bg-cyan-100 text-cyan-600">
        {icon}
      </span>
      <span className="min-w-0">
        <span className="type-eyebrow block text-ink-400">{label}</span>
        <span className="mt-1.5 block">{children}</span>
      </span>
    </div>
  );
}
