"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import {
  getMissionSectionHeroTopAlt,
  getMissionSectionHeroTopUrl,
  getSundaySectionHeroBottomAlt,
  getSundaySectionHeroBottomUrl,
  getSundaySectionHeroTopAlt,
  getSundaySectionHeroTopUrl,
} from "@/constants/ministryAssets";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import { TWEEN_MINISTRY_SECTION_HERO } from "@/motion/transitions";
import { ministrySectionHero } from "@/motion/variants";

export type MinistrySectionHeroVariant =
  | "sunday-top"
  | "sunday-bottom"
  | "mission-top";

type MinistrySectionHeroBase = {
  priority?: boolean;
  className?: string;
};

/** 부모에서 `ministryAssets` getter로 `imageSrc`/`imageAlt`를 넘기는 방식을 권장 */
export type MinistrySectionHeroProps = MinistrySectionHeroBase &
  (
    | { imageSrc: string; imageAlt: string; variant?: undefined }
    | {
        variant: MinistrySectionHeroVariant;
        imageSrc?: undefined;
        imageAlt?: undefined;
      }
  );

function resolveHeroAssets(
  props: Pick<MinistrySectionHeroProps, "imageSrc" | "imageAlt" | "variant">,
): { src: string; alt: string } {
  if ("imageSrc" in props && props.imageSrc != null && props.imageAlt != null) {
    return { src: props.imageSrc, alt: props.imageAlt };
  }
  switch (props.variant) {
    case "sunday-top":
      return {
        src: getSundaySectionHeroTopUrl(),
        alt: getSundaySectionHeroTopAlt(),
      };
    case "sunday-bottom":
      return {
        src: getSundaySectionHeroBottomUrl(),
        alt: getSundaySectionHeroBottomAlt(),
      };
    case "mission-top":
      return {
        src: getMissionSectionHeroTopUrl(),
        alt: getMissionSectionHeroTopAlt(),
      };
    default:
      throw new Error(
        "MinistrySectionHero: `imageSrc`와 `imageAlt`를 넘기거나, `variant`를 sunday-top | sunday-bottom | mission-top 중 하나로 지정하세요.",
      );
  }
}

/** PageContainer 등 내부에서도 뷰포트 전폭으로 히어로 이미지를 깔 때 사용. CTA 없음. */
export function MinistrySectionHero({
  variant,
  imageSrc,
  imageAlt,
  priority = false,
  className = "",
}: MinistrySectionHeroProps) {
  const { src, alt } = resolveHeroAssets({ variant, imageSrc, imageAlt });
  const reducedMotion = useReducedMotionSafe();

  const breakout =
    "relative left-1/2 right-1/2 block w-screen max-w-[100vw] -translate-x-1/2 -mb-px";
  const frame =
    //`relative w-full overflow-hidden leading-none aspect-[16/9] sm:aspect-[17/9] lg:aspect-[20/9] min-h-[16rem] sm:min-h-[18rem] md:min-h-[22rem] lg:min-h-[26rem] bg-[color-mix(in_srgb,var(--color-dado-dark)_8%,transparent)] ${className}`.trim();
    //`relative w-full overflow-hidden leading-none aspect-[16/9] sm:aspect-[16/9] lg:aspect-[16/9] min-h-[18rem] sm:min-h-[22rem] md:min-h-[30rem] lg:min-h-[40rem] bg-[color-mix(in_srgb,var(--color-dado-dark)_8%,transparent)] ${className}`.trim();
    `relative w-full overflow-hidden leading-none h-[26rem] sm:h-[34rem] md:h-[43rem] lg:h-[60rem] bg-[color-mix(in_srgb,var(--color-dado-dark)_8%,transparent)] ${className}`.trim();

  if (reducedMotion) {
    return (
      <div className={`${breakout} ${frame}`.trim()}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="100vw"
          className="object-cover grayscale"
        />
      </div>
    );
  }

  return (
    <div className={`${breakout} ${frame}`.trim()}>
      <motion.div
        className="absolute inset-0 will-change-transform"
        variants={ministrySectionHero}
        initial="rest"
        whileHover="hover"
        transition={TWEEN_MINISTRY_SECTION_HERO}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="100vw"
          className="object-cover grayscale"
        />
      </motion.div>
    </div>
  );
}
