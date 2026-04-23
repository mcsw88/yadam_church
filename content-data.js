(() => {
  const notices = [
    { id: "notice-2026-0422", title: "5월 가정의 달 예배 및 행사 안내", date: "2026-04-22" },
    { id: "notice-2026-0420", title: "부활절 감사예배 사진 업로드 공지", date: "2026-04-20" },
    { id: "notice-2026-0417", title: "주일 주차장 이용 안내", date: "2026-04-17" },
    { id: "notice-2026-0414", title: "수요예배 온라인 송출 점검 안내", date: "2026-04-14" },
    { id: "notice-2026-0412", title: "다음 주 성찬예식 준비 공지", date: "2026-04-12" },
    { id: "notice-2026-0409", title: "교회 시설 사용 신청 절차 변경", date: "2026-04-09" },
    { id: "notice-2026-0406", title: "새가족 교육 일정 안내", date: "2026-04-06" }
  ];

  const churchNews = [
    { id: "news-2026-0421", title: "봄맞이 지역 섬김 사역을 진행했습니다", date: "2026-04-21" },
    { id: "news-2026-0418", title: "청년부 연합 기도회 현장 스케치", date: "2026-04-18" },
    { id: "news-2026-0415", title: "새가족 환영 모임을 은혜 가운데 마쳤습니다", date: "2026-04-15" },
    { id: "news-2026-0411", title: "주일학교 봄소풍을 다녀왔습니다", date: "2026-04-11" },
    { id: "news-2026-0408", title: "선교 후원 바자회 진행 소식", date: "2026-04-08" },
    { id: "news-2026-0405", title: "고난주간 특별새벽기도를 시작했습니다", date: "2026-04-05" },
    { id: "news-2026-0402", title: "중보기도팀 월간 모임 소식", date: "2026-04-02" }
  ];

  const boardMeta = {
    notice: { label: "공지사항", listPage: "./notice.html" },
    news: { label: "교회 소식", listPage: "./news.html" }
  };

  function toTimeValue(dateText) {
    return new Date(`${dateText}T00:00:00`).getTime();
  }

  function sortByLatest(items) {
    return [...items].sort((a, b) => toTimeValue(b.date) - toTimeValue(a.date));
  }

  function withLinks(items, type) {
    return sortByLatest(items).map((item) => ({
      ...item,
      type,
      detailHref: `./post.html?type=${type}&id=${encodeURIComponent(item.id)}`
    }));
  }

  const contentStore = {
    notice: withLinks(notices, "notice"),
    news: withLinks(churchNews, "news")
  };

  function getPostsByType(type, limit) {
    const source = contentStore[type] || [];
    if (typeof limit === "number") return source.slice(0, limit);
    return [...source];
  }

  function getPostById(type, id) {
    const source = contentStore[type] || [];
    return source.find((item) => item.id === id) || null;
  }

  window.YedamContent = {
    boardMeta,
    getPostsByType,
    getPostById
  };
})();
