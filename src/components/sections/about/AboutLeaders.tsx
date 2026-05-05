import { FadeIn } from "@/components/motion/FadeIn";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { PageContainer } from "@/components/ui/PageContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LEADERS } from "@/data/about/leaders";

export default function AboutLeaders() {
  return (
    <section id="leaders" className="py-48">
      <PageContainer className="!py-0">
        <FadeIn className="mb-24">
          <SectionHeading
            title="섬기는 이들"
            className="[&>h2]:font-serif [&>h2]:text-5xl [&>h2]:italic [&>h2]:tracking-normal md:[&>h2]:text-7xl"
          />
        </FadeIn>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {LEADERS.map((person, i) => {
            const src = person.image?.trim();
            return (
              <FadeIn key={person.id} delay={i * 0.1}>
                <div className="group flex min-h-0 w-full flex-col cursor-pointer">
                  {src ? (
                    <ParallaxImage
                      src={src}
                      alt={person.name}
                      speed={0.5}
                      maxOffset={20}
                      className="relative mb-6 aspect-[3/4] w-full min-h-0 overflow-hidden"
                      imageClassName="h-full w-full object-cover object-center grayscale transition-all duration-1000"
                    />
                  ) : null}
                  <p className="mb-1 font-sans text-xs uppercase tracking-widest text-dado-accent">
                    {person.role}
                  </p>
                  <h4 className="font-serif text-2xl italic text-dado-dark">
                    {person.name}
                  </h4>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </PageContainer>
    </section>
  );
}
