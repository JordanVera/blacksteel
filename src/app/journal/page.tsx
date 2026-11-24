import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { buildPageMetadata } from "@/lib/seo";
import { getMediaAsset } from "@/content/media";
import {
  formatJournalDate,
  getAllArticles,
  journalPath,
} from "@/features/journal/catalog";
import { Container } from "@/components/layout/Container";
import { SectionShell } from "@/components/layout/SectionShell";
import { PageHero } from "@/components/sections/shared/PageHero";
import { FinalConversionSection } from "@/components/sections/home/FinalConversionSection";

export const metadata: Metadata = buildPageMetadata({
  title: "Remodeling Journal: Houston & Austin Guides",
  description:
    "Practical guides from BLACKSTEEL Construction & Remodeling on kitchen costs, wet rooms in Houston humidity, Austin limestone additions, pre-construction budgeting, and working with architects.",
  path: "/journal",
});

export default function JournalIndexPage() {
  const articles = getAllArticles();

  return (
    <>
      <PageHero
        index="JOURNAL"
        eyebrow="Field Notes"
        title="Practical guides for remodeling in Houston and Austin."
        description="Plain answers on budgets, timelines, structure, and climate from the BLACKSTEEL Construction & Remodeling team, written for homeowners, architects, and designers planning work in Texas."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Journal" }]}
      />

      <SectionShell surface="canvas" spacing="spacious">
        <Container>
          <div className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2">
            {articles.map((article) => {
              const media = getMediaAsset(article.imageId);
              return (
                <article key={article.slug}>
                  <Link href={journalPath(article)} className="group block">
                    <div className="relative aspect-[16/10] w-full overflow-hidden border border-[#17191B]/12 bg-[#17191B] dark:border-[#A7A6A3]/20">
                      <Image
                        src={media.src}
                        alt={media.alt}
                        fill
                        sizes="(min-width: 768px) 48vw, 100vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                      <span className="absolute left-4 top-4 glass-photo px-3 py-1 text-[10px] uppercase tracking-[0.18em]">
                        {article.category}
                      </span>
                    </div>
                    <div className="mt-5 space-y-3">
                      <p className="eyebrow-label text-[#5C5B58] dark:text-[#A7A6A3]">
                        <time dateTime={article.published}>
                          {formatJournalDate(article.published)}
                        </time>{" "}
                        · {article.readingMinutes} min read
                      </p>
                      <h2 className="flex items-start justify-between gap-4 font-display text-2xl font-semibold tracking-[-0.025em] group-hover:opacity-75">
                        <span>{article.title}</span>
                        <ArrowUpRight
                          className="mt-1.5 h-4 w-4 shrink-0"
                          aria-hidden="true"
                        />
                      </h2>
                      <p className="max-w-[56ch] text-[15px] leading-[1.7] text-[#34383C] dark:text-[#D8D5CF]">
                        {article.description}
                      </p>
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>
        </Container>
      </SectionShell>

      <FinalConversionSection />
    </>
  );
}
