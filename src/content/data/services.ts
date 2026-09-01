import type { Localized } from "./team";

export type Audience = "families" | "schools" | "adults";

export interface Service {
  slug: string;
  name: Localized;
  /** Verbatim descriptor from the current site, where one exists. */
  blurb?: Localized;
  duration?: Localized;
  rate: Localized;
  audience: Audience;
  image?: string;
  /** Longer supporting copy we add for the new site. */
  detail?: Localized;
}

export const services: Service[] = [
  {
    slug: "aba-therapy",
    name: { en: "Applied Behavior Analysis (ABA) Therapy", es: "Terapia de Análisis Conductual Aplicado (ABA)" },
    blurb: {
      en: "Behavioral therapy for individuals ages 3–Adult",
      es: "Terapia conductual para personas de 3 años a la edad adulta",
    },
    duration: { en: "45 min", es: "45 min" },
    rate: { en: "$150 – $225", es: "$150 – $225" },
    audience: "families",
    image: "/images/service-aba.jpg",
    detail: {
      en: "We deliver ABA through a naturalistic teaching style — built around play, motivation and real moments — rather than the rigid drill format many families expect.",
      es: "Ofrecemos ABA mediante un estilo de enseñanza naturalista — basado en el juego, la motivación y los momentos reales — en lugar del formato rígido de repeticiones que muchas familias esperan.",
    },
  },
  {
    slug: "autism-diagnostic-services",
    name: { en: "Autism Diagnostic Services", es: "Servicios de Diagnóstico de Autismo" },
    blurb: { en: "Determining the diagnosis of Autism", es: "Determinación del diagnóstico de autismo" },
    duration: { en: "14 hr", es: "14 h" },
    rate: { en: "Contact for Rate", es: "Consulte la tarifa" },
    audience: "families",
    image: "/images/service-diagnostics.jpg",
    detail: {
      en: "Evaluations use gold-standard protocols including GARS, ADI-R, Sensory Profile, AFLS, VB-MAPP and BASC-3.",
      es: "Las evaluaciones utilizan protocolos de referencia como GARS, ADI-R, Sensory Profile, AFLS, VB-MAPP y BASC-3.",
    },
  },
  {
    slug: "parent-training",
    name: { en: "Parent Training", es: "Capacitación para Padres" },
    blurb: { en: "Available Online", es: "Disponible en línea" },
    duration: { en: "45 min", es: "45 min" },
    rate: { en: "$120 – $175", es: "$120 – $175" },
    audience: "families",
    image: "/images/service-parent-training.jpg",
  },
  {
    slug: "social-skills-groups",
    name: { en: "Social Skills Groups", es: "Grupos de Habilidades Sociales" },
    blurb: {
      en: "An in person, program that teaches social skills to children ages 5-17",
      es: "Un programa presencial que enseña habilidades sociales a niños de 5 a 17 años",
    },
    rate: { en: "$55", es: "$55" },
    audience: "families",
    image: "/images/service-social-skills.jpg",
  },
  {
    slug: "parent-support-workshops",
    name: { en: "Parent Support Workshops", es: "Talleres de Apoyo para Padres" },
    blurb: {
      en: "once-per-month parent support group (in person)",
      es: "grupo de apoyo para padres una vez al mes (presencial)",
    },
    rate: { en: "$65", es: "$65" },
    audience: "families",
  },
  {
    slug: "academic-sped-tutoring",
    name: { en: "Academic SPED Tutoring", es: "Tutoría Académica de Educación Especial" },
    duration: { en: "45 min", es: "45 min" },
    rate: { en: "$65", es: "$65" },
    audience: "families",
    image: "/images/service-tutoring.jpg",
  },
  {
    slug: "functional-behavior-assessment",
    name: { en: "Functional Behavior Assessment", es: "Evaluación Conductual Funcional" },
    blurb: { en: "Includes written report / Flat Rate", es: "Incluye informe escrito / Tarifa fija" },
    duration: { en: "9 hr", es: "9 h" },
    rate: { en: "Contact for Rate", es: "Consulte la tarifa" },
    audience: "families",
  },
  {
    slug: "behavior-intervention-plan",
    name: { en: "Behavior Intervention Plan (Report)", es: "Plan de Intervención Conductual (Informe)" },
    duration: { en: "5 hr", es: "5 h" },
    rate: { en: "Contact for Rate", es: "Consulte la tarifa" },
    audience: "families",
  },

  /* ---------------- Schools ---------------- */
  {
    slug: "school-district-support",
    name: { en: "School District Support", es: "Apoyo a Distritos Escolares" },
    blurb: {
      en: "Provide programming, consultation and training to GenEd and SPED personnel for districts.",
      es: "Ofrecemos programación, consultoría y capacitación al personal de educación general y especial de los distritos.",
    },
    duration: { en: "1 hr", es: "1 h" },
    rate: { en: "Contact for Rate", es: "Consulte la tarifa" },
    audience: "schools",
    image: "/images/service-schools.jpg",
  },
  {
    slug: "crisis-intervention-plan",
    name: { en: "Crisis Intervention Plan (Report)", es: "Plan de Intervención en Crisis (Informe)" },
    blurb: {
      en: "This plan helps staff coordinate a safe approach to student behaviors.",
      es: "Este plan ayuda al personal a coordinar un enfoque seguro ante las conductas de los estudiantes.",
    },
    duration: { en: "5 hr", es: "5 h" },
    rate: { en: "Contact for Rate", es: "Consulte la tarifa" },
    audience: "schools",
  },
  {
    slug: "esy-autism-support",
    name: { en: "ESY Autism Support Services", es: "Servicios de Apoyo de Autismo para ESY" },
    blurb: {
      en: "Providing AU Support for area school districts during ESY.",
      es: "Brindamos apoyo en autismo a los distritos escolares de la zona durante el programa ESY.",
    },
    duration: { en: "4 hr", es: "4 h" },
    rate: { en: "Contact for Rate", es: "Consulte la tarifa" },
    audience: "schools",
  },
  {
    slug: "professional-development",
    name: { en: "Professional Development Presentation", es: "Presentación de Desarrollo Profesional" },
    blurb: {
      en: "Professional, Engaging, Quality Presentations for your PD needs.",
      es: "Presentaciones profesionales, atractivas y de calidad para sus necesidades de desarrollo profesional.",
    },
    duration: { en: "15 min", es: "15 min" },
    rate: { en: "Contact for Rate", es: "Consulte la tarifa" },
    audience: "schools",
  },
  {
    slug: "school-mental-health",
    name: { en: "School District Mental Health Services", es: "Servicios de Salud Mental para Distritos Escolares" },
    blurb: {
      en: "Plans available to assist with mental health services",
      es: "Hay planes disponibles para apoyar con servicios de salud mental",
    },
    duration: { en: "1 hr", es: "1 h" },
    rate: { en: "Contact for Rate", es: "Consulte la tarifa" },
    audience: "schools",
  },

  /* ---------------- Counseling ---------------- */
  {
    slug: "individual-counseling",
    name: { en: "Individual Counseling", es: "Consejería Individual" },
    blurb: { en: "A way to focus your thoughts!", es: "¡Una manera de enfocar tus pensamientos!" },
    duration: { en: "1 hr", es: "1 h" },
    rate: { en: "$130", es: "$130" },
    audience: "adults",
    image: "/images/service-counseling.jpg",
  },
  {
    slug: "couples-family-counseling",
    name: { en: "Couples or Family Counseling", es: "Consejería de Pareja o Familiar" },
    duration: { en: "45 min", es: "45 min" },
    rate: { en: "$150", es: "$150" },
    audience: "adults",
    image: "/images/service-genxy.jpg",
  },
];

export const audienceMeta: Record<Audience, { label: Localized; blurb: Localized }> = {
  families: {
    label: { en: "For Families", es: "Para Familias" },
    blurb: {
      en: "Therapy, assessment and training for children, teens and adults — and for the people who care for them.",
      es: "Terapia, evaluación y capacitación para niños, adolescentes y adultos — y para quienes los cuidan.",
    },
  },
  schools: {
    label: { en: "For Schools & Districts", es: "Para Escuelas y Distritos" },
    blurb: {
      en: "Consultation, staff training and direct support for GenEd and SPED teams across Southeast Texas.",
      es: "Consultoría, capacitación de personal y apoyo directo para equipos de educación general y especial en el sureste de Texas.",
    },
  },
  adults: {
    label: { en: "Counseling", es: "Consejería" },
    blurb: {
      en: "Individual, couples and family counseling through our Gen XY Counseling Center.",
      es: "Consejería individual, de pareja y familiar a través de nuestro Gen XY Counseling Center.",
    },
  },
};

export function servicesFor(audience: Audience) {
  return services.filter((s) => s.audience === audience);
}
