import { PROCESS_STAGES } from "@/content/process";
import { LOCATION_MARKETS } from "@/content/locations";
import type {
  BUDGET_RANGES,
  PROJECT_TIMELINES,
} from "@/features/contact/schema";
import {
  scopeModelInputSchema,
  type DesignStatusKey,
  type FinishTierKey,
  type ScopeDiscipline,
  type ScopeMarket,
  type ScopeModelInput,
  type ScopeSpecSummary,
  type StructuralChangeKey,
} from "./schema";

export const SCOPE_STORAGE_KEY = "blacksteel:scope-spec:v1";

type BudgetRangeOption = (typeof BUDGET_RANGES)[number];
type TimelineOption = (typeof PROJECT_TIMELINES)[number];

export interface DisciplineProfile {
  discipline: ScopeDiscipline;
  code: string;
  shortLabel: string;
  eyebrow: string;
  summary: string;
  minSqFt: number;
  maxSqFt: number;
  defaultSqFt: number;
  stepSqFt: number;
  presets: readonly { label: string; sqFt: number }[];
  baseRateLow: number;
  baseRateHigh: number;
  baseFixedLow: number;
  baseFixedHigh: number;
  baseBuildWeeks: number;
  weeksPerThousandSqFt: number;
  basePermitWeeks: number;
  keyScopeIncludes: readonly string[];
}

export const DISCIPLINE_PROFILES: Record<ScopeDiscipline, DisciplineProfile> = {
  "Luxury Kitchen Renovation": {
    discipline: "Luxury Kitchen Renovation",
    code: "DISC-01",
    shortLabel: "Kitchen & Millwork",
    eyebrow: "Culinary Architecture",
    summary:
      "Bespoke cabinetry elevations, bookmatched stone slabs, integrated appliances, and architectural lighting.",
    minSqFt: 180,
    maxSqFt: 900,
    defaultSqFt: 380,
    stepSqFt: 20,
    presets: [
      { label: "Compact · 240 sf", sqFt: 240 },
      { label: "Estate · 380 sf", sqFt: 380 },
      { label: "Chef + Scullery · 620 sf", sqFt: 620 },
    ],
    baseRateLow: 225,
    baseRateHigh: 315,
    baseFixedLow: 42000,
    baseFixedHigh: 58000,
    baseBuildWeeks: 10,
    weeksPerThousandSqFt: 7,
    basePermitWeeks: 3,
    keyScopeIncludes: [
      "Full custom millwork shop drawings & slab layout coordination",
      "MEP rough-ins, concealed ventilation & architectural lighting scenes",
      "Dust containment & adjacent finished-space protection",
    ],
  },
  "Custom Bathroom Renovation": {
    discipline: "Custom Bathroom Renovation",
    code: "DISC-02",
    shortLabel: "Bath Sanctuary",
    eyebrow: "Wet-Room Precision",
    summary:
      "Curbless monolithic stone wet rooms, architectural plumbing fixtures, waterproofing assemblies, and custom vanities.",
    minSqFt: 80,
    maxSqFt: 450,
    defaultSqFt: 180,
    stepSqFt: 10,
    presets: [
      { label: "Guest Suite · 110 sf", sqFt: 110 },
      { label: "Primary · 180 sf", sqFt: 180 },
      { label: "Spa Wet-Room · 320 sf", sqFt: 320 },
    ],
    baseRateLow: 295,
    baseRateHigh: 410,
    baseFixedLow: 32000,
    baseFixedHigh: 44000,
    baseBuildWeeks: 8,
    weeksPerThousandSqFt: 12,
    basePermitWeeks: 2,
    keyScopeIncludes: [
      "Continuous flood-tested waterproofing & curbless floor sloping",
      "Bookmatched stone wall panels & frameless architectural glass",
      "Dedicated humidity extraction & heated-floor integration",
    ],
  },
  "Whole-Home Remodeling": {
    discipline: "Whole-Home Remodeling",
    code: "DISC-03",
    shortLabel: "Whole-Home Remodel",
    eyebrow: "Comprehensive Transformation",
    summary:
      "Cohesive multi-room architectural reimagining—reconfiguring circulation, millwork, glazing, and mechanical systems.",
    minSqFt: 1500,
    maxSqFt: 6500,
    defaultSqFt: 3000,
    stepSqFt: 100,
    presets: [
      { label: "Residence · 2,200 sf", sqFt: 2200 },
      { label: "Estate · 3,200 sf", sqFt: 3200 },
      { label: "Compound · 5,000 sf", sqFt: 5000 },
    ],
    baseRateLow: 155,
    baseRateHigh: 225,
    baseFixedLow: 55000,
    baseFixedHigh: 78000,
    baseBuildWeeks: 20,
    weeksPerThousandSqFt: 5,
    basePermitWeeks: 6,
    keyScopeIncludes: [
      "Unified architectural language across kitchens, baths, flooring & trim",
      "Coordinated electrical, plumbing & balanced HVAC upgrades",
      "Master scheduling across specialty stone, steel & millwork trades",
    ],
  },
  "Structural Renovation / Addition": {
    discipline: "Structural Renovation / Addition",
    code: "DISC-04",
    shortLabel: "Structural Addition",
    eyebrow: "Ground-Up & Steel Framing",
    summary:
      "New conditioned square footage, foundation tie-ins, structural steel spans, and seamless roofline integration.",
    minSqFt: 400,
    maxSqFt: 2500,
    defaultSqFt: 950,
    stepSqFt: 50,
    presets: [
      { label: "Pavilion · 600 sf", sqFt: 600 },
      { label: "Primary Wing · 950 sf", sqFt: 950 },
      { label: "Two-Story · 1,650 sf", sqFt: 1650 },
    ],
    baseRateLow: 285,
    baseRateHigh: 395,
    baseFixedLow: 64000,
    baseFixedHigh: 90000,
    baseBuildWeeks: 18,
    weeksPerThousandSqFt: 8,
    basePermitWeeks: 8,
    keyScopeIncludes: [
      "Geotechnical, foundation engineering & structural steel coordination",
      "Municipal zoning, impervious cover & architectural plan review",
      "Weather-tight exterior envelope tie-in & interior finish completion",
    ],
  },
};

