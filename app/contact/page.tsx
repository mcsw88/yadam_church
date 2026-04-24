import { PreheroMeta } from "../../components/prehero-meta";

export default function ContactPage() {
  return (
    <main className="ref-container page-main">
      <PreheroMeta label="Contact" />
      <section className="page-block">
        <p className="ref-kicker">Contact</p>
        <h2 className="page-title">문의하기</h2>
        <p className="page-desc">교회와 예배, 모임에 대해 궁금한 내용을 편하게 문의해 주세요.</p>
      </section>

      <section className="page-grid-3">
        <article className="page-card" id="general">
          <h3>일반문의</h3>
          <p>전화 010-0000-0000</p>
        </article>
        <article className="page-card" id="prayer">
          <h3>기도요청</h3>
          <p>이메일 prayer@example.com</p>
        </article>
        <article className="page-card" id="newcomer">
          <h3>새가족등록</h3>
          <p>주일예배 후 안내데스크에서 신청하실 수 있습니다.</p>
        </article>
      </section>
    </main>
  );
}
