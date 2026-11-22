"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Copy,
  Layers,
  MapPin,
  RotateCcw,
  ShieldCheck,
  SlidersHorizontal,
} from "lucide-react";
import { LOCATION_MARKETS } from "@/content/locations";
import {
  buildPlainTextSpecClipboard,
  calculateScopeModel,
  DEFAULT_SCOPE_INPUT,
  DESIGN_STATUS_OPTIONS,
  DISCIPLINE_PROFILES,
  encodeScopeSpecToQuery,
  FINISH_TIER_OPTIONS,
  formatCurrencyCompact,
  formatCurrencyFull,
  STRUCTURAL_CHANGE_OPTIONS,
} from "@/features/scope-builder/engine";
import {
  clearSavedScopeSpec,
  useSavedScopeSpec,
  writeSavedScopeSpec,
} from "@/features/scope-builder/storage";
import {
  SCOPE_DISCIPLINES,
  SCOPE_MARKETS,
  type ScopeDiscipline,
  type ScopeModelInput,
  type StructuralChangeKey,
} from "@/features/scope-builder/schema";
import { ProcessGanttBar } from "@/components/sections/scope-builder/ProcessGanttBar";
import { cn } from "@/lib/utils";

const STEPS = [
  { id: 0, code: "01", label: "Market" },
  { id: 1, code: "02", label: "Discipline" },
  { id: 2, code: "03", label: "Footprint" },
  { id: 3, code: "04", label: "Structure" },
  { id: 4, code: "05", label: "Finishes" },
] as const;

interface ScopeBuilderWorkspaceProps {
  initialInput?: ScopeModelInput | null;
}

