"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import type { ProcessStage } from "@/types/domain";
import { getMediaAsset } from "@/content/media";
import { cn } from "@/lib/utils";

interface ArchitecturalStickyRevealProps {
  stages: readonly ProcessStage[];
  className?: string;
}

/**
 * Adapted from Aceternity UI's Sticky Scroll Reveal pattern.
 * Re-engineered for BLACKSTEEL without nested scroll containers or gradient
 * SaaS cards: uses native viewport scroll progression, architectural drafting
 * rules, high-resolution sticky imagery, and a smoked-glass deliverable drawer.
 */
export function ArchitecturalStickyReveal({
  stages,
  className,
}: ArchitecturalStickyRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 35%", "end 70%"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const clamped = Math.max(0, Math.min(0.9999, latest));
    const nextIndex = Math.floor(clamped * stages.length);
    if (nextIndex !== activeIndex) {
      setActiveIndex(nextIndex);
    }
  });

  const activeStage = stages[activeIndex] ?? stages[0]!;
  const activeMedia = getMediaAsset(activeStage.imageId);

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      {/* Desktop Editorial Split */}
      <div className="hidden lg:grid lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-6">
          <ol className="divide-y divide-[#17191B]/12 border-y border-[#17191B]/12 dark:divide-[#A7A6A3]/18 dark:border-[#A7A6A3]/18">
            {stages.map((stage, index) => {
              const isActive = index === activeIndex;
              return (
                <li key={stage.slug}>
                  <button
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    onFocus={() => setActiveIndex(index)}
                    aria-current={isActive ? "step" : undefined}
                    className={cn(
                      "group w-full py-10 text-left transition-all duration-300 cursor-pointer",
                      isActive ? "opacity-100" : "opacity-45 hover:opacity-80"
                    )}
                  >
                    <div className="flex items-baseline gap-6">
                      <span
                        className={cn(
                          "font-serif text-3xl tabular-nums transition-colors duration-300",
                          isActive
                            ? "text-[#17191B] dark:text-[#F2F0EC]"
                            : "text-[#5C5B58] dark:text-[#A7A6A3]"
                        )}
                      >
                        {stage.number}
                      </span>

                      <div className="flex-1 space-y-3">
                        <div className="flex items-center justify-between gap-4">
                          <h3 className="font-serif text-3xl tracking-[-0.015em] text-[#17191B] dark:text-[#F2F0EC]">
                            {stage.title}
                          </h3>
                          <span className="eyebrow-label text-[#5C5B58] dark:text-[#A7A6A3]">
                            {isActive ? "Active Phase" : `Phase ${stage.number}`}
                          </span>
                        </div>

                        <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#5C5B58] dark:text-[#A7A6A3]">
                          {stage.subtitle}
                        </p>

                        <p className="max-w-[50ch] text-[15px] leading-[1.7] text-[#34383C] dark:text-[#D8D5CF]">
                          {stage.description}
                        </p>

                        <div
                          className={cn(
                            "h-px w-full transition-colors duration-500",
                            isActive
                              ? "bg-[#17191B]/55 dark:bg-[#F2F0EC]/65"
                              : "bg-transparent"
                          )}
                        />
                      </div>
                    </div>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Sticky Visual & Smoked-Glass Deliverable Rail */}
        <div className="lg:col-span-6">
          <div className="sticky top-28 space-y-5">
            <div className="relative aspect-[4/5] w-full overflow-hidden border border-[#17191B]/12 bg-[#17191B] dark:border-[#A7A6A3]/20">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStage.slug}
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={activeMedia.src}
                    alt={activeMedia.alt}
                    fill
                    sizes="(min-width: 1024px) 44vw, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#17191B]/85 via-[#17191B]/15 to-[#17191B]/20" />
                </motion.div>
              </AnimatePresence>

              {/* Top Frosted Stage Index */}
              <div className="absolute left-5 top-5 right-5 flex items-center justify-between">
                <span className="glass-photo px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em]">
                  Stage {activeStage.number} / 0{stages.length}
                </span>
                <span className="glass-photo px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-[#F2F0EC]/85">
                  Demonstration Visual
                </span>
              </div>

              {/* Bottom Smoked-Glass Deliverable Drawer */}
              <div className="absolute inset-x-5 bottom-5 glass-obsidian p-6 text-[#F2F0EC]">
                <p className="eyebrow-label text-[#A7A6A3]">
                  Key Deliverables · {activeStage.title}
                </p>
                <ul className="mt-3 space-y-2 text-sm text-[#F2F0EC]/92">
                  {activeStage.deliverables.map((item) => (
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

            <div className="flex items-center justify-between text-xs text-[#5C5B58] dark:text-[#A7A6A3]">
              <span>{activeStage.imageCaption}</span>
              <span className="tabular-nums uppercase tracking-[0.18em]">
                {activeStage.number} — {activeStage.title}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile & Tablet Clean Stacked Sequence */}
      <ol className="space-y-12 lg:hidden">
        {stages.map((stage) => {
          const media = getMediaAsset(stage.imageId);
          return (
            <li
              key={stage.slug}
              className="border-t border-[#17191B]/14 pt-8 dark:border-[#A7A6A3]/22"
            >
              <div className="space-y-5">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="font-serif text-3xl tabular-nums text-[#5C5B58] dark:text-[#A7A6A3]">
                    {stage.number}
                  </span>
                  <span className="eyebrow-label text-[#5C5B58] dark:text-[#A7A6A3]">
                    {stage.subtitle}
                  </span>
                </div>

                <h3 className="font-serif text-3xl text-[#17191B] dark:text-[#F2F0EC]">
                  {stage.title}
                </h3>

                <p className="text-[15px] leading-[1.7] text-[#34383C] dark:text-[#D8D5CF]">
                  {stage.description}
                </p>

                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#17191B]">
                  <Image
                    src={media.src}
                    alt={media.alt}
                    fill
                    sizes="100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#17191B]/75 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 glass-photo px-3 py-1 text-[10px] uppercase tracking-[0.18em]">
                    {stage.imageCaption}
                  </div>
                </div>

                <ul className="space-y-2 border-l border-[#17191B]/18 pl-4 text-sm text-[#34383C] dark:border-[#A7A6A3]/25 dark:text-[#D8D5CF]">
                  {stage.deliverables.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
