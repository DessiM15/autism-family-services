import type { Localized } from "./team";

export type GrantUse =
  | "aba"
  | "speech"
  | "equipment"
  | "medical"
  | "education"
  | "general";

export interface Grant {
  slug: string;
  name: string;
  url: string;
  description: Localized;
  /** Highest published award, in dollars. `null` when unspecified. */
  maxAward: number | null;
  /** Published household income ceiling, in dollars. */
  incomeCap: number | null;
  scope: "texas" | "national";
  uses: GrantUse[];
}

/**
 * Descriptions are reproduced verbatim from autismbmt.org/about-5.
 * Tags (uses / maxAward / incomeCap / scope) are derived from that same
 * copy so the finder can filter without changing a word of it.
 */
export const grants: Grant[] = [
  {
    slug: "sses",
    name: "Supplemental Special Education Services (SSES)",
    url: "https://tea.texas.gov/academics/special-student-populations/special-education/supplemental-special-education-services-sses",
    maxAward: 1500,
    incomeCap: null,
    scope: "texas",
    uses: ["education", "speech", "equipment"],
    description: {
      en: "The Supplemental Special Education Services (SSES) program is a one-time $1,500 online grant for parents/guardians of eligible students served by special education and who are enrolled in a Texas public school. Parents/guardians of eligible students can use the online accounts to shop the marketplace to obtain educational materials and resources such as textbooks, curriculum, or technology devices and/or services such as additional speech therapy, tutoring, or other specific services.",
      es: "El programa Supplemental Special Education Services (SSES) es una subvención en línea única de $1,500 para padres o tutores de estudiantes elegibles que reciben educación especial y están inscritos en una escuela pública de Texas. Los padres o tutores de estudiantes elegibles pueden usar las cuentas en línea para comprar en el mercado materiales y recursos educativos como libros de texto, currículo o dispositivos tecnológicos, y/o servicios como terapia del habla adicional, tutoría u otros servicios específicos.",
    },
  },
  {
    slug: "act-today",
    name: "ACT Today",
    url: "http://www.act-today.org/act-today-grant-program.php",
    maxAward: 5000,
    incomeCap: 100000,
    scope: "national",
    uses: ["aba", "speech", "medical", "equipment"],
    description: {
      en: "Act Today awards grants of up to $5,000 with priority given to families with household incomes less than $100,000. Funding may be used for ABA, speech therapy, OT, meds and home safety devices. There are quarterly grant deadlines.",
      es: "ACT Today otorga subvenciones de hasta $5,000, dando prioridad a familias con ingresos familiares menores a $100,000. Los fondos pueden usarse para ABA, terapia del habla, terapia ocupacional, medicamentos y dispositivos de seguridad en el hogar. Hay fechas límite trimestrales.",
    },
  },
  {
    slug: "aid-for-autistic-children",
    name: "Aid for Autistic Children Foundation",
    url: "http://www.aacfinc.org/contact.html",
    maxAward: 150000,
    incomeCap: null,
    scope: "national",
    uses: ["general"],
    description: {
      en: "The Aid for Autistic Children Foundation has financial assistance and charitable grants of up to $150,000 in total debt relief per household.",
      es: "La Aid for Autistic Children Foundation ofrece asistencia financiera y subvenciones caritativas de hasta $150,000 en alivio total de deudas por hogar.",
    },
  },
  {
    slug: "anchor-of-hope",
    name: "Anchor of Hope Foundation",
    url: "http://www.anchorofhopefoundation.com/",
    maxAward: 250,
    incomeCap: null,
    scope: "national",
    uses: ["general", "education"],
    description: {
      en: "Click on “Opportunities” and then “Special Needs Scholarship” to get the Anchor of Hope scholarship application and instructions. The maximum grant for special needs children for various uses is $250 per family.",
      es: "Haga clic en «Opportunities» y luego en «Special Needs Scholarship» para obtener la solicitud e instrucciones de la beca Anchor of Hope. La subvención máxima para niños con necesidades especiales, para diversos usos, es de $250 por familia.",
    },
  },
  {
    slug: "autism-cares",
    name: "Autism Cares",
    url: "http://www.autismcares.org/",
    maxAward: 1000,
    incomeCap: null,
    scope: "national",
    uses: ["general"],
    description: {
      en: "This Autism Cares webpage contains a direct link to the registration process for a Financial Support Award. These Awards are granted on a monthly basis to families who have experienced a qualifying event such as loss of employment. The maximum award per family is $1000.",
      es: "Esta página de Autism Cares contiene un enlace directo al proceso de registro para un Premio de Apoyo Financiero. Estos premios se otorgan mensualmente a familias que han vivido un evento calificador, como la pérdida del empleo. El monto máximo por familia es de $1,000.",
    },
  },
  {
    slug: "autism-family-resources",
    name: "Autism Family Resources Grants",
    url: "http://www.outreachautismservicesnetwork.org/www.autismfamilyresources.org",
    maxAward: 500,
    incomeCap: 50000,
    scope: "national",
    uses: ["equipment", "general"],
    description: {
      en: "One-time $500 grants are awarded to families in financial need; household income may not exceed $50,000 per year. All funds awarded are paid directly to the vendor or service provider to pay for therapy equipment, safety equipment or services. Email requests for an application along with name, address, phone number and email address to: info@autismfamilyresources.org",
      es: "Se otorgan subvenciones únicas de $500 a familias con necesidad económica; el ingreso familiar no puede superar los $50,000 al año. Todos los fondos otorgados se pagan directamente al proveedor o vendedor para cubrir equipo de terapia, equipo de seguridad o servicios. Envíe la solicitud junto con su nombre, dirección, teléfono y correo electrónico a: info@autismfamilyresources.org",
    },
  },
  {
    slug: "autism-now",
    name: "Autism Now State Support Grants and Cash Subsidies",
    url: "http://www.autismnow.org/funding-and-public-policy/family-support-grants-and-cash-subsidies/state",
    maxAward: null,
    incomeCap: null,
    scope: "national",
    uses: ["general"],
    description: {
      en: "The Autism Now webpage provides links to specific state family support grants or cash subsidies. Each resource has different qualifying amounts and eligibility criteria.",
      es: "La página de Autism Now ofrece enlaces a subvenciones estatales específicas de apoyo familiar o subsidios en efectivo. Cada recurso tiene montos y criterios de elegibilidad distintos.",
    },
  },
  {
    slug: "benefits-gov",
    name: "Benefits.gov",
    url: "http://www.benefits.gov/",
    maxAward: null,
    incomeCap: null,
    scope: "national",
    uses: ["general"],
    description: {
      en: "This website provides access to a “Benefit Finder” which offers multiple search methods to quickly find state and federal benefits you may be entitled to.",
      es: "Este sitio ofrece acceso a un «Benefit Finder» con varios métodos de búsqueda para encontrar rápidamente los beneficios estatales y federales a los que podría tener derecho.",
    },
  },
  {
    slug: "dcrf",
    name: "Disabled Children’s Relief Fund",
    url: "http://www.dcrf.com/ordereze/Content/1/Summary.aspx",
    maxAward: 200,
    incomeCap: null,
    scope: "national",
    uses: ["equipment", "medical"],
    description: {
      en: "DCRF grant applications may be used for modest requests of up to $200 for assistive devices or rehabilitative services. The online application is available between April and September.",
      es: "Las solicitudes de DCRF pueden usarse para peticiones modestas de hasta $200 para dispositivos de asistencia o servicios de rehabilitación. La solicitud en línea está disponible entre abril y septiembre.",
    },
  },
  {
    slug: "ezra-b-smith",
    name: "The Ezra B. Smith Foundation for Autism Therapy and Education",
    url: "http://www.ebsmithfoundation.org/",
    maxAward: null,
    incomeCap: null,
    scope: "national",
    uses: ["aba", "education"],
    description: {
      en: "The Ezra B. Smith Foundation seeks to provide financial assistance for ABA therapy and education for autistic children.",
      es: "La Ezra B. Smith Foundation busca brindar asistencia financiera para terapia ABA y educación de niños autistas.",
    },
  },
  {
    slug: "family-first-naa",
    name: "Family First Program: National Autism Association",
    url: "http://www.nationalautismassociation.org/family-support/programs/helping-hand/",
    maxAward: 1000,
    incomeCap: null,
    scope: "national",
    uses: ["medical", "general"],
    description: {
      en: "This Helping Hand Program can provide a one-time grant of up to $1,000 to help pay for treatment for a child with autism under the age of 21.",
      es: "El programa Helping Hand puede otorgar una subvención única de hasta $1,000 para ayudar a pagar el tratamiento de un niño con autismo menor de 21 años.",
    },
  },
  {
    slug: "first-hand",
    name: "First Hand Foundation",
    url: "https://applications.cerner.com/firsthand/FirstHand_1a.aspx?id=28729",
    maxAward: 1000,
    incomeCap: null,
    scope: "national",
    uses: ["aba"],
    description: {
      en: "The First Hand Foundation will provide families who meet certain financial guidelines with grants of up to $1,000 for ABA therapy.",
      es: "La First Hand Foundation otorga subvenciones de hasta $1,000 para terapia ABA a las familias que cumplan ciertos requisitos económicos.",
    },
  },
  {
    slug: "fund-it-forward",
    name: "Fund It Forward",
    url: "http://www.outreachautismservicesnetwork.org/www.FundItFwd.org",
    maxAward: null,
    incomeCap: null,
    scope: "national",
    uses: ["equipment"],
    description: {
      en: "Helps purchase adaptive equipment not covered by health insurance.",
      es: "Ayuda a comprar equipo adaptativo que el seguro médico no cubre.",
    },
  },
  {
    slug: "helping-hands-naa",
    name: "Helping Hands Program, National Autism Association",
    url: "http://nationalautismassociation.org/family-support/programs/helping-hand/",
    maxAward: null,
    incomeCap: 50000,
    scope: "national",
    uses: ["medical"],
    description: {
      en: "Provides families with financial assistance to obtain medically necessary treatments, lab testing, and physician-recommended supplements for their child with autism. This program does not provide funding for ABA or other types of therapy, camp tuition, respite care, fencing, trampolines etc. Funding is extremely limited. Annual net income must not exceed $50,000. Visit NAA for more information.",
      es: "Brinda asistencia financiera a las familias para obtener tratamientos médicamente necesarios, análisis de laboratorio y suplementos recomendados por un médico para su hijo con autismo. Este programa no financia ABA ni otros tipos de terapia, matrícula de campamentos, cuidado de relevo, cercas, trampolines, etc. Los fondos son extremadamente limitados. El ingreso neto anual no debe superar los $50,000. Visite NAA para más información.",
    },
  },
  {
    slug: "maggie-welby",
    name: "Maggie Welby Foundation",
    url: "http://www.maggiewelby.org/Grants.html",
    maxAward: 2500,
    incomeCap: null,
    scope: "national",
    uses: ["general"],
    description: {
      en: "The Maggie Welby Foundation offers grants ranging from $250 to $2,500 to children and families in need for a variety of purposes.",
      es: "La Maggie Welby Foundation ofrece subvenciones de entre $250 y $2,500 a niños y familias necesitadas para diversos fines.",
    },
  },
  {
    slug: "maggies-hope",
    name: "Maggie’s Hope",
    url: "http://www.maggieshope.org/contact/apply-for-funds",
    maxAward: null,
    incomeCap: null,
    scope: "national",
    uses: ["general"],
    description: {
      en: "Maggie’s Hope is always looking for ways to directly help families in need that are affected by autism. This web address takes you directly to the application.",
      es: "Maggie’s Hope siempre busca formas de ayudar directamente a las familias necesitadas afectadas por el autismo. Esta dirección web lo lleva directamente a la solicitud.",
    },
  },
  {
    slug: "modest-needs",
    name: "Modest Needs Foundation",
    url: "http://www.modestneeds.org/for-applicants/",
    maxAward: null,
    incomeCap: null,
    scope: "national",
    uses: ["general"],
    description: {
      en: "This link takes you to the required registration page to learn about several Modest Needs grant opportunities and eligibility requirements.",
      es: "Este enlace lo lleva a la página de registro requerida para conocer varias oportunidades de subvención de Modest Needs y sus requisitos de elegibilidad.",
    },
  },
  {
    slug: "paf-copay",
    name: "PAF Co-Pay Relief",
    url: "http://www.copays.org/gateway",
    maxAward: null,
    incomeCap: null,
    scope: "national",
    uses: ["medical"],
    description: {
      en: "Provides direct financial assistance to qualified patients, assisting them with prescription drug co-payments their insurance requires relative to their diagnosis. CPR call counselors work directly with the patient as well as with the provider of care to obtain necessary medical, insurance and income information to advance the application in an expeditious manner.",
      es: "Brinda asistencia financiera directa a pacientes calificados, ayudándolos con los copagos de medicamentos recetados que su seguro exige en relación con su diagnóstico. Los asesores telefónicos de CPR trabajan directamente con el paciente y con el proveedor de atención para obtener la información médica, de seguro y de ingresos necesaria y agilizar la solicitud.",
    },
  },
  {
    slug: "small-steps-in-speech",
    name: "Small Steps in Speech",
    url: "http://www.smallstepsinspeech.org/application",
    maxAward: null,
    incomeCap: null,
    scope: "national",
    uses: ["speech", "equipment"],
    description: {
      en: "This webpage provides a direct link to the Small Steps in Speech grant application. Funds may be used for speech therapy and/or assistive device software applications.",
      es: "Esta página ofrece un enlace directo a la solicitud de subvención de Small Steps in Speech. Los fondos pueden usarse para terapia del habla y/o aplicaciones de software para dispositivos de asistencia.",
    },
  },
  {
    slug: "taca",
    name: "Talk About Curing Autism: Family Scholarship Program",
    url: "http://www.tacanow.org/family-resources/autism-grants/",
    maxAward: null,
    incomeCap: null,
    scope: "national",
    uses: ["aba", "general"],
    description: {
      en: "This TACA webpage contains links to dozens of grant and scholarship opportunities for families to help with the cost of ABA therapies.",
      es: "Esta página de TACA contiene enlaces a decenas de oportunidades de subvenciones y becas para ayudar a las familias con el costo de las terapias ABA.",
    },
  },
  {
    slug: "uhccf",
    name: "United Healthcare Children’s Foundation",
    url: "http://www.uhccf.org/apply.html",
    maxAward: null,
    incomeCap: null,
    scope: "national",
    uses: ["medical", "equipment"],
    description: {
      en: "The UHC Fund facilitates access to medical-related services that enhance a child’s life and which are not fully covered by the available commercial health benefit plan.",
      es: "El Fondo de UHC facilita el acceso a servicios médicos que mejoran la vida de un niño y que no están totalmente cubiertos por el plan comercial de beneficios de salud disponible.",
    },
  },
];

export const grantUseLabels: Record<GrantUse, Localized> = {
  aba: { en: "ABA therapy", es: "Terapia ABA" },
  speech: { en: "Speech therapy", es: "Terapia del habla" },
  equipment: { en: "Equipment & devices", es: "Equipo y dispositivos" },
  medical: { en: "Medical & treatment", es: "Médico y tratamiento" },
  education: { en: "Education & tutoring", es: "Educación y tutoría" },
  general: { en: "General support", es: "Apoyo general" },
};
