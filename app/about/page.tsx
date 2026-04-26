import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="ref-container page-main">
      <section className="page-block page-block--pagehead">
        <p className="ref-kicker">교회소개</p>
        <h2 className="page-title">교회소개</h2>
      </section>
      <section className="page-block page-block--intro">
        <p className="page-desc">
          예닮교회는 성경 말씀과 함께 드리는 예배를 중심에 두고, 지역과 다음 세대를 돌보는 공동체입니다. 방문을
          환영하며, 아래에서 주제별 안내를 이어 갑니다.
        </p>
      </section>

      <section className="page-block" aria-labelledby="about-hub-guide-heading">
        <h2 className="page-subtitle" id="about-hub-guide-heading">
          안내를 읽는 순서
        </h2>
        <div className="page-prose-paragraphs">
          <p className="page-desc">
            처음 오신 분은 <strong>인사말</strong>에서 교회의 인사와 마음을 먼저 읽어 보시고,{" "}
            <strong>비전 · 핵심가치</strong>에서 공동체가 품고 있는 방향을 살펴보실 수 있습니다.
          </p>
          <p className="page-desc">
            <strong>섬기는 이들</strong>은 교역자와 사역을 돕는 이들을 소개하고, <strong>예배시간</strong>에서는
            집회 일정과 첫 방문 때 참고할 점을 정리해 두었습니다. 꼭 이 순서를 밟을 필요는 없으며, 궁금한
            주제부터 편히 열어보셔도 됩니다.
          </p>
        </div>
      </section>

      <section className="page-grid-2" aria-label="교회소개 하위 주제">
        <article className="page-card">
          <h3>인사말</h3>
          <p className="page-desc">담임목사 인사와 교회를 향한 마음을 전합니다.</p>
          <Link className="post-list-link" href="/about/intro">
            내용 보기
          </Link>
        </article>
        <article className="page-card">
          <h3>교회비전</h3>
          <p className="page-desc">하나님께서 맡기신 비전과 핵심 가치.</p>
          <Link className="post-list-link" href="/about/vision">
            내용 보기
          </Link>
        </article>
        <article className="page-card">
          <h3>섬기는 사람들</h3>
          <p className="page-desc">함께 섬기는 사역팀을 소개합니다.</p>
          <Link className="post-list-link" href="/about/leaders">
            내용 보기
          </Link>
        </article>
        <article className="page-card">
          <h3>예배시간</h3>
          <p className="page-desc">주일·수요·기도·다음세대 등 예배 안내.</p>
          <Link className="post-list-link" href="/about/worship">
            내용 보기
          </Link>
        </article>
      </section>
    </main>
  );
}
