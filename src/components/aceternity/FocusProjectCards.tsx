"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Maximize2, X } from "lucide-react";
import type { ProjectRecord } from "@/types/domain";
import { getMediaAsset } from "@/content/media";
import { DemoBadge } from "@/components/ui/DemoBadge";
import { cn } from "@/lib/utils";

interface FocusProjectCardsProps {
  projects: readonly ProjectRecord[];
}

/**
 * Adapted from Aceternity UI's FocusCards + ExpandableCard.
 * Hovering any architectural study sharpens focus while softly dimming siblings;
 * clicking "Inspect Dossier" opens a smooth shared-element smoked-glass preview
 * alongside direct navigation to the full case study route.
 */
export function FocusProjectCards({ projects }: FocusProjectCardsProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectRecord | null>(
    null
  );

  useEffect(() => {
    if (!selectedProject) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedProject(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedProject]);

  const [leadProject, ...secondaryProjects] = projects;

  const renderCard = (
    project: ProjectRecord,
    index: number,
    variant: "lead" | "wide" | "tall"
  ) => {
    const media = getMediaAsset(project.coverImageId);
    const isDimmed = hoveredIndex !== null && hoveredIndex !== index;

    return (
      <motion.article
        key={project.slug}
        layoutId={`project-card-${project.slug}`}
        onMouseEnter={() => setHoveredIndex(index)}
        onMouseLeave={() => setHoveredIndex(null)}
        className={cn(
          "group relative overflow-hidden border border-[#17191B]/16 bg-[#17191B] transition-all duration-500 dark:border-[#A7A6A3]/24",
          isDimmed && "opacity-75 md:scale-[0.985] md:blur-[1.2px]",
          variant === "lead" && "lg:col-span-12",
          variant === "wide" && "lg:col-span-7",
          variant === "tall" && "lg:col-span-5"
        )}
      >
        <div
          className={cn(
            "relative flex w-full flex-col justify-between gap-12 overflow-hidden p-4 sm:p-6",
            variant === "lead" && "min-h-[440px] lg:min-h-[540px]",
            variant === "wide" && "min-h-[440px] lg:min-h-[480px]",
            variant === "tall" && "min-h-[440px] lg:min-h-[480px]"
          )}
        >
          <Image
            src={media.src}
            alt={media.alt}
            fill
            sizes={
              variant === "lead"
                ? "(min-width: 1280px) 1344px, 100vw"
                : "(min-width: 1024px) 50vw, 100vw"
            }
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#17191B]/92 via-[#17191B]/30 to-[#17191B]/25"
          />

          {/* Top Telemetry Strip */}
          <div className="relative z-10 flex items-center justify-between gap-3">
            <span className="glass-photo px-3 py-1 font-mono text-[10px] font-medium tabular-nums uppercase tracking-[0.2em]">
              [{project.index}] {project.category}
            </span>

            <div className="flex items-center gap-2">
              {project.isDemonstration ? (
                <DemoBadge label="Demo Study" />
              ) : null}
              <button
                type="button"
                onClick={() => setSelectedProject(project)}
                aria-label={`Quick inspect ${project.name}`}
                className="glass-photo inline-flex h-8 w-8 items-center justify-center transition-colors hover:border-[#F2F0EC]/60 hover:bg-[#F2F0EC] hover:text-[#17191B] cursor-pointer"
              >
                <Maximize2 className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Bottom Smoked-Steel Dossier Bar */}
          <div className="relative z-10">
            <div
              className={cn(
                "glass-steel flex flex-col justify-between gap-5 p-5 sm:p-6",
                variant === "lead" && "sm:flex-row sm:items-end"
              )}
            >
              <div className="space-y-2">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#A7A6A3]">
                  {project.neighborhood} · {project.city}, {project.state}
                </p>
                <h3
                  className={cn(
                    "font-display font-semibold tracking-[-0.03em] text-[#F2F0EC]",
                    variant === "lead"
                      ? "text-2xl sm:text-4xl"
                      : "text-xl sm:text-2xl"
                  )}
                >
                  {project.name}
                </h3>
                <p className="max-w-[54ch] text-xs leading-[1.65] text-[#D8D5CF] sm:text-sm">
                  {project.shortDescription}
                </p>
              </div>

              <div className="flex shrink-0 flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => setSelectedProject(project)}
                  className="border border-[#F2F0EC]/25 px-3.5 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[#F2F0EC] transition-colors hover:border-[#F2F0EC] hover:bg-[#F2F0EC]/10 cursor-pointer"
                >
                  Quick Specs
                </button>
                <Link
                  href={`/projects/${project.slug}`}
                  className="inline-flex items-center gap-1.5 border border-[#F2F0EC] bg-[#F2F0EC] px-4 py-2.5 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-[#17191B] transition-colors hover:bg-[#D8D5CF]"
                >
                  <span>Study</span>
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </motion.article>
    );
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
        {leadProject ? renderCard(leadProject, 0, "lead") : null}
        {secondaryProjects.map((project, idx) =>
          renderCard(project, idx + 1, idx === 0 ? "wide" : "tall")
        )}
      </div>

      {/* Expandable Smoked-Glass Dossier Modal */}
      <AnimatePresence>
        {selectedProject ? (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${selectedProject.name} architectural summary`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#17191B]/82 p-4 backdrop-blur-md sm:p-6"
          >
            <motion.div
              layoutId={`project-card-${selectedProject.slug}`}
              onClick={(event) => event.stopPropagation()}
              className="glass-steel relative max-h-[90svh] w-full max-w-3xl overflow-y-auto"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-[#A7A6A3]/22">
                <Image
                  src={getMediaAsset(selectedProject.coverImageId).src}
                  alt={getMediaAsset(selectedProject.coverImageId).alt}
                  fill
                  sizes="(min-width: 768px) 768px, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#17191B] via-[#17191B]/25 to-transparent" />
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  aria-label="Close project quick specs"
                  className="glass-photo absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center text-[#F2F0EC] hover:bg-[#F2F0EC] hover:text-[#17191B] cursor-pointer"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
                <div className="absolute bottom-4 left-5 right-5 flex flex-wrap items-center justify-between gap-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#A7A6A3]">
                    [{selectedProject.index}] {selectedProject.neighborhood} ·{" "}
                    {selectedProject.city}, {selectedProject.state}
                  </span>
                  {selectedProject.isDemonstration ? (
                    <DemoBadge label="Demonstration Study" />
                  ) : null}
                </div>
              </div>

              <div className="space-y-6 p-6 sm:p-8">
                <div>
                  <h3 className="font-display text-2xl font-semibold tracking-[-0.03em] text-[#F2F0EC] sm:text-3xl">
                    {selectedProject.name}
                  </h3>
                  <p className="mt-3 text-sm leading-[1.7] text-[#D8D5CF]">
                    {selectedProject.fullNarrative[0] ??
                      selectedProject.shortDescription}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-6 border-y border-[#A7A6A3]/20 py-5 sm:grid-cols-2">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#A7A6A3]">
                      Scope Highlights
                    </p>
                    <ul className="mt-3 space-y-2 text-xs leading-[1.6] text-[#F2F0EC]/90">
                      {selectedProject.scopeOfWork.slice(0, 3).map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span className="mt-1.5 h-px w-2.5 shrink-0 bg-[#A7A6A3]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#A7A6A3]">
                      Material Palette
                    </p>
                    <ul className="mt-3 space-y-2 text-xs leading-[1.6] text-[#F2F0EC]/90">
                      {selectedProject.materialsAndFinishes
                        .slice(0, 3)
                        .map((mat) => (
                          <li key={mat} className="flex items-start gap-2">
                            <span className="mt-1.5 h-px w-2.5 shrink-0 bg-[#A7A6A3]" />
                            <span>{mat}</span>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => setSelectedProject(null)}
                    className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#A7A6A3] transition-colors hover:text-[#F2F0EC] cursor-pointer"
                  >
                    Close Preview
                  </button>
                  <Link
                    href={`/projects/${selectedProject.slug}`}
                    onClick={() => setSelectedProject(null)}
                    className="inline-flex items-center gap-2 border border-[#F2F0EC] bg-[#F2F0EC] px-5 py-3 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-[#17191B] transition-colors hover:bg-[#D8D5CF]"
                  >
                    <span>Open Full Case Study</span>
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
