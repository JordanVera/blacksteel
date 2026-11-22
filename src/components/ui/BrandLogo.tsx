import Image from "next/image";
import Link from "next/link";
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
  /** Wrap the logo in a link to the home page. Default true; set false when an ancestor already links home. */
  linked?: boolean;
  onClick?: () => void;
  linkClassName?: string;
}

const INTRINSIC_WIDTH = 2104;
const INTRINSIC_HEIGHT = 747;
const LOGO_ALT = "BLACKSTEEL Construction & Remodeling";

export function BrandLogo({
  surface = "auto",
  className,
  priority = false,
  sizes = "(max-width: 768px) 156px, 196px",
  linked = true,
  onClick,
  linkClassName,
}: BrandLogoProps) {
  const imageClassName = cn("h-auto w-auto object-contain select-none", className);

  const wrap = (content: React.ReactNode) => {
    if (!linked) {
      return content;
    }
    return (
      <Link
        href="/"
        aria-label={`${LOGO_ALT} — Home`}
        onClick={onClick}
        className={cn("inline-flex items-center", linkClassName)}
      >
        {content}
      </Link>
    );
  };

  if (surface === "dark") {
    return wrap(
      <Image
        src="/brand/logo-white.png"
        alt={LOGO_ALT}
        width={INTRINSIC_WIDTH}
        height={INTRINSIC_HEIGHT}
        priority={priority}
        sizes={sizes}
        className={imageClassName}
      />
    );
  }

  if (surface === "light") {
    return wrap(
      <Image
        src="/brand/logo-black.png"
        alt={LOGO_ALT}
        width={INTRINSIC_WIDTH}
        height={INTRINSIC_HEIGHT}
        priority={priority}
        sizes={sizes}
        className={imageClassName}
      />
    );
  }

  return wrap(
    <span className="relative inline-flex items-center">
      <Image
        src="/brand/logo-white.png"
        alt={LOGO_ALT}
        width={INTRINSIC_WIDTH}
        height={INTRINSIC_HEIGHT}
        priority={priority}
        sizes={sizes}
        className={cn("hidden dark:block", imageClassName)}
      />
      <Image
        src="/brand/logo-black.png"
        alt={LOGO_ALT}
        width={INTRINSIC_WIDTH}
        height={INTRINSIC_HEIGHT}
        priority={priority}
        sizes={sizes}
        className={cn("block dark:hidden", imageClassName)}
      />
    </span>
  );
}
