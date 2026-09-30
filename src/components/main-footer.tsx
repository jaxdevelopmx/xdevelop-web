import Image from "next/image";
import Link from "next/link";
import { SocialLinks } from "@/components/social-links";
import { organization } from "@/content/organization";
import { analyticsEvents } from "@/lib/analytics";

export function MainFooter({ anchorBase = "" }: { anchorBase?: "" | "/" }) {
  return (
    <footer className="site-footer" id="nosotros">
      <div className="footer-index">
        <div className="footer-brand" data-reveal data-reveal-group="footer">
          <Image src="/brand/xdevelop-logo-black.png" className="theme-logo-light" alt="XDEVELOP" width={196} height={52} />
          <Image src="/brand/xdevelop-logo-white.png" className="theme-logo-dark" alt="XDEVELOP" width={196} height={52} />
          <p>Software para operaciones que no pueden detenerse.</p>
        </div>

        <nav className="footer-nav" data-reveal data-reveal-group="footer" aria-label="Secciones del sitio">
          <span className="footer-label">Explorar</span>
          <Link href="/que-hacemos">Qué hacemos</Link>
          <Link href="/como-trabajamos">Cómo trabajamos</Link>
          <Link href="/proyectos">Proyectos</Link>
          <Link href="/experiencia">Experiencia</Link>
        </nav>

        <div className="footer-nav" data-reveal data-reveal-group="footer">
          <span className="footer-label">Contacto</span>
          <a href={`mailto:${organization.email}`}>{organization.email}</a>
          <a href={`tel:${organization.phone}`}>{organization.phoneDisplay}</a>
          <a
            href={organization.whatsapp}
            target="_blank"
            rel="noreferrer"
            data-analytics-event={analyticsEvents.whatsappClick}
            data-analytics-source="footer"
          >
            WhatsApp
          </a>
        </div>

        <nav className="footer-nav" data-reveal data-reveal-group="footer" aria-label="Enlaces legales">
          <span className="footer-label">Legales</span>
          <a href={`${anchorBase}#contacto`}>Aviso de privacidad</a>
          <a href={`mailto:${organization.email}`}>Trabaja con nosotros</a>
        </nav>
      </div>

      <div className="footer-bottom">
        <span>© 2026 XDEVELOP</span>
        <address className="footer-address">
          {organization.address.street}, {organization.address.locality}
        </address>
        <SocialLinks />
      </div>
    </footer>
  );
}
