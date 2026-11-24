import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildArticleJsonLd, buildPageMetadata } from "@/lib/seo";
import { getMediaAsset } from "@/content/media";
import { getServiceBySlug } from "@/features/services/catalog";
import {
  formatJournalDate,
  getAllArticles,
  getArticleBySlug,
  journalPath,
} from "@/features/journal/catalog";
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

interface JournalArticlePageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: JournalArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  return buildPageMetadata({
    title: article.seoTitle,
    description: article.description,
    path: journalPath(article),
    ogImage: getMediaAsset(article.imageId).src,
    article: { published: article.published, modified: article.updated },
  });
}

export default async function JournalArticlePage({
  params,
}: JournalArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const media = getMediaAsset(article.imageId);
  const relatedCards: LinkCard[] = [
    ...article.relatedServiceSlugs.map((serviceSlug) => {
      const service = getServiceBySlug(serviceSlug);
      return {
        href: `/services/${service.slug}`,
        eyebrow: "Service",
        title: service.title,
        description: service.summary,
        cta: "View Service",
      };
    }),
    ...article.relatedLinks.map((link) => ({
      href: link.href,
      eyebrow: "Related",
      title: link.label,
      cta: "Continue",
    })),
  ];

  return (
    <>
      <JsonLd data={buildArticleJsonLd(article, media.src)} />
      <PageHero
        index={article.category.toUpperCase()}
        eyebrow="Journal"
        title={article.title}
        description={article.answerLead}
        media={media}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Journal", href: "/journal" },
          { label: article.title },
        ]}
      />

      <SectionShell surface="canvas" spacing="spacious">
        <Container>
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
            <aside className="lg:col-span-3">
              <dl className="space-y-5 border-t border-[#17191B]/14 pt-6 text-sm dark:border-[#A7A6A3]/22 lg:sticky lg:top-32">
                <div>
                  <dt className="eyebrow-label text-[#5C5B58] dark:text-[#A7A6A3]">
                    Published
                  </dt>
                  <dd className="mt-1.5 font-medium">
                    <time dateTime={article.published}>
                      {formatJournalDate(article.published)}
                    </time>
                  </dd>
                </div>
                {article.updated !== article.published ? (
                  <div>
                    <dt className="eyebrow-label text-[#5C5B58] dark:text-[#A7A6A3]">
                      Updated
                    </dt>
                    <dd className="mt-1.5 font-medium">
                      <time dateTime={article.updated}>
                        {formatJournalDate(article.updated)}
                      </time>
                    </dd>
                  </div>
                ) : null}
                <div>
                  <dt className="eyebrow-label text-[#5C5B58] dark:text-[#A7A6A3]">
                    Reading Time
                  </dt>
                  <dd className="mt-1.5 font-medium">
                    {article.readingMinutes} minutes
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow-label text-[#5C5B58] dark:text-[#A7A6A3]">
                    Written By
                  </dt>
                  <dd className="mt-1.5 font-medium">
                    BLACKSTEEL Construction &amp; Remodeling
                  </dd>
                </div>
              </dl>
            </aside>

            <div className="lg:col-span-9">
              <ContentSections sections={article.sections} />
              <div className="pt-12">
                <ActionLink href="/contact" variant="primary">
                  Discuss Your Project
                </ActionLink>
              </div>
            </div>
          </div>
        </Container>
      </SectionShell>

      {article.faq ? (
        <FaqSection
          faq={article.faq}
          title="Questions readers ask."
          surface="elevated"
        />
      ) : null}

      <SectionShell surface="canvas" spacing="compact">
        <Container>
          <EditorialHeading
            eyebrow="Keep Reading"
            size="section"
            title="Related services and guides."
            className="mb-10"
          />
          <LinkCardGrid cards={relatedCards} />
        </Container>
      </SectionShell>

      <FinalConversionSection />
    </>
  );
}
