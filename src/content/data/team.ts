import type { Locale } from "@/lib/i18n";

export type Localized = Record<Locale, string>;

export interface TeamMember {
  slug: string;
  name: string;
  /** Post-nominals exactly as the organisation writes them. */
  credentials: string[];
  role: Localized;
  /** Optional line under the role, e.g. supervision disclosure. */
  note?: Localized;
  /** A single line that earns the reader's trust in one breath. */
  pull?: Localized;
  bio: { en: string[]; es: string[] };
  image: string;
}

/**
 * English bios are reproduced verbatim from autismbmt.org/team-4.
 * Spanish is a faithful translation of the same text.
 */
export const team: TeamMember[] = [
  {
    slug: "jennifer-ramirez",
    name: "Jennifer Ramirez",
    credentials: ["M.Ed.", "LPC", "LBA", "ACAS", "QBA"],
    role: { en: "Clinic Director", es: "Directora Clínica" },
    pull: {
      en: "Beaumont's ONLY Advanced Certified Autism Specialist",
      es: "La ÚNICA Especialista Avanzada Certificada en Autismo de Beaumont",
    },
    image: "/images/team/jennifer.jpg",
    bio: {
      en: [
        "Jennifer Ramirez is the Clinic Director at Autism Family Services of Beaumont LLC and Gen XY Counseling Center, where she oversees a diverse and dedicated team committed to providing exceptional care to individuals with autism and other special needs. With over a decade of experience in both educational leadership and counseling, Jennifer is a Licensed Professional Counselor (LPC) and Licensed Behavior Analyst (LBA) in Texas. She has also been an Advanced Certified Autism Specialist (ACAS) since 2019 and is Board Certified through the Qualified Applied Behavior Analysis Board (QABA) as a Qualified Behavior Analyst (QBA).",
        "Jennifer holds two Master's degrees from Lamar University—one in Education Administration (2010) and another in Counseling Development (2021). In March 2025, she graduated with a Post-Graduate Certificate in Applied Behavior Analysis from Capella University, further complementing her expertise in autism diagnostics, behavioral therapy, and family support.",
        "Her professional certifications also include several Texas Educator Certificates in special education, reading, and principalship, reflecting her comprehensive approach to supporting children across multiple disciplines. She provides autism diagnostic services using gold-standard protocols, including GARS, ADI-R, Sensory Profile, AFLS, VB-MAPP, and BASC-3. Jennifer's therapeutic framework integrates ABA, CBT, and Functional Communication Training (FCT) to create effective interventions that promote adaptive behavior, emotional regulation, and long-term progress.",
        "As a passionate leader and advocate, Jennifer is committed to enhancing her clinic's services while also mentoring graduate interns in the fields of counseling and ABA. She frequently speaks and provides training on topics ranging from autism interventions to mental health, helping professionals and families alike understand and support individuals with neurodiverse needs. Additionally, Jennifer is currently developing the SHAPE system (Structured Habits for Adaptive Progress and Emotion), an innovative program designed to provide structured emotional and behavioral support adaptable to both children and adults, including those with dementia.",
        "Beyond her clinical work, Jennifer is also a dedicated mother, blending her family life with her husband Jay and their children, Abigail, Aaron, and Hannah. She brings a heartfelt, empathetic approach to her work, reflecting her deep commitment to both her family and the communities she serves.",
      ],
      es: [
        "Jennifer Ramirez es la Directora Clínica de Autism Family Services of Beaumont LLC y de Gen XY Counseling Center, donde dirige un equipo diverso y dedicado, comprometido con brindar atención excepcional a personas con autismo y otras necesidades especiales. Con más de una década de experiencia tanto en liderazgo educativo como en consejería, Jennifer es Consejera Profesional Licenciada (LPC) y Analista de Conducta Licenciada (LBA) en Texas. También es Especialista Avanzada Certificada en Autismo (ACAS) desde 2019 y está certificada por la Junta de Análisis Conductual Aplicado Cualificado (QABA) como Analista de Conducta Cualificada (QBA).",
        "Jennifer tiene dos maestrías de Lamar University: una en Administración Educativa (2010) y otra en Desarrollo de la Consejería (2021). En marzo de 2025 se graduó con un Certificado de Posgrado en Análisis Conductual Aplicado de Capella University, complementando aún más su experiencia en diagnóstico del autismo, terapia conductual y apoyo familiar.",
        "Sus certificaciones profesionales también incluyen varios Certificados de Educadora de Texas en educación especial, lectura y dirección escolar, lo que refleja su enfoque integral para apoyar a los niños en múltiples disciplinas. Ofrece servicios de diagnóstico de autismo utilizando protocolos de referencia, entre ellos GARS, ADI-R, Sensory Profile, AFLS, VB-MAPP y BASC-3. El marco terapéutico de Jennifer integra ABA, TCC y Entrenamiento en Comunicación Funcional (FCT) para crear intervenciones eficaces que promueven la conducta adaptativa, la regulación emocional y el progreso a largo plazo.",
        "Como líder y defensora apasionada, Jennifer se dedica a mejorar los servicios de su clínica y a la vez asesora a internos de posgrado en los campos de la consejería y el ABA. Con frecuencia da charlas y capacitaciones sobre temas que van desde intervenciones para el autismo hasta salud mental, ayudando tanto a profesionales como a familias a comprender y apoyar a personas con necesidades neurodivergentes. Además, Jennifer está desarrollando actualmente el sistema SHAPE (Structured Habits for Adaptive Progress and Emotion), un programa innovador diseñado para brindar apoyo emocional y conductual estructurado, adaptable tanto a niños como a adultos, incluidas las personas con demencia.",
        "Más allá de su trabajo clínico, Jennifer también es una madre dedicada, que combina su vida familiar con su esposo Jay y sus hijos, Abigail, Aaron y Hannah. Aporta un enfoque sincero y empático a su trabajo, que refleja su profundo compromiso tanto con su familia como con las comunidades a las que sirve.",
      ],
    },
  },
  {
    slug: "jay-ramirez",
    name: "Jay Ramirez",
    credentials: ["BA"],
    role: { en: "Owner, CEO", es: "Propietario y Director General" },
    pull: {
      en: "35+ years building and running businesses in Southeast Texas",
      es: "Más de 35 años creando y dirigiendo negocios en el sureste de Texas",
    },
    image: "/images/team/jay.jpg",
    bio: {
      en: [
        "Jay Ramirez is the owner and CEO of Autism Family Services of Beaumont LLC and Gen XY Counseling Center, bringing over 35 years of experience in owning and operating small businesses. As the CEO, Jay manages financials, billing, insurance negotiations, scheduling, and the general oversight of the company, ensuring the smooth operation of all clinic services.",
        "In addition to his extensive business experience, Jay also holds a teaching certification and has spent five years as a 1st-grade teacher at Caldwood Elementary in Beaumont ISD. During his time in education, Jay actively participated in school events and after-hours activities, supporting students and staff alike. He has passed the TExES Core Subjects EC-6 (291) content exam, further demonstrating his dedication to helping young learners succeed.",
        "Before his teaching career, Jay managed various businesses, including Ramirez Carpet and Tile, where he led commercial and residential projects for over three decades. His business acumen, combined with his dedication to improving the lives of children and individuals with special needs, makes him a vital asset to the Autism Family Services team.",
        "Jay holds a Bachelor's degree in Business Administration from Lamar University, where he gained valuable skills in management, marketing, finance, and communication. His blend of educational, business, and leadership expertise ensures that Autism Family Services continues to provide high-quality, compassionate care to individuals and families across Beaumont.",
      ],
      es: [
        "Jay Ramirez es el propietario y director general de Autism Family Services of Beaumont LLC y de Gen XY Counseling Center, y aporta más de 35 años de experiencia siendo dueño y operando pequeñas empresas. Como director general, Jay gestiona las finanzas, la facturación, las negociaciones con aseguradoras, la programación de citas y la supervisión general de la compañía, garantizando el buen funcionamiento de todos los servicios de la clínica.",
        "Además de su amplia experiencia empresarial, Jay cuenta con certificación docente y trabajó cinco años como maestro de primer grado en Caldwood Elementary del distrito escolar de Beaumont. Durante su etapa en la educación, Jay participó activamente en eventos escolares y actividades extracurriculares, apoyando por igual a estudiantes y personal. Aprobó el examen de contenido TExES Core Subjects EC-6 (291), lo que demuestra aún más su dedicación a ayudar a los estudiantes más jóvenes a tener éxito.",
        "Antes de su carrera docente, Jay dirigió diversos negocios, entre ellos Ramirez Carpet and Tile, donde encabezó proyectos comerciales y residenciales durante más de tres décadas. Su visión empresarial, combinada con su dedicación a mejorar la vida de los niños y de las personas con necesidades especiales, lo convierte en un pilar fundamental del equipo de Autism Family Services.",
        "Jay tiene una licenciatura en Administración de Empresas de Lamar University, donde adquirió valiosas habilidades en gestión, mercadotecnia, finanzas y comunicación. Su combinación de experiencia educativa, empresarial y de liderazgo asegura que Autism Family Services continúe brindando atención compasiva y de alta calidad a personas y familias de todo Beaumont.",
      ],
    },
  },
  {
    slug: "alivia-craig",
    name: "Alivia Craig",
    credentials: ["Level 2 Behavior Technician"],
    role: {
      en: "Assessment Coordinator · Parent Trainer · Level 2 Behavior Technician",
      es: "Coordinadora de Evaluaciones · Instructora de Padres · Técnica de Conducta Nivel 2",
    },
    pull: {
      en: "Often the first person a family meets",
      es: "A menudo la primera persona que conoce una familia",
    },
    image: "/images/team/alivia.jpg",
    bio: {
      en: [
        "Alivia Craig serves as the Assessment Coordinator, Parent Trainer, and Level 2 Behavior Technician at Autism Family Services of Beaumont. Since joining the team in June 2024, she has become a valued member of the clinical staff, supporting both client services and the assessment process within the clinic.",
        "Alivia is responsible for assisting with client assessments, coordinating evaluation materials, and supporting families through the intake and onboarding process. In her role as Parent Trainer, she helps guide caregivers in understanding behavioral strategies and practical tools that support their child's growth and progress at home.",
        "As a Level 2 Behavior Technician, Alivia works directly with children and adolescents implementing evidence-based behavioral interventions that focus on building social, communication, and adaptive skills. She is known for her patience, attention to detail, and ability to build strong connections with the clients and families she serves.",
        "Alivia is currently pursuing her studies in psychology at Lamar University, where she continues to deepen her knowledge of behavior science and child development. She is passionate about helping children reach meaningful milestones and looks forward to expanding her expertise in the field of behavioral health.",
      ],
      es: [
        "Alivia Craig es Coordinadora de Evaluaciones, Instructora de Padres y Técnica de Conducta Nivel 2 en Autism Family Services of Beaumont. Desde que se unió al equipo en junio de 2024, se ha convertido en un miembro valioso del personal clínico, apoyando tanto los servicios a los clientes como el proceso de evaluación dentro de la clínica.",
        "Alivia se encarga de asistir en las evaluaciones de clientes, coordinar los materiales de evaluación y acompañar a las familias durante el proceso de admisión e incorporación. En su papel de Instructora de Padres, orienta a los cuidadores para que comprendan estrategias conductuales y herramientas prácticas que apoyan el crecimiento y el progreso de sus hijos en casa.",
        "Como Técnica de Conducta Nivel 2, Alivia trabaja directamente con niños y adolescentes implementando intervenciones conductuales basadas en evidencia, centradas en desarrollar habilidades sociales, de comunicación y adaptativas. Es reconocida por su paciencia, su atención al detalle y su capacidad de crear vínculos sólidos con los clientes y las familias a las que atiende.",
        "Alivia cursa actualmente sus estudios de psicología en Lamar University, donde continúa profundizando sus conocimientos en ciencia del comportamiento y desarrollo infantil. Le apasiona ayudar a los niños a alcanzar logros significativos y espera seguir ampliando su experiencia en el campo de la salud conductual.",
      ],
    },
  },
  {
    slug: "britney-boulard",
    name: "Britney Boulard",
    credentials: ["M.Ed.", "LPC-Associate"],
    role: { en: "ABA Trainer", es: "Instructora de ABA" },
    note: {
      en: "Supervised by Jana Windel, LPC-S",
      es: "Supervisada por Jana Windel, LPC-S",
    },
    pull: {
      en: "Currently pursuing her Doctorate in Counselor Education",
      es: "Actualmente cursa su Doctorado en Educación en Consejería",
    },
    image: "/images/team/britney.jpg",
    bio: {
      en: [
        "Britney Boulard is a Licensed Professional Counselor Associate and ABA Trainer who is passionate about helping individuals and families develop the skills needed to navigate life's emotional and behavioral challenges. Originally from Beaumont, Texas, Britney earned her bachelor's degree in Psychology with a minor in Social Work from Lamar University and her Master's degree in Clinical Mental Health Counseling from Walden University. She is currently pursuing her Doctorate in Counselor Education as she continues to expand her clinical expertise.",
        "Britney brings a strong background in behavioral interventions and skills-based support, allowing her to work effectively with children, adolescents, and adults. Her approach integrates behavioral strategies with practical counseling techniques to help clients strengthen emotional regulation, build coping skills, and improve everyday functioning.",
        "In addition to providing counseling services, Britney serves as an ABA Trainer at Autism Family Services of Beaumont, where she supports clinical staff in developing effective behavioral strategies and intervention techniques. Her experience in both counseling and applied behavioral practices allows her to help clients and families develop meaningful skills that support long-term progress.",
        "Britney is committed to creating a supportive, collaborative environment where clients feel empowered to grow, build resilience, and achieve their personal goals.",
      ],
      es: [
        "Britney Boulard es Consejera Profesional Licenciada Asociada e Instructora de ABA, apasionada por ayudar a personas y familias a desarrollar las habilidades necesarias para enfrentar los retos emocionales y conductuales de la vida. Originaria de Beaumont, Texas, Britney obtuvo su licenciatura en Psicología con especialización secundaria en Trabajo Social por Lamar University y su maestría en Consejería Clínica en Salud Mental por Walden University. Actualmente cursa su Doctorado en Educación en Consejería mientras continúa ampliando su experiencia clínica.",
        "Britney aporta una sólida formación en intervenciones conductuales y apoyo basado en habilidades, lo que le permite trabajar eficazmente con niños, adolescentes y adultos. Su enfoque integra estrategias conductuales con técnicas prácticas de consejería para ayudar a los clientes a fortalecer la regulación emocional, desarrollar habilidades de afrontamiento y mejorar su funcionamiento cotidiano.",
        "Además de brindar servicios de consejería, Britney se desempeña como Instructora de ABA en Autism Family Services of Beaumont, donde apoya al personal clínico en el desarrollo de estrategias conductuales y técnicas de intervención eficaces. Su experiencia tanto en consejería como en prácticas conductuales aplicadas le permite ayudar a clientes y familias a desarrollar habilidades significativas que respaldan el progreso a largo plazo.",
        "Britney está comprometida a crear un ambiente colaborativo y de apoyo donde los clientes se sientan capaces de crecer, desarrollar resiliencia y alcanzar sus metas personales.",
      ],
    },
  },
  {
    slug: "hannah-ford",
    name: "Hannah Ford",
    credentials: ["Level 1 Behavior Technician"],
    role: { en: "Level 1 Behavior Technician", es: "Técnica de Conducta Nivel 1" },
    pull: {
      en: "Seven years working with young children",
      es: "Siete años trabajando con niños pequeños",
    },
    image: "/images/team/hannah.jpg",
    bio: {
      en: [
        "Hannah Ford is a Level 1 Behavior Technician at Autism Family Services of Beaumont. She joined the team in 2026 and brings a strong background in early childhood care and development, with over seven years of experience working with young children.",
        "Hannah is a 2024 graduate of Lamar State College–Orange and has a passion for supporting children as they develop important social, communication, and behavioral skills. Her experience in early childhood education allows her to connect naturally with young clients and create a supportive and engaging learning environment.",
        "In her role at Autism Family Services, Hannah works directly with children to implement evidence-based behavioral interventions that help build adaptive skills, improve communication, and support positive behavior development.",
        "Hannah is currently pursuing her Applied Behavior Analysis Technician certification as she continues to expand her knowledge and skills in the field of behavioral therapy. She is dedicated to helping children grow, gain confidence, and reach meaningful milestones.",
      ],
      es: [
        "Hannah Ford es Técnica de Conducta Nivel 1 en Autism Family Services of Beaumont. Se unió al equipo en 2026 y aporta una sólida formación en cuidado y desarrollo de la primera infancia, con más de siete años de experiencia trabajando con niños pequeños.",
        "Hannah se graduó en 2024 de Lamar State College–Orange y le apasiona apoyar a los niños mientras desarrollan habilidades sociales, de comunicación y conductuales importantes. Su experiencia en educación infantil le permite conectar de manera natural con los clientes más pequeños y crear un entorno de aprendizaje acogedor y estimulante.",
        "En su función en Autism Family Services, Hannah trabaja directamente con los niños para implementar intervenciones conductuales basadas en evidencia que ayudan a desarrollar habilidades adaptativas, mejorar la comunicación y fomentar conductas positivas.",
        "Hannah cursa actualmente su certificación como Técnica en Análisis Conductual Aplicado mientras continúa ampliando sus conocimientos y habilidades en el campo de la terapia conductual. Está dedicada a ayudar a los niños a crecer, ganar confianza y alcanzar logros significativos.",
      ],
    },
  },
  {
    slug: "javia-archelle",
    name: "Javia Archelle",
    credentials: ["Counseling Intern"],
    role: {
      en: "Counseling Intern, Gen XY Counseling · ABA Technician",
      es: "Interna de Consejería, Gen XY Counseling · Técnica de ABA",
    },
    pull: {
      en: "“Every individual deserves to be understood, supported, and equipped with the tools needed to thrive.”",
      es: "«Cada persona merece ser comprendida, apoyada y equipada con las herramientas necesarias para prosperar».",
    },
    image: "/images/team/javia.jpg",
    bio: {
      en: [
        "Javia Archelle is a Counseling Intern at Gen XY Counseling and a graduate student at Grand Canyon University, pursuing her Master of Science in Clinical Mental Health Counseling.",
        "Javia is deeply motivated by the belief that every individual deserves to be understood, supported, and equipped with the tools needed to thrive, regardless of their life experiences. Her work with families has strengthened her appreciation for patience, compassion, and kindness as foundations for growth. Her counseling approach centers on empathy, genuine connection, and meeting clients where they are.",
        "As a counselor-in-training, her goal involves creating a warm, safe, and judgment-free environment where clients feel comfortable being their authentic selves. She emphasizes meaningful change through trust, authenticity, and self-reflection, with the intention of accompanying each client toward healing, balance, and self-discovery.",
        "Outside of counseling, Javia values family, laughter, and finding joy in simple moments, bringing that care, authenticity, and presence into sessions. During her internship, Javia also serves as an ABA Technician at Autism Family Services of Beaumont, supporting clients through applied behavior analysis services.",
      ],
      es: [
        "Javia Archelle es Interna de Consejería en Gen XY Counseling y estudiante de posgrado en Grand Canyon University, donde cursa su Maestría en Ciencias en Consejería Clínica en Salud Mental.",
        "A Javia la motiva profundamente la convicción de que cada persona merece ser comprendida, apoyada y equipada con las herramientas necesarias para prosperar, sin importar sus experiencias de vida. Su trabajo con familias ha fortalecido su aprecio por la paciencia, la compasión y la bondad como cimientos del crecimiento. Su enfoque de consejería se centra en la empatía, la conexión genuina y el encontrar a cada cliente donde está.",
        "Como consejera en formación, su objetivo es crear un ambiente cálido, seguro y libre de juicios donde los clientes se sientan cómodos siendo auténticos. Enfatiza el cambio significativo a través de la confianza, la autenticidad y la autorreflexión, con la intención de acompañar a cada cliente hacia la sanación, el equilibrio y el autodescubrimiento.",
        "Fuera de la consejería, Javia valora la familia, la risa y encontrar alegría en los momentos sencillos, y lleva ese cuidado, autenticidad y presencia a sus sesiones. Durante su internado, Javia también se desempeña como Técnica de ABA en Autism Family Services of Beaumont, apoyando a los clientes mediante servicios de análisis conductual aplicado.",
      ],
    },
  },
];

export function getMember(slug: string) {
  return team.find((m) => m.slug === slug);
}
