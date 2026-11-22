import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { LOCATION_MARKETS } from "@/content/locations";
import { LocationLandingTemplate } from "@/components/sections/locations/LocationLandingTemplate";

const market = LOCATION_MARKETS.austin;

export const metadata: Metadata = buildPageMetadata({
  title: "Austin Luxury Remodeling & Custom Construction",
  description:
    "BLACKSTEEL Construction & Remodeling delivers bespoke residential remodeling, custom kitchens and millwork, structural additions, and general contracting in Austin, TX.",
  path: "/locations/austin",
  ogImage: "/images/demo/millwork-detail.jpg",
});

export default function AustinLocationPage() {
  return <LocationLandingTemplate market={market} />;
}
