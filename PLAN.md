# Nueva web 3D para XDEVELOP

## Objetivo acordado

Construir desde cero una web bilingüe para XDEVELOP enfocada en grandes corporativos y empresas cuyo software ya es importante para su operación. La narrativa central será:

> **Software para operaciones que no pueden detenerse.**

La web explicará cómo XDEVELOP revisa, continúa, moderniza y opera proyectos iniciados con IA, heredados de otro equipo o limitados por su crecimiento. El indicador principal será **asesorías/revisiones agendadas**.

Los textos entregados en esta conversación serán la fuente editorial principal. `https://xdevelop.mx` y los recursos locales servirán para contrastar datos, recuperar identidad y reunir assets; no se reutilizarán el diseño ni el código actuales.

## Recursos revisados

Origen: `/Users/jorgeassaf/Downloads/XDEVELOP - Refresh web/`

- `Identidad corporativa/xdevelop-guideline.pdf`
  - Paleta vigente: `#050811`, `#7F00FD`, `#3F00E6`, `#C775FE`.
  - Tipografías vigentes: Sora y Poppins.
  - Logo, imagotipo y masters en PNG, PDF y AI.
- `Portafolio/XDEVELOP (1).pdf`
  - Presentación, servicios y material de casos como OscarsFit, Residia, OVEE, SGT, ICEE y UNAM.
- `Logotipos clientes/`
  - 22 carpetas con recursos heterogéneos en SVG, PNG, JPEG y AI.
- `maicero-kit 3/`
  - Kit completo de marca, SVG, favicons, recursos sociales y onboarding operativo.

Decisiones:

- Conservar el logo actual de XDEVELOP; rehacer el resto del lenguaje visual.
- Los nuevos textos reemplazan el posicionamiento genérico del portafolio anterior.
- Las cifras, relaciones con clientes y métricas entregadas están verificadas y autorizadas.
- Los originales de marca y clientes nunca se modificarán; se generarán derivados para web.

## Dirección visual: “Continuidad visible”

### Concepto

La escena comienza con un sistema parcialmente construido: módulos existentes, conexiones incompletas y señales sin responsable. XDEVELOP no destruye lo anterior. Lo inspecciona, identifica qué conservar, integra el equipo que falta y deja un sistema capaz de seguir operando.

La metáfora conecta directamente con los textos:

- “Ya construiste una parte.”
- “No empezamos programando. Empezamos entendiendo.”
- “La IA puede generar código. Nuestro equipo determina si puede sostener un sistema real.”
- “No incorporas personas aisladas. Incorporas un equipo acostumbrado a trabajar junto.”

### Lenguaje visual

- **Personalidad:** precisa, futurista, responsable y corporativa.
- **Ambiente:** laboratorio técnico luminoso; evitar negro con neón, cristal genérico y decoración de “datos” sin significado.
- **Objeto 3D:** módulos cerámicos blancos, estructura de aluminio y uniones cobalto.
- **Semántica visual:**
  - Tinta: estructura existente y contenido.
  - Cobalto: elemento comprobado, conectado o bajo control.
  - Naranja: riesgo, hueco o decisión pendiente; nunca mero adorno.
  - Pulso estable: sistema operando y monitoreado.
- **Composición:** retícula editorial asimétrica, grandes áreas de respiración y cambios de escala; evitar una cuadrícula de tarjetas idénticas.
- **Interacción:** respuesta leve al puntero/foco; el scroll conserva el control narrativo.
- **Motion:** tres actos coordinados, no una animación distinta en cada bloque.

### Tokens iniciales

- Mineral: `#EEF1F4` — fondo principal.
- Blanco técnico: `#FFFFFF` — superficies y módulos.
- Tinta azul: `#101B35` — texto, líneas y navegación.
- Cobalto: `#2457FF` — conexiones y estados comprobados.
- Naranja señal: `#FF5A36` — riesgos, huecos y CTA puntuales.
- Gris estructura: `#AEB7C6` — piezas secundarias y estados neutrales.

### Tipografía

Usar **Onest Variable** autohospedada para todo el sistema:

- Mejor legibilidad en español e inglés que el tratamiento actual con Poppins.
- Ejes y pesos suficientes para titulares, lectura larga, navegación y cifras.
- Geometría técnica/humana compatible con el logo redondeado sin imitarlo.
- Números tabulares para métricas y resultados.
- Titulares grandes con peso 620–680 y tracking negativo controlado.
- Texto de lectura con peso 400–450, 16–20 px y líneas menores de 75 caracteres.
- No usar monospace decorativa, labels en mayúsculas espaciadas ni palabras sueltas coloreadas como recurso repetido.

## Stack

