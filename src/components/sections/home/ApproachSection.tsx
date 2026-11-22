import { PROCESS_STAGES } from "@/content/process";
import { Container } from "@/components/layout/Container";
import { SectionShell } from "@/components/layout/SectionShell";
import { EditorialHeading } from "@/components/ui/EditorialHeading";
import { ActionLink } from "@/components/ui/ActionLink";
import { ArchitecturalRule } from "@/components/motion/ArchitecturalRule";
import { RevealMask } from "@/components/motion/RevealMask";
import { SteelTimeline } from "@/components/aceternity/SteelTimeline";

export function ApproachSection() {
  return (
    <SectionShell
      id="approach"
      surface="canvas"
      spacing="spacious"
      className="bg-arch-dots"
    >
      <Container>
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <RevealMask className="max-w-2xl">
            <EditorialHeading
              index="06"
              eyebrow="Execution Methodology"
              size="section"
              title="Five measured phases. Zero ambiguity."
              description="Complex renovations reward calm engineering. Follow the structural timeline below to see how we replace contractor guesswork with clear sequencing and direct principal oversight."
            />
          </RevealMask>

          <RevealMask delay={0.1}>
            <ActionLink href="/process" variant="underline">
              Explore Full Methodology
            </ActionLink>
          </RevealMask>
        </div>

        <ArchitecturalRule className="my-12 lg:my-16" />

        <SteelTimeline stages={PROCESS_STAGES} />
      </Container>
    </SectionShell>
  );
}
