import { PreheroMeta } from "../../components/prehero-meta";

export default function AboutPage() {
  return (
    <main className="ref-container page-main">
      <PreheroMeta label="About" />
      <section className="page-block" id="intro">
        <p className="ref-kicker">Intro</p>
        <h2 className="page-title">교회소개</h2>
        <p className="page-desc">
          예닮교회는 예수 그리스도의 사랑 안에서 예배와 말씀, 그리고 이웃 사랑을 실천하는 공동체입니다. 처음 방문하신 분도
          편안하게 함께 예배하고 교제하실 수 있도록 돕고 있습니다.
        </p>
      </section>

      <section className="page-grid-2" id="vision">
        <article className="page-card">
          <h3>비전 / 핵심가치</h3>
          <p>말씀, 예배, 양육, 선교를 통해 삶의 자리에서 복음을 드러내는 교회가 되기를 소망합니다.</p>
        </article>
        <article className="page-card" id="leaders">
          <h3>섬기는 사람들</h3>
          <p>담임목사와 사역팀, 찬양팀, 다음세대 교사들이 함께 교회를 섬기고 있습니다.</p>
        </article>
      </section>
    </main>
  );
}
