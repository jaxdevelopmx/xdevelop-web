import type { MetadataRoute } from "next";
import { absoluteUrl, siteUrl } from "@/lib/seo";

const isProductionDeployment = (process.env.VERCEL_ENV ?? "production") === "production";

export default function robots(): MetadataRoute.Robots {
  if (!isProductionDeployment) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: absoluteUrl("/sitemap.xml"),
    host: siteUrl,
  };
}
