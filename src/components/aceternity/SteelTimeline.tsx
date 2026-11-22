"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import type { ProcessStage } from "@/types/domain";

interface SteelTimelineProps {
  stages: readonly ProcessStage[];
}

/**
 * Adapted from Aceternity UI's Timeline.
 * Draws a luminous monochrome silver-to-ivory vertical structural beam tied
 * directly to scroll progress across all five BLACKSTEEL execution phases.
 */
export function SteelTimeline({ stages }: SteelTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 65%"],
  });

  const beamScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={containerRef} className="relative">
      {/* Vertical Structural Beam Track */}
      <div
        aria-hidden="true"
        className="absolute bottom-4 left-[19px] top-4 w-px bg-[#17191B]/15 dark:bg-[#A7A6A3]/22 md:left-[23px]"
      >
        <motion.div
          style={
            prefersReducedMotion
              ? { scaleY: 1, originY: 0 }
              : { scaleY: beamScaleY, originY: 0 }
          }
          className="h-full w-full bg-gradient-to-b from-[#17191B] via-[#34383C] to-[#17191B] dark:from-[#F2F0EC] dark:via-[#D8D5CF] dark:to-[#A7A6A3]"
        />
      </div>

      <ol className="space-y-12 lg:space-y-16">
        {stages.map((stage) => (
          <li
            key={stage.number}
            className="relative grid grid-cols-1 gap-6 pl-14 md:pl-16 lg:grid-cols-12 lg:gap-10"
          >
            {/* Precision Beam Node */}
            <div
              aria-hidden="true"
              className="absolute left-0 top-1 flex h-10 w-10 items-center justify-center border border-[#17191B]/25 bg-[#F2F0EC] dark:border-[#A7A6A3]/40 dark:bg-[#17191B] md:h-12 md:w-12"
            >
              <span className="font-mono text-[11px] font-medium tabular-nums text-[#17191B] dark:text-[#F2F0EC]">
                {stage.number}
              </span>
            </div>

            {/* Sticky Stage Title Column */}
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-32 space-y-2">
                <p className="eyebrow-label text-[#5C5B58] dark:text-[#A7A6A3]">
                  Phase {stage.number} · {stage.subtitle}
                </p>
                <h3 className="font-display text-3xl font-semibold tracking-[-0.03em] text-[#17191B] dark:text-[#F2F0EC] sm:text-4xl">
                  {stage.title}
                </h3>
                <p className="pt-2 text-sm leading-[1.72] text-[#34383C] dark:text-[#D8D5CF] sm:text-[15px]">
                  {stage.description}
                </p>
              </div>
            </div>

            {/* Smoked-Glass Deliverable Card */}
            <div className="lg:col-span-7">
              <div className="glass-surface arch-crosshair p-6 sm:p-8">
                <div className="flex items-center justify-between border-b border-[#17191B]/12 pb-3.5 dark:border-[#A7A6A3]/20">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#5C5B58] dark:text-[#A7A6A3]">
                    Phase Deliverables &amp; Controls
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#17191B] dark:text-[#F2F0EC]">
                    [BS-{stage.number}]
                  </span>
                </div>

                <ul className="mt-5 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                  {stage.deliverables.map((item, idx) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 border border-[#17191B]/10 bg-[#F2F0EC]/50 p-3.5 text-xs leading-[1.6] text-[#17191B] dark:border-[#A7A6A3]/18 dark:bg-[#17191B]/55 dark:text-[#F2F0EC]/90 sm:text-sm"
                    >
                      <span className="font-mono text-[10px] text-[#5C5B58] dark:text-[#A7A6A3]">
                        0{idx + 1}
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
