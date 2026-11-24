import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export interface LinkCard {
  href: string;
  eyebrow: string;
  title: string;
  description?: string;
  cta: string;
}

interface LinkCardGridProps {
  cards: readonly LinkCard[];
}

export function LinkCardGrid({ cards }: LinkCardGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {cards.map((card) => (
        <Link
          key={card.href}
          href={card.href}
          className="group glass-surface flex flex-col justify-between p-6 transition-colors hover:border-[#17191B]/35 dark:hover:border-[#F2F0EC]/40"
        >
          <div className="space-y-3">
            <span className="eyebrow-label text-[#5C5B58] dark:text-[#A7A6A3]">
              {card.eyebrow}
            </span>
            <h3 className="font-display text-xl font-semibold tracking-[-0.02em] text-[#17191B] dark:text-[#F2F0EC]">
              {card.title}
            </h3>
            {card.description ? (
              <p className="text-sm leading-[1.65] text-[#34383C] dark:text-[#D8D5CF]">
                {card.description}
              </p>
            ) : null}
          </div>
          <span className="mt-6 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em]">
            <span>{card.cta}</span>
            <ArrowUpRight
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </span>
        </Link>
      ))}
    </div>
  );
}
