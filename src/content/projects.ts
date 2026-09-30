/**
 * Detail pages for the products and cases shown in the home "Experiencia real"
 * section. Copy comes from existing sources only: the portfolio
 * (assets/source/portfolio), the Maicero onboarding (assets/source/maicero-kit),
 * the home cases and src/content/clients.ts.
 */
export type ProjectDetail = {
  slug: string;
  name: string;
  kind: "producto" | "cliente";
  sector: string;
  summary: string;
  /** Omitted when the source gives a number without saying what it measures. */
  metric?: { value: string; label: string };
  solution: string;
  outcomesTitle: string;
  outcomes: readonly string[];
  result?: string;
  stack?: readonly string[];
  /** Pieces of software delivered, as the sources name them. */
  deliverables: readonly string[];
  /** Operating state, from src/content/clients.ts. */
  status: string;
  /** Problems the software answers, each with how it answers them. */
  challenges?: readonly { title: string; problem: string; answer: string }[];
  /** Features worth showing on their own. */
  highlights?: readonly { title: string; text: string }[];
  /** Real screens from the portfolio, shown without a device frame. */
  /** `flat` screens are plain screenshots (rounded + shadow); the rest are transparent mockups. */
  gallery?: readonly { src: string; width: number; height: number; alt: string; caption: string; flat?: boolean }[];
  /** The client's own color, sampled from its logo or mockups; paints the hero band. */
  brand: string;
  image: {
    src: string;
    width: number;
    height: number;
    alt: string;
    logo?: boolean;
  };
};

