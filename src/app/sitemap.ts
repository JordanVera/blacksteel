import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { SERVICES_CATALOG } from "@/content/services";
import { LOCATION_MARKETS } from "@/content/locations";
import { portfolioRepository } from "@/features/portfolio/repository";
import {
  getAllLocalServicePages,
  getAllNeighborhoodGuides,
  localServicePath,
  neighborhoodPath,
} from "@/features/locations/catalog";
import { getAllArticles, journalPath } from "@/features/journal/catalog";

/** Last meaningful content change for pages without their own content record. */
const STATIC_PAGES: { path: string; updated: string; priority: number }[] = [
  { path: "", updated: "2026-11-23", priority: 1 },
  { path: "/about", updated: "2026-11-23", priority: 0.8 },
  { path: "/services", updated: "2026-11-23", priority: 0.8 },
  { path: "/projects", updated: "2026-11-23", priority: 0.8 },
  { path: "/process", updated: "2026-11-23", priority: 0.7 },
  { path: "/contact", updated: "2026-11-23", priority: 0.7 },
  { path: "/journal", updated: "2026-11-23", priority: 0.7 },
  { path: "/privacy", updated: "2026-11-23", priority: 0.2 },
];

function entry(
  path: string,
  updated: string,
  priority: number
): MetadataRoute.Sitemap[number] {
  return {
    url: `${SITE_URL}${path}`,
    lastModified: new Date(`${updated}T00:00:00Z`),
    priority,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...STATIC_PAGES.map((page) => entry(page.path, page.updated, page.priority)),
    ...SERVICES_CATALOG.map((service) =>
      entry(`/services/${service.slug}`, service.updated, 0.8)
    ),
    ...Object.values(LOCATION_MARKETS).map((market) =>
      entry(`/locations/${market.slug}`, market.updated, 0.9)
    ),
    ...getAllLocalServicePages().map((page) =>
      entry(localServicePath(page), page.updated, 0.9)
    ),
    ...getAllNeighborhoodGuides().map((guide) =>
      entry(neighborhoodPath(guide), guide.updated, 0.7)
    ),
    ...getAllArticles().map((article) =>
      entry(journalPath(article), article.updated, 0.7)
    ),
    ...portfolioRepository
      .getAllProjects()
      .map((project) => entry(`/projects/${project.slug}`, project.updated, 0.6)),
  ];
}
