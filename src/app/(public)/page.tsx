import type { Metadata } from 'next';

import { PrayerAssistant } from '@/components/features/PrayerAssistant';
import HomeAbout from '@/components/sections/home/HomeAbout';
import HomeHero from '@/components/sections/home/HomeHero';
import HomeLocation from '@/components/sections/home/HomeLocation';
import HomeWorshipGrid from '@/components/sections/home/HomeWorshipGrid';
import { CHURCH_INFO } from '@/data/church-info';

const homeDescription =
  CHURCH_INFO.tagline?.subtext != null && CHURCH_INFO.tagline.subtext.length > 0
    ? `${CHURCH_INFO.name} 공식 홈페이지 · ${CHURCH_INFO.tagline.subtext.replace(/\n/g, ' ')}`
    : `${CHURCH_INFO.name} 공식 홈페이지`;

export const metadata: Metadata = {
  title: CHURCH_INFO.name,
  description: homeDescription,
};

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeAbout />
      <HomeWorshipGrid />
      <PrayerAssistant />
      <HomeLocation />
    </>
  );
}
