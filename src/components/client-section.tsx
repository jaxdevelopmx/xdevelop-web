"use client";

import Image from "next/image";
import { useState, useMemo } from "react";
import { analyticsEvents, trackEvent } from "@/lib/analytics";

export interface ClientItem {
  id: string;
  name: string;
  category: string;
  sector: "transporte" | "infraestructura" | "corporativo" | "fintech";
  sectorLabel: string;
  impact: string;
  status: string;
  mono: string;
  color: string;
  metric?: string;
  description: string;
}

const clientsData: ClientItem[] = [
  {
    id: "unam",
    name: "UNAM",
    category: "Facultad de Odontología",
    sector: "corporativo",
    sectorLabel: "Educación e Institucional",
    impact: "−70% en tiempos de atención presencial",
    status: "Operación activa",
    metric: "−70%",
    mono: "/media/generated/client-logos-unam-escudofacultadodontologiaunam-320-mono.webp",
    color: "/media/generated/client-logos-unam-escudofacultadodontologiaunam-320.webp",
    description: "Digitalización de trámites y expedientes de estudiantes y pacientes, eliminando filas y tiempos muertos.",
  },
  {
    id: "twba",
    name: "TWBA",
    category: "Agencia de Talento",
    sector: "corporativo",
    sectorLabel: "Recursos Humanos",
    impact: "Captura REPSE reducida de 3 días a 20 min",
    status: "Operación activa",
    metric: "20 min",
    mono: "/media/generated/client-logos-twba-logo-blanco-twba-320-mono.webp",
    color: "/media/generated/client-logos-twba-logo-blanco-twba-320.webp",
    description: "Automatización de reportes regulatorios REPSE con trazabilidad completa de contratos y nóminas.",
  },
  {
    id: "sgt",
    name: "SGT",
    category: "Seguridad y Gestión",
    sector: "transporte",
    sectorLabel: "Logística y Transporte",
    impact: "100% de reportes con geocerca y foto",
    status: "Operación activa",
    metric: "100%",
    mono: "/media/generated/client-logos-sgt-logo-letras-negras-320-mono.webp",
    color: "/media/generated/client-logos-sgt-logo-letras-negras-320.webp",
    description: "Control en tiempo real de personal y activos en campo con validación fotográfica y GPS.",
  },
  {
    id: "residia",
    name: "Residia",
    category: "Administración Condominal",
    sector: "fintech",
    sectorLabel: "Proptech y Fintech",
    impact: "−60% tiempo en cobranza y reportes",
    status: "Producto en producción",
    metric: "−60%",
    mono: "/media/generated/client-logos-residia-residia-logo-degradado-320-mono.webp",
    color: "/media/generated/client-logos-residia-residia-logo-degradado-320.webp",
    description: "Plataforma integral de control de accesos, estados de cuenta automatizados e incidencias residenciales.",
  },
  {
    id: "icee",
    name: "ICEE",
    category: "Logística Fría",
    sector: "transporte",
    sectorLabel: "Logística y Transporte",
    impact: "−35% incidencias en rutas",
    status: "Operación activa",
    metric: "−35%",
    mono: "/media/generated/client-logos-icee-logo-icee-320-mono.webp",
    color: "/media/generated/client-logos-icee-logo-icee-320.webp",
    description: "Trazabilidad de cadena de distribución, órdenes de servicio y supervisión de puntos de venta.",
  },
  {
    id: "almar",
    name: "Almar Group",
    category: "Operaciones Industriales",
    sector: "fintech",
    sectorLabel: "Industrial y Corporativo",
    impact: "Continuidad operativa 24/7",
    status: "Operación activa",
    mono: "/media/generated/client-logos-almar-almargroup-logo-2025-320-mono.webp",
    color: "/media/generated/client-logos-almar-almargroup-logo-2025-320.webp",
    description: "Sistemas de gestión interna y monitoreo de inventarios para cadena de suministros industrial.",
  },
  {
    id: "auoeste",
    name: "Auoeste",
    category: "Infraestructura Carretera",
    sector: "infraestructura",
    sectorLabel: "Infraestructura",
    impact: "Monitoreo continuo de peajes",
    status: "Operación activa",
    mono: "/media/generated/client-logos-auoeste-logo-auoeste-gris-y-azul-320-mono.webp",
    color: "/media/generated/client-logos-auoeste-logo-auoeste-gris-y-azul-320.webp",
    description: "Modernización de sistemas de reporte operativo y control de flujos vehiculares concesionados.",
  },
  {
    id: "ausol",
    name: "Ausol",
    category: "Concesiones Viales",
    sector: "infraestructura",
    sectorLabel: "Infraestructura",
    impact: "Integración de recaudación y auditoría",
    status: "Operación activa",
    mono: "/media/generated/client-logos-ausol-ausol-logo-baja-320-mono.webp",
    color: "/media/generated/client-logos-ausol-ausol-logo-baja-320.webp",
    description: "Infraestructura de datos para conciliación de aforos y reportes operativos diarios.",
  },
  {
    id: "conedyc",
    name: "Conedyc",
    category: "Construcción e Ingeniería",
    sector: "infraestructura",
    sectorLabel: "Construcción",
    impact: "Control integral de estimaciones",
    status: "Operación activa",
    mono: "/media/generated/client-logos-conedyc-logo-conedyc-oficial-320-mono.webp",
    color: "/media/generated/client-logos-conedyc-logo-conedyc-oficial-320.webp",
    description: "Gestión de proyectos de obra civil, asignación de maquinaria y seguimiento de presupuestos.",
  },
  {
    id: "daysa",
    name: "Daysa",
    category: "Redes Hidráulicas",
    sector: "infraestructura",
    sectorLabel: "Infraestructura",
    impact: "Reportes técnicos en tiempo real",
    status: "Operación activa",
    mono: "/media/generated/client-logos-daysa-copia-de-aysa-1-1-320-mono.webp",
    color: "/media/generated/client-logos-daysa-copia-de-aysa-1-1-320.webp",
    description: "Supervisión de cuadrillas y bitácoras de mantenimiento de redes de distribución.",
  },
  {
    id: "jesalo",
    name: "Jesalo",
    category: "Grupo Inversionista",
    sector: "corporativo",
    sectorLabel: "Corporativo",
    impact: "Consolidación de activos",
    status: "Operación activa",
    mono: "/media/generated/client-logos-jesalo-logo-dark-blue-320-mono.webp",
    color: "/media/generated/client-logos-jesalo-logo-dark-blue-320.webp",
    description: "Plataformas seguras para seguimiento de portafolio y gobernanza de información clave.",
  },
  {
    id: "keedu",
    name: "Keedu",
    category: "Tecnología Educativa",
    sector: "corporativo",
    sectorLabel: "EdTech",
    impact: "Escalabilidad a miles de alumnos",
    status: "Operación activa",
    mono: "/media/generated/client-logos-keedu-keedu-logo-320-mono.webp",
    color: "/media/generated/client-logos-keedu-keedu-logo-320.webp",
    description: "Experiencias de aprendizaje digital interactivas con reportes de avance y retención escolar.",
  },
  {
    id: "lega",
    name: "Lega",
    category: "Servicios Corporativos",
    sector: "corporativo",
    sectorLabel: "Legal & Compliance",
    impact: "Seguridad y cumplimiento documental",
    status: "Operación activa",
    mono: "/media/generated/client-logos-lega-logo-320-mono.webp",
    color: "/media/generated/client-logos-lega-logo-320.webp",
    description: "Control de poderes notariales, expedientes corporativos y trazabilidad de firmas electrónicas.",
  },
  {
    id: "mudarte",
    name: "Mudar-te",
    category: "Logística y Mudanzas",
    sector: "transporte",
    sectorLabel: "Logística y Transporte",
    impact: "Cotización y asignación automática",
    status: "Operación activa",
    mono: "/media/generated/client-logos-mudar-te-versio-n-verde-2-mudar-te-320-mono.webp",
    color: "/media/generated/client-logos-mudar-te-versio-n-verde-2-mudar-te-320.webp",
    description: "Ecosistema digital para cotizaciones en minutos, seguimiento de rutas y liquidaciones a transportistas.",
  },
  {
    id: "okai",
    name: "O-Kai",
    category: "Comercio Mayorista",
    sector: "fintech",
    sectorLabel: "Retail y Distribución",
    impact: "Sincronización omnicanal",
    status: "Operación activa",
    mono: "/media/generated/client-logos-o-kai-logo-320-mono.webp",
    color: "/media/generated/client-logos-o-kai-logo-320.webp",
    description: "Conexión de catálogo, pedidos en ruta e integración directa con sistemas de facturación.",
  },
  {
    id: "ovigas",
    name: "Ovi Gas",
    category: "Distribución de Gas L.P.",
    sector: "infraestructura",
    sectorLabel: "Energía y Distribución",
    impact: "Monitoreo de tanques y rutas",
    status: "Operación activa",
    mono: "/media/generated/client-logos-ovi-gas-logo-ovi-gas-corel-1-320-mono.webp",
    color: "/media/generated/client-logos-ovi-gas-logo-ovi-gas-corel-1-320.webp",
    description: "Rastreo de inventarios en tanques estacionarios y optimización de rutas de reparto a granel.",
  },
  {
    id: "pensiapp",
    name: "Pensiapp",
    category: "Fintech Previsional",
    sector: "fintech",
    sectorLabel: "Fintech",
    impact: "Cálculos de pensión exactos",
    status: "Operación activa",
    mono: "/media/generated/client-logos-pensiapp-pensiapp-logo-320-mono.webp",
    color: "/media/generated/client-logos-pensiapp-pensiapp-logo-320.webp",
    description: "Simuladores actuariales y gestión de trámites de retiro bajo normativas oficiales del IMSS.",
  },
  {
    id: "certa",
    name: "Certa",
    category: "Consultoría y Soluciones",
    sector: "corporativo",
    sectorLabel: "Consultoría",
    impact: "Optimización de flujos de trabajo",
    status: "Operación activa",
    mono: "/media/generated/client-logos-certa-logo-certa-320-mono.webp",
    color: "/media/generated/client-logos-certa-logo-certa-320.webp",
    description: "Plataformas a medida para gestión interna y entrega de diagnósticos corporativos.",
  },
  {
    id: "ppservicios",
    name: "PP Servicios",
    category: "Mantenimiento Corporativo",
    sector: "corporativo",
    sectorLabel: "Servicios B2B",
    impact: "Atención de tickets en tiempo récord",
    status: "Operación activa",
    mono: "/media/generated/client-logos-pp-servicios-logo-principal-320-mono.webp",
    color: "/media/generated/client-logos-pp-servicios-logo-principal-320.webp",
    description: "Asignación inteligente de personal técnico y control de órdenes de mantenimiento preventivo.",
  },
  {
    id: "unitrade",
    name: "Unitrade",
    category: "Comercio Exterior y Aduanas",
    sector: "transporte",
    sectorLabel: "Logística y Aduanas",
    impact: "Validación digital de pedimentos",
    status: "Operación activa",
    mono: "/media/generated/client-logos-unitrade-unitrade-logo-320-mono.webp",
    color: "/media/generated/client-logos-unitrade-unitrade-logo-320.webp",
    description: "Visibilidad integral de embarques transfronterizos, integración aduanal y gestión de alertas.",
  },
];

