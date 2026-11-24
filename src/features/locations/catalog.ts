import type { Metadata } from "next";
import { LOCAL_SERVICE_PAGES } from "@/content/local-services";
import { NEIGHBORHOOD_GUIDES } from "@/content/neighborhoods";
import { getMediaAsset } from "@/content/media";
import { buildPageMetadata } from "@/lib/seo";
import type {
  LocalServicePage,
  MarketSlug,
  NeighborhoodGuide,
} from "@/types/domain";

export function localServicePath(page: LocalServicePage): string {
  return `/locations/${page.market}/${page.service}`;
}

export function neighborhoodPath(guide: NeighborhoodGuide): string {
  return `/locations/${guide.market}/${guide.slug}`;
}

export function getAllLocalServicePages(): LocalServicePage[] {
  return [...LOCAL_SERVICE_PAGES];
}

export function getLocalServicePages(market: MarketSlug): LocalServicePage[] {
  return LOCAL_SERVICE_PAGES.filter((page) => page.market === market);
}

export function getAllNeighborhoodGuides(): NeighborhoodGuide[] {
  return [...NEIGHBORHOOD_GUIDES];
}

export function getNeighborhoodGuides(market: MarketSlug): NeighborhoodGuide[] {
  return NEIGHBORHOOD_GUIDES.filter((guide) => guide.market === market);
}

export type MarketSubpage =
  | { kind: "service"; page: LocalServicePage }
  | { kind: "neighborhood"; guide: NeighborhoodGuide };

export function getMarketSubpage(
  market: MarketSlug,
  slug: string
): MarketSubpage | undefined {
  const page = LOCAL_SERVICE_PAGES.find(
    (item) => item.market === market && item.service === slug
  );
  if (page) return { kind: "service", page };

  const guide = NEIGHBORHOOD_GUIDES.find(
    (item) => item.market === market && item.slug === slug
  );
  if (guide) return { kind: "neighborhood", guide };

  return undefined;
}

export function getMarketSubpageSlugs(market: MarketSlug): string[] {
  return [
    ...getLocalServicePages(market).map((page) => page.service),
    ...getNeighborhoodGuides(market).map((guide) => guide.slug),
  ];
}

export function buildMarketSubpageMetadata(
  market: MarketSlug,
  slug: string
): Metadata {
  const subpage = getMarketSubpage(market, slug);
  if (!subpage) return {};

  if (subpage.kind === "service") {
    return buildPageMetadata({
      title: subpage.page.seoTitle,
      description: subpage.page.seoDescription,
      path: localServicePath(subpage.page),
      ogImage: getMediaAsset(subpage.page.imageId).src,
    });
  }

  return buildPageMetadata({
    title: subpage.guide.seoTitle,
    description: subpage.guide.seoDescription,
    path: neighborhoodPath(subpage.guide),
    ogImage: getMediaAsset(subpage.guide.imageId).src,
  });
}
