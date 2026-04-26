/** 화면에 표시되는 집회 안내입니다. 확정 시간·장소는 공지와 현장 안내를 확인해 주세요. */
type WorshipScheduleSlot = {
  id: string;
  name: string;
  dayOfWeek: string;
  timeLabel: string;
  placeLabel: string;
  note: string;
};

const WORSHIP_SCHEDULE_EXAMPLES: WorshipScheduleSlot[] = [
  {
    id: "sunday",
    name: "주일예배",
    dayOfWeek: "주일",
    timeLabel: "오전 11:00 전후(공지·현장 안내 확인)",
    placeLabel: "주 예배 공간(현장 안내 기준)",
    note: "다회 예배로 나뉠 수 있습니다. 확정 시간은 공지·현장 안내를 따릅니다.",
  },
  {
    id: "wednesday",
    name: "수요예배",
    dayOfWeek: "수요일",
    timeLabel: "저녁 7:30 전후(공지·현장 안내 확인)",
    placeLabel: "주 예배 공간 또는 별도 안내",
    note: "계절·행사에 따라 한때만 조정될 수 있으며, 변경 시 공지합니다.",
  },
  {
    id: "dawn",
    name: "새벽기도회",
    dayOfWeek: "주중(요일은 공지 기준)",
    timeLabel: "오전 6:00 전후(공지·현장 안내 확인)",
    placeLabel: "교회 내 기도실·안내 장소",
    note: "참여 인원과 안전을 고려해 시간·장소가 바뀔 수 있습니다.",
  },
  {
    id: "nextgen",
    name: "다음세대 예배",
    dayOfWeek: "주일(학년·팀별)",
    timeLabel: "오전 10:00·11:00 등(팀별 상이, 안내 확인)",
    placeLabel: "연령별 교육 공간(안내 데스크 확인)",
    note: "유·초·중·고 등 세부는 담당 팀 안내를 따르며, 처음 오실 때는 데스크에 말씀해 주시면 됩니다.",
  },
];

