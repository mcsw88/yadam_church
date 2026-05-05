import { FadeIn } from '@/components/motion/FadeIn';
import { PageContainer } from '@/components/ui/PageContainer';
import { VISIONS } from '@/data/about/visions';

export default function AboutVision() {
  return (
    <section
      id="vision"
      data-theme="dark"
      className="bg-dado-dark py-48 text-dado-bg"
    >
      <PageContainer className="!py-0">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-3">
          {VISIONS.map((item, i) => (
            <FadeIn key={item.id} delay={i * 0.2}>
              <div className="border-l border-dado-accent py-4 pl-8">
                <h3 className="mb-4 font-serif text-3xl italic">{item.title}</h3>
                {item.description ? (
                  <p className="font-sans text-base leading-relaxed text-dado-bg/85">
                    {item.description}
                  </p>
                ) : null}
              </div>
            </FadeIn>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
