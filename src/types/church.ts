export interface WorshipSchedule {
  name: string;
  time: string;
}

/** 홈/푸터 등에서 쓰는 짧은 교회 표어 (레거시 단일 페이지 푸터 문구) */
export interface ChurchTagline {
  headline: string;
  subtext?: string;
}

export interface ChurchInfo {
  name: string;
  address: string;
  phone: string;
  email: string;
  worship: WorshipSchedule[];
  tagline?: ChurchTagline;
  /** 「찾아오시는 길」 등에 붙이는 교통·환영 안내 문단 */
  locationNote?: string;
}
