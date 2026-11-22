import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { getServiceBySlug } from "@/features/services/catalog";
import { ServiceDetailTemplate } from "@/components/sections/services/ServiceDetailTemplate";

const service = getServiceBySlug("restoration");

export const metadata: Metadata = buildPageMetadata({
  title: "Restoration & Reconstruction",
  description: service.summary,
  path: "/services/restoration",
  ogImage: "/images/demo/living-fireplace.jpg",
});

export default function RestorationPage() {
  return <ServiceDetailTemplate service={service} />;
}
