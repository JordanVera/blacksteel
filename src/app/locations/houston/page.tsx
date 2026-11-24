import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { LOCATION_MARKETS } from "@/content/locations";
import { LocationLandingTemplate } from "@/components/sections/locations/LocationLandingTemplate";

const market = LOCATION_MARKETS.houston;

export const metadata: Metadata = buildPageMetadata({
  title: "Luxury Remodeling & Custom Construction in Houston, TX",
  description:
    "BLACKSTEEL Construction & Remodeling delivers whole-home luxury remodeling, custom cabinetry, structural renovations, general contracting, and architectural reconstruction in Houston, TX.",
  path: "/locations/houston",
  ogImage: "/images/demo/residence-dusk.jpg",
});

export default function HoustonLocationPage() {
  return <LocationLandingTemplate market={market} />;
}