- **Next.js 16 App Router + React 19 + TypeScript**.
- **Payload CMS + PostgreSQL en Neon**.
- **Azure Blob Storage** para medios administrados desde Payload.
- **React Three Fiber 9 + Three.js + Drei**.
- **GSAP + ScrollTrigger + `@gsap/react`**.
- **Lenis** como única capa de smooth scroll.
- **Tailwind CSS** y variables CSS para UI/tokens.
- **Sharp** para pipeline de imágenes y generación social.
- **Cal.com** embebido para agendar revisiones/asesorías.
- **GA4 con consentimiento + Vercel Analytics**.
- **Vercel** para aplicación, Payload y previews.

## Arquitectura editorial y rutas

Usar URLs indexables `/es/...` y `/en/...`; el selector conserva la página equivalente y persiste la preferencia.

### Navegación principal

- **Inicio**
- **Qué hacemos**
  - Revisión de proyectos
  - Servicios
  - Inteligencia artificial
  - Sistemas
- **Cómo trabajamos**
  - Método XDEVELOP
  - Equipo
- **Experiencia**
  - Casos
  - Productos propios
  - Industrias
- **Nosotros**
- **Contacto**
- CTA persistente: **Revisar mi proyecto / Review my project**

### Rutas previstas

- `app/[locale]/page.tsx`
- `app/[locale]/nosotros/page.tsx`
- `app/[locale]/equipo/page.tsx`
- `app/[locale]/servicios/page.tsx`
- `app/[locale]/servicios/[slug]/page.tsx`
- `app/[locale]/revision-de-proyectos/page.tsx`
- `app/[locale]/inteligencia-artificial/page.tsx`
- `app/[locale]/sistemas/page.tsx`
- `app/[locale]/industrias/page.tsx`
- `app/[locale]/metodo-xdevelop/page.tsx`
- `app/[locale]/productos/page.tsx`
- `app/[locale]/productos/[slug]/page.tsx`
- `app/[locale]/casos/page.tsx`
- `app/[locale]/casos/[slug]/page.tsx`
- `app/[locale]/contacto/page.tsx`
- `app/[locale]/preguntas-frecuentes/page.tsx`
- `app/[locale]/aviso-de-privacidad/page.tsx`

## Implementación

### 1. Base y fronteras de render

- Crear el proyecto con Next.js App Router, TypeScript, ESLint y Tailwind.
- Mantener layouts, navegación, textos, casos y metadata como Server Components.
- Encapsular canvas, Lenis, GSAP, Cal.com y consentimiento en Client Components pequeños.
- Cargar Three.js/R3F dinámicamente sólo en las rutas que usan 3D.
- Validar variables de entorno de Payload, Neon, Azure, Cal.com y analítica.

### 2. Payload CMS

Crear colecciones localizadas con drafts, preview y control editorial:

- `users` — administración.
- `pages` — bloques editoriales y SEO de páginas estáticas.
- `services` — revisión, continuidad IA, modernización, equipo dedicado, desarrollo desde cero, operación/soporte.
- `systems` — 13 tipos de solución agrupados por objetivo.
- `industries` — 15 industrias y experiencia asociada.
- `methodCommitments` — seis compromisos del Método XDEVELOP.
- `teamMembers` — nombre, cargo, responsabilidad, foto y estado de publicación.
- `clients` — logo, nombre, relación, orden y autorización.
- `caseStudies` — situación, intervención, resultado, métricas, industria y assets.
- `products` — Maicero, Kapttia, Residia y Mupi.
- `faqs` — pregunta, respuesta, categoría y orden.
- `metrics` — cifra, unidad, contexto y fuente interna.
- `media` — Azure Blob Storage.

Reglas:

- Español e inglés se publican como contenido localizado real, no reemplazo en cliente.
- Los perfiles incompletos del equipo permanecen en draft y no dejan huecos visibles.
- Las métricas aprobadas conservan contexto, fecha y fuente interna en el CMS.
- Publicar/revalidar sólo las rutas afectadas.

### 3. Home: tres actos 3D

Todo el contenido crítico será HTML semántico; el canvas funciona como argumento visual, no como contenedor de texto.

#### Acto 1 — Entender lo existente

- Hero: “Software para operaciones que no pueden detenerse.”
- Sistema modular parcialmente funcional, con conexiones incompletas y estados inciertos.
- CTAs: “Revisar mi proyecto” y “Conocer al equipo”.
- Métricas: 14 años, +200 proyectos, +15 industrias y 100% del código bajo control del cliente.
- Los cuatro puntos de entrada aparecen como diagnósticos del mismo sistema:
  1. Primera versión iniciada con IA.
  2. Proyecto dejado a medias.
  3. Sistema riesgoso de modificar.
  4. Negocio que superó al sistema.

