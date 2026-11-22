import type { ProjectRecord } from "@/types/domain";

/**
 * Typed demonstration portfolio studies.
 * Every entry is explicitly flagged `isDemonstration: true` so the site never
 * misrepresents architectural studies as completed client projects.
 */
export const DEMONSTRATION_PROJECTS: readonly ProjectRecord[] = [
  {
    slug: "memorial-pavilion-remodel",
    index: "03.1",
    name: "Memorial Pavilion Residence",
    category: "Whole-Home Remodel",
    city: "Houston",
    neighborhood: "Memorial Villages",
    state: "TX",
    shortDescription:
      "A comprehensive architectural reconfiguration introducing structural steel openings, continuous white-oak millwork, and indoor-outdoor living transitions.",
    fullNarrative: [
      "This demonstration study illustrates BLACKSTEEL's approach to whole-home architectural remodeling in Houston's established residential neighborhoods. Rather than applying cosmetic finishes over an outdated plan, the work begins by rethinking circulation, natural daylight, and structural alignment.",
      "Load-bearing partitions between the kitchen, dining, and living volumes are replaced with concealed steel beams, opening an uninterrupted sightline to the terrace through thermally broken black-steel sliding glass panels. Custom matte-black millwork and horizontal timber wall paneling anchor the living elevation with quiet permanence.",
      "Mechanical systems, acoustic insulation, linear air diffusers, and recessed architectural lighting are coordinated at the framing stage so every surface reads with clean, unhurried discipline.",
    ],
    coverImageId: "residence-facade",
    galleryImageIds: [
      "residence-pavilion",
      "kitchen-island",
      "detail-material",
      "interior-lounge",
    ],
    scopeOfWork: [
      "Structural steel beam engineering & open-span reconfiguration",
      "Full-height black steel sliding glass wall system",
      "Custom floating matte-black cabinetry & architectural timber wall paneling",
      "Whole-home MEP upgrades, linear HVAC diffusers & architectural lighting",
      "Monolithic honed stone fireplace surround & wide-plank oak flooring",
    ],
    materialsAndFinishes: [
      "Honed Silver Travertine & Flamed Limestone",
      "Rift-Cut White Oak & Matte Black Lacquered Millwork",
      "Thermally Broken Architectural Steel Glazing",
      "Low-Iron Frameless Glass & Brushed Charcoal Hardware",
    ],
    featured: true,
    isDemonstration: true,
    beforeAfterImages: {
      beforeImageId: "living-fireplace",
      afterImageId: "residence-facade",
      caption:
        "Demonstration spatial study illustrating the progression from finished architectural shell to integrated millwork and living surfaces.",
    },
    completionDate: "Demonstration Study",
  },
  {
    slug: "westlake-monolith-kitchen",
    index: "03.2",
    name: "Westlake Monolith Kitchen",
    category: "Kitchen & Millwork",
    city: "Austin",
    neighborhood: "Westlake Hills",
    state: "TX",
    shortDescription:
      "A sculpted culinary core defined by a bookmatched waterfall stone island, flush rift-cut oak cabinetry, and recessed architectural ceiling geometry.",
    fullNarrative: [
      "Designed as a study in visual restraint, this kitchen demonstration eliminates upper-cabinet clutter in favor of full-height architectural pantry walls, integrated refrigeration, and a single monolithic preparation island.",
      "Every reveal is governed by a strict 3mm shadow-line tolerance. Bookmatched stone slabs wrap seamlessly from horizontal countertop planes down mitered waterfall edges and rise continuously across the range hood enclosure.",
      "Flush linear ceiling illumination traces the perimeter of the dropped architectural soffit, casting soft indirect light across the wide-plank oak flooring and adjacent limestone masonry.",
    ],
    coverImageId: "kitchen-island",
    galleryImageIds: ["detail-hearth", "living-fireplace", "residence-pavilion"],
    scopeOfWork: [
      "Bespoke full-height rift-cut white oak cabinetry fabrication",
      "Bookmatched mitered stone island & concealed range hood cladding",
      "Flush-mounted architectural plaster-in linear LED ceiling channels",
      "Integrated panel-ready appliance alignment & scullery routing",
      "Engineered wide-plank white oak flooring installation",
    ],
    materialsAndFinishes: [
      "Bookmatched Honed Quartzite Slabs",
      "Quarter-Sawn & Rift-Cut Natural White Oak",
      "Matte Black Architectural Plumbing Fixtures",
      "Level-5 Smooth Architectural Plaster Walls",
    ],
    featured: true,
    isDemonstration: true,
    completionDate: "Demonstration Study",
  },
  {
    slug: "river-oaks-bath-sanctuary",
    index: "03.3",
    name: "River Oaks Bath Sanctuary",
    category: "Bath Sanctuary",
    city: "Houston",
    neighborhood: "River Oaks",
    state: "TX",
    shortDescription:
      "A skylit primary bath wet room uniting large-format honed limestone, frameless structural glazing, and a cantilevered custom oak double vanity.",
    fullNarrative: [
      "This bathroom demonstration reflects BLACKSTEEL's commitment to moisture-resilient engineering hidden beneath tranquil, tactile surfaces. In Houston's humid climate, waterproofing integrity and vapor management are just as vital as stone selection.",
      "A curbless wet room with linear slot drainage allows large-format honed stone tiles to flow uninterrupted across floor and wall planes. Above, a framed architectural skylight washes textured vertical surfaces in shifting daylight.",
      "A custom cantilevered white-oak double vanity with mitered drawer fronts and concealed under-mount hardware preserves visual lightness while delivering disciplined daily storage.",
    ],
    coverImageId: "bath-minimal",
    galleryImageIds: ["bath-sanctuary", "interior-lounge", "detail-material"],
    scopeOfWork: [
      "Full waterproofing membrane system & curbless linear wet-room engineering",
      "Large-format honed limestone slab & handcrafted ceramic wall tile setting",
      "Custom floating white-oak double vanity & wall-mounted valve rough-in",
      "Skylight framing, moisture-rated recessed lighting & ventilation",
      "Low-iron frameless glass wet-room partition",
    ],
    materialsAndFinishes: [
      "Honed Limestone Floor & Wainscot Slabs",
      "Hand-Glazed Ivory Zellige Wall Tile",
      "Solid White Oak Cabinetry with Matte Clear Coat",
      "Brushed Nickel / Dark Architectural Brassware",
    ],
    featured: true,
    isDemonstration: true,
    completionDate: "Demonstration Study",
  },
  {
    slug: "barton-creek-architectural-addition",
    index: "03.4",
    name: "Barton Creek Structural Addition",
    category: "Structural Addition",
    city: "Austin",
    neighborhood: "Barton Creek",
    state: "TX",
    shortDescription:
      "A cantilevered black-steel and vertical-timber living pavilion expanding an existing residence into its wooded Central Texas lot.",
    fullNarrative: [
      "Expanding an architecturally significant home requires structural honesty and careful integration with existing rooflines, drainage planes, and mature trees.",
      "This demonstration addition pairs matte black architectural metal cladding and warm vertical timber screens around a covered indoor-outdoor dining terrace. Deep cantilevered eaves temper harsh Texas afternoon sun while framing evening garden views.",
      "Inside, the addition connects cleanly to the original residence through a double-height stair gallery with architectural concrete panels and exposed blackened-steel stringers.",
    ],
    coverImageId: "residence-dusk",
    galleryImageIds: [
      "millwork-detail",
      "residence-pavilion",
      "exterior-charcoal",
    ],
    scopeOfWork: [
      "Engineered pier foundation & cantilevered structural steel framing",
      "Matte black architectural metal fascia & vertical cedar rainscreen cladding",
      "Covered outdoor dining pavilion with integrated ceiling flush-mounts",
      "Thermally broken multi-slide glass wall & exterior stone hardscaping",
    ],
    materialsAndFinishes: [
      "Architectural Matte Black Steel & Aluminum Fascia",
      "Vertical Western Red Cedar Rainscreen Cladding",
      "Cast-In-Place Architectural Concrete & Basalt Pavers",
      "Low-E Architectural Glazing",
    ],
    featured: false,
    isDemonstration: true,
    completionDate: "Demonstration Study",
  },
];
