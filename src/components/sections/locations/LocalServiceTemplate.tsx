import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { LocalServicePage } from "@/types/domain";
import { LOCATION_MARKETS } from "@/content/locations";
import { getMediaAsset } from "@/content/media";
import { getServiceBySlug } from "@/features/services/catalog";
import {
  getAllLocalServicePages,
  getLocalServicePages,
  getNeighborhoodGuides,
  localServicePath,
  neighborhoodPath,
} from "@/features/locations/catalog";
import { getArticlesBySlugs, journalPath } from "@/features/journal/catalog";
import { buildServiceJsonLd } from "@/lib/seo";
import { Container } from "@/components/layout/Container";
import { SectionShell } from "@/components/layout/SectionShell";
import { PageHero } from "@/components/sections/shared/PageHero";
import { ContentSections } from "@/components/sections/shared/ContentSections";
import { FaqSection } from "@/components/sections/shared/FaqSection";
import {
  LinkCardGrid,
  type LinkCard,
} from "@/components/sections/shared/LinkCardGrid";
import { EditorialHeading } from "@/components/ui/EditorialHeading";
import { ActionLink } from "@/components/ui/ActionLink";
import { FinalConversionSection } from "@/components/sections/home/FinalConversionSection";
import { JsonLd } from "@/components/seo/JsonLd";

interface LocalServiceTemplateProps {
  page: LocalServicePage;
}

export function LocalServiceTemplate({ page }: LocalServiceTemplateProps) {
  const market = LOCATION_MARKETS[page.market];
  const service = getServiceBySlug(page.service);
  const media = getMediaAsset(page.imageId);
  const siblingServices = getLocalServicePages(page.market).filter(
    (item) => item.service !== page.service
  );
  const otherCityPage = getAllLocalServicePages().find(
    (item) => item.service === page.service && item.market !== page.market
  );
  const guides = getNeighborhoodGuides(page.market);
  const articles = getArticlesBySlugs(page.journalSlugs);

  const relatedCards: LinkCard[] = [
    {
      href: `/services/${service.slug}`,
      eyebrow: "Service Overview",
      title: service.title,
      description: service.summary,
      cta: "View Service",
    },
    ...guides.map((guide) => ({
      href: neighborhoodPath(guide),
      eyebrow: `${market.city} · Neighborhood Guide`,
      title: `Remodeling in ${guide.name}`,
      description: guide.seoDescription,
      cta: "Read Guide",
    })),
    ...articles.map((article) => ({
      href: journalPath(article),
      eyebrow: `Journal · ${article.category}`,
      title: article.title,
      description: article.description,
      cta: "Read Article",
    })),
    ...(otherCityPage
      ? [
          {
            href: localServicePath(otherCityPage),
            eyebrow: `Also Serving ${LOCATION_MARKETS[otherCityPage.market].city}`,
            title: otherCityPage.title.replace(/\.$/, ""),
            cta: "View Page",
          },
        ]
      : []),
  ];

  return (
    <>
      <JsonLd
        data={buildServiceJsonLd({
          name: page.seoTitle,
          description: page.answerLead,
          path: localServicePath(page),
          serviceType: service.title,
          market,
        })}
      />
      <PageHero
        index={market.coordinatesLabel}
        eyebrow={page.eyebrow}
        title={page.title}
        description={page.answerLead}
        media={media}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: market.city, href: `/locations/${market.slug}` },
          { label: service.shortTitle },
        ]}
      />

      <SectionShell surface="canvas" spacing="spacious">
        <Container>
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <ContentSections sections={page.sections} />
              <div className="flex flex-wrap items-center gap-5 pt-12">
                <ActionLink href="/contact" variant="primary">
                  Start a {market.city} {service.shortTitle} Project
                </ActionLink>
                <ActionLink href={`/services/${service.slug}`} variant="underline">
                  How We Approach {service.shortTitle}
                </ActionLink>
              </div>
            </div>

            <aside className="space-y-8 lg:col-span-5">
              <div className="glass-surface space-y-6 p-7 sm:p-8">
                <p className="eyebrow-label text-[#5C5B58] dark:text-[#A7A6A3]">
                  {market.city} Considerations
                </p>
                <ul className="divide-y divide-[#17191B]/12 dark:divide-[#A7A6A3]/18">
                  {page.localConsiderations.map((item, idx) => (
                    <li key={item.title} className="space-y-1.5 py-4 first:pt-0 last:pb-0">
                      <p className="flex items-baseline gap-3 font-display text-lg font-semibold tracking-[-0.02em] text-[#17191B] dark:text-[#F2F0EC]">
                        <span className="font-mono text-xs tabular-nums text-[#5C5B58] dark:text-[#A7A6A3]">
                          [0{idx + 1}]
                        </span>
                        {item.title}
                      </p>
                      <p className="text-sm leading-[1.65] text-[#34383C] dark:text-[#D8D5CF]">
                        {item.detail}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              <nav
                aria-label={`More ${market.city} services`}
                className="glass-surface space-y-4 p-7 sm:p-8"
              >
                <p className="eyebrow-label text-[#5C5B58] dark:text-[#A7A6A3]">
                  Also in {market.city}
                </p>
                <ul className="space-y-3 text-sm">
                  {siblingServices.map((item) => (
                    <li key={item.service}>
                      <Link
                        href={localServicePath(item)}
                        className="group inline-flex items-center gap-2 font-medium underline-offset-4 hover:underline"
                      >
                        {item.title.replace(/\.$/, "")}
                        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link
                      href={`/locations/${market.slug}`}
                      className="group inline-flex items-center gap-2 font-medium underline-offset-4 hover:underline"
                    >
                      All {market.city} remodeling services
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                  </li>
                </ul>
              </nav>
            </aside>
          </div>
        </Container>
      </SectionShell>

      <FaqSection
        faq={page.faq}
        title={`${service.shortTitle} in ${market.city}: common questions.`}
        surface="elevated"
      />

      <SectionShell surface="canvas" spacing="compact">
        <Container>
          <EditorialHeading
            eyebrow="Keep Reading"
            size="section"
            title={`Guides for ${market.city} homeowners.`}
            className="mb-10"
          />
          <LinkCardGrid cards={relatedCards} />
        </Container>
      </SectionShell>

      <FinalConversionSection />
    </>
  );
}
