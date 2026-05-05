import { ParallaxImage } from '@/components/motion/ParallaxImage';
import { FadeIn } from '@/components/motion/FadeIn';
import { PageContainer } from '@/components/ui/PageContainer';

const ABOUT_STRIP_IMAGE =
  'https://images.unsplash.com/photo-1529070538774-1843cb3265df?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80';

export default function HomeAbout() {
  return (
    <>
      <section className="py-48">
        <PageContainer className="!py-0">
          <FadeIn>
            <h3 className="mb-8 font-sans text-sm font-bold uppercase tracking-[0.2em] text-dado-accent">
              About Us
            </h3>
          </FadeIn>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
            <FadeIn delay={0.2} className="md:col-span-8 lg:col-span-9">
              <h2 className="font-serif text-4xl leading-[1.1] text-dado-dark md:text-6xl lg:text-7xl">
                예배의 감격이 일상이 되고,
                <br />
                공동체의 따뜻함이 세상으로
                <br />
                흘러가는 공간을 만듭니다.
              </h2>
            </FadeIn>
          </div>
        </PageContainer>
      </section>

      <section data-theme="dark" className="w-full py-12">
        <FadeIn>
          <div className="relative h-[70vh] w-full overflow-hidden">
            <ParallaxImage
              src={ABOUT_STRIP_IMAGE}
              alt="교회 공동체를 상징하는 따뜻한 예배의 공간"
              className="h-full w-full"
              imageClassName="h-full w-full object-cover"
            />
          </div>
        </FadeIn>
      </section>
    </>
  );
}
