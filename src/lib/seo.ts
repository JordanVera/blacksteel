import type { Metadata } from "next";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://blacksteelconstruction.com";

export const SITE_NAME = "BLACKSTEEL Construction & Remodeling";

export function buildPageMetadata(input: {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
}): Metadata {
  const canonical = new URL(input.path, SITE_URL).toString();
  const imageUrl = input.ogImage
    ? new URL(input.ogImage, SITE_URL).toString()
    : new URL("/images/demo/hero-kitchen.jpg", SITE_URL).toString();

  return {
    title: input.title,
    description: input.description,
    alternates: {
      canonical,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: SITE_NAME,
      title: input.title,
      description: input.description,
      url: canonical,
      images: [
        {
          url: imageUrl,
          width: 1600,
          height: 1067,
          alt: input.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
      images: [imageUrl],
    },
  };
}

/**
 * Conservative structured data strictly omitting unverified street addresses,
 * review counts, founding years, or license numbers until confirmed by owners.
 */
export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: SITE_NAME,
    url: SITE_URL,
    logo: new URL("/brand/logo-white.png", SITE_URL).toString(),
    description:
      "Family-owned luxury residential remodeling, custom cabinetry and architectural millwork, structural construction, general contracting, and property restoration serving Houston and Austin, Texas.",
    areaServed: [
      {
        "@type": "City",
        name: "Houston",
        addressRegion: "TX",
        addressCountry: "US",
      },
      {
        "@type": "City",
        name: "Austin",
        addressRegion: "TX",
        addressCountry: "US",
      },
    ],
  };
}
