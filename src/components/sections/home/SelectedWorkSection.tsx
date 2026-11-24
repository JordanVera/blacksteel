import { portfolioRepository } from "@/features/portfolio/repository";
import { Container } from "@/components/layout/Container";
import { SectionShell } from "@/components/layout/SectionShell";
import { EditorialHeading } from "@/components/ui/EditorialHeading";
import { ActionLink } from "@/components/ui/ActionLink";
import { ArchitecturalRule } from "@/components/motion/ArchitecturalRule";
import { RevealMask } from "@/components/motion/RevealMask";
import { FocusProjectCards } from "@/components/aceternity/FocusProjectCards";

export function SelectedWorkSection() {
  const featuredProjects = portfolioRepository.getFeaturedProjects();

  return (
    <SectionShell
      id="selected-work"
      surface="canvas"
      spacing="spacious"
      className="bg-arch-dots"
    >
      <Container>
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <RevealMask className="max-w-2xl">
            <EditorialHeading
              index="03"
              eyebrow="Selected Work"
              size="section"
              title="Architectural studies in custom remodeling and spatial craft."
              description="Hover to isolate focus or open Quick Specs for an immediate smoked-glass dossier of completed BLACKSTEEL remodeling and millwork."
            />
          </RevealMask>

          <RevealMask
            delay={0.1}
            className="flex flex-col items-start gap-3 lg:items-end"
          >
            <ActionLink href="/projects" variant="underline">
              View All Studies
            </ActionLink>
          </RevealMask>
        </div>

        <ArchitecturalRule className="my-12 lg:my-14" />

        <FocusProjectCards projects={featuredProjects} />
      </Container>
    </SectionShell>
  );
}
