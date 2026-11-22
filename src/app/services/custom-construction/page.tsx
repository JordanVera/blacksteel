import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { getServiceBySlug } from "@/features/services/catalog";
import { ServiceDetailTemplate } from "@/components/sections/services/ServiceDetailTemplate";

const service = getServiceBySlug("custom-construction");

export const metadata: Metadata = buildPageMetadata({
  title: "Custom Construction",
  description: service.summary,
  path: "/services/custom-construction",
  ogImage: "/images/demo/residence-dusk.jpg",
});

export default function CustomConstructionPage() {
  return <ServiceDetailTemplate service={service} />;
}
