import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { getMediaAsset } from "@/content/media";
import { Container } from "@/components/layout/Container";
import { SectionShell } from "@/components/layout/SectionShell";
import { PageHero } from "@/components/sections/shared/PageHero";
import { EditorialHeading } from "@/components/ui/EditorialHeading";
import { ActionLink } from "@/components/ui/ActionLink";
import { ArchitecturalRule } from "@/components/motion/ArchitecturalRule";
import { EditorialParallaxGrid } from "@/components/aceternity/EditorialParallaxGrid";
import { FinalConversionSection } from "@/components/sections/home/FinalConversionSection";

export const metadata: Metadata = buildPageMetadata({
  title: "About Our Company",
  description:
    "BLACKSTEEL Construction & Remodeling is a family-owned, sibling-led construction practice delivering luxury remodeling, custom millwork, and architectural construction in Houston and Austin, Texas.",
  path: "/about",
});

const PRINCIPLES = [
  {
    index: "01",
    title: "Strength in Structure",
    body: "Beauty fails if what sits behind the drywall is compromised. We prioritize framing accuracy, waterproofing integrity, and sound mechanical engineering on every project.",
  },
  {
    index: "02",
    title: "Precision in Millwork & Stone",
    body: "Our standard lives in flush transitions, aligned reveals, bookmatched slabs, and joinery that reads cleanly across the room and up close.",
  },
  {
    index: "03",
    title: "Restraint & Clarity",
    body: "We favor timeless architectural proportion over passing trends, and plainspoken communication over contractor sales jargon.",
  },
  {
    index: "04",
    title: "Direct Sibling Leadership",
    body: "As a family-owned business operated by two siblings, our reputation is personal. Clients and design partners work directly with the people accountable for the outcome.",
  },
];

export default function AboutPage() {
  const heroMedia = getMediaAsset("hero-kitchen");
  const galleryItems = [
    {
      index: "A.01",
      media: getMediaAsset("residence-pavilion"),
      caption: "Structural steel stairs & concrete planes",
    },
    {
      index: "A.02",
      media: getMediaAsset("kitchen-island"),
      caption: "Rift-cut oak millwork & waterfall stone",
    },
    {
      index: "A.03",
      media: getMediaAsset("detail-hearth"),
      caption: "Architectural masonry & oak transitions",
    },
    {
      index: "A.04",
      media: getMediaAsset("interior-lounge"),
      caption: "Quiet proportions & black steel glazing",
    },
  ];

  return (
    <>
      <PageHero
        index="ABOUT"
        eyebrow="Our Company"
        title="Family-owned craft, built for modern Texas architecture."
        description="Operated by two siblings across Houston and Austin, BLACKSTEEL Construction & Remodeling exists for clients who refuse to separate design ambition from construction discipline."
        media={heroMedia}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      />

      <SectionShell surface="canvas" spacing="spacious">
        <Container>
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">
            <div className="space-y-6 lg:col-span-6">
              <EditorialHeading
                eyebrow="Who We Are"
                size="section"
                title="Built on sibling accountability and respect for architecture."
              />
            </div>
            <div className="space-y-6 text-base leading-[1.78] text-[#34383C] dark:text-[#D8D5CF] lg:col-span-6">
              <p>
                BLACKSTEEL Construction &amp; Remodeling was founded on a
                straightforward belief: luxury residential remodeling and custom
                construction deserve the clarity, restraint, and execution
                standards of an architectural studio.
              </p>
              <p>
                Led directly by two siblings serving Greater Houston and Austin,
                we take on a deliberate number of commissions so that every
                whole-home remodel, kitchen, bath, structural addition, or
                reconstruction receives focused oversight from pre-construction
                through final handover.
              </p>
              <p>
                Whether working directly with homeowners and real estate
                investors or collaborating alongside architects and interior
                designers, we protect the intent of every drawing while
                navigating the realities of site engineering, trade sequencing,
                and material lead times.
              </p>
            </div>
          </div>
        </Container>
      </SectionShell>

      <SectionShell surface="elevated" spacing="default">
        <Container>
          <EditorialHeading
            eyebrow="Studio Ethos"
            size="section"
            title="Four convictions that guide every site."
          />
          <ArchitecturalRule className="my-10" />
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {PRINCIPLES.map((item) => (
              <div
                key={item.index}
                className="space-y-3 border-t border-[#17191B]/14 pt-6 dark:border-[#A7A6A3]/22"
              >
                <span className="font-mono text-xs tabular-nums text-[#5C5B58] dark:text-[#A7A6A3]">
                  [{item.index}]
                </span>
                <h2 className="font-display text-xl font-semibold tracking-[-0.02em]">{item.title}</h2>
                <p className="text-sm leading-[1.72] text-[#34383C] dark:text-[#D8D5CF]">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </SectionShell>

      {/* Leadership Placeholder Section — Explicitly Marked for Owner Confirmation */}
      <SectionShell surface="canvas" spacing="default">
        <Container>
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <EditorialHeading
              eyebrow="Leadership"
              size="section"
              title="Two siblings. Direct principal oversight."
            />
            <span className="eyebrow-label border border-[#17191B]/18 px-3 py-1.5 text-[#5C5B58] dark:border-[#A7A6A3]/25 dark:text-[#A7A6A3]">
              Owner Confirmation Required
            </span>
          </div>

          <ArchitecturalRule className="my-10" />

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="glass-surface space-y-4 p-8">
              <p className="eyebrow-label text-[#5C5B58] dark:text-[#A7A6A3]">
                Co-Founder &amp; Principal · [Name Pending Confirmation]
              </p>
              <h3 className="font-display text-2xl font-semibold tracking-[-0.025em]">
                Construction Operations &amp; Field Execution
              </h3>
              <p className="text-sm leading-[1.72] text-[#34383C] dark:text-[#D8D5CF]">
                Reserved for verified sibling founder biography, leadership
                responsibilities, and background once confirmed by BLACKSTEEL
                ownership. No credentials, dates, or claims are invented here.
              </p>
            </div>

            <div className="glass-surface space-y-4 p-8">
              <p className="eyebrow-label text-[#5C5B58] dark:text-[#A7A6A3]">
                Co-Founder &amp; Principal · [Name Pending Confirmation]
              </p>
              <h3 className="font-display text-2xl font-semibold tracking-[-0.025em]">
                Pre-Construction, Client Experience &amp; Design Coordination
              </h3>
              <p className="text-sm leading-[1.72] text-[#34383C] dark:text-[#D8D5CF]">
                Reserved for verified sibling founder biography, design partner
                collaboration approach, and market leadership across Houston and
                Austin.
              </p>
            </div>
          </div>
        </Container>
      </SectionShell>

      {/* Architectural Visual Study Grid (Adapted Aceternity Parallax Scroll) */}
      <SectionShell surface="contrast" spacing="spacious">
        <Container>
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <EditorialHeading
              eyebrow="Visual Sensibility"
              size="section"
              tone="contrast"
              title="The textures, geometries, and spatial discipline we build toward."
            />
            <ActionLink href="/projects" variant="contrast-underline">
              Explore Selected Work
            </ActionLink>
          </div>
          <ArchitecturalRule tone="contrast" className="my-12" />
          <EditorialParallaxGrid items={galleryItems} />
        </Container>
      </SectionShell>

      <FinalConversionSection />
    </>
  );
}
