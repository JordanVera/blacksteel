import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { getServiceBySlug } from "@/features/services/catalog";
import { ServiceDetailTemplate } from "@/components/sections/services/ServiceDetailTemplate";

const service = getServiceBySlug("bathroom-remodeling");

export const metadata: Metadata = buildPageMetadata({
  title: "Bathroom Remodeling",
  description: service.summary,
  path: "/services/bathroom-remodeling",
  ogImage: "/images/demo/bath-minimal.jpg",
});

export default function BathroomRemodelingPage() {
  return <ServiceDetailTemplate service={service} />;
}
