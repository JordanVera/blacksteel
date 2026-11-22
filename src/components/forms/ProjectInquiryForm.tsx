"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import {
  AlertCircle,
  ArrowUpRight,
  CheckCircle2,
  SlidersHorizontal,
  X,
} from "lucide-react";
import {
  BUDGET_RANGES,
  PROJECT_LOCATIONS,
  PROJECT_TIMELINES,
  PROJECT_TYPES,
  projectInquirySchema,
  type ProjectInquiryInput,
  type ProjectInquiryResponse,
} from "@/features/contact/schema";
import {
  buildInquiryStarterDescription,
  buildScopeSpecSummary,
  calculateScopeModel,
  encodeScopeSpecToQuery,
  formatCurrencyCompact,
} from "@/features/scope-builder/engine";
import { useSavedScopeSpec } from "@/features/scope-builder/storage";
import type { ScopeModelInput } from "@/features/scope-builder/schema";
import { useTRPC } from "@/server/trpc/client";
import { cn } from "@/lib/utils";

const FIELD_CLASSES =
  "w-full border border-[#17191B]/20 bg-[#F2F0EC]/70 px-4 py-3.5 text-sm text-[#17191B] placeholder:text-[#5C5B58]/70 transition-colors focus:border-[#17191B] focus:outline-none dark:border-[#A7A6A3]/28 dark:bg-[#17191B]/75 dark:text-[#F2F0EC] dark:placeholder:text-[#A7A6A3]/60 dark:focus:border-[#F2F0EC]";

const LABEL_CLASSES =
  "block text-[11px] font-medium uppercase tracking-[0.18em] text-[#34383C] dark:text-[#D8D5CF]";

interface ProjectInquiryFormProps {
  initialScopeInput?: ScopeModelInput | null;
}

