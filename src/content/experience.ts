import type { Locale } from "./site";

type Pair = readonly [string, string];
export const translated = (locale: Locale, value: Pair) => value[locale === "es" ? 0 : 1];

export const services = [
  { slug: "revision-de-proyectos", title: ["Revisión de proyectos", "Project review"], intro: ["Antes de invertir más, entiende qué tienes.", "Before investing more, understand what you have."], body: ["Revisamos código, datos, permisos, integraciones y despliegue. Identificamos qué conservar, qué corregir y qué necesita atención primero.", "We review code, data, permissions, integrations and deployment. We identify what to keep, what to fix and what needs attention first."], outcome: ["Un diagnóstico y prioridades para la siguiente etapa.", "A diagnosis and priorities for the next stage."] },
  { slug: "continuidad", title: ["Continuidad de software", "Software continuity"], intro: ["Retoma el proyecto sin perder lo construido.", "Move forward without losing what you built."], body: ["Reconstruimos el contexto de una primera versión con IA o de un proyecto heredado. Sumamos las responsabilidades que faltan y trabajamos sobre una base revisada.", "We recover the context of an AI-built first version or an inherited project. We bring in missing responsibilities and work from a reviewed foundation."], outcome: ["Un equipo, un alcance y una ruta para continuar.", "A team, a scope and a path forward."] },
  { slug: "modernizacion", title: ["Modernización", "Modernization"], intro: ["Haz que cambiar deje de ser un riesgo.", "Make change less risky."], body: ["Separamos los cambios en etapas, revisamos dependencias y protegemos los procesos que ya están en uso. Cada transición necesita comprobaciones y una forma de volver atrás.", "We break changes into stages, review dependencies and protect processes already in use. Every transition needs verification and a way back."], outcome: ["Evolución gradual con controles sobre la operación.", "Gradual improvement with operational controls."] },
  { slug: "equipo-dedicado", title: ["Equipo dedicado", "Dedicated team"], intro: ["Las decisiones importantes tienen responsable.", "Important decisions have an owner."], body: ["Integramos producto, gestión, arquitectura, ingeniería, calidad y operación según lo que necesita el proyecto. Un mismo equipo conserva el contexto de principio a fin.", "We bring together product, management, architecture, engineering, quality and operations to match the project. One team keeps the context from start to finish."], outcome: ["Responsabilidades claras y trabajo coordinado.", "Clear responsibilities and coordinated work."] },
  { slug: "desarrollo", title: ["Desarrollo desde cero", "New software"], intro: ["Empieza por la operación que quieres resolver.", "Start with the operation you want to improve."], body: ["Convertimos procesos, usuarios y restricciones en un alcance concreto. Diseñamos y construimos por etapas que puedan revisarse con las personas que usarán el sistema.", "We turn processes, users and constraints into a concrete scope. We design and build in stages that can be reviewed with the people who will use the system."], outcome: ["Una primera etapa útil y una base para crecer.", "A useful first stage and a foundation for growth."] },
  { slug: "operacion", title: ["Operación y soporte", "Operations and support"], intro: ["El lanzamiento también es un comienzo.", "Launch is a beginning, too."], body: ["Conservamos el conocimiento del sistema, atendemos incidencias y revisamos su comportamiento. La continuidad necesita responsables, visibilidad y prioridades compartidas.", "We keep system knowledge, address incidents and review its behavior. Continuity requires owners, visibility and shared priorities."], outcome: ["Contexto técnico disponible cuando la operación lo necesita.", "Technical context available when operations need it."] },
] as const;

export const roles = [
  [["Dirección de producto", "Product direction"], ["Conecta las necesidades del negocio con prioridades y resultados.", "Connects business needs to priorities and outcomes."]],
  [["Gestión del proyecto", "Project management"], ["Coordina decisiones, responsables y avances.", "Coordinates decisions, owners and progress."]],
  [["Arquitectura", "Architecture"], ["Protege la base sobre la que crecerá el sistema.", "Protects the foundation the system will grow on."]],
  [["Ingeniería", "Engineering"], ["Construye experiencias, procesos, datos e integraciones.", "Builds experiences, processes, data and integrations."]],
  [["Calidad", "Quality"], ["Comprueba el trabajo con una mirada distinta a la de quien lo desarrolló.", "Checks the work with a perspective different from its author's."]],
  [["Operación", "Operations"], ["Conserva el contexto cuando el sistema ya tiene usuarios.", "Keeps the context when the system has users."]],
] as const;

