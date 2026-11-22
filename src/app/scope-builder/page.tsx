import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { decodeScopeSpecFromSearchParams } from "@/features/scope-builder/engine";
import { Container } from "@/components/layout/Container";
import { SectionShell } from "@/components/layout/SectionShell";
import { PageHero } from "@/components/sections/shared/PageHero";
import { ScopeBuilderWorkspace } from "@/components/sections/scope-builder/ScopeBuilderWorkspace";

export const metadata: Metadata = buildPageMetadata({
  title: "Scope, Timeline & Investment Modeler",
  description:
    "Interactive architectural feasibility modeler for luxury kitchen, bath, whole-home remodeling, and structural additions in Houston and Austin, Texas.",
  path: "/scope-builder",
});

interface ScopeBuilderPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function ScopeBuilderPage({
  searchParams,
}: ScopeBuilderPageProps) {
  const resolvedParams = await searchParams;
  const initialInput = decodeScopeSpecFromSearchParams(resolvedParams);

  return (
    <>
      <PageHero
        index="MODELER"
        eyebrow="Feasibility & Investment Studio"
        title="Model your scope, timeline, and investment."
        description="Explore realistic investment bands, permitting and engineering lead times, and regional architectural considerations across Houston and Austin—then send your structured spec directly to our principals."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Scope Modeler" },
        ]}
      />

      <SectionShell surface="canvas" spacing="spacious">
        <Container>
          <ScopeBuilderWorkspace initialInput={initialInput} />
        </Container>
      </SectionShell>
    </>
  );
}
