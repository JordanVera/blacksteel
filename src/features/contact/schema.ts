import { z } from "zod";

export const PROJECT_LOCATIONS = [
  "Houston",
  "Austin",
  "Other Texas",
] as const;

export const PROJECT_TYPES = [
  "Whole-Home Remodeling",
  "Luxury Kitchen Renovation",
  "Custom Bathroom Renovation",
  "Custom Cabinetry & Millwork",
  "Structural Renovation / Addition",
  "General Contracting",
  "Commercial Tenant Improvement",
  "Property Restoration & Reconstruction",
] as const;

export const BUDGET_RANGES = [
  "$75k – $150k",
  "$150k – $300k",
  "$300k – $600k",
  "$600k+",
  "To Be Determined",
] as const;

export const PROJECT_TIMELINES = [
  "Immediate (1–2 months)",
  "Near Term (3–6 months)",
  "Planning Phase (6–12 months)",
  "Flexible / Exploratory",
] as const;

const optionalTrimmedString = (maxLength: number) =>
  z
    .string()
    .trim()
    .max(maxLength)
    .optional()
    .transform((val) => (val && val.length > 0 ? val : undefined));

export const projectInquirySchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Please enter your full name.")
    .max(120, "Name must be 120 characters or fewer."),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address.")
    .max(160, "Email address is too long."),
  phone: z
    .string()
    .trim()
    .optional()
    .refine(
      (val) => !val || /^[+\d()\-.\s]{7,25}$/.test(val),
      "Please enter a valid phone number or leave this field blank."
    )
    .transform((val) => (val && val.length > 0 ? val : undefined)),
  projectLocation: z.enum(PROJECT_LOCATIONS, {
    error: "Please select your project market.",
  }),
  projectType: z.enum(PROJECT_TYPES, {
    error: "Please select a primary project scope.",
  }),
  budgetRange: z
    .union([z.enum(BUDGET_RANGES), z.literal("")])
    .optional()
    .transform((val) => (val ? val : undefined)),
  timeline: z
    .union([z.enum(PROJECT_TIMELINES), z.literal("")])
    .optional()
    .transform((val) => (val ? val : undefined)),
  projectDescription: z
    .string()
    .trim()
    .min(
      20,
      "Please share at least a brief overview of your space and goals (20+ characters)."
    )
    .max(3000, "Description must be 3,000 characters or fewer."),
  // Hidden honeypot field for spam filtering
  companyWebsite: optionalTrimmedString(200),
});

export type ProjectInquiryInput = z.input<typeof projectInquirySchema>;
export type ProjectInquiryParsed = z.output<typeof projectInquirySchema>;

export interface ProjectInquiryResponse {
  status: "received_demo" | "delivered";
  referenceId: string;
  deliveryConfigured: boolean;
  message: string;
}
