import { MinistrySectionHero } from "@/components/cards/MinistrySectionHero";
import { MinistryCardDeck } from "@/components/cards/MinistryCardDeck";
import { FadeIn } from "@/components/motion/FadeIn";
import { PageContainer } from "@/components/ui/PageContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { MinistryItem } from "@/types/ministries";

type MinistriesMissionProps = {
  items: MinistryItem[];
};

export default function MinistriesMission({ items }: MinistriesMissionProps) {
  return (
    <div id="mission" className="scroll-mt-[5.5rem]">
      <MinistrySectionHero variant="mission-top" />
      <section
        aria-label="선교 · 봉사"
        className="relative border-t border-[color-mix(in_srgb,var(--color-dado-dark)_8%,transparent)] bg-[var(--color-dado-bg)] py-36 md:py-52 lg:py-64"
      >
        <p
          className="pointer-events-none absolute left-1/2 top-16 z-0 max-w-[95vw] -translate-x-1/2 select-none text-center font-serif text-[clamp(2.25rem,11vw,7rem)] leading-none text-[color-mix(in_srgb,var(--color-dado-dark)_7%,transparent)]"
          aria-hidden
        >
          너희는 세상의 빛이라
        </p>
        <PageContainer className="relative z-10 !py-0">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14 xl:gap-16">
            <div className="lg:col-span-5">
              <FadeIn className="space-y-6">
                <SectionHeading
                  eyebrow="선교 · 봉사"
                  title={"이웃과 \n 열방을 향한 발걸음"}
                  description="지역 사회와 해외 현장에서 그리스도의 사랑을 삶으로 나누는 사역들입니다."
                  className="max-w-xl space-y-6"
                />
              </FadeIn>
            </div>
            <div className="lg:col-span-7">
              <MinistryCardDeck items={items} tone="mission" />
            </div>
          </div>
        </PageContainer>
      </section>
    </div>
  );
}
