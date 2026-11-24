import type { LocationMarket } from "@/types/domain";

export const LOCATION_MARKETS: Record<"houston" | "austin", LocationMarket> = {
  houston: {
    slug: "houston",
    city: "Houston",
    state: "Texas",
    regionLabel: "Gulf Coast Residential & Commercial",
    headline: "Architectural remodeling tailored to Houston's estates and climate.",
    subheadline:
      "From mature tree-lined neighborhoods inside the Loop to sprawling Memorial properties, we execute complex renovations engineered for Gulf Coast humidity, expansive soils, and elevated daily living.",
    answerLead:
      "BLACKSTEEL Construction & Remodeling is a family-owned remodeling contractor in Houston, Texas, handling luxury kitchens, bathrooms, whole-home remodels, additions, and general contracting in River Oaks, Memorial, West University, Bellaire, the Heights, and the rest of Greater Houston.",
    overview: [
      "Remodeling in Houston presents distinct architectural and technical realities. Classic estates and mid-century residences across River Oaks, Memorial, Tanglewood, West University, and Bellaire frequently combine generous footprints with compartmentalized layouts, aging mechanical systems, and building envelopes tested by heat and moisture.",
      "BLACKSTEEL approaches Houston renovations from the structure outward—coordinating foundation engineering, high-efficiency dehumidification and HVAC distribution, moisture-resilient waterproofing, and custom architectural millwork that performs gracefully year after year.",
    ],
    architecturalFocus: [
      {
        title: "Gulf Coast Envelope & Moisture Discipline",
        detail:
          "Proper vapor profiles, curbless wet-room waterproofing, thermally broken glazing, and balanced HVAC engineering prevent hidden humidity issues.",
      },
      {
        title: "Open-Span Reconfiguration",
        detail:
          "Transforming compartmentalized traditional floor plans with concealed steel beams, expansive kitchen-living connections, and garden sightlines.",
      },
      {
        title: "Established Neighborhood Logistics",
        detail:
          "Quiet, respectful job-site management, municipal permitting familiarity, and clean material staging in premier Houston communities.",
      },
    ],
    serviceAreas: [
      "River Oaks",
      "Memorial Villages",
      "Tanglewood",
      "West University Place",
      "Bellaire",
      "The Heights",
      "Montrose",
      "Upper Kirby",
      "Spring Branch",
      "Greater Houston",
    ],
    imageId: "residence-dusk",
    coordinatesLabel: "29.7604° N · 95.3698° W",
    geo: { latitude: 29.7604, longitude: -95.3698 },
    updated: "2026-11-23",
  },
  austin: {
    slug: "austin",
    city: "Austin",
    state: "Texas",
    regionLabel: "Central Texas Modern & Hill Country",
    headline: "Precision construction shaped for Austin's light, terrain, and architecture.",
    subheadline:
      "Serving discerning homeowners, architects, and designers across Austin with bespoke interior remodeling, custom cabinetry, structural additions, and disciplined general contracting.",
    answerLead:
      "BLACKSTEEL Construction & Remodeling is a family-owned remodeling contractor in Austin, Texas, handling luxury kitchens, bathrooms, whole-home remodels, additions, and general contracting in Westlake Hills, Tarrytown, Barton Creek, Clarksville, Travis Heights, and the rest of Greater Austin.",
    overview: [
      "Austin's architectural landscape celebrates the threshold between interior shelter and Central Texas terrain—limestone topography, live oak canopies, cantilevered overhangs, and expansive glass walls that frame changing Hill Country light.",
      "Whether modernizing an established Tarrytown or Clarksville home, fabricating minimalist oak-and-stone kitchens in Westlake, or executing a complex structural addition near Barton Creek, BLACKSTEEL brings meticulous trade coordination and unwavering finish tolerances to every Austin site.",
    ],
    architecturalFocus: [
      {
        title: "Indoor-Outdoor Thresholds",
        detail:
          "Flush pocket sliders, continuous stone paving, shaded living pavilions, and deep architectural eaves calibrated for Central Texas sun.",
      },
      {
        title: "Sloped Sites & Limestone Terrain",
        detail:
          "Thoughtful structural framing, site drainage engineering, and multi-level remodeling coordinated cleanly with local engineers and city reviews.",
      },
      {
        title: "Architect & Designer Collaboration",
        detail:
          "Transparent pre-construction budgeting, shop-drawing discipline, and faithful execution of minimalist modern and warm contemporary details.",
      },
    ],
    serviceAreas: [
      "Westlake Hills",
      "Tarrytown",
      "Barton Creek",
      "Clarksville",
      "Travis Heights",
      "Zilker",
      "Rollingwood",
      "Lake Austin",
      "Pemberton Heights",
      "Greater Austin",
    ],
    imageId: "millwork-detail",
    coordinatesLabel: "30.2672° N · 97.7431° W",
    geo: { latitude: 30.2672, longitude: -97.7431 },
    updated: "2026-11-23",
  },
};