#### Acto 2 — Integrar el equipo

- La escena separa las responsabilidades que una sola persona no debería asumir.
- Dirección, gestión, arquitectura, frontend/backend, calidad y operación ocupan posiciones concretas.
- El scroll ejecuta “Entendemos → Priorizamos → Integramos → Damos continuidad”.
- El naranja marca decisiones sin dueño; el cobalto aparece cuando una responsabilidad queda conectada.
- El contenido editorial presenta el proceso sin depender del canvas.

#### Acto 3 — Sistema operando

- Las piezas quedan ensambladas y muestran un pulso estable.
- La constelación de clientes aparece como nodos de sistemas reales.
- Los logos se muestran inicialmente en monocromo tinta y recuperan su color autorizado al foco, hover o entrada al caso.
- Cierre: “Ya construiste una parte. No tienes que terminarla solo.”
- CTA final abre Cal.com.

Entre actos, método, casos, productos y contenido de confianza usarán layout editorial ligero para evitar fatiga y proteger rendimiento.

### 4. Sistema procedural 3D

- Construir módulos, sockets, líneas y estados directamente en R3F/Three.js.
- Usar instancing, geometrías y materiales compartidos.
- GSAP anima refs de cámara, grupos, materiales y uniforms; no usa `setState` por frame.
- Asignar estados deterministas de escena a cada capítulo para que resize, navegación y reduced motion sean predecibles.
- Crear fallback 2D basado en la misma composición para WebGL ausente.

### 5. Lenis + ScrollTrigger

- Crear un solo `SmoothScrollProvider`.
- Conectar eventos Lenis con `ScrollTrigger.update()`.
- Ejecutar el RAF de Lenis desde `gsap.ticker`, respetando la conversión temporal requerida, y desactivar lag smoothing para evitar drift.
- Usar una timeline por acto y una coordinación superior, no decenas de triggers independientes.
- Refrescar tras fuentes, imágenes o cambios de layout.
- Limpiar Lenis, ticker, timelines y triggers al desmontar.
- No combinar con otra librería de scroll ni bloquear comportamiento nativo accesible.

### 6. Pipeline de imágenes con Sharp

Mantener masters en un directorio de origen fuera de `public` y generar derivados reproducibles.

- **Raster:** recortar padding transparente, corregir orientación, normalizar perfil sRGB y generar AVIF/WebP/PNG en anchos definidos.
- **Logos:** colocar cada marca dentro de una caja óptica común sin deformarla; conservar proporción y margen visual.
- **Variantes:** generar monocromo tinta para la constelación y conservar la versión original para foco/casos.
- **Fotografías:** producir `srcset`/sizes adecuados y placeholders de baja resolución.
- **Open Graph:** componer automáticamente imágenes localizadas para páginas y casos.
- **Integridad:** nunca sobrescribir los archivos de `/Downloads/XDEVELOP - Refresh web/`.
- **Vectores:** servir SVG sanitizado cuando exista; exportar correctamente masters AI/PDF como SVG antes de pasarlos al pipeline. Sharp no será usado como sustituto de esa conversión.
- **Next.js:** usar `next/image` para entrega; Sharp se encargará de preprocesos y composiciones que `next/image` no resuelve por sí solo.

### 7. Páginas profundas

- **Nosotros:** historia desde 2012, razón de existir, adopción honesta de IA, productos propios y nota de Javier Reyes.
- **Equipo:** responsabilidades antes que organigrama; publicar sólo perfiles completos y agrupar el resto por disciplina.
- **Servicios:** seis formas de entrada según el estado del proyecto y capacidades incorporables.
- **Revisión:** checklist técnico/operativo, hallazgos frecuentes y entregables con evidencia.
- **IA:** diferenciar IA para construir software e IA dentro de operaciones; mostrar controles humanos y métricas aprobadas.
- **Sistemas:** soluciones organizadas por resultado, no por tecnología.
- **Industrias:** 15 sectores con ejemplos comprobables, evitando una plantilla repetida por industria.
- **Método:** seis compromisos presentados como condiciones verificables, no como pasos decorativos.
- **Productos:** Maicero, Kapttia, Residia y Mupi como prueba de experiencia operativa; usar sus identidades propias dentro de un marco editorial XDEVELOP.
- **Casos:** resultado primero, después contexto, sistema e intervención; cada cifra mantiene contexto.
- **Contacto:** formulario de calificación y Cal.com; pedir sólo la información necesaria para la primera conversación.
- **FAQ:** contenido visible, enlazable y compatible con datos estructurados cuando corresponda.

### 8. Rendimiento y móvil

