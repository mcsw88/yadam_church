/** 화면에 보이는 사역 방향 안내입니다. 명칭·대상은 공지와 합의된 안내를 기준으로 합니다. */
type MissionInitiative = {
  id: string;
  scope: "domestic" | "overseas";
  title: string;
  description: string;
};

const MISSION_INITIATIVE_EXAMPLES: MissionInitiative[] = [
  {
    id: "local-sharing",
    scope: "domestic",
    title: "지역 나눔 사역",
    description:
      "이웃을 향한 작은 나눔. 식료·생필·정보 연결은 시기·필요에 맞게 조정될 수 있으며, 범위를 정할 때는 공동체의 판단을 따릅니다.",
  },
  {
    id: "vulnerable-aid",
    scope: "domestic",
    title: "취약계층 물품 나눔",
    description:
      "필요를 듣고 물품을 정리·전개하는 흐름. 대상·절차는 개인정보·안전을 고려해 익명과 보호에 무게를 둡니다.",
  },
  {
    id: "nextgen-bridge",
    scope: "domestic",
    title: "다음세대 돌봄 연계",
    description:
      "청소년·어린이와 지역·기관이 만나는 지점을 살피는 방향. 현장 협력은 허가·동의·안전 절차 뒤에 정리됩니다.",
  },
  {
    id: "overseas-prayer",
    scope: "overseas",
    title: "선교지 기도 후원",
    description:
      "협력 사역을 위해 기도 제목을 나누는 흐름. 공개할 이름·지역은 감수성과 합의에 맞게 정해질 수 있습니다.",
  },
  {
    id: "overseas-partnership",
    scope: "overseas",
    title: "협력 사역 준비",
    description:
      "현지 교회·단체와의 협력을 신중히 준비하는 단계. 단기·자료·방문은 합의·교육이 갖춰진 뒤에 안내될 수 있습니다.",
  },
  {
    id: "missionary-support",
    scope: "overseas",
    title: "선교사 후원 안내",
    description:
      "기도·재정으로 사역자를 돕는 흐름. 회계·보고·방법은 교회가 정한 절차와 공지에 따르며, 참여는 감사에 기대는 마음이 우선입니다.",
  },
];

function scopeLabel(scope: MissionInitiative["scope"]) {
  return scope === "domestic" ? "국내 · 지역" : "해외 · 협력";
}

