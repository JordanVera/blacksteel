import type { ServiceItem } from "@/types/domain";

export const SERVICES_CATALOG: readonly ServiceItem[] = [
  {
    slug: "luxury-remodeling",
    pillarId: "luxury-remodeling",
    index: "01",
    title: "Luxury Remodeling",
    shortTitle: "Luxury Remodeling",
    eyebrow: "Architectural Interiors",
    summary:
      "Whole-home transformations, bespoke kitchens, and spa-grade bathrooms executed with architectural precision and tailored millwork.",
    heroHeadline: "Reimagining existing architecture with permanence and restraint.",
    editorialIntro:
      "True remodeling is never skin-deep. We reconfigure spatial flow, introduce structural openings, upgrade mechanical systems, and finish every surface with bespoke cabinetry, natural stone, and disciplined joinery.",
    imageId: "residence-facade",
    deliverables: [
      "Whole-home interior reconfigurations & structural wall removal",
      "Luxury kitchen & scullery renovations",
      "Primary bath sanctuaries & curbless wet rooms",
      "Custom cabinetry, architectural paneling & built-in millwork",
      "Wide-plank wood flooring, stone masonry & Level-5 plaster finishes",
    ],
    idealFor: [
      "Homeowners transforming established Houston and Austin residences",
      "Interior designers and architects seeking a detail-obsessed build partner",
      "Discerning buyers modernizing newly acquired residential estates",
    ],
    architecturalConsiderations: [
      {
        heading: "Structural Alignment First",
        body: "Before finishes are ordered, we verify framing geometry, slab flatness, and concealed steel supports so cabinetry reveals and stone transitions sit true.",
      },
      {
        heading: "Integrated MEP Coordination",
        body: "Linear air diffusers, flush-mount lighting, concealed shade pockets, and smart controls are mapped during rough-in rather than retrofitted.",
      },
      {
        heading: "Protected Living Environments",
        body: "Clean job-site protocols, negative-air containment where applicable, and clear weekly milestones protect both the home and the client's calendar.",
      },
    ],
    relatedSlugs: [
      "kitchen-remodeling",
      "bathroom-remodeling",
      "custom-construction",
    ],
    isPrimaryPillar: true,
  },
  {
    slug: "custom-construction",
    pillarId: "custom-construction",
    index: "02",
    title: "Custom Construction",
    shortTitle: "Custom Construction",
    eyebrow: "Structural Additions & Build-Outs",
    summary:
      "Architectural additions, structural renovations, bespoke pavilions, and select commercial tenant improvements built to exacting tolerances.",
    heroHeadline: "Structural ambition matched by field-level precision.",
    editorialIntro:
      "From cantilevered residential additions and outdoor living pavilions to refined commercial spaces, our construction team bridges architectural drawings and complex real-world site conditions across Houston and Austin.",
    imageId: "residence-dusk",
    deliverables: [
      "Architectural residential additions & second-story expansions",
      "Structural steel framing & large-span glazing installations",
      "Covered architectural pavilions, guest suites & studio structures",
      "Select commercial tenant improvements & boutique studio build-outs",
      "Custom architectural facades, rainscreens & exterior stone work",
    ],
    idealFor: [
      "Homeowners expanding square footage without sacrificing architectural cohesion",
      "Real estate investors elevating high-value residential or boutique commercial assets",
      "Architects requiring reliable structural execution on complex sites",
    ],
    architecturalConsiderations: [
      {
        heading: "Regional Soil & Site Engineering",
        body: "Houston's expansive Gulf Coast clays and Austin's sloped limestone topography demand tailored foundation engineering and drainage detailing.",
      },
      {
        heading: "Envelope & Thermal Performance",
        body: "High-performance waterproofing, continuous insulation, and thermally broken glazing ensure lasting comfort in Texas heat and humidity.",
      },
      {
        heading: "Seamless Existing-to-New Tie-Ins",
        body: "Roofline geometry, floor elevations, and exterior cladding transitions are detailed so additions read as original architecture.",
      },
    ],
    relatedSlugs: [
      "general-contracting",
      "luxury-remodeling",
      "restoration",
    ],
    isPrimaryPillar: true,
  },
  {
    slug: "general-contracting",
    pillarId: "general-contracting",
    index: "03",
    title: "General Contracting",
    shortTitle: "General Contracting",
    eyebrow: "Execution & Governance",
    summary:
      "Transparent pre-construction planning, vetted specialty trade orchestration, and disciplined schedule and budget oversight from permit to handover.",
    heroHeadline: "Single-point accountability across every trade and detail.",
    editorialIntro:
      "Complex residential and commercial builds succeed in the coordination between trades. As a sibling-led general contractor, BLACKSTEEL maintains direct principal involvement from early feasibility through final punch-list verification.",
    imageId: "millwork-detail",
    deliverables: [
      "Pre-construction feasibility, constructability reviews & value analysis",
      "Detailed line-item budgeting & transparent procurement tracking",
      "Municipal permitting, HOA coordination & inspection management",
      "Vetted specialty trade scheduling & daily on-site quality control",
      "Closeout documentation, warranty orientation & punch-list completion",
    ],
    idealFor: [
      "Architect-led projects requiring collaborative pre-construction and bidding",
      "Homeowners seeking clear communication without fragmented subcontractors",
      "Commercial property owners executing structured tenant build-outs",
    ],
    architecturalConsiderations: [
      {
        heading: "Pre-Construction Clarity",
        body: "Early alignment on long-lead stone, custom millwork, glazing, and appliances eliminates costly mid-project stalls.",
      },
      {
        heading: "Principal-Level Communication",
        body: "Clients and design partners speak directly with leadership—receiving concise progress summaries, field photos, and proactive decision schedules.",
      },
      {
        heading: "Craftsmanship Verification",
        body: "Every trade handoff is inspected against architectural drawings before the next layer conceals the work.",
      },
    ],
    relatedSlugs: [
      "custom-construction",
      "luxury-remodeling",
      "restoration",
    ],
    isPrimaryPillar: true,
  },
  {
    slug: "restoration",
    pillarId: "restoration",
    index: "04",
    title: "Restoration & Reconstruction",
    shortTitle: "Restoration & Reconstruction",
    eyebrow: "Architectural Recovery",
    summary:
      "Thoughtful structural reconstruction and finish restoration for properties affected by water, storm, or architectural wear—rebuilt to a higher standard.",
    heroHeadline: "Restoring structural integrity with the craft of a bespoke build.",
    editorialIntro:
      "When unexpected damage strikes a refined property, standard franchise repairs rarely honor the home's architecture. BLACKSTEEL approaches reconstruction with the same material rigor and detailing discipline as our flagship remodels.",
    imageId: "living-fireplace",
    deliverables: [
      "Structural framing, subfloor & envelope reconstruction",
      "Water and storm-affected interior rebuilds for luxury homes",
      "Custom cabinetry, hardwood & natural stone matching or upgrades",
      "Comprehensive scope documentation for complex property recovery",
      "Opportunity-driven upgrades integrated during reconstruction",
    ],
    idealFor: [
      "Discerning homeowners seeking architectural-grade reconstruction after property damage",
      "Property owners combining necessary structural repairs with an intentional interior upgrade",
      "Investors restoring high-value residential or commercial assets",
    ],
    architecturalConsiderations: [
      {
        heading: "Dry, Sound Substrates First",
        body: "We never close up a wall or lay finish flooring until structural framing, moisture levels, and building-envelope integrity are verified.",
      },
      {
        heading: "Material Continuity",
        body: "Matching custom millwork profiles, continuous wood grain, and stone veining requires dedicated artisan sourcing rather than off-the-shelf substitutes.",
      },
      {
        heading: "Elevated Reconstruction",
        body: "Many owners use reconstruction as a catalyst to resolve long-standing layout or lighting compromises while walls are already open.",
      },
    ],
    relatedSlugs: [
      "luxury-remodeling",
      "general-contracting",
      "custom-construction",
    ],
    isPrimaryPillar: true,
  },
  {
    slug: "kitchen-remodeling",
    pillarId: "luxury-remodeling",
    index: "01.A",
    title: "Kitchen Remodeling",
    shortTitle: "Kitchen Remodeling",
    eyebrow: "Bespoke Culinary Spaces",
    summary:
      "Architectural kitchens built around custom cabinetry, bookmatched stone islands, concealed sculleries, and precision appliance integration.",
    heroHeadline: "Architectural kitchens crafted for daily ritual and permanence.",
    editorialIntro:
      "The kitchen anchors modern residential living. We approach every kitchen remodel as an exercise in spatial clarity—balancing custom millwork fabrication, natural stone stonework, integrated ventilation, and layered architectural lighting.",
    imageId: "kitchen-island",
    deliverables: [
      "Spatial layout redesign & structural pass-through engineering",
      "Custom inset, frameless, or fluted architectural cabinetry",
      "Waterfall stone islands, slab backsplashes & concealed range hoods",
      "Integrated panel-ready appliances & hidden scullery/pantry design",
      "Task, ambient & plaster-in linear architectural lighting",
    ],
    idealFor: [
      "Homeowners replacing builder-grade kitchens with bespoke architectural millwork",
      "Entertainers opening closed kitchens into seamless living and dining rooms",
      "Designers requiring millwork installation with strict reveal tolerances",
    ],
    architecturalConsiderations: [
      {
        heading: "Millwork Precision",
        body: "Walls are floated plumb and level before cabinet installation so tall integrated panels align seamlessly across entire elevations.",
      },
      {
        heading: "Stone Layout & Seam Discipline",
        body: "We review full stone slabs with clients and fabricators before cutting to align veining across islands, mitered aprons, and backsplashes.",
      },
      {
        heading: "Quiet Mechanical Performance",
        body: "Remote-blower ventilation, dedicated appliance circuits, and thoughtful plumbing rough-ins keep the kitchen serene in daily use.",
      },
    ],
    relatedSlugs: [
      "luxury-remodeling",
      "bathroom-remodeling",
      "general-contracting",
    ],
    isPrimaryPillar: false,
  },
  {
    slug: "bathroom-remodeling",
    pillarId: "luxury-remodeling",
    index: "01.B",
    title: "Bathroom Remodeling",
    shortTitle: "Bathroom Remodeling",
    eyebrow: "Private Sanctuaries",
    summary:
      "Curbless stone wet rooms, custom floating vanities, sculptural soaking tubs, and quiet architectural lighting engineered for lasting calm.",
    heroHeadline: "Tactile calm built on uncompromising waterproofing.",
    editorialIntro:
      "A luxury bathroom succeeds equally on what you see and what remains concealed behind the stone. From recessed linear drains and continuous waterproofing membranes to floating oak vanities and soft skylight daylighting, every detail is engineered to endure.",
    imageId: "bath-minimal",
    deliverables: [
      "Curbless walk-in wet rooms & steam shower enclosures",
      "Large-format limestone, marble & porcelain slab fabrication",
      "Custom floating & furniture-grade architectural vanities",
      "Wall-mounted thermostatic plumbing & radiant floor warming",
      "Frameless low-iron glass partitions & custom backlit mirrors",
    ],
    idealFor: [
      "Homeowners transforming primary baths into serene architectural retreats",
      "Multi-bath whole-home renovations demanding cohesive material palettes",
      "Clients prioritizing low-maintenance stone detailing and reliable waterproofing",
    ],
    architecturalConsiderations: [
      {
        heading: "Continuous Waterproofing Systems",
        body: "Subfloor recessing, sloped mortar beds, and flood-tested membrane systems protect surrounding structures from moisture intrusion.",
      },
      {
        heading: "Lighting Temperature & Glare Control",
        body: "Layered vertical vanity illumination, recessed wet-rated downlights, and warm indirect cove lighting create flattering, restful ambiance.",
      },
      {
        heading: "Clean Stone Transitions",
        body: "Mitered niches, flush linear drains, and bookmatched shower walls remove visual clutter and plastic trim edges.",
      },
    ],
    relatedSlugs: [
      "luxury-remodeling",
      "kitchen-remodeling",
      "restoration",
    ],
    isPrimaryPillar: false,
  },
];
