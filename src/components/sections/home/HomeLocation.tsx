import { CHURCH_INFO } from "@/data/church-info";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { FadeIn } from "@/components/motion/FadeIn";
import { PageContainer } from "@/components/ui/PageContainer";

const LOCATION_IMAGE = "/images/main/map.png";

function digitsOnly(value: string): string {
  return value.replace(/\D/g, "");
}

export default function HomeLocation() {
  const { address, phone, email, worship } = CHURCH_INFO;
  const telHref = `tel:${digitsOnly(phone)}`;

  return (
    <section id="home-location" className="bg-dado-bg py-48">
      <PageContainer className="!py-0">
        <div className="grid grid-cols-1 items-center gap-24 md:grid-cols-2">
          <FadeIn>
            <h3 className="mb-8 font-sans text-sm font-bold uppercase tracking-[0.2em] text-dado-accent">
              Location
            </h3>
            <h2 className="mb-12 font-serif text-5xl italic text-dado-dark md:text-6xl">
              찾아오시는 길
            </h2>
            <div className="space-y-6 font-sans text-lg leading-relaxed text-gray-600">
              <p className="border-b border-dado-light pb-4">
                <span className="mb-1 block text-xs uppercase tracking-widest text-dado-accent">
                  Address
                </span>
                {address}
              </p>
              <p className="border-b border-dado-light pb-4">
                <span className="mb-1 block text-xs uppercase tracking-widest text-dado-accent">
                  Contact
                </span>
                <a
                  className="underline decoration-dado-light underline-offset-4 hover:text-dado-dark"
                  href={telHref}
                >
                  {phone}
                </a>
                {email ? (
                  <>
                    {" "}
                    /{" "}
                    <a
                      className="underline decoration-dado-light underline-offset-4 hover:text-dado-dark"
                      href={`mailto:${email}`}
                    >
                      {email}
                    </a>
                  </>
                ) : null}
              </p>
              {worship.length > 0 ? (
                <div className="border-b border-dado-light pb-4 pt-2">
                  <span className="mb-2 block text-xs uppercase tracking-widest text-dado-accent">
                    Worship
                  </span>
                  <ul className="space-y-2 text-base text-gray-600">
                    {worship.map((w) => (
                      <li key={`${w.name}-${w.time}`}>
                        <span className="font-medium text-dado-dark">
                          {w.name}
                        </span>
                        <span className="mx-2 text-gray-400">·</span>
                        <span>{w.time}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              <p className="pt-6 text-sm text-gray-400">
                관악대로 대로변에 위치하고 있으며, 관양중학교 정류장에서 도보
                1분 거리입니다. 언제든 편안한 마음으로 방문해 주세요.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="relative aspect-[4/3] overflow-hidden bg-dado-light/30 shadow-2xl">
              <ParallaxImage
                src={LOCATION_IMAGE}
                alt="안양예담교회 오시는 길 약도"
                className="h-full w-full"
                imageClassName="h-full w-full object-cover transition-all duration-1000"
              />
            </div>
          </FadeIn>
        </div>
      </PageContainer>
    </section>
  );
}
