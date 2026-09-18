import type { Metadata } from "next";
import { Onest } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/smooth-scroll";

const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://xdevelop.mx"),
  title: {
    default: "XDEVELOP · Software para operaciones que no pueden detenerse",
    template: "%s · XDEVELOP",
  },
  description:
    "Revisamos, continuamos, modernizamos y operamos software que ya importa para tu empresa.",
  openGraph: {
    title: "Software para operaciones que no pueden detenerse",
    description:
      "XDEVELOP aporta el equipo que tu proyecto necesita para continuar.",
    type: "website",
    locale: "es_MX",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${onest.variable} antialiased`}>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
