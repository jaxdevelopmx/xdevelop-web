import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found">
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
          <Link href="/">
            Inicio
          </Link>
        </div>
      </div>
    </main>
  );
}
