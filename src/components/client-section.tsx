"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useMemo } from "react";
import { analyticsEvents, trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

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
  inverted?: boolean;
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
    inverted: true,
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
    inverted: true,
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
    <section
      className="relative z-2 border-b border-[var(--line)] bg-[var(--paper)] px-[clamp(24px,7vw,120px)] py-30 max-sm:px-5 max-sm:py-[72px]"
      id="clientes"
      aria-labelledby="clients-constellation-title"
    >
      <div className="mb-13">
        <div className="mt-[22px] flex flex-wrap items-end justify-between gap-8">
          <div>
            <h2
              id="clients-constellation-title"
              className="m-0 max-w-[720px] text-[clamp(34px,4.2vw,64px)] font-semibold leading-[1.04] tracking-[-0.06em]"
            >
              Empresas e instituciones donde nuestro software opera.
            </h2>
            <p className="mt-[18px] max-w-[640px] text-[var(--ink-68)] text-[clamp(15px,1.4vw,18px)] leading-[1.45]">
              Desde la universidad más grande de Iberoamérica hasta infraestructura crítica, logística de última milla y fintech. Cada nodo representa un sistema que no puede detenerse.
            </p>
          </div>
          <Badge
            variant="secondary"
            className="inline-flex h-auto items-center gap-3.5 rounded-[4px] border-[var(--line)] bg-[var(--mineral)] px-[22px] py-[14px]"
          >
            <span className="inline-block size-[9px] rounded-full bg-[var(--xdev-purple-primary)] animate-pulse-ring" aria-hidden="true" />
            <span>
              <strong className="block text-[15px] font-[650] leading-[1.1] text-[var(--ink)]">
                +20 sistemas
              </strong>
              <span className="block text-[11px] tracking-[-0.01em] text-[var(--ink-72)]">
                en monitoreo y continuidad
              </span>
            </span>
          </Badge>
        </div>

        {/* Sector Tabs */}
        <Tabs
          value={selectedSector}
          onValueChange={(value) => setSelectedSector(value as SectorFilter)}
          className="mt-9 flex flex-wrap gap-2 border-b border-[var(--line)] pb-3.5"
        >
          <TabsList
            variant="line"
            aria-label="Filtrar clientes por sector"
            className="h-auto w-full flex-wrap gap-2 bg-transparent p-0"
          >
            {sectorOptions.map((opt) => {
              return (
                <TabsTrigger
                  key={opt.id}
                  value={opt.id}
                  className="client-sector-btn flex-none cursor-pointer rounded-full border border-transparent bg-transparent px-4 py-2 text-[12px] font-[560] text-[var(--ink-65)] transition-all after:hidden"
                >
                  {opt.label}
                </TabsTrigger>
              );
            })}
          </TabsList>
        </Tabs>
      </div>

      {/* Main Interactive Grid and Inspector */}
      <div className="grid grid-cols-[1fr_360px] items-start gap-7 max-lg:grid-cols-1">
        <ul
          className="m-0 grid list-none gap-2.5 p-0 [grid-template-columns:repeat(auto-fill,minmax(150px,1fr))] max-sm:[grid-template-columns:repeat(2,1fr)]"
          aria-label="Sistemas monitoreados por sector"
        >
          {filteredClients.map((client) => {
            const isHovered = hoveredClient === client.id;
            const isSelected = selectedClient.id === client.id;
            const isHighlighted = isHovered || isSelected;

            return (
              <li key={client.id} className="flex min-w-0">
                <Tooltip>
                  <TooltipTrigger
                    render={
                      <Button
                        type="button"
                        variant="ghost"
                        title={client.name}
                        aria-label={`${client.name} — ${client.category}`}
                        aria-pressed={isHighlighted}
                        className={cn(
                          "group/button relative flex h-[104px] min-h-[104px] w-full items-center justify-center rounded-none p-0 text-center transition-[background-color] duration-200 active:scale-[0.98] max-sm:h-[92px] max-sm:min-h-[92px]",
                          "hover:bg-[var(--ink-5)] focus-visible:bg-[var(--ink-5)]",
                          client.inverted && "cell-inverse",
                          isHighlighted && (client.inverted ? "cell-inverse-on" : "bg-[var(--ink-5)]")
                        )}
                        onMouseEnter={() => setHoveredClient(client.id)}
                        onMouseLeave={() => setHoveredClient(null)}
                        onFocus={() => setSelectedClient(client)}
                        onClick={() => {
                          setSelectedClient(client);
                          trackEvent(analyticsEvents.clientSelect, { client: client.id, sector: client.sector });
                        }}
                      />
                    }
                  >
                    <span
                      className={cn(
                        "absolute top-3 left-1/2 block size-[5px] -translate-x-1/2 rounded-full bg-transparent transition-[background-color] duration-200",
                        "group-hover/button:bg-[var(--xdev-purple-primary)] group-focus-visible/button:bg-[var(--xdev-purple-primary)]",
                        isHighlighted && "bg-[var(--xdev-purple-primary)]"
                      )}
                      aria-hidden="true"
                    />
                    <span className="relative block h-full w-full px-2.5">
                      <Image
                        src={client.color}
                        alt={client.name}
                        width={130}
                        height={44}
                        className={cn(
                          "absolute inset-0 z-10 m-auto max-h-14 max-w-[85%] object-contain opacity-[0.92] transition-opacity duration-200",
                          "group-hover/button:opacity-100 group-focus-visible/button:opacity-100",
                          isHighlighted && "opacity-100"
                        )}
                        style={{ objectFit: "contain", height: "40px", width: "auto" }}
                      />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent side="top">{client.name}</TooltipContent>
                </Tooltip>
              </li>
            );
          })}
        </ul>

        {/* Inspector Panel */}
        <Card
          className="sticky top-[100px] z-10 flex h-[410px] max-h-[410px] flex-col gap-[18px] overflow-hidden rounded-none bg-[var(--paper)] p-[26px_22px] ring-0 max-lg:static max-lg:order-2 max-lg:h-auto max-lg:min-h-0"
          aria-live="polite"
        >
          <div className="flex items-center gap-2 text-[11px] font-semibold">
            <span className="size-[7px] rounded-full bg-[var(--cobalt)]" />
            <span className="text-[var(--cobalt)]">{activeDisplayClient.status}</span>
            <Badge
              variant="outline"
              className="ml-auto h-auto rounded-[3px] border-[var(--line)] bg-[var(--mineral)] px-2 py-[3px] text-[10px] text-[var(--ink-72)]"
            >
              {activeDisplayClient.sectorLabel}
            </Badge>
          </div>
          <Separator className="bg-[var(--line)]" />

          <div className="flex h-16 items-center gap-4">
            <Avatar className="h-[60px] w-20 shrink-0 justify-center rounded-none border border-[var(--ink-8)] bg-[var(--mineral)] p-2 after:rounded-none">
              <AvatarImage
                src={activeDisplayClient.color}
                alt={`Logo oficial de ${activeDisplayClient.name}`}
                width={160}
                height={56}
                className="aspect-auto rounded-none object-contain"
                style={{ objectFit: "contain", maxHeight: 52 }}
              />
              <AvatarFallback className="rounded-none bg-transparent text-[var(--ink-68)]">
                {activeDisplayClient.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="m-0 text-[22px] font-[620] leading-[1.1] tracking-[-0.03em]">
                {activeDisplayClient.name}
              </h3>
              <p className="mt-1 text-xs text-[var(--ink-62)]">{activeDisplayClient.category}</p>
            </div>
          </div>

          <div className="flex h-[84px] max-h-[84px] flex-col justify-center overflow-hidden border-l-[3px] border-[var(--xdev-purple-primary)] bg-[var(--xdev-purple-soft)] px-3.5 py-2.5">
            <span className="mb-0.5 block text-[10px] font-bold uppercase tracking-[0.04em] text-[var(--xdev-purple-primary)]">
              Impacto verificado:
            </span>
            <strong className="block text-[13.5px] leading-[1.25] text-[var(--ink)]">
              {activeDisplayClient.impact}
            </strong>
          </div>

          <p className="m-0 h-[62px] max-h-[62px] overflow-hidden text-[13px] leading-[1.45] text-[var(--ink-72)]">
            {activeDisplayClient.description}
          </p>

          <div className="mt-auto border-t border-[var(--line)] pt-4">
            <Button
              render={<Link href="#contacto" />}
              nativeButton={false}
              variant="dark"
              size="cta-sm"
              data-analytics-event={analyticsEvents.scheduleOpen}
              data-analytics-source="client-inspector"
            >
              Ver cómo intervenir mi proyecto
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
}
