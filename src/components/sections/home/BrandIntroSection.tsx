import Image from "next/image";
import { getMediaAsset } from "@/content/media";
import { Container } from "@/components/layout/Container";
import { SectionShell } from "@/components/layout/SectionShell";
import { EditorialHeading } from "@/components/ui/EditorialHeading";
import { ActionLink } from "@/components/ui/ActionLink";
import { ArchitecturalRule } from "@/components/motion/ArchitecturalRule";
import { RevealMask } from "@/components/motion/RevealMask";

const PILLAR_VALUES = [
  {
    code: "I",
    title: "Family-Owned Accountability",
    detail:
      "Operated by two siblings who remain directly involved from pre-construction planning to final walkthrough.",
  },
  {
    code: "II",
    title: "Design-Conscious Execution",
    detail:
      "We collaborate seamlessly with homeowners, architects, and interior designers to protect material and geometric intent.",
  },
  {
    code: "III",
    title: "Two Texas Markets, One Standard",
    detail:
      "Disciplined residential remodeling and complex construction tailored to Houston and Austin homes.",
  },
];

export function BrandIntroSection() {
  const studioMedia = getMediaAsset("bath-minimal");

  return (
    <SectionShell id="studio-introduction" surface="contrast" spacing="spacious">
      <Container>
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col justify-between space-y-10 lg:col-span-7">
            <RevealMask>
              <EditorialHeading
                index="02"
                eyebrow="The Practice"
                size="statement"
                tone="contrast"
                title={
                  <>
                    A sibling-led construction practice built for spaces that
                    demand precision, permanence, and quiet restraint.
                  </>
                }
              />
            </RevealMask>

            <ArchitecturalRule tone="contrast" delay={0.1} />

            <RevealMask delay={0.14} className="space-y-6">
              <p className="max-w-[58ch] text-base leading-[1.75] text-[#D8D5CF] dark:text-[#34383C] sm:text-[17px]">
                BLACKSTEEL Construction &amp; Remodeling partners with discerning
                homeowners, architects, designers, and property owners across
                Houston and Austin. We approach every renovation as an
                architectural undertaking—aligning concealed structural
                engineering with bespoke cabinetry, natural stone, and exacting
                finish tolerances.
              </p>

              <p className="max-w-[58ch] text-base leading-[1.75] text-[#D8D5CF] dark:text-[#34383C] sm:text-[17px]">
                We are not a production builder or a volume contractor. Each
                commission receives focused principal oversight, transparent
                sequencing, and craft meant to outlast trends.
              </p>
            </RevealMask>

            <RevealMask delay={0.2}>
              <dl className="grid grid-cols-1 gap-8 border-t border-[#A7A6A3]/25 pt-8 dark:border-[#17191B]/15 sm:grid-cols-3">
                {PILLAR_VALUES.map((item) => (
                  <div key={item.code} className="space-y-2.5">
                    <dt className="flex items-center gap-2.5">
                      <span className="font-serif text-lg italic text-[#A7A6A3] dark:text-[#5C5B58]">
                        {item.code}.
                      </span>
                      <span className="text-xs font-medium uppercase tracking-[0.14em] text-[#F2F0EC] dark:text-[#17191B]">
                        {item.title}
                      </span>
                    </dt>
                    <dd className="text-sm leading-[1.65] text-[#D8D5CF]/90 dark:text-[#34383C]">
                      {item.detail}
                    </dd>
                  </div>
                ))}
              </dl>
            </RevealMask>

            <RevealMask delay={0.25} className="pt-2">
              <ActionLink href="/about" variant="contrast-underline">
                About Our Company
              </ActionLink>
            </RevealMask>
          </div>

          <RevealMask delay={0.18} className="lg:col-span-5">
            <figure className="relative h-full min-h-[460px] w-full overflow-hidden border border-[#A7A6A3]/25 bg-[#34383C] dark:border-[#17191B]/14 lg:min-h-[640px]">
              <Image
                src={studioMedia.src}
                alt={studioMedia.alt}
                fill
                sizes="(min-width: 1024px) 38vw, 100vw"
                className="object-cover"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#17191B]/80 via-[#17191B]/25 to-transparent"
              />

              <figcaption className="absolute inset-x-5 bottom-5 glass-photo p-4 sm:p-5">
                <div className="flex items-center justify-between gap-4">
                  <span className="eyebrow-label text-[#A7A6A3]">
                    Material Study · 02.A
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.18em] text-[#F2F0EC]/80">
                    Demonstration Visual
                  </span>
                </div>
                <p className="mt-2 font-serif text-xl text-[#F2F0EC]">
                  Honed limestone, frameless glazing &amp; custom white-oak
                  joinery.
                </p>
              </figcaption>
            </figure>
          </RevealMask>
        </div>
      </Container>
    </SectionShell>
  );
}
