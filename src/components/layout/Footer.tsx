"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone, Printer, LifeBuoy } from "lucide-react";
import { FacebookIcon, YouTubeIcon } from "@/components/ui/SocialIcons";
import { site, fullAddress, mapsHref } from "@/lib/site";
import { telHref } from "@/lib/utils";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { LanguageToggle } from "@/components/i18n/LanguageToggle";
import { CalmToggle } from "@/components/calm/CalmToggle";

export function Footer() {
  const { t, href } = useLocale();
  const year = new Date().getFullYear();

  const explore = [
    { href: "/start-here", label: t.home.heroCtaPrimary },
    { href: "/services", label: t.servicesPage.title },
    { href: "/team", label: t.teamPage.title },
    { href: "/first-visit", label: t.firstVisit.title },
    { href: "/grants", label: t.grantsPage.title },
    { href: "/aba", label: t.abaPage.title },
    { href: "/gen-xy", label: t.genXY.title },
    { href: "/careers", label: t.careers.title },
    { href: "/whats-happening", label: t.whatsHappening.title },
    { href: "/events", label: t.events.title },
    { href: "/contact", label: t.contact.title },
  ];

  return (
    <footer className="relative bg-navy-950 text-cream-100">
      {/* ---------------------------------------------- Crisis strip */}
      <div className="border-b border-cream-100/10 bg-ember-600/95">
        <div className="container-page py-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-3">
              <LifeBuoy className="mt-0.5 size-5 shrink-0" aria-hidden />
              <div>
                <p className="font-semibold">{t.footer.crisisHeading}</p>
                <p className="mt-0.5 max-w-2xl text-[0.875rem] leading-relaxed text-cream-100/85">
                  {t.footer.crisisBody}
                </p>
              </div>
            </div>
            <ul className="flex flex-wrap gap-2.5">
              {site.crisis.map((line) => (
                <li key={line.label}>
                  <a
                    href={line.href}
                    className="inline-flex flex-col rounded-xl bg-navy-950/25 px-4 py-2.5 transition-colors hover:bg-navy-950/45"
                  >
                    <span className="text-[0.6875rem] tracking-wide text-cream-100/75">
                      {line.label}
                    </span>
                    <span className="font-semibold">{line.value}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------- Main */}
      <div className="container-page py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Image
              src="/brand/logo-lockup.png"
              alt={site.name}
              width={1018}
              height={421}
              className="h-14 w-auto brightness-0 invert"
            />
            <p className="mt-6 max-w-sm text-[0.9375rem] leading-relaxed text-cream-100/70">
              {t.footer.tagline}
            </p>
            <p className="mt-6 font-display text-2xl text-cyan-300">
              “{t.footer.motto}”
            </p>

            <div className="mt-8 flex items-center gap-3">
              <Social href={site.social.facebook} label="Facebook">
                <FacebookIcon className="size-4" />
              </Social>
              <Social href={site.social.youtube} label="YouTube">
                <YouTubeIcon className="size-4" />
              </Social>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <LanguageToggle tone="light" />
              <CalmToggle tone="light" />
            </div>
          </div>

          {/* Explore */}
          <div className="lg:col-span-3">
            <p className="type-eyebrow mb-5 text-cyan-300">{t.footer.navHeading}</p>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-2 lg:grid-cols-1">
              {explore.map((link) => (
                <li key={link.href}>
                  <Link
                    href={href(link.href)}
                    className="link-draw text-[0.9375rem] text-cream-100/80 transition-colors hover:text-cream-50"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-5">
            <p className="type-eyebrow mb-5 text-cyan-300">{t.footer.contactHeading}</p>
            <ul className="space-y-5">
              <li>
                <ContactRow icon={<Phone className="size-4" aria-hidden />} label={t.common.phoneLabel}>
                  <a href={telHref(site.phone)} className="link-draw text-lg font-semibold">
                    {site.phone}
                  </a>
                  <span lang="es" className="mt-1 block text-[0.8125rem] text-cyan-300">
                    {t.spanish.badge}
                  </span>
                </ContactRow>
              </li>
              <li>
                <ContactRow icon={<Mail className="size-4" aria-hidden />} label={t.common.emailLabel}>
                  <a href={`mailto:${site.email}`} className="link-draw break-all">
                    {site.email}
                  </a>
                </ContactRow>
              </li>
              <li>
                <ContactRow icon={<Printer className="size-4" aria-hidden />} label={t.common.faxLabel}>
                  <span>{site.fax}</span>
                </ContactRow>
              </li>
              <li>
                <ContactRow icon={<MapPin className="size-4" aria-hidden />} label={t.common.clinicLocation}>
                  <a
                    href={mapsHref()}
                    target="_blank"
                    rel="noreferrer"
                    className="link-draw"
                  >
                    {fullAddress()}
                  </a>
                </ContactRow>
              </li>
            </ul>
          </div>
        </div>

        {/* ---------------------------------------------- Base */}
        <div className="mt-14 border-t border-cream-100/10 pt-8">
          <div className="flex flex-col gap-5 text-[0.8125rem] text-cream-100/55 lg:flex-row lg:items-center lg:justify-between">
            <p>
              © {year} {t.footer.rights}
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <Link href={href("/staff")} className="link-draw hover:text-cream-100">
                {t.footer.staffPortal}
              </Link>
            </div>
          </div>
          <p className="mt-5 max-w-3xl text-[0.75rem] leading-relaxed text-cream-100/40">
            {t.footer.photoDisclosure}
          </p>
        </div>
      </div>
    </footer>
  );
}

function ContactRow({
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
      <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-full bg-cream-100/10 text-cyan-300">
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block text-[0.75rem] tracking-wide text-cream-100/50">{label}</span>
        <span className="block text-cream-100/90">{children}</span>
      </span>
    </div>
  );
}

function Social({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="grid size-10 place-items-center rounded-full border border-cream-100/20 text-cream-100/80 transition-colors hover:border-cyan-300 hover:text-cyan-300"
    >
      {children}
    </a>
  );
}
