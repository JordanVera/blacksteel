"use client";

import { useState } from "react";
import Image from "next/image";
import { getMediaAsset } from "@/content/media";
import { Container } from "@/components/layout/Container";
import { SectionShell } from "@/components/layout/SectionShell";
import { EditorialHeading } from "@/components/ui/EditorialHeading";
import { ArchitecturalRule } from "@/components/motion/ArchitecturalRule";
import { RevealMask } from "@/components/motion/RevealMask";
import { ArchitecturalLens } from "@/components/aceternity/ArchitecturalLens";
import {
  DraggableMaterialDeck,
  type MaterialBoardItem,
} from "@/components/aceternity/DraggableMaterialDeck";
import { ArchitecturalCompare } from "@/components/aceternity/ArchitecturalCompare";
import { cn } from "@/lib/utils";

const LENS_STUDIES = [
  {
    index: "05.1",
    tabLabel: "Millwork",
    title: "Custom Millwork & Shadow Reveals",
    tolerance: "±0.8 MM PLANE ALIGNMENT",
    description:
      "Full-height rift-cut white oak paneling, flush shadow gaps, and furniture-grade cabinetry laser-leveled prior to stone templating.",
    imageId: "kitchen-island",
  },
  {
    index: "05.2",
    tabLabel: "Stonework",
    title: "Bookmatched Limestone & Quartzite",
    tolerance: "MITERED 45° WATERFALL EDGES",
    description:
      "Slab selection in person, honed matte finishes, and concealed steel sub-framing engineered to eliminate stone deflection.",
    imageId: "detail-hearth",
  },
  {
    index: "05.3",
    tabLabel: "Steel & Glazing",
    title: "Blackened Steel & Mechanical Integration",
    tolerance: "FLUSH LINEAR DIFFUSERS",
    description:
      "Thermally broken steel glazing mullions, recessed lighting channels, and concealed HVAC returns coordinated before framing closes.",
    imageId: "detail-material",
  },
];

