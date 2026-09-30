import Link from "next/link";
import { MainFooter } from "@/components/main-footer";
import { MainHeader, type MainSection } from "@/components/main-header";
import { MotionReveal } from "@/components/motion-reveal";
import { Button } from "@/components/ui/button";
import { analyticsEvents } from "@/lib/analytics";

type InfoPageProps = {
  section: MainSection;
  eyebrow: string;
  heading: string;
  /** Who or what the point is about (clients, sector); shown above the title. */
  items: readonly { title: string; text: string; label?: string }[];
  /** Number the points only when they are a real sequence, like a process. */
  numbered?: boolean;
  secondaryLink?: { href: string; label: string };
};

// Inner pages share one layout: eyebrow + statement, a 2×2 grid of points and the CTA.
export function InfoPage({ section, eyebrow, heading, items, numbered = false, secondaryLink }: InfoPageProps) {
  return (
    <div className="home-shell">
      <MainHeader anchorBase="/" current={section} />

      <main>
        <section className="page-hero" aria-labelledby="page-title">
          <div className="eyebrow" data-reveal><span className="status-dot" /> {eyebrow}</div>
          <h1 id="page-title" data-reveal data-reveal-delay="0.06">{heading}</h1>

          <div className="service-grid">
            {items.map((item, index) => (
              <article className="service" key={item.title} data-reveal data-reveal-group="services">
                {numbered ? <span className="entry-number">0{index + 1}</span> : null}
                {item.label ? <span className="card-label">{item.label}</span> : null}
                <h2>{item.title}</h2>
                <p>{item.text}</p>
              </article>
            ))}
          </div>

          <div className="page-actions" data-reveal>
            <Button
              render={<Link href="/#contacto" />}
              nativeButton={false}
              variant="dark"
              size="cta"
              data-analytics-event={analyticsEvents.scheduleOpen}
              data-analytics-source={section}
            >
              Revisar mi proyecto
            </Button>
            {secondaryLink ? (
              <Link className="text-link" href={secondaryLink.href}>{secondaryLink.label}</Link>
            ) : null}
          </div>
        </section>
      </main>

      <MainFooter anchorBase="/" />
      <MotionReveal />
    </div>
  );
}
