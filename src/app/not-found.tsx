import Image from "next/image";
import Link from "next/link";
import { NotFoundMark } from "@/components/not-found-mark";

export default function NotFound() {
  return (
    <main className="not-found">
      <Link href="/" className="brand not-found-brand" aria-label="XDEVELOP, inicio">
        <Image src="/brand/xdevelop-logo-black.png" alt="XDEVELOP software" width={196} height={52} />
      </Link>

      <div className="not-found-stage">
        <NotFoundMark />
      </div>

      <div className="not-found-copy">
        <div className="eyebrow">
          <span className="signal-line" /> Error 404
        </div>
        <h1>Esta dirección ya no existe. Tu operación sí.</h1>
        <p>
          El contenido que buscabas cambió de lugar cuando reconstruimos este sitio. Nada se perdió: este
          es el camino que sigue llevando a algo.
        </p>
        <div className="not-found-links">
          <Link className="button button-dark" href="/">
            Volver al inicio
          </Link>
          <Link className="text-link" href="/#clientes">
            Ver clientes
          </Link>
          <Link className="text-link" href="/#contacto">
            Hablar con el equipo
          </Link>
        </div>
      </div>
    </main>
  );
}
