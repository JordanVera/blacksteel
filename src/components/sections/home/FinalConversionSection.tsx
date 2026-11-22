import Image from "next/image";
import { getMediaAsset } from "@/content/media";
import { Container } from "@/components/layout/Container";
import { ActionLink } from "@/components/ui/ActionLink";
import { RevealMask } from "@/components/motion/RevealMask";

export function FinalConversionSection() {
  const backdrop = getMediaAsset("exterior-charcoal");

  return (
    <section
      id="start-project"
      aria-label="Start a project with BLACKSTEEL"
      className="relative overflow-hidden border-t border-[#17191B]/12 bg-[#17191B] py-28 sm:py-36 lg:py-44 dark:border-[#A7A6A3]/20"
    >
      {/* Atmospheric architectural backdrop */}
      <Image
        src={backdrop.src}
        alt=""
        fill
        aria-hidden="true"
        sizes="100vw"
        className="object-cover object-center opacity-55"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#17191B]/82 via-[#17191B]/60 to-[#17191B]/92"
      />

      <Container size="narrow" className="relative z-10">
        <RevealMask>
          <div className="glass-surface p-8 text-center sm:p-12 lg:p-16">
            <div className="mx-auto flex max-w-2xl flex-col items-center space-y-7">
              <div className="flex items-center gap-3 eyebrow-label text-[#5C5B58] dark:text-[#A7A6A3]">
                <span className="tabular-nums">08</span>
                <span
                  aria-hidden="true"
                  className="h-px w-6 bg-[#17191B]/30 dark:bg-[#A7A6A3]/45"
                />
                <span>Begin a Conversation</span>
              </div>

              <h2 className="display-statement text-[#17191B] dark:text-[#F2F0EC]">
                Let&apos;s Build Something{" "}
                <span className="italic">Exceptional.</span>
              </h2>

              <p className="max-w-[52ch] text-base leading-[1.72] text-[#34383C] dark:text-[#D8D5CF] sm:text-[17px]">
                Whether you are planning a whole-home architectural remodel, a
                bespoke kitchen or bath, a structural addition, or a complex
                property reconstruction in Houston or Austin, our principals
                would welcome a private conversation.
              </p>

              <div className="flex flex-col items-center gap-4 pt-2 sm:flex-row">
                <ActionLink href="/contact" variant="primary">
                  Start Your Project
                </ActionLink>
                <ActionLink href="/process" variant="secondary">
                  Review Our Process
                </ActionLink>
              </div>

              <p className="pt-2 text-[11px] uppercase tracking-[0.18em] text-[#5C5B58] dark:text-[#A7A6A3]">
                Houston &amp; Austin, Texas · Private Consultations By
                Appointment
              </p>
            </div>
          </div>
        </RevealMask>
      </Container>
    </section>
  );
}
