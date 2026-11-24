export interface MediaAsset {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  isDemonstration: boolean;
  attribution: string;
  sourceUrl: string;
  license: string;
}

export type ServiceSlug =
  | 'luxury-remodeling'
  | 'kitchen-remodeling'
  | 'bathroom-remodeling'
  | 'custom-construction'
  | 'general-contracting'
  | 'restoration';

export type ServicePillarId =
  | 'luxury-remodeling'
  | 'custom-construction'
  | 'general-contracting'
  | 'restoration';

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ContentSection {
  heading: string;
  paragraphs: string[];
  list?: string[];
}

/** ISO calendar date, e.g. "2026-11-23". */
export type IsoDate = string;

export interface ServiceItem {
  slug: ServiceSlug;
  pillarId: ServicePillarId;
  index: string;
  title: string;
  shortTitle: string;
  seoTitle: string;
  eyebrow: string;
  summary: string;
  answerLead: string;
  heroHeadline: string;
  editorialIntro: string;
  imageId: string;
  deliverables: string[];
  idealFor: string[];
  architecturalConsiderations: {
    heading: string;
    body: string;
  }[];
  relatedSlugs: ServiceSlug[];
  faq: FaqItem[];
  isPrimaryPillar: boolean;
  updated: IsoDate;
}

export type ProjectCategory =
  | 'Whole-Home Remodel'
  | 'Kitchen & Millwork'
  | 'Bath Sanctuary'
  | 'Structural Addition'
  | 'Commercial Build-Out'
  | 'Architectural Restoration';

export interface ProjectRecord {
  slug: string;
  index: string;
  name: string;
  category: ProjectCategory;
  city: 'Houston' | 'Austin';
  neighborhood: string;
  state: 'TX';
  shortDescription: string;
  fullNarrative: string[];
  coverImageId: string;
  galleryImageIds: string[];
  scopeOfWork: string[];
  materialsAndFinishes: string[];
  featured: boolean;
  isDemonstration: boolean;
  beforeAfterImages?: {
    beforeImageId: string;
    afterImageId: string;
    caption: string;
  };
  completionDate?: string;
  updated: IsoDate;
}

export interface ProcessStage {
  number: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  imageId: string;
  imageCaption: string;
}

export type MarketSlug = 'houston' | 'austin';

export interface LocationMarket {
  slug: MarketSlug;
  city: string;
  state: string;
  regionLabel: string;
  headline: string;
  subheadline: string;
  answerLead: string;
  overview: string[];
  architecturalFocus: {
    title: string;
    detail: string;
  }[];
  serviceAreas: string[];
  imageId: string;
  coordinatesLabel: string;
  geo: { latitude: number; longitude: number };
  updated: IsoDate;
}

export type LocalServiceSlug = Extract<
  ServiceSlug,
  'kitchen-remodeling' | 'bathroom-remodeling' | 'luxury-remodeling'
>;

export interface LocalServicePage {
  market: MarketSlug;
  service: LocalServiceSlug;
  seoTitle: string;
  seoDescription: string;
  title: string;
  eyebrow: string;
  answerLead: string;
  sections: ContentSection[];
  localConsiderations: { title: string; detail: string }[];
  faq: FaqItem[];
  imageId: string;
  journalSlugs: string[];
  updated: IsoDate;
}

export interface NeighborhoodGuide {
  slug: string;
  market: MarketSlug;
  name: string;
  seoTitle: string;
  seoDescription: string;
  title: string;
  eyebrow: string;
  answerLead: string;
  sections: ContentSection[];
  typicalScopes: string[];
  faq: FaqItem[];
  imageId: string;
  journalSlugs: string[];
  updated: IsoDate;
}

export interface JournalArticle {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  category: string;
  published: IsoDate;
  updated: IsoDate;
  readingMinutes: number;
  answerLead: string;
  sections: ContentSection[];
  faq?: FaqItem[];
  relatedServiceSlugs: ServiceSlug[];
  relatedLinks: { label: string; href: string }[];
  imageId: string;
}