export const projectDetails: readonly ProjectDetail[] = [
  {
    slug: "maicero",
    status: "Producto en producción",
    deliverables: ["Punto de venta", "App para repartidores", "Panel del dueño", "Bot de WhatsApp"],
    challenges: [
      {
        title: "Falta de control en las rutas",
        problem: "No hay visibilidad de lo que pasa con el producto una vez que sale de la tortillería.",
        answer: "Cada kilo queda registrado desde que sale hasta que se entrega.",
      },
      {
        title: "Precios alterados por los repartidores",
        problem: "El dueño fija un precio, pero el repartidor cobra otro y se queda con la diferencia.",
        answer: "Los precios los define el dueño y el repartidor no puede modificarlos.",
      },
      {
        title: "Dinero que no cuadra al final del día",
        problem: "Aparecen diferencias en caja y nadie sabe exactamente dónde estuvo el error.",
        answer: "Cada venta, cobro y movimiento queda registrado: el corte es automático y transparente.",
      },
      {
        title: "Pérdidas de inventario y merma",
        problem: "No se sabe con precisión cuánto producto salió, cuánto regresó o cuánto se desperdició.",
        answer: "Control total de inventario, devoluciones y merma.",
      },
      {
        title: "Nómina y comisiones a mano",
        problem: "Cada semana se pierde tiempo calculando cuánto pagar a cada repartidor, con errores y reclamos.",
        answer: "La nómina y las comisiones se calculan automáticamente.",
      },
      {
        title: "Sin información para decidir",
        problem: "El dueño no sabe cuánto vendió hoy, quién le debe o qué repartidor da mejores resultados.",
        answer: "Toda la información del negocio en tiempo real, desde el celular o la computadora.",
      },
    ],
    highlights: [
      {
        title: "El corte llega a tu WhatsApp",
        text: "Cada noche a las 10 pm el dueño recibe cuánto se vendió, cuánto se cobró, quién debe y las alertas del día.",
      },
      {
        title: "Pregúntale a tu negocio",
        text: "El dueño le escribe al bot “¿Cuánto me debe Doña Lupe?” y recibe la respuesta al instante con datos reales.",
      },
      {
        title: "Foto y GPS en cada entrega",
        text: "Si un cliente dice que no le llegó, hay prueba. Si el chofer dice que entregó, también.",
      },
      {
        title: "Funciona sin internet",
        text: "Si el repartidor se queda sin señal, la app sigue funcionando y sincroniza sola al recuperar la conexión.",
      },
      {
        title: "Tres toques para vender",
        text: "La pantalla del repartidor tiene tres pasos: cliente, producto y cobrar. Sin capacitación larga.",
      },
      {
        title: "Rutas en tiempo real",
        text: "El dueño ve en qué punto va cada chofer y, si alguien no puede terminar, reasigna su ruta en segundos.",
      },
    ],
    brand: "#2c3a4a",
    name: "Maicero",
    kind: "producto",
    sector: "Tortillerías",
    summary:
      "El sistema operativo diseñado para toda tortillería mexicana: punto de venta, app de repartidor, control de cartera, inventario, producción y el corte del día.",
    solution:
      "Maicero reemplaza el cuaderno, la calculadora y WhatsApp. No es un software genérico adaptado: nació para resolver los problemas operativos del sector tortillero y controla desde que entra la materia prima hasta que el dinero llega a las manos del dueño.",
    outcomesTitle: "Qué incluye",
    outcomes: [
      "Punto de venta para vender por pieza o al peso; al cerrar el día, el sistema dice si todo cuadra.",
      "Registro de cada entrega con foto y ubicación, visible en tiempo real.",
      "Cartera de clientes con un semáforo de quién debe, cuánto y desde cuándo.",
      "App para repartidores que funciona sin internet y sincroniza al recuperar la conexión.",
      "Comisiones y nómina calculadas automáticamente al cierre del día.",
      "Inventario, tiradas de producción y reportes para una o varias sucursales.",
    ],
    result:
      "El dueño deja de perseguir cuentas, de cuadrar a mano y de enterarse tarde de lo que pasó. Todo queda registrado, visible y en tiempo real: menos errores, menos pérdidas y más control.",
    image: {
      src: "/brand/maicero/maicero-lockup-dark.svg",
      width: 328,
      height: 64,
      alt: "Logo de Maicero",
      logo: true,
    },
  },
  {
    slug: "residia",
    status: "Producto en producción",
    deliverables: ["Plataforma de administración", "Control de accesos", "Reservas e incidencias", "Comunicación con residentes"],
    brand: "#0a2a8a",
    name: "Residia",
    kind: "producto",
    sector: "Administración de condominios",
    summary:
      "Accesos, cobranza e incidencias conviven en un mismo producto. Las necesidades de la administración alimentan su evolución.",
    metric: { value: "−60%", label: "de tiempo en cobranza y reportes" },
    solution:
      "Residia es una plataforma integral que transforma la administración de condominios y residenciales al centralizar accesos, incidencias, reservas y comunicación en un solo sistema.",
    outcomesTitle: "Con Residia, la administración logra",
    outcomes: [
      "Control total y seguro de accesos y permisos a las instalaciones.",
      "Gestión centralizada de incidencias, solicitudes y reservas desde una misma plataforma.",
      "Comunicación inmediata y transparente entre residentes y administración.",
      "Monitoreo en tiempo real de operaciones y reportes de la comunidad.",
    ],
    result:
      "Mayor eficiencia operativa, mejor experiencia para los residentes y transparencia total en la gestión del condominio.",
    stack: ["Python", "JavaScript", "TypeScript", "Next.js"],
    image: { src: "/media/projects/residia-mockup.webp", width: 720, height: 623, alt: "Plataforma Residia en laptop, tablet y teléfono" },
  },
  {
    slug: "unam",
    status: "Operación activa",
    deliverables: ["App móvil para alumnos", "Backoffice administrativo"],
    gallery: [
      { src: "/media/projects/unam-app-screen.webp", width: 296, height: 640, alt: "Inicio de la app de alumnos de la Facultad de Odontología", caption: "App para alumnos: promedio, asistencia, avisos y próxima clase.", flat: true },
      { src: "/media/projects/unam-mockup.webp", width: 696, height: 401, alt: "Panel de anuncios del backoffice de la facultad", caption: "Backoffice: anuncios, citas, pagos y reportes de la facultad." },
    ],
    brand: "#0f2e5c",
    name: "UNAM",
    kind: "cliente",
    sector: "Facultad de Odontología",
    summary: "Trámites que antes exigían acudir y formarse ahora se resuelven en línea.",
    metric: { value: "−70%", label: "en tiempos de atención presencial" },
    solution:
      "Diseñamos e implementamos una solución digital integral, compuesta por una app móvil para alumnos y un backoffice administrativo.",
    outcomesTitle: "Qué permitió",
    outcomes: [
      "Digitalizar y simplificar los procesos académicos y administrativos clave.",
      "Mejorar la comunicación mediante contenidos segmentados y notificaciones en tiempo real.",
      "Brindar mayor control y trazabilidad en pagos, incidencias y citas.",
      "Optimizar la gestión de información con cargas masivas y validaciones automatizadas.",
      "Ofrecer una experiencia ágil, intuitiva y accesible para alumnos y administradores.",
    ],
    result:
      "La solución impulsó la eficiencia operativa, redujo tiempos de gestión y elevó la experiencia del usuario, con un ecosistema tecnológico moderno, escalable y alineado a las necesidades de la facultad.",
    stack: ["JavaScript", "TypeScript", "Next.js", "NestJS"],
    image: { src: "/media/projects/unam-mockup.webp", width: 696, height: 401, alt: "Backoffice de la Facultad de Odontología de la UNAM en una laptop" },
  },
  {
    slug: "twba",
    status: "Operación activa",
    deliverables: ["Reportes REPSE automatizados", "Control de asistencia con reconocimiento facial", "Gestión de nómina"],
    brand: "#050811",
    name: "TWBA",
    kind: "cliente",
    sector: "Recursos humanos",
    summary: "Un reporte REPSE que requería tres días de captura.",
    metric: { value: "20 min", label: "para un reporte REPSE que antes tomaba tres días" },
    solution:
      "Automatizamos los reportes regulatorios REPSE con trazabilidad completa de contratos y nóminas, y sumamos un sistema de control de asistencia mediante reconocimiento facial.",
    outcomesTitle: "Qué resuelve",
    outcomes: [
      "Reportes REPSE generados automáticamente.",
      "Trazabilidad completa de contratos y nóminas.",
      "Control de asistencia mediante reconocimiento facial.",
      "Gestión automatizada de nómina.",
    ],
    image: {
      src: "/media/generated/client-logos-twba-logo-blanco-twba-640.webp",
      width: 640,
      height: 640,
      alt: "Logo de TWBA",
      logo: true,
    },
  },
  {
    slug: "sgt",
    status: "Operación activa",
    deliverables: ["Sitio web", "ERP", "App móvil híbrida"],
    brand: "#17563d",
    name: "SGT",
    kind: "cliente",
    sector: "Gestión operativa",
    summary: "Reportes acompañados por fotografía, ubicación y hora.",
    metric: { value: "100%", label: "de reportes con geocerca y foto" },
    solution:
      "Realizamos una actualización integral del sitio web, la implementación de un ERP y el desarrollo de una aplicación móvil híbrida.",
    outcomesTitle: "Qué logramos",
    outcomes: [
      "Gestionar y premiar a los empleados de intendencia.",
      "Optimizar la comunicación interna.",
      "Generar métricas en tiempo real sobre desempeño y cumplimiento.",
      "Una mejor experiencia de usuario y una gestión más eficiente.",
    ],
    result:
      "El proyecto impulsó la retención y satisfacción del personal, redujo tiempos de gestión administrativa y aportó beneficios económicos a los empleados, fortaleciendo la cultura organizacional del cliente.",
    stack: ["Firebase", "JavaScript", "TypeScript", "Next.js", "Python"],
    image: { src: "/media/projects/sgt-mockup.webp", width: 800, height: 470, alt: "ERP, sitio web y app de SGT en varios dispositivos" },
  },
  {
    slug: "icee",
    status: "Operación activa",
    deliverables: ["Plataforma de trazabilidad", "App para choferes", "Registro de evidencias en campo"],
    gallery: [
      { src: "/media/projects/icee-login-screen.webp", width: 670, height: 446, alt: "Inicio de sesión de la plataforma de ICEE", caption: "Plataforma web para la administración de la operación.", flat: true },
      { src: "/media/projects/icee-mockup.webp", width: 387, height: 480, alt: "Entregas del día en la app para choferes de ICEE", caption: "App para choferes: ruta del día, clientes por visitar y entregas." },
    ],
    brand: "#154a86",
    name: "ICEE",
    kind: "cliente",
    sector: "Logística de última milla",
    summary: "Información y evidencia conectadas con el proceso operativo.",
    metric: { value: "−35%", label: "de incidencias en rutas" },
    solution:
      "Desarrollamos una plataforma integral de trazabilidad y gestión logística, desde la planeación administrativa hasta la ejecución y validación en campo.",
    outcomesTitle: "Qué logramos",
    outcomes: [
      "Digitalización completa del proceso de entrega de mercancía.",
      "Seguimiento en tiempo real de órdenes, rutas y entregas.",
      "Registro automatizado de evidencias: fotos, firmas, kilometraje e incidencias.",
      "Control total de usuarios, reportes y desempeño operativo.",
    ],
    result:
      "El proyecto optimizó la operación logística, redujo errores manuales, mejoró la comunicación entre choferes y supervisores y brindó trazabilidad total de las entregas.",
    stack: ["Python", "JavaScript", "TypeScript", "Next.js"],
    image: { src: "/media/projects/icee-mockup.webp", width: 387, height: 480, alt: "App de entregas de ICEE en un teléfono" },
  },
];

export function getProjectDetail(slug: string) {
  return projectDetails.find((project) => project.slug === slug);
}

/** The project after `slug`, wrapping around, for the "next project" link. */
export function getNextProjectDetail(slug: string, offset = 1) {
  const index = projectDetails.findIndex((project) => project.slug === slug);
  return projectDetails[(index + offset) % projectDetails.length];
}
