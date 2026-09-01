import { services } from "./services";
import { site, fullAddress } from "@/lib/site";
import type { Locale } from "@/lib/i18n";

/**
 * The assistant's entire world. Built from the same data the site renders,
 * so the chatbot can never drift out of sync with the published rates.
 */
function serviceLines(locale: Locale) {
  return services
    .map((s) => {
      const bits = [
        `- ${s.name[locale]}`,
        s.blurb ? `(${s.blurb[locale]})` : "",
        `· ${s.duration ? `${s.duration[locale]}, ` : ""}${s.rate[locale]}`,
      ]
        .filter(Boolean)
        .join(" ");
      return bits;
    })
    .join("\n");
}

export function buildSystemPrompt(locale: Locale) {
  const isEs = locale === "es";

  return `You are the website assistant for ${site.legalName}, an autism and mental-health clinic in Beaumont, Texas. You answer questions from the public on the clinic's website.

# WHO THE CLINIC IS
- ${site.legalName}
- Beaumont's FIRST and ONLY Certified Autism Center (CAC).
- Clinic Director: Jennifer Ramirez, M.Ed., LPC, LBA, ACAS, QBA. Beaumont's only Advanced Certified Autism Specialist. She holds two Master's degrees from Lamar University and a post-graduate certificate in Applied Behavior Analysis from Capella University.
- Owner/CEO: Jay Ramirez, BA. Handles billing, insurance and scheduling.
- Other team members: Alivia Craig (Assessment Coordinator, Parent Trainer, Level 2 Behavior Technician), Britney Boulard, M.Ed., LPC-Associate (ABA Trainer), Hannah Ford (Level 1 Behavior Technician), Javia Archelle (Counseling Intern, ABA Technician).
- Gen XY Counseling Center is the clinic's counseling practice for individuals, couples and families.
- The organization operates with a God-centered belief and the motto "${site.tagline}"

# LANGUAGE
The clinic has Spanish-speaking staff. Someone who calls can be helped in
Spanish, and can be seen in Spanish. If a caller asks, say yes plainly and tell
them to ask for a Spanish-speaking member of staff when they call. Do not name
a specific person, because you do not know who is rostered on a given day.

# CONTACT
- Phone (services and billing): ${site.phone}
- Fax: ${site.fax}
- Billing email: ${site.email}
- Address: ${fullAddress()}

# SERVICES AND PUBLISHED RATES
${serviceLines(locale)}

Services marked "Contact for Rate" require a phone call. Never invent a price for them.

# HOW THEY PRACTISE ABA
They provide Applied Behavior Analysis using a naturalistic teaching style rather than rigid conventional drills, drawing on the 27 evidence-based naturalistic teaching methods from the National Professional Development Center on Autism Spectrum Disorders (including Incidental Teaching, Pivotal Response Training and the Natural Language Paradigm). ABA is not only for autism. It also helps with addictions, mental health challenges, age-related conditions and cognitive disorders.

# DIAGNOSTICS
Jennifer provides autism diagnostic services using gold-standard protocols: GARS, ADI-R, Sensory Profile, AFLS, VB-MAPP and BASC-3.

# GRANTS
The clinic does NOT give grants directly to families, but the website has a Grant Finder listing 21 outside programs (SSES, ACT Today, Autism Cares, TACA, UnitedHealthcare Children's Foundation and others). Point people to the Grant Finder page.

# CAREERS
Hiring Respite Care Technicians, Community Services Technicians, and ABA Case Managers I, II, III. All positions are 1099 contractors, $8–$14/hour. Requirements: background check, valid driver's licence, 18+, high school diploma or GED, CPR certified, reliable transportation.

# HARD RULES (THESE OVERRIDE EVERYTHING)
1. You are NOT a clinician. Never diagnose, never assess symptoms, never give medical, psychological or treatment advice. If someone describes symptoms or asks whether they or their child has autism/ADHD/anything else, say warmly that only a qualified clinician can answer that, and offer to help them book an evaluation by calling ${site.phone}.
2. Never ask for and never repeat back health information, diagnoses, medications or personal medical history. If someone volunteers it, do not restate it; just direct them to call.
3. Never state or imply which insurance plans are accepted. Coverage varies; tell them to call ${site.phone} and the billing office will verify their benefits before the first appointment, at no obligation.
4. Only quote rates that appear in the list above, exactly as written. If a rate is not listed, say to call.
5. If someone expresses thoughts of self-harm, suicide, or describes an emergency: respond with care, tell them to call 911 if anyone is in immediate danger, and give the 988 Suicide & Crisis Lifeline. Do not attempt to counsel them.
6. Never invent clinic hours, staff, programs, wait times or availability. If you do not know, say so and give the phone number.
7. Do not make promises about outcomes, timelines or acceptance.

# HOW TO SOUND
- Warm, plain, unhurried. Many people reading this have just received a diagnosis for their child and are frightened.
- Short answers. Two or three sentences is usually right. Use a short list only when genuinely listing things.
- Never use clinical jargon without explaining it in ordinary words.
- Never use em dashes. Use a full stop, a comma or a colon instead. This is a house style rule and it is not negotiable.
- End with a concrete next step when there is one.
- ${isEs ? "Responde en español por defecto. Si la persona escribe en inglés, responde en inglés." : "Answer in English by default. If the person writes in Spanish, answer in Spanish."}
- Always mirror the language the person writes in, whatever the default.

You are a front door, not a clinician. When in doubt, be kind and hand them the phone number.`;
}

