import { FadeIn } from '@/components/motion/FadeIn';
import { ParallaxImage } from '@/components/motion/ParallaxImage';
import { PageContainer } from '@/components/ui/PageContainer';
import { LEADERS } from '@/data/about/leaders';

export default function AboutGreeting() {
  const seniorPastor = LEADERS.find((l) => l.role === '담임목사');
  const pastorImage = seniorPastor?.image?.trim();
  const pastorName = seniorPastor?.name ?? '';
  const imageAlt =
    pastorName.length > 0 ? `${pastorName} 담임목사` : '담임목사';

  return (
    <section
      id="greeting"
      className="py-32"
    >
      <PageContainer className="!py-0">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-12">
          {pastorImage ? (
            <div className="relative h-[60vh] overflow-hidden md:col-span-5">
              <ParallaxImage
                src={pastorImage}
                alt={imageAlt}
                className="relative h-full w-full overflow-hidden bg-dado-light/30 shadow-2xl"
                imageClassName="h-full w-full object-cover grayscale transition-all duration-1000"
              />
            </div>
          ) : null}
          <div
            className={
              pastorImage
                ? 'flex flex-col justify-center md:col-span-7'
                : 'flex flex-col justify-center md:col-span-12'
            }
          >
            <FadeIn>
              <span className="mb-4 block font-sans text-sm uppercase tracking-widest text-dado-accent">
                SHALOM
              </span>
              <h2 className="mb-8 font-serif text-4xl text-dado-dark md:text-5xl">
                한 영혼을 위해,
                <br />
                예배의 자리를 지킵니다.
              </h2>
              <p className="font-sans text-lg italic leading-relaxed text-gray-600">
                — 안양예담교회 담임목사 {pastorName}
              </p>
            </FadeIn>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
