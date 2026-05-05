import type { Metadata } from "next";

import { FadeIn } from "@/components/motion/FadeIn";
import MinistriesMission from "@/components/sections/ministries/MinistriesMission";
import MinistriesSunday from "@/components/sections/ministries/MinistriesSunday";
import { MINISTRIES } from "@/data/ministries";

export const metadata: Metadata = {
  title: "사역 안내 | 안양예담교회",
  description: "안양예담교회의 주일사역과 선교·봉사 안내입니다.",
};

export default function MinistriesPage() {
  const sundayItems = MINISTRIES.filter((m) => m.category === "sunday");
  const missionItems = MINISTRIES.filter((m) => m.category === "mission");

  return (
    <main className="min-h-screen bg-[var(--color-dado-bg)]">
      <section
        aria-label="사역소개"
        //className="border-b border-[color-mix(in_srgb,var(--color-dado-dark)_8%,transparent)] px-6 pb-24 pt-48 md:px-24 md:pt-52"
        className="border-b border-[color-mix(in_srgb,var(--color-dado-dark)_8%,transparent)] px-6 pb-24 pt-48 md:px-24 md:pb-40 md:pt-62"
      >
        <FadeIn className="max-w-3xl text-left">
          <p className="mb-6 font-sans text-xs uppercase tracking-[0.2em] text-dado-accent">
            MINISTRIES
          </p>
          {/*<h1 className="mb-8 font-serif text-5xl tracking-wide text-dado-dark italic md:text-7xl lg:text-8xl">*/}
          <h1 className="mb-12 font-serif text-7xl italic text-dado-dark md:text-9xl">
            사역소개
          </h1>
          <p className="max-w-2xl font-sans text-base leading-relaxed text-dado-dark/80 md:text-lg">
            작은 발걸음으로 서로를 세우고, 예배와 선교 현장으로 나아가는 섬김을
            소개합니다.
          </p>
        </FadeIn>
      </section>
      <MinistriesSunday items={sundayItems} />
      <MinistriesMission items={missionItems} />
    </main>
  );
}
