"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ServiceItem } from "@/types/domain";
import { getMediaAsset } from "@/content/media";
import { Container } from "@/components/layout/Container";
import { SectionShell } from "@/components/layout/SectionShell";
import { EditorialHeading } from "@/components/ui/EditorialHeading";
import { ActionLink } from "@/components/ui/ActionLink";
import { ArchitecturalRule } from "@/components/motion/ArchitecturalRule";
import { BentoCardSpotlight } from "@/components/aceternity/BentoCardSpotlight";

interface ExpertiseSectionProps {
  pillars: ServiceItem[];
}

export function ExpertiseSection({ pillars }: ExpertiseSectionProps) {
  const [remodeling, customConstruction, contracting, restoration] = pillars;

  return (
    <SectionShell
      id="expertise"
      surface="elevated"
      spacing="spacious"
      className="bg-arch-grid"
    >
      <Container>
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <EditorialHeading
            index="04"
            eyebrow="Capabilities"
            size="section"
            title="Four architectural disciplines, anchored by custom remodeling."
            description="Move across each tile to inspect our discipline scope—spanning bespoke kitchens and baths, ground-up structural additions, disciplined general contracting, and complex restoration."
          />

          <ActionLink href="/services" variant="underline">
            Explore All Services
          </ActionLink>
        </div>

        <ArchitecturalRule className="my-12 lg:my-14" />

        {/* Asymmetric Aceternity Spotlight + Blueprint Dot-Matrix BentoGrid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-7">
          {/* Primary Lead Tile — Luxury Remodeling (7 Columns) */}
          {remodeling ? (
            <BentoCardSpotlight
              surface="dark"
              className="lg:col-span-7 min-h-[460px]"
            >
              <div className="relative flex h-full flex-col justify-between p-6 sm:p-8">
                <div className="absolute inset-0 z-0 opacity-35 transition-opacity duration-500 group-hover/spotlight:opacity-45">
                  <Image
                    src={getMediaAsset(remodeling.imageId).src}
                    alt={getMediaAsset(remodeling.imageId).alt}
                    fill
                    sizes="(min-width: 1024px) 58vw, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#17191B] via-[#17191B]/72 to-[#17191B]/55" />
                </div>

                <div className="relative z-10 flex items-center justify-between gap-4">
                  <span className="glass-photo px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em]">
                    [{remodeling.index}] Primary Anchor
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#A7A6A3]">
                    {remodeling.eyebrow}
                  </span>
                </div>

                <div className="relative z-10 mt-14 space-y-5">
                  <h3 className="font-display text-3xl font-semibold tracking-[-0.03em] text-[#F2F0EC] sm:text-4xl">
                    {remodeling.title}
                  </h3>
                  <p className="max-w-[54ch] text-sm leading-[1.7] text-[#D8D5CF] sm:text-[15px]">
                    {remodeling.summary}
                  </p>

                  <ul className="grid grid-cols-1 gap-2 border-t border-[#A7A6A3]/22 pt-4 text-xs text-[#D8D5CF] sm:grid-cols-2">
                    {remodeling.deliverables.slice(0, 4).map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-1.5 h-px w-2.5 shrink-0 bg-[#A7A6A3]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <Link
                      href={`/services/${remodeling.slug}`}
                      className="inline-flex items-center gap-2 border border-[#F2F0EC] bg-[#F2F0EC] px-4 py-2.5 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-[#17191B] transition-colors hover:bg-[#D8D5CF]"
                    >
                      <span>Explore Remodeling</span>
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                    <Link
                      href="/services/kitchen-remodeling"
                      className="glass-photo px-3.5 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] transition-colors hover:border-[#F2F0EC]/60"
                    >
                      Kitchens
                    </Link>
                    <Link
                      href="/services/bathroom-remodeling"
                      className="glass-photo px-3.5 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] transition-colors hover:border-[#F2F0EC]/60"
                    >
                      Bathrooms
                    </Link>
                  </div>
                </div>
              </div>
            </BentoCardSpotlight>
          ) : null}

          {/* Secondary Tile — Custom Construction (5 Columns) */}
          {customConstruction ? (
            <BentoCardSpotlight className="lg:col-span-5 min-h-[460px]">
              <div className="flex h-full flex-col justify-between p-6 sm:p-8">
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#5C5B58] dark:text-[#A7A6A3]">
                      [{customConstruction.index}] {customConstruction.eyebrow}
                    </span>
                  </div>

                  <div className="relative aspect-[16/9] w-full overflow-hidden border border-[#17191B]/12 bg-[#17191B] dark:border-[#A7A6A3]/22">
                    <Image
                      src={getMediaAsset(customConstruction.imageId).src}
                      alt={getMediaAsset(customConstruction.imageId).alt}
                      fill
                      sizes="(min-width: 1024px) 38vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover/spotlight:scale-[1.04]"
                    />
                  </div>

                  <h3 className="font-display text-2xl font-semibold tracking-[-0.025em] sm:text-3xl">
                    {customConstruction.title}
                  </h3>
                  <p className="text-sm leading-[1.7] text-[#34383C] dark:text-[#D8D5CF]">
                    {customConstruction.summary}
                  </p>
                </div>

                <div className="mt-6 border-t border-[#17191B]/12 pt-4 dark:border-[#A7A6A3]/20">
                  <Link
                    href={`/services/${customConstruction.slug}`}
                    className="inline-flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.18em] transition-opacity hover:opacity-70"
                  >
                    <span>Explore {customConstruction.shortTitle}</span>
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </BentoCardSpotlight>
          ) : null}

          {/* Third Tile — General Contracting (5 Columns) */}
          {contracting ? (
            <BentoCardSpotlight className="lg:col-span-5 min-h-[380px]">
              <div className="flex h-full flex-col justify-between p-6 sm:p-8">
                <div className="space-y-4">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#5C5B58] dark:text-[#A7A6A3]">
                    [{contracting.index}] {contracting.eyebrow}
                  </span>
                  <h3 className="font-display text-2xl font-semibold tracking-[-0.025em] sm:text-3xl">
                    {contracting.title}
                  </h3>
                  <p className="text-sm leading-[1.7] text-[#34383C] dark:text-[#D8D5CF]">
                    {contracting.summary}
                  </p>

                  <ul className="space-y-2 border-t border-[#17191B]/12 pt-4 text-xs text-[#34383C] dark:border-[#A7A6A3]/20 dark:text-[#D8D5CF]">
                    {contracting.deliverables.slice(0, 3).map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <span className="mt-1.5 h-px w-2.5 shrink-0 bg-current opacity-50" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 border-t border-[#17191B]/12 pt-4 dark:border-[#A7A6A3]/20">
                  <Link
                    href={`/services/${contracting.slug}`}
                    className="inline-flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.18em] transition-opacity hover:opacity-70"
                  >
                    <span>Explore {contracting.shortTitle}</span>
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </BentoCardSpotlight>
          ) : null}

          {/* Fourth Tile — Restoration & Reconstruction (7 Columns) */}
          {restoration ? (
            <BentoCardSpotlight
              surface="dark"
              className="lg:col-span-7 min-h-[380px]"
            >
              <div className="relative flex h-full flex-col justify-between p-6 sm:p-8">
                <div className="absolute inset-0 z-0 opacity-30 transition-opacity duration-500 group-hover/spotlight:opacity-42">
                  <Image
                    src={getMediaAsset(restoration.imageId).src}
                    alt={getMediaAsset(restoration.imageId).alt}
                    fill
                    sizes="(min-width: 1024px) 58vw, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#17191B] via-[#17191B]/82 to-[#17191B]/55" />
                </div>

                <div className="relative z-10 flex items-center justify-between gap-4">
                  <span className="glass-photo px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em]">
                    [{restoration.index}] {restoration.eyebrow}
                  </span>
                </div>

                <div className="relative z-10 mt-10 grid grid-cols-1 gap-6 sm:grid-cols-12 sm:items-end">
                  <div className="space-y-3 sm:col-span-8">
                    <h3 className="font-display text-2xl font-semibold tracking-[-0.025em] text-[#F2F0EC] sm:text-3xl">
                      {restoration.title}
                    </h3>
                    <p className="text-sm leading-[1.7] text-[#D8D5CF]">
                      {restoration.summary}
                    </p>
                  </div>

                  <div className="sm:col-span-4 sm:flex sm:justify-end">
                    <Link
                      href={`/services/${restoration.slug}`}
                      className="inline-flex items-center gap-2 border border-[#F2F0EC]/35 px-4 py-2.5 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-[#F2F0EC] transition-colors hover:border-[#F2F0EC] hover:bg-[#F2F0EC] hover:text-[#17191B]"
                    >
                      <span>Explore Scope</span>
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </div>
            </BentoCardSpotlight>
          ) : null}
        </div>
      </Container>
    </SectionShell>
  );
}
