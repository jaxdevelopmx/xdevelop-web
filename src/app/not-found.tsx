import Image from "next/image";
import Link from "next/link";
import { NotFoundMark } from "@/components/not-found-mark";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="relative grid min-h-[100svh] grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] items-center gap-[clamp(28px,5vw,80px)] bg-[var(--paper)] pt-[clamp(96px,13vh,150px)] px-[clamp(24px,7vw,120px)] pb-[clamp(48px,8vh,96px)] max-[900px]:grid-cols-1 max-[900px]:content-center max-[900px]:pt-[116px]">
      <Link
        href="/"
        className="brand absolute left-[clamp(24px,7vw,120px)] top-[26px]"
        aria-label="XDEVELOP, inicio"
      >
        <Image src="/brand/xdevelop-logo-black.png" className="theme-logo-light" alt="XDEVELOP software" width={196} height={52} />
        <Image src="/brand/xdevelop-logo-white.png" className="theme-logo-dark" alt="XDEVELOP software" width={196} height={52} />
      </Link>

      <div className="flex justify-center">
        <NotFoundMark />
      </div>

      <div className="max-w-[560px]">
        <div className="eyebrow">
          <span className="signal-line" /> Error 404
        </div>
        <h1 className="mt-5 text-[clamp(30px,3.4vw,50px)] font-semibold tracking-[-0.05em] leading-[1.04]">
          Esta dirección ya no existe. Tu operación sí.
        </h1>
        <p className="mt-[18px] max-w-[52ch] text-[clamp(15px,1.2vw,17px)] leading-normal text-[var(--ink-68)]">
          El contenido que buscabas cambió de lugar cuando reconstruimos este sitio. Nada se perdió: este
          es el camino que sigue llevando a algo.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-[22px] border-t border-[var(--line)] pt-7">
          <Button render={<Link href="/" />} nativeButton={false} variant="dark" size="cta">
            Volver al inicio
          </Button>
          <Link className="text-link text-sm" href="/#clientes">
            Ver clientes
          </Link>
          <Link className="text-link text-sm" href="/#contacto">
            Hablar con el equipo
          </Link>
        </div>
      </div>
    </main>
  );
}
