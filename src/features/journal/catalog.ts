import { JOURNAL_ARTICLES } from "@/content/journal";
import type { JournalArticle, ServiceSlug } from "@/types/domain";

export function journalPath(article: JournalArticle): string {
  return `/journal/${article.slug}`;
}

export function getAllArticles(): JournalArticle[] {
  return [...JOURNAL_ARTICLES].sort((a, b) =>
    b.published.localeCompare(a.published)
  );
}

export function getArticleBySlug(slug: string): JournalArticle | undefined {
  return JOURNAL_ARTICLES.find((article) => article.slug === slug);
}

export function getArticlesBySlugs(slugs: readonly string[]): JournalArticle[] {
  return slugs
    .map((slug) => getArticleBySlug(slug))
    .filter((article): article is JournalArticle => Boolean(article));
}

export function getArticlesForService(slug: ServiceSlug): JournalArticle[] {
  return JOURNAL_ARTICLES.filter((article) =>
    article.relatedServiceSlugs.includes(slug)
  );
}

export function formatJournalDate(isoDate: string): string {
  return new Date(`${isoDate}T12:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
