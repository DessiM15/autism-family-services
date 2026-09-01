import type { Localized } from "./team";

export interface NavLink {
  href: string;
  label: Localized;
  desc?: Localized;
  external?: boolean;
}

export interface NavColumn {
  heading: Localized;
  links: NavLink[];
}

export interface NavItem {
  href: string;
  label: Localized;
  /** When present, the item opens the mega-menu panel. */
  panel?: {
    columns: NavColumn[];
    feature: {
      image: string;
      eyebrow: Localized;
      title: Localized;
      href: string;
      cta: Localized;
    };
    footerLink?: NavLink;
  };
}

export const nav: NavItem[] = [
  {
    href: "/start-here",
    label: { en: "Start Here", es: "Empieza Aquí" },
  },
  {
    href: "/services",
    label: { en: "Services", es: "Servicios" },
    panel: {
      columns: [
        {
          heading: { en: "For Families", es: "Para Familias" },
          links: [
            {
              href: "/services#aba-therapy",
              label: { en: "ABA Therapy", es: "Terapia ABA" },
              desc: { en: "Ages 3 through adult", es: "De 3 años a la edad adulta" },
            },
            {
              href: "/services#autism-diagnostic-services",
              label: { en: "Autism Diagnostics", es: "Diagnóstico de Autismo" },
              desc: { en: "Gold-standard evaluation", es: "Evaluación de referencia" },
            },
            {
              href: "/services#parent-training",
              label: { en: "Parent Training", es: "Capacitación para Padres" },
              desc: { en: "In person or online", es: "Presencial o en línea" },
            },
            {
              href: "/services#social-skills-groups",
              label: { en: "Social Skills Groups", es: "Grupos de Habilidades Sociales" },
              desc: { en: "Ages 5–17", es: "De 5 a 17 años" },
            },
            {
              href: "/services#academic-sped-tutoring",
              label: { en: "Academic SPED Tutoring", es: "Tutoría de Educación Especial" },
            },
          ],
        },
        {
          heading: { en: "For Schools & Districts", es: "Para Escuelas y Distritos" },
          links: [
            {
              href: "/services#school-district-support",
              label: { en: "District Support", es: "Apoyo a Distritos" },
              desc: { en: "Programming & consultation", es: "Programación y consultoría" },
            },
            {
              href: "/services#esy-autism-support",
              label: { en: "ESY Autism Support", es: "Apoyo de Autismo ESY" },
            },
            {
              href: "/services#professional-development",
              label: { en: "Professional Development", es: "Desarrollo Profesional" },
            },
            {
              href: "/services#school-mental-health",
              label: { en: "School Mental Health", es: "Salud Mental Escolar" },
            },
            {
              href: "/services#crisis-intervention-plan",
              label: { en: "Crisis Intervention Plans", es: "Planes de Intervención en Crisis" },
            },
          ],
        },
        {
          heading: { en: "Counseling", es: "Consejería" },
          links: [
            {
              href: "/gen-xy",
              label: { en: "Gen XY Counseling Center", es: "Gen XY Counseling Center" },
              desc: { en: "Our counseling practice", es: "Nuestra práctica de consejería" },
            },
            {
              href: "/services#individual-counseling",
              label: { en: "Individual Counseling", es: "Consejería Individual" },
            },
            {
              href: "/services#couples-family-counseling",
              label: { en: "Couples & Family", es: "Pareja y Familia" },
            },
            {
              href: "/aba",
              label: { en: "How We Do ABA", es: "Cómo Hacemos ABA" },
              desc: { en: "Our naturalistic approach", es: "Nuestro enfoque naturalista" },
            },
          ],
        },
      ],
      feature: {
        image: "/images/cta-01.jpg",
        eyebrow: { en: "Not sure where to begin?", es: "¿No sabes por dónde empezar?" },
        title: {
          en: "Answer three questions and we will point you to the right door.",
          es: "Responde tres preguntas y te señalaremos la puerta correcta.",
        },
        href: "/start-here",
        cta: { en: "Start Here", es: "Empieza Aquí" },
      },
      footerLink: {
        href: "/services",
        label: { en: "View all services & rates", es: "Ver todos los servicios y tarifas" },
      },
    },
  },
  {
    href: "/about",
    label: { en: "About", es: "Nosotros" },
    panel: {
      columns: [
        {
          heading: { en: "Who We Are", es: "Quiénes Somos" },
          links: [
            {
              href: "/team",
              label: { en: "Meet Our Team", es: "Conoce a Nuestro Equipo" },
              desc: { en: "The six people behind the work", es: "Las seis personas detrás del trabajo" },
            },
            {
              href: "/about",
              label: { en: "Our Story & Values", es: "Nuestra Historia y Valores" },
            },
            {
              href: "/about#certified-autism-center",
              label: { en: "Certified Autism Center", es: "Centro Certificado en Autismo" },
              desc: { en: "Beaumont's first and only", es: "El primero y único de Beaumont" },
            },
          ],
        },
        {
          heading: { en: "Visiting Us", es: "Tu Visita" },
          links: [
            {
              href: "/first-visit",
              label: { en: "Your First Visit", es: "Tu Primera Visita" },
              desc: { en: "A step-by-step walkthrough", es: "Un recorrido paso a paso" },
            },
            {
              href: "/contact",
              label: { en: "Contact & Directions", es: "Contacto y Cómo Llegar" },
            },
            {
              href: "/careers",
              label: { en: "Join Our Team", es: "Únete a Nuestro Equipo" },
              desc: { en: "We're hiring", es: "Estamos contratando" },
            },
          ],
        },
      ],
      feature: {
        image: "/images/team/jennifer.jpg",
        eyebrow: { en: "Meet the Clinic Director", es: "Conoce a la Directora Clínica" },
        title: {
          en: "Jennifer Ramirez is Beaumont's only Advanced Certified Autism Specialist.",
          es: "Jennifer Ramirez es la única Especialista Avanzada Certificada en Autismo de Beaumont.",
        },
        href: "/team#jennifer-ramirez",
        cta: { en: "Read her story", es: "Lee su historia" },
      },
    },
  },
  {
    href: "/resources",
    label: { en: "Resources", es: "Recursos" },
    panel: {
      columns: [
        {
          heading: { en: "For Families", es: "Para Familias" },
          links: [
            {
              href: "/grants",
              label: { en: "Grant Finder", es: "Buscador de Subvenciones" },
              desc: { en: "21 funding sources, filtered", es: "21 fuentes de financiamiento, filtradas" },
            },
            {
              href: "/first-visit",
              label: { en: "Your First Visit", es: "Tu Primera Visita" },
            },
            {
              href: "/aba",
              label: { en: "Uses for ABA", es: "Usos del ABA" },
              desc: { en: "It isn't only for autism", es: "No es solo para el autismo" },
            },
          ],
        },
        {
          heading: { en: "What's Happening", es: "Novedades" },
          links: [
            {
              href: "/whats-happening",
              label: { en: "News & Programs", es: "Noticias y Programas" },
            },
            {
              href: "/events",
              label: { en: "Calendar of Events", es: "Calendario de Eventos" },
            },
          ],
        },
      ],
      feature: {
        image: "/images/grants-01.jpg",
        eyebrow: { en: "Paying for care", es: "Cómo pagar la atención" },
        title: {
          en: "Twenty-one grant programs that help families cover therapy costs.",
          es: "Veintiún programas de subvención que ayudan a las familias a cubrir el costo de la terapia.",
        },
        href: "/grants",
        cta: { en: "Open the Grant Finder", es: "Abrir el Buscador" },
      },
    },
  },
  {
    href: "/contact",
    label: { en: "Contact", es: "Contacto" },
  },
];

/** Internal staff links — deliberately out of the public navigation. */
export const staffLinks: NavLink[] = [
  { href: "https://www.autismbmt.org/general-5", label: { en: "ABA SHAPE Data Forms", es: "Formularios de Datos SHAPE" }, external: true },
  { href: "https://www.autismbmt.org/general-7", label: { en: "SHAPE Check In Forms", es: "Formularios de Registro SHAPE" }, external: true },
  { href: "https://www.autismbmt.org/general-8", label: { en: "SHAPE ABA Skills Intake", es: "Admisión de Habilidades ABA SHAPE" }, external: true },
  { href: "https://www.autismbmt.org/curriculum-overview", label: { en: "SHAPE Clinician Manual", es: "Manual del Clínico SHAPE" }, external: true },
  { href: "https://www.autismbmt.org/video-trainings", label: { en: "SHAPE Thinking Space Binder", es: "Carpeta Thinking Space SHAPE" }, external: true },
];
