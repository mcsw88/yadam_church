import { PreheroMeta } from "../../components/prehero-meta";

export default function LocationPage() {
  return (
    <main className="ref-container page-main">
      <PreheroMeta label="Location" />
      <section className="page-block">
        <p className="ref-kicker">Visit</p>
        <h2 className="page-title">오시는길</h2>
      </section>

      <section className="page-grid-2">
        <article className="page-card" id="address">
          <h3>주소</h3>
          <p>서울시 샘플구 샘플로 123, 2층</p>
        </article>
        <article className="page-card" id="transport">
          <h3>대중교통</h3>
          <p>샘플역 2번 출구에서 도보 5분 거리입니다.</p>
        </article>
        <article className="page-card" id="parking">
          <h3>주차안내</h3>
          <p>건물 앞 공영주차장 또는 인근 유료주차장을 이용해 주세요.</p>
        </article>
        <article className="page-photo">약도 이미지 영역</article>
      </section>
    </main>
  );
}
