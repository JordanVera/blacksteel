import type { Metadata } from "next";
import {
  buildServiceMetadata,
  getServiceBySlug,
} from "@/features/services/catalog";
import { ServiceDetailTemplate } from "@/components/sections/services/ServiceDetailTemplate";

const service = getServiceBySlug("general-contracting");

export const metadata: Metadata = buildServiceMetadata(service);

export default function GeneralContractingPage() {
  return <ServiceDetailTemplate service={service} />;
}
