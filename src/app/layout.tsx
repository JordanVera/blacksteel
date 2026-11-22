import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import type { ReactNode } from "react";
import { SITE_NAME, SITE_URL, buildOrganizationJsonLd } from "@/lib/seo";
import { TRPCReactProvider } from "@/server/trpc/client";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Houston & Austin Luxury Remodeling`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Family-owned luxury residential remodeling, custom cabinetry and architectural millwork, structural construction, general contracting, and property restoration in Houston and Austin, Texas.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Built Beyond Ordinary.`,
    description:
      "Design-conscious residential remodeling, bespoke millwork, and architectural construction serving Houston and Austin, Texas.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Built Beyond Ordinary.`,
    description:
      "Design-conscious residential remodeling, bespoke millwork, and architectural construction serving Houston and Austin, Texas.",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#17191B" },
    { media: "(prefers-color-scheme: light)", color: "#F2F0EC" },
  ],
};

/**
 * Inline pre-hydration script enforcing dark mode by default unless
 * the visitor explicitly saved "light" in localStorage.
 */
const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem("blacksteel-theme");if(t==="light"){document.documentElement.classList.remove("dark");}else{document.documentElement.classList.add("dark");}}catch(e){document.documentElement.classList.add("dark");}})();`;

export default function RootLayout({ children }: { children: ReactNode }) {
  const organizationJsonLd = buildOrganizationJsonLd();

  return (
    <html
      lang="en"
      className={`dark ${cormorant.variable} ${manrope.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
      </head>
      <body className="min-h-screen bg-[#F2F0EC] text-[#17191B] antialiased selection:bg-[#34383C] selection:text-[#F2F0EC] dark:bg-[#17191B] dark:text-[#F2F0EC] dark:selection:bg-[#F2F0EC] dark:selection:text-[#17191B]">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:border focus:border-[#F2F0EC] focus:bg-[#17191B] focus:px-4 focus:py-2 focus:text-xs focus:uppercase focus:tracking-[0.18em] focus:text-[#F2F0EC]"
        >
          Skip to main content
        </a>
        <TRPCReactProvider>
          <ThemeProvider>
            <MotionProvider>
              <SiteHeader />
              <main id="main-content">{children}</main>
              <SiteFooter />
            </MotionProvider>
          </ThemeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
