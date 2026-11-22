import Image from "next/image";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  /**
   * "auto" swaps between logo-white (dark mode) and logo-black (light mode)
   * purely via Tailwind CSS dark: variants to prevent hydration flicker.
   * "dark" locks logo-white for always-dark photographic/obsidian surfaces.
   * "light" locks logo-black for always-light ivory surfaces.
   */
  surface?: "auto" | "dark" | "light";
  className?: string;
  priority?: boolean;
  sizes?: string;
}

const INTRINSIC_WIDTH = 2104;
const INTRINSIC_HEIGHT = 747;
const LOGO_ALT = "BLACKSTEEL Construction & Remodeling";

export function BrandLogo({
  surface = "auto",
  className,
  priority = false,
  sizes = "(max-width: 768px) 156px, 196px",
}: BrandLogoProps) {
  if (surface === "dark") {
    return (
      <Image
        src="/brand/logo-white.png"
        alt={LOGO_ALT}
        width={INTRINSIC_WIDTH}
        height={INTRINSIC_HEIGHT}
        priority={priority}
        sizes={sizes}
        className={cn("h-auto w-auto object-contain select-none", className)}
      />
    );
  }

  if (surface === "light") {
    return (
      <Image
        src="/brand/logo-black.png"
        alt={LOGO_ALT}
        width={INTRINSIC_WIDTH}
        height={INTRINSIC_HEIGHT}
        priority={priority}
        sizes={sizes}
        className={cn("h-auto w-auto object-contain select-none", className)}
      />
    );
  }

  return (
    <span className="relative inline-flex items-center">
      <Image
        src="/brand/logo-white.png"
        alt={LOGO_ALT}
        width={INTRINSIC_WIDTH}
        height={INTRINSIC_HEIGHT}
        priority={priority}
        sizes={sizes}
        className={cn(
          "hidden dark:block h-auto w-auto object-contain select-none",
          className
        )}
      />
      <Image
        src="/brand/logo-black.png"
        alt={LOGO_ALT}
        width={INTRINSIC_WIDTH}
        height={INTRINSIC_HEIGHT}
        priority={priority}
        sizes={sizes}
        className={cn(
          "block dark:hidden h-auto w-auto object-contain select-none",
          className
        )}
      />
    </span>
  );
}
