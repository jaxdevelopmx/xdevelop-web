# Pendientes del plan XDEVELOP

## Estado actual

La base Next.js está creada y el build de producción funciona. La home inicial incluye la dirección visual **Continuidad visible**, una escena procedural con R3F/Three.js, GSAP, ScrollTrigger, Lenis, contenido editorial inicial y responsive móvil.

## Prioridad alta

- [ ] Integrar Payload CMS.
- [ ] Conectar PostgreSQL en Neon.
- [ ] Configurar Azure Blob Storage para medios.
- [ ] Migrar el contenido estático de `src/content/site.ts` al CMS.
- [ ] Crear el contenido completo de Nosotros, Equipo, Servicios, Revisión de proyectos, IA, Sistemas, Industrias, Método XDEVELOP, Productos, Casos, Contacto y FAQ.
- [ ] Completar las versiones editoriales en español e inglés.
- [ ] Crear la home completa para `/es` y `/en`; actualmente esas rutas usan una plantilla resumida.
- [ ] Integrar Cal.com para agendar revisiones y asesorías.
- [ ] Crear el formulario de calificación de proyectos.

## Experiencia 3D y motion

- [ ] Convertir la escena actual en los tres actos completos:
  - [ ] Entender lo existente.
  - [ ] Integrar el equipo.
  - [ ] Sistema operando.
- [ ] Animar estados distintos de módulos, conexiones, riesgos y sistema estabilizado.
- [ ] Integrar la constelación de clientes dentro de la narrativa.
- [x] Añadir fallback visual 2D para WebGL desactivado o fallido.
- [x] Optimizar la escena para móvil con menos módulos, sombras y DPR.
- [x] Validar `prefers-reduced-motion` con la escena real.
- [x] Optimizar LCP: targets above-the-fold solo transform (sin `autoAlpha:0` pre-paint); escena 3D monta tras `requestIdleCallback` (fuera de camino crítico). Home `/` perf 54→83, LCP 10.4→3.4s; `/es` perf 93, LCP 3.0s (desde 7.0). CLS 0, TBT 90–370 ms. TTI 10.4s restante = chunks de Next (devtools/react-dom), no accionable.

## Contenido, casos y assets

- [x] Conectar los logos procesados por Sharp a la sección de clientes.
- [x] Mostrar logos en monocromo y recuperar color en hover/foco/caso.
- [ ] Crear páginas individuales de casos con resultados, contexto, intervención y métricas.
- [ ] Crear páginas individuales de productos: Maicero, Kapttia, Residia y Mupi.
- [ ] Reemplazar los perfiles incompletos del equipo cuando estén disponibles nombres, cargos y fotografías.
- [ ] Revisar y aprobar el copy final en español e inglés.
- [ ] Mantener masters fuera de `public` y ejecutar el pipeline con `./node_modules/.bin/tsx scripts/process-images.ts`.

## SEO y analítica

- [ ] Crear `sitemap.ts`.
- [ ] Crear `robots.ts`.
- [ ] Añadir JSON-LD localizado para organización, servicios y casos cuando corresponda.
- [ ] Añadir canonical y `hreflang` para `/es` y `/en`.
- [ ] Crear redirects desde las URLs actuales de `xdevelop.mx`.
- [ ] Crear página 404 editorial.
- [ ] Integrar consentimiento de cookies.
- [ ] Integrar GA4 después del consentimiento.
- [ ] Integrar Vercel Analytics.
- [ ] Medir idioma, servicios, casos, agenda, reservas, WhatsApp y errores de carga 3D.

## Calidad y producción

- [ ] Añadir pruebas E2E para navegación, idioma, CTA, agenda y degradación WebGL.
- [ ] Probar teclado, lector de pantalla, contraste y foco visible.
- [ ] Probar Safari iOS, Chrome Android y equipos con GPU modesta.
- [ ] Medir FPS, memoria, DPR, draw calls y tamaño de chunks.
- [ ] Ejecutar Lighthouse y revisar Core Web Vitals.
- [ ] Configurar variables de entorno de producción.
- [ ] Configurar previews y despliegue en Vercel.
- [ ] Confirmar dominio, correo, agenda y credenciales de servicios antes del lanzamiento.

## Validaciones ya realizadas

- [x] Crear proyecto Next.js con App Router y TypeScript.
- [x] Instalar R3F, Three.js, Drei, GSAP, `@gsap/react`, Lenis y Sharp.
- [x] Crear home inicial de Continuidad visible.
- [x] Crear rutas base bilingües `/es` y `/en`.
- [x] Copiar masters de logo sin modificar los originales.
- [x] Procesar assets raster con Sharp.
- [x] Ejecutar lint.
- [x] Ejecutar TypeScript sin emisión.
- [x] Ejecutar build de producción.

## Avance visual — 10 septiembre 2026

- [x] Conectar el modelo existente con `continuity-story` y tres capítulos HTML en `/`.
- [x] Mantener la escena sticky junto al texto en escritorio y arriba en móvil.
- [x] Sincronizar separación/ensamblado e indicadores de ambos lados con el scroll.
- [x] Corregir cabecera, fuente Onest, contraste secundario y foco visible.
- [x] Activar navegación por anclas en Lenis y cargar sus estilos oficiales.
- [x] Limpiar el listener de pérdida de contexto para evitar fallback falso al redimensionar.
- [x] Revisar visualmente escritorio y viewport móvil de 390 px, sin desbordamiento horizontal.
- [x] Comprobar lint, TypeScript y build.

Este avance corresponde a la home `/`. Las homes localizadas, la constelación de clientes, el pulso operativo, CMS y agenda conservan sus pendientes anteriores.

## Avance handoff 17 septiembre 2026

- [x] Reparar build: el `scope: document.body` en las opciones de `useGSAP` rompía el SSG (error `/en/nosotros`); scope movido al callback client-only, se conservó `revertOnUpdate`.
- [x] Restablecer lint, TypeScript y build en verde tras el fix anterior.
- [x] Eliminar em-dashes `—` visibles en copy (títulos SEO, hero `01—04`, eyebrows `02 —`, `03 —`) sustituidos por `·` y `/`; quienes quedan están en comentarios o `aria-label`, no en texto visible.
- [x] Dejar `data-reveal`/`data-reveal-group` repartidos en `/`, `/es`, `/en` con motion unificado (ScrollTrigger.batch + stagger, `once`, reduced-motion, refresh tras fonts/load).
- [x] Anticipar el `THREE.Clock` deprecado: `continuity-scene` acumula delta en ref y `scene-loader` filtra solo el aviso exacto de upstream.
- [x] Remplazar el estado previo al 3D por `continuity-loader` (spinner cobalto→púrpura) y dejar el fallback 2D solo para fallo real de WebGL.
- [x] Crear bloque destacado "Productos propios" con Maicero (97.7%) y Residia (−70%) arriba de `cases`; `case-grid` pasa a 2 columnas y `cases` queda con cuatro entradas.
- [x] Aplicar la skill de diseño anti-slop en modo preservación de identidad: ban de em-dash únicamente; se conservó numeración, dots y split-intros como firma del estudio.
- [ ] Probar reduced motion y pérdida real de WebGL en dispositivos físicos (heredado).
