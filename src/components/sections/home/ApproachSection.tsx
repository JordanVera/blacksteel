import { PROCESS_STAGES } from "@/content/process";
import { Container } from "@/components/layout/Container";
import { SectionShell } from "@/components/layout/SectionShell";
import { EditorialHeading } from "@/components/ui/EditorialHeading";
import { ActionLink } from "@/components/ui/ActionLink";
import { ArchitecturalRule } from "@/components/motion/ArchitecturalRule";
import { RevealMask } from "@/components/motion/RevealMask";
import { ArchitecturalStickyReveal } from "@/components/aceternity/ArchitecturalStickyReveal";

export function ApproachSection() {
  return (
    <SectionShell id="approach" surface="canvas" spacing="spacious">
      <Container>
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <RevealMask className="max-w-2xl">
            <EditorialHeading
              index="06"
              eyebrow="Our Approach"
              size="section"
              title="Five measured phases. Zero ambiguity."
              description="Complex renovations reward calm preparation. Our process replaces contractor guesswork with transparent sequencing, clear documentation, and direct sibling-principal oversight."
            />
          </RevealMask>

          <RevealMask delay={0.1}>
            <ActionLink href="/process" variant="underline">
              Explore Full Methodology
            </ActionLink>
          </RevealMask>
        </div>

        <ArchitecturalRule className="my-12 lg:my-16" />

        <ArchitecturalStickyReveal stages={PROCESS_STAGES} />
      </Container>
    </SectionShell>
  );
}
