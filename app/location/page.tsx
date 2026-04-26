function TransitIconSubway({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
      <rect x="5" y="8" width="14" height="8" rx="1.2" />
      <path d="M9 18v2M15 18v2M8 11h8" strokeLinecap="round" />
    </svg>
  );
}

function TransitIconBus({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
      <path d="M5 17v-8a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8" strokeLinecap="round" />
      <path d="M5 12h14M8 17h2M14 17h2" strokeLinecap="round" />
      <circle cx="9" cy="17" r="1" fill="currentColor" stroke="none" />
      <circle cx="15" cy="17" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TransitIconMap({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
      <path d="M9 5 4 7v13l5-2 5 2 5-2 5 2V7l-5-2-5 2-5-2z" strokeLinejoin="round" />
      <circle cx="12" cy="11" r="2" />
    </svg>
  );
}

function TransitIconStop({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
      <path d="M7 5h10v12H7z" strokeLinejoin="round" />
      <path d="M12 17v4M10 21h4" strokeLinecap="round" />
    </svg>
  );
}

function TransitIconWalk({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
      <circle cx="12" cy="5" r="2" />
      <path d="M12 7v5l-2 4M12 12l2 4M9 18l1 5M15 18l-1 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TransitIconPin({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
      <path d="M12 21s7-4.35 7-10a7 7 0 1 0-14 0c0 5.65 7 10 7 10z" strokeLinejoin="round" />
      <circle cx="12" cy="11" r="2.5" />
    </svg>
  );
}

const BUS_NUMBERS = "8, 8-1, 9-3, 11-1, 11-2, 11-3, 11-5, 51, 541, 917";

export default function LocationPage() {
  return (
    <main className="ref-container page-main">
      <section className="page-block page-block--pagehead">
        <p className="ref-kicker">오시는 길</p>
        <h2 className="page-title">오시는 길</h2>
      </section>
      <section className="page-block page-block--intro">
        <p className="page-desc">
          처음 오시는 분도 찾으실 수 있도록 주소와 연락·교통·주차를 짧게 모았습니다. 출입·노선·주차는 안내에
          따라 달라질 수 있으니 방문 전 공지와 현장 안내를 함께 확인해 주시면 좋습니다.
        </p>
      </section>

      <section className="page-block" aria-labelledby="location-visit-heading">
        <h2 className="page-subtitle" id="location-visit-heading">
          방문 시 참고
        </h2>
        <ul className="quiet-list">
          <li>
            <strong>주소.</strong> 내비·지도 앱에는 아래 주소를 참고하실 수 있습니다. 출입구·동·호 등 세부는
            현장 안내와 함께 확인해 주십시오.
          </li>
          <li>
            <strong>예배 방문.</strong> 처음 오실 때는 도착을 넉넉히 잡고, 현장 안내를 활용해 주십시오. 집회
            시간은 공지와 현장 안내를 함께 확인해 주십시오.
          </li>
          <li>
            <strong>대중교통.</strong> 가까운 정류장·역·노선은 시기와 안내에 따라 달라질 수 있습니다. 아래
            안내 카드와 공지·지역 교통 정보를 함께 확인해 주세요.
          </li>
          <li>
            <strong>주차.</strong> 가능 여부·유료 구역은 예배·행사 상황과 현장 표지, 교회 공지를 따릅니다.
          </li>
          <li>
            <strong>약도.</strong> 인덕원역에서 관악대로 335까지의 이동 요약은 아래 &quot;간단 약도&quot;를 참고해
            주세요.
          </li>
        </ul>
      </section>

      <section className="page-block location-transit-block" id="location-transit-guide" aria-labelledby="location-transit-title">
        <h2 className="page-subtitle" id="location-transit-title">
          인덕원역에서 관악대로 335
        </h2>
        <div className="location-transit-lead page-prose-paragraphs">
          <p className="page-desc">예배의 자리로 오시는 길을 안내해 드립니다.</p>
          <p className="page-desc">아래 교통편을 참고하셔서 편안한 발걸음으로 함께해 주세요.</p>
        </div>

        <div className="location-transit-card">
          <div className="location-transit-row">
            <div className="location-transit-icon-wrap" aria-hidden="true">
              <TransitIconSubway className="location-transit-icon-svg" />
            </div>
            <div className="location-transit-cols">
              <div className="location-transit-col">
                <p className="location-transit-mode">지하철 이용 시</p>
                <p className="location-transit-em">4호선 인덕원역 하차</p>
              </div>
              <div className="location-transit-vrule" aria-hidden="true" />
              <div className="location-transit-col">
                <p className="location-transit-detail">8번 출구 이용</p>
                <p className="location-transit-muted">하차 후 인덕원역 방향으로 도보 약 2~3분</p>
              </div>
            </div>
          </div>

          <div className="location-transit-hrule" aria-hidden="true" />

          <div className="location-transit-row">
            <div className="location-transit-icon-wrap" aria-hidden="true">
              <TransitIconBus className="location-transit-icon-svg" />
            </div>
            <div className="location-transit-cols">
              <div className="location-transit-col">
                <p className="location-transit-mode">버스 이용 시</p>
                <p className="location-transit-buses">{BUS_NUMBERS}</p>
              </div>
              <div className="location-transit-vrule" aria-hidden="true" />
              <div className="location-transit-col">
                <p className="location-transit-detail">하차 정류장 · 관양중학교</p>
                <p className="location-transit-muted">이동 · 약 4정거장</p>
                <p className="location-transit-muted">정류장 하차 후 도보 약 2~3분</p>
                <p className="location-transit-detail location-transit-detail--tight">도착지 · 관악대로 335</p>
              </div>
            </div>
          </div>

          <div className="location-transit-hrule" aria-hidden="true" />

          <div className="location-transit-map-section">
            <div className="location-transit-map-head">
              <div className="location-transit-icon-wrap location-transit-icon-wrap--sm" aria-hidden="true">
                <TransitIconMap className="location-transit-icon-svg" />
              </div>
              <p className="location-transit-map-title">간단 약도</p>
            </div>

            <ol className="location-flow" aria-label="인덕원역에서 관악대로 335까지 이동 순서">
              <li className="location-flow-step">
                <div className="location-flow-node-row">
                  <span className="location-flow-node location-flow-node--solid">
                    <TransitIconSubway className="location-flow-node-icon" />
                  </span>
                  <span className="location-flow-connector" />
                </div>
                <span className="location-flow-label">인덕원역 4호선</span>
              </li>
              <li className="location-flow-step">
                <div className="location-flow-node-row">
                  <span className="location-flow-node location-flow-node--outline">8</span>
                  <span className="location-flow-connector" />
                </div>
                <span className="location-flow-label">8번 출구</span>
              </li>
              <li className="location-flow-step">
                <div className="location-flow-node-row">
                  <span className="location-flow-node location-flow-node--outline">
                    <TransitIconBus className="location-flow-node-icon" />
                  </span>
                  <span className="location-flow-connector" />
                </div>
                <span className="location-flow-label">버스 탑승</span>
                <span className="location-flow-sublabel">{BUS_NUMBERS}</span>
              </li>
              <li className="location-flow-step">
                <div className="location-flow-node-row">
                  <span className="location-flow-node location-flow-node--outline">4</span>
                  <span className="location-flow-connector" />
                </div>
                <span className="location-flow-label">약 4정거장</span>
              </li>
              <li className="location-flow-step">
                <div className="location-flow-node-row">
                  <span className="location-flow-node location-flow-node--outline">
                    <TransitIconStop className="location-flow-node-icon" />
                  </span>
                  <span className="location-flow-connector" />
                </div>
                <span className="location-flow-label">관양중학교 하차</span>
              </li>
              <li className="location-flow-step">
                <div className="location-flow-node-row">
                  <span className="location-flow-node location-flow-node--outline">
                    <TransitIconWalk className="location-flow-node-icon" />
                  </span>
                  <span className="location-flow-connector" />
                </div>
                <span className="location-flow-label">도보 약 2~3분</span>
              </li>
              <li className="location-flow-step location-flow-step--end">
                <div className="location-flow-node-row">
                  <span className="location-flow-node location-flow-node--pin">
                    <TransitIconPin className="location-flow-node-icon location-flow-node-icon--pin" />
                  </span>
                </div>
                <span className="location-flow-label">관악대로 335 도착</span>
              </li>
            </ol>
          </div>

          <div className="location-transit-notice" role="note">
            <span className="location-transit-notice-icon" aria-hidden="true">
              i
            </span>
            <p>
              버스 노선과 정류장 위치는 상황에 따라 달라질 수 있으니, 출발 전 최신 교통정보를 함께 확인해 주세요.
            </p>
          </div>
        </div>
      </section>

      <section className="page-grid-2">
        <article className="page-card" id="address">
          <h3>주소</h3>
          <p className="page-desc">
            안양시 동안구 관양동 관악대로 335. 출입 세부는 공지·현장 안내를 함께 확인해 주십시오.
          </p>
        </article>
        <article className="page-card" id="transport">
          <h3>대중교통</h3>
          <p className="page-desc">
            인덕원역·버스 노선 요약은 위 &quot;인덕원역에서 관악대로 335&quot; 안내를 참고해 주세요. 길을 찾기
            어려우시면 031-425-9211로 먼저 문의해 주시고, 연락처 변경은 교회 안내를 따릅니다.
          </p>
        </article>
        <article className="page-card" id="parking">
          <h3>주차</h3>
          <p className="page-desc">
            주차 가능 구역·유료 여부는 예배·행사 일정과 현장 표지, 공지에 따라 달라질 수 있습니다. 방문 당일
            안내를 함께 확인해 주세요.
          </p>
        </article>
      </section>
    </main>
  );
}
