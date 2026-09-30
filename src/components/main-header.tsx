import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { analyticsEvents } from "@/lib/analytics";

export type MainSection = "que-hacemos" | "como-trabajamos" | "experiencia" | "proyectos";

// `anchorBase` is "" on the home (same-page anchors) and "/" on inner pages,
// so "#casos" becomes "/#casos" and still lands on the home section.
export function MainHeader({ anchorBase = "", current }: { anchorBase?: "" | "/"; current?: MainSection }) {
  return (
    <header className="site-header">
      <Link href={anchorBase ? "/" : "#inicio"} className="brand" aria-label="XDEVELOP, inicio">
        <Image src="/brand/xdevelop-logo-black.png" className="theme-logo-light" alt="XDEVELOP software" width={196} height={52} priority />
        <Image src="/brand/xdevelop-logo-white.png" className="theme-logo-dark" alt="XDEVELOP software" width={196} height={52} priority />
      </Link>
      <nav className="desktop-nav" aria-label="Navegación principal">
        <Link href="/que-hacemos" aria-current={current === "que-hacemos" ? "page" : undefined}>Qué hacemos</Link>
        <Link href="/como-trabajamos" aria-current={current === "como-trabajamos" ? "page" : undefined}>Cómo trabajamos</Link>
        <Link href="/proyectos" aria-current={current === "proyectos" ? "page" : undefined}>Proyectos</Link>
        <Link href="/experiencia" aria-current={current === "experiencia" ? "page" : undefined}>Experiencia</Link>
      </nav>
      <div className="header-actions">
        <ThemeToggle />
        <Button
          render={<Link href={`${anchorBase}#contacto`} />}
          nativeButton={false}
          variant="dark"
          size="cta-sm"
          data-analytics-event={analyticsEvents.scheduleOpen}
          data-analytics-source="header"
        >
          Revisar mi proyecto
        </Button>
      </div>
    </header>
  );
}
