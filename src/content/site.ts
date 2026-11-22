export const SITE_CONFIG = {
  companyName: "BLACKSTEEL Construction & Remodeling",
  shortName: "BLACKSTEEL",
  tagline: "Built Beyond Ordinary.",
  markets: "Houston & Austin, Texas",
  ownershipNote: "Family-owned and operated by two siblings.",
  contactPlaceholders: {
    emailLabel: "Studio Inquiries — Owner Confirmation Required",
    phoneLabel: "Direct Line — Owner Confirmation Required",
    hoursLabel: "Monday – Friday · By Appointment",
    marketsLabel: "Serving Greater Houston & Austin, Texas",
  },
} as const;

export interface NavItem {
  label: string;
  href: string;
}

export const PRIMARY_NAV: readonly NavItem[] = [
  { label: "Work", href: "/projects" },
  { label: "Expertise", href: "/services" },
  { label: "Approach", href: "/process" },
  { label: "Scope Modeler", href: "/scope-builder" },
  { label: "About", href: "/about" },
] as const;

export const FOOTER_COLUMNS = {
  practice: [
    { label: "Selected Work", href: "/projects" },
    { label: "Scope Modeler", href: "/scope-builder" },
    { label: "Our Company", href: "/about" },
    { label: "Our Approach", href: "/process" },
    { label: "Start a Project", href: "/contact" },
  ],
  expertise: [
    { label: "Luxury Remodeling", href: "/services/luxury-remodeling" },
    { label: "Kitchen Remodeling", href: "/services/kitchen-remodeling" },
    { label: "Bathroom Remodeling", href: "/services/bathroom-remodeling" },
    { label: "Custom Construction", href: "/services/custom-construction" },
    { label: "General Contracting", href: "/services/general-contracting" },
    { label: "Restoration & Reconstruction", href: "/services/restoration" },
  ],
  markets: [
    { label: "Houston, Texas", href: "/locations/houston" },
    { label: "Austin, Texas", href: "/locations/austin" },
    { label: "Privacy Policy", href: "/privacy" },
  ],
} as const;