export interface StructuralChangeOption {
  key: StructuralChangeKey;
  code: string;
  label: string;
  shortLabel: string;
  description: string;
  costLow: number;
  costHigh: number;
  permitWeeksDelta: number;
  buildWeeksDelta: number;
  engineeringTrigger: string;
}

export const STRUCTURAL_CHANGE_OPTIONS: readonly StructuralChangeOption[] = [
  {
    key: "openSpanSteel",
    code: "STR-01",
    label: "Load-Bearing Steel Beam & Open-Span Framing",
    shortLabel: "Steel Beam / Open-Span",
    description:
      "Removing structural partitions with flush or expressed blackened steel beams and point-load footings.",
    costLow: 18000,
    costHigh: 42000,
    permitWeeksDelta: 2,
    buildWeeksDelta: 3,
    engineeringTrigger:
      "Requires Texas PE structural calculations, steel shop fabrication lead time (3–5 weeks), and temporary shoring.",
  },
  {
    key: "slabOrFoundation",
    code: "STR-02",
    label: "Slab Saw-Cut, Piering & Foundation Modification",
    shortLabel: "Slab & Foundation Work",
    description:
      "Sub-slab plumbing relocation, drilled piers, grade beams, or new concrete foundation tie-ins.",
    costLow: 16000,
    costHigh: 38000,
    permitWeeksDelta: 2,
    buildWeeksDelta: 3,
    engineeringTrigger:
      "Requires geotechnical verification, post-tension cable scanning (where applicable), and city foundation inspection prior to pour.",
  },
  {
    key: "mepRelocation",
    code: "STR-03",
    label: "Major MEP, Electrical Service & HVAC Re-Engineering",
    shortLabel: "MEP & HVAC Re-Engineering",
    description:
      "Dedicated dehumidification, Manual J load redesign, 400A service upgrade, or full plumbing stack rerouting.",
    costLow: 14000,
    costHigh: 34000,
    permitWeeksDelta: 1,
    buildWeeksDelta: 2,
    engineeringTrigger:
      "Triggers coordinated mechanical, electrical, and plumbing rough-in inspections plus utility load confirmation.",
  },
  {
    key: "envelopeGlazing",
    code: "STR-04",
    label: "Exterior Envelope & Architectural Glazing Openings",
    shortLabel: "Envelope & Glazing",
    description:
      "Multi-slide pocket doors, thermally broken steel-look fenestration, or masonry facade re-engineering.",
    costLow: 24000,
    costHigh: 62000,
    permitWeeksDelta: 2,
    buildWeeksDelta: 3,
    engineeringTrigger:
      "Custom glazing systems typically carry 10–14 week factory fabrication lead times—locked early during Design & Plan.",
  },
] as const;

