import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { LocationMarket } from "@/types/domain";
import { getMediaAsset } from "@/content/media";
import { portfolioRepository } from "@/features/portfolio/repository";
import { Container } from "@/components/layout/Container";
import { SectionShell } from "@/components/layout/SectionShell";
import { PageHero } from "@/components/sections/shared/PageHero";
import { EditorialHeading } from "@/components/ui/EditorialHeading";
import { ActionLink } from "@/components/ui/ActionLink";
import { ArchitecturalRule } from "@/components/motion/ArchitecturalRule";
import { FinalConversionSection } from "@/components/sections/home/FinalConversionSection";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  LinkCardGrid,
  type LinkCard,
} from "@/components/sections/shared/LinkCardGrid";
import { buildLocationBusinessJsonLd } from "@/lib/seo";
import {
  getLocalServicePages,
  getNeighborhoodGuides,
  localServicePath,
  neighborhoodPath,
} from "@/features/locations/catalog";

interface LocationLandingTemplateProps {
  market: LocationMarket;
}

export function LocationLandingTemplate({
  market,
}: LocationLandingTemplateProps) {
  const heroMedia = getMediaAsset(market.imageId);
  const regionalStudies = portfolioRepository
    .getAllProjects()
    .filter((p) => p.city.toLowerCase() === market.slug);
  const otherSlug = market.slug === "houston" ? "austin" : "houston";
  const otherCity = market.slug === "houston" ? "Austin" : "Houston";
  const guides = getNeighborhoodGuides(market.slug);
  const marketCards: LinkCard[] = [
    ...getLocalServicePages(market.slug).map((page) => ({
      href: localServicePath(page),
      eyebrow: `${market.city} · Service`,
      title: page.title.replace(/\.$/, ""),
      description: page.seoDescription,
      cta: "View Service",
    })),
    ...guides.map((guide) => ({
      href: neighborhoodPath(guide),
      eyebrow: `${market.city} · Neighborhood Guide`,
      title: `Remodeling in ${guide.name}`,
      description: guide.seoDescription,
      cta: "Read Guide",
    })),
  ];

  return (
    <>
      <JsonLd data={buildLocationBusinessJsonLd(market)} />
      <PageHero
        index={market.coordinatesLabel}
        eyebrow={market.regionLabel}
        title={`${market.city}, ${market.state}`}
        description={market.answerLead}
        media={heroMedia}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: market.city },
        ]}
      />

      <SectionShell surface="canvas" spacing="spacious">
        <Container>
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">
            <div className="space-y-6 lg:col-span-7">
              <EditorialHeading
                eyebrow={`Building in ${market.city}`}
                size="section"
                title={market.headline}
              />
              <p className="max-w-[60ch] text-lg font-light leading-[1.7] text-[#17191B] dark:text-[#F2F0EC]">
                {market.subheadline}
              </p>
              {market.overview.map((paragraph) => (
                <p
                  key={paragraph}
                  className="max-w-[60ch] text-base leading-[1.76] text-[#34383C] dark:text-[#D8D5CF] sm:text-[17px]"
                >
                  {paragraph}
                </p>
              ))}
              <div className="flex flex-wrap items-center gap-5 pt-3">
                <ActionLink href="/contact" variant="primary">
                  Start a {market.city} Project
                </ActionLink>
                <ActionLink
                  href={`/locations/${otherSlug}`}
                  variant="underline"
                >
                  Also Serving {otherCity}
                </ActionLink>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="glass-surface p-7 sm:p-8 space-y-6">
                <div>
                  <p className="eyebrow-label text-[#5C5B58] dark:text-[#A7A6A3]">
                    Service Area Coverage
                  </p>
                  <h2 className="mt-2 font-display text-2xl font-semibold tracking-[-0.025em]">
                    Communities We Serve
                  </h2>
                </div>

                <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5 border-y border-[#17191B]/12 py-5 text-sm text-[#34383C] dark:border-[#A7A6A3]/20 dark:text-[#D8D5CF]">
                  {market.serviceAreas.map((area) => {
                    const guide = guides.find((item) =>
                      area.startsWith(item.name)
                    );
                    return (
                      <li key={area} className="flex items-center gap-2">
                        <span
                          aria-hidden="true"
                          className="h-1 w-1 rounded-full bg-current opacity-50"
                        />
                        {guide ? (
                          <Link
                            href={neighborhoodPath(guide)}
                            className="font-medium text-[#17191B] underline decoration-[#17191B]/30 underline-offset-4 hover:decoration-current dark:text-[#F2F0EC] dark:decoration-[#F2F0EC]/30"
                          >
                            {area}
                          </Link>
                        ) : (
                          <span>{area}</span>
                        )}
                      </li>
                    );
                  })}
                </ul>

                <p className="text-xs leading-[1.65] text-[#5C5B58] dark:text-[#A7A6A3]">
                  Private on-site consultations are scheduled directly with
                  BLACKSTEEL leadership across Greater {market.city}. Physical
                  studio details are intentionally omitted until owner
                  confirmation.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </SectionShell>

      <SectionShell surface="elevated" spacing="default">
        <Container>
          <EditorialHeading
            eyebrow="Regional Engineering & Craft"
            size="section"
            title={`Key architectural considerations in ${market.city}.`}
          />
          <ArchitecturalRule className="my-10" />
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {market.architecturalFocus.map((item, idx) => (
              <div
                key={item.title}
                className="space-y-3 border-t border-[#17191B]/14 pt-6 dark:border-[#A7A6A3]/22"
              >
                <span className="font-mono text-xs tabular-nums text-[#5C5B58] dark:text-[#A7A6A3]">
                  [0{idx + 1}]
                </span>
                <h3 className="font-display text-xl font-semibold tracking-[-0.02em] text-[#17191B] dark:text-[#F2F0EC]">
                  {item.title}
                </h3>
                <p className="text-sm leading-[1.72] text-[#34383C] dark:text-[#D8D5CF]">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </SectionShell>

      {regionalStudies.length > 0 ? (
        <SectionShell surface="canvas" spacing="default">
          <Container>
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="eyebrow-label text-[#5C5B58] dark:text-[#A7A6A3]">
                  Regional Portfolio
                </p>
                <h2 className="mt-2 font-display text-2xl font-semibold tracking-[-0.025em] sm:text-3xl">
                  {market.city} Architectural Studies
                </h2>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
              {regionalStudies.map((study) => {
                const media = getMediaAsset(study.coverImageId);
                return (
                  <Link
                    key={study.slug}
                    href={`/projects/${study.slug}`}
                    className="group block"
                  >
                    <div className="relative aspect-[16/10] w-full overflow-hidden border border-[#17191B]/12 bg-[#17191B] dark:border-[#A7A6A3]/20">
                      <Image
                        src={media.src}
                        alt={media.alt}
                        fill
                        sizes="(min-width: 768px) 48vw, 100vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                      <span className="absolute left-4 top-4 glass-photo px-3 py-1 text-[10px] uppercase tracking-[0.18em]">
                        {study.neighborhood}
                      </span>
                    </div>
                    <div className="mt-4 flex items-start justify-between gap-4">
                      <div>
                        <p className="eyebrow-label text-[#5C5B58] dark:text-[#A7A6A3]">
                          {study.category}
                        </p>
                        <h3 className="mt-1 font-display text-xl font-semibold tracking-[-0.02em] group-hover:opacity-75">
                          {study.name}
                        </h3>
                      </div>
                      <ArrowUpRight className="mt-1 h-4 w-4 shrink-0" aria-hidden="true" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </Container>
        </SectionShell>
      ) : null}

      <SectionShell surface="elevated" spacing="compact">
        <Container>
          <EditorialHeading
            eyebrow={`${market.city} Services & Guides`}
            size="section"
            title={`Remodeling in ${market.city}, by project and neighborhood.`}
            className="mb-10"
          />
          <LinkCardGrid cards={marketCards} />
        </Container>
      </SectionShell>

      <FinalConversionSection />
    </>
  );
}
