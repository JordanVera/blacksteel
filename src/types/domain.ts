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

export interface ServiceItem {
  slug: ServiceSlug;
  pillarId: ServicePillarId;
  index: string;
  title: string;
  shortTitle: string;
  eyebrow: string;
  summary: string;
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
  isPrimaryPillar: boolean;
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

export interface LocationMarket {
  slug: 'houston' | 'austin';
  city: string;
  state: string;
  regionLabel: string;
  headline: string;
  subheadline: string;
  overview: string[];
  architecturalFocus: {
    title: string;
    detail: string;
  }[];
  serviceAreas: string[];
  imageId: string;
  coordinatesLabel: string;
}
