import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { StaffPortal } from "@/components/pages/StaffPortal";
import { getDictionary } from "@/lib/dictionary";
import { resolveLocale, type LocaleParams } from "@/lib/page-meta";

/** Internal resources should never appear in search results. */
export const metadata: Metadata = {
  title: "Staff Portal",
  robots: { index: false, follow: false },
};

export default async function StaffPage({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  const t = getDictionary(locale);
  const code = process.env.STAFF_ACCESS_CODE || "shape";

  return (
    <>
      <PageHero eyebrow={t.staff.title} title={t.staff.heading} lead={t.staff.body} />
      <StaffPortal accessCode={code} />
    </>
  );
}
