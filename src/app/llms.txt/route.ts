import { SITE_CONFIG } from "@/content/site";
import { SERVICES_CATALOG } from "@/content/services";
import { LOCATION_MARKETS } from "@/content/locations";
import { BUSINESS_PROFILE } from "@/content/business";
import { portfolioRepository } from "@/features/portfolio/repository";
import {
  getAllLocalServicePages,
  getAllNeighborhoodGuides,
  localServicePath,
  neighborhoodPath,
} from "@/features/locations/catalog";
import { getAllArticles, journalPath } from "@/features/journal/catalog";
import { SITE_DESCRIPTION, SITE_NAME, absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

function link(label: string, path: string, note?: string): string {
  return `- [${label}](${absoluteUrl(path)})${note ? `: ${note}` : ""}`;
}

function buildLlmsTxt(): string {
  const markets = Object.values(LOCATION_MARKETS);
  const facts = [
    `- Ownership: ${SITE_CONFIG.ownershipNote}`,
    `- Markets: ${SITE_CONFIG.markets}`,
    BUSINESS_PROFILE.telephone ? `- Telephone: ${BUSINESS_PROFILE.telephone}` : null,
    BUSINESS_PROFILE.email ? `- Email: ${BUSINESS_PROFILE.email}` : null,
    BUSINESS_PROFILE.principals.length > 0
      ? `- Principals: ${BUSINESS_PROFILE.principals
          .map((person) => `${person.name} (${person.role})`)
          .join(", ")}`
      : null,
  ].filter(Boolean);

  return [
    `# ${SITE_NAME}`,
    "",
    `> ${SITE_DESCRIPTION}`,
    "",
    ...facts,
    "",
    "## Services",
    ...SERVICES_CATALOG.map((service) =>
      link(service.seoTitle, `/services/${service.slug}`, service.answerLead)
    ),
    "",
    "## Markets",
    ...markets.map((market) =>
      link(
        `${market.city}, ${market.state}`,
        `/locations/${market.slug}`,
        `Neighborhoods served: ${market.serviceAreas.join(", ")}`
      )
    ),
    "",
    "## Local Services",
    ...getAllLocalServicePages().map((page) =>
      link(page.seoTitle, localServicePath(page), page.answerLead)
    ),
    "",
    "## Neighborhood Guides",
    ...getAllNeighborhoodGuides().map((guide) =>
      link(guide.seoTitle, neighborhoodPath(guide), guide.seoDescription)
    ),
    "",
    "## Journal",
    ...getAllArticles().map((article) =>
      link(article.title, journalPath(article), article.description)
    ),
    "",
    "## Project Studies",
    ...portfolioRepository
      .getAllProjects()
      .filter((project) => !project.isDemonstration)
      .map((project) =>
        link(
          project.name,
          `/projects/${project.slug}`,
          `${project.category}, ${project.neighborhood}, ${project.city}`
        )
      ),
    "",
    "## Company",
    link("About", "/about"),
    link("Process", "/process"),
    link("Contact", "/contact"),
    "",
  ].join("\n");
}

export function GET() {
  return new Response(buildLlmsTxt(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
