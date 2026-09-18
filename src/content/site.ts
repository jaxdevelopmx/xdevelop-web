export type Locale = "es" | "en";

export const locales: Locale[] = ["es", "en"];

export const pageSlugs = [
  "nosotros",
  "equipo",
  "servicios",
  "revision-de-proyectos",
  "inteligencia-artificial",
  "sistemas",
  "industrias",
  "metodo-xdevelop",
  "productos",
  "casos",
  "contacto",
  "preguntas-frecuentes",
  "aviso-de-privacidad",
] as const;

export type PageSlug = (typeof pageSlugs)[number];

export type PageContent = readonly [eyebrow: string, title: string, description: string];

const content = {
  es: {
    home: {
      eyebrow: "Evolución y desarrollo de software",
      title: "Software para operaciones que no pueden detenerse.",
      intro: "Revisamos, continuamos, modernizamos y operamos sistemas que ya importan para tu empresa.",
      cta: "Revisar mi proyecto",
    },
    pages: {
      "nosotros": ["Nosotros", "De Coca-Cola a Maicero, construimos con el mismo estándar.", "XDEVELOP nació para reducir la distancia entre las empresas y el software que su operación necesita."],
      "equipo": ["Equipo", "Tu proyecto no necesita a una persona que haga de todo.", "Necesita un equipo que sepa trabajar en conjunto, con responsabilidades claras y un mismo objetivo."],
      "servicios": ["Servicios", "Revisamos, continuamos y nos quedamos cuando el proyecto lo necesita.", "Entramos desde el punto en el que está tu operación: una primera versión con IA, un sistema heredado o un proyecto que necesita crecer."],
      "revision-de-proyectos": ["Revisión de proyectos", "Ya construiste algo. Ahora necesitas saber qué tan lejos puede llegar.", "Convertimos preguntas sobre código, datos, permisos, infraestructura y operación en decisiones para continuar."],
      "inteligencia-artificial": ["Inteligencia artificial", "Inteligencia artificial que resuelve. No solo que conversa.", "La utilizamos cuando mejora una decisión, reduce trabajo manual o hace posible un proceso que antes no lo era."],
      "sistemas": ["Sistemas", "¿Qué necesitas que haga tu sistema?", "Cuéntanos qué parte de tu operación quieres organizar, conectar, automatizar o hacer crecer."],
      "industrias": ["Industrias", "Cada industria pierde tiempo y control en lugares distintos.", "Antes de proponer tecnología entendemos cómo trabaja tu empresa y dónde se está deteniendo la operación."],
      "metodo-xdevelop": ["Método XDEVELOP", "Seis compromisos para entregarte un trabajo bien hecho.", "No necesitas confiar a ciegas: cada condición puede demostrarse."],
      "productos": ["Productos propios", "No aprendimos a operar software en teoría.", "Maicero, Kapttia, Residia y Mupi fueron concebidos, diseñados, desarrollados y operados por nuestro equipo."],
      "casos": ["Casos", "Lo que cambió cuando el software entró a la operación.", "Presentamos resultados comprobables, no funciones aisladas."],
      "contacto": ["Contacto", "Muéstranos qué construiste. Y qué debe pasar después.", "No necesitas preparar una presentación ni conocer todos los términos técnicos."],
      "preguntas-frecuentes": ["Preguntas frecuentes", "Lo que probablemente quieres saber antes de mostrarnos tu proyecto.", "No necesitas llegar con todas las respuestas. Muéstranos hasta dónde llegaste y te ayudamos a identificar qué sigue."],
      "aviso-de-privacidad": ["Aviso de privacidad", "Qué información recibimos y para qué la utilizamos.", "Explicamos qué datos recopilamos cuando nos escribes o navegas este sitio, con qué finalidad los tratamos y cómo puedes ejercer tus derechos."],
    },
  },
  en: {
    home: {
      eyebrow: "Software evolution and development",
      title: "Software for operations that cannot stop.",
      intro: "We review, continue, modernize and operate systems that already matter to your business.",
      cta: "Review my project",
    },
    pages: {
      "nosotros": ["About us", "From Coca-Cola to Maicero, we build to the same standard.", "XDEVELOP exists to close the distance between companies and the software their operations need."],
      "equipo": ["Team", "Your project does not need one person doing everything.", "It needs a team that knows how to work together, with clear responsibilities and one shared goal."],
      "servicios": ["Services", "We review, continue and stay when the project needs us.", "We enter wherever your operation is today: an AI-built first version, a legacy system or a project ready to grow."],
      "revision-de-proyectos": ["Project reviews", "You built something. Now you need to know how far it can go.", "We turn questions about code, data, permissions, infrastructure and operations into decisions for the next stage."],
      "inteligencia-artificial": ["Artificial intelligence", "AI that solves problems. Not just AI that talks.", "We use it when it improves a decision, reduces manual work or makes a previously impossible process possible."],
      "sistemas": ["Systems", "What do you need your system to do?", "Tell us what part of your operation you want to organize, connect, automate or grow."],
      "industrias": ["Industries", "Every industry loses time and control in different places.", "Before proposing technology, we understand how your company works and where the operation is getting stuck."],
      "metodo-xdevelop": ["The XDEVELOP Method", "Six commitments for work delivered properly.", "You should not have to trust blindly: every condition can be demonstrated."],
      "productos": ["Our products", "We did not learn to operate software in theory.", "Maicero, Kapttia, Residia and Mupi were conceived, designed, built and operated by our team."],
      "casos": ["Cases", "What changed when software entered the operation.", "We present measurable outcomes, not isolated features."],
      "contacto": ["Contact", "Show us what you built. And what needs to happen next.", "You do not need a presentation or technical vocabulary to start a conversation."],
      "preguntas-frecuentes": ["Frequently asked questions", "What you probably want to know before showing us your project.", "You do not need all the answers. Show us how far you got and we will help identify what comes next."],
      "aviso-de-privacidad": ["Privacy notice", "What information we receive and what we use it for.", "We explain which data we collect when you write to us or browse this site, why we process it and how you can exercise your rights."],
    },
  },
} as const;

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function isPageSlug(value: string): value is PageSlug {
  return pageSlugs.includes(value as PageSlug);
}

export function resolveSlug(slug?: string[]): PageSlug | null | undefined {
  if (!slug?.length) return undefined;
  if (slug.length > 1 || !isPageSlug(slug[0])) return null;
  return slug[0];
}

export function getHomeContent(locale: Locale) {
  return content[locale].home;
}

export function getPageContent(locale: Locale, slug: PageSlug | undefined): PageContent {
  if (!slug) {
    const { eyebrow, title, intro } = content[locale].home;
    return [eyebrow, title, intro];
  }
  return content[locale].pages[slug];
}
