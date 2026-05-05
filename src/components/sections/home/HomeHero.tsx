import { FadeIn } from '@/components/motion/FadeIn';

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1437603568260-1950d3ca6eab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80';

export default function HomeHero() {
  return (
    <section
      data-theme="dark"
      className="relative flex min-h-screen w-full flex-col overflow-hidden bg-dado-dark"
    >
      <div className="absolute inset-0 z-10 bg-black/40" aria-hidden />
      <img
        src={HERO_IMAGE}
        alt="예배와 공동체를 상징하는 고요한 공간"
        className="w-full flex-1 object-cover"
      />
      <div className="relative z-10 flex w-full flex-col items-center justify-center px-6 py-20 text-center md:py-24">
        <FadeIn delay={0.2}>
          <h2 className="mb-6 font-sans text-sm uppercase tracking-[0.2em] text-dado-bg">
            환대에서 성소로
          </h2>
        </FadeIn>
        <FadeIn delay={0.4}>
          <h1 className="font-serif text-6xl italic leading-[1.1] text-dado-bg md:text-8xl lg:text-9xl">
            GRACE
            <br />
            FOLLOWS
            <br />
            FAITH
          </h1>
        </FadeIn>
      </div>
    </section>
  );
}
