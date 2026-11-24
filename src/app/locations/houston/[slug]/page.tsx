import type { Metadata } from "next";
import {
  buildMarketSubpageMetadata,
  getMarketSubpageSlugs,
} from "@/features/locations/catalog";
import { MarketSubpage } from "@/components/sections/locations/MarketSubpage";

interface HoustonSubpageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return getMarketSubpageSlugs("houston").map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: HoustonSubpageProps): Promise<Metadata> {
  const { slug } = await params;
  return buildMarketSubpageMetadata("houston", slug);
}

export default async function HoustonSubpage({ params }: HoustonSubpageProps) {
  const { slug } = await params;
  return <MarketSubpage market="houston" slug={slug} />;
}