export const cases = [
  { slug: "unam", name: "UNAM", metric: "−70%", category: ["Educación y trámites", "Education and administration"], result: ["Trámites que antes exigían acudir y formarse ahora se resuelven en línea.", "Procedures that once required a visit and a queue are now completed online."], logo: "unam-escudofacultadodontologiaunam" },
  { slug: "twba", name: "TWBA", metric: "20 min", category: ["Recursos humanos", "Human resources"], result: ["Un reporte REPSE que requería tres días de captura.", "A REPSE report that required three days of data entry."], logo: "twba-logo-blanco-twba" },
  { slug: "sgt", name: "SGT", metric: "100%", category: ["Personal en campo", "Field teams"], result: ["Reportes acompañados por fotografía, ubicación y hora.", "Reports accompanied by photos, location and time."], logo: "sgt-logo-letras-negras" },
  { slug: "residia", name: "Residia", metric: "−60%", category: ["Administración de condominios", "Condominium management"], result: ["Accesos, cobranza e incidencias reunidos en un mismo producto.", "Access, collections and incidents brought together in one product."], logo: "residia-residia-logo-degradado" },
  { slug: "icee", name: "ICEE", metric: "−35%", category: ["Logística de última milla", "Last-mile logistics"], result: ["Información y evidencia conectadas con el proceso operativo.", "Information and evidence connected to the operational process."], logo: "icee-logo-icee" },
  { slug: "maicero", name: "Maicero", metric: "97.7%", category: ["Alimentos", "Food"], result: ["Ventas registradas con fotografía de evidencia.", "Sales recorded with photographic evidence."], logo: null },
] as const;

export const products = [
  { slug: "maicero", name: "Maicero", description: ["Tecnología que también se prueba en la operación de alimentos.", "Technology tested in food operations, too."], detail: ["La experiencia de operar Maicero conecta el desarrollo con ventas, registros y evidencia del trabajo diario.", "Operating Maicero connects development with sales, records and evidence of daily work."] },
  { slug: "kapttia", name: "Kapttia", description: ["De la idea al producto y su continuidad.", "From an idea to a product and its continuity."], detail: ["Un producto propio concebido, diseñado, desarrollado y operado por el equipo de XDEVELOP.", "An in-house product conceived, designed, built and operated by the XDEVELOP team."] },
  { slug: "residia", name: "Residia", description: ["Una operación conectada para condominios.", "Connected operations for condominiums."], detail: ["Accesos, cobranza e incidencias conviven en un mismo producto. Las necesidades de la administración alimentan su evolución.", "Access, collections and incidents live in one product. Management needs inform its evolution."] },
  { slug: "mupi", name: "Mupi", description: ["Construir también significa hacerse cargo.", "Building also means taking responsibility."], detail: ["Un producto propio que forma parte de la experiencia de XDEVELOP diseñando, desarrollando y operando software.", "An in-house product that is part of XDEVELOP's experience designing, developing and operating software."] },
] as const;

export const steps = [
  [["Entendemos", "Understand"], ["Revisamos lo construido y la operación que debe resolver.", "We review what exists and the operation it needs to support."]],
  [["Priorizamos", "Prioritize"], ["Separamos lo urgente de lo importante y definimos qué conservar.", "We separate urgency from importance and decide what to keep."]],
  [["Integramos", "Integrate"], ["Incorporamos las responsabilidades que necesita la siguiente etapa.", "We bring in the responsibilities the next stage needs."]],
  [["Damos continuidad", "Keep it running"], ["Construimos, revisamos y comprobamos cada avance.", "We build, review and verify every step forward."]],
] as const;

export const faqs = [
  [["¿Pueden continuar un proyecto iniciado con IA?", "Can you continue an AI-built project?"], ["Sí. Primero revisamos el código, los datos, los permisos y cómo se ejecuta. Esa revisión permite decidir qué conservar y qué necesita trabajo antes de crecer.", "Yes. First we review code, data, permissions and how it runs. That review helps decide what to keep and what needs work before scaling."]],
  [["¿Tengo que empezar de nuevo?", "Do I have to start over?"], ["No necesariamente. La revisión busca identificar lo que sirve. Una reconstrucción debe responder a razones técnicas y operativas, no ser la primera respuesta.", "Not necessarily. The review identifies what works. A rebuild should follow technical and operational reasons, rather than be the first answer."]],
  [["¿El código queda bajo mi control?", "Does the code remain under my control?"], ["Sí. El código del proyecto queda bajo tu control. Aclaramos accesos, repositorios y entregables desde el comienzo.", "Yes. Your project's code remains under your control. We clarify access, repositories and deliverables from the start."]],
  [["¿Qué necesito para la primera conversación?", "What do I need for the first conversation?"], ["Cuéntanos qué existe, quién lo usa y qué necesitas que pase después. No hace falta preparar una presentación ni compartir contraseñas.", "Tell us what exists, who uses it and what needs to happen next. You do not need a presentation or to share passwords."]],
] as const;
