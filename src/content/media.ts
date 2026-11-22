import type { MediaAsset } from "@/types/domain";

/**
 * Centralized media registry.
 * All photographs below are explicitly marked as demonstration architectural
 * imagery under free commercial licenses (Unsplash / Pexels). None represent
 * completed BLACKSTEEL client projects. Replace entries here when BLACKSTEEL
 * commissions real Houston and Austin project photography.
 */
export const MEDIA_REGISTRY: Record<string, MediaAsset> = {
  "residence-pavilion": {
    id: "residence-pavilion",
    src: "/images/demo/residence-pavilion.jpg",
    alt: "Contemporary residence interior with black steel staircase, architectural concrete wall panels, matte black dining table, and floor-to-ceiling glazing",
    width: 1800,
    height: 1200,
    isDemonstration: true,
    attribution: "Unsplash Architectural Collection",
    sourceUrl: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
    license: "Unsplash License",
  },
  "kitchen-island": {
    id: "kitchen-island",
    src: "/images/demo/kitchen-island.jpg",
    alt: "Minimalist luxury kitchen featuring a bookmatched stone waterfall island, rift-cut oak cabinetry, linear ceiling lighting, and black steel windows",
    width: 1800,
    height: 1200,
    isDemonstration: true,
    attribution: "Salvo Media LLC / Unsplash",
    sourceUrl: "https://images.unsplash.com/photo-1783125127024-3f3eda015db4",
    license: "Unsplash License",
  },
  "residence-facade": {
    id: "residence-facade",
    src: "/images/demo/residence-facade.jpg",
    alt: "Open-plan luxury living room and kitchen with sliding black steel glass doors, timber accent wall, floating matte black millwork, and stone fireplace",
    width: 1800,
    height: 1224,
    isDemonstration: true,
    attribution: "Unsplash Architectural Collection",
    sourceUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
    license: "Unsplash License",
  },
  "residence-dusk": {
    id: "residence-dusk",
    src: "/images/demo/residence-dusk.jpg",
    alt: "Contemporary two-story residence at dusk clad in matte black metal and vertical timber with an illuminated indoor-outdoor dining pavilion",
    width: 1800,
    height: 1200,
    isDemonstration: true,
    attribution: "Unsplash Architectural Collection",
    sourceUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    license: "Unsplash License",
  },
  "bath-minimal": {
    id: "bath-minimal",
    src: "/images/demo/bath-minimal.jpg",
    alt: "Skylit minimalist luxury bathroom with honed limestone surfaces, frameless walk-in wet room, and floating custom oak double vanity",
    width: 1800,
    height: 2700,
    isDemonstration: true,
    attribution: "Lisa Anna / Pexels",
    sourceUrl:
      "https://www.pexels.com/photo/interior-of-a-modern-minimalist-bathroom-19889124/",
    license: "Pexels License",
  },
  "bath-sanctuary": {
    id: "bath-sanctuary",
    src: "/images/demo/bath-sanctuary.jpg",
    alt: "Custom remodeled bathroom with frameless glass shower enclosure, matte black fixtures, and veined quartz countertop",
    width: 1800,
    height: 1200,
    isDemonstration: true,
    attribution: "Unsplash Architectural Collection",
    sourceUrl: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a",
    license: "Unsplash License",
  },
  "millwork-detail": {
    id: "millwork-detail",
    src: "/images/demo/millwork-detail.jpg",
    alt: "Architectural home exterior combining cantilevered rooflines, black standing-seam panels, vertical cedar siding, and full-height glazing",
    width: 1600,
    height: 1067,
    isDemonstration: true,
    attribution: "Unsplash Architectural Collection",
    sourceUrl: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3",
    license: "Unsplash License",
  },
  "living-fireplace": {
    id: "living-fireplace",
    src: "/images/demo/living-fireplace.jpg",
    alt: "Newly built architectural living volume with masonry hearth, clerestory steel-framed windows, wide-plank oak flooring, and mitered stone edge",
    width: 1800,
    height: 1200,
    isDemonstration: true,
    attribution: "Salvo Media LLC / Unsplash",
    sourceUrl: "https://images.unsplash.com/photo-1783125127053-db9f268a847b",
    license: "Unsplash License",
  },
  "detail-hearth": {
    id: "detail-hearth",
    src: "/images/demo/detail-hearth.jpg",
    alt: "Close-up architectural study of linear fireplace inset within hand-laid light stone masonry and wide-plank white oak flooring",
    width: 1600,
    height: 1067,
    isDemonstration: true,
    attribution: "Salvo Media LLC / Unsplash",
    sourceUrl: "https://images.unsplash.com/photo-1783125127172-1898fe16b2ec",
    license: "Unsplash License",
  },
  "detail-material": {
    id: "detail-material",
    src: "/images/demo/detail-material.jpg",
    alt: "Interior architectural corner showing floor-to-ceiling black steel window mullions, perforated exterior privacy screen, and oak flooring",
    width: 1600,
    height: 1067,
    isDemonstration: true,
    attribution: "Unsplash Architectural Collection",
    sourceUrl: "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68",
    license: "Unsplash License",
  },
  "interior-lounge": {
    id: "interior-lounge",
    src: "/images/demo/interior-lounge.jpg",
    alt: "Serene architectural primary suite with recessed ceiling details, black steel French doors, and custom floor-to-ceiling drapery pocket",
    width: 1600,
    height: 1067,
    isDemonstration: true,
    attribution: "Unsplash Architectural Collection",
    sourceUrl: "https://images.unsplash.com/photo-1600607687644-c7171b42498f",
    license: "Unsplash License",
  },
  "hero-kitchen": {
    id: "hero-kitchen",
    src: "/images/demo/hero-kitchen.jpg",
    alt: "Sunlit remodeled living space with floating oak-and-steel staircase, full-height black window walls, and custom dark millwork credenza",
    width: 2000,
    height: 1333,
    isDemonstration: true,
    attribution: "Unsplash Architectural Collection",
    sourceUrl: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea",
    license: "Unsplash License",
  },
  "exterior-charcoal": {
    id: "exterior-charcoal",
    src: "/images/demo/exterior-charcoal.jpg",
    alt: "Modern charcoal architectural facade with black structural steel pergola, dark glazing, and stone terrace",
    width: 1800,
    height: 1201,
    isDemonstration: true,
    attribution: "Max Vakhtbovych / Pexels",
    sourceUrl:
      "https://www.pexels.com/photo/modern-house-exterior-7587880/",
    license: "Pexels License",
  },
};

export function getMediaAsset(id: string): MediaAsset {
  const asset = MEDIA_REGISTRY[id];
  if (!asset) {
    return MEDIA_REGISTRY["residence-pavilion"]!;
  }
  return asset;
}
