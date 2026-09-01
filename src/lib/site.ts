/**
 * Single source of truth for the organisation's real-world details.
 * Everything here is taken verbatim from autismbmt.org.
 */
export const site = {
  name: "Autism Family Services of Beaumont",
  legalName: "Autism Family Services of Beaumont, LLC & Counseling Center",
  shortName: "AFS Beaumont",
  url: "https://www.autismbmt.org",
  tagline: "If you do it, do it on purpose!",

  phone: "409-242-1559",
  billingPhone: "409-242-1559",
  fax: "409-242-1589",
  email: "Jay.Ramirez@AutismBMT.org",

  address: {
    street: "6642 Phelan Blvd",
    city: "Beaumont",
    state: "TX",
    zip: "77706",
    country: "US",
  },
  /** Beaumont, TX — used for the map embed and LocalBusiness schema. */
  geo: { lat: 30.0836, lng: -94.1697 },

  social: {
    facebook: "https://www.facebook.com/AutismFamilyServicesOfBeaumont",
    youtube: "https://www.youtube.com/@autismfamilyservicesofbea8676",
    pinterest: "https://www.pinterest.com/jenramTRENDS/",
  },

  /** Crisis lines. Surfaced in the footer on every page, in both languages. */
  crisis: [
    { label: "988 Suicide & Crisis Lifeline", value: "988", href: "tel:988" },
    {
      label: "Crisis Text Line",
      value: "Text HOME to 741741",
      href: "sms:741741&body=HOME",
    },
    {
      label: "Texas Health & Human Services Crisis Line",
      value: "1-800-989-6884",
      href: "tel:+18009896884",
    },
  ],
} as const;

export function fullAddress() {
  const a = site.address;
  return `${a.street}, ${a.city}, ${a.state} ${a.zip}`;
}

export function mapsHref() {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${site.legalName}, ${fullAddress()}`,
  )}`;
}
