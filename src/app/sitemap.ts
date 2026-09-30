import type { MetadataRoute } from "next";
import { projectDetails } from "@/content/projects";
import { absoluteUrl } from "@/lib/seo";

const innerPages = [
  "/que-hacemos",
  "/como-trabajamos",
  "/experiencia",
  "/proyectos",
  ...projectDetails.map(({ slug }) => `/proyectos/${slug}`),
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: absoluteUrl("/"),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...innerPages.map((path) => ({
      url: absoluteUrl(path),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
