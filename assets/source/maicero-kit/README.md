# maicero® · kit de marca

Kit oficial generado el 21 de mayo de 2026. Todos los SVG tienen el texto convertido a paths — no requieren cargar la fuente Bricolage Grotesque para renderizar el logo correctamente (aunque sí la necesitan para el resto de la UI del SaaS).

**Slogan oficial:** *De maiceros, para maiceros.*

## 🎨 Paleta

- **Amarillo maíz** `#FFD23F` — isotipo, ®, acentos, fondo principal de icono de app.
- **Azul comal** `#2c3a4a` — texto sobre fondos claros, fondo oscuro principal.
- **Blanco** `#FFFFFF` — fondo claro, texto sobre azul oscuro.

## Estructura

```
maicero-kit/
├── 01-logos/              ← lockups completos (isotipo + wordmark + ®)
├── 02-isotipo/            ← solo mazorca, sin texto
├── 03-favicons/           ← favicon.svg + PNGs + apple-touch-icon
└── 04-redes-sociales/     ← profile pictures + portadas de FB/IG/X/LinkedIn/YouTube
```

## 01 · Logos (lockups)

- `maicero-lockup-light.svg` — texto azul `#2c3a4a`, isotipo amarillo, ® amarillo. Para fondos claros.
- `maicero-lockup-dark.svg` — texto blanco, isotipo amarillo, ® amarillo. Para fondos oscuros.
- `maicero-lockup-dark-onbg.svg` — versión dark con el fondo `#2c3a4a` embebido. Para OG images, redes sociales, embeds, presentaciones.

## 02 · Isotipo (solo mazorca)

- `maicero-isotipo-amarillo.svg` — versión principal, amarillo.
- `maicero-isotipo-blanco.svg` — para sobre fondos de color o fotos.
- `maicero-isotipo-negro.svg` — para impresión b/n o uso monocromo (en azul `#2c3a4a`).
- `maicero-isotipo-amarillo-bold.svg` — stroke reforzado, menos granos, para tamaños de 32-44px.
- `maicero-isotipo-amarillo-simple.svg` — solo silueta sin granos, para 16-24px.

## 03 · Favicons

Sistema de 3 versiones del isotipo según tamaño, con fondo azul `#2c3a4a` redondeado:

- `favicon.svg` — escalable, soportado por Chrome/Firefox/Safari modernos.
- `favicon-16.png` / `favicon-24.png` — versión simple (solo silueta).
- `favicon-32.png` — versión bold (stroke reforzado).
- `favicon-48.png` / `favicon-192.png` / `favicon-512.png` — versión completa.
- `apple-touch-icon.png` (180×180) — incluye fondo azul con rounded corners para iOS.

### Integración en Next.js

```tsx
// app/layout.tsx
export const metadata: Metadata = {
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
}
```

```json
// public/site.webmanifest
{
  "name": "maicero",
  "short_name": "maicero",
  "icons": [
    { "src": "/favicon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/favicon-512.png", "sizes": "512x512", "type": "image/png" }
  ],
  "theme_color": "#2c3a4a",
  "background_color": "#2c3a4a"
}
```

## 04 · Redes sociales

### Profile pictures (foto de perfil)

Tres variantes para que elijan según el feed:

- `profile-foto-oscura-1080.png` — fondo azul `#2c3a4a`, isotipo amarillo.
- `profile-foto-clara-1080.png` — fondo blanco, isotipo azul.
- `profile-foto-amarilla-1080.png` — fondo amarillo, isotipo azul. **Recomendada** — matchea con el icono de app.

Todas son 1080×1080 cuadradas (Instagram, Facebook y LinkedIn las recortan en círculo). El isotipo tiene 20% de padding por lado, así que aguanta el crop circular sin problema.

### Portadas (cover photos)

Cada una está a las medidas oficiales actuales (2026):

- `facebook-portada-1640x664.png` — Facebook (página de empresa).
- `instagram-post-1080x1080.png` — Post cuadrado fijado en perfil de IG.
- `instagram-story-1080x1920.png` — Story vertical para destacar al lanzar.
- `twitter-x-header-1500x500.png` — Header de X/Twitter.
- `linkedin-portada-1128x191.png` — Cover de página de empresa LinkedIn.
- `linkedin-personal-1584x396.png` — Cover de perfil personal LinkedIn.
- `youtube-channel-art-2560x1440.png` — Channel art de YouTube (zona segura: 1546×423 centrada).

Todas en fondo azul `#2c3a4a` con el lockup centrado y la tagline "De maiceros, para maiceros". Si quieren otra tagline, dime y te las regenero.

## 🎨 Tokens de marca

```ts
// src/lib/brand.ts
export const brand = {
  // Colores
  yellow: '#FFD23F',  // isotipo, ®, acentos, fondo de icono de app
  dark:   '#2c3a4a',  // azul comal — fondo oscuro, texto sobre claros
  white:  '#FFFFFF',

  // Slogan oficial
  tagline: 'De maiceros, para maiceros',

  // Tipografía
  font: {
    display:    'Bricolage Grotesque',
    weight:     800,            // ExtraBold para wordmark y titulares
    weightReg:  500,            // Medium para el ® y subtítulos
    tracking:   '-0.04em',      // tracking-tight para wordmark
  },
} as const
```

```tsx
// Uso del lockup como componente
import Image from 'next/image'
import logoLight from '@/assets/maicero-lockup-light.svg'
import logoDark from '@/assets/maicero-lockup-dark.svg'

export const Logo = ({ variant = 'light' }: { variant?: 'light' | 'dark' }) => (
  <Image
    src={variant === 'dark' ? logoDark : logoLight}
    alt="maicero — De maiceros, para maiceros"
    priority
  />
)
```

## 🔧 Geometría del isotipo

Por si necesitan regenerarlo, animarlo o adaptarlo en algún punto:

- **viewBox interno:** `11 9 82 82` (sistema 0-100 centrado en la mazorca)
- **Cuerpo (cob):** elipse diagonal alargada de (40,68) a (88,28)
- **Hoja (husk):** pétalo envolvente lateral izquierdo
- **Pedúnculo (stem):** rombo pequeño en la base de la hoja
- **Granos:** 14 rombos rotados 45° en patrón diagonal de 4 filas
- **Stroke:** 5 unidades en versión normal, 6 en bold, 8 en simple