export interface FinishTierOption {
  key: FinishTierKey;
  code: string;
  label: string;
  subtitle: string;
  multiplier: number;
  procurementWeeksDelta: number;
  materialCues: readonly string[];
}

export const FINISH_TIER_OPTIONS: readonly FinishTierOption[] = [
  {
    key: "architectural",
    code: "FIN-01",
    label: "Architectural Standard",
    subtitle: "Clean geometry, disciplined tolerances & refined materiality",
    multiplier: 1.0,
    procurementWeeksDelta: 0,
    materialCues: [
      "Semi-custom architectural cabinetry",
      "Honed quartz or porcelain surfaces",
      "Recessed trimless LED lighting",
    ],
  },
  {
    key: "bespoke",
    code: "FIN-02",
    label: "Bespoke Millwork & Stone",
    subtitle: "Site-built custom cabinetry, natural stone & metal accents",
    multiplier: 1.24,
    procurementWeeksDelta: 2,
    materialCues: [
      "Rift-sawn white oak / walnut custom millwork",
      "Bookmatched natural quartzite or marble slabs",
      "Blackened steel & unlacquered brass hardware",
    ],
  },
  {
    key: "collector",
    code: "FIN-03",
    label: "Collector-Grade Signature",
    subtitle: "Museum-grade finishes, custom fabrication & architectural glazing",
    multiplier: 1.52,
    procurementWeeksDelta: 4,
    materialCues: [
      "Imported monolithic stone & lime/tadelakt plaster",
      "Bespoke blackened steel & bronze fabrication",
      "Integrated Lutron scenes & concealed architectural fixtures",
    ],
  },
] as const;

export interface DesignStatusOption {
  key: DesignStatusKey;
  label: string;
  shortLabel: string;
  detail: string;
  designWeeksDelta: number;
}

export const DESIGN_STATUS_OPTIONS: readonly DesignStatusOption[] = [
  {
    key: "concept",
    label: "Early Concept / No Drawings Yet",
    shortLabel: "Concept Stage",
    detail:
      "Includes full architectural & interior design coordination prior to permitting.",
    designWeeksDelta: 4,
  },
  {
    key: "architectEngaged",
    label: "Architect or Designer Engaged",
    shortLabel: "Design In Progress",
    detail:
      "Schematic layouts underway; BLACKSTEEL joins for pre-construction & constructability.",
    designWeeksDelta: 1,
  },
  {
    key: "plansReady",
    label: "Permit-Ready Drawings Complete",
    shortLabel: "Plans Ready",
    detail:
      "Architectural & structural sets are ready for final pricing, permitting & procurement.",
    designWeeksDelta: -3,
  },
] as const;

export interface ModeledTimelineStage {
  number: string;
  slug: string;
  title: string;
  subtitle: string;
  startWeek: number;
  endWeek: number;
  durationWeeks: number;
  focusNote: string;
  deliverables: readonly string[];
  tag: "Pre-Construction" | "Permitting & Procurement" | "Field Execution" | "Closeout";
}

export interface ArchitecturalConsideration {
  id: string;
  category: "Regional Climate & Site" | "Permitting & Engineering" | "Execution Standard";
  title: string;
  detail: string;
}

