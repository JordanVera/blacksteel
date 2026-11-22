import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { LOCATION_MARKETS } from "@/content/locations";
import { getMediaAsset } from "@/content/media";
import { Container } from "@/components/layout/Container";
import { SectionShell } from "@/components/layout/SectionShell";
import { EditorialHeading } from "@/components/ui/EditorialHeading";
import { ArchitecturalRule } from "@/components/motion/ArchitecturalRule";
import { RevealMask } from "@/components/motion/RevealMask";

export function RegionalMarketsSection() {
  const markets = [LOCATION_MARKETS.houston, LOCATION_MARKETS.austin];

  return (
    <SectionShell id="markets" surface="elevated" spacing="spacious">
      <Container>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
          <RevealMask className="lg:col-span-7">
            <EditorialHeading
              index="07"
              eyebrow="Regional Presence"
              size="section"
              title="Two distinct Texas markets. One uncompromising build standard."
            />
          </RevealMask>
          <RevealMask delay={0.1} className="lg:col-span-5">
            <p className="max-w-[48ch] text-base leading-[1.7] text-[#34383C] dark:text-[#D8D5CF]">
              Building in Houston and Austin requires fluency in dramatically
              different soil profiles, humidity dynamics, architectural
              traditions, and municipal review processes.
            </p>
          </RevealMask>
        </div>

        <ArchitecturalRule className="my-12 lg:my-16" />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
          {markets.map((market, index) => {
            const media = getMediaAsset(market.imageId);
            return (
              <RevealMask key={market.slug} delay={index * 0.1}>
                <article className="group h-full">
                  <Link
                    href={`/locations/${market.slug}`}
                    className="relative flex min-h-[480px] flex-col justify-between overflow-hidden border border-[#17191B]/14 bg-[#17191B] p-6 transition-all duration-500 sm:min-h-[540px] sm:p-8 dark:border-[#A7A6A3]/22"
                  >
                    <Image
                      src={media.src}
                      alt={media.alt}
                      fill
                      sizes="(min-width: 1024px) 48vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#17191B]/90 via-[#17191B]/35 to-[#17191B]/50"
                    />

                    {/* Top Regional Coordinates */}
                    <div className="relative z-10 flex items-center justify-between gap-4">
                      <span className="glass-photo px-3 py-1.5 text-[10px] font-medium tabular-nums uppercase tracking-[0.2em]">
                        {market.coordinatesLabel}
                      </span>
                      <span className="glass-photo px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-[#F2F0EC]/85">
                        {market.regionLabel}
                      </span>
                    </div>

                    {/* Bottom Smoked-Glass Regional Brief */}
                    <div className="relative z-10 glass-obsidian p-6 text-[#F2F0EC] sm:p-7">
                      <div className="flex items-end justify-between gap-4">
                        <div>
                          <p className="eyebrow-label text-[#A7A6A3]">
                            {market.state}
                          </p>
                          <h3 className="mt-1 font-serif text-4xl tracking-[-0.02em] text-[#F2F0EC] sm:text-5xl">
                            {market.city}
                          </h3>
                        </div>

                        <span
                          aria-hidden="true"
                          className="inline-flex h-11 w-11 shrink-0 items-center justify-center border border-[#F2F0EC]/30 text-[#F2F0EC] transition-all duration-300 group-hover:border-[#F2F0EC] group-hover:bg-[#F2F0EC] group-hover:text-[#17191B]"
                        >
                          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </span>
                      </div>

                      <p className="mt-4 max-w-[46ch] text-sm leading-[1.68] text-[#D8D5CF]">
                        {market.subheadline}
                      </p>

                      <div className="mt-5 flex flex-wrap gap-x-3 gap-y-1.5 border-t border-[#A7A6A3]/22 pt-4 text-[11px] uppercase tracking-[0.15em] text-[#A7A6A3]">
                        {market.serviceAreas.slice(0, 5).map((area) => (
                          <span key={area}>{area}</span>
                        ))}
                      </div>
                    </div>
                  </Link>
                </article>
              </RevealMask>
            );
          })}
        </div>
      </Container>
    </SectionShell>
  );
}
