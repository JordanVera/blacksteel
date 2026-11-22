"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Plus, Minus } from "lucide-react";
import type { ServiceItem } from "@/types/domain";
import { getMediaAsset } from "@/content/media";
import { Container } from "@/components/layout/Container";
import { SectionShell } from "@/components/layout/SectionShell";
import { EditorialHeading } from "@/components/ui/EditorialHeading";
import { ActionLink } from "@/components/ui/ActionLink";
import { ArchitecturalRule } from "@/components/motion/ArchitecturalRule";
import { cn } from "@/lib/utils";

interface ExpertiseSectionProps {
  pillars: ServiceItem[];
}

export function ExpertiseSection({ pillars }: ExpertiseSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeService = pillars[activeIndex] ?? pillars[0]!;
  const activeMedia = getMediaAsset(activeService.imageId);

  return (
    <SectionShell id="expertise" surface="elevated" spacing="spacious">
      <Container>
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <EditorialHeading
            index="04"
            eyebrow="Expertise"
            size="section"
            title="Four core disciplines, anchored by remodeling and bespoke craft."
            description="Every engagement is led with architectural clarity—prioritizing custom residential transformations, structural additions, disciplined general contracting, and elevated reconstruction."
          />

          <ActionLink href="/services" variant="underline">
            All Capabilities
          </ActionLink>
        </div>

        <ArchitecturalRule className="my-12 lg:my-14" />

        {/* Desktop Interactive Architectural Split Showcase */}
        <div className="hidden lg:grid lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6">
            <ul className="divide-y divide-[#17191B]/14 border-b border-[#17191B]/14 dark:divide-[#A7A6A3]/22 dark:border-[#A7A6A3]/22">
              {pillars.map((service, index) => {
                const isActive = index === activeIndex;
                return (
                  <li key={service.slug}>
                    <div
                      onMouseEnter={() => setActiveIndex(index)}
                      className="py-7"
                    >
                      <button
                        type="button"
                        onClick={() => setActiveIndex(index)}
                        onFocus={() => setActiveIndex(index)}
                        aria-expanded={isActive}
                        className="group flex w-full items-baseline justify-between gap-6 text-left cursor-pointer"
                      >
                        <div className="flex items-baseline gap-6">
                          <span
                            className={cn(
                              "font-serif text-2xl tabular-nums transition-colors duration-300",
                              isActive
                                ? "text-[#17191B] dark:text-[#F2F0EC]"
                                : "text-[#5C5B58]/70 dark:text-[#A7A6A3]/70"
                            )}
                          >
                            {service.index}
                          </span>
                          <div>
                            <p className="eyebrow-label text-[#5C5B58] dark:text-[#A7A6A3]">
                              {service.eyebrow}
                            </p>
                            <h3
                              className={cn(
                                "mt-1 font-serif text-3xl tracking-[-0.015em] transition-colors duration-300 xl:text-4xl",
                                isActive
                                  ? "text-[#17191B] dark:text-[#F2F0EC]"
                                  : "text-[#17191B]/55 group-hover:text-[#17191B]/85 dark:text-[#F2F0EC]/55 dark:group-hover:text-[#F2F0EC]/85"
                              )}
                            >
                              {service.title}
                            </h3>
                          </div>
                        </div>

                        <span
                          aria-hidden="true"
                          className={cn(
                            "text-xs uppercase tracking-[0.2em] transition-opacity duration-300",
                            isActive ? "opacity-100" : "opacity-0 group-hover:opacity-60"
                          )}
                        >
                          Active
                        </span>
                      </button>

                      <AnimatePresence initial={false}>
                        {isActive ? (
                          <motion.div
                            key={`${service.slug}-body`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="pl-12 pt-4 space-y-5">
                              <p className="max-w-[48ch] text-[15px] leading-[1.7] text-[#34383C] dark:text-[#D8D5CF]">
                                {service.summary}
                              </p>

                              {service.slug === "luxury-remodeling" ? (
                                <div className="flex flex-wrap gap-3 text-[11px] uppercase tracking-[0.16em]">
                                  <Link
                                    href="/services/kitchen-remodeling"
                                    className="border border-[#17191B]/20 px-3 py-1.5 text-[#17191B] transition-colors hover:border-[#17191B] hover:bg-[#17191B] hover:text-[#F2F0EC] dark:border-[#A7A6A3]/30 dark:text-[#F2F0EC] dark:hover:border-[#F2F0EC] dark:hover:bg-[#F2F0EC] dark:hover:text-[#17191B]"
                                  >
                                    Kitchens
                                  </Link>
                                  <Link
                                    href="/services/bathroom-remodeling"
                                    className="border border-[#17191B]/20 px-3 py-1.5 text-[#17191B] transition-colors hover:border-[#17191B] hover:bg-[#17191B] hover:text-[#F2F0EC] dark:border-[#A7A6A3]/30 dark:text-[#F2F0EC] dark:hover:border-[#F2F0EC] dark:hover:bg-[#F2F0EC] dark:hover:text-[#17191B]"
                                  >
                                    Bathrooms
                                  </Link>
                                </div>
                              ) : null}

                              <Link
                                href={`/services/${service.slug}`}
                                className="group/link inline-flex items-center gap-2 border-b border-[#17191B]/40 pb-1 text-[11px] font-medium uppercase tracking-[0.2em] text-[#17191B] transition-colors hover:border-[#17191B] dark:border-[#F2F0EC]/40 dark:text-[#F2F0EC] dark:hover:border-[#F2F0EC]"
                              >
                                <span>Explore {service.shortTitle}</span>
                                <ArrowUpRight
                                  className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                                  aria-hidden="true"
                                />
                              </Link>
                            </div>
                          </motion.div>
                        ) : null}
                      </AnimatePresence>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Live-Swapping Editorial Image Frame with Smoked-Glass Scope Overlay */}
          <div className="lg:col-span-6">
            <div className="relative h-full min-h-[560px] w-full overflow-hidden border border-[#17191B]/12 bg-[#17191B] dark:border-[#A7A6A3]/22">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeService.slug}
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={activeMedia.src}
                    alt={activeMedia.alt}
                    fill
                    sizes="(min-width: 1024px) 46vw, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#17191B]/88 via-[#17191B]/18 to-[#17191B]/25" />
                </motion.div>
              </AnimatePresence>

              <div className="absolute left-5 top-5 right-5 flex items-center justify-between">
                <span className="glass-photo px-3 py-1.5 text-[10px] font-medium tabular-nums uppercase tracking-[0.2em]">
                  Discipline {activeService.index}
                </span>
                <span className="glass-photo px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-[#F2F0EC]/85">
                  Demonstration Visual
                </span>
              </div>

              <div className="absolute inset-x-5 bottom-5 glass-obsidian p-6 text-[#F2F0EC]">
                <p className="eyebrow-label text-[#A7A6A3]">
                  Representative Scope
                </p>
                <ul className="mt-3 grid grid-cols-1 gap-2 text-sm text-[#F2F0EC]/90">
                  {activeService.deliverables.slice(0, 3).map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span
                        aria-hidden="true"
                        className="mt-2 h-px w-3 shrink-0 bg-[#A7A6A3]"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile & Tablet Clean Accordion */}
        <div className="divide-y divide-[#17191B]/14 border-b border-[#17191B]/14 dark:divide-[#A7A6A3]/22 dark:border-[#A7A6A3]/22 lg:hidden">
          {pillars.map((service, index) => {
            const isOpen = index === activeIndex;
            const media = getMediaAsset(service.imageId);
            return (
              <div key={service.slug} className="py-6">
                <button
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 text-left cursor-pointer"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="font-serif text-xl tabular-nums text-[#5C5B58] dark:text-[#A7A6A3]">
                      {service.index}
                    </span>
                    <h3 className="font-serif text-2xl text-[#17191B] dark:text-[#F2F0EC]">
                      {service.title}
                    </h3>
                  </div>
                  {isOpen ? (
                    <Minus className="h-4 w-4 shrink-0" aria-hidden="true" />
                  ) : (
                    <Plus className="h-4 w-4 shrink-0" aria-hidden="true" />
                  )}
                </button>

                {isOpen ? (
                  <div className="mt-5 space-y-5">
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#17191B]">
                      <Image
                        src={media.src}
                        alt={media.alt}
                        fill
                        sizes="100vw"
                        className="object-cover"
                      />
                    </div>
                    <p className="text-sm leading-[1.7] text-[#34383C] dark:text-[#D8D5CF]">
                      {service.summary}
                    </p>
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center gap-2 border-b border-[#17191B]/40 pb-1 text-[11px] font-medium uppercase tracking-[0.2em] text-[#17191B] dark:border-[#F2F0EC]/40 dark:text-[#F2F0EC]"
                    >
                      <span>Explore {service.shortTitle}</span>
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </Container>
    </SectionShell>
  );
}
