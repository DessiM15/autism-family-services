import Link from "next/link";
import { getDictionary } from "@/lib/dictionary";
import { DEFAULT_LOCALE } from "@/lib/i18n";

/**
 * The locale isn't available to a not-found boundary, so this falls back to
 * English and offers both languages' entry points rather than guessing.
 */
export default function NotFound() {
  const t = getDictionary(DEFAULT_LOCALE);

  const links = [
    { href: "/en", label: "Home" },
    { href: "/en/services", label: t.servicesPage.title },
    { href: "/en/team", label: t.teamPage.title },
    { href: "/en/contact", label: t.contact.title },
    { href: "/es", label: "Inicio (Español)" },
  ];

  return (
    <section className="grid min-h-[70svh] place-items-center bg-cream-100 px-6 py-24">
      <div className="w-full max-w-xl text-center">
        <p className="font-display text-[clamp(4rem,14vw,9rem)] leading-none brand-gradient">
          404
        </p>
        <h1 className="type-display-sm mt-6 text-navy-900">{t.notFound.heading}</h1>
        <p className="type-lead mt-4">{t.notFound.body}</p>

        <ul className="mt-10 flex flex-wrap justify-center gap-2.5">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="inline-flex h-11 items-center rounded-full border border-cream-400 bg-cream-50 px-5 text-[0.9375rem] font-semibold text-navy-900 transition-colors hover:border-navy-300"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
