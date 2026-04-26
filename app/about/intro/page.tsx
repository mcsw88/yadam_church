export default function AboutIntroPage() {
  return (
    <main className="ref-container page-main">
      <section className="page-block page-block--pagehead">
        <p className="ref-kicker">교회소개</p>
        <h2 className="page-title">인사말</h2>
      </section>
      <section className="page-block page-block--intro">
        <p className="page-desc">
          처음 예닮교회를 방문하시는 분도 편히 주님을 바라보며 예배에 동참하실 수 있도록, 인사와 교회의 마음을
          전합니다. 아래 글을 통해 양육과 섬김이 어떤 흐름으로 이어지는지 함께 읽어 주시면 감사하겠습니다.
        </p>
      </section>

      <section className="page-block" aria-labelledby="intro-pastor-heading">
        <h2 className="page-subtitle" id="intro-pastor-heading">
          담임목사 인사
        </h2>
        <div className="page-split">
          <div className="page-split-content page-prose-paragraphs">
            <p className="ref-kicker">담임목사</p>
            <p className="page-desc">
              예수 그리스도의 복음 안에서 이 교회에 함께하게 된 여러분을 환영합니다. 우리는 먼저 성경 말씀을 밝혀
              이웃을 섬기는 공동체이기를 작정하고, 드리는 예배의 자리를 지키며 삶의 자리에서 믿음의 연습을 이어
              갑니다.
            </p>
            <p className="page-desc">
              집회는 성도 한 사람이 주님 앞에 서는 자리이며, 동시에 믿는 형제 자매가 한 자리에 모이는 은혜의
              모임입니다. 익숙하신 분이든 처음 찾으신 분이든, 그 가운데 자리를 주어 주심에 감사하며, 서로의 연약함을
              품을 수 있기를 소망합니다.
            </p>
            <p className="page-desc">
              일상의 속도가 빠를수록, 말씀으로 묵상하고 기도로 묵는 시간이 필요하다고 믿습니다. 교회는 강연의
              장이기보다 성경이 선포되고 붙잡혀질 수 있는 쉼의 장이 되고자 합니다. 그 흐름 안에서 양육과 다음 세대,
              지역의 섬김까지 이어질 수 있기를 기도합니다.
            </p>
            <p className="page-desc">
              궁금하신 점이나 심리적인 부담이 있으시면 예배 전후에 나누어 주십시오. 안내는 친절일 뿐 강요가 아님을 먼저
              말씀드리며, 주님 안에서 느리지만 분명한 걸음을 같이하길 기도합니다.
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

      <section className="page-block" aria-labelledby="intro-direction-heading">
        <div className="page-heading-inline">
          <span className="section-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
          </span>
          <h2 className="page-subtitle" id="intro-direction-heading">
            교회의 방향
          </h2>
        </div>
        <p className="page-desc preface">
          예닮교회는 아래 흐름을 토대로 말씀과 섬김의 삶을 조율하며, 세부 사역은 시기에 따라 정리·안내드립니다.
        </p>
        <ul className="quiet-list">
          <li>
            <strong>말씀.</strong> 성경이 신앙과 삶의 기준이 되도록 설교·공부·개인 읽기를 권면합니다. 확답이 없는 사안은
            섣불리 단정하지 않습니다.
          </li>
          <li>
            <strong>예배.</strong> 주를 향한 예배를 가장 먼저 지키는 공동체이길 바라며, 예배 질서와 안내는 평온을
            우선으로 합니다.
          </li>
          <li>
            <strong>양육.</strong> 믿음의 기초를 다지고, 삶에 적용할 여지를 스스로 찾을 수 있도록 말씀·모임·질문이
            이어질 수 있기를 희망합니다.
          </li>
          <li>
            <strong>섬김.</strong> 교회 안팎을 향한 봉사는 소명과 안전, 가능 범위 안에서 갖춰 갑니다. 말씀과의 정합이
            먼저입니다.
          </li>
          <li>
            <strong>다음세대.</strong> 아이·청년이 자라는 공동체로서, 세대 사이의 배려와 안전한 교육 환경을 중요하게
            여깁니다. 세부는 학년·팀에 맞춰 안내됩니다.
          </li>
        </ul>
      </section>

      <section className="page-block" aria-labelledby="intro-newcomer-heading">
        <h2 className="page-subtitle" id="intro-newcomer-heading">
          처음 오시는 분께
        </h2>
        <div className="page-prose-paragraphs">
          <p className="page-desc">
            처음 오시는 날, 예배에 대한 안내가 필요하시면 말씀해 주십시오. 좌석·질서·이후의 간단한 안내를 짧게
            정리해 드립니다. 정해진 ‘입문 절차’를 밟아야만 참여할 수 있도록 강제하지는 않습니다.
          </p>
          <p className="page-desc">
            격식에 맞는 복장을 권하거나 부담을 드리지 않으려 합니다. 편안한 복장에서도 말씀과 찬송에 집중하실 수
            있도록, 함께한 예배의 품위만 서로 품어 주시면 됩니다.
          </p>
          <p className="page-desc">
            예배 전후 궁금한 점은 안내를 통해 연락하실 수 있습니다. 점심·교제 여부, 주차 등은 당시 공지·현장
            안내에 따르며, 급한 문의는 예배 전 잠시의 시간이나 점심 이후에도 나누실 수 있도록 섭의하고 있습니다.
          </p>
        </div>
      </section>
    </main>
  );
}