/**
 * Keyword responder used when no API key is configured, so the widget is
 * fully demonstrable before the client wires up their own key.
 */
const fallbackAnswers: Record<
  string,
  { match: RegExp; en: string; es: string }
> = {
  cost: {
    match: /\b(cost|price|rate|how much|pay|fee|precio|costo|cuánto|cuanto|tarifa)\b/i,
    en: `ABA therapy is $150–$225 for a 45-minute session. Individual counseling is $130 an hour, parent training is $120–$175, and social skills groups are $55. Assessments and school services are quoted individually. Call ${site.phone} and we'll walk you through it.`,
    es: `La terapia ABA cuesta entre $150 y $225 por una sesión de 45 minutos. La consejería individual es $130 por hora, la capacitación para padres $120–$175 y los grupos de habilidades sociales $55. Las evaluaciones y los servicios escolares se cotizan por separado. Llama al ${site.phone} y te lo explicamos.`,
  },
  insurance: {
    match: /\b(insurance|coverage|covered|medicaid|seguro|cobertura|cubre)\b/i,
    en: `Coverage depends on your plan and the service. Call the billing office at ${site.phone} and we'll verify your benefits before your first appointment, at no obligation.`,
    es: `La cobertura depende de tu plan y del servicio. Llama a la oficina de facturación al ${site.phone} y verificaremos tus beneficios antes de tu primera cita, sin ningún compromiso.`,
  },
  diagnosis: {
    match: /\b(diagnos|evaluat|assess|test|autism test|diagnóstic|evaluac|prueba)\b/i,
    en: `Jennifer Ramirez provides autism diagnostic evaluations using gold-standard protocols. It is about a 14-hour process across sessions, and the rate is quoted individually. Call ${site.phone} to get started.`,
    es: `Jennifer Ramirez realiza evaluaciones diagnósticas de autismo con protocolos de referencia. Es un proceso de unas 14 horas repartidas en varias sesiones, y la tarifa se cotiza individualmente. Llama al ${site.phone} para empezar.`,
  },
  location: {
    match: /\b(where|location|address|directions|parking|dónde|donde|dirección|ubicac)\b/i,
    en: `We are at ${fullAddress()}. There is parking directly outside and the entrance is on the ground floor. If it helps, there's a step-by-step walkthrough of a first visit on the site.`,
    es: `Estamos en ${fullAddress()}. Hay estacionamiento justo afuera y la entrada está en la planta baja. Si te ayuda, en el sitio hay un recorrido paso a paso de la primera visita.`,
  },
  services: {
    match: /\b(services|offer|what do you do|help with|servicios|ofrecen|ayuda)\b/i,
    en: `We offer ABA therapy, autism diagnostics, parent training, social skills groups, academic tutoring, individual and family counseling, and consultation for school districts. Which of those is closest to what you need?`,
    es: `Ofrecemos terapia ABA, diagnóstico de autismo, capacitación para padres, grupos de habilidades sociales, tutoría académica, consejería individual y familiar, y consultoría para distritos escolares. ¿Cuál de esos se acerca más a lo que necesitas?`,
  },
  grants: {
    match: /\b(grant|funding|financial|afford|help paying|subvenc|financiam|ayuda para pagar)\b/i,
    en: `We don't award grants ourselves, but the site has a Grant Finder with 21 outside programs you can filter by what you need it for. SSES is a $1,500 Texas grant worth checking first.`,
    es: `Nosotros no otorgamos subvenciones, pero el sitio tiene un Buscador de Subvenciones con 21 programas externos que puedes filtrar según lo que necesites. SSES es una subvención de Texas de $1,500 que vale la pena revisar primero.`,
  },
  careers: {
    match: /\b(job|hiring|career|apply|work for|empleo|trabajo|contratan|postular)\b/i,
    en: `We're hiring Respite Care Technicians, Community Services Technicians and ABA Case Managers. All are 1099 contractor roles paying $8–$14 an hour. The Careers page has the full requirements and an application form.`,
    es: `Estamos contratando Técnicos de Cuidado de Relevo, Técnicos de Servicios Comunitarios y Coordinadores de Casos ABA. Todos son puestos de contratista 1099 que pagan entre $8 y $14 por hora. La página de Empleo tiene los requisitos completos y un formulario.`,
  },
  spanish: {
    match: /\b(spanish|espa(ñ|n)ol|habla|hablan|translat|int(é|e)rprete|interpreter)\b/i,
    en: `Yes, we have Spanish-speaking staff. Call ${site.phone} and ask for someone who speaks Spanish, and we will make sure you are looked after. The whole website is available in Spanish too.`,
    es: `Sí, contamos con personal que habla español. Llama al ${site.phone} y pide hablar con alguien que hable español, y nos aseguraremos de atenderte. Todo el sitio también está disponible en español.`,
  },
  aba: {
    match: /\b(aba|applied behavior|behaviour|análisis conductual|conductual)\b/i,
    en: `We practise ABA using a naturalistic teaching style, built around play and real moments rather than rigid drills. It's for ages 3 through adult, and it isn't only for autism. There's a fuller explanation on the "Uses for ABA" page.`,
    es: `Practicamos ABA con un estilo de enseñanza naturalista, basado en el juego y en momentos reales, no en repeticiones rígidas. Es para personas de 3 años a la edad adulta, y no es solo para el autismo. Hay una explicación más completa en la página «Usos del ABA».`,
  },
};

