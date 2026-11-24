import type { Metadata } from "next";
import { SERVICES_CATALOG } from "@/content/services";
import { getMediaAsset } from "@/content/media";
import { buildPageMetadata } from "@/lib/seo";
import type { ServiceItem, ServiceSlug } from "@/types/domain";

export function buildServiceMetadata(service: ServiceItem): Metadata {
  return buildPageMetadata({
    title: service.seoTitle,
    description: service.answerLead,
    path: `/services/${service.slug}`,
    ogImage: getMediaAsset(service.imageId).src,
  });
}

export function getAllServices(): ServiceItem[] {
  return [...SERVICES_CATALOG];
}

export function getPrimaryServicePillars(): ServiceItem[] {
  return SERVICES_CATALOG.filter((service) => service.isPrimaryPillar);
}

export function getServiceBySlug(slug: ServiceSlug): ServiceItem {
  const match = SERVICES_CATALOG.find((service) => service.slug === slug);
  if (!match) {
    return SERVICES_CATALOG[0]!;
  }
  return match;
}

export function getRelatedServices(slugs: ServiceSlug[]): ServiceItem[] {
  return slugs
    .map((slug) => SERVICES_CATALOG.find((s) => s.slug === slug))
    .filter((s): s is ServiceItem => Boolean(s));
}
