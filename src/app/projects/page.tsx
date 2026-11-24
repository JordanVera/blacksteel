import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { portfolioRepository } from "@/features/portfolio/repository";
import { Container } from "@/components/layout/Container";
import { SectionShell } from "@/components/layout/SectionShell";
import { PageHero } from "@/components/sections/shared/PageHero";
import { PortfolioGridClient } from "@/components/sections/portfolio/PortfolioGridClient";
import { FinalConversionSection } from "@/components/sections/home/FinalConversionSection";

export const metadata: Metadata = buildPageMetadata({
  title: "Remodeling Portfolio: Houston & Austin Projects",
  description:
    "Explore architectural remodeling, luxury kitchen, bath sanctuary, and structural addition studies designed for Houston and Austin residences.",
  path: "/projects",
});

export default function ProjectsIndexPage() {
  const projects = portfolioRepository.getAllProjects();

  return (
    <>
      <PageHero
        index="PORTFOLIO"
        eyebrow="Selected Work"
        title="Architectural studies in luxury remodeling and bespoke craft."
        description="Explore completed remodeling, luxury kitchen, bath sanctuary, and structural addition work across Houston and Austin."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Work" }]}
      />

      <SectionShell surface="canvas" spacing="spacious">
        <Container>
          <PortfolioGridClient projects={projects} />
        </Container>
      </SectionShell>

      <FinalConversionSection />
    </>
  );
}
