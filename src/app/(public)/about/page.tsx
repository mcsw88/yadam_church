import type { Metadata } from "next";

import { FadeIn } from "@/components/motion/FadeIn";
import AboutGreeting from "@/components/sections/about/AboutGreeting";
import AboutLeaders from "@/components/sections/about/AboutLeaders";
import AboutVision from "@/components/sections/about/AboutVision";

export const metadata: Metadata = {
  title: "교회 소개 | 안양예담교회",
  description: "안양예담교회 인사말, 비전·핵심가치, 섬기는 이들을 소개합니다.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-dado-bg">
      <section
        aria-label="교회소개"
        //className="px-6 pb-32 pt-60 md:px-24"
        className="px-6 pb-24 pt-48 md:px-24 md:pb-40 md:pt-62"
      >
        <FadeIn className="text-left">
          <h1 className="mb-12 font-serif text-7xl italic text-dado-dark md:text-9xl">
            교회소개
          </h1>
        </FadeIn>
      </section>
      <AboutGreeting />
      <AboutVision />
      <AboutLeaders />
    </main>
  );
}