export function CraftDetailsSection() {
  const [activeLensIndex, setActiveLensIndex] = useState(0);
  const activeLens = LENS_STUDIES[activeLensIndex] ?? LENS_STUDIES[0]!;
  const activeLensMedia = getMediaAsset(activeLens.imageId);

  const compareBefore = getMediaAsset("living-fireplace");
  const compareAfter = getMediaAsset("residence-facade");

  const materialBoards: MaterialBoardItem[] = [
    {
      id: "blackened-steel",
      code: "MAT-01",
      name: "Blackened Hot-Rolled Steel",
      finish: "Hand-Waxed Patina · Structural & Glazing",
      tolerance: "3.2 MM PLATE",
      note: "Fabricated for custom hearth surrounds, stair stringers, and slender interior glazing partitions.",
      imageSrc: getMediaAsset("exterior-charcoal").src,
      imageAlt: getMediaAsset("exterior-charcoal").alt,
      defaultRotate: -2.2,
    },
    {
      id: "honed-limestone",
      code: "MAT-02",
      name: "Honed Architectural Limestone",
      finish: "Matte Honed · Low-Sheen Natural Stone",
      tolerance: "BOOKMATCHED",
      note: "Selected in slab format for quiet tonal continuity across primary baths, monolith islands, and hearths.",
      imageSrc: getMediaAsset("bath-minimal").src,
      imageAlt: getMediaAsset("bath-minimal").alt,
      defaultRotate: 2.5,
    },
    {
      id: "rift-oak",
      code: "MAT-03",
      name: "Rift-Cut White Oak",
      finish: "Wire-Brushed Matte · Vertical Grain",
      tolerance: "±0.8 MM GAP",
      note: "Quarter- and rift-sawn architectural millwork finished with ultra-matte European oil to resist yellowing.",
      imageSrc: getMediaAsset("kitchen-modern").src,
      imageAlt: getMediaAsset("kitchen-modern").alt,
      defaultRotate: -1.8,
    },
    {
      id: "smoked-glass",
      code: "MAT-04",
      name: "Smoked Architectural Glass",
      finish: "Low-Iron Tempered · Acoustic Partition",
      tolerance: "12 MM LAMINATED",
      note: "Used in steel-framed wine enclosures, study partitions, and spa-grade shower planes with recessed channels.",
      imageSrc: getMediaAsset("detail-glass").src,
      imageAlt: getMediaAsset("detail-glass").alt,
      defaultRotate: 1.9,
    },
  ];

  return (
    <SectionShell
      id="craft-details"
      surface="contrast"
      spacing="spacious"
      className="bg-arch-grid"
    >
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
          <RevealMask className="lg:col-span-7">
            <EditorialHeading
              index="05"
              eyebrow="Craft Laboratory"
              size="statement"
              tone="contrast"
              title="Inspect the millimeter where two materials meet."
            />
          </RevealMask>

          <RevealMask delay={0.1} className="lg:col-span-5">
            <p className="max-w-[48ch] text-base leading-[1.72] text-[#34383C]">
              Move the optical loupe across our finish studies or drag through
              the architectural material board deck to explore the tactile
              palette defining BLACKSTEEL interiors.
            </p>
          </RevealMask>
        </div>

        <ArchitecturalRule tone="contrast" className="my-12 lg:my-16" />

        {/* Interactive Craft Lab: Optical Lens Magnifier + Draggable Material Stack */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-12">
          {/* Left 7 Cols: Aceternity Optical Lens Magnifier */}
          <div className="space-y-5 lg:col-span-7">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div
                role="tablist"
                aria-label="Architectural craft inspection subjects"
                className="flex flex-wrap gap-2"
              >
                {LENS_STUDIES.map((study, idx) => {
                  const isActive = idx === activeLensIndex;
                  return (
                    <button
                      key={study.index}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveLensIndex(idx)}
                      className={cn(
                        "border px-3.5 py-2 font-mono text-[10px] uppercase tracking-[0.18em] transition-colors cursor-pointer",
                        isActive
                          ? "border-[#17191B] bg-[#17191B] text-[#F2F0EC]"
                          : "border-[#17191B]/22 text-[#34383C] hover:border-[#17191B]"
                      )}
                    >
                      [{study.index}] {study.tabLabel}
                    </button>
                  );
                })}
              </div>

              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#5C5B58]">
                {activeLens.tolerance}
              </span>
            </div>

            <ArchitecturalLens
              label={`Optical Loupe · ${activeLens.index} · 2.0×`}
              className="aspect-[16/11] w-full"
            >
              <div className="relative h-full w-full">
                <Image
                  src={activeLensMedia.src}
                  alt={activeLensMedia.alt}
                  fill
                  sizes="(min-width: 1024px) 54vw, 100vw"
                  className="object-cover"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#17191B]/85 to-transparent" />
              </div>
            </ArchitecturalLens>

            <div className="flex flex-col justify-between gap-3 border-t border-[#17191B]/14 pt-4 sm:flex-row sm:items-start">
              <div>
                <h3 className="font-display text-xl font-semibold tracking-[-0.02em] text-[#17191B]">
                  {activeLens.title}
                </h3>
                <p className="mt-1.5 max-w-[54ch] text-sm leading-[1.68] text-[#34383C]">
                  {activeLens.description}
                </p>
              </div>
              <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.18em] text-[#5C5B58]">
                Hover Image to Magnify
              </span>
            </div>
          </div>

          {/* Right 5 Cols: Aceternity Draggable Material Sample Deck */}
          <div className="lg:col-span-5">
            <DraggableMaterialDeck items={materialBoards} />
          </div>
        </div>

        {/* Interactive Spatial Comparison Study */}
        <div className="mt-16 grid grid-cols-1 items-center gap-10 border-t border-[#17191B]/14 pt-14 lg:mt-20 lg:grid-cols-12 lg:gap-14">
          <RevealMask className="space-y-5 lg:col-span-4">
            <span className="eyebrow-label text-[#5C5B58]">
              Interactive Compare · Drag or Arrow Keys
            </span>
            <h3 className="font-display text-3xl font-semibold leading-[1.06] tracking-[-0.03em] text-[#17191B] sm:text-4xl">
              From structural shell to finished architecture.
            </h3>
            <p className="text-sm leading-[1.72] text-[#34383C]">
              Every finished interior relies on the discipline of what happens
              beneath and before it—plumb framing, concealed steel spans, stone
              layout, and integrated millwork engineering.
            </p>
          </RevealMask>

          <RevealMask delay={0.1} className="lg:col-span-8">
            <ArchitecturalCompare
              beforeSrc={compareBefore.src}
              beforeAlt={compareBefore.alt}
              beforeLabel="Architectural Volume"
              afterSrc={compareAfter.src}
              afterAlt={compareAfter.alt}
              afterLabel="Integrated Living Interior"
            />
          </RevealMask>
        </div>
      </Container>
    </SectionShell>
  );
}
