/**
 * Owner-confirmed business facts. Leave a field undefined (or a list empty)
 * until the owners verify it: structured data and visible contact lines only
 * publish values that are set here.
 */
export interface BusinessPrincipal {
  name: string;
  role: string;
}

export interface BusinessProfile {
  telephone?: string;
  email?: string;
  licenseNumber?: string;
  foundingYear?: string;
  principals: BusinessPrincipal[];
  /** Google Business Profile, Houzz, Instagram, LinkedIn, etc. */
  sameAs: string[];
  photography: {
    status: "unconfirmed" | "original" | "demonstration";
    note?: string;
  };
}

export function telephoneHref(telephone: string): string {
  return `tel:${telephone.replace(/[^\d+]/g, "")}`;
}

export const BUSINESS_PROFILE: BusinessProfile = {
  telephone: undefined,
  email: undefined,
  licenseNumber: undefined,
  foundingYear: undefined,
  principals: [],
  sameAs: [],
  photography: {
    status: "unconfirmed",
  },
};
