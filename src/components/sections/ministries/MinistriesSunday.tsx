import { MinistrySectionHero } from "@/components/cards/MinistrySectionHero";
import { MinistryCardDeck } from "@/components/cards/MinistryCardDeck";
import { FadeIn } from "@/components/motion/FadeIn";
import { PageContainer } from "@/components/ui/PageContainer";
import type { MinistryItem } from "@/types/ministries";

type MinistriesSundayProps = {
  items: MinistryItem[];
};

export default function MinistriesSunday({ items }: MinistriesSundayProps) {
  return (
    <div id="sunday" className="scroll-mt-[5.5rem]">
      <MinistrySectionHero variant="sunday-top" priority />
      <section
        aria-label="주일사역"
        //className="relative overflow-hidden border-t border-[color-mix(in_srgb,white_10%,transparent)] bg-[var(--color-dado-dark)] py-20 text-white md:py-28"
        className="relative overflow-hidden border-t border-[color-mix(in_srgb,white_10%,transparent)] bg-[var(--color-dado-dark)] py-28 text-white md:py-40 lg:py-48"
      >
        <p
          aria-hidden
          className="pointer-events-none absolute right-6 top-10 z-0 select-none font-serif text-[clamp(2rem,10vw,6.25rem)] leading-none text-[color-mix(in_srgb,white_8%,transparent)]"
        >
          SUNDAY
        </p>
        <PageContainer className="relative z-10 !py-0">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-16">
            <div className="lg:col-span-4 xl:col-span-5">
              <FadeIn className="space-y-5 md:space-y-6">
                {/*<p className="font-sans text-xs uppercase tracking-[0.2em] text-dado-accent">
                  주일사역
                </p>*/}
                <h2 className="font-serif text-3xl tracking-wide text-dado-accent md:text-6xl italic">
                  주일사역
                </h2>
                <p className="max-w-lg font-sans text-base leading-relaxed text-gray-400 md:text-lg">
                  주일 예배를 준비하고, 새로운 가족을 맞으며, 찬양으로 하나님께
                  영광을 돌리는 여러 사역이 함께합니다.
                </p>
              </FadeIn>
            </div>
            <div className="lg:col-span-8 xl:col-span-7">
              <div className="w-full max-w-4xl lg:ml-auto">
                <MinistryCardDeck items={items} tone="sunday" />
              </div>
            </div>
          </div>
        </PageContainer>
      </section>
    </div>
  );
}
