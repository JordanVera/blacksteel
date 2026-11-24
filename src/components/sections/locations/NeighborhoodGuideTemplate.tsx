import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { NeighborhoodGuide } from "@/types/domain";
import { LOCATION_MARKETS } from "@/content/locations";
import { getMediaAsset } from "@/content/media";
import {
  getLocalServicePages,
  getNeighborhoodGuides,
  localServicePath,
  neighborhoodPath,
} from "@/features/locations/catalog";
import { getArticlesBySlugs, journalPath } from "@/features/journal/catalog";
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

interface NeighborhoodGuideTemplateProps {
  guide: NeighborhoodGuide;
}

export function NeighborhoodGuideTemplate({
  guide,
}: NeighborhoodGuideTemplateProps) {
  const market = LOCATION_MARKETS[guide.market];
  const media = getMediaAsset(guide.imageId);
  const localServices = getLocalServicePages(guide.market);
  const otherGuides = getNeighborhoodGuides(guide.market).filter(
    (item) => item.slug !== guide.slug
  );
  const articles = getArticlesBySlugs(guide.journalSlugs);

  const relatedCards: LinkCard[] = [
    ...localServices.map((page) => ({
      href: localServicePath(page),
      eyebrow: `${market.city} · Service`,
      title: page.title.replace(/\.$/, ""),
      description: page.seoDescription,
      cta: "View Service",
    })),
    ...articles.map((article) => ({
      href: journalPath(article),
      eyebrow: `Journal · ${article.category}`,
      title: article.title,
      description: article.description,
      cta: "Read Article",
    })),
    ...otherGuides.map((item) => ({
      href: neighborhoodPath(item),
      eyebrow: `${market.city} · Neighborhood Guide`,
      title: `Remodeling in ${item.name}`,
      cta: "Read Guide",
    })),
  ];

  return (
    <>
      <PageHero
        index={market.coordinatesLabel}
        eyebrow={guide.eyebrow}
        title={guide.title}
        description={guide.answerLead}
        media={media}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: market.city, href: `/locations/${market.slug}` },
          { label: guide.name },
        ]}
      />

      <SectionShell surface="canvas" spacing="spacious">
        <Container>
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <ContentSections sections={guide.sections} />
              <div className="pt-12">
                <ActionLink href="/contact" variant="primary">
                  Start a {guide.name} Project
                </ActionLink>
              </div>
            </div>

            <aside className="space-y-8 lg:col-span-5">
              <div className="glass-surface space-y-5 p-7 sm:p-8">
                <p className="eyebrow-label text-[#5C5B58] dark:text-[#A7A6A3]">
                  Typical {guide.name} Projects
                </p>
                <ul className="space-y-3 text-sm leading-[1.65] text-[#34383C] dark:text-[#D8D5CF]">
                  {guide.typicalScopes.map((scope) => (
                    <li key={scope} className="flex items-start gap-2.5">
                      <span
                        aria-hidden="true"
                        className="mt-2.5 h-px w-3 shrink-0 bg-current opacity-50"
                      />
                      <span>{scope}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <nav
                aria-label={`${market.city} services`}
                className="glass-surface space-y-4 p-7 sm:p-8"
              >
                <p className="eyebrow-label text-[#5C5B58] dark:text-[#A7A6A3]">
                  Services in {guide.name}
                </p>
                <ul className="space-y-3 text-sm">
                  {localServices.map((page) => (
                    <li key={page.service}>
                      <Link
                        href={localServicePath(page)}
                        className="inline-flex items-center gap-2 font-medium underline-offset-4 hover:underline"
                      >
                        {page.title.replace(/\.$/, "")}
                        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link
                      href={`/locations/${market.slug}`}
                      className="inline-flex items-center gap-2 font-medium underline-offset-4 hover:underline"
                    >
                      Remodeling across {market.city}
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
        faq={guide.faq}
        title={`Remodeling in ${guide.name}: common questions.`}
        surface="elevated"
      />

      <SectionShell surface="canvas" spacing="compact">
        <Container>
          <EditorialHeading
            eyebrow="Keep Reading"
            size="section"
            title={`More for ${market.city} homeowners.`}
            className="mb-10"
          />
          <LinkCardGrid cards={relatedCards} />
        </Container>
      </SectionShell>

      <FinalConversionSection />
    </>
  );
}
