export default function AboutVisionPage() {
  return (
    <main className="ref-container page-main">
      <section className="page-block page-block--pagehead">
        <p className="ref-kicker">교회소개</p>
        <h2 className="page-title">비전 · 핵심가치</h2>
      </section>
      <section className="page-block page-block--intro">
        <p className="page-desc">
          이 교회가 무엇을 먼저 지키고, 어떤 방향으로 나아가기를 희망하는지를 성경 말씀과 함께 드리는 예배의 틀
          안에서 정리한 페이지입니다. 세부 숫자나 실적이 아니라, 함께 품고 싶은 마음의 방향에 가깝게 읽어 주시면
          감사하겠습니다.
        </p>
      </section>

      <section className="page-block" aria-labelledby="vision-statement-heading">
        <h2 className="page-subtitle" id="vision-statement-heading">
          말씀 가운데 세워진 공동체
        </h2>
        <div className="page-split">
          <div className="page-split-content page-prose-paragraphs">
            <p className="page-desc">
              <strong>우리는 복음 가운데 서서, 이웃을 섬기는 작은 촛불들의 모임이기를 소망합니다.</strong> 비전
              문장은 절대적 선언이 아니라, 함께 기도하며 견고히 해 갈 약속에 가깝게 이해해 주십시오.
            </p>
            <p className="page-desc">
              예닮교회는 설교·성경 읽기·기도·교제의 흐름이 서로를 붙잡을 수 있도록, 한두 가지 프로그램에
              몰리지 않는 균형을 지향합니다. 중심이 말씀에 있을 때, 공동체만이 아니라 가정·직장의 자리에도
              믿음이 조용히 스며들 수 있기를 바랍니다.
            </p>
            <p className="page-desc">
              비전이 현실의 모든 세부를 설명하거나 보장해 주지는 않습니다. 다만, 결정이 필요할 때 ‘무엇을
              먼저 품을 것인가’를 묻는 기준이 될 수 있기를 희망합니다. 구체 절차와 일정은 시기에 따라
              달라질 수 있으며, 변화는 공지와 담론을 통해 나누겠습니다.
            </p>
          </div>
          <div className="page-split-media">
            <div className="page-visual">
              <div className="page-visual-placeholder" role="img" aria-label="말씀과 공동체를 담는 시각 자리">
                공동체의 풍경
              </div>
            </div>
            <p className="page-desc-note">교회에서 준비한 이미지가 있으면 이 자리에 함께 담깁니다.</p>
          </div>
        </div>
      </section>

      <section className="page-block" aria-labelledby="vision-values-heading">
        <div className="page-heading-inline">
          <span className="section-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 2" />
            </svg>
          </span>
          <h2 className="page-subtitle" id="vision-values-heading">
            핵심 가치
          </h2>
        </div>
        <p className="page-desc preface">
          아래 다섯 가지는 외치는 구호가 아니라, 공부와 집회·섬김을 잇는 대화에서 자주 짚고 넘어가기를 바라는
          방향입니다. 각 항목이 같은 비중은 아닐 수 있으나, 서로를 짓밟지 않도록 맞추고자 합니다.
        </p>
        <ul className="quiet-list">
          <li>
            <strong>말씀.</strong> 성경을 신앙과 삶의 권위로 인정하며, 해석에 독선을 둘 때는 함께
            느리게 묵상하고, 필요하면 외적 자료·교단적 전통도 참고합니다. 단답이 어려운 질문은 서두르지
            않습니다.
          </li>
          <li>
            <strong>예배.</strong> 주일과 함께 이어지는 기도·찬송의 자리를 소중히 하며, 음악·질서·말씀
            선포가 가려지지 않도록 조용한 배려를 청합니다. 예배의 품위는 ‘격식’보다 ‘집중’에
            둡니다.
          </li>
          <li>
            <strong>공동체.</strong> 서로를 단순 ‘인맥’이 아닌, 그리스도 안에서 믿음·회개·섬김의
            동행자로 대하기를 희망합니다. 갈등이 있을 때는 억압보다 ‘말씀과 상호 존중’이 먼저입니다.
          </li>
          <li>
            <strong>섬김.</strong> 봉사는 소명·안전·능력의 범위 안에서 갖춰 가며, 말씀과의 정합이
            어긋나지 않도록 질문의 문을 열어 둡니다. ‘많이 할수록 좋다’는 식의 동원은 권하지
            않습니다.
          </li>
          <li>
            <strong>선교.</strong> 먼 곳의 선교뿐 아니라, 이웃과 다음 세대를 향한 지속적인 사랑·나눔을
            함께 품습니다. 후원과 참여는 강제가 아닌, 기도에 근거한 기쁨이 되기를 기도합니다.
          </li>
        </ul>
      </section>

      <section className="page-block" aria-labelledby="vision-practice-heading">
        <h2 className="page-subtitle" id="vision-practice-heading">
          실천에 옮기는 방식
        </h2>
        <div className="page-prose-paragraphs">
          <p className="page-desc">
            핵심 가치는 공부·모임·봉사·선교·교육의 구체적 계획에 순차적으로 반영하려 합니다. 한 해의
            일정이나 사역이 바뀌더라도, 위의 방향이 갑자기 뒤집히는 일은 가급적 피하고, 이유가 있을
            때는 투명하게 말씀드리겠습니다.
          </p>
          <p className="page-desc">
            누군가의 의견이 곧 ‘비전 전체’가 되지 않도록, 필요한 사안은 임원·팀·전체에 나누어
            묻는 흐름을 이어 가고자 합니다. 다만, 모든 결정을 무한히 미루기만 하는 것이 신중함은
            아님을 함께 감수합니다. 성급한 결론도, 침묵에 가린 미루기도 삼가겠습니다.
          </p>
          <p className="page-desc">
            읽는 분께서 느끼는 공백이나 궁금함은, 예배 전후·안내·공지의 길을 통해 부담 없이
            올려 주십시오. 이 페이지는 한 번 쓰고 끝나는 선언이 아니라, 같이 읽고 고치는 문으로
            두겠습니다.
          </p>
        </div>
      </section>
    </main>
  );
}