export interface ScopeModelOutput {
  input: ScopeModelInput;
  profile: DisciplineProfile;
  finishTierOption: FinishTierOption;
  designStatusOption: DesignStatusOption;
  selectedStructuralOptions: StructuralChangeOption[];
  investment: {
    lowUsd: number;
    highUsd: number;
    perSqFtLowUsd: number;
    perSqFtHighUsd: number;
    mappedBudgetRange: BudgetRangeOption;
    recommendedTimeline: TimelineOption;
  };
  schedule: {
    totalWeeksLow: number;
    totalWeeksHigh: number;
    totalMonthsLow: number;
    totalMonthsHigh: number;
    permittingWeeks: number;
    totalScaleWeeks: number;
    stages: ModeledTimelineStage[];
  };
  considerations: ArchitecturalConsideration[];
}

export const DEFAULT_SCOPE_INPUT: ScopeModelInput = {
  market: "Houston",
  discipline: "Luxury Kitchen Renovation",
  squareFeet: DISCIPLINE_PROFILES["Luxury Kitchen Renovation"].defaultSqFt,
  structuralChanges: ["openSpanSteel"],
  finishTier: "bespoke",
  designStatus: "concept",
};

function roundToNearest(value: number, step: number): number {
  return Math.round(value / step) * step;
}

export function formatCurrencyCompact(usd: number): string {
  if (usd >= 1_000_000) {
    const millions = usd / 1_000_000;
    return `$${millions.toFixed(millions >= 10 ? 1 : 2).replace(/\.00$/, "")}M`;
  }
  return `$${Math.round(usd / 1000).toLocaleString("en-US")}k`;
}

export function formatCurrencyFull(usd: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(usd);
}

function mapBudgetRange(lowUsd: number, highUsd: number): BudgetRangeOption {
  const midpoint = (lowUsd + highUsd) / 2;
  if (midpoint < 150_000) return "$75k – $150k";
  if (midpoint < 300_000) return "$150k – $300k";
  if (midpoint < 600_000) return "$300k – $600k";
  return "$600k+";
}

function mapRecommendedTimeline(
  designStatus: DesignStatusKey,
  totalWeeksHigh: number
): TimelineOption {
  if (designStatus === "plansReady") return "Immediate (1–2 months)";
  if (designStatus === "architectEngaged" || totalWeeksHigh <= 28) {
    return "Near Term (3–6 months)";
  }
  return "Planning Phase (6–12 months)";
}

export function clampSqFtForDiscipline(
  discipline: ScopeDiscipline,
  sqFt: number
): number {
  const profile = DISCIPLINE_PROFILES[discipline];
  const clamped = Math.max(profile.minSqFt, Math.min(profile.maxSqFt, sqFt));
  return roundToNearest(clamped, profile.stepSqFt);
}

