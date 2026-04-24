import { PreheroMeta } from "../../components/prehero-meta";

export default function MinistriesPage() {
  return (
    <main className="ref-container page-main">
      <PreheroMeta label="Ministry" />
      <section className="page-block" id="sunday">
        <p className="ref-kicker">Ministry</p>
        <h2 className="page-title">사역소개</h2>
      </section>

      <section className="page-grid-2">
        <article className="page-card" id="nextgen">
          <h3>다음세대</h3>
          <p>영아부부터 청년부까지 연령별 예배와 양육 프로그램을 운영하고 있습니다.</p>
        </article>
        <article className="page-card" id="mission">
          <h3>선교/봉사</h3>
          <p>지역 돌봄과 국내외 선교, 정기 봉사 활동으로 복음을 삶으로 나누고 있습니다.</p>
        </article>
      </section>
    </main>
  );
}
