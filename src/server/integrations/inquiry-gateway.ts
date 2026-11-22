import "server-only";

import { randomBytes } from "node:crypto";
import type {
  ProjectInquiryParsed,
  ProjectInquiryResponse,
} from "@/features/contact/schema";
import type { ScopeSpecSummary } from "@/features/scope-builder/schema";

export interface InquiryDeliveryAdapter {
  readonly isConfigured: boolean;
  deliver(
    inquiry: ProjectInquiryParsed,
    referenceId: string
  ): Promise<{ delivered: boolean }>;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function formatUsd(usd: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(usd);
}

function buildScopeSpecPlainText(spec: ScopeSpecSummary): string {
  const structural =
    spec.structuralLabels.length > 0
      ? spec.structuralLabels.map((item) => `  - ${item}`).join("\n")
      : "  - None selected";

  const stages = spec.stages
    .map(
      (stage) =>
        `  [${stage.number}] ${stage.title}: Weeks ${stage.startWeek + 1}-${stage.endWeek} (${stage.durationWeeks} wks) — ${stage.focusNote}`
    )
    .join("\n");

  const notes = spec.architecturalNotes
    .map((note) => `  - ${note}`)
    .join("\n");

  return [
    "",
    "--- ATTACHED SCOPE MODELER DOSSIER ---",
    `Market: ${spec.market}, TX`,
    `Discipline: ${spec.discipline}`,
    `Modeled Area: ${spec.squareFeet.toLocaleString("en-US")} sq. ft.`,
    `Finish Tier: ${spec.finishTierLabel}`,
    `Design Status: ${spec.designStatusLabel}`,
    `Modeled Investment Band: ${formatUsd(spec.investmentLowUsd)} - ${formatUsd(spec.investmentHighUsd)} (${formatUsd(spec.perSqFtLowUsd)}-${formatUsd(spec.perSqFtHighUsd)}/sf | Tier: ${spec.mappedBudgetRange})`,
    `Modeled Schedule: ${spec.totalWeeksLow}-${spec.totalWeeksHigh} weeks (~${spec.permittingWeeks} wks permitting)`,
    "Structural & Engineering Triggers:",
    structural,
    "5-Stage Delivery Schedule:",
    stages,
    "Key Architectural Considerations:",
    notes,
  ].join("\n");
}

function buildScopeSpecHtml(spec: ScopeSpecSummary): string {
  const structuralItems =
    spec.structuralLabels.length > 0
      ? spec.structuralLabels
          .map((item) => `<li style="margin:4px 0;">${escapeHtml(item)}</li>`)
          .join("")
      : `<li style="margin:4px 0;color:#5C5B58;">None selected</li>`;

  const stageRows = spec.stages
    .map(
      (stage) => `
        <tr>
          <td style="padding:8px 10px;border-bottom:1px solid #E2DFD9;font-family:monospace;font-size:12px;white-space:nowrap;">[${escapeHtml(stage.number)}] ${escapeHtml(stage.title)}</td>
          <td style="padding:8px 10px;border-bottom:1px solid #E2DFD9;font-family:monospace;font-size:12px;white-space:nowrap;">W${stage.startWeek + 1}–W${stage.endWeek} (${stage.durationWeeks}w)</td>
          <td style="padding:8px 10px;border-bottom:1px solid #E2DFD9;font-size:13px;color:#34383C;">${escapeHtml(stage.focusNote)}</td>
        </tr>
      `
    )
    .join("");

  const noteItems = spec.architecturalNotes
    .map((note) => `<li style="margin:6px 0;">${escapeHtml(note)}</li>`)
    .join("");

  return `
    <div style="margin-top:28px;border:1px solid #17191B;background:#17191B;color:#F2F0EC;padding:20px 24px;">
      <p style="margin:0;font-family:monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#A7A6A3;">Attached Feasibility &amp; Scope Modeler Dossier</p>
      <h2 style="margin:6px 0 14px;font-size:20px;font-weight:600;color:#F2F0EC;">${escapeHtml(spec.discipline)} · ${escapeHtml(spec.market)}, TX</h2>
      <table style="width:100%;border-collapse:collapse;font-size:13px;color:#F2F0EC;">
        <tr>
          <td style="padding:6px 0;color:#A7A6A3;">Modeled Area</td>
          <td style="padding:6px 0;font-family:monospace;text-align:right;">${spec.squareFeet.toLocaleString("en-US")} sq. ft.</td>
        </tr>
        <tr>
          <td style="padding:6px 0;color:#A7A6A3;">Investment Band</td>
          <td style="padding:6px 0;font-family:monospace;text-align:right;">${escapeHtml(formatUsd(spec.investmentLowUsd))} – ${escapeHtml(formatUsd(spec.investmentHighUsd))} (${escapeHtml(formatUsd(spec.perSqFtLowUsd))}–${escapeHtml(formatUsd(spec.perSqFtHighUsd))}/sf)</td>
        </tr>
        <tr>
          <td style="padding:6px 0;color:#A7A6A3;">Estimated Duration</td>
          <td style="padding:6px 0;font-family:monospace;text-align:right;">${spec.totalWeeksLow}–${spec.totalWeeksHigh} weeks (~${spec.permittingWeeks} wks permitting)</td>
        </tr>
        <tr>
          <td style="padding:6px 0;color:#A7A6A3;">Finish Tier</td>
          <td style="padding:6px 0;text-align:right;">${escapeHtml(spec.finishTierLabel)}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;color:#A7A6A3;">Design Status</td>
          <td style="padding:6px 0;text-align:right;">${escapeHtml(spec.designStatusLabel)}</td>
        </tr>
      </table>
    </div>

    <div style="margin-top:18px;border:1px solid #D8D5CF;background:#FFFFFF;padding:18px 20px;">
      <p style="margin:0 0 8px;font-family:monospace;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#5C5B58;">Structural &amp; Site Scope</p>
      <ul style="margin:0 0 18px;padding-left:18px;font-size:13px;color:#17191B;">${structuralItems}</ul>

      <p style="margin:0 0 8px;font-family:monospace;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#5C5B58;">5-Stage Modeled Schedule</p>
      <table style="width:100%;border-collapse:collapse;margin-bottom:18px;">
        <tbody>${stageRows}</tbody>
      </table>

      <p style="margin:0 0 8px;font-family:monospace;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#5C5B58;">Key Architectural Considerations</p>
      <ul style="margin:0;padding-left:18px;font-size:13px;color:#34383C;">${noteItems}</ul>
    </div>
  `;
}

function buildInquiryEmailPayload(
  inquiry: ProjectInquiryParsed,
  referenceId: string
): { subject: string; text: string; html: string } {
  const hasSpec = Boolean(inquiry.scopeSpec);
  const subject = `[BLACKSTEEL ${referenceId}] ${inquiry.projectType} · ${inquiry.projectLocation}${hasSpec ? " (Scope Spec Attached)" : ""}`;

  const text = [
    `BLACKSTEEL PROJECT INQUIRY — ${referenceId}`,
    "",
    `Client: ${inquiry.fullName}`,
    `Email: ${inquiry.email}`,
    `Phone: ${inquiry.phone ?? "Not provided"}`,
    `Market: ${inquiry.projectLocation}`,
    `Primary Scope: ${inquiry.projectType}`,
    `Approximate Investment: ${inquiry.budgetRange ?? "Prefer to discuss"}`,
    `Target Timeline: ${inquiry.timeline ?? "Flexible / Exploratory"}`,
    "",
    "Project Description:",
    inquiry.projectDescription,
    inquiry.scopeSpec ? buildScopeSpecPlainText(inquiry.scopeSpec) : "",
  ]
    .filter((section) => section !== "")
    .join("\n");

  const html = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#F2F0EC;color:#17191B;padding:28px 20px;">
      <div style="max-width:680px;margin:0 auto;">
        <div style="border-bottom:2px solid #17191B;padding-bottom:14px;margin-bottom:20px;">
          <p style="margin:0;font-family:monospace;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#5C5B58;">BLACKSTEEL Studio Inquiry · ${escapeHtml(referenceId)}</p>
          <h1 style="margin:6px 0 0;font-size:24px;font-weight:600;color:#17191B;">${escapeHtml(inquiry.projectType)}</h1>
        </div>

        <table style="width:100%;border-collapse:collapse;background:#FFFFFF;border:1px solid #D8D5CF;font-size:14px;">
          <tr>
            <td style="padding:10px 14px;border-bottom:1px solid #ECE9E3;color:#5C5B58;width:34%;">Client Name</td>
            <td style="padding:10px 14px;border-bottom:1px solid #ECE9E3;font-weight:600;">${escapeHtml(inquiry.fullName)}</td>
          </tr>
          <tr>
            <td style="padding:10px 14px;border-bottom:1px solid #ECE9E3;color:#5C5B58;">Email</td>
            <td style="padding:10px 14px;border-bottom:1px solid #ECE9E3;"><a href="mailto:${escapeHtml(inquiry.email)}" style="color:#17191B;">${escapeHtml(inquiry.email)}</a></td>
          </tr>
          <tr>
            <td style="padding:10px 14px;border-bottom:1px solid #ECE9E3;color:#5C5B58;">Phone</td>
            <td style="padding:10px 14px;border-bottom:1px solid #ECE9E3;">${escapeHtml(inquiry.phone ?? "Not provided")}</td>
          </tr>
          <tr>
            <td style="padding:10px 14px;border-bottom:1px solid #ECE9E3;color:#5C5B58;">Market</td>
            <td style="padding:10px 14px;border-bottom:1px solid #ECE9E3;">${escapeHtml(inquiry.projectLocation)}</td>
          </tr>
          <tr>
            <td style="padding:10px 14px;border-bottom:1px solid #ECE9E3;color:#5C5B58;">Approximate Investment</td>
            <td style="padding:10px 14px;border-bottom:1px solid #ECE9E3;">${escapeHtml(inquiry.budgetRange ?? "Prefer to discuss")}</td>
          </tr>
          <tr>
            <td style="padding:10px 14px;color:#5C5B58;">Target Timeline</td>
            <td style="padding:10px 14px;">${escapeHtml(inquiry.timeline ?? "Flexible / Exploratory")}</td>
          </tr>
        </table>

        <div style="margin-top:18px;background:#FFFFFF;border:1px solid #D8D5CF;padding:18px 20px;">
          <p style="margin:0 0 8px;font-family:monospace;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#5C5B58;">Project Description</p>
          <p style="margin:0;font-size:14px;line-height:1.68;white-space:pre-wrap;color:#17191B;">${escapeHtml(inquiry.projectDescription)}</p>
        </div>

        ${inquiry.scopeSpec ? buildScopeSpecHtml(inquiry.scopeSpec) : ""}
      </div>
    </div>
  `;

  return { subject, text, html };
}

/**
 * Internal email delivery adapter via Resend REST API.
 * Preserves the InquiryDeliveryAdapter boundary so Jobber CRM delivery
 * can be composed alongside or in place of email when credentials are ready.
 *
 * Intentionally avoids logging personal inquiry details.
 */
class ResendEmailInquiryAdapter implements InquiryDeliveryAdapter {
  get isConfigured(): boolean {
    return Boolean(
      process.env.RESEND_API_KEY && process.env.INQUIRY_RECIPIENT_EMAIL
    );
  }

  async deliver(
    inquiry: ProjectInquiryParsed,
    referenceId: string
  ): Promise<{ delivered: boolean }> {
    if (!this.isConfigured) {
      return { delivered: false };
    }

    const apiKey = process.env.RESEND_API_KEY!;
    const recipients = process.env.INQUIRY_RECIPIENT_EMAIL!
      .split(",")
      .map((addr) => addr.trim())
      .filter(Boolean);

    if (recipients.length === 0) {
      return { delivered: false };
    }

    const fromAddress =
      process.env.INQUIRY_FROM_EMAIL?.trim() ||
      "BLACKSTEEL Studio <onboarding@resend.dev>";

    const { subject, text, html } = buildInquiryEmailPayload(
      inquiry,
      referenceId
    );

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromAddress,
        to: recipients,
        reply_to: inquiry.email,
        subject,
        text,
        html,
      }),
    });

    if (!response.ok) {
      throw new Error(
        "We could not transmit your inquiry right now. Please try again in a moment."
      );
    }

    return { delivered: true };
  }
}

const activeAdapter: InquiryDeliveryAdapter = new ResendEmailInquiryAdapter();

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
      message: inquiry.scopeSpec
        ? "Thank you. Your project inquiry and structured Scope Modeler dossier have been delivered to the BLACKSTEEL principals."
        : "Thank you. Your project inquiry has been received by the BLACKSTEEL studio team.",
    };
  }

  return {
    status: "received_demo",
    referenceId,
    deliveryConfigured: false,
    message: inquiry.scopeSpec
      ? "Your inquiry and attached Feasibility & Scope Modeler spec passed full server validation. Configure RESEND_API_KEY and INQUIRY_RECIPIENT_EMAIL to deliver studio emails automatically."
      : "Your inquiry passed full validation on our server. Email delivery is not yet configured in this environment — set RESEND_API_KEY and INQUIRY_RECIPIENT_EMAIL to route inquiries directly to the studio.",
  };
}