export function calculateScopeModel(rawInput: ScopeModelInput): ScopeModelOutput {
  const profile = DISCIPLINE_PROFILES[rawInput.discipline];
  const normalizedSqFt = clampSqFtForDiscipline(
    rawInput.discipline,
    rawInput.squareFeet
  );
  const input: ScopeModelInput = {
    ...rawInput,
    squareFeet: normalizedSqFt,
  };

  const finishTierOption =
    FINISH_TIER_OPTIONS.find((item) => item.key === input.finishTier) ??
    FINISH_TIER_OPTIONS[1]!;

  const designStatusOption =
    DESIGN_STATUS_OPTIONS.find((item) => item.key === input.designStatus) ??
    DESIGN_STATUS_OPTIONS[0]!;

  const selectedStructuralOptions = STRUCTURAL_CHANGE_OPTIONS.filter((opt) =>
    input.structuralChanges.includes(opt.key)
  );

  // Market calibration: Austin labor/permitting slightly higher on complex hillside & infill sites
  const marketMultiplier = input.market === "Austin" ? 1.06 : 1.0;

  // Investment Calculation
  const areaBaseLow =
    profile.baseFixedLow + input.squareFeet * profile.baseRateLow;
  const areaBaseHigh =
    profile.baseFixedHigh + input.squareFeet * profile.baseRateHigh;

  const structuralLow = selectedStructuralOptions.reduce(
    (sum, item) => sum + item.costLow,
    0
  );
  const structuralHigh = selectedStructuralOptions.reduce(
    (sum, item) => sum + item.costHigh,
    0
  );

  // Scale structural impact modestly for larger footprints
  const structuralScale =
    input.discipline === "Whole-Home Remodeling"
      ? 1 + Math.max(0, (input.squareFeet - 2200) / 5000) * 0.45
      : 1;

  const rawLow =
    (areaBaseLow * finishTierOption.multiplier +
      structuralLow * structuralScale) *
    marketMultiplier;
  const rawHigh =
    (areaBaseHigh * finishTierOption.multiplier +
      structuralHigh * structuralScale) *
    marketMultiplier;

  const lowUsd = Math.max(75000, roundToNearest(rawLow, 5000));
  const highUsd = Math.max(lowUsd + 25000, roundToNearest(rawHigh, 5000));

  const perSqFtLowUsd = Math.round(lowUsd / input.squareFeet);
  const perSqFtHighUsd = Math.round(highUsd / input.squareFeet);

  // Schedule & 5-Stage Process Gantt Calculation
  const marketPermitDelta = input.market === "Austin" ? 3 : 1;
  const structuralPermitDelta = selectedStructuralOptions.reduce(
    (sum, item) => sum + item.permitWeeksDelta,
    0
  );
  const structuralBuildDelta = selectedStructuralOptions.reduce(
    (sum, item) => sum + item.buildWeeksDelta,
    0
  );

  const discoverWeeks = input.designStatus === "plansReady" ? 1 : 2;
  const defineWeeks =
    input.designStatus === "plansReady"
      ? 2
      : input.discipline === "Whole-Home Remodeling" ||
          input.discipline === "Structural Renovation / Addition"
        ? 4
        : 3;

  const permittingWeeks = Math.max(
    2,
    profile.basePermitWeeks + marketPermitDelta + Math.min(5, structuralPermitDelta)
  );

  const designAndPlanWeeks = Math.max(
    4,
    permittingWeeks +
      Math.max(0, designStatusOption.designWeeksDelta) +
      finishTierOption.procurementWeeksDelta +
      (input.designStatus === "plansReady" ? -1 : 2)
  );

  const areaBuildWeeks = Math.round(
    (input.squareFeet / 1000) * profile.weeksPerThousandSqFt
  );
  const tierCraftWeeks =
    input.finishTier === "collector" ? 4 : input.finishTier === "bespoke" ? 2 : 0;

  const executeWeeks = Math.max(
    8,
    profile.baseBuildWeeks +
      areaBuildWeeks +
      structuralBuildDelta +
      tierCraftWeeks
  );

  const refineWeeks =
    input.discipline === "Whole-Home Remodeling" ||
    input.discipline === "Structural Renovation / Addition"
      ? 3
      : 2;

  // Build Gantt intervals mapped directly onto PROCESS_STAGES (with realistic overlap on pre-construction/mobilization)
  const s1Start = 0;
  const s1End = s1Start + discoverWeeks;

  const s2Start = Math.max(1, s1End - 1);
  const s2End = s2Start + defineWeeks;

  const s3Start = Math.max(s2Start + 1, s2End - 1);
  const s3End = s3Start + designAndPlanWeeks;

  // Mobilization & long-lead procurement overlap slightly with final permit clearance
  const s4Start = Math.max(s3Start + 2, s3End - 2);
  const s4End = s4Start + executeWeeks;

  const s5Start = Math.max(s4Start + 2, s4End - 1);
  const s5End = s5Start + refineWeeks;

  const stageSpecs: {
    startWeek: number;
    endWeek: number;
    durationWeeks: number;
    focusNote: string;
    tag: ModeledTimelineStage["tag"];
  }[] = [
    {
      startWeek: s1Start,
      endWeek: s1End,
      durationWeeks: discoverWeeks,
      tag: "Pre-Construction",
      focusNote: `On-site ${input.market} architectural walkthrough, spatial survey, and structural condition review.`,
    },
    {
      startWeek: s2Start,
      endWeek: s2End,
      durationWeeks: defineWeeks,
      tag: "Pre-Construction",
      focusNote:
        selectedStructuralOptions.length > 0
          ? `Feasibility budget lock, structural engineering scope (${selectedStructuralOptions.length} technical ${selectedStructuralOptions.length === 1 ? "trigger" : "triggers"}), and constructability audit.`
          : "Written scope architecture, preliminary budget lock, and trade constructability review.",
    },
    {
      startWeek: s3Start,
      endWeek: s3End,
      durationWeeks: designAndPlanWeeks,
      tag: "Permitting & Procurement",
      focusNote: `${input.market} permitting pathway (~${permittingWeeks} wks), millwork shop drawings, and ${finishTierOption.label.toLowerCase()} long-lead procurement.`,
    },
    {
      startWeek: s4Start,
      endWeek: s4End,
      durationWeeks: executeWeeks,
      tag: "Field Execution",
      focusNote:
        selectedStructuralOptions.length > 0
          ? "Protected containment, structural framing & inspections, MEP rough-ins, waterproofing, and custom architectural finishes."
          : "Protected containment, precision MEP rough-ins, millwork installation, and stone & lighting craftsmanship.",
    },
    {
      startWeek: s5Start,
      endWeek: s5End,
      durationWeeks: refineWeeks,
      tag: "Closeout",
      focusNote:
        "Daylight & evening finish inspection, mechanical/lighting commissioning, and principal handover dossier.",
    },
  ];

  const stages: ModeledTimelineStage[] = PROCESS_STAGES.map((stage, idx) => {
    const spec = stageSpecs[idx] ?? stageSpecs[stageSpecs.length - 1]!;
    return {
      number: stage.number,
      slug: stage.slug,
      title: stage.title,
      subtitle: stage.subtitle,
      startWeek: spec.startWeek,
      endWeek: spec.endWeek,
      durationWeeks: spec.durationWeeks,
      focusNote: spec.focusNote,
      deliverables: stage.deliverables,
      tag: spec.tag,
    };
  });

  const totalScaleWeeks = s5End;
  const totalWeeksLow = Math.max(10, totalScaleWeeks - 2);
  const totalWeeksHigh = totalScaleWeeks + 3;
  const totalMonthsLow = Math.max(2.5, Math.round((totalWeeksLow / 4.33) * 2) / 2);
  const totalMonthsHigh = Math.round((totalWeeksHigh / 4.33) * 2) / 2;

  // Dynamic Architectural & Regional Considerations
  const marketData =
    LOCATION_MARKETS[input.market === "Houston" ? "houston" : "austin"];

  const considerations: ArchitecturalConsideration[] = [
    {
      id: `market-${marketData.slug}-0`,
      category: "Regional Climate & Site",
      title: marketData.architecturalFocus[0]?.title ?? `${input.market} Envelope`,
      detail: marketData.architecturalFocus[0]?.detail ?? "",
    },
    {
      id: `market-${marketData.slug}-1`,
      category: "Regional Climate & Site",
      title: marketData.architecturalFocus[1]?.title ?? `${input.market} Structure`,
      detail: marketData.architecturalFocus[1]?.detail ?? "",
    },
    {
      id: `permitting-${marketData.slug}`,
      category: "Permitting & Engineering",
      title:
        input.market === "Houston"
          ? "Houston & Independent Village Permitting"
          : "City of Austin Plan Review & Tree Protection",
      detail:
        input.market === "Houston"
          ? "Coordinating City of Houston plan review—or separate municipal & architectural reviews in Memorial Villages, West University, and Bellaire—plus HOA approval where applicable."
          : "Accounting for Austin Residential Plan Review cycles, impervious cover limits, and heritage live oak canopy protection across Westlake, Tarrytown, and Central Austin.",
    },
  ];

  for (const structural of selectedStructuralOptions.slice(0, 2)) {
    considerations.push({
      id: `structural-${structural.key}`,
      category: "Permitting & Engineering",
      title: structural.shortLabel,
      detail: structural.engineeringTrigger,
    });
  }

  considerations.push({
    id: `finish-${finishTierOption.key}`,
    category: "Execution Standard",
    title: `${finishTierOption.label} Procurement Window`,
    detail:
      input.finishTier === "collector"
        ? "Monolithic stone slabs, custom metal fabrication, and architectural glazing are reserved immediately after Define to protect the construction critical path."
        : input.finishTier === "bespoke"
          ? "Custom cabinetry shop drawings and natural stone slab selections are locked during Design & Plan so field execution stays uninterrupted."
          : "Streamlined architectural material palette allows accelerated procurement and crisp schedule predictability.",
  });

  return {
    input,
    profile,
    finishTierOption,
    designStatusOption,
    selectedStructuralOptions,
    investment: {
      lowUsd,
      highUsd,
      perSqFtLowUsd,
      perSqFtHighUsd,
      mappedBudgetRange: mapBudgetRange(lowUsd, highUsd),
      recommendedTimeline: mapRecommendedTimeline(
        input.designStatus,
        totalWeeksHigh
      ),
    },
    schedule: {
      totalWeeksLow,
      totalWeeksHigh,
      totalMonthsLow,
      totalMonthsHigh,
      permittingWeeks,
      totalScaleWeeks,
      stages,
    },
    considerations,
  };
}

