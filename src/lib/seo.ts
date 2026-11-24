import type { Metadata } from "next";
import { BUSINESS_PROFILE } from "@/content/business";
import type {
  FaqItem,
  JournalArticle,
  LocationMarket,
  ServiceItem,
} from "@/types/domain";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://blacksteelconstruction.com";

export const SITE_NAME = "BLACKSTEEL Construction & Remodeling";
export const SITE_SHORT_NAME = "BLACKSTEEL";
export const TITLE_SUFFIX = ` | ${SITE_SHORT_NAME}`;

export const SITE_DESCRIPTION =
  "Family-owned luxury residential remodeling, custom cabinetry and architectural millwork, structural construction, general contracting, and property restoration serving Houston and Austin, Texas.";

const ORGANIZATION_ID = `${SITE_URL}/#organization`;

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString();
}

export function buildPageMetadata(input: {
  /** A plain string receives the layout's " | BLACKSTEEL" suffix. */
  title: string | { absolute: string };
  description: string;
  path: string;
  ogImage?: string;
  article?: { published: string; modified: string };
}): Metadata {
  const canonical = absoluteUrl(input.path);
  const imageUrl = absoluteUrl(input.ogImage ?? "/images/demo/hero-kitchen.jpg");
  const socialTitle =
    typeof input.title === "string"
      ? `${input.title}${TITLE_SUFFIX}`
      : input.title.absolute;

  return {
    title: input.title,
    description: input.description,
    alternates: {
      canonical,
    },
    openGraph: {
      ...(input.article
        ? {
            type: "article",
            publishedTime: input.article.published,
            modifiedTime: input.article.modified,
          }
        : { type: "website" }),
      locale: "en_US",
      siteName: SITE_NAME,
      title: socialTitle,
      description: input.description,
      url: canonical,
      images: [
        {
          url: imageUrl,
          width: 1600,
          height: 1067,
          alt: socialTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: input.description,
      images: [imageUrl],
    },
  };
}

type JsonLdObject = Record<string, unknown>;

function optionalBusinessFields(): JsonLdObject {
  const fields: JsonLdObject = {};
  if (BUSINESS_PROFILE.telephone) fields.telephone = BUSINESS_PROFILE.telephone;
  if (BUSINESS_PROFILE.email) fields.email = BUSINESS_PROFILE.email;
  if (BUSINESS_PROFILE.foundingYear) {
    fields.foundingDate = BUSINESS_PROFILE.foundingYear;
  }
  if (BUSINESS_PROFILE.sameAs.length > 0) {
    fields.sameAs = BUSINESS_PROFILE.sameAs;
  }
  if (BUSINESS_PROFILE.principals.length > 0) {
    fields.founder = BUSINESS_PROFILE.principals.map((person) => ({
      "@type": "Person",
      name: person.name,
      jobTitle: person.role,
    }));
  }
  return fields;
}

const AREA_SERVED = [
  {
    "@type": "City",
    name: "Houston",
    containedInPlace: { "@type": "State", name: "Texas" },
  },
  {
    "@type": "City",
    name: "Austin",
    containedInPlace: { "@type": "State", name: "Texas" },
  },
];

/**
 * Street address, review counts, and license numbers stay out until the
 * owners confirm them in `BUSINESS_PROFILE`.
 */
export function buildOrganizationJsonLd(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": ORGANIZATION_ID,
    name: SITE_NAME,
    alternateName: SITE_SHORT_NAME,
    url: SITE_URL,
    logo: absoluteUrl("/brand/logo-white.png"),
    image: absoluteUrl("/images/kitchen/1.jpg"),
    description: SITE_DESCRIPTION,
    areaServed: AREA_SERVED,
    ...optionalBusinessFields(),
  };
}

/** Intermediate crumbs without an href are omitted; the final crumb may omit `item`. */
export function buildBreadcrumbJsonLd(
  items: readonly BreadcrumbItem[]
): JsonLdObject | null {
  const lastIndex = items.length - 1;
  const crumbs = items.filter((item, idx) => item.href || idx === lastIndex);
  if (crumbs.length < 2) return null;

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: crumb.label,
      ...(crumb.href ? { item: absoluteUrl(crumb.href) } : {}),
    })),
  };
}

export function buildServiceJsonLd(input: {
  name: string;
  description: string;
  path: string;
  serviceType: string;
  market?: LocationMarket;
}): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    serviceType: input.serviceType,
    description: input.description,
    url: absoluteUrl(input.path),
    provider: { "@id": ORGANIZATION_ID },
    areaServed: input.market
      ? {
          "@type": "City",
          name: input.market.city,
          containedInPlace: { "@type": "State", name: input.market.state },
        }
      : AREA_SERVED,
  };
}

export function buildServiceItemJsonLd(service: ServiceItem): JsonLdObject {
  return buildServiceJsonLd({
    name: service.seoTitle,
    description: service.answerLead,
    path: `/services/${service.slug}`,
    serviceType: service.title,
  });
}

export function buildFaqJsonLd(faq: readonly FaqItem[]): JsonLdObject | null {
  if (faq.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function buildLocationBusinessJsonLd(
  market: LocationMarket
): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": `${absoluteUrl(`/locations/${market.slug}`)}#business`,
    name: `${SITE_NAME} — ${market.city}`,
    url: absoluteUrl(`/locations/${market.slug}`),
    description: market.answerLead,
    image: absoluteUrl(`/images/kitchen/1.jpg`),
    parentOrganization: { "@id": ORGANIZATION_ID },
    areaServed: [
      {
        "@type": "City",
        name: market.city,
        containedInPlace: { "@type": "State", name: market.state },
      },
      ...market.serviceAreas
        .filter((area) => !area.startsWith("Greater "))
        .map((area) => ({ "@type": "Place", name: `${area}, ${market.city}` })),
    ],
    geo: {
      "@type": "GeoCoordinates",
      latitude: market.geo.latitude,
      longitude: market.geo.longitude,
    },
    ...optionalBusinessFields(),
  };
}

export function buildArticleJsonLd(
  article: JournalArticle,
  imageSrc: string
): JsonLdObject {
  const author =
    BUSINESS_PROFILE.principals.length > 0
      ? BUSINESS_PROFILE.principals.map((person) => ({
          "@type": "Person",
          name: person.name,
          jobTitle: person.role,
        }))
      : { "@id": ORGANIZATION_ID };

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.description,
    image: absoluteUrl(imageSrc),
    datePublished: article.published,
    dateModified: article.updated,
    mainEntityOfPage: absoluteUrl(`/journal/${article.slug}`),
    author,
    publisher: { "@id": ORGANIZATION_ID },
  };
}
