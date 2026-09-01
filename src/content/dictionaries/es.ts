import type { Dictionary } from "./en";

/**
 * Spanish translation. Mirrors the shape of `en` exactly.
 * Clinical terms (ABA, LPC, LBA, ACAS) and proper nouns stay in English
 * because that is how they appear on licences, insurance cards and reports.
 */
export const es: Dictionary = {
  meta: {
    localeName: "Español",
    otherLocaleName: "English",
    switchTo: "Switch to English",
  },

  common: {
    callUs: "Llámanos",
    callNow: "Llamar ahora",
    phoneLabel: "Información de servicios",
    billingLabel: "Oficina de facturación",
    faxLabel: "Fax",
    emailLabel: "Correo de facturación",
    clinicLocation: "Ubicación de la clínica",
    getDirections: "Cómo llegar",
    requestCallback: "Solicitar una llamada",
    learnMore: "Más información",
    readMore: "Leer más",
    readLess: "Leer menos",
    viewAll: "Ver todo",
    backToTop: "Volver arriba",
    close: "Cerrar",
    menu: "Menú",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    skipToContent: "Saltar al contenido principal",
    loading: "Cargando",
    required: "obligatorio",
    optional: "opcional",
    scrollToExplore: "Desplázate para explorar",
  },

  calm: {
    label: "Modo Calma",
    on: "Modo Calma activado",
    off: "Modo Calma desactivado",
    tooltip:
      "Reduce el movimiento, suaviza el color y aquieta la página. Se activa automáticamente si tu dispositivo pide menos movimiento.",
    announce: "El Modo Calma está activado. Se ha reducido el movimiento y la animación.",
    announceOff: "El Modo Calma está desactivado.",
  },

  banner: {
    accepting: "Aceptando nuevos clientes",
    location: "Clínica en Beaumont, TX",
  },

  spanish: {
    badge: "Se habla español",
    heading: "Te atendemos en español",
    body: "Puedes llamarnos, visitarnos y recibir atención en español. Al llamar, pide hablar con alguien del personal que hable español y nos aseguraremos de atenderte.",
    short: "Personal que habla español",
  },

  home: {
    heroLine1: "Ayudando a familias, escuelas y personas",
    heroLine2: "a vivir una vida con",
    heroEmphasis: "Propósito",
    heroLine3: "",
    heroSub:
      "Terapia ABA, consejería y servicios de diagnóstico para autismo, TDAH, ansiedad, depresión y dificultades académicas — aquí mismo en Beaumont, Texas.",
    heroCtaPrimary: "Empieza aquí",
    heroCtaSecondary: "Llama al 409-242-1559",

    creds: {
      cac: "El primer y ÚNICO Centro Certificado en Autismo de Beaumont",
      acas: "La ÚNICA Especialista Avanzada Certificada en Autismo de Beaumont",
    },

    verseRef: "Eclesiastés 3:1",
    verse:
      "Todo tiene su tiempo, y todo lo que se quiere debajo del cielo tiene su hora.",

    missionEyebrow: "Quiénes somos",
    missionHeading: "Una organización local que empieza por la familia.",
    missionP1:
      "Autism Family Services of Beaumont, LLC & Counseling Center es una organización local del sureste de Texas centrada en las personas y sus familias. Nuestros programas ofrecen servicios para conductas desadaptativas, dificultades académicas y necesidades de salud mental.",
    missionP2:
      "Nuestra organización se esfuerza por operar con una creencia centrada en Dios, brindando interacciones positivas, servicio a los demás, integridad, excelencia y confiabilidad; enseñando a otros a alcanzar su máximo potencial, sin importar su capacidad. ¡Esperamos cumplir estas metas haciendo de estos valores un objetivo diario!",

    valuesEyebrow: "Nuestros objetivos diarios",
    valuesHeading: "Los valores que nos exigimos.",
    values: [
      "Honestidad, integridad y profesionalismo",
      "La familia, las amistades y crear una vida agradable y plena",
      "Trabajo duro, dedicación y logro",
      "Honrar todas las promesas y compromisos",
      "Entregar resultados",
      "Ser bienvenidos de vuelta",
      "Buscar «mejores prácticas» nuevas y mejoradas",
      "Esforzarnos por lograr el resultado que desea nuestro cliente",
      "Ser un socio comercial valioso",
      "¡y estar guiados por un propósito!",
    ],

    cacEyebrow: "Centro Certificado en Autismo",
    cacHeading: "El primer y ÚNICO Centro Certificado en Autismo de Beaumont",
    cacQuestion: "¿Qué es un Centro Certificado en Autismo (CAC)?",
    cacBody:
      "Un Centro Certificado en Autismo (CAC) es una instalación u organización en la que al menos el 80% del personal de atención al público está capacitado en autismo y ha cumplido los requisitos profesionales. Un CAC puede pertenecer a distintos sectores, como la salud, la educación o la recreación, por ejemplo. El CAC exige capacitación en autismo, así como otros apoyos del IBCCES, y debe renovarse periódicamente con formación continua para mantenerse. Algunas sedes también completan un proceso de revisión presencial y ofrecen otras adaptaciones para los visitantes.",

    jenEyebrow: "Conoce a la Directora Clínica",
    jenName: "Jennifer Ramirez, M.Ed.",
    jenTitle:
      "Consejera Profesional Licenciada | Analista de Conducta Licenciada | Especialista Avanzada Certificada en Autismo",
    jenHeading: "La única Especialista Avanzada Certificada en Autismo de Beaumont.",
    jenBody:
      "Dos maestrías. Un certificado de posgrado en Análisis Conductual Aplicado. Protocolos de diagnóstico de referencia. Más de una década de liderazgo educativo y consejería. Y, sobre todo, una familia propia — que es donde comienza su enfoque.",
    jenCta: "Lee la historia de Jennifer",

    servicesEyebrow: "Lo que ofrecemos",
    servicesHeading: "Quince servicios, tres puertas de entrada.",
    servicesBody:
      "Ya seas madre o padre, un distrito escolar o un adulto que busca consejería, hay un lugar claro para empezar.",
    servicesCta: "Ver todos los servicios y tarifas",

    abaEyebrow: "Cómo trabajamos",
    abaHeading: "ABA, pero no como te lo han contado.",
    abaBody:
      "En Autism Family Services of Beaumont adoptamos un enfoque único. Aunque ofrecemos Análisis Conductual Aplicado, también conocido como terapia ABA, incorporamos al proceso un estilo de enseñanza más naturalista. Usted y su hijo seguirán beneficiándose de trabajar con un equipo capacitado de clínicos, instructores y analistas, pero con un enfoque más flexible y menos rígido en comparación con los métodos ABA convencionales.",
    abaCta: "Cómo hacemos ABA aquí",

    testimonialsEyebrow: "En sus palabras",
    testimonialsHeading: "Familias que estuvieron donde tú estás ahora.",

    visitEyebrow: "Antes de llegar",
    visitHeading: "Conoce exactamente cómo será la primera visita.",
    visitBody:
      "Un lugar nuevo es mucho pedirle a un niño. Por eso creamos un recorrido que pueden ver juntos, en casa, antes de cruzar la puerta.",
    visitCta: "Ver tu primera visita",

    ctaHeading: "Empecemos con una conversación.",
    ctaBody:
      "Sin formularios complicados y sin datos médicos. Llámanos o déjanos tu nombre y la mejor hora para contactarte.",
  },

  testimonials: [
    {
      quote:
        "La Sra. Ramirez es la persona más atenta y con más conocimiento sobre el autismo en nuestra área. Se toma el tiempo de escuchar y brinda el mejor tratamiento para tu hijo como individuo. ¡Ha sido una salvación para nuestra familia!",
      author: "Rebecca",
      role: "madre",
    },
    {
      quote:
        "Encontrar a una consejera que entienda lo que necesito como cliente es realmente importante. Jennifer siempre está dispuesta a escuchar y a darme la retroalimentación que necesito para seguir y alcanzar mis metas.",
      author: "Cliente",
      role: "cliente de consejería",
    },
    {
      quote:
        "Como padre de un niño con autismo, agradezco contar con este servicio en nuestra área. La Sra. Ramirez ha ayudado a nuestro hijo a superar sus dificultades sociales con el TEA y también nos ha ayudado como familia a comprender y brindar la intervención que necesita.",
      author: "Alex",
      role: "padre",
    },
  ],

  startHere: {
    title: "Empieza aquí",
    heading: "Tres preguntas. Después te señalamos la puerta correcta.",
    body:
      "Su sitio anterior tenía dieciocho páginas. Tú necesitas una respuesta. Dinos por quién vienes.",
    q1: "¿Por quién vienes?",
    options: {
      child: {
        label: "Por mi hijo o hija",
        desc: "Un niño o adolescente que quizá necesite evaluación, terapia o apoyo escolar.",
      },
      self: {
        label: "Por mí",
        desc: "Consejería para ansiedad, depresión, TDAH o transiciones de vida.",
      },
      school: {
        label: "Por mi escuela o distrito",
        desc: "Consultoría, capacitación de personal, apoyo ESY o planes de conducta.",
      },
      adult: {
        label: "Por un adulto a mi cargo",
        desc: "Un familiar adulto que necesita apoyo conductual o emocional.",
      },
    },
    q2: "¿Qué te ayudaría más en este momento?",
    needs: {
      diagnosis: { label: "Necesitamos un diagnóstico", desc: "Evaluación formal de autismo" },
      therapy: { label: "Necesitamos terapia", desc: "ABA o consejería continua" },
      school: { label: "Ayuda en la escuela", desc: "Apoyo académico y conductual" },
      parent: { label: "Ayuda en casa", desc: "Capacitación y estrategias para padres" },
      talk: { label: "Alguien con quien hablar", desc: "Consejería individual o familiar" },
      cost: { label: "Ayuda para pagarlo", desc: "Subvenciones y opciones de financiamiento" },
      unsure: { label: "Todavía no estoy seguro", desc: "Esa es una respuesta perfectamente válida" },
    },
    resultHeading: "Aquí es donde empezaríamos.",
    resultBody: "Según tus respuestas, estos son los servicios que encajan.",
    startOver: "Empezar de nuevo",
    next: "Siguiente",
    back: "Atrás",
    step: "Paso",
    of: "de",
    talkToSomeone: "¿Prefieres hablar con alguien?",
  },

  servicesPage: {
    title: "Nuestros servicios",
    heading: "Lo que ofrecemos",
    body:
      "Cada tarifa aparece exactamente como la publica la clínica. Si un servicio dice «Consulte la tarifa», llámanos y te lo explicamos.",
    rateNote:
      "Las tarifas son por sesión salvo que se indique lo contrario. Llama al 409-242-1559 con cualquier duda sobre costos o cobertura.",
    insuranceHeading: "Seguro y pago",
    insuranceBody:
      "La cobertura varía según el plan y el servicio. Llama a la oficina de facturación al 409-242-1559 y verificaremos tus beneficios antes de tu primera cita — sin compromiso.",
    insurancePlaceholder:
      "La lista completa de seguros aceptados se está confirmando con nuestra oficina de facturación y se publicará aquí.",
    duration: "Duración",
    rate: "Tarifa",
  },

  abaPage: {
    title: "Usos del ABA",
    heading: "¿La terapia ABA es solo para el autismo?",
    intro:
      "El Análisis Conductual Aplicado (ABA) es un enfoque flexible que ofrece beneficios a personas de todas las edades y aborda una variedad de problemas, entre ellos adicciones, retos de salud mental, condiciones asociadas a la edad y trastornos cognitivos. Aunque suele asociarse con la terapia del autismo, el ABA resulta eficaz para una amplia gama de condiciones.",
    howHeading: "Cómo hacemos ABA aquí",
    howIntro:
      "El National Professional Development Center on Autism Spectrum Disorders presenta 27 métodos de enseñanza naturalista basados en evidencia, entre ellos:",
    methods: [
      {
        name: "Enseñanza incidental",
        desc: "Involucra a los niños en actividades que ellos mismos eligen para promover la comunicación.",
      },
      {
        name: "Entrenamiento en respuestas pivotales",
        desc: "Se concentra en comprender los componentes conductuales cruciales.",
      },
      {
        name: "Paradigma del lenguaje natural",
        desc: "Destaca el juego y la repetición de palabras, especialmente útil para niños no verbales.",
      },
    ],
    critics:
      "Hay críticos que expresan reservas sobre la aplicación de técnicas tradicionales de ABA en situaciones del mundo real y cuestionan la eficacia del ABA por sí solo para mejorar el lenguaje y la comunicación en niños con Trastorno del Espectro Autista.",
    approach:
      "En Autism Family Services of Beaumont adoptamos un enfoque único. Aunque ofrecemos Análisis Conductual Aplicado, también conocido como terapia ABA, incorporamos al proceso un estilo de enseñanza más naturalista. Usted y su hijo seguirán beneficiándose de trabajar con un equipo capacitado de clínicos, instructores y analistas, pero con un enfoque más flexible y menos rígido en comparación con los métodos ABA convencionales.",
    statMethods: "métodos de enseñanza naturalista basados en evidencia",
    statAges: "De 3 años a la edad adulta",
  },

  teamPage: {
    title: "Conoce a nuestro equipo",
    heading: "Las personas que realmente estarán en la sala.",
    body:
      "Seis clínicos, técnicos y líderes — la mayoría del sureste de Texas, todos aquí por la misma razón.",
    credentialsLabel: "Credenciales",
    memberOf: "de",
  },

  firstVisit: {
    title: "Tu primera visita",
    heading: "Aquí nada será una sorpresa.",
    body:
      "Un edificio nuevo, caras nuevas y una rutina nueva es mucho pedirle a un niño. Vean esto juntos en casa, las veces que quieran, para que la primera visita ya les resulte familiar.",
    printCta: "Imprimir este recorrido",
    steps: [
      {
        title: "Llegas al 6642 Phelan Blvd",
        body: "Hay estacionamiento justo afuera. La puerta principal está en la planta baja — sin escaleras ni ascensor.",
      },
      {
        title: "Te registras en la recepción",
        body: "Alguien te saludará por tu nombre. Te pedirán el nombre y la fecha de nacimiento de tu hijo. Nada más complicado que eso.",
      },
      {
        title: "Esperas en la sala de espera",
        body: "Hay asientos y cosas para mirar. Si las salas de espera son difíciles, avísanos al agendar y te pasamos directamente.",
      },
      {
        title: "Conoces a tu clínico",
        body: "Se presentará contigo y con tu hijo. No habrá prisa. Si tu hijo necesita unos minutos, tendrá unos minutos.",
      },
      {
        title: "Entran a la sala de terapia",
        body: "Es una sala con juguetes, una mesa y sillas. Los padres pueden quedarse durante la primera sesión.",
      },
      {
        title: "La sesión empieza con juego",
        body: "Empezamos donde tu hijo se sienta cómodo. La primera sesión se trata sobre todo de que decida que somos seguros.",
      },
      {
        title: "Hablamos antes de que te vayas",
        body: "Te contaremos qué observamos, qué sigue y cuánto tiempo suele tomar. Puedes preguntar lo que quieras.",
      },
    ],
    sensoryHeading: "Notas sensoriales",
    sensoryBody:
      "Avísanos con anticipación y lo ajustamos. Podemos bajar las luces, saltarnos la espera, y tu hijo puede traer de casa lo que le ayude.",
    sensoryList: [
      "En casi todas las salas se pueden apagar las luces fluorescentes del techo",
      "Hay un espacio más tranquilo, apartado de la sala de espera",
      "Los audífonos, objetos de confort y meriendas preferidas siempre son bienvenidos",
      "Puedes recorrer el edificio antes de la primera cita — solo llama antes",
    ],
    photoNote:
      "Las fotografías de esta página son ilustrativas. Pronto habrá fotografías de nuestra clínica real.",
  },

  grantsPage: {
    title: "Oportunidades de subvención",
    heading: "Veintiún formas en que las familias pagan la atención.",
    disclaimer:
      "Autism Family Services of Beaumont no otorga subvenciones directamente a las familias.",
    disclaimerNote:
      "(Esta lista no se ha actualizado desde 2017, así que tenlo en cuenta al contactar a las organizaciones. Actualizaremos esta lista cuando tengamos tiempo, ojalá para finales de 2022.)",
    subheading: "Subvenciones disponibles a través de otras organizaciones (no de AFS)",
    filterUse: "¿Para qué lo necesitas?",
    filterAmount: "Monto mínimo",
    filterScope: "Dónde",
    filterIncome: "Límite de ingreso familiar",
    allUses: "Cualquier cosa",
    allAmounts: "Cualquier monto",
    allScopes: "Cualquier lugar",
    anyIncome: "Cualquier ingreso",
    texasOnly: "Solo Texas",
    nationwide: "Todo el país",
    search: "Buscar subvenciones",
    searchPlaceholder: "Busca por nombre o palabra clave…",
    resultsOne: "subvención coincide",
    resultsMany: "subvenciones coinciden",
    noResults: "Ninguna subvención coincide con esos filtros. Prueba ampliando tu búsqueda.",
    clearFilters: "Borrar filtros",
    upTo: "Hasta",
    incomeUnder: "Ingreso familiar menor a",
    visitSite: "Visitar sitio",
    unspecified: "El monto varía",
  },

  careers: {
    title: "Únete a nuestro equipo",
    heading: "Estamos contratando en tres puestos.",
    positions: [
      "Técnicos de Cuidado de Relevo (Respite Care)",
      "Técnicos de Servicios Comunitarios",
      "Coordinadores de Casos ABA I, II, III",
    ],
    terms: "Todos los puestos son contratistas 1099",
    requirementsHeading: "Requisitos",
    requirements:
      "Debe aprobar una verificación de antecedentes, tener licencia de conducir vigente, tener al menos 18 años y diploma de preparatoria o GED, certificación de RCP vigente y transporte confiable.",
    payHeading: "Compensación",
    pay: "Los puestos pagan entre $8 y $14 por hora.",
    internship: "¡Acumula hasta 24 horas reloj para tu internado!",
    policy: "TRENDS es una organización LIBRE DE TABACO.",
    applyHeading: "Postúlate",
    applyBody:
      "Envíanos tus datos y nos pondremos en contacto. También puedes llamar directamente a la oficina al 409-242-1559.",
  },

  genXY: {
    title: "Gen XY Counseling Center",
    heading: "Consejería para lo que no tiene un código de diagnóstico.",
    body:
      "Gen XY Counseling Center es nuestra práctica de consejería — sesiones individuales, de pareja y familiares para ansiedad, depresión, TDAH, presión académica y las partes difíciles y cotidianas de ser persona.",
    forWho: "Para quién es",
    forWhoList: [
      "Adolescentes y jóvenes adultos encontrando su camino",
      "Padres que cargan más de lo que dicen en voz alta",
      "Parejas y familias que quieren hablar de otra manera",
      "Cualquiera que lleve tiempo pensando en agendar esto",
    ],
  },

  whatsHappening: {
    title: "Novedades",
    heading: "Programas, capacitaciones y noticias.",
    body: "Lo que está en marcha ahora mismo en la clínica.",
    shapeHeading: "El programa diurno SHAPE",
    shapeBody:
      "Structured Habits for Adaptive Progress and Emotion — un programa innovador desarrollado por Jennifer Ramirez para brindar apoyo emocional y conductual estructurado, adaptable tanto a niños como a adultos, incluidas las personas con demencia.",
    adhdHeading: "Capacitación en TDAH",
    adhdBody: "Sesiones de capacitación para familias y profesionales sobre cómo apoyar el TDAH.",
    socialHeading: "Grupos de habilidades sociales",
    socialBody: "Programa presencial de habilidades sociales para niños de 5 a 17 años.",
    registerCta: "Regístrate o pregunta por un programa",
  },

  events: {
    title: "Calendario de eventos",
    heading: "Lo que viene.",
    body:
      "Talleres, grupos de apoyo para padres y sesiones de capacitación. Llama a la clínica para registrarte o preguntar por cualquier cosa de esta lista.",
    empty: "Los próximos eventos aparecerán aquí.",
    monthly: "Mensual",
    callToRegister: "Llama para registrarte",
  },

  about: {
    title: "Sobre nosotros",
    heading: "El propósito, puesto en práctica.",
    storyHeading: "Nuestra historia",
    cacHeading: "Centro Certificado en Autismo",
    valuesHeading: "Nuestros valores",
  },

  contact: {
    title: "Contacto",
    heading: "Empecemos con una conversación.",
    body:
      "Llámanos durante el horario de la clínica o déjanos tus datos abajo y te devolvemos la llamada.",
    formHeading: "Solicitar una llamada",
    phiNotice:
      "Por favor no compartas datos médicos, diagnósticos ni historial de salud en este formulario. Los recogeremos de forma segura por teléfono.",
    fields: {
      name: "Tu nombre",
      email: "Correo electrónico",
      phone: "Teléfono",
      bestTime: "Mejor hora para contactarte",
      reason: "¿En qué podemos ayudarte?",
      message: "¿Algo más que debamos saber?",
      messagePlaceholder: "Sin datos médicos, por favor — solo cómo podemos ayudarte.",
      preferredLanguage: "Idioma preferido",
    },
    bestTimes: {
      morning: "Por la mañana",
      afternoon: "Por la tarde",
      evening: "Al final del día",
      anytime: "Cualquier hora",
    },
    reasons: {
      newClient: "Soy un cliente nuevo",
      existingClient: "Soy un cliente actual",
      school: "Represento a una escuela o distrito",
      billing: "Pregunta de facturación",
      careers: "Empleo",
      other: "Otra cosa",
    },
    submit: "Solicitar una llamada",
    submitting: "Enviando…",
    successHeading: "Gracias — ya tenemos tus datos.",
    successBody:
      "Alguien de la clínica te llamará. Si es urgente, por favor llama directamente al 409-242-1559.",
    errorHeading: "No se pudo enviar.",
    errorBody: "Por favor llámanos al 409-242-1559 y lo resolvemos.",
    hoursHeading: "Cómo llegar",
    mapLabel: "Mapa que muestra la clínica en 6642 Phelan Blvd, Beaumont, Texas",
  },

  chat: {
    launcherLabel: "Chatea con nosotros",
    title: "Pregunta a Autism Family Services",
    subtitle: "Respuestas sobre servicios, tarifas y cómo empezar",
    greeting:
      "Hola — puedo ayudarte con servicios, tarifas, preguntas de seguro, cómo llegar y cómo empezar. ¿Qué te trae por aquí hoy?",
    placeholder: "Escribe tu mensaje…",
    send: "Enviar",
    thinking: "Escribiendo…",
    disclaimer:
      "Soy un asistente, no un clínico. No puedo dar consejos médicos ni diagnósticos — por favor no compartas datos de salud aquí.",
    escalate: "Llama al 409-242-1559",
    escalateNote: "¿Quieres hablar con una persona?",
    languageNote: "You can also write to me in English.",
    suggestions: [
      "¿Qué servicios ofrecen?",
      "¿Cuánto cuesta la terapia ABA?",
      "¿Cómo evalúo a mi hijo para autismo?",
      "¿Dónde están ubicados?",
    ],
    error: "Algo salió mal. Por favor llama al 409-242-1559 y te ayudamos directamente.",
    clear: "Borrar conversación",
  },

  footer: {
    tagline: "¡Brindando terapia ABA para el autismo y apoyos conductuales y de salud mental a nuestra comunidad!",
    motto: "Si lo vas a hacer, ¡hazlo con propósito!",
    navHeading: "Explorar",
    servicesHeading: "Servicios",
    contactHeading: "Contacto",
    crisisHeading: "¿Estás en crisis ahora mismo?",
    crisisBody:
      "Si tú o alguien que quieres está en peligro inmediato, llama al 911. Estas líneas son gratuitas, confidenciales y contestan las 24 horas.",
    staffPortal: "Portal del Personal",
    rights: "Autism Family Services of Beaumont LLC",
    photoDisclosure:
      "Las fotografías de este sitio son ilustrativas y no representan a clientes de Autism Family Services.",
    languageHeading: "Idioma",
  },

  staff: {
    title: "Portal del Personal",
    heading: "Solo para uso de la clínica",
    body: "Estos recursos son para el personal de Autism Family Services.",
    passwordLabel: "Código de acceso",
    passwordPlaceholder: "Ingresa el código de acceso",
    submit: "Entrar",
    wrong: "No se reconoció ese código de acceso.",
    signOut: "Cerrar sesión",
  },

  notFound: {
    title: "Página no encontrada",
    heading: "Esa página se movió.",
    body: "El sitio se reconstruyó recientemente. Prueba con una de estas.",
    home: "Volver a la página principal",
  },
};
