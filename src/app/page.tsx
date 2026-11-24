import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { getPrimaryServicePillars } from "@/features/services/catalog";
import { HeroSection } from "@/components/sections/home/HeroSection";
import { BrandIntroSection } from "@/components/sections/home/BrandIntroSection";
import { SelectedWorkSection } from "@/components/sections/home/SelectedWorkSection";
import { ExpertiseSection } from "@/components/sections/home/ExpertiseSection";
import { CraftDetailsSection } from "@/components/sections/home/CraftDetailsSection";
import { ApproachSection } from "@/components/sections/home/ApproachSection";
import { RegionalMarketsSection } from "@/components/sections/home/RegionalMarketsSection";
import { FinalConversionSection } from "@/components/sections/home/FinalConversionSection";

export const metadata: Metadata = buildPageMetadata({
  title: { absolute: "Luxury Remodeling in Houston & Austin | BLACKSTEEL" },
  description:
    "BLACKSTEEL Construction & Remodeling is a family-owned contractor for luxury home remodeling, custom cabinetry, structural additions, and general contracting in Houston and Austin, Texas.",
  path: "/",
  ogImage: "/images/demo/residence-pavilion.jpg",
});

export default function HomePage() {
  const servicePillars = getPrimaryServicePillars();

  return (
    <>
      <HeroSection />
      <BrandIntroSection />
      <SelectedWorkSection />
      <ExpertiseSection pillars={servicePillars} />
      <CraftDetailsSection />
      <ApproachSection />
      <RegionalMarketsSection />
      <FinalConversionSection />
    </>
  );
}
