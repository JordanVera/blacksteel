import "server-only";

import { randomBytes } from "node:crypto";
import type {
  ProjectInquiryParsed,
  ProjectInquiryResponse,
} from "@/features/contact/schema";

export interface InquiryDeliveryAdapter {
  readonly isConfigured: boolean;
  deliver(
    inquiry: ProjectInquiryParsed,
    referenceId: string
  ): Promise<{ delivered: boolean }>;
}

/**
 * Scaffolded notification & CRM adapter boundary.
 * Replace or extend this gateway when Resend/Postmark and CRM credentials
 * are provisioned in environment variables.
 *
 * Intentionally avoids logging personal inquiry details.
 */
class ScaffoldInquiryAdapter implements InquiryDeliveryAdapter {
  get isConfigured(): boolean {
    return Boolean(
      process.env.RESEND_API_KEY && process.env.INQUIRY_RECIPIENT_EMAIL
    );
  }

  async deliver(): Promise<{ delivered: boolean }> {
    if (!this.isConfigured) {
      return { delivered: false };
    }

    // Provider integration hook: connect Resend / Postmark / CRM webhook here
    // once owner-confirmed credentials are configured.
    return { delivered: false };
  }
}

const activeAdapter: InquiryDeliveryAdapter = new ScaffoldInquiryAdapter();

export function createInquiryReferenceId(): string {
  const token = randomBytes(3).toString("hex").toUpperCase();
  return `BS-${token}`;
}

export async function processProjectInquiry(
  inquiry: ProjectInquiryParsed
): Promise<ProjectInquiryResponse> {
  const referenceId = createInquiryReferenceId();
  const result = await activeAdapter.deliver(inquiry, referenceId);

  if (result.delivered) {
    return {
      status: "delivered",
      referenceId,
      deliveryConfigured: true,
      message:
        "Thank you. Your project inquiry has been received by the BLACKSTEEL studio team.",
    };
  }

  return {
    status: "received_demo",
    referenceId,
    deliveryConfigured: false,
    message:
      "Your inquiry passed full validation on our server. Email and CRM delivery are not yet connected in this scaffold environment — once BLACKSTEEL configures its delivery provider, inquiries submitted here will route directly to the studio.",
  };
}
