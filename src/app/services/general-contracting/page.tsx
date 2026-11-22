import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { getServiceBySlug } from "@/features/services/catalog";
import { ServiceDetailTemplate } from "@/components/sections/services/ServiceDetailTemplate";

const service = getServiceBySlug("general-contracting");

export const metadata: Metadata = buildPageMetadata({
  title: "General Contracting",
  description: service.summary,
  path: "/services/general-contracting",
  ogImage: "/images/demo/millwork-detail.jpg",
});

export default function GeneralContractingPage() {
  return <ServiceDetailTemplate service={service} />;
}
