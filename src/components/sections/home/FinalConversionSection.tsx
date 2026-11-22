import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { ArchitecturalLamp } from "@/components/aceternity/ArchitecturalLamp";
import { MovingBorderButton } from "@/components/aceternity/MovingBorderButton";

export function FinalConversionSection() {
  return (
    <section
      id="start-project"
      aria-label="Start a project with BLACKSTEEL"
      className="border-t border-[#A7A6A3]/20 bg-[#17191B]"
    >
      <ArchitecturalLamp>
        <Container size="narrow">
          <div className="glass-steel arch-crosshair p-8 text-center sm:p-12 lg:p-16">
            <div className="mx-auto flex max-w-2xl flex-col items-center space-y-7">
              <div className="flex items-center gap-3 eyebrow-label text-[#A7A6A3]">
                <span className="tabular-nums">[08]</span>
                <span
                  aria-hidden="true"
                  className="h-px w-6 bg-[#A7A6A3]/45"
                />
                <span>Initiate Consultation</span>
              </div>

              <h2 className="display-statement text-[#F2F0EC]">
                Let&apos;s Build Something{" "}
                <span className="bg-gradient-to-r from-[#F2F0EC] via-[#D8D5CF] to-[#A7A6A3] bg-clip-text text-transparent">
                  Unmistakable.
                </span>
              </h2>

              <p className="max-w-[52ch] text-base leading-[1.72] text-[#D8D5CF] sm:text-[17px]">
                Whether you are planning a whole-home architectural remodel, a
                custom kitchen or bath, a structural addition, or a complex
                reconstruction in Houston or Austin, our sibling principals
                welcome a private conversation.
              </p>

              <div className="flex flex-col items-center gap-4 pt-2 sm:flex-row">
                <MovingBorderButton href="/contact" variant="ivory">
                  <span>Start Your Project</span>
                  <ArrowUpRight
                    className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </MovingBorderButton>

                <Link
                  href="/process"
                  className="glass-photo inline-flex items-center gap-2 px-7 py-4 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-[#F2F0EC] transition-colors hover:border-[#F2F0EC]/55 hover:bg-[#17191B]/80"
                >
                  <span>Review Methodology</span>
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </div>

              <p className="pt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[#A7A6A3]">
                Houston &amp; Austin, Texas · Private Consultations By
                Appointment
              </p>
            </div>
          </div>
        </Container>
      </ArchitecturalLamp>
    </section>
  );
}
