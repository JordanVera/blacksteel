import "server-only";

import { TRPCError } from "@trpc/server";
import { projectInquirySchema } from "@/features/contact/schema";
import { createMemoryRateLimiter } from "@/lib/rate-limit";
import {
  createInquiryReferenceId,
  processProjectInquiry,
} from "@/server/integrations/inquiry-gateway";
import { baseProcedure, createTRPCRouter } from "@/server/api/trpc";

const inquiryRateLimiter = createMemoryRateLimiter({
  maxRequests: 5,
  windowMs: 15 * 60 * 1000, // 5 inquiries per 15 minutes per client key
});

export const inquiryRouter = createTRPCRouter({
  submit: baseProcedure
    .input(projectInquirySchema)
    .mutation(async ({ ctx, input }) => {
      // Honeypot spam trap: return a neutral response without forwarding
      if (input.companyWebsite) {
        return {
          status: "received_demo" as const,
          referenceId: createInquiryReferenceId(),
          deliveryConfigured: false,
          message: "Thank you for contacting BLACKSTEEL.",
        };
      }

      const limit = inquiryRateLimiter.check(ctx.clientKey);
      if (!limit.allowed) {
        throw new TRPCError({
          code: "TOO_MANY_REQUESTS",
          message:
            "Too many inquiry submissions from this connection. Please wait a few minutes and try again.",
        });
      }

      return processProjectInquiry(input);
    }),
});
