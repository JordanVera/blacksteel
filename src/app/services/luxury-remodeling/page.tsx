import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { getServiceBySlug } from "@/features/services/catalog";
import { ServiceDetailTemplate } from "@/components/sections/services/ServiceDetailTemplate";

const service = getServiceBySlug("luxury-remodeling");

export const metadata: Metadata = buildPageMetadata({
  title: "Luxury Remodeling",
  description: service.summary,
  path: "/services/luxury-remodeling",
  ogImage: "/images/demo/residence-facade.jpg",
});

export default function LuxuryRemodelingPage() {
  return <ServiceDetailTemplate service={service} />;
}
