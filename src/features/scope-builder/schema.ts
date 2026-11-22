import { z } from "zod";

export const SCOPE_MARKETS = ["Houston", "Austin"] as const;
export type ScopeMarket = (typeof SCOPE_MARKETS)[number];

export const SCOPE_DISCIPLINES = [
  "Luxury Kitchen Renovation",
  "Custom Bathroom Renovation",
  "Whole-Home Remodeling",
  "Structural Renovation / Addition",
] as const;
export type ScopeDiscipline = (typeof SCOPE_DISCIPLINES)[number];

export const STRUCTURAL_CHANGE_KEYS = [
  "openSpanSteel",
  "slabOrFoundation",
  "mepRelocation",
  "envelopeGlazing",
] as const;
export type StructuralChangeKey = (typeof STRUCTURAL_CHANGE_KEYS)[number];

export const FINISH_TIER_KEYS = [
  "architectural",
  "bespoke",
  "collector",
] as const;
export type FinishTierKey = (typeof FINISH_TIER_KEYS)[number];

export const DESIGN_STATUS_KEYS = [
  "concept",
  "architectEngaged",
  "plansReady",
] as const;
export type DesignStatusKey = (typeof DESIGN_STATUS_KEYS)[number];

export const scopeModelInputSchema = z.object({
  market: z.enum(SCOPE_MARKETS),
  discipline: z.enum(SCOPE_DISCIPLINES),
  squareFeet: z.number().int().min(80).max(8000),
  structuralChanges: z.array(z.enum(STRUCTURAL_CHANGE_KEYS)).max(4),
  finishTier: z.enum(FINISH_TIER_KEYS),
  designStatus: z.enum(DESIGN_STATUS_KEYS),
});

export type ScopeModelInput = z.infer<typeof scopeModelInputSchema>;

export const scopeTimelineStageSummarySchema = z.object({
  number: z.string().max(8),
  slug: z.string().max(40),
  title: z.string().max(60),
  startWeek: z.number().int().min(0).max(200),
  endWeek: z.number().int().min(1).max(200),
  durationWeeks: z.number().int().min(1).max(120),
  focusNote: z.string().max(240),
});

export const scopeSpecSummarySchema = z.object({
  market: z.enum(SCOPE_MARKETS),
  discipline: z.enum(SCOPE_DISCIPLINES),
  squareFeet: z.number().int().min(80).max(8000),
  structuralChanges: z.array(z.enum(STRUCTURAL_CHANGE_KEYS)).max(4),
  structuralLabels: z.array(z.string().max(120)).max(4),
  finishTier: z.enum(FINISH_TIER_KEYS),
  finishTierLabel: z.string().max(80),
  designStatus: z.enum(DESIGN_STATUS_KEYS),
  designStatusLabel: z.string().max(80),
  investmentLowUsd: z.number().int().positive(),
  investmentHighUsd: z.number().int().positive(),
  perSqFtLowUsd: z.number().int().positive(),
  perSqFtHighUsd: z.number().int().positive(),
  mappedBudgetRange: z.string().max(60),
  totalWeeksLow: z.number().int().positive().max(200),
  totalWeeksHigh: z.number().int().positive().max(200),
  permittingWeeks: z.number().int().min(0).max(60),
  stages: z.array(scopeTimelineStageSummarySchema).min(1).max(8),
  architecturalNotes: z.array(z.string().max(240)).max(8),
});

export type ScopeSpecSummary = z.infer<typeof scopeSpecSummarySchema>;