export default function MinistriesMissionPage() {
  return (
    <main className="ref-container page-main">
      <section className="page-block page-block--pagehead">
        <p className="ref-kicker">사역소개</p>
        <h2 className="page-title">선교 · 봉사</h2>
      </section>
      <section className="page-block page-block--intro">
        <p className="page-desc">
          선교와 봉사는 먼 나라만 바라보는 행사가 아니라, 성경과 기도에 근거해 이웃과 열방을 함께 품는 자세에
          가깝습니다. 아래는 방향과 참여를 정리한 안내이며, 구체 일정·대상·담당은 공지와 모임 안내를 기준으로
          확인해 주시기 바랍니다.
        </p>
      </section>

      <section className="page-block" aria-labelledby="mission-perspective-heading">
        <h2 className="page-subtitle" id="mission-perspective-heading">
          선교와 봉사를 바라보는 관점
        </h2>
        <div className="page-prose-paragraphs">
          <p className="page-desc">
            선교는 비행기를 타야만 시작되는 일이 아니라, 일상의 자리에서 복음의 태도로 이웃을 대하고 섬기는 흐름에서
            이미 열립니다. 그렇기에 지역 봉사와 해외 사역을 서로 대립시키기보다, 같은 마음의 다른 표현으로
            맞추려 합니다.
          </p>
          <p className="page-desc">
            가까운 이웃과 먼 선교지를 한쪽만 택하지 않고 균형 있게 바라봅니다. 자원과 시기에 따라 비중이 달라질 수
            있으나, 한쪽을 내세워 다른 쪽을 무시하지 않도록 질문을 열어 둡니다.
          </p>
          <p className="page-desc">
            기도·나눔·후원·현장 참여는 같은 사역의 다른 지점입니다. 모두가 같은 방식으로 참여할 필요는 없으며,
            각자의 처지에서 감당 가능한 지점을 찾을 수 있기를 바랍니다.
          </p>
          <p className="page-desc">
            교회 공동체가 소수의 결정만으로 선교를 대신하지 않도록, 필요한 정보는 나누고 참여의 문은 넓게 두되,
            안전·법·윤리의 선 안에서 움직이려 합니다.
          </p>
        </div>
      </section>

      <section className="page-block" aria-labelledby="mission-domestic-heading">
        <h2 className="page-subtitle" id="mission-domestic-heading">
          국내 선교 · 지역 봉사
        </h2>
        <p className="page-desc preface">
          아래는 <strong>국내 · 이웃</strong>을 먼저 품을 때의 방향을 짧게 짚은 것이며, 협력 대상·명칭·일정은
          교회에서 확인·안내된 내용을 따릅니다.
        </p>
        <ul className="quiet-list">
          <li>
            <strong>이웃.</strong> 교회 주변의 필요를 과장하지도 외면하지도 않고, 작은 연결부터 살핍니다.
          </li>
          <li>
            <strong>가정.</strong> 도움이 필요한 가정에 대한 지원은 공동체의 판단과 절차를 거치며, 개인 사정은
            존중합니다.
          </li>
          <li>
            <strong>다음 세대.</strong> 아이·청년이 지역사회와 건강히 연결될 수 있도록 교육·봉사의 접점을
            모색합니다.
          </li>
          <li>
            <strong>정기 봉사.</strong> 정기 일정이 있을 수도 있고, 행사성으로만 진행될 수도 있습니다. 참여는
            강제가 아닌 안내에 따릅니다.
          </li>
          <li>
            <strong>필요 살피기.</strong> 실제 상황을 듣고 조정하는 태도를 우선하며, 상징적 사진·실적 나열에
            치우치지 않으려 합니다.
          </li>
        </ul>
      </section>

      <section className="page-block" aria-labelledby="mission-overseas-heading">
        <h2 className="page-subtitle" id="mission-overseas-heading">
          해외 선교
        </h2>
        <p className="page-desc preface">
          <strong>해외 · 협력</strong>은 먼 곳의 일만이 아니라, 가까운 이웃과 결이 비슷한 “동역”의 다른 표현이기를
          바랍니다. 아래는 관계·안전·회계의 전제를 두고, 일정한 방향만 제시한 것입니다.
        </p>
        <ul className="quiet-list">
          <li>
            <strong>협력.</strong> 해외 사역은 관계와 안전·회계 전제를 두고 준비하며, 합의된 협력이 있을 때 그
            흐름에 맞추려 합니다.
          </li>
          <li>
            <strong>사역자.</strong> 파송·협력 사역자를 기도와 물질로 돕는 흐름을 이어 갑니다. 인명·지역 공개
            범위는 민감도와 안내 원칙에 따라 정해집니다.
          </li>
          <li>
            <strong>기도와 재정.</strong> 후원은 투명한 회계와 보고를 원칙으로 하며, 기도가 물질만큼 중요한
            동행이라고 봅니다.
          </li>
          <li>
            <strong>단기 참여.</strong> 단기 방문이나 봉사는 준비·합의·안전 교육이 갖춰진 뒤에 검토될 수 있습니다.
            매년 실시를 약속하지는 않습니다.
          </li>
          <li>
            <strong>함께함.</strong> 현장에 가지 않아도 기도와 후원·정보 나눔으로 동역자가 될 수 있습니다.
          </li>
        </ul>
      </section>

      <section className="page-block" aria-labelledby="mission-initiatives-heading">
        <h2 className="page-subtitle" id="mission-initiatives-heading">
          참고하는 사역 방향
        </h2>
        <p className="page-desc preface">
          각 카드는 <strong>국내 · 지역</strong>과 <strong>해외 · 협력</strong>로 나뉘어, 사역 <strong>방향</strong>을
          짧게 정리한 것입니다. 항목마다 시기와 방식이 다르며, 모두가 한꺼번에 진행된다는 뜻은 아닙니다. 진행
          여부는 공지를 확인해 주십시오.
        </p>
        <div className="page-grid-2">
          {MISSION_INITIATIVE_EXAMPLES.map((item) => {
            const scope = scopeLabel(item.scope);
            return (
            <article key={item.id} className="page-card" aria-labelledby={`mission-${item.id}-title`}>
              <h3 id={`mission-${item.id}-title`}>{item.title}</h3>
              <div className="page-prose-paragraphs">
                {item.id === "vulnerable-aid" || item.id === "nextgen-bridge" || item.id === "missionary-support" ? (
                  <>
                    <p className="page-desc">
                      <strong>구분.</strong> {scope}
                    </p>
                    <p className="page-desc">{item.description}</p>
                  </>
                ) : (
                  <p className="page-desc">
                    <strong>{scope}.</strong> {item.description}
                  </p>
                )}
              </div>
            </article>
            );
          })}
        </div>
      </section>

      <section className="page-block" aria-labelledby="mission-participate-heading">
        <div className="page-heading-inline">
          <span className="section-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 8v8M8 12h8" />
            </svg>
          </span>
          <h2 className="page-subtitle" id="mission-participate-heading">
            함께 참여하는 방법
          </h2>
        </div>
        <p className="page-desc preface">
          모든 항목을 한꺼번에 할 필요는 없습니다. 기도 한 가지부터 동역이 시작될 수 있습니다.
        </p>
        <ul className="quiet-list">
          <li>
            <strong>기도.</strong> 선교지·이웃·교역자·봉사자를 위해 정기적으로 제목을 나눕니다. 개인 기도와 공동
            기도 모두 소중히 여깁니다.
          </li>
          <li>
            <strong>후원.</strong> 헌금·지정 후원 등 방법은 교회 안내와 회계 규정에 따릅니다. 금액을 과시하거나
            비교하지 않습니다.
          </li>
          <li>
            <strong>봉사 참여.</strong> 시간과 체력이 허락하는 범위에서 현장 봉사에 참여할 수 있습니다. 안전·역할
            교육이 필요할 수 있습니다.
          </li>
          <li>
            <strong>사역 문의.</strong> 참여를 원하시거나 사역에 대한 질문이 있으면, 예배 안내에 적힌 연락 경로나
            담당자를 통해 문의하실 수 있습니다.
          </li>
        </ul>
      </section>

      <section className="page-block" aria-labelledby="mission-visual-heading">
        <h2 className="page-subtitle" id="mission-visual-heading">
          섬김의 자리
        </h2>
        <div className="page-split">
          <div className="page-split-media">
            <figure className="page-visual">
              <div
                className="page-visual-placeholder"
                role="img"
                aria-label="선교와 봉사, 나눔을 담는 이미지 자리"
              >
                섬김의 장면
              </div>
            </figure>
            <p className="page-desc-note">교회에서 준비한 사진이 있으면 이 자리에 함께 담깁니다.</p>
          </div>
          <div className="page-split-content page-prose-paragraphs">
            <p className="page-desc">
              나눔과 동역을 과시하기 위한 장식이 되지 않도록, 이 자리는 절제해 두었습니다. 사역의 중심은 기도와
              성경에 근거한 마음, 그리고 이웃을 향한 작은 순종에 있다고 믿습니다.
            </p>
            <p className="page-desc">
              사진이 없어도 참여 안내와 후원 안내를 읽는 데는 문제없습니다. 갱신은 교회 안내에 맞춥니다.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