export function ProjectInquiryForm({
  initialScopeInput = null,
}: ProjectInquiryFormProps) {
  const trpc = useTRPC();
  const [submissionResult, setSubmissionResult] =
    useState<ProjectInquiryResponse | null>(null);
  const [submittedWithSpec, setSubmittedWithSpec] = useState(false);
  const [attachedScopeInput, setAttachedScopeInput] =
    useState<ScopeModelInput | null>(initialScopeInput);
  const [dismissedSessionSpec, setDismissedSessionSpec] = useState(false);

  const sessionSpecFromStorage = useSavedScopeSpec();
  const savedSessionSpec =
    !attachedScopeInput && !initialScopeInput && !dismissedSessionSpec
      ? sessionSpecFromStorage
      : null;

  const attachedModel = useMemo(
    () => (attachedScopeInput ? calculateScopeModel(attachedScopeInput) : null),
    [attachedScopeInput]
  );

  const initialModel = useMemo(
    () => (initialScopeInput ? calculateScopeModel(initialScopeInput) : null),
    [initialScopeInput]
  );

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<ProjectInquiryInput>({
    resolver: zodResolver(projectInquirySchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      projectLocation: initialModel ? initialModel.input.market : "Houston",
      projectType: initialModel
        ? initialModel.input.discipline
        : "Whole-Home Remodeling",
      budgetRange: initialModel
        ? initialModel.investment.mappedBudgetRange
        : "",
      timeline: initialModel
        ? initialModel.investment.recommendedTimeline
        : "",
      projectDescription: initialModel
        ? buildInquiryStarterDescription(initialModel)
        : "",
      companyWebsite: "",
    },
  });

  const applyScopeToForm = (scopeInput: ScopeModelInput) => {
    const model = calculateScopeModel(scopeInput);
    setAttachedScopeInput(model.input);
    setDismissedSessionSpec(true);
    setValue("projectLocation", model.input.market, { shouldDirty: true });
    setValue("projectType", model.input.discipline, { shouldDirty: true });
    setValue("budgetRange", model.investment.mappedBudgetRange, {
      shouldDirty: true,
    });
    setValue("timeline", model.investment.recommendedTimeline, {
      shouldDirty: true,
    });
    if (!getValues("projectDescription")?.trim()) {
      setValue("projectDescription", buildInquiryStarterDescription(model), {
        shouldDirty: true,
      });
    }
  };

  const handleDetachSpec = () => {
    setAttachedScopeInput(null);
  };

  const submitMutation = useMutation(
    trpc.inquiry.submit.mutationOptions({
      onSuccess: (data) => {
        setSubmissionResult(data);
        setSubmittedWithSpec(Boolean(attachedModel));
        reset({
          fullName: "",
          email: "",
          phone: "",
          projectLocation: "Houston",
          projectType: "Whole-Home Remodeling",
          budgetRange: "",
          timeline: "",
          projectDescription: "",
          companyWebsite: "",
        });
        setAttachedScopeInput(null);
      },
    })
  );

  const onSubmit = (values: ProjectInquiryInput) => {
    setSubmissionResult(null);
    submitMutation.mutate({
      ...values,
      scopeSpec: attachedModel
        ? buildScopeSpecSummary(attachedModel)
        : undefined,
    });
  };

  if (submissionResult) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="glass-surface space-y-6 p-8 sm:p-10"
      >
        <div className="flex items-start gap-4">
          <CheckCircle2
            className="mt-0.5 h-6 w-6 shrink-0 text-[#17191B] dark:text-[#F2F0EC]"
            aria-hidden="true"
          />
          <div className="space-y-2">
            <p className="eyebrow-label text-[#5C5B58] dark:text-[#A7A6A3]">
              Inquiry Validated · Reference {submissionResult.referenceId}
            </p>
            <h2 className="font-display text-2xl font-semibold tracking-[-0.025em] sm:text-3xl">
              Thank you for reaching out to BLACKSTEEL.
            </h2>
          </div>
        </div>

        <p className="text-sm leading-[1.72] text-[#34383C] dark:text-[#D8D5CF]">
          {submissionResult.message}
        </p>

        {submittedWithSpec ? (
          <div className="border border-[#17191B]/18 bg-[#17191B]/[0.04] p-4 font-mono text-[11px] uppercase tracking-[0.14em] text-[#34383C] dark:border-[#A7A6A3]/25 dark:bg-[#F2F0EC]/[0.04] dark:text-[#D8D5CF]">
            Structured Feasibility &amp; Scope Modeler Dossier Attached
          </div>
        ) : null}

        {!submissionResult.deliveryConfigured ? (
          <div className="border-l-2 border-[#5C5B58] bg-[#17191B]/5 p-4 text-xs leading-[1.65] text-[#34383C] dark:border-[#A7A6A3] dark:bg-[#F2F0EC]/5 dark:text-[#D8D5CF]">
            <strong className="font-medium uppercase tracking-[0.14em]">
              Integration Boundary Notice:
            </strong>{" "}
            This inquiry was validated end-to-end through tRPC and Zod with rate
            limiting enabled. Set{" "}
            <code className="font-mono">RESEND_API_KEY</code> and{" "}
            <code className="font-mono">INQUIRY_RECIPIENT_EMAIL</code> in your
            environment to activate live studio email delivery.
          </div>
        ) : null}

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => {
              setSubmissionResult(null);
              setSubmittedWithSpec(false);
            }}
            className="inline-flex cursor-pointer items-center gap-2 border border-[#17191B]/30 px-6 py-3 text-[11px] font-medium uppercase tracking-[0.18em] transition-colors hover:border-[#17191B] dark:border-[#F2F0EC]/30 dark:hover:border-[#F2F0EC]"
          >
            Submit Another Inquiry
          </button>

          <Link
            href="/scope-builder"
            className="inline-flex items-center gap-2 border border-[#17191B]/16 px-5 py-3 text-[11px] font-medium uppercase tracking-[0.18em] text-[#5C5B58] transition-colors hover:border-[#17191B] hover:text-[#17191B] dark:border-[#A7A6A3]/24 dark:text-[#A7A6A3] dark:hover:border-[#F2F0EC] dark:hover:text-[#F2F0EC]"
          >
            <span>Open Scope Modeler</span>
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="glass-surface space-y-7 p-7 sm:p-10"
    >
      <div className="space-y-2 border-b border-[#17191B]/12 pb-6 dark:border-[#A7A6A3]/20">
        <p className="eyebrow-label text-[#5C5B58] dark:text-[#A7A6A3]">
          Project Brief
        </p>
        <h2 className="font-display text-2xl font-semibold tracking-[-0.025em] sm:text-3xl">
          Tell us about your space.
        </h2>
        <p className="text-sm text-[#34383C] dark:text-[#D8D5CF]">
          Fields marked optional are genuinely optional—share what you know
          today and we will refine the rest together.
        </p>
      </div>

      {/* Attached Feasibility Spec Banner (from /scope-builder handoff) */}
      {attachedModel ? (
        <div className="arch-crosshair border border-[#17191B]/25 bg-[#17191B] p-5 text-[#F2F0EC] dark:border-[#F2F0EC]/22">
          <div className="flex flex-wrap items-start justify-between gap-3 border-b border-[#F2F0EC]/14 pb-4">
            <div className="space-y-1">
              <p className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[#A7A6A3]">
                <SlidersHorizontal className="h-3 w-3" aria-hidden="true" />
                <span>Attached Feasibility Spec</span>
              </p>
              <h3 className="font-display text-lg font-semibold tracking-[-0.02em] text-[#F2F0EC]">
                {attachedModel.profile.shortLabel} · {attachedModel.input.market}
                , TX
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href={`/scope-builder?${encodeScopeSpecToQuery(attachedModel.input)}`}
                className="border border-[#F2F0EC]/25 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-[#D8D5CF] transition-colors hover:border-[#F2F0EC] hover:text-[#F2F0EC]"
              >
                Edit Spec
              </Link>
              <button
                type="button"
                onClick={handleDetachSpec}
                aria-label="Detach feasibility spec from inquiry"
                className="inline-flex h-7 w-7 cursor-pointer items-center justify-center border border-[#F2F0EC]/20 text-[#A7A6A3] transition-colors hover:border-[#F2F0EC] hover:text-[#F2F0EC]"
              >
                <X className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <dl className="mt-4 grid grid-cols-2 gap-3 font-mono text-[10px] uppercase tracking-[0.14em] sm:grid-cols-4">
            <div>
              <dt className="text-[#A7A6A3]">Footprint</dt>
              <dd className="mt-1 tabular-nums text-[#F2F0EC]">
                {attachedModel.input.squareFeet.toLocaleString()} sf
              </dd>
            </div>
            <div>
              <dt className="text-[#A7A6A3]">Modeled Band</dt>
              <dd className="mt-1 tabular-nums text-[#F2F0EC]">
                {formatCurrencyCompact(attachedModel.investment.lowUsd)}–
                {formatCurrencyCompact(attachedModel.investment.highUsd)}
              </dd>
            </div>
            <div>
              <dt className="text-[#A7A6A3]">Duration</dt>
              <dd className="mt-1 tabular-nums text-[#F2F0EC]">
                {attachedModel.schedule.totalWeeksLow}–
                {attachedModel.schedule.totalWeeksHigh} wks
              </dd>
            </div>
            <div>
              <dt className="text-[#A7A6A3]">Finish Tier</dt>
              <dd className="mt-1 text-[#F2F0EC]">
                {attachedModel.finishTierOption.label.split(" ")[0]}
              </dd>
            </div>
          </dl>

          {attachedModel.selectedStructuralOptions.length > 0 ? (
            <p className="mt-3 border-t border-[#F2F0EC]/10 pt-3 font-mono text-[10px] tracking-[0.12em] text-[#D8D5CF]">
              <span className="uppercase text-[#A7A6A3]">Structural: </span>
              {attachedModel.selectedStructuralOptions
                .map((opt) => opt.shortLabel)
                .join(" · ")}
            </p>
          ) : null}
        </div>
      ) : savedSessionSpec ? (
        <div className="flex flex-col justify-between gap-4 border border-[#17191B]/20 bg-[#17191B]/[0.04] p-4 sm:flex-row sm:items-center dark:border-[#A7A6A3]/25 dark:bg-[#F2F0EC]/[0.05]">
          <div className="space-y-1">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#5C5B58] dark:text-[#A7A6A3]">
              Saved Modeler Spec Available
            </p>
            <p className="text-xs text-[#34383C] dark:text-[#D8D5CF]">
              {savedSessionSpec.discipline} in {savedSessionSpec.market} (
              {savedSessionSpec.squareFeet.toLocaleString()} sq ft)
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => applyScopeToForm(savedSessionSpec)}
              className="cursor-pointer border border-[#17191B] bg-[#17191B] px-3.5 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-[#F2F0EC] transition-colors hover:bg-[#34383C] dark:border-[#F2F0EC] dark:bg-[#F2F0EC] dark:text-[#17191B]"
            >
              Attach &amp; Pre-Fill
            </button>
            <button
              type="button"
              onClick={() => setDismissedSessionSpec(true)}
              aria-label="Dismiss saved spec notice"
              className="inline-flex h-8 w-8 cursor-pointer items-center justify-center border border-[#17191B]/20 text-[#5C5B58] hover:border-[#17191B] dark:border-[#A7A6A3]/25 dark:text-[#A7A6A3]"
            >
              <X className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>
      ) : null}

      {/* Hidden Honeypot Field for Automated Spam Prevention */}
      <div aria-hidden="true" className="hidden">
        <label htmlFor="companyWebsite">Company Website</label>
        <input
          id="companyWebsite"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("companyWebsite")}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="fullName" className={LABEL_CLASSES}>
            Full Name *
          </label>
          <input
            id="fullName"
            type="text"
            autoComplete="name"
            placeholder="Alex Morgan"
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? "fullName-error" : undefined}
            className={cn(
              FIELD_CLASSES,
              errors.fullName && "border-[#B85C5C] dark:border-[#B85C5C]"
            )}
            {...register("fullName")}
          />
          {errors.fullName ? (
            <p
              id="fullName-error"
              role="alert"
              className="text-xs text-[#B85C5C]"
            >
              {errors.fullName.message}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className={LABEL_CLASSES}>
            Email Address *
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="alex@example.com"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={cn(
              FIELD_CLASSES,
              errors.email && "border-[#B85C5C] dark:border-[#B85C5C]"
            )}
            {...register("email")}
          />
          {errors.email ? (
            <p id="email-error" role="alert" className="text-xs text-[#B85C5C]">
              {errors.email.message}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <label htmlFor="phone" className={LABEL_CLASSES}>
            Phone{" "}
            <span className="normal-case tracking-normal opacity-60">
              (Optional)
            </span>
          </label>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            placeholder="(713) 555-0190"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            className={cn(
              FIELD_CLASSES,
              errors.phone && "border-[#B85C5C] dark:border-[#B85C5C]"
            )}
            {...register("phone")}
          />
          {errors.phone ? (
            <p id="phone-error" role="alert" className="text-xs text-[#B85C5C]">
              {errors.phone.message}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <label htmlFor="projectLocation" className={LABEL_CLASSES}>
            Project Market *
          </label>
          <select
            id="projectLocation"
            aria-invalid={Boolean(errors.projectLocation)}
            className={FIELD_CLASSES}
            {...register("projectLocation")}
          >
            {PROJECT_LOCATIONS.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
          {errors.projectLocation ? (
            <p role="alert" className="text-xs text-[#B85C5C]">
              {errors.projectLocation.message}
            </p>
          ) : null}
        </div>

        <div className="space-y-2 sm:col-span-2">
          <label htmlFor="projectType" className={LABEL_CLASSES}>
            Primary Scope *
          </label>
          <select
            id="projectType"
            aria-invalid={Boolean(errors.projectType)}
            className={FIELD_CLASSES}
            {...register("projectType")}
          >
            {PROJECT_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.projectType ? (
            <p role="alert" className="text-xs text-[#B85C5C]">
              {errors.projectType.message}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <label htmlFor="budgetRange" className={LABEL_CLASSES}>
            Approximate Investment{" "}
            <span className="normal-case tracking-normal opacity-60">
              (Optional)
            </span>
          </label>
          <select
            id="budgetRange"
            className={FIELD_CLASSES}
            {...register("budgetRange")}
          >
            <option value="">Prefer to discuss in consultation</option>
            {BUDGET_RANGES.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="timeline" className={LABEL_CLASSES}>
            Target Timeline{" "}
            <span className="normal-case tracking-normal opacity-60">
              (Optional)
            </span>
          </label>
          <select
            id="timeline"
            className={FIELD_CLASSES}
            {...register("timeline")}
          >
            <option value="">Flexible / Exploring options</option>
            {PROJECT_TIMELINES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2 sm:col-span-2">
          <label htmlFor="projectDescription" className={LABEL_CLASSES}>
            Project Description *
          </label>
          <textarea
            id="projectDescription"
            rows={5}
            placeholder="Share your neighborhood, architectural goals, rooms involved, or whether you are already working with an architect or designer..."
            aria-invalid={Boolean(errors.projectDescription)}
            aria-describedby={
              errors.projectDescription ? "projectDescription-error" : undefined
            }
            className={cn(
              FIELD_CLASSES,
              "resize-y",
              errors.projectDescription &&
                "border-[#B85C5C] dark:border-[#B85C5C]"
            )}
            {...register("projectDescription")}
          />
          {errors.projectDescription ? (
            <p
              id="projectDescription-error"
              role="alert"
              className="text-xs text-[#B85C5C]"
            >
              {errors.projectDescription.message}
            </p>
          ) : null}
        </div>
      </div>

      {submitMutation.isError ? (
        <div
          role="alert"
          className="flex items-start gap-3 border border-[#B85C5C]/50 bg-[#B85C5C]/10 p-4 text-sm text-[#B85C5C]"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <p>{submitMutation.error.message}</p>
        </div>
      ) : null}

      <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={submitMutation.isPending}
          className="group inline-flex cursor-pointer items-center justify-center gap-2.5 border border-[#17191B] bg-[#17191B] px-8 py-4 text-[12px] font-medium uppercase tracking-[0.18em] text-[#F2F0EC] transition-all duration-300 hover:bg-[#34383C] disabled:opacity-55 dark:border-[#F2F0EC] dark:bg-[#F2F0EC] dark:text-[#17191B] dark:hover:bg-[#D8D5CF]"
        >
          <span>
            {submitMutation.isPending
              ? "Submitting Inquiry..."
              : attachedModel
                ? "Submit Inquiry & Attached Spec"
                : "Submit Project Inquiry"}
          </span>
          <ArrowUpRight
            className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </button>

        <p className="text-[11px] leading-[1.6] text-[#5C5B58] dark:text-[#A7A6A3]">
          Protected by server-side validation &amp; rate limiting. We never
          share client inquiry details.
        </p>
      </div>
    </form>
  );
}
