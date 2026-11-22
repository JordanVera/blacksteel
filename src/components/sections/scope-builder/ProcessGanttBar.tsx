"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight, CalendarClock } from "lucide-react";
import type { ModeledTimelineStage } from "@/features/scope-builder/engine";
import { cn } from "@/lib/utils";

interface ProcessGanttBarProps {
  stages: readonly ModeledTimelineStage[];
  totalScaleWeeks: number;
  permittingWeeks: number;
  totalWeeksLow: number;
  totalWeeksHigh: number;
  totalMonthsLow: number;
  totalMonthsHigh: number;
}

export function ProcessGanttBar({
  stages,
  totalScaleWeeks,
  permittingWeeks,
  totalWeeksLow,
  totalWeeksHigh,
  totalMonthsLow,
  totalMonthsHigh,
}: ProcessGanttBarProps) {
  const [activeSlug, setActiveSlug] = useState<string>(
    stages[2]?.slug ?? stages[0]?.slug ?? "design-and-plan"
  );

  const activeStage =
    stages.find((stage) => stage.slug === activeSlug) ?? stages[0];

  const safeScale = Math.max(1, totalScaleWeeks);
  const midWeek = Math.round(safeScale / 2);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#A7A6A3]">
            5-Stage Delivery Schedule
          </p>
          <p className="mt-1 font-display text-xl font-semibold tabular-nums tracking-[-0.025em] text-[#F2F0EC]">
            {totalWeeksLow}–{totalWeeksHigh} Weeks{" "}
            <span className="font-mono text-xs font-normal text-[#A7A6A3]">
              (~{totalMonthsLow}–{totalMonthsHigh} mos)
            </span>
          </p>
        </div>

        <div className="flex items-center gap-2 border border-[#F2F0EC]/15 bg-[#17191B]/70 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-[#D8D5CF]">
          <CalendarClock className="h-3.5 w-3.5 text-[#A7A6A3]" aria-hidden="true" />
          <span className="tabular-nums">~{permittingWeeks} Wks Permitting</span>
        </div>
      </div>

      {/* Week Scale Axis */}
      <div className="space-y-2 border border-[#F2F0EC]/14 bg-[#17191B]/75 p-3.5 sm:p-4">
        <div className="flex items-center justify-between border-b border-[#F2F0EC]/10 pb-2 font-mono text-[9px] tabular-nums uppercase tracking-[0.18em] text-[#A7A6A3]">
          <span>Wk 01</span>
          <span>Wk {String(midWeek).padStart(2, "0")}</span>
          <span>Wk {String(safeScale).padStart(2, "0")}</span>
        </div>

        <div
          className="space-y-2 pt-1"
          role="tablist"
          aria-label="Interactive project timeline stages"
        >
          {stages.map((stage) => {
            const leftPct = (stage.startWeek / safeScale) * 100;
            const widthPct = Math.max(
              7,
              ((stage.endWeek - stage.startWeek) / safeScale) * 100
            );
            const isSelected = activeStage?.slug === stage.slug;

            return (
              <button
                key={stage.slug}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setActiveSlug(stage.slug)}
                onMouseEnter={() => setActiveSlug(stage.slug)}
                className={cn(
                  "group block w-full cursor-pointer border px-2.5 py-2 text-left transition-colors duration-200",
                  isSelected
                    ? "border-[#F2F0EC]/40 bg-[#F2F0EC]/[0.07]"
                    : "border-transparent hover:border-[#F2F0EC]/16 hover:bg-[#F2F0EC]/[0.03]"
                )}
              >
                <div className="mb-1.5 flex items-center justify-between gap-2 font-mono text-[10px] tracking-[0.14em]">
                  <span className="flex items-center gap-2 uppercase text-[#F2F0EC]">
                    <span className="tabular-nums text-[#A7A6A3]">
                      [{stage.number}]
                    </span>
                    <span className="font-medium">{stage.title}</span>
                  </span>
                  <span className="tabular-nums text-[#A7A6A3]">
                    {stage.durationWeeks}w · W{stage.startWeek + 1}–W
                    {stage.endWeek}
                  </span>
                </div>

                {/* Gantt Track */}
                <div className="relative h-2 w-full overflow-hidden bg-[#F2F0EC]/[0.08]">
                  <motion.span
                    layout
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 28,
                    }}
                    style={{
                      left: `${leftPct}%`,
                      width: `${Math.min(100 - leftPct, widthPct)}%`,
                    }}
                    className={cn(
                      "absolute inset-y-0 block transition-colors duration-200",
                      isSelected
                        ? "bg-[#F2F0EC]"
                        : stage.tag === "Permitting & Procurement"
                          ? "bg-[#A7A6A3]/85"
                          : stage.tag === "Field Execution"
                            ? "bg-[#D8D5CF]/75"
                            : "bg-[#A7A6A3]/55"
                    )}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Stage Inspection Strip */}
      {activeStage ? (
        <div
          role="tabpanel"
          className="border border-[#F2F0EC]/14 bg-[#17191B]/60 p-4"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#A7A6A3]">
              [{activeStage.number}] {activeStage.title} · {activeStage.tag}
            </p>
            <Link
              href={`/process#${activeStage.slug}`}
              className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.16em] text-[#D8D5CF] transition-colors hover:text-[#F2F0EC]"
            >
              <span>Process Detail</span>
              <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
            </Link>
          </div>
          <p className="mt-2 text-xs leading-[1.65] text-[#D8D5CF]">
            {activeStage.focusNote}
          </p>
          <ul className="mt-3 space-y-1.5 border-t border-[#F2F0EC]/10 pt-3">
            {activeStage.deliverables.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-[11px] leading-[1.55] text-[#A7A6A3]"
              >
                <span
                  aria-hidden="true"
                  className="mt-1.5 h-1 w-1 shrink-0 bg-[#F2F0EC]/65"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
