import { notFound } from "next/navigation";
import type { MarketSlug } from "@/types/domain";
import { getMarketSubpage } from "@/features/locations/catalog";
import { LocalServiceTemplate } from "@/components/sections/locations/LocalServiceTemplate";
import { NeighborhoodGuideTemplate } from "@/components/sections/locations/NeighborhoodGuideTemplate";

interface MarketSubpageProps {
  market: MarketSlug;
  slug: string;
}

export function MarketSubpage({ market, slug }: MarketSubpageProps) {
  const subpage = getMarketSubpage(market, slug);
  if (!subpage) notFound();

  return subpage.kind === "service" ? (
    <LocalServiceTemplate page={subpage.page} />
  ) : (
    <NeighborhoodGuideTemplate guide={subpage.guide} />
  );
}
