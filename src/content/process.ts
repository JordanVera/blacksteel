import type { ProcessStage } from "@/types/domain";

export const PROCESS_STAGES: readonly ProcessStage[] = [
  {
    number: "01",
    slug: "discover",
    title: "Discover",
    subtitle: "Listening, Site Walk & Spatial Assessment",
    description:
      "Every project begins in the space itself. We walk the property with you, study how light and circulation work today, evaluate underlying structural conditions, and listen closely to how you want the space to feel and function.",
    deliverables: [
      "On-site architectural & structural walkthrough",
      "Preliminary scope objectives & constraint review",
      "Early alignment on budget expectations & schedule windows",
    ],
    imageId: "millwork-detail",
    imageCaption: "Site evaluation, envelope assessment & spatial intent",
  },
  {
    number: "02",
    slug: "define",
    title: "Define",
    subtitle: "Feasibility, Scope Architecture & Investment Clarity",
    description:
      "Before drawings lock or demolition begins, we translate goals into a clear scope framework. We examine structural feasibility, establish realistic investment ranges, and identify long-lead architectural components early.",
    deliverables: [
      "Written scope brief & preliminary budget framework",
      "Structural engineering & permitting pathway review",
      "Trade constructability assessment",
    ],
    imageId: "detail-hearth",
    imageCaption: "Material strategy, tolerances & investment alignment",
  },
  {
    number: "03",
    slug: "design-and-plan",
    title: "Design & Plan",
    subtitle: "Architectural Detailing, Selections & Procurement",
    description:
      "Working alongside your architect or interior designer—or coordinating trusted design partners—we finalize cabinetry elevations, stone slabs, hardware schedules, lighting layouts, and a disciplined construction timeline.",
    deliverables: [
      "Millwork shop drawings & stone slab layout coordination",
      "Locked selections schedule & long-lead procurement",
      "Permitting submissions & master construction calendar",
    ],
    imageId: "kitchen-island",
    imageCaption: "Precision millwork elevations & slab verification",
  },
  {
    number: "04",
    slug: "execute",
    title: "Execute",
    subtitle: "Protected Sites, Skilled Trades & Field Oversight",
    description:
      "Execution is where design intent becomes physical permanence. Our principals oversee site protection, framing geometry, MEP rough-ins, waterproofing, and artisan finish installations with clear weekly communication.",
    deliverables: [
      "Clean site containment & neighborhood-conscious logistics",
      "Milestone inspections across structural, MEP & finish phases",
      "Consistent principal updates & transparent change management",
    ],
    imageId: "residence-pavilion",
    imageCaption: "Disciplined field coordination & structural craftsmanship",
  },
  {
    number: "05",
    slug: "refine-and-deliver",
    title: "Refine & Deliver",
    subtitle: "Detail Inspection, Commissioning & Handover",
    description:
      "Before handover, we scrutinize every reveal, miter, fixture alignment, and lighting scene under daylight and evening conditions. We walk the finished space together and leave you with complete care and closeout documentation.",
    deliverables: [
      "Multi-stage detail & finish quality audit",
      "Systems commissioning & architectural walkthrough",
      "Closeout dossier & post-completion care guidance",
    ],
    imageId: "residence-dusk",
    imageCaption: "Final architectural verification & seamless handover",
  },
];