export function ScopeBuilderWorkspace({
  initialInput,
}: ScopeBuilderWorkspaceProps) {
  const router = useRouter();
  const prefersReducedMotion = useReducedMotion();
  const savedSpec = useSavedScopeSpec();

  const [step, setStep] = useState<number>(0);
  const [draftInput, setDraftInput] = useState<ScopeModelInput | null>(
    initialInput ?? null
  );
  const [copied, setCopied] = useState(false);

  const input = draftInput ?? savedSpec ?? DEFAULT_SCOPE_INPUT;

  const updateInput = (updater: (prev: ScopeModelInput) => ScopeModelInput) => {
    const next = updater(input);
    setDraftInput(next);
    writeSavedScopeSpec(next);
  };

  const model = useMemo(() => calculateScopeModel(input), [input]);
  const activeProfile = DISCIPLINE_PROFILES[input.discipline];

  const handleDisciplineChange = (discipline: ScopeDiscipline) => {
    const nextProfile = DISCIPLINE_PROFILES[discipline];
    updateInput((prev) => ({
      ...prev,
      discipline,
      squareFeet: nextProfile.defaultSqFt,
    }));
  };

  const toggleStructuralChange = (key: StructuralChangeKey) => {
    updateInput((prev) => {
      const exists = prev.structuralChanges.includes(key);
      return {
        ...prev,
        structuralChanges: exists
          ? prev.structuralChanges.filter((item) => item !== key)
          : [...prev.structuralChanges, key],
      };
    });
  };

  const handleHandoffToContact = () => {
    writeSavedScopeSpec(model.input);
    const query = encodeScopeSpecToQuery(model.input);
    router.push(`/contact?${query}`);
  };

  const handleCopySpec = async () => {
    try {
      await navigator.clipboard.writeText(buildPlainTextSpecClipboard(model));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      // Clipboard API unavailable
    }
  };

  const handleReset = () => {
    setDraftInput(DEFAULT_SCOPE_INPUT);
    setStep(0);
    clearSavedScopeSpec();
  };

  return (
    <div className="space-y-10">
      {/* Top Interactive Step Ledger */}
      <div className="flex flex-col justify-between gap-5 border-y border-[#17191B]/14 py-5 dark:border-[#A7A6A3]/22 lg:flex-row lg:items-center">
        <nav
          aria-label="Scope modeler steps"
          className="flex flex-wrap items-center gap-2"
        >
          {STEPS.map((item) => {
            const isCurrent = step === item.id;
            const isCompleted = step > item.id;
            return (
              <button
                key={item.code}
                type="button"
                onClick={() => setStep(item.id)}
                aria-current={isCurrent ? "step" : undefined}
                className={cn(
                  "inline-flex cursor-pointer items-center gap-2 border px-3.5 py-2 font-mono text-[10px] uppercase tracking-[0.18em] transition-colors",
                  isCurrent
                    ? "border-[#17191B] bg-[#17191B] text-[#F2F0EC] dark:border-[#F2F0EC] dark:bg-[#F2F0EC] dark:text-[#17191B]"
                    : isCompleted
                      ? "border-[#17191B]/35 bg-[#17191B]/[0.05] text-[#17191B] hover:border-[#17191B] dark:border-[#F2F0EC]/35 dark:bg-[#F2F0EC]/[0.06] dark:text-[#F2F0EC]"
                      : "border-[#17191B]/16 text-[#5C5B58] hover:border-[#17191B] hover:text-[#17191B] dark:border-[#A7A6A3]/24 dark:text-[#A7A6A3] dark:hover:border-[#F2F0EC] dark:hover:text-[#F2F0EC]"
                )}
              >
                <span className="tabular-nums opacity-70">[{item.code}]</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleCopySpec}
            className="inline-flex cursor-pointer items-center gap-2 border border-[#17191B]/20 px-3.5 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#34383C] transition-colors hover:border-[#17191B] hover:text-[#17191B] dark:border-[#A7A6A3]/25 dark:text-[#D8D5CF] dark:hover:border-[#F2F0EC] dark:hover:text-[#F2F0EC]"
          >
            {copied ? (
              <Check className="h-3.5 w-3.5" aria-hidden="true" />
            ) : (
              <Copy className="h-3.5 w-3.5" aria-hidden="true" />
            )}
            <span>{copied ? "Spec Copied" : "Copy Spec"}</span>
          </button>

          <button
            type="button"
            onClick={handleReset}
            aria-label="Reset scope modeler"
            className="inline-flex h-8 w-8 cursor-pointer items-center justify-center border border-[#17191B]/20 text-[#5C5B58] transition-colors hover:border-[#17191B] hover:text-[#17191B] dark:border-[#A7A6A3]/25 dark:text-[#A7A6A3] dark:hover:border-[#F2F0EC] dark:hover:text-[#F2F0EC]"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Main Asymmetric 12-Column Architectural Workspace */}
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start lg:gap-12">
        {/* Left Column: Multi-Step Feasibility Configurator */}
        <div className="space-y-8 lg:col-span-7">
          <div className="glass-surface p-6 sm:p-9">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-7"
              >
                {/* STEP 01: Market Corridor */}
                {step === 0 ? (
                  <>
                    <div className="space-y-2 border-b border-[#17191B]/12 pb-5 dark:border-[#A7A6A3]/20">
                      <p className="eyebrow-label text-[#5C5B58] dark:text-[#A7A6A3]">
                        [01] Regional Market Calibration
                      </p>
                      <h2 className="font-display text-2xl font-semibold tracking-[-0.025em] sm:text-3xl">
                        Select your Texas market corridor.
                      </h2>
                      <p className="text-sm leading-[1.68] text-[#34383C] dark:text-[#D8D5CF]">
                        Houston and Austin carry distinct permitting timelines,
                        geotechnical soils, and building-envelope requirements.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {SCOPE_MARKETS.map((market) => {
                        const marketInfo =
                          LOCATION_MARKETS[
                            market === "Houston" ? "houston" : "austin"
                          ];
                        const selected = input.market === market;
                        return (
                          <button
                            key={market}
                            type="button"
                            onClick={() =>
                              updateInput((prev) => ({ ...prev, market }))
                            }
                            aria-pressed={selected}
                            className={cn(
                              "group flex cursor-pointer flex-col justify-between gap-5 border p-6 text-left transition-all duration-200",
                              selected
                                ? "border-[#17191B] bg-[#17191B] text-[#F2F0EC] dark:border-[#F2F0EC] dark:bg-[#F2F0EC] dark:text-[#17191B]"
                                : "border-[#17191B]/18 bg-[#F2F0EC]/60 text-[#17191B] hover:border-[#17191B] dark:border-[#A7A6A3]/25 dark:bg-[#17191B]/65 dark:text-[#F2F0EC] dark:hover:border-[#F2F0EC]"
                            )}
                          >
                            <div className="space-y-3">
                              <div className="flex items-center justify-between gap-2">
                                <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] opacity-75">
                                  <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                                  {marketInfo.coordinatesLabel}
                                </span>
                                <span
                                  className={cn(
                                    "flex h-5 w-5 items-center justify-center border",
                                    selected
                                      ? "border-current"
                                      : "border-current/25"
                                  )}
                                >
                                  {selected ? (
                                    <Check className="h-3 w-3" aria-hidden="true" />
                                  ) : null}
                                </span>
                              </div>

                              <div>
                                <h3 className="font-display text-2xl font-semibold tracking-[-0.025em]">
                                  {marketInfo.city}, TX
                                </h3>
                                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] opacity-75">
                                  {marketInfo.regionLabel}
                                </p>
                              </div>
                            </div>

                            <div className="space-y-2 border-t border-current/15 pt-4 text-xs leading-[1.6] opacity-85">
                              <p>
                                {market === "Houston"
                                  ? "Calibrated for Gulf Coast humidity control, expansive clay soils, and Houston / Memorial Village reviews."
                                  : "Calibrated for Hill Country limestone terrain, indoor-outdoor glazing, and City of Austin plan review."}
                              </p>
                              <p className="font-mono text-[10px] uppercase tracking-[0.14em] opacity-75">
                                {marketInfo.serviceAreas.slice(0, 4).join(" · ")}
                              </p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </>
                ) : null}

                {/* STEP 02: Core 4 Residential Disciplines */}
                {step === 1 ? (
                  <>
                    <div className="space-y-2 border-b border-[#17191B]/12 pb-5 dark:border-[#A7A6A3]/20">
                      <p className="eyebrow-label text-[#5C5B58] dark:text-[#A7A6A3]">
                        [02] Primary Residential Discipline
                      </p>
                      <h2 className="font-display text-2xl font-semibold tracking-[-0.025em] sm:text-3xl">
                        Define the core architectural scope.
                      </h2>
                      <p className="text-sm leading-[1.68] text-[#34383C] dark:text-[#D8D5CF]">
                        Choose one of our four core residential remodeling and
                        structural disciplines to calibrate baseline rates and
                        field sequencing.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {SCOPE_DISCIPLINES.map((discipline) => {
                        const profile = DISCIPLINE_PROFILES[discipline];
                        const selected = input.discipline === discipline;
                        return (
                          <button
                            key={discipline}
                            type="button"
                            onClick={() => handleDisciplineChange(discipline)}
                            aria-pressed={selected}
                            className={cn(
                              "flex cursor-pointer flex-col justify-between gap-4 border p-5 text-left transition-all duration-200",
                              selected
                                ? "border-[#17191B] bg-[#17191B] text-[#F2F0EC] dark:border-[#F2F0EC] dark:bg-[#F2F0EC] dark:text-[#17191B]"
                                : "border-[#17191B]/18 bg-[#F2F0EC]/60 text-[#17191B] hover:border-[#17191B] dark:border-[#A7A6A3]/25 dark:bg-[#17191B]/65 dark:text-[#F2F0EC] dark:hover:border-[#F2F0EC]"
                            )}
                          >
                            <div className="space-y-2.5">
                              <div className="flex items-center justify-between gap-2">
                                <span className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-70">
                                  {profile.code} · {profile.eyebrow}
                                </span>
                                <span
                                  className={cn(
                                    "flex h-5 w-5 items-center justify-center border",
                                    selected
                                      ? "border-current"
                                      : "border-current/25"
                                  )}
                                >
                                  {selected ? (
                                    <Check className="h-3 w-3" aria-hidden="true" />
                                  ) : null}
                                </span>
                              </div>
                              <h3 className="font-display text-xl font-semibold tracking-[-0.02em]">
                                {profile.shortLabel}
                              </h3>
                              <p className="text-xs leading-[1.65] opacity-85">
                                {profile.summary}
                              </p>
                            </div>

                            <div className="flex items-center justify-between border-t border-current/15 pt-3 font-mono text-[10px] uppercase tracking-[0.14em] opacity-75">
                              <span>
                                {profile.minSqFt.toLocaleString()}–
                                {profile.maxSqFt.toLocaleString()} sq ft
                              </span>
                              <span>Default {profile.defaultSqFt} sf</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </>
                ) : null}

                {/* STEP 03: Spatial Footprint */}
                {step === 2 ? (
                  <>
                    <div className="space-y-2 border-b border-[#17191B]/12 pb-5 dark:border-[#A7A6A3]/20">
                      <p className="eyebrow-label text-[#5C5B58] dark:text-[#A7A6A3]">
                        [03] Spatial Footprint
                      </p>
                      <h2 className="font-display text-2xl font-semibold tracking-[-0.025em] sm:text-3xl">
                        Approximate affected square footage.
                      </h2>
                      <p className="text-sm leading-[1.68] text-[#34383C] dark:text-[#D8D5CF]">
                        Adjust the slider or select a typical{" "}
                        <span className="font-medium text-[#17191B] dark:text-[#F2F0EC]">
                          {activeProfile.shortLabel}
                        </span>{" "}
                        footprint. Exact dimensions are laser-verified during
                        Stage 01 Discover.
                      </p>
                    </div>

                    <div className="space-y-6 border border-[#17191B]/15 bg-[#F2F0EC]/65 p-6 dark:border-[#A7A6A3]/22 dark:bg-[#17191B]/65">
                      <div className="flex flex-wrap items-baseline justify-between gap-4">
                        <div>
                          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#5C5B58] dark:text-[#A7A6A3]">
                            Modeled Area
                          </p>
                          <p className="mt-1 font-display text-4xl font-semibold tabular-nums tracking-[-0.03em] sm:text-5xl">
                            {input.squareFeet.toLocaleString("en-US")}{" "}
                            <span className="font-mono text-sm font-normal uppercase tracking-[0.18em] text-[#5C5B58] dark:text-[#A7A6A3]">
                              Sq. Ft.
                            </span>
                          </p>
                        </div>

                        <div className="text-right font-mono text-[11px] tabular-nums text-[#5C5B58] dark:text-[#A7A6A3]">
                          <p className="uppercase tracking-[0.16em]">
                            Calibrated Rate
                          </p>
                          <p className="mt-1 text-sm font-medium text-[#17191B] dark:text-[#F2F0EC]">
                            {formatCurrencyFull(model.investment.perSqFtLowUsd)}{" "}
                            –{" "}
                            {formatCurrencyFull(model.investment.perSqFtHighUsd)}{" "}
                            / sf
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2.5">
                        <label htmlFor="scope-sqft-slider" className="sr-only">
                          Approximate square footage
                        </label>
                        <input
                          id="scope-sqft-slider"
                          type="range"
                          min={activeProfile.minSqFt}
                          max={activeProfile.maxSqFt}
                          step={activeProfile.stepSqFt}
                          value={input.squareFeet}
                          onChange={(event) =>
                            updateInput((prev) => ({
                              ...prev,
                              squareFeet: Number(event.target.value),
                            }))
                          }
                          className="h-2 w-full cursor-pointer appearance-none bg-[#17191B]/18 accent-[#17191B] dark:bg-[#F2F0EC]/20 dark:accent-[#F2F0EC]"
                        />
                        <div className="flex justify-between font-mono text-[10px] tabular-nums uppercase tracking-[0.16em] text-[#5C5B58] dark:text-[#A7A6A3]">
                          <span>
                            {activeProfile.minSqFt.toLocaleString()} sf
                          </span>
                          <span>
                            {Math.round(
                              (activeProfile.minSqFt + activeProfile.maxSqFt) / 2
                            ).toLocaleString()}{" "}
                            sf
                          </span>
                          <span>
                            {activeProfile.maxSqFt.toLocaleString()} sf
                          </span>
                        </div>
                      </div>

                      {/* Quick Presets */}
                      <div className="space-y-2 border-t border-[#17191B]/12 pt-5 dark:border-[#A7A6A3]/18">
                        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#5C5B58] dark:text-[#A7A6A3]">
                          Reference Benchmarks
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {activeProfile.presets.map((preset) => {
                            const active = input.squareFeet === preset.sqFt;
                            return (
                              <button
                                key={preset.label}
                                type="button"
                                onClick={() =>
                                  updateInput((prev) => ({
                                    ...prev,
                                    squareFeet: preset.sqFt,
                                  }))
                                }
                                className={cn(
                                  "cursor-pointer border px-3.5 py-2 font-mono text-[10px] uppercase tracking-[0.16em] transition-colors",
                                  active
                                    ? "border-[#17191B] bg-[#17191B] text-[#F2F0EC] dark:border-[#F2F0EC] dark:bg-[#F2F0EC] dark:text-[#17191B]"
                                    : "border-[#17191B]/20 text-[#34383C] hover:border-[#17191B] dark:border-[#A7A6A3]/25 dark:text-[#D8D5CF] dark:hover:border-[#F2F0EC]"
                                )}
                              >
                                {preset.label}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    <div className="border-l-2 border-[#17191B]/30 pl-4 dark:border-[#A7A6A3]/40">
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#5C5B58] dark:text-[#A7A6A3]">
                        Baseline Scope Includes
                      </p>
                      <ul className="mt-2 space-y-1.5 text-xs leading-[1.65] text-[#34383C] dark:text-[#D8D5CF]">
                        {activeProfile.keyScopeIncludes.map((item) => (
                          <li key={item}>— {item}</li>
                        ))}
                      </ul>
                    </div>
                  </>
                ) : null}

                {/* STEP 04: Structural & Site Scope + Design Status */}
                {step === 3 ? (
                  <>
                    <div className="space-y-2 border-b border-[#17191B]/12 pb-5 dark:border-[#A7A6A3]/20">
                      <p className="eyebrow-label text-[#5C5B58] dark:text-[#A7A6A3]">
                        [04] Structural Complexity &amp; Design Readiness
                      </p>
                      <h2 className="font-display text-2xl font-semibold tracking-[-0.025em] sm:text-3xl">
                        Identify structural &amp; engineering triggers.
                      </h2>
                      <p className="text-sm leading-[1.68] text-[#34383C] dark:text-[#D8D5CF]">
                        Select any structural, foundation, mechanical, or
                        envelope modifications anticipated. Leave all unselected
                        for cosmetic-to-interior architectural scopes.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                      {STRUCTURAL_CHANGE_OPTIONS.map((opt) => {
                        const checked = input.structuralChanges.includes(opt.key);
                        return (
                          <button
                            key={opt.key}
                            type="button"
                            onClick={() => toggleStructuralChange(opt.key)}
                            aria-pressed={checked}
                            className={cn(
                              "flex cursor-pointer flex-col justify-between gap-3 border p-5 text-left transition-all duration-200",
                              checked
                                ? "border-[#17191B] bg-[#17191B] text-[#F2F0EC] dark:border-[#F2F0EC] dark:bg-[#F2F0EC] dark:text-[#17191B]"
                                : "border-[#17191B]/18 bg-[#F2F0EC]/60 text-[#17191B] hover:border-[#17191B] dark:border-[#A7A6A3]/25 dark:bg-[#17191B]/65 dark:text-[#F2F0EC] dark:hover:border-[#F2F0EC]"
                            )}
                          >
                            <div className="space-y-2">
                              <div className="flex items-center justify-between gap-2">
                                <span className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-70">
                                  {opt.code}
                                </span>
                                <span
                                  className={cn(
                                    "flex h-5 w-5 items-center justify-center border",
                                    checked
                                      ? "border-current"
                                      : "border-current/25"
                                  )}
                                >
                                  {checked ? (
                                    <Check className="h-3 w-3" aria-hidden="true" />
                                  ) : null}
                                </span>
                              </div>
                              <h3 className="font-display text-base font-semibold leading-[1.25] tracking-[-0.015em]">
                                {opt.label}
                              </h3>
                              <p className="text-xs leading-[1.6] opacity-85">
                                {opt.description}
                              </p>
                            </div>

                            <div className="flex items-center justify-between border-t border-current/15 pt-2.5 font-mono text-[10px] tabular-nums uppercase tracking-[0.14em] opacity-75">
                              <span>
                                +{formatCurrencyCompact(opt.costLow)}–
                                {formatCurrencyCompact(opt.costHigh)}
                              </span>
                              <span>
                                +{opt.permitWeeksDelta + opt.buildWeeksDelta} wks
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* Design Readiness Selector */}
                    <div className="space-y-3 border-t border-[#17191B]/12 pt-6 dark:border-[#A7A6A3]/20">
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#5C5B58] dark:text-[#A7A6A3]">
                        Current Architectural Drawing Status
                      </p>
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                        {DESIGN_STATUS_OPTIONS.map((option) => {
                          const selected = input.designStatus === option.key;
                          return (
                            <button
                              key={option.key}
                              type="button"
                              onClick={() =>
                                updateInput((prev) => ({
                                  ...prev,
                                  designStatus: option.key,
                                }))
                              }
                              aria-pressed={selected}
                              className={cn(
                                "cursor-pointer border p-4 text-left transition-colors",
                                selected
                                  ? "border-[#17191B] bg-[#17191B]/[0.08] text-[#17191B] dark:border-[#F2F0EC] dark:bg-[#F2F0EC]/[0.1] dark:text-[#F2F0EC]"
                                  : "border-[#17191B]/16 text-[#34383C] hover:border-[#17191B] dark:border-[#A7A6A3]/22 dark:text-[#D8D5CF] dark:hover:border-[#F2F0EC]"
                              )}
                            >
                              <p className="font-mono text-[10px] font-medium uppercase tracking-[0.16em]">
                                {option.shortLabel}
                              </p>
                              <p className="mt-1.5 text-xs leading-[1.55] opacity-80">
                                {option.detail}
                              </p>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </>
                ) : null}

                {/* STEP 05: Finish & Millwork Tier */}
                {step === 4 ? (
                  <>
                    <div className="space-y-2 border-b border-[#17191B]/12 pb-5 dark:border-[#A7A6A3]/20">
                      <p className="eyebrow-label text-[#5C5B58] dark:text-[#A7A6A3]">
                        [05] Materiality &amp; Craft Standard
                      </p>
                      <h2 className="font-display text-2xl font-semibold tracking-[-0.025em] sm:text-3xl">
                        Select finish &amp; millwork specification tier.
                      </h2>
                      <p className="text-sm leading-[1.68] text-[#34383C] dark:text-[#D8D5CF]">
                        Material specification governs both investment band and
                        long-lead factory procurement windows for stone,
                        millwork, and custom metalwork.
                      </p>
                    </div>

                    <div className="space-y-3.5">
                      {FINISH_TIER_OPTIONS.map((tier) => {
                        const selected = input.finishTier === tier.key;
                        return (
                          <button
                            key={tier.key}
                            type="button"
                            onClick={() =>
                              updateInput((prev) => ({
                                ...prev,
                                finishTier: tier.key,
                              }))
                            }
                            aria-pressed={selected}
                            className={cn(
                              "block w-full cursor-pointer border p-6 text-left transition-all duration-200",
                              selected
                                ? "border-[#17191B] bg-[#17191B] text-[#F2F0EC] dark:border-[#F2F0EC] dark:bg-[#F2F0EC] dark:text-[#17191B]"
                                : "border-[#17191B]/18 bg-[#F2F0EC]/60 text-[#17191B] hover:border-[#17191B] dark:border-[#A7A6A3]/25 dark:bg-[#17191B]/65 dark:text-[#F2F0EC] dark:hover:border-[#F2F0EC]"
                            )}
                          >
                            <div className="flex flex-wrap items-start justify-between gap-3">
                              <div>
                                <p className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-70">
                                  {tier.code} ·{" "}
                                  {tier.procurementWeeksDelta === 0
                                    ? "Standard Lead Time"
                                    : `+${tier.procurementWeeksDelta} Wks Procurement`}
                                </p>
                                <h3 className="mt-1 font-display text-xl font-semibold tracking-[-0.02em]">
                                  {tier.label}
                                </h3>
                                <p className="mt-1 text-xs opacity-85">
                                  {tier.subtitle}
                                </p>
                              </div>
                              <span
                                className={cn(
                                  "flex h-5 w-5 shrink-0 items-center justify-center border",
                                  selected
                                    ? "border-current"
                                    : "border-current/25"
                                )}
                              >
                                {selected ? (
                                  <Check className="h-3 w-3" aria-hidden="true" />
                                ) : null}
                              </span>
                            </div>

                            <ul className="mt-4 grid grid-cols-1 gap-2 border-t border-current/15 pt-4 text-xs opacity-85 sm:grid-cols-3">
                              {tier.materialCues.map((cue) => (
                                <li key={cue} className="leading-[1.5]">
                                  · {cue}
                                </li>
                              ))}
                            </ul>
                          </button>
                        );
                      })}
                    </div>
                  </>
                ) : null}
              </motion.div>
            </AnimatePresence>

            {/* Step Footer Controls */}
            <div className="mt-8 flex items-center justify-between gap-4 border-t border-[#17191B]/12 pt-6 dark:border-[#A7A6A3]/20">
              <button
                type="button"
                onClick={() => setStep((prev) => Math.max(0, prev - 1))}
                disabled={step === 0}
                className="inline-flex cursor-pointer items-center gap-2 border border-[#17191B]/22 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-[#17191B] transition-colors hover:border-[#17191B] disabled:cursor-not-allowed disabled:opacity-35 dark:border-[#A7A6A3]/28 dark:text-[#F2F0EC] dark:hover:border-[#F2F0EC]"
              >
                <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Previous</span>
              </button>

              {step < STEPS.length - 1 ? (
                <button
                  type="button"
                  onClick={() =>
                    setStep((prev) => Math.min(STEPS.length - 1, prev + 1))
                  }
                  className="inline-flex cursor-pointer items-center gap-2 border border-[#17191B] bg-[#17191B] px-6 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-[#F2F0EC] transition-colors hover:bg-[#34383C] dark:border-[#F2F0EC] dark:bg-[#F2F0EC] dark:text-[#17191B] dark:hover:bg-[#D8D5CF]"
                >
                  <span>
                    Next: {STEPS[step + 1]?.label}
                  </span>
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleHandoffToContact}
                  className="group inline-flex cursor-pointer items-center gap-2 border border-[#17191B] bg-[#17191B] px-6 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-[#F2F0EC] transition-colors hover:bg-[#34383C] dark:border-[#F2F0EC] dark:bg-[#F2F0EC] dark:text-[#17191B] dark:hover:bg-[#D8D5CF]"
                >
                  <span>Send This Spec to BLACKSTEEL</span>
                  <ArrowUpRight
                    className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </button>
              )}
            </div>
          </div>

          {/* Regional & Architectural Considerations Ledger */}
          <div className="glass-surface p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#17191B]/12 pb-5 dark:border-[#A7A6A3]/20">
              <div className="space-y-1">
                <p className="eyebrow-label text-[#5C5B58] dark:text-[#A7A6A3]">
                  Live Technical Brief · {input.market}, TX
                </p>
                <h3 className="font-display text-xl font-semibold tracking-[-0.02em] sm:text-2xl">
                  Key Architectural &amp; Permitting Considerations
                </h3>
              </div>
              <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[#5C5B58] dark:text-[#A7A6A3]">
                <Layers className="h-3.5 w-3.5" aria-hidden="true" />
                {model.considerations.length} Active Factors
              </span>
            </div>

            <ul className="mt-5 divide-y divide-[#17191B]/12 dark:divide-[#A7A6A3]/18">
              {model.considerations.map((item) => (
                <li
                  key={item.id}
                  className="grid grid-cols-1 gap-2 py-4 sm:grid-cols-12 sm:gap-5"
                >
                  <div className="sm:col-span-4">
                    <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#5C5B58] dark:text-[#A7A6A3]">
                      {item.category}
                    </p>
                    <h4 className="mt-1 font-display text-sm font-semibold tracking-[-0.015em]">
                      {item.title}
                    </h4>
                  </div>
                  <p className="text-xs leading-[1.68] text-[#34383C] dark:text-[#D8D5CF] sm:col-span-8">
                    {item.detail}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: Sticky Live Architectural Dossier Plate */}
        <aside className="lg:sticky lg:top-28 lg:col-span-5">
          <div className="arch-crosshair glass-steel space-y-6 p-6 text-[#F2F0EC] sm:p-7">
            {/* Dossier Header */}
            <div className="flex items-start justify-between gap-4 border-b border-[#F2F0EC]/14 pb-5">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#A7A6A3]">
                  Live Feasibility Dossier
                </p>
                <h2 className="mt-1 font-display text-xl font-semibold tracking-[-0.02em] text-[#F2F0EC]">
                  {activeProfile.shortLabel} · {input.market}
                </h2>
              </div>
              <span className="border border-[#F2F0EC]/18 bg-[#17191B]/75 px-2.5 py-1 font-mono text-[10px] tabular-nums uppercase tracking-[0.18em] text-[#D8D5CF]">
                {input.squareFeet.toLocaleString()} SF
              </span>
            </div>

            {/* Modeled Investment Band */}
            <div className="space-y-3 border border-[#F2F0EC]/14 bg-[#17191B]/75 p-5">
              <div className="flex items-center justify-between gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[#A7A6A3]">
                <span>Preliminary Investment Band</span>
                <span className="text-[#F2F0EC]/85">
                  {model.investment.mappedBudgetRange}
                </span>
              </div>

              <p className="font-display text-3xl font-semibold tabular-nums tracking-[-0.03em] text-[#F2F0EC] sm:text-4xl">
                {formatCurrencyCompact(model.investment.lowUsd)} –{" "}
                {formatCurrencyCompact(model.investment.highUsd)}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#F2F0EC]/10 pt-3 font-mono text-[10px] tabular-nums tracking-[0.14em] text-[#A7A6A3]">
                <span>
                  {formatCurrencyFull(model.investment.perSqFtLowUsd)} –{" "}
                  {formatCurrencyFull(model.investment.perSqFtHighUsd)} / sq ft
                </span>
                <span className="uppercase">
                  {model.finishTierOption.label}
                </span>
              </div>
            </div>

            {/* Active Spec Ledger Pills */}
            <dl className="grid grid-cols-2 gap-3 border-b border-[#F2F0EC]/14 pb-5 font-mono text-[10px] uppercase tracking-[0.15em]">
              <div className="border border-[#F2F0EC]/12 bg-[#17191B]/50 p-3">
                <dt className="text-[#A7A6A3]">Design Status</dt>
                <dd className="mt-1 text-[#F2F0EC]">
                  {model.designStatusOption.shortLabel}
                </dd>
              </div>
              <div className="border border-[#F2F0EC]/12 bg-[#17191B]/50 p-3">
                <dt className="text-[#A7A6A3]">Structural Triggers</dt>
                <dd className="mt-1 text-[#F2F0EC]">
                  {model.selectedStructuralOptions.length === 0
                    ? "None Selected"
                    : `${model.selectedStructuralOptions.length} Active`}
                </dd>
              </div>
            </dl>

            {/* Interactive 5-Stage Process Gantt Chart */}
            <ProcessGanttBar
              stages={model.schedule.stages}
              totalScaleWeeks={model.schedule.totalScaleWeeks}
              permittingWeeks={model.schedule.permittingWeeks}
              totalWeeksLow={model.schedule.totalWeeksLow}
              totalWeeksHigh={model.schedule.totalWeeksHigh}
              totalMonthsLow={model.schedule.totalMonthsLow}
              totalMonthsHigh={model.schedule.totalMonthsHigh}
            />

            {/* Primary Handoff CTA */}
            <div className="space-y-3 border-t border-[#F2F0EC]/14 pt-5">
              <button
                type="button"
                onClick={handleHandoffToContact}
                className="group flex w-full cursor-pointer items-stretch justify-between border border-[#F2F0EC] bg-[#F2F0EC] text-[#17191B] transition-colors duration-300 hover:border-[#D8D5CF] hover:bg-[#D8D5CF]"
              >
                <span className="flex items-center px-5 py-4 font-mono text-[11px] font-medium uppercase tracking-[0.2em]">
                  Send This Spec to BLACKSTEEL
                </span>
                <span className="flex items-center justify-center border-l border-[#17191B]/15 px-4">
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </span>
              </button>

              <p className="flex items-start gap-2 text-[11px] leading-[1.6] text-[#A7A6A3]">
                <ShieldCheck
                  className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#D8D5CF]"
                  aria-hidden="true"
                />
                <span>
                  Pre-populates your private inquiry on{" "}
                  <span className="font-mono text-[#F2F0EC]">/contact</span>{" "}
                  with this full feasibility breakdown. Ranges are preliminary
                  planning benchmarks—final pricing follows an on-site
                  principal walkthrough.
                </span>
              </p>

              <div className="flex items-center justify-between pt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-[#A7A6A3]">
                <span className="inline-flex items-center gap-1.5">
                  <SlidersHorizontal className="h-3 w-3" aria-hidden="true" />
                  Step {step + 1} of {STEPS.length}
                </span>
                <span>Houston &amp; Austin, TX</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
