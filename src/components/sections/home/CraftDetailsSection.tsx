import Image from "next/image";
import { getMediaAsset } from "@/content/media";
import { Container } from "@/components/layout/Container";
import { SectionShell } from "@/components/layout/SectionShell";
import { EditorialHeading } from "@/components/ui/EditorialHeading";
import { ArchitecturalRule } from "@/components/motion/ArchitecturalRule";
import { RevealMask } from "@/components/motion/RevealMask";
import { ArchitecturalCompare } from "@/components/aceternity/ArchitecturalCompare";

const CRAFT_CHAPTERS = [
  {
    index: "05.1",
    title: "Custom Millwork & Joinery",
    description:
      "Full-height rift-cut oak paneling, shadow-gap reveals, and furniture-grade cabinetry aligned to laser-leveled planes.",
    imageId: "kitchen-island",
  },
  {
    index: "05.2",
    title: "Material Selection & Stonework",
    description:
      "Honed limestone, veined quartzite slabs, and wide-plank timber selected in person and bookmatched prior to fabrication.",
    imageId: "detail-hearth",
  },
  {
    index: "05.3",
    title: "Architectural Detailing & Coordination",
    description:
      "Steel glazing mullions, flush linear air returns, and recessed lighting pockets coordinated before drywall ever closes.",
    imageId: "detail-material",
  },
];

export function CraftDetailsSection() {
  const compareBefore = getMediaAsset("living-fireplace");
  const compareAfter = getMediaAsset("residence-facade");

  return (
    <SectionShell id="craft-details" surface="contrast" spacing="spacious">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
          <RevealMask className="lg:col-span-7">
            <EditorialHeading
              index="05"
              eyebrow="The Details Matter"
              size="statement"
              tone="contrast"
              title="Craftsmanship lives in the millimeter where two materials meet."
            />
          </RevealMask>

          <RevealMask delay={0.1} className="lg:col-span-5">
            <p className="max-w-[48ch] text-base leading-[1.72] text-[#D8D5CF] dark:text-[#34383C]">
              True architectural quality is quiet. It shows in a flush stone
              transition, a door that closes with reassuring weight, and
              concealed mechanical coordination that lets proportion and natural
              light carry the room.
            </p>
          </RevealMask>
        </div>

        <ArchitecturalRule tone="contrast" className="my-12 lg:my-16" />

        {/* Editorial Triptych */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-10">
          {CRAFT_CHAPTERS.map((chapter, index) => {
            const media = getMediaAsset(chapter.imageId);
            return (
              <RevealMask
                key={chapter.index}
                delay={index * 0.08}
                className={index === 1 ? "md:mt-10" : ""}
              >
                <article className="space-y-5">
                  <div className="relative aspect-[4/3] w-full overflow-hidden border border-[#A7A6A3]/25 bg-[#17191B] dark:border-[#17191B]/14">
                    <Image
                      src={media.src}
                      alt={media.alt}
                      fill
                      sizes="(min-width: 768px) 30vw, 100vw"
                      className="object-cover"
                    />
                    <span className="absolute left-3.5 top-3.5 glass-photo px-2.5 py-1 text-[10px] font-medium tabular-nums uppercase tracking-[0.2em]">
                      {chapter.index}
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    <h3 className="font-serif text-2xl tracking-[-0.015em] text-[#F2F0EC] dark:text-[#17191B]">
                      {chapter.title}
                    </h3>
                    <p className="text-sm leading-[1.7] text-[#D8D5CF] dark:text-[#34383C]">
                      {chapter.description}
                    </p>
                  </div>
                </article>
              </RevealMask>
            );
          })}
        </div>

        {/* Interactive Spatial Comparison Study */}
        <div className="mt-16 grid grid-cols-1 items-center gap-10 border-t border-[#A7A6A3]/25 pt-14 dark:border-[#17191B]/15 lg:mt-20 lg:grid-cols-12 lg:gap-14">
          <RevealMask className="space-y-5 lg:col-span-4">
            <span className="eyebrow-label text-[#A7A6A3] dark:text-[#5C5B58]">
              Interactive Study · Drag or Use Arrow Keys
            </span>
            <h3 className="font-serif text-3xl leading-[1.1] text-[#F2F0EC] dark:text-[#17191B] sm:text-4xl">
              From structural shell to finished architecture.
            </h3>
            <p className="text-sm leading-[1.72] text-[#D8D5CF] dark:text-[#34383C]">
              Every finished interior relies on the precision of what happens
              beneath and before it—plumb framing, stone layout, and integrated
              millwork engineering.
            </p>
            <p className="border-l border-[#A7A6A3]/35 pl-3.5 text-xs leading-[1.6] text-[#A7A6A3] dark:border-[#17191B]/25 dark:text-[#5C5B58]">
              Illustrative spatial comparison pairing demonstration architectural
              photography. Real BLACKSTEEL before-and-after documentation will
              populate here once commissioned.
            </p>
          </RevealMask>

          <RevealMask delay={0.12} className="lg:col-span-8">
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
