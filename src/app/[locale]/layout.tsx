import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";

import { LOCALES, isLocale, type Locale } from "@/lib/i18n";
import { LocaleProvider } from "@/components/i18n/LocaleProvider";
import { getDictionary } from "@/lib/dictionary";
import { CalmModeProvider, calmModeScript } from "@/components/calm/CalmModeProvider";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { Header } from "@/components/layout/Header";
import { HeaderToneProvider } from "@/components/layout/HeaderTone";
import { Footer } from "@/components/layout/Footer";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { site } from "@/lib/site";

/* A warm high-contrast serif against a quiet grotesque. Fraunces' soft axis
   keeps the display type from feeling institutional. */
const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  axes: ["SOFT", "WONK", "opsz"],
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const viewport: Viewport = {
  themeColor: "#001E64",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEs = locale === "es";

  const title = isEs
    ? "Autism Family Services of Beaumont | Terapia ABA y Consejería"
    : "Autism Family Services of Beaumont | ABA Therapy & Counseling";

  const description = isEs
    ? "El primer y único Centro Certificado en Autismo de Beaumont. Terapia ABA, diagnóstico de autismo y consejería para familias, escuelas y personas en el sureste de Texas."
    : "Beaumont's first and only Certified Autism Center. ABA therapy, autism diagnostics and counseling for families, schools and individuals across Southeast Texas.";

  return {
    metadataBase: new URL(site.url),
    title: { default: title, template: `%s | ${site.name}` },
    description,
    applicationName: site.name,
    keywords: [
      "ABA therapy Beaumont",
      "autism Beaumont TX",
      "autism diagnosis Beaumont",
      "Certified Autism Center",
      "counseling Beaumont",
      "terapia ABA Beaumont",
      "autismo Beaumont",
    ],
    alternates: {
      canonical: `/${locale}`,
      languages: { en: "/en", es: "/es", "x-default": "/en" },
    },
    openGraph: {
      type: "website",
      locale: isEs ? "es_US" : "en_US",
      alternateLocale: isEs ? "en_US" : "es_US",
      siteName: site.name,
      title,
      description,
      url: `/${locale}`,
      images: [{ url: "/images/hero-01.jpg", width: 2400, height: 1600, alt: site.name }],
    },
    twitter: { card: "summary_large_image", title, description },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const t = getDictionary(locale as Locale);

  /* Local SEO is how a Beaumont clinic actually gets found. */
  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "@id": `${site.url}#organization`,
    name: site.legalName,
    alternateName: site.name,
    url: site.url,
    telephone: site.phone,
    faxNumber: site.fax,
    email: site.email,
    slogan: site.tagline,
    image: `${site.url}/brand/logo.png`,
    logo: `${site.url}/brand/logo.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.state,
      postalCode: site.address.zip,
      addressCountry: site.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.lat,
      longitude: site.geo.lng,
    },
    areaServed: { "@type": "AdministrativeArea", name: "Southeast Texas" },
    availableLanguage: ["English", "Spanish"],
    medicalSpecialty: ["Psychiatric", "Pediatric"],
    sameAs: [site.social.facebook, site.social.youtube, site.social.pinterest],
    employee: {
      "@type": "Person",
      name: "Jennifer Ramirez",
      jobTitle: "Clinic Director",
      honorificSuffix: "M.Ed., LPC, LBA, ACAS, QBA",
      description:
        "Beaumont's only Advanced Certified Autism Specialist. Licensed Professional Counselor and Licensed Behavior Analyst in Texas.",
      image: `${site.url}/images/team/jennifer.jpg`,
    },
    description:
      "Autism Family Services of Beaumont is Beaumont's first and only Certified Autism Center, providing ABA therapy, autism diagnostic services, counseling, parent training and school district support.",
  };

  return (
    <html
      lang={locale}
      className={`${fraunces.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body>
        {/*
          These live at the top of <body>, not in <head>. The App Router owns
          <head> and reconciles it itself; raw script tags placed there produce
          an intermittent hydration mismatch. As the first thing in the body,
          the calm script still runs before any content paints.
        */}
        <script dangerouslySetInnerHTML={{ __html: calmModeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        <CalmModeProvider>
          <LocaleProvider locale={locale as Locale}>
            <SmoothScroll />
            <HeaderToneProvider>
              <Header />
              <main id="main">{children}</main>
            </HeaderToneProvider>
            <Footer />
            <ChatWidget />
            <a
              href="#main"
              className="sr-only focus:not-sr-only focus:fixed focus:bottom-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-navy-900 focus:px-5 focus:py-3 focus:text-cream-50"
            >
              {t.common.backToTop}
            </a>
          </LocaleProvider>
        </CalmModeProvider>
      </body>
    </html>
  );
}
