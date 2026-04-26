export default function AboutLeadersPage() {
  return (
    <main className="ref-container page-main">
      <section className="page-block page-block--pagehead">
        <p className="ref-kicker">교회소개</p>
        <h2 className="page-title">섬기는 이들</h2>
      </section>
      <section className="page-block page-block--intro">
        <p className="page-desc">
          교역자와 함께 교회를 섬기는 이들을, 과장 없이 짧게 소개합니다. 이름·직분·담당은 안내용으로 정리되어
          있을 수 있으니, 임명과 세부 사역은 교회 공지·현장 안내를 함께 확인해 주세요.
        </p>
      </section>

      <section className="page-block" aria-labelledby="senior-pastor-heading">
        <h2 className="page-subtitle" id="senior-pastor-heading">
          담임목사
        </h2>
        <div className="page-split">
          <div className="page-split-content page-prose-paragraphs">
            <p className="page-desc">
              <strong>이○○ 목사</strong>
              <span aria-hidden="true"> · </span>
              담임목사
            </p>
            <p className="page-desc">
              <strong>비전.</strong> 말씀이 공동체의 중심에 서고, 예배와 양육·섬김이 그 말씀을 향해 한 방향으로
              모일 때, 교회는 작은 이웃 사랑의 자리까지 자연스럽게 이어지기를 바랍니다.
            </p>
            <p className="page-desc">
              담임목사는 주일 설교와 성도 돌봄, 교역자·봉사자들과의 협력을 통해 예배의 질서와 양육의 흐름이 서로
              어긋나지 않도록 맞추는 일을 맡습니다. 모든 결정이 한 사람의 뜻으로 굳지 않도록, 필요한 사안은 임원과
              사역팀, 때로는 전체 교우의 의견을 듣는 과정을 소홀히 하지 않으려 합니다.
            </p>
            <p className="page-desc">
              개인의 은사나 성향에 실제 교회의 방향이 과도하게 실리지 않도록 경계하며, 교단의 신앙 고백과 헌법이
              허용하는 범위 안에서 교회를 섬깁니다. 구체적인 연락·상담 안내는 예배 안내와 공지를 참고해 주십시오.
            </p>
          </div>
          <div className="page-split-media">
            <div className="profile-placeholder" role="img" aria-label="담임목사 프로필 사진">
              프로필 사진
            </div>
            <p className="page-desc-note">프로필 이미지는 교회 안내에 맞춰 갱신될 수 있습니다.</p>
          </div>
        </div>
      </section>

      <section className="page-block" aria-labelledby="ministry-staff-heading">
        <h2 className="page-subtitle" id="ministry-staff-heading">
          사역자
        </h2>
        <p className="page-desc preface">
          직분과 담당은 교회 상황에 따라 달라질 수 있습니다. 아래 소개는 참고용이며, 임명·인적 사항은 교회 안내를
          확인해 주십시오.
        </p>
        <div className="page-grid-2">
          <article className="page-card">
            <div className="profile-placeholder" role="img" aria-label="강도사 프로필 사진">
              프로필 사진
            </div>
            <h3>박○○</h3>
            <div className="page-prose-paragraphs">
              <p className="page-desc">강도사. 예배를 돕는 준비와 성경을 함께 읽는 모임 쪽이 주된 연결고리입니다.</p>
              <p className="page-desc">주일·수요 흐름에 맞춰 자료를 정리하고, 새로 오신 분이 순서를 따라가실 수 있게 짧은 안내를 돕는 일이 이어집니다.</p>
            </div>
          </article>

          <article className="page-card">
            <div className="profile-placeholder" role="img" aria-label="전도사 프로필 사진">
              프로필 사진
            </div>
            <h3>최○○</h3>
            <div className="page-prose-paragraphs">
              <p className="page-desc">
                <strong>담당.</strong> 전도사 — 청년·젊은 성도 교제, 심방 보조
              </p>
              <p className="page-desc">예배·교제의 리듬이 끊기지 않게 부담을 덜어 주는 쪽에 무게를 둡니다. 심방은 담임목사와 일정을 나누고, 긴급한 연락은 교회 안내에 기재된 경로로 이어질 수 있게 돕습니다.</p>
            </div>
          </article>

          <article className="page-card">
            <div className="profile-placeholder" role="img" aria-label="다음세대 사역 프로필 사진">
              프로필 사진
            </div>
            <h3>한○○</h3>
            <div className="page-prose-paragraphs">
              <p className="page-desc">
                <strong>교육(다음세대) 담당</strong>
              </p>
              <p className="page-desc">
                <strong>담당 범위.</strong> 주일학교·청소년, 교사 돌봄. 아이·청소년이 안전·신뢰를 먼저 느끼고, 나이에 맞게 말씀을 만날 수 있게 자료와 절차를 맞춥니다. 학부모·봉사자와의 소통은 정기와 공지로 이어갑니다.
              </p>
            </div>
          </article>

          <article className="page-card">
            <div className="profile-placeholder" role="img" aria-label="찬양 인도 프로필 사진">
              프로필 사진
            </div>
            <h3>오○○</h3>
            <div className="page-prose-paragraphs">
              <p className="page-desc">찬양 인도. 주일·특별예배, 찬양팀 연습.</p>
              <p className="page-desc">음악이 앞서지 않게 악보·연습·일정을 사전에 공유하며, 합창에 참여하시려면 담당 교역자와 먼저 맞춰 갑니다.</p>
            </div>
          </article>
        </div>
      </section>

      <section className="page-block" aria-labelledby="serving-together-heading">
        <div className="page-heading-inline">
          <span className="section-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false">
              <path d="M12 3v18M3 12h18" />
              <circle cx="12" cy="12" r="9" />
            </svg>
          </span>
          <h2 className="page-subtitle" id="serving-together-heading">
            함께 섬기는 방향
          </h2>
        </div>
        <p className="page-desc preface">
          교역자만의 일이 아니라, 봉사자·성도와 나란히 서는 마음가짐을 아래와 같이 정리해 두었습니다.
        </p>
        <ul className="quiet-list">
          <li>
            <strong>집회의 중심.</strong> 프로그램보다 말씀 선포·성례·기도의 자리를 먼저 지키고, 예배의 질서가
            흐트러지지 않도록 서로를 돕습니다.
          </li>
          <li>
            <strong>성도와 다음 세대.</strong> 연령과 처지를 가볍게 나누지 않고, 양육·돌봄·안전에 필요한 절차를
            함께 지킵니다.
          </li>
          <li>
            <strong>지역과 이웃.</strong> 교회 담을 넘어 설 때에도 과시가 아닌 책임과 연대를 우선하며, 작은 나눔과
            봉사를 오래 지속할 수 있도록 무리하지 않습니다.
          </li>
          <li>
            <strong>협력의 문화.</strong> 직분이 다르다고 해서 경계를 세우기보다, 필요한 정보는 투명히 나누고
            결정은 기도와 대화에 기대도록 노력합니다.
          </li>
        </ul>
      </section>
    </main>
  );
}
