import Link from "next/link";

export default function MinistriesPage() {
  return (
    <main className="ref-container page-main">
      <section className="page-block page-block--pagehead">
        <p className="ref-kicker">사역소개</p>
        <h2 className="page-title">사역소개</h2>
      </section>
      <section className="page-block page-block--intro">
        <p className="page-desc">
          사역은 행사만 모아 둔 목록이 아니라, 주일에 세워진 마음이 평일과 지역·선교 현장까지 이어지는 길로
          이해합니다. 세부는 아래 두 안내를 참고해 주십시오.
        </p>
      </section>

      <section className="page-block" aria-labelledby="ministries-hub-guide-heading">
        <h2 className="page-subtitle" id="ministries-hub-guide-heading">
          주일과 섬김의 연결
        </h2>
        <div className="page-prose-paragraphs">
          <p className="page-desc">
            <strong>주일사역</strong>은 집회 안에서 찬양·성경 말씀·양육·교제가 한 방향으로 모이도록 돕는 자리에
            가깝습니다. 평일 모임보다 주일의 질서와 교제를 먼저 세운다는 뜻에 무게를 둡니다.
          </p>
          <p className="page-desc">
            <strong>선교 · 봉사</strong>는 그 마음이 이웃과 선교 현장으로 잇는 길입니다. 가까움과 먼 거리를
            서로 깎아내기보다, 기도와 나눔·후원·참여가 한 동역의 다른 모습이 되기를 바랍니다.
          </p>
        </div>
      </section>

      <section className="page-grid-2" aria-label="사역소개 하위 주제">
        <article className="page-card">
          <h3>주일사역</h3>
          <p className="page-desc">주일 집회를 중심으로 이어지는 사역의 방향과 안내.</p>
          <Link className="post-list-link" href="/ministries/sunday">
            내용 보기
          </Link>
        </article>
        <article className="page-card">
          <h3>선교 · 봉사</h3>
          <p className="page-desc">지역과 선교지를 향한 섬김과 참여.</p>
          <Link className="post-list-link" href="/ministries/mission">
            내용 보기
          </Link>
        </article>
      </section>
    </main>
  );
}
