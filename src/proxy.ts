import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_LOCALE, LOCALE_COOKIE, LOCALES, isLocale, matchLocale } from "@/lib/i18n";

const PUBLIC_FILE = /\.(.*)$/;

/**
 * The current site is a Wix build with machine-generated paths. If the new
 * site takes over autismbmt.org, these keep every existing inbound link and
 * every indexed page alive.
 */
const LEGACY_PATHS: Record<string, string> = {
  "/team-4": "/team",
  "/about-5": "/grants",
  "/get-involved-1": "/careers",
  "/ourservices": "/services",
  "/services-2": "/services",
  "/general-clean": "/whats-happening",
  "/newsletter": "/whats-happening",
  "/target-trends": "/about",
  "/experience-and-professional-goals": "/about",
  "/blank-1": "/",
  "/general-5": "/staff",
  "/general-7": "/staff",
  "/general-8": "/staff",
  "/curriculum-overview": "/staff",
  "/video-trainings": "/staff",
};


export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];

  // Retire the old Wix paths, with or without a locale prefix.
  const bare = isLocale(first) ? `/${segments.slice(1).join("/")}` : pathname;
  const replacement = LEGACY_PATHS[bare.replace(/\/$/, "") || "/"];
  if (replacement) {
    const target = request.nextUrl.clone();
    const locale = isLocale(first)
      ? first
      : isLocale(request.cookies.get(LOCALE_COOKIE)?.value)
        ? (request.cookies.get(LOCALE_COOKIE)!.value as typeof first)
        : matchLocale(request.headers.get("accept-language"));
    target.pathname = `/${locale}${replacement === "/" ? "" : replacement}`;
    return NextResponse.redirect(target, 308);
  }

  // Already locale-prefixed: nothing to decide.
  //
  // Note we deliberately do NOT write the cookie here. Only the language
  // toggle sets it, so a *detected* language never hardens into a remembered
  // "choice" — otherwise one visit on a shared computer or through a VPN
  // would lock the next person into the wrong language.
  if (isLocale(first)) {
    return NextResponse.next();
  }

  // No prefix. A deliberate past choice wins; otherwise read the browser.
  const saved = request.cookies.get(LOCALE_COOKIE)?.value;
  const locale = isLocale(saved)
    ? saved
    : matchLocale(request.headers.get("accept-language"));

  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};

export const supportedLocales = LOCALES;
export const fallbackLocale = DEFAULT_LOCALE;
