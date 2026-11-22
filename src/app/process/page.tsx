import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { PROCESS_STAGES } from "@/content/process";
import { getMediaAsset } from "@/content/media";
import { Container } from "@/components/layout/Container";
import { SectionShell } from "@/components/layout/SectionShell";
import { PageHero } from "@/components/sections/shared/PageHero";
import { EditorialHeading } from "@/components/ui/EditorialHeading";
import { ArchitecturalRule } from "@/components/motion/ArchitecturalRule";
import { ArchitecturalStickyReveal } from "@/components/aceternity/ArchitecturalStickyReveal";
import { FinalConversionSection } from "@/components/sections/home/FinalConversionSection";

export const metadata: Metadata = buildPageMetadata({
  title: "Our Approach",
  description:
    "Discover BLACKSTEEL's five-phase architectural remodeling and construction process—from initial site walkthrough and pre-construction definition to disciplined execution and handover.",
  path: "/process",
});

const COLLABORATION_STANDARDS = [
  {
    title: "Weekly Principal Reporting",
    detail:
      "Concise milestone summaries, look-ahead schedules, and open client decision lists delivered consistently—never leaving you guessing what happens next on site.",
  },
  {
    title: "Architect & Designer Fluency",
    detail:
      "We read architectural drawings closely, raise constructability questions early, and honor every elevation reveal and material specification.",
  },
  {
    title: "Clean, Protected Job Sites",
    detail:
      "Dust containment, floor protection, organized material staging, and respectful neighborhood access are non-negotiable standards on every project.",
  },
];

export default function ProcessPage() {
  const heroMedia = getMediaAsset("detail-hearth");

  return (
    <>
      <PageHero
        index="APPROACH"
        eyebrow="Methodology"
        title="Clarity before demolition. Precision until handover."
        description="Great construction feels calm because the hard decisions happen early—in pre-construction feasibility, millwork detailing, and disciplined field coordination."
        media={heroMedia}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Approach" }]}
      />

      <SectionShell surface="canvas" spacing="spacious">
        <Container>
          <EditorialHeading
            index="01–05"
            eyebrow="Five Measured Phases"
            size="section"
            title="How every BLACKSTEEL project moves from vision to permanence."
          />
          <ArchitecturalRule className="my-12" />
          <ArchitecturalStickyReveal stages={PROCESS_STAGES} />
        </Container>
      </SectionShell>

      <SectionShell surface="elevated" spacing="default">
        <Container>
          <EditorialHeading
            eyebrow="Client Experience"
            size="section"
            title="What working with our studio feels like week to week."
          />
          <ArchitecturalRule className="my-10" />
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {COLLABORATION_STANDARDS.map((item, idx) => (
              <div
                key={item.title}
                className="glass-surface space-y-3 p-7"
              >
                <span className="font-serif text-2xl tabular-nums text-[#5C5B58] dark:text-[#A7A6A3]">
                  0{idx + 1}
                </span>
                <h2 className="font-serif text-2xl">{item.title}</h2>
                <p className="text-sm leading-[1.72] text-[#34383C] dark:text-[#D8D5CF]">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </SectionShell>

      <FinalConversionSection />
    </>
  );
}
