import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { getServiceBySlug } from "@/features/services/catalog";
import { ServiceDetailTemplate } from "@/components/sections/services/ServiceDetailTemplate";

const service = getServiceBySlug("kitchen-remodeling");

export const metadata: Metadata = buildPageMetadata({
  title: "Kitchen Remodeling",
  description: service.summary,
  path: "/services/kitchen-remodeling",
  ogImage: "/images/demo/kitchen-island.jpg",
});

export default function KitchenRemodelingPage() {
  return <ServiceDetailTemplate service={service} />;
}