export function buildScopeSpecSummary(
  model: ScopeModelOutput
): ScopeSpecSummary {
  return {
    market: model.input.market,
    discipline: model.input.discipline,
    squareFeet: model.input.squareFeet,
    structuralChanges: model.input.structuralChanges,
    structuralLabels: model.selectedStructuralOptions.map((item) => item.label),
    finishTier: model.input.finishTier,
    finishTierLabel: model.finishTierOption.label,
    designStatus: model.input.designStatus,
    designStatusLabel: model.designStatusOption.label,
    investmentLowUsd: model.investment.lowUsd,
    investmentHighUsd: model.investment.highUsd,
    perSqFtLowUsd: model.investment.perSqFtLowUsd,
    perSqFtHighUsd: model.investment.perSqFtHighUsd,
    mappedBudgetRange: model.investment.mappedBudgetRange,
    totalWeeksLow: model.schedule.totalWeeksLow,
    totalWeeksHigh: model.schedule.totalWeeksHigh,
    permittingWeeks: model.schedule.permittingWeeks,
    stages: model.schedule.stages.map((stage) => ({
      number: stage.number,
      slug: stage.slug,
      title: stage.title,
      startWeek: stage.startWeek,
      endWeek: stage.endWeek,
      durationWeeks: stage.durationWeeks,
      focusNote: stage.focusNote,
    })),
    architecturalNotes: model.considerations.map(
      (note) => `${note.title}: ${note.detail}`
    ),
  };
}