- Mantener el canvas fuera del bundle crítico.
- Escena procedural sin assets pesados innecesarios; presupuesto inicial 3D menor a 5 MB.
- DPR adaptativo y perfilado real de draw calls, memoria y tiempo de frame.
- Detener/reducir render fuera de viewport o en estados estáticos.
- En móvil usar menos módulos, sombras reducidas, DPR menor y movimientos cortos.
- Cargar logos, casos, Cal.com y contenido secundario por prioridad/viewport.

### 9. Conversión con Cal.com

- CTA principal: “Revisar mi proyecto”.
- Abrir Cal.com en panel/modal accesible o sección embebida.
- Cargar el embed bajo demanda.
- Instrumentar apertura, selección y reserva confirmada cuando el API lo permita.
- Mantener WhatsApp, teléfono y correo como alternativas secundarias.
- Ofrecer enlace externo si falla el embed.

### 10. Privacidad y analítica

- Solicitar consentimiento antes de activar GA4 o etiquetas publicitarias.
- Permitir aceptar, rechazar y modificar preferencias con igual claridad.
- Medir idioma, páginas de servicio, casos, apertura de agenda, reserva confirmada, WhatsApp y errores 3D.
- Configurar Vercel Analytics según la clasificación legal acordada.
- Actualizar aviso de privacidad y política de cookies antes de producción.

### 11. Accesibilidad y degradación

- `prefers-reduced-motion`: mostrar estados finales sin scrub, giros, parallax ni cámara móvil.
- Canvas decorativo con `aria-hidden`; toda información tendrá equivalente HTML.
- Navegación completa por teclado, foco visible y contraste WCAG.
- No depender de color, hover, profundidad o movimiento.
- Fallback estático para WebGL ausente, ahorro de datos, GPU insuficiente o error.

### 12. SEO y migración

- HTML del servidor para contenido, métricas, casos y CTA.
- Metadata, canonical, Open Graph, `hreflang` y JSON-LD localizados.
- Sitemap, robots, 404 y redirects permanentes desde URLs actuales.
- Enlaces HTML rastreables entre servicios, sistemas, industrias, casos y productos.
- Payload y WebGL nunca serán requisitos para leer el contenido principal.

## Archivos principales previstos

- `app/[locale]/layout.tsx` — shell localizado.
- `app/[locale]/page.tsx` — home de tres actos.
- `app/[locale]/**/page.tsx` — rutas editoriales detalladas arriba.
- `app/(payload)/admin/[[...segments]]/page.tsx` — panel CMS según integración oficial.
- `payload.config.ts` — Payload, Neon, localización y Azure.
- `src/collections/*.ts` — colecciones.
- `src/lib/payload/queries.ts` — lectura server-only.
- `src/i18n/` — routing y alternates.
- `src/components/three/ContinuitySystemScene.tsx` — sistema procedural.
- `src/components/three/SceneDirector.tsx` — estados de los tres actos.
- `src/components/motion/HomeTimeline.tsx` — GSAP/ScrollTrigger.
- `src/components/providers/SmoothScrollProvider.tsx` — Lenis.
- `src/components/scheduling/CalScheduler.tsx` — agenda.
- `src/components/privacy/ConsentManager.tsx` — consentimiento.
- `src/components/fallbacks/ContinuityFallback.tsx` — alternativa 2D.
- `src/styles/tokens.css` — color, tipografía y motion.
- `scripts/process-images.ts` — pipeline Sharp reproducible.
- `assets/source/` — copias de masters aprobados, nunca archivos generados.
- `public/media/generated/` — derivados web generados.

## Verificación

- Ejecutar lint, typecheck, build y pruebas automatizadas.
- Probar CRUD, drafts, preview, localización y revalidación de Payload; verificar Neon y Azure Blob.
- Comprobar que perfiles incompletos no se publican y que métricas/casos conservan contexto.
- Validar `/es` y `/en`, selector, canonical y `hreflang` equivalentes.
- Probar Lenis/ScrollTrigger sin drift, saltos, duplicados ni listeners residuales.
- Validar pipeline Sharp: masters intactos, proporciones, transparencia, color, variantes y tamaños.
- Revisar visualmente logos monocromos y transición a color sobre fondos claros/oscuros.
- Perfilar desktop y móviles físicos: FPS, memoria, DPR, draw calls y tamaño de chunks.
- Probar Cal.com y eventos sin activar GA4 antes del consentimiento.
- Verificar teclado, lector de pantalla, contraste, reduced motion, WebGL desactivado y ahorro de datos.
- Ejecutar Lighthouse/Core Web Vitals antes de cargar el canvas y durante interacción.
- Revisar sitemap, robots, JSON-LD, redirects, 404 y enlaces antes del cambio de producción.