const CRISIS =
  /\b(kill myself|suicide|suicidal|end my life|hurt myself|self harm|want to die|matarme|suicid|quitarme la vida|hacerme daño)\b/i;

export function fallbackReply(message: string, locale: Locale): string {
  if (CRISIS.test(message)) {
    return locale === "es"
      ? `Lamento mucho que estés pasando por esto. Si tú o alguien más está en peligro inmediato, por favor llama al 911. Puedes hablar con alguien ahora mismo, gratis y en confianza, llamando o enviando un mensaje al 988, la Línea de Prevención del Suicidio y Crisis. Aquí en la clínica también podemos ayudarte a encontrar apoyo continuo: ${site.phone}.`
      : `I'm really sorry you're going through this. If you or someone else is in immediate danger, please call 911. You can talk to someone right now, free and confidentially, by calling or texting 988, the Suicide & Crisis Lifeline. We can also help you find ongoing support here at the clinic: ${site.phone}.`;
  }

  for (const entry of Object.values(fallbackAnswers)) {
    if (entry.match.test(message)) return entry[locale];
  }

  return locale === "es"
    ? `Buena pregunta. Déjame conectarte con alguien que pueda responderla bien. Llama al ${site.phone} y con gusto te ayudamos. Mientras tanto, puedo contarte sobre nuestros servicios, tarifas, ubicación o cómo empezar.`
    : `Good question. Let me point you to someone who can answer it properly. Call ${site.phone} and we'll be glad to help. In the meantime, I can tell you about our services, rates, location, or how to get started.`;
}
