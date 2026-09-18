import Image from "next/image";
import Link from "next/link";
import { ClientSection } from "@/components/client-section";
import { JsonLd } from "@/components/json-ld";
import { SceneLoader } from "@/components/scene-loader";
import { getSchedulingHref, isExternalScheduling, organization } from "@/content/organization";
import { getConsentCopy } from "@/content/consent";
import { analyticsEvents } from "@/lib/analytics";
import { localizedPath } from "@/lib/seo";
import { homeStructuredData } from "@/lib/structured-data";

const schedulingHref = getSchedulingHref("es");
const schedulingAttributes = isExternalScheduling()
  ? { target: "_blank" as const, rel: "noreferrer" }
  : {};

const entryPoints = [
  {
    number: "01",
    title: "Lo comenzamos con inteligencia artificial",
    text: "La primera versión ya funciona. Ahora debe soportar usuarios, datos, permisos, integraciones y decisiones reales.",
    action: "Prepararlo para la siguiente etapa",
  },
  {
    number: "02",
    title: "Otro equipo lo dejó a medias",
    text: "Hay código, diseños o módulos desarrollados, pero falta claridad para continuar.",
    action: "Retomar mi proyecto",
  },
  {
    number: "03",
    title: "El sistema funciona, pero tocarlo se volvió un riesgo",
    text: "Hay errores recurrentes, tecnología desactualizada o funciones que nadie quiere modificar.",
    action: "Modernizarlo sin detener la operación",
  },
  {
    number: "04",
    title: "El negocio creció más rápido que el sistema",
    text: "Aumentaron los usuarios, las sucursales, los procesos o las integraciones. El software se quedó atrás.",
    action: "Prepararlo para crecer",
  },
];

const roles = [
  ["Dirección de producto", "Convierte las necesidades del negocio en prioridades y resultados claros."],
  ["Gestión del proyecto", "Coordina decisiones, responsables, avances y pendientes."],
  ["Arquitectura de software", "Define una base capaz de soportar nuevas funciones sin comprometer lo que ya funciona."],
  ["Ingeniería frontend y backend", "Construye la experiencia, los procesos, los datos y las integraciones."],
  ["Revisión y calidad", "Comprueba el trabajo con una mirada distinta a la de quien lo desarrolló."],
  ["Operación y soporte", "Conserva el contexto cuando el sistema ya tiene usuarios y necesita continuar."],
];

const cases = [
  ["UNAM", "Educación y trámites", "−70%", "Trámites que antes exigían acudir y formarse ahora se resuelven en línea."],
  ["TWBA", "Recursos humanos", "20 min", "Un reporte REPSE que requería tres días de captura."],
  ["SGT", "Personal en campo", "100%", "Reportes acompañados por fotografía, ubicación y hora."],
  ["Residia", "Administración de condominios", "−60%", "Accesos, cobranza e incidencias reunidos en un mismo producto."],
  ["ICEE", "Logística de última milla", "−35%", "Información y evidencia conectadas con el proceso operativo."],
  ["Maicero", "Alimentos", "97.7%", "Ventas registradas con fotografía de evidencia."],
];

