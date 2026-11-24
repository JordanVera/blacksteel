import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ServiceItem } from "@/types/domain";
import { getMediaAsset } from "@/content/media";
import { getRelatedServices } from "@/features/services/catalog";
import { Container } from "@/components/layout/Container";
import { SectionShell } from "@/components/layout/SectionShell";
import { PageHero } from "@/components/sections/shared/PageHero";
import { EditorialHeading } from "@/components/ui/EditorialHeading";
import { ActionLink } from "@/components/ui/ActionLink";
import { ArchitecturalRule } from "@/components/motion/ArchitecturalRule";
import { ArchitecturalCompare } from "@/components/aceternity/ArchitecturalCompare";
import { FinalConversionSection } from "@/components/sections/home/FinalConversionSection";
import { FaqSection } from "@/components/sections/shared/FaqSection";
import {
  LinkCardGrid,
  type LinkCard,
} from "@/components/sections/shared/LinkCardGrid";
import { LOCATION_MARKETS } from "@/content/locations";
import {
  getAllLocalServicePages,
  localServicePath,
} from "@/features/locations/catalog";
import { getArticlesForService, journalPath } from "@/features/journal/catalog";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildServiceItemJsonLd } from "@/lib/seo";

interface ServiceDetailTemplateProps {
  service: ServiceItem;
}

