import { CHURCH_INFO } from "@/data/church-info";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { FadeIn } from "@/components/motion/FadeIn";
import { PageContainer } from "@/components/ui/PageContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";

const WORSHIP_CARD_IMAGES = [
  "/images/main/jesus_is_king.png",
  "/images/main/the_cross.webp",
] as const;

export default function HomeWorshipGrid() {
  const { worship } = CHURCH_INFO;

  return (
    <section
      id="home-worship"
      className="border-b border-dado-light pb-48 pt-32"
    >
      <PageContainer className="!py-0">
        <FadeIn>
          <SectionHeading
            eyebrow="Worship"
            title="예배 안내"
            className="mb-16 [&>h2]:font-serif [&>h2]:text-3xl [&>h2]:italic [&>h2]:tracking-normal md:[&>h2]:text-4xl"
          />
        </FadeIn>
        <div className="grid grid-cols-1 gap-24 md:grid-cols-2">
          {worship.map((item, index) => {
            const imageSrc =
              WORSHIP_CARD_IMAGES[index % WORSHIP_CARD_IMAGES.length];
            return (
              <FadeIn
                key={`${item.name}-${item.time}`}
                delay={index * 0.2}
                className={index % 2 === 1 ? "md:mt-32" : undefined}
              >
                <div className="relative mb-6 h-[70vh] w-full overflow-hidden">
                  <ParallaxImage
                    src={imageSrc}
                    alt={item.name}
                    className="h-full w-full"
                    imageClassName="h-full w-full object-cover"
                  />
                </div>
                <h3 className="mb-2 font-serif text-3xl italic text-dado-dark">
                  {item.name}
                </h3>
                <p className="font-sans text-sm uppercase tracking-[0.15em] text-gray-500">
                  {item.time}
                </p>
              </FadeIn>
            );
          })}
        </div>
      </PageContainer>
    </section>
  );
}
