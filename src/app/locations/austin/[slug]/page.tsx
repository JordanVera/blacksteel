import type { Metadata } from "next";
import {
  buildMarketSubpageMetadata,
  getMarketSubpageSlugs,
} from "@/features/locations/catalog";
import { MarketSubpage } from "@/components/sections/locations/MarketSubpage";

interface AustinSubpageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return getMarketSubpageSlugs("austin").map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: AustinSubpageProps): Promise<Metadata> {
  const { slug } = await params;
  return buildMarketSubpageMetadata("austin", slug);
}

export default async function AustinSubpage({ params }: AustinSubpageProps) {
  const { slug } = await params;
  return <MarketSubpage market="austin" slug={slug} />;
}
