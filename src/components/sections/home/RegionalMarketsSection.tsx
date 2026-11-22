"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { LOCATION_MARKETS } from "@/content/locations";
import { getMediaAsset } from "@/content/media";
import { Container } from "@/components/layout/Container";
import { SectionShell } from "@/components/layout/SectionShell";
import { EditorialHeading } from "@/components/ui/EditorialHeading";
import { ArchitecturalRule } from "@/components/motion/ArchitecturalRule";
import { RevealMask } from "@/components/motion/RevealMask";
import { BentoCardSpotlight } from "@/components/aceternity/BentoCardSpotlight";

export function RegionalMarketsSection() {
  const markets = [LOCATION_MARKETS.houston, LOCATION_MARKETS.austin];
  const prefersReducedMotion = useReducedMotion();

  return (
    <SectionShell
      id="markets"
      surface="elevated"
      spacing="spacious"
      className="bg-arch-grid"
    >
      <Container>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
          <RevealMask className="lg:col-span-7">
            <EditorialHeading
              index="07"
              eyebrow="Texas Corridor"
              size="section"
              title="Two distinct Texas markets. One uncompromising build standard."
            />
          </RevealMask>
          <RevealMask delay={0.1} className="lg:col-span-5">
            <p className="max-w-[48ch] text-base leading-[1.7] text-[#34383C] dark:text-[#D8D5CF]">
              Building in Houston and Austin requires fluency in contrasting
              soil mechanics, Gulf Coast humidity envelopes, limestone Hill
              Country terrain, and local architectural review boards.
            </p>
          </RevealMask>
        </div>

        <ArchitecturalRule className="my-10 lg:my-12" />

        {/* Animated Houston ↔ Austin Architectural Steel Beam Corridor */}
        <div className="mb-10 glass-surface px-5 py-4 sm:px-7">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
            <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em]">
              <span className="h-2 w-2 bg-[#17191B] dark:bg-[#F2F0EC]" />
              <span className="font-medium text-[#17191B] dark:text-[#F2F0EC]">
                HOU · 29.7604° N
              </span>
            </div>

            <div className="relative h-px w-full flex-1 overflow-hidden bg-[#17191B]/18 dark:bg-[#A7A6A3]/25 sm:mx-6">
              <motion.span
                aria-hidden="true"
                animate={
                  prefersReducedMotion
                    ? { x: "35%" }
                    : { x: ["-25%", "115%"] }
                }
                transition={{
                  duration: 3.4,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-[#17191B] to-transparent dark:via-[#F2F0EC]"
              />
            </div>

            <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.2em] text-[#5C5B58] dark:text-[#A7A6A3]">
              165 MI · DUAL-MARKET PRINCIPAL OVERSIGHT
            </span>

            <div className="relative hidden h-px flex-1 overflow-hidden bg-[#17191B]/18 dark:bg-[#A7A6A3]/25 sm:mx-6 sm:block">
              <motion.span
                aria-hidden="true"
                animate={
                  prefersReducedMotion
                    ? { x: "35%" }
                    : { x: ["115%", "-25%"] }
                }
                transition={{
                  duration: 3.4,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-[#17191B] to-transparent dark:via-[#F2F0EC]"
              />
            </div>

            <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em]">
              <span className="font-medium text-[#17191B] dark:text-[#F2F0EC]">
                AUS · 30.2672° N
              </span>
              <span className="h-2 w-2 bg-[#17191B] dark:bg-[#F2F0EC]" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
          {markets.map((market, index) => {
            const media = getMediaAsset(market.imageId);
            return (
              <RevealMask key={market.slug} delay={index * 0.1}>
                <BentoCardSpotlight surface="dark" className="h-full">
                  <Link
                    href={`/locations/${market.slug}`}
                    className="group relative flex min-h-[480px] flex-col justify-between overflow-hidden p-6 sm:min-h-[540px] sm:p-8"
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
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#17191B]/92 via-[#17191B]/42 to-[#17191B]/52"
                    />

                    {/* Top Regional Coordinates */}
                    <div className="relative z-10 flex items-center justify-between gap-4">
                      <span className="glass-photo px-3 py-1.5 font-mono text-[10px] font-medium tabular-nums uppercase tracking-[0.2em]">
                        {market.coordinatesLabel}
                      </span>
                      <span className="glass-photo px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[#F2F0EC]/85">
                        {market.regionLabel}
                      </span>
                    </div>

                    {/* Bottom Smoked-Steel Regional Brief */}
                    <div className="relative z-10 glass-steel p-6 text-[#F2F0EC] sm:p-7">
                      <div className="flex items-end justify-between gap-4">
                        <div>
                          <p className="eyebrow-label text-[#A7A6A3]">
                            {market.state}
                          </p>
                          <h3 className="mt-1 font-display text-4xl font-semibold tracking-[-0.03em] text-[#F2F0EC] sm:text-5xl">
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

                      <div className="mt-5 flex flex-wrap gap-x-3 gap-y-1.5 border-t border-[#A7A6A3]/22 pt-4 font-mono text-[10px] uppercase tracking-[0.15em] text-[#A7A6A3]">
                        {market.serviceAreas.slice(0, 5).map((area) => (
                          <span key={area}>{area}</span>
                        ))}
                      </div>
                    </div>
                  </Link>
                </BentoCardSpotlight>
              </RevealMask>
            );
          })}
        </div>
      </Container>
    </SectionShell>
  );
}
