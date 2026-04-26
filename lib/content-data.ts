/**
 * 공지사항·교회소식 목록·상세에서 사용하는 게시 데이터입니다.
 * id, 제목, 날짜, 요약, 본문 필드 구조는 그대로 유지합니다.
 */
export type ContentItem = {
  id: string;
  type: "notice" | "news";
  title: string;
  /** YYYY-MM-DD (dateTime 속성용) */
  date: string;
  /** 목록·미리보기용 짧은 요약 */
  excerpt: string;
  /** 본문 문단 배열 */
  content: string[];
  detailHref: string;
  slug?: string;
};

type ContentItemSeed = Omit<ContentItem, "type" | "detailHref">;

const noticeSeeds: ContentItemSeed[] = [
  {
    id: "notice-sample-01",
    title: "주차장·출입 안내",
    date: "2026-04-22",
    excerpt: "예배 전후 출입과 주차 시 서로를 배려해 주시기 바랍니다.",
    content: [
      "출입·주차 방법은 현장 표지와 교회 공지를 기준으로 확인해 주시기 바랍니다.",
      "좁은 구역에서는 속도를 줄이고, 어린이·노약자 보행에 방해가 되지 않도록 협조해 주시기 바랍니다.",
    ],
  },
  {
    id: "notice-sample-02",
    title: "교회 시설 이용 신청 안내",
    date: "2026-04-18",
    excerpt: "공용 공간 사용 시 신청 절차를 안내드립니다.",
    content: [
      "시설 사용은 사전 신청과 승인 절차를 두는 경우가 많습니다. 양식·이용 시간은 교회 안내에 따릅니다.",
      "이용 가능 시간과 주의 사항은 별도 공지를 확인해 주시고, 방문 전 최신 안내를 함께 살펴 주시면 감사하겠습니다.",
    ],
  },
  {
    id: "notice-sample-03",
    title: "온라인 예배 송출 점검 안내",
    date: "2026-04-14",
    excerpt: "송출 장비 점검으로 잠시 불편이 있을 수 있습니다.",
    content: [
      "점검 일시와 영향 범위는 교회 공지에 따라 안내됩니다. 방송·송출 관련 세부는 확정 안내를 참고해 주십시오.",
      "현장 예배와 온라인 송출이 함께 진행될 때는 각각의 질서를 지켜 주시면 감사하겠습니다.",
    ],
  },
  {
    id: "notice-sample-04",
    title: "성찬예배 준비 관련 안내",
    date: "2026-04-10",
    excerpt: "성찬 절차와 준비에 관해 안내드릴 수 있습니다.",
    content: [
      "교단·교회 관행에 따라 안내 문구와 일정이 달라질 수 있습니다.",
      "참여 방법과 준비물은 담당 안내를 참고해 주시고, 확정 내용은 공지와 현장 안내를 함께 확인해 주십시오.",
    ],
  },
  {
    id: "notice-sample-05",
    title: "새가족 안내 모임 일정",
    date: "2026-04-06",
    excerpt: "처음 오신 분을 위한 짧은 안내 시간을 안내드립니다.",
    content: [
      "일정과 장소는 확정되는 대로 공지됩니다. 방문 전 공지를 한 번 더 확인해 주시면 감사하겠습니다.",
      "참석이 부담되시면 집회만 드리고 가셔도 괜찮다는 뜻을 안내에 담는 경우가 많습니다.",
    ],
  },
];

const newsSeeds: ContentItemSeed[] = [
  {
    id: "news-sample-01",
    title: "지역 나눔 봉사 활동을 마치고",
    date: "2026-04-20",
    excerpt: "작은 나눔 자리를 마치고 공동체가 남긴 짧은 기록입니다.",
    content: [
      "인원·지역·물품 내역은 공개 범위를 정한 뒤 나눌 수 있습니다. 이 글에는 구체적인 수치나 지명을 적지 않았습니다.",
      "봉사는 강요가 아니라 기도와 감사 안에서 이어지기를 바란다는 마음을 짧게 올립니다.",
    ],
  },
  {
    id: "news-sample-02",
    title: "청년 기도 모임 나눔",
    date: "2026-04-16",
    excerpt: "한 주를 묵상하며 기도로 이어간 모임의 소식입니다.",
    content: [
      "모임 형식과 빈도는 팀마다 다릅니다. 그날 나눈 마음을 짧게 옮겨 적었습니다.",
      "기도 제목과 개인 사정은 공동체 안에서 신중히 다루어야 합니다.",
    ],
  },
  {
    id: "news-sample-03",
    title: "새가족 환영 시간을 마치고",
    date: "2026-04-12",
    excerpt: "환영 인사와 안내를 나눈 자리의 짧은 기록입니다.",
    content: [
      "진행 여부와 일정은 공지를 따릅니다.",
      "환영은 친절을 전하되 부담을 드리지 않으려는 마음으로 정리했습니다.",
    ],
  },
  {
    id: "news-sample-04",
    title: "교육부 계절 행사를 마치고",
    date: "2026-04-08",
    excerpt: "다음 세대 프로그램을 다녀온 뒤 나눈 소식을 올립니다.",
    content: [
      "안전·동의·일정은 운영 방침에 따라 별도로 안내됩니다.",
      "학부모와 교사 사이의 소통은 교회에서 정한 방식을 따릅니다.",
    ],
  },
  {
    id: "news-sample-05",
    title: "선교·후원 안내를 돌아보며",
    date: "2026-04-04",
    excerpt: "기도와 후원 안내를 돌아보며 나눈 글입니다.",
    content: [
      "후원 계좌·기도 제목은 교회에서 확인한 정보만 게시합니다. 이 글에는 구체적인 수치나 지명을 적지 않았습니다.",
      "참여는 감사의 표현이며, 금액을 견주거나 드러내는 일은 삼가는 분위기를 지향합니다.",
    ],
  },
];

export const boardMeta = {
  notice: { label: "공지사항", listPage: "/notice" },
  news: { label: "교회소식", listPage: "/news" },
} as const;

function toTimeValue(dateText: string) {
  return new Date(`${dateText}T00:00:00`).getTime();
}

function sortByLatest(items: ContentItem[]) {
  return [...items].sort((a, b) => toTimeValue(b.date) - toTimeValue(a.date));
}

function withDetailLinks(seeds: ContentItemSeed[], type: "notice" | "news"): ContentItem[] {
  return seeds.map((item) => ({
    ...item,
    type,
    detailHref: `/post?type=${type}&id=${encodeURIComponent(item.id)}`,
  }));
}

const contentStore: Record<"notice" | "news", ContentItem[]> = {
  notice: sortByLatest(withDetailLinks(noticeSeeds, "notice")),
  news: sortByLatest(withDetailLinks(newsSeeds, "news")),
};

export function getPostsByType(type: "notice" | "news", limit?: number) {
  const source = contentStore[type] ?? [];
  if (typeof limit === "number") return source.slice(0, limit);
  return [...source];
}

export function getPostById(type: "notice" | "news", id: string) {
  const source = contentStore[type] ?? [];
  return source.find((item) => item.id === id) ?? null;
}
