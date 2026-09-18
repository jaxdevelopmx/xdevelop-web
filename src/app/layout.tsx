import type { Metadata } from "next";
import { Onest } from "next/font/google";
import "./globals.css";
import { AnalyticsProvider } from "@/components/analytics-provider";
import { SmoothScroll } from "@/components/smooth-scroll";
import { ThemeProvider } from "@/components/theme-provider";
import { getPageContent } from "@/content/site";
import { siteUrl } from "@/lib/seo";

const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin"],
  display: "optional",
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
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    title: homeTitle,
    description: homeDescription,
    url: "/",
    siteName: "XDEVELOP",
    locale: "es_MX",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${onest.variable} antialiased`} suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SmoothScroll>{children}</SmoothScroll>
          <AnalyticsProvider />
        </ThemeProvider>
      </body>
    </html>
  );
}
