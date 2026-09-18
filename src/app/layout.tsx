import type { Metadata } from "next";
import { Onest } from "next/font/google";
import "./globals.css";
import { AnalyticsProvider } from "@/components/analytics-provider";
import { SmoothScroll } from "@/components/smooth-scroll";
import { getPageContent } from "@/content/site";
import { buildAlternates, buildOpenGraph, siteUrl } from "@/lib/seo";

const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin"],
  display: "swap",
});

const [, homeTitle, homeDescription] = getPageContent("es", undefined);

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "XDEVELOP · Software para operaciones que no pueden detenerse",
    template: "%s · XDEVELOP",
  },
  description:
    "Revisamos, continuamos, modernizamos y operamos software que ya importa para tu empresa.",
  alternates: buildAlternates("es"),
  openGraph: buildOpenGraph("es", undefined, homeTitle, homeDescription),
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${onest.variable} antialiased`}>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
        <AnalyticsProvider />
      </body>
    </html>
  );
}