export function buildInquiryStarterDescription(
  model: ScopeModelOutput
): string {
  const structuralText =
    model.selectedStructuralOptions.length > 0
      ? model.selectedStructuralOptions.map((item) => item.shortLabel).join(", ")
      : "No major structural modifications anticipated";

  return [
    `Modeled ${model.input.discipline} in ${model.input.market}, TX (~${model.input.squareFeet.toLocaleString("en-US")} sq. ft.).`,
    `Finish tier: ${model.finishTierOption.label}. Design status: ${model.designStatusOption.label}.`,
    `Structural & technical scope: ${structuralText}.`,
    `Preliminary modeled range: ${formatCurrencyCompact(model.investment.lowUsd)} – ${formatCurrencyCompact(model.investment.highUsd)} over ~${model.schedule.totalWeeksLow}–${model.schedule.totalWeeksHigh} weeks.`,
    "Additional neighborhood or architectural goals: ",
  ].join(" ");
}

export function buildPlainTextSpecClipboard(model: ScopeModelOutput): string {
  const structuralLines =
    model.selectedStructuralOptions.length > 0
      ? model.selectedStructuralOptions.map((s) => `  - ${s.label}`).join("\n")
      : "  - None selected";

  const stageLines = model.schedule.stages
    .map(
      (s) =>
        `  [${s.number}] ${s.title}: Weeks ${s.startWeek + 1}–${s.endWeek} (${s.durationWeeks} wks)`
    )
    .join("\n");

  return [
    "BLACKSTEEL — PRELIMINARY FEASIBILITY & SCOPE SPEC",
    `Market: ${model.input.market}, Texas`,
    `Discipline: ${model.input.discipline}`,
    `Approximate Footprint: ${model.input.squareFeet.toLocaleString("en-US")} sq. ft.`,
    `Finish Tier: ${model.finishTierOption.label}`,
    `Design Status: ${model.designStatusOption.label}`,
    `Modeled Investment Band: ${formatCurrencyFull(model.investment.lowUsd)} – ${formatCurrencyFull(model.investment.highUsd)} (${formatCurrencyFull(model.investment.perSqFtLowUsd)}–${formatCurrencyFull(model.investment.perSqFtHighUsd)}/sf)`,
    `Estimated Total Duration: ${model.schedule.totalWeeksLow}–${model.schedule.totalWeeksHigh} weeks (~${model.schedule.totalMonthsLow}–${model.schedule.totalMonthsHigh} months, incl. ~${model.schedule.permittingWeeks} wks permitting)`,
    "Structural & Site Scope:",
    structuralLines,
    "5-Stage Delivery Schedule:",
    stageLines,
  ].join("\n");
}