type SectorFilter = "todos" | "transporte" | "infraestructura" | "corporativo" | "fintech";

const sectorOptions: { id: SectorFilter; label: string }[] = [
  { id: "todos", label: "Todos los sectores (20)" },
  { id: "transporte", label: "Logística y Transporte" },
  { id: "infraestructura", label: "Infraestructura y Energía" },
  { id: "corporativo", label: "Educación y Corporativo" },
  { id: "fintech", label: "Fintech y Proptech" },
];

export function ClientSection() {
  const [selectedSector, setSelectedSector] = useState<SectorFilter>("todos");
  const [selectedClient, setSelectedClient] = useState<ClientItem>(clientsData[0]);
  const [hoveredClient, setHoveredClient] = useState<string | null>(null);

  const filteredClients = useMemo(() => {
    if (selectedSector === "todos") return clientsData;
    return clientsData.filter((c) => c.sector === selectedSector);
  }, [selectedSector]);

  const activeDisplayClient = useMemo(() => {
    if (hoveredClient) {
      const found = clientsData.find((c) => c.id === hoveredClient);
      if (found) return found;
    }
    return selectedClient;
  }, [hoveredClient, selectedClient]);

  return (
    <section className="client-constellation-section" id="clientes" aria-labelledby="clients-constellation-title">
      <div className="client-constellation-header">
        <div className="eyebrow">
          <span className="status-dot" /> Constelación de Clientes
        </div>
        <div className="client-header-flex">
          <div>
            <h2 id="clients-constellation-title">
              Empresas e instituciones donde nuestro software opera.
            </h2>
            <p className="client-header-lede">
              Desde la universidad más grande de Iberoamérica hasta infraestructura crítica, logística de última milla y fintech. Cada nodo representa un sistema que no puede detenerse.
            </p>
          </div>
          <div className="client-stats-badge">
            <span className="stats-dot-pulse" />
            <div>
              <strong>+20 sistemas</strong>
              <span>en monitoreo y continuidad</span>
            </div>
          </div>
        </div>

        {/* Sector Tabs */}
        <div className="client-sector-tabs" role="tablist" aria-label="Filtrar clientes por sector">
          {sectorOptions.map((opt) => {
            const isSelected = selectedSector === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                className={`sector-tab-btn ${isSelected ? "active" : ""}`}
                onClick={() => setSelectedSector(opt.id)}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Interactive Grid and Inspector */}
      <div className="client-interactive-container">
        <div className="client-logo-matrix" role="list">
          {filteredClients.map((client) => {
            const isHovered = hoveredClient === client.id;
            const isSelected = selectedClient.id === client.id;
            const isHighlighted = isHovered || isSelected;

            return (
              <button
                type="button"
                key={client.id}
                role="listitem"
                className={`client-matrix-cell ${isSelected ? "selected" : ""} ${isHighlighted ? "active" : ""}`}
                onMouseEnter={() => setHoveredClient(client.id)}
                onMouseLeave={() => setHoveredClient(null)}
                onClick={() => {
                  setSelectedClient(client);
                  trackEvent(analyticsEvents.clientSelect, { client: client.id, sector: client.sector });
                }}
                onFocus={() => setSelectedClient(client)}
                aria-label={`${client.name} — ${client.category}`}
              >
                <div className="cell-indicator-dot" />
                <div className="cell-image-holder">
                  <Image
                    src={client.color}
                    alt={client.name}
                    width={130}
                    height={44}
                    className="cell-logo-img"
                    style={{ objectFit: "contain", height: "40px", width: "auto" }}
                  />
                </div>
                <div className="cell-bottom-meta">
                  <span className="cell-name">{client.name}</span>
                  <span className="cell-badge">{client.sectorLabel}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Inspector Panel */}
        <aside className="client-inspector-card" aria-live="polite">
          <div className="inspector-top-bar">
            <span className="inspector-pulse" />
            <span className="inspector-status-label">{activeDisplayClient.status}</span>
            <span className="inspector-sector-tag">{activeDisplayClient.sectorLabel}</span>
          </div>

          <div className="inspector-brand-hero">
            <div className="inspector-logo-box">
              <Image
                src={activeDisplayClient.color}
                alt={`Logo oficial de ${activeDisplayClient.name}`}
                width={160}
                height={56}
                style={{ objectFit: "contain", maxHeight: 52 }}
              />
            </div>
            <div>
              <h3>{activeDisplayClient.name}</h3>
              <p className="inspector-category">{activeDisplayClient.category}</p>
            </div>
          </div>

          <div className="inspector-impact-highlight">
            <span className="impact-title">Impacto verificado:</span>
            <strong>{activeDisplayClient.impact}</strong>
          </div>

          <p className="inspector-detail-text">{activeDisplayClient.description}</p>

          <div className="inspector-footer">
            <a
              href="#contacto"
              className="button button-small button-dark"
              data-analytics-event={analyticsEvents.scheduleOpen}
              data-analytics-source="client-inspector"
            >
              Ver cómo intervenir mi proyecto <span>↗</span>
            </a>
          </div>
        </aside>
      </div>
    </section>
  );
}