export function ServiceDetailTemplate({ service }: ServiceDetailTemplateProps) {
  const heroMedia = getMediaAsset(service.imageId);
  const related = getRelatedServices(service.relatedSlugs);
  const localCards: LinkCard[] = [
    ...getAllLocalServicePages()
      .filter((page) => page.service === service.slug)
      .map((page) => ({
        href: localServicePath(page),
        eyebrow: `${LOCATION_MARKETS[page.market].city} · Service`,
        title: page.title.replace(/\.$/, ""),
        description: page.seoDescription,
        cta: "View City Page",
      })),
    ...getArticlesForService(service.slug).map((article) => ({
      href: journalPath(article),
      eyebrow: `Journal · ${article.category}`,
      title: article.title,
      description: article.description,
      cta: "Read Article",
    })),
  ];

  return (
    <>
      <JsonLd data={buildServiceItemJsonLd(service)} />
      <PageHero
        index={service.index}
        eyebrow={service.eyebrow}
        title={service.title}
        description={service.answerLead}
        media={heroMedia}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Expertise", href: "/services" },
          { label: service.shortTitle },
        ]}
      />

      {/* Editorial Overview + Representative Deliverables */}
      <SectionShell surface="canvas" spacing="spacious">
        <Container>
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="space-y-6 lg:col-span-6">
              <EditorialHeading
                eyebrow="Architectural Scope"
                size="section"
                title={service.heroHeadline}
              />
              <p className="max-w-[56ch] text-base leading-[1.75] text-[#34383C] dark:text-[#D8D5CF] sm:text-[17px]">
                {service.editorialIntro}
              </p>
              <div className="pt-4">
                <ActionLink href="/contact" variant="primary">
                  Discuss Your {service.shortTitle} Scope
                </ActionLink>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="glass-surface p-7 sm:p-9">
                <p className="eyebrow-label text-[#5C5B58] dark:text-[#A7A6A3]">
                  Core Deliverables
                </p>
                <ul className="mt-6 divide-y divide-[#17191B]/12 dark:divide-[#A7A6A3]/18">
                  {service.deliverables.map((item, idx) => (
                    <li
                      key={item}
                      className="flex items-baseline gap-4 py-4 text-[15px] leading-[1.6] text-[#17191B] dark:text-[#F2F0EC]"
                    >
                      <span className="font-mono text-xs tabular-nums text-[#5C5B58] dark:text-[#A7A6A3]">
                        [0{idx + 1}]
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 border-t border-[#17191B]/14 pt-6 dark:border-[#A7A6A3]/22">
                  <p className="eyebrow-label text-[#5C5B58] dark:text-[#A7A6A3]">
                    Well Suited For
                  </p>
                  <ul className="mt-3 space-y-2 text-sm text-[#34383C] dark:text-[#D8D5CF]">
                    {service.idealFor.map((audience) => (
                      <li key={audience} className="flex items-start gap-2.5">
                        <span
                          aria-hidden="true"
                          className="mt-2 h-px w-3 shrink-0 bg-current opacity-50"
                        />
                        <span>{audience}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </SectionShell>

      {/* Architectural Considerations */}
      <SectionShell surface="elevated" spacing="default">
        <Container>
          <EditorialHeading
            eyebrow="Technical Discipline"
            size="section"
            title="What governs execution behind the finished surface."
          />
          <ArchitecturalRule className="my-10" />
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-10">
            {service.architecturalConsiderations.map((note, idx) => (
              <div
                key={note.heading}
                className="space-y-3 border-t border-[#17191B]/15 pt-6 dark:border-[#A7A6A3]/22"
              >
                <span className="font-mono text-xs tabular-nums text-[#5C5B58] dark:text-[#A7A6A3]">
                  [0{idx + 1}]
                </span>
                <h3 className="font-display text-xl font-semibold tracking-[-0.02em] text-[#17191B] dark:text-[#F2F0EC]">
                  {note.heading}
                </h3>
                <p className="text-sm leading-[1.72] text-[#34383C] dark:text-[#D8D5CF]">
                  {note.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </SectionShell>

      {/* Optional Architectural Compare for Restoration Route */}
      {service.slug === "restoration" ? (
        <SectionShell surface="canvas" spacing="default">
          <Container>
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
              <div className="space-y-4 lg:col-span-4">
                <p className="eyebrow-label text-[#5C5B58] dark:text-[#A7A6A3]">
                  Reconstruction Standard
                </p>
                <h2 className="font-display text-2xl font-semibold tracking-[-0.025em] text-[#17191B] dark:text-[#F2F0EC] sm:text-3xl">
                  Rebuilt beyond its original baseline.
                </h2>
                <p className="text-sm leading-[1.72] text-[#34383C] dark:text-[#D8D5CF]">
                  Rather than rushing temporary patch repairs, our
                  reconstruction teams verify substrate stability and finish
                  every plane to luxury architectural standards.
                </p>
              </div>
              <div className="lg:col-span-8">
                <ArchitecturalCompare
                  beforeSrc={getMediaAsset("living-fireplace").src}
                  beforeAlt={getMediaAsset("living-fireplace").alt}
                  beforeLabel="Rebuilt Structural Volume"
                  afterSrc={getMediaAsset("residence-facade").src}
                  afterAlt={getMediaAsset("residence-facade").alt}
                  afterLabel="Finished Interior Recovery"
                />
              </div>
            </div>
          </Container>
        </SectionShell>
      ) : null}

      <FaqSection
        faq={service.faq}
        title={`${service.shortTitle} questions, answered plainly.`}
        surface={service.slug === "restoration" ? "elevated" : "canvas"}
      />

      {localCards.length > 0 ? (
        <SectionShell surface="elevated" spacing="compact">
          <Container>
            <EditorialHeading
              eyebrow="Houston & Austin"
              size="section"
              title={`${service.shortTitle} by city, plus practical guides.`}
              className="mb-10"
            />
            <LinkCardGrid cards={localCards} />
          </Container>
        </SectionShell>
      ) : null}

      {/* Related Disciplines */}
      <SectionShell surface="canvas" spacing="compact">
        <Container>
          <div className="flex items-end justify-between gap-4 border-b border-[#17191B]/14 pb-6 dark:border-[#A7A6A3]/22">
            <div>
              <p className="eyebrow-label text-[#5C5B58] dark:text-[#A7A6A3]">
                Adjacent Disciplines
              </p>
              <h2 className="mt-2 font-display text-2xl font-semibold tracking-[-0.025em] sm:text-3xl">Related Expertise</h2>
            </div>
            <ActionLink href="/services" variant="underline">
              All Services
            </ActionLink>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={`/services/${item.slug}`}
                className="group glass-surface flex flex-col justify-between p-6 transition-colors hover:border-[#17191B]/35 dark:hover:border-[#F2F0EC]/40"
              >
                <div className="space-y-3">
                  <span className="eyebrow-label text-[#5C5B58] dark:text-[#A7A6A3]">
                    {item.index} · {item.eyebrow}
                  </span>
                  <h3 className="font-display text-xl font-semibold tracking-[-0.02em] text-[#17191B] dark:text-[#F2F0EC]">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-[1.65] text-[#34383C] dark:text-[#D8D5CF]">
                    {item.summary}
                  </p>
                </div>
                <span className="mt-6 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em]">
                  <span>View Discipline</span>
                  <ArrowUpRight
                    className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </SectionShell>

      <FinalConversionSection />
    </>
  );
}