export default function AboutWorshipPage() {
  return (
    <main className="ref-container page-main">
      <section className="page-block page-block--pagehead">
        <p className="ref-kicker">교회소개</p>
        <h2 className="page-title">예배시간</h2>
      </section>
      <section className="page-block page-block--intro">
        <p className="page-desc">
          집회 시간과 장소는 교회 공지와 예배 전후 현장 안내를 기준으로 확인해 주시기 바랍니다. 아래는 참고로
          정리한 내용입니다. 방문이 처음이시면 도착을 넉넉히 잡고, 안내 데스크에서 좌석과 다음 세대 프로그램을
          짚어 보시면 됩니다.
        </p>
      </section>

      <section className="page-block" aria-labelledby="worship-schedule-heading">
        <h2 className="page-subtitle" id="worship-schedule-heading">
          예배 시간표
        </h2>
        <p className="page-desc preface">
          각 카드는 한 집회를 요약한 것입니다. 표기된 시각은 참고용일 수 있으니, 방문 전 공지와 현장 안내를 함께
          확인해 주세요.
        </p>
        <div className="page-grid-2">
          {WORSHIP_SCHEDULE_EXAMPLES.map((slot) => (
            <article key={slot.id} className="page-card" aria-labelledby={`schedule-${slot.id}-title`}>
              <h3 id={`schedule-${slot.id}-title`}>{slot.name}</h3>
              <div className="page-prose-paragraphs">
                <p className="page-desc">
                  <strong>요일.</strong> {slot.dayOfWeek}
                </p>
                <p className="page-desc">
                  <strong>시간.</strong> {slot.timeLabel}
                </p>
                <p className="page-desc">
                  <strong>장소.</strong> {slot.placeLabel}
                </p>
                <p className="page-desc">{slot.note}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="page-block" aria-labelledby="worship-guide-heading">
        <div className="page-heading-inline">
          <span className="section-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 2" />
            </svg>
          </span>
          <h2 className="page-subtitle" id="worship-guide-heading">
            예배 안내
          </h2>
        </div>
        <p className="page-desc preface">
          처음 오시는 분도 부담 없이 따라가실 수 있도록, 방문·질서·헌금·마침까지의 흐름만 짧게 나누었습니다.
          세부는 당일 안내·공지가 우선이며, 교회마다 다를 수 있습니다.
        </p>
        <div className="timeline-rhythm">
          <div className="timeline-rhythm-segment">
            <p className="ref-kicker">예배 전</p>
            <ul className="timeline-list" aria-label="예배 전 (참고)">
              <li>
                <span className="timeline-time">도착</span>
                <div>
                  <p className="page-desc">
                    예배 시작 전에 도착하시면 여유 있게 안내를 받을 수 있습니다. 늦으실 경우에도 조용히 들어오실 수
                    있도록 안내가 있을 수 있습니다.
                  </p>
                </div>
              </li>
              <li>
                <span className="timeline-time">안내</span>
                <div>
                  <p className="page-desc">
                    안내 데스크나 안내자를 통해 주차·좌석·다음 세대 프로그램 위치를 확인할 수 있습니다. 처음이시라고
                    말씀해 주시면 짧게 짚어 드립니다.
                  </p>
                </div>
              </li>
              <li>
                <span className="timeline-time">좌석</span>
                <div>
                  <p className="page-desc">
                    지정 좌석이 없을 수 있으며, 안내에 따라 비어 있는 자리에 앉으시면 됩니다. 이동이 필요할 때는
                    안내를 따릅니다.
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <div className="timeline-rhythm-segment">
            <p className="ref-kicker">예배 중</p>
            <ul className="timeline-list" aria-label="예배 중 (참고)">
              <li>
                <span className="timeline-time">헌금</span>
                <div>
                  <p className="page-desc">
                    헌금은 강요가 아닌 감사의 표현으로 안내됩니다. 방법(봉투·송금 등)은 교회 안내와 공지를 참고해
                    주십시오.
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <div className="timeline-rhythm-segment">
            <p className="ref-kicker">예배 후</p>
            <ul className="timeline-list" aria-label="예배 후 (참고)">
              <li>
                <span className="timeline-time">예배 후</span>
                <div>
                  <p className="page-desc">
                    예배가 끝난 뒤에도 짧은 질문·상담은 안내 경로를 통해 나눌 수 있습니다. 급하지 않으시면 공지된
                    연락처로도 문의하실 수 있습니다.
                  </p>
                </div>
              </li>
              <li>
                <span className="timeline-time">자녀</span>
                <div>
                  <p className="page-desc">
                    자녀를 동반하신 경우 연령에 맞는 다음 세대 예배·프로그램으로 안내받을 수 있습니다. 첫 방문 시
                    등록·안전 서류가 필요할 수 있으니 데스크에서 확인해 주십시오.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <ul className="quiet-list" aria-label="예배 안내 요약">
          <li>
            <strong>질서.</strong> 예배 중 휴대전화는 무음 등으로 주변에 방해가 되지 않도록 부탁드립니다.
          </li>
          <li>
            <strong>변경.</strong> 특별 예배·행사 시 시간이 달라질 수 있으니, 방문 전 공지를 한 번 확인해 주시면
            좋습니다.
          </li>
        </ul>
      </section>

      <section className="page-block" aria-labelledby="worship-newcomer-heading">
        <h2 className="page-subtitle" id="worship-newcomer-heading">
          처음 오시는 분께
        </h2>
        <div className="page-prose-paragraphs">
          <p className="page-desc">
            정해진 복장 규정을 두고 강조하지는 않습니다. 예배에 집중하실 수 있는 정도의 차림이면 충분하다고
            생각합니다. 처음이라 낯설 수 있어도, 안내를 요청하시면 짧게 도와드릴 수 있습니다.
          </p>
          <p className="page-desc">
            교제나 행사에 참여하지 않고 조용히 예배만 드리고 가셔도 괜찮습니다. 부담을 드리기보다 말씀과 기도의
            자리를 지키는 것을 먼저 생각합니다.
          </p>
          <p className="page-desc">
            예배 후에도 궁금한 점이 있으면 안내 데스크나 공지된 연락 경로로 천천히 문의하실 수 있습니다. 모든 절차를
            한 번에 알 필요는 없습니다.
          </p>
        </div>
      </section>

      <section className="page-block" aria-labelledby="worship-visual-heading">
        <h2 className="page-subtitle" id="worship-visual-heading">
          예배의 자리
        </h2>
        <div className="page-split">
          <div className="page-split-media">
            <figure className="page-visual">
              <div
                className="page-visual-placeholder"
                role="img"
                aria-label="예배와 말씀을 담는 시각 자리"
              >
                예배의 자리
              </div>
            </figure>
            <p className="page-desc-note">현장 모습이 준비되면 이 자리에 함께 담깁니다.</p>
          </div>
          <div className="page-split-content page-prose-paragraphs">
            <p className="page-desc">
              예배가 공동체의 중심에 있다는 마음을 담아, 이 자리에 사진이나 그림을 두고자 합니다. 현장에서는 말씀
              선포·찬양·기도의 흐름이 서로를 가리지 않도록 정리하는 일을 더 중요하게 여깁니다.
            </p>
            <p className="page-desc">
              이미지가 없어도 집회 시간과 방문 안내를 읽는 데는 문제없습니다. 갱신은 교회 안내에 맞춥니다.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
