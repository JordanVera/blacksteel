import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { Container } from "@/components/layout/Container";
import { SectionShell } from "@/components/layout/SectionShell";
import { PageHero } from "@/components/sections/shared/PageHero";
import { ActionLink } from "@/components/ui/ActionLink";

export const metadata: Metadata = buildPageMetadata({
  title: "Privacy Policy (Placeholder)",
  description:
    "Placeholder page for the approved BLACKSTEEL Construction & Remodeling privacy policy and data-handling disclosures.",
  path: "/privacy",
});

export default function PrivacyPolicyPlaceholderPage() {
  return (
    <>
      <PageHero
        index="LEGAL"
        eyebrow="Owner Confirmation Required"
        title="Privacy Policy"
        description="This route is scaffolded to receive BLACKSTEEL Construction & Remodeling's legally reviewed privacy policy and Texas disclosures prior to public launch."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Privacy" }]}
      />

      <SectionShell surface="canvas" spacing="default">
        <Container size="narrow">
          <div className="glass-surface space-y-6 p-8 sm:p-10">
            <p className="eyebrow-label text-[#5C5B58] dark:text-[#A7A6A3]">
              Drafting Notice
            </p>
            <h2 className="font-serif text-3xl">
              Approved legal language required before launch.
            </h2>
            <p className="text-sm leading-[1.75] text-[#34383C] dark:text-[#D8D5CF]">
              In keeping with BLACKSTEEL&apos;s standards for accuracy, no legal
              terms, retention periods, or regulatory claims have been invented
              for this scaffold. Before launching publicly, replace this notice
              with counsel-approved disclosures covering:
            </p>
            <ul className="space-y-2.5 border-l border-[#17191B]/18 pl-5 text-sm leading-[1.68] text-[#34383C] dark:border-[#A7A6A3]/25 dark:text-[#D8D5CF]">
              <li>
                Categories of information collected through the project inquiry
                form
              </li>
              <li>
                Email notification and CRM service providers connected to
                inquiry submissions
              </li>
              <li>
                Analytics or essential storage disclosures (including the local
                theme preference key)
              </li>
              <li>
                Official BLACKSTEEL contact channel for privacy or data deletion
                requests
              </li>
            </ul>
            <div className="pt-2">
              <ActionLink href="/contact" variant="underline">
                Return to Project Inquiry
              </ActionLink>
            </div>
          </div>
        </Container>
      </SectionShell>
    </>
  );
}
