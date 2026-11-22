import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, SlidersHorizontal } from "lucide-react";
import { buildPageMetadata } from "@/lib/seo";
import { SITE_CONFIG } from "@/content/site";
import { decodeScopeSpecFromSearchParams } from "@/features/scope-builder/engine";
import { Container } from "@/components/layout/Container";
import { SectionShell } from "@/components/layout/SectionShell";
import { PageHero } from "@/components/sections/shared/PageHero";
import { ProjectInquiryForm } from "@/components/forms/ProjectInquiryForm";

export const metadata: Metadata = buildPageMetadata({
  title: "Start Your Project | Contact",
  description:
    "Begin a private conversation with BLACKSTEEL Construction & Remodeling regarding luxury residential remodeling, custom construction, or general contracting in Houston or Austin, Texas.",
  path: "/contact",
});

interface ContactPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const resolvedParams = await searchParams;
  const initialScopeInput = decodeScopeSpecFromSearchParams(resolvedParams);

  return (
    <>
      <PageHero
        index="INQUIRY"
        eyebrow="Start a Conversation"
        title="Let's discuss your space."
        description="Share the contours of your renovation, structural addition, or build-out. Our principals review every inquiry personally and follow up to arrange an initial consultation."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      <SectionShell surface="canvas" spacing="spacious">
        <Container>
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
            <aside className="space-y-10 lg:col-span-5">
              {/* Interactive Scope Modeler Callout */}
              {!initialScopeInput ? (
                <div className="arch-crosshair glass-steel space-y-4 p-6 text-[#F2F0EC]">
                  <p className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[#A7A6A3]">
                    <SlidersHorizontal
                      className="h-3.5 w-3.5"
                      aria-hidden="true"
                    />
                    <span>Interactive Feasibility Tool</span>
                  </p>
                  <h2 className="font-display text-xl font-semibold tracking-[-0.02em]">
                    Not sure where budget or permitting lands?
                  </h2>
                  <p className="text-xs leading-[1.68] text-[#D8D5CF]">
                    Model your Houston or Austin residential scope, permitting
                    timeline, and investment band first—then attach the full
                    spec directly to this inquiry.
                  </p>
                  <Link
                    href="/scope-builder"
                    className="group inline-flex items-center gap-2 border border-[#F2F0EC]/30 px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[#F2F0EC] transition-colors hover:border-[#F2F0EC] hover:bg-[#F2F0EC] hover:text-[#17191B]"
                  >
                    <span>Launch Scope Modeler</span>
                    <ArrowUpRight
                      className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </Link>
                </div>
              ) : null}

              <div className="space-y-4">
                <p className="eyebrow-label text-[#5C5B58] dark:text-[#A7A6A3]">
                  What Happens Next
                </p>
                <ol className="divide-y divide-[#17191B]/12 border-y border-[#17191B]/12 dark:divide-[#A7A6A3]/20 dark:border-[#A7A6A3]/20">
                  {[
                    {
                      step: "01",
                      title: "Principal Review",
                      body: "Your project brief is reviewed directly by BLACKSTEEL leadership—never routed to a call center.",
                    },
                    {
                      step: "02",
                      title: "Introductory Call",
                      body: "We align on your architectural vision, neighborhood context, design status, and schedule goals.",
                    },
                    {
                      step: "03",
                      title: "On-Site Walkthrough",
                      body: "For qualified scopes in Houston and Austin, we visit the property to evaluate structure and feasibility.",
                    },
                  ].map((item) => (
                    <li key={item.step} className="flex gap-5 py-5">
                      <span className="font-mono text-sm tabular-nums text-[#5C5B58] dark:text-[#A7A6A3]">
                        [{item.step}]
                      </span>
                      <div className="space-y-1">
                        <h2 className="font-display text-lg font-semibold tracking-[-0.02em]">
                          {item.title}
                        </h2>
                        <p className="text-sm leading-[1.68] text-[#34383C] dark:text-[#D8D5CF]">
                          {item.body}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="glass-surface space-y-5 p-7">
                <p className="eyebrow-label text-[#5C5B58] dark:text-[#A7A6A3]">
                  Studio Details · Owner Confirmation Required
                </p>
                <dl className="space-y-4 text-sm">
                  <div>
                    <dt className="text-[11px] uppercase tracking-[0.16em] text-[#5C5B58] dark:text-[#A7A6A3]">
                      Markets Served
                    </dt>
                    <dd className="mt-1 font-medium">
                      {SITE_CONFIG.contactPlaceholders.marketsLabel}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[11px] uppercase tracking-[0.16em] text-[#5C5B58] dark:text-[#A7A6A3]">
                      Direct Line
                    </dt>
                    <dd className="mt-1 text-[#34383C] dark:text-[#D8D5CF]">
                      {SITE_CONFIG.contactPlaceholders.phoneLabel}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[11px] uppercase tracking-[0.16em] text-[#5C5B58] dark:text-[#A7A6A3]">
                      Email
                    </dt>
                    <dd className="mt-1 text-[#34383C] dark:text-[#D8D5CF]">
                      {SITE_CONFIG.contactPlaceholders.emailLabel}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[11px] uppercase tracking-[0.16em] text-[#5C5B58] dark:text-[#A7A6A3]">
                      Consultations
                    </dt>
                    <dd className="mt-1 text-[#34383C] dark:text-[#D8D5CF]">
                      {SITE_CONFIG.contactPlaceholders.hoursLabel}
                    </dd>
                  </div>
                </dl>

                <div className="flex items-center gap-4 border-t border-[#17191B]/12 pt-4 text-xs uppercase tracking-[0.18em] dark:border-[#A7A6A3]/20">
                  <Link
                    href="/locations/houston"
                    className="underline-offset-4 hover:underline"
                  >
                    Houston Market
                  </Link>
                  <span className="opacity-35">/</span>
                  <Link
                    href="/locations/austin"
                    className="underline-offset-4 hover:underline"
                  >
                    Austin Market
                  </Link>
                </div>
              </div>
            </aside>

            <div className="lg:col-span-7">
              <ProjectInquiryForm initialScopeInput={initialScopeInput} />
            </div>
          </div>
        </Container>
      </SectionShell>
    </>
  );
}
