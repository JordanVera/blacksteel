import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { portfolioRepository } from "@/features/portfolio/repository";

const STATIC_ROUTES = [
  "",
  "/about",
  "/services",
  "/services/luxury-remodeling",
  "/services/kitchen-remodeling",
  "/services/bathroom-remodeling",
  "/services/custom-construction",
  "/services/general-contracting",
  "/services/restoration",
  "/projects",
  "/process",
  "/locations/houston",
  "/locations/austin",
  "/contact",
  "/privacy",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route.startsWith("/locations/") ? 0.9 : 0.8,
  }));

  const projectEntries: MetadataRoute.Sitemap = portfolioRepository
    .getAllSlugs()
    .map((slug) => ({
      url: `${SITE_URL}/projects/${slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75,
    }));

  return [...staticEntries, ...projectEntries];
}
