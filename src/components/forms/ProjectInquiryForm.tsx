"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { ArrowUpRight, CheckCircle2, AlertCircle } from "lucide-react";
import {
  BUDGET_RANGES,
  PROJECT_LOCATIONS,
  PROJECT_TIMELINES,
  PROJECT_TYPES,
  projectInquirySchema,
  type ProjectInquiryInput,
  type ProjectInquiryResponse,
} from "@/features/contact/schema";
import { useTRPC } from "@/server/trpc/client";
import { cn } from "@/lib/utils";

const FIELD_CLASSES =
  "w-full border border-[#17191B]/20 bg-[#F2F0EC]/70 px-4 py-3.5 text-sm text-[#17191B] placeholder:text-[#5C5B58]/70 transition-colors focus:border-[#17191B] focus:outline-none dark:border-[#A7A6A3]/28 dark:bg-[#17191B]/75 dark:text-[#F2F0EC] dark:placeholder:text-[#A7A6A3]/60 dark:focus:border-[#F2F0EC]";

const LABEL_CLASSES =
  "block text-[11px] font-medium uppercase tracking-[0.18em] text-[#34383C] dark:text-[#D8D5CF]";

export function ProjectInquiryForm() {
  const trpc = useTRPC();
  const [submissionResult, setSubmissionResult] =
    useState<ProjectInquiryResponse | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProjectInquiryInput>({
    resolver: zodResolver(projectInquirySchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      projectLocation: "Houston",
      projectType: "Whole-Home Remodeling",
      budgetRange: "",
      timeline: "",
      projectDescription: "",
      companyWebsite: "",
    },
  });

  const submitMutation = useMutation(
    trpc.inquiry.submit.mutationOptions({
      onSuccess: (data) => {
        setSubmissionResult(data);
        reset();
      },
    })
  );

  const onSubmit = (values: ProjectInquiryInput) => {
    setSubmissionResult(null);
    submitMutation.mutate(values);
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

        {!submissionResult.deliveryConfigured ? (
          <div className="border-l-2 border-[#5C5B58] bg-[#17191B]/5 p-4 text-xs leading-[1.65] text-[#34383C] dark:border-[#A7A6A3] dark:bg-[#F2F0EC]/5 dark:text-[#D8D5CF]">
            <strong className="font-medium uppercase tracking-[0.14em]">
              Integration Boundary Notice:
            </strong>{" "}
            This inquiry was validated end-to-end through tRPC and Zod with rate
            limiting enabled. Email notification and CRM persistence are
            intentionally left unconfigured until BLACKSTEEL provides production
            provider credentials.
          </div>
        ) : null}

        <button
          type="button"
          onClick={() => setSubmissionResult(null)}
          className="inline-flex items-center gap-2 border border-[#17191B]/30 px-6 py-3 text-[11px] font-medium uppercase tracking-[0.18em] transition-colors hover:border-[#17191B] dark:border-[#F2F0EC]/30 dark:hover:border-[#F2F0EC] cursor-pointer"
        >
          Submit Another Inquiry
        </button>
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
        <h2 className="font-display text-2xl font-semibold tracking-[-0.025em] sm:text-3xl">Tell us about your space.</h2>
        <p className="text-sm text-[#34383C] dark:text-[#D8D5CF]">
          Fields marked optional are genuinely optional—share what you know
          today and we will refine the rest together.
        </p>
      </div>

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
            <p id="fullName-error" role="alert" className="text-xs text-[#B85C5C]">
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
          className="group inline-flex items-center justify-center gap-2.5 border border-[#17191B] bg-[#17191B] px-8 py-4 text-[12px] font-medium uppercase tracking-[0.18em] text-[#F2F0EC] transition-all duration-300 hover:bg-[#34383C] disabled:opacity-55 dark:border-[#F2F0EC] dark:bg-[#F2F0EC] dark:text-[#17191B] dark:hover:bg-[#D8D5CF] cursor-pointer"
        >
          <span>
            {submitMutation.isPending
              ? "Submitting Inquiry..."
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
