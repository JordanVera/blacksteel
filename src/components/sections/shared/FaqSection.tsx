import { Plus } from "lucide-react";
import type { FaqItem } from "@/types/domain";
import { buildFaqJsonLd } from "@/lib/seo";
import { Container } from "@/components/layout/Container";
import { SectionShell } from "@/components/layout/SectionShell";
import { EditorialHeading } from "@/components/ui/EditorialHeading";
import { JsonLd } from "@/components/seo/JsonLd";

interface FaqSectionProps {
  faq: readonly FaqItem[];
  eyebrow?: string;
  title: string;
  surface?: "canvas" | "elevated";
}

export function FaqSection({
  faq,
  eyebrow = "Common Questions",
  title,
  surface = "canvas",
}: FaqSectionProps) {
  if (faq.length === 0) return null;

  return (
    <SectionShell surface={surface} spacing="default">
      <JsonLd data={buildFaqJsonLd(faq)} />
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <EditorialHeading eyebrow={eyebrow} size="section" title={title} />
          </div>
          <div className="lg:col-span-8">
            <div className="divide-y divide-[#17191B]/12 border-y border-[#17191B]/12 dark:divide-[#A7A6A3]/20 dark:border-[#A7A6A3]/20">
              {faq.map((item, idx) => (
                <details key={item.question} className="group" open={idx === 0}>
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden">
                    <h3 className="font-display text-lg font-semibold tracking-[-0.02em] text-[#17191B] dark:text-[#F2F0EC] sm:text-xl">
                      {item.question}
                    </h3>
                    <Plus
                      aria-hidden="true"
                      className="mt-1 h-4 w-4 shrink-0 text-[#5C5B58] transition-transform duration-300 group-open:rotate-45 dark:text-[#A7A6A3]"
                    />
                  </summary>
                  <p className="max-w-[64ch] pb-6 text-[15px] leading-[1.75] text-[#34383C] dark:text-[#D8D5CF]">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </SectionShell>
  );
}
