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
    code: "02.1",
    title: "Sibling-Led Accountability",
    detail:
      "Operated by two siblings who remain directly responsible from structural feasibility through final millwork sign-off.",
  },
  {
    code: "02.2",
    title: "Architect & Designer Fluency",
    detail:
      "We read drawings at millimeter scale, protecting geometric shadow reveals, flush transitions, and material integrity.",
  },
  {
    code: "02.3",
    title: "Houston & Austin Engineering",
    detail:
      "Execution calibrated for Gulf Coast humidity and soils as well as Hill Country topography and limestone sites.",
  },
];

export function BrandIntroSection() {
  const studioMedia = getMediaAsset("bath-minimal");

  return (
    <SectionShell
      id="studio-introduction"
      surface="contrast"
      spacing="spacious"
      className="bg-arch-grid"
    >
      <Container>
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col justify-between space-y-10 lg:col-span-7">
            <RevealMask>
              <EditorialHeading
                index="02"
                eyebrow="The Practice"
                size="statement"
                tone="contrast"
                title="Structural rigor meets residential restraint."
              />
            </RevealMask>

            <ArchitecturalRule tone="contrast" delay={0.08} />

            <RevealMask delay={0.12} className="space-y-5">
              <p className="max-w-[58ch] text-base leading-[1.75] text-[#34383C] sm:text-[17px]">
                BLACKSTEEL Construction &amp; Remodeling partners with
                discerning homeowners, architects, interior designers, and
                property owners across Houston and Austin. Every renovation is
                approached as a structural composition—uniting concealed steel
                and mechanical engineering with bespoke cabinetry and natural
                stone.
              </p>

              <p className="max-w-[58ch] text-base leading-[1.75] text-[#34383C] sm:text-[17px]">
                We are neither a volume builder nor a generic remodeling crew.
                We accept a focused roster of commissions so principal oversight
                never gets delegated away.
              </p>
            </RevealMask>

            <RevealMask delay={0.18}>
              <dl className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                {PILLAR_VALUES.map((item) => (
                  <div
                    key={item.code}
                    className="arch-crosshair border border-[#17191B]/14 bg-[#F2F0EC]/75 p-5 dark:border-[#17191B]/16 dark:bg-[#E8E5DF]/90"
                  >
                    <dt className="space-y-2">
                      <span className="block font-mono text-[10px] tracking-[0.2em] text-[#5C5B58]">
                        [{item.code}]
                      </span>
                      <span className="block font-display text-base font-semibold tracking-[-0.02em] text-[#17191B]">
                        {item.title}
                      </span>
                    </dt>
                    <dd className="mt-2.5 text-xs leading-[1.68] text-[#34383C]">
                      {item.detail}
                    </dd>
                  </div>
                ))}
              </dl>
            </RevealMask>

            <RevealMask delay={0.22} className="pt-2">
              <ActionLink href="/about" variant="contrast-underline">
                About Our Practice
              </ActionLink>
            </RevealMask>
          </div>

          <RevealMask delay={0.14} className="lg:col-span-5">
            <figure className="arch-crosshair relative h-full min-h-[460px] w-full overflow-hidden border border-[#17191B]/14 bg-[#34383C] dark:border-[#17191B]/16 lg:min-h-[640px]">
              <Image
                src={studioMedia.src}
                alt={studioMedia.alt}
                fill
                sizes="(min-width: 1024px) 38vw, 100vw"
                className="object-cover"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#17191B]/88 via-[#17191B]/30 to-transparent"
              />

              <figcaption className="absolute inset-x-5 bottom-5 glass-steel p-5">
                <div className="flex items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.2em]">
                  <span className="text-[#A7A6A3]">Material Study · 02.A</span>
                  <span className="text-[#F2F0EC]/80">Demo Visual</span>
                </div>
                <p className="mt-2 font-display text-lg font-semibold tracking-[-0.02em] text-[#F2F0EC]">
                  Honed limestone planes, frameless glazing, and flush white-oak
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