const MARKET_SHORT: Record<ScopeMarket, string> = {
  Houston: "hou",
  Austin: "atx",
};
const MARKET_FROM_SHORT: Record<string, ScopeMarket> = {
  hou: "Houston",
  atx: "Austin",
};

const DISC_SHORT: Record<ScopeDiscipline, string> = {
  "Luxury Kitchen Renovation": "kitchen",
  "Custom Bathroom Renovation": "bath",
  "Whole-Home Remodeling": "whole",
  "Structural Renovation / Addition": "addition",
};
const DISC_FROM_SHORT: Record<string, ScopeDiscipline> = {
  kitchen: "Luxury Kitchen Renovation",
  bath: "Custom Bathroom Renovation",
  whole: "Whole-Home Remodeling",
  addition: "Structural Renovation / Addition",
};

export function encodeScopeSpecToQuery(input: ScopeModelInput): string {
  const params = new URLSearchParams();
  params.set("m", MARKET_SHORT[input.market]);
  params.set("d", DISC_SHORT[input.discipline]);
  params.set("sf", String(input.squareFeet));
  params.set("f", input.finishTier);
  params.set("ds", input.designStatus);
  if (input.structuralChanges.length > 0) {
    params.set("s", input.structuralChanges.join(","));
  }
  return params.toString();
}

export function decodeScopeSpecFromSearchParams(
  searchParams:
    | URLSearchParams
    | Record<string, string | string[] | undefined>
): ScopeModelInput | null {
  const get = (key: string): string | undefined => {
    if (searchParams instanceof URLSearchParams) {
      return searchParams.get(key) ?? undefined;
    }
    const raw = searchParams[key];
    return Array.isArray(raw) ? raw[0] : raw;
  };

  const m = get("m");
  const d = get("d");
  const sf = get("sf");
  const f = get("f");
  const ds = get("ds");

  if (!m || !d || !sf) return null;

  const market = MARKET_FROM_SHORT[m];
  const discipline = DISC_FROM_SHORT[d];
  const squareFeet = Number.parseInt(sf, 10);
  const structuralRaw = get("s");
  const structuralChanges = structuralRaw
    ? structuralRaw.split(",").filter(Boolean)
    : [];

  const parsed = scopeModelInputSchema.safeParse({
    market,
    discipline,
    squareFeet,
    finishTier: f ?? "bespoke",
    designStatus: ds ?? "concept",
    structuralChanges,
  });

  if (!parsed.success) return null;
  return {
    ...parsed.data,
    squareFeet: clampSqFtForDiscipline(
      parsed.data.discipline,
      parsed.data.squareFeet
    ),
  };
}
