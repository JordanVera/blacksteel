import type { Metadata } from "next";
import {
  buildServiceMetadata,
  getServiceBySlug,
} from "@/features/services/catalog";
import { ServiceDetailTemplate } from "@/components/sections/services/ServiceDetailTemplate";

const service = getServiceBySlug("restoration");

export const metadata: Metadata = buildServiceMetadata(service);

export default function RestorationPage() {
  return <ServiceDetailTemplate service={service} />;
}
