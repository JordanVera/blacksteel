import type { Metadata } from "next";
import {
  buildServiceMetadata,
  getServiceBySlug,
} from "@/features/services/catalog";
import { ServiceDetailTemplate } from "@/components/sections/services/ServiceDetailTemplate";

const service = getServiceBySlug("luxury-remodeling");

export const metadata: Metadata = buildServiceMetadata(service);

export default function LuxuryRemodelingPage() {
  return <ServiceDetailTemplate service={service} />;
}