export default function Home() {
  const consent = getConsentCopy("es");

  return (
    <div className="home-shell">
      <JsonLd data={homeStructuredData("es")} />
      <header className="site-header">
        <Link href="#inicio" className="brand" aria-label="XDEVELOP, inicio">
          <Image src="/brand/xdevelop-logo-black.png" alt="XDEVELOP software" width={196} height={52} priority />
        </Link>
        <nav className="desktop-nav" aria-label="Navegación principal">
          <a href="#proyecto">Qué hacemos</a>
          <a href="#equipo">Cómo trabajamos</a>
          <a href="#clientes">Clientes</a>
          <a href="#casos">Experiencia</a>
          <a href="#nosotros">Nosotros</a>
        </nav>
        <div className="header-actions">
          <Link
            className="language"
            href={localizedPath("en")}
            hrefLang="en"
            aria-label="Read in English"
            data-analytics-event={analyticsEvents.languageChange}
            data-analytics-from="es"
            data-analytics-to="en"
          >
            ES <span>/</span> EN
          </Link>
          <a
            className="button button-dark button-small"
            href="#contacto"
            data-analytics-event={analyticsEvents.scheduleOpen}
            data-analytics-source="header"
          >
            Revisar mi proyecto
          </a>
        </div>
      </header>

      <main id="inicio">
        <div id="continuity-story" className="continuity-story">
          <div className="assembly-stage"><SceneLoader /><div className="assembly-caption"><span className="status-dot" /> Continuidad visible <span>Sistema modular</span></div></div>
          <div className="story-chapters">
        <section className="hero scene-act-1" aria-labelledby="hero-title">
          <div className="eyebrow"><span className="status-dot" /> Evolución y desarrollo de software</div>
          <div className="hero-copy">
            <h1 id="hero-title">Software para operaciones que <em>no pueden detenerse.</em></h1>
            <p className="hero-lede">Si tu empresa ya comenzó un sistema con inteligencia artificial, no necesitas desecharlo ni convertirte en experto en tecnología para poder continuar.</p>
            <div className="hero-actions">
              <a
                className="button button-dark"
                href="#contacto"
                data-analytics-event={analyticsEvents.scheduleOpen}
                data-analytics-source="hero"
              >
                Revisar mi proyecto <span>↗</span>
              </a>
              <a className="text-link" href="#equipo">Conocer al equipo <span>↗</span></a>
            </div>
          </div>
          <div className="hero-note">
            <span>01—04</span>
            <p>Entendemos lo que ya construiste y sumamos el equipo que el proyecto necesita.</p>
          </div>
        </section>

        <section className="story-chapter" aria-labelledby="integration-title">
          <div className="eyebrow"><span className="signal-line" /> 02 — Integrar el equipo</div>
          <h2 id="integration-title">Cada parte necesita a alguien que vea el conjunto.</h2>
          <p>Separamos las responsabilidades, revisamos las conexiones y sumamos el equipo que falta. Lo que ya sirve conserva su lugar.</p>
          <ol className="story-responsibilities"><li>Dirección y arquitectura</li><li>Ingeniería y calidad</li><li>Operación y soporte</li></ol>
          <a className="text-link" href="#equipo">Conoce las responsabilidades <span>↗</span></a>
        </section>
        <section className="story-chapter" aria-labelledby="operation-title">
          <div className="eyebrow"><span className="status-dot" /> 03 — Sistema operando</div>
          <h2 id="operation-title">Todo conectado. Listo para continuar.</h2>
          <p>Código bajo tu control, decisiones con responsable y un equipo que conserva el contexto. Una base para seguir construyendo.</p>
          <a className="button button-dark" href="#casos">Explorar resultados reales <span>↗</span></a>
        </section>
          </div>
        </div>
        <section className="proof-strip" aria-label="XDEVELOP en números">
          <div><strong>14</strong><span>años construyendo y mejorando sistemas</span></div>
          <div><strong>+200</strong><span>proyectos desarrollados</span></div>
          <div><strong>+15</strong><span>industrias atendidas</span></div>
          <div><strong>100%</strong><span>del código bajo tu control</span></div>
        </section>

        <section className="diagnosis section-dark scene-act-1" id="proyecto" aria-labelledby="diagnosis-title">
          <div className="section-intro">
            <div className="eyebrow eyebrow-light"><span className="signal-line" /> ¿En qué punto está tu proyecto?</div>
            <h2 id="diagnosis-title">No todos los proyectos necesitan empezar de nuevo.</h2>
          </div>
          <div className="entry-list">
            {entryPoints.map((entry) => (
              <article className="entry-row" key={entry.number}>
                <span className="entry-number">{entry.number}</span>
                <h3>{entry.title}</h3>
                <p>{entry.text}</p>
                <a
                  href="#contacto"
                  className="arrow-link"
                  data-analytics-event={analyticsEvents.scheduleOpen}
                  data-analytics-source={`diagnosis-${entry.number}`}
                >
                  {entry.action} <span>↗</span>
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="continuity scene-act-2" id="equipo" aria-labelledby="continuity-title">
          <div className="section-intro split-intro">
            <div>
              <div className="eyebrow"><span className="status-dot" /> Continuidad de proyecto</div>
              <h2 id="continuity-title">La IA hizo posible empezar. Para continuar, sí necesitas un equipo.</h2>
            </div>
            <p>No necesitas aprender siete profesiones para terminar tu proyecto. Una primera versión puede convertir una idea en pantallas y funciones; un sistema real necesita que distintas decisiones tengan responsables.</p>
          </div>
          <div className="role-grid">
            {roles.map(([title, text], index) => (
              <article className="role" key={title}>
                <span className="role-index">0{index + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <div className="continuity-statement"><span /> No incorporas personas aisladas. Incorporas un equipo acostumbrado a trabajar junto.</div>
        </section>

        <section className="method section-paper scene-act-2" aria-labelledby="method-title">
          <div className="method-heading">
            <div className="eyebrow"><span className="status-dot" /> Así damos continuidad a tu proyecto</div>
            <h2 id="method-title">No empezamos programando. Empezamos entendiendo.</h2>
          </div>
          <div className="process-line">
            {["Entendemos", "Priorizamos", "Integramos al equipo", "Damos continuidad"].map((step, index) => (
              <div className="process-step" key={step}>
                <span>0{index + 1}</span>
                <strong>{step}</strong>
                <p>{[
                  "Revisamos el proyecto y la operación que debe resolver.",
                  "Separamos lo urgente de lo importante y definimos qué conviene conservar.",
                  "Incorporamos los roles que necesita la siguiente etapa.",
                  "Construimos, revisamos y comprobamos cada avance.",
                ][index]}</p>
              </div>
            ))}
          </div>
          <Link className="button button-outline" href="#contacto">Conocer cómo trabajamos <span>↗</span></Link>
        </section>

        <ClientSection />

        <section className="cases section-dark scene-act-3" id="casos" aria-labelledby="cases-title">
          <div className="section-intro split-intro">
            <div>
              <div className="eyebrow eyebrow-light"><span className="signal-line" /> Software nuestro ya opera en</div>
              <h2 id="cases-title">Lo que cambió cuando el software entró a la operación.</h2>
            </div>
            <p>Estas cifras provienen de proyectos que están operando actualmente. No presentamos funciones aisladas: presentamos lo que una empresa pudo hacer mejor.</p>
          </div>
          <div className="case-grid">
            {cases.map(([name, category, result, text]) => (
              <article className="case" key={name}>
                <div className="case-top"><span>{name}</span><span>{category}</span></div>
                <strong>{result}</strong>
                <p>{text}</p>
                <a
                  className="arrow-link"
                  href="#contacto"
                  data-analytics-event={analyticsEvents.caseSelect}
                  data-analytics-case={name}
                >
                  Ver caso <span>↗</span>
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="closing scene-act-3" id="contacto" aria-labelledby="closing-title">
          <div className="closing-mark">×</div>
          <div className="closing-copy">
            <div className="eyebrow"><span className="status-dot" /> El siguiente paso</div>
            <h2 id="closing-title">Ya construiste una parte. No tienes que terminarla solo.</h2>
            <p>Muéstranos qué existe, qué quieres lograr y dónde comenzaste a perder claridad. Te diremos qué conviene conservar y qué equipo necesita la siguiente etapa.</p>
            <div className="hero-actions">
              <a className="button button-dark" href={`mailto:${organization.email}`}>Quiero continuar mi proyecto <span>↗</span></a>
              <a
                className="text-link"
                href={schedulingHref}
                data-analytics-event={analyticsEvents.scheduleOpen}
                data-analytics-source="closing"
                {...schedulingAttributes}
              >
                Agendar una conversación <span>↗</span>
              </a>
              <a
                className="text-link"
                href={organization.whatsapp}
                target="_blank"
                rel="noreferrer"
                data-analytics-event={analyticsEvents.whatsappClick}
                data-analytics-source="closing"
              >
                Escribir por WhatsApp <span>↗</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer" id="nosotros">
        <div className="footer-brand"><Image src="/brand/xdevelop-logo-black.png" alt="XDEVELOP" width={196} height={52} /><p>Software para operaciones que no pueden detenerse.</p></div>
        <div className="footer-column"><span className="footer-label">Contacto</span><a href={`mailto:${organization.email}`}>{organization.email}</a><a href={`tel:${organization.phone}`}>{organization.phoneDisplay}</a><a href={organization.whatsapp} target="_blank" rel="noreferrer" data-analytics-event={analyticsEvents.whatsappClick} data-analytics-source="footer">WhatsApp</a></div>
        <div className="footer-column"><span className="footer-label">Oficinas</span><address>Av. Marina Nacional 385, Piso 3<br />Verónica Anzures, Miguel Hidalgo<br />CDMX, México</address></div>
        <div className="footer-column"><span className="footer-label">Explorar</span><a href="#proyecto">Qué hacemos</a><a href="#casos">Casos</a><a href="#equipo">Equipo</a><Link href={localizedPath("es", "aviso-de-privacidad")}>Aviso de privacidad</Link></div>
        <div className="footer-bottom"><span>© 2026 XDEVELOP</span><button type="button" className="footer-consent" data-consent-preferences>{consent.preferences}</button><span>Hecho para continuar.</span></div>
      </footer>
    </div>
  );
}
