import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="ref-container page-main">
      <section className="page-block page-block--pagehead">
        <p className="ref-kicker">문의하기</p>
        <h2 className="page-title">문의하기</h2>
      </section>
      <section className="page-block page-block--intro">
        <p className="page-desc">
          예배·모임·시설에 관한 질문은 아래 경로 중 편하신 방법을 선택해 주십시오. 긴급하거나 공적인 요청은
          주일 안내·공지에 안내된 대표 연락을 이용하시는 것이 좋습니다. 연락처와 절차는 시기에 따라 달라질 수
          있으니, 방문 전·문의 전에 최신 안내를 함께 확인해 주시면 감사하겠습니다.
        </p>
      </section>

      <section className="page-block" aria-labelledby="contact-paths-heading">
        <h2 className="page-subtitle" id="contact-paths-heading">
          문의 경로
        </h2>
        <ul className="quiet-list">
          <li>
            <strong>일반 문의.</strong> 전화로 빠르게 확인하실 수 있습니다. 아래 번호는 교회 대표 연락처이며,
            변경이 있으면 공지·현장 안내를 따릅니다.
          </li>
          <li>
            <strong>새가족.</strong> 예배에 나오시며 현장 안내를 통해 연결하는 흐름을 우선합니다. 세부 절차는
            공지에 맞게 안내됩니다.
          </li>
          <li>
            <strong>기도 요청.</strong> 접수 방식은 정리되는 대로 안내합니다. 급한 심방이 필요하시면 전화로
            먼저 알려 주십시오.
          </li>
          <li>
            <strong>자유게시판.</strong> 짧은 글을 남기실 수 있는{" "}
            <Link className="post-list-link" href="/contact/board">
              자유게시판
            </Link>
            이 마련되어 있습니다. 가벼운 나눔·질문용이며, 공식 문의나 긴급한 일은 위 연락처를 이용해 주시는
            것이 좋습니다. 작성하신 내용은 화면에서만 확인되며 교회로 바로 전달되지 않으니, 접수가 필요하시면
            연락처를 함께 이용해 주세요.
          </li>
        </ul>
      </section>

      <section className="page-grid-3">
        <article className="page-card" id="general">
          <h3>일반문의</h3>
          <p className="page-desc">
            031-425-9211 — 교회 대표 번호입니다. 담당·내선이 바뀌었을 수 있으니, 방문 전 공지나 현장 안내를 함께
            확인해 주십시오.
          </p>
        </article>
        <article className="page-card" id="prayer">
          <h3>기도요청</h3>
          <p className="page-desc">
            이메일 등으로 접수하는 방식을 정리하는 중입니다. 구체적인 방법은 정해지는 대로 이 페이지나 공지로
            안내드리겠습니다.
          </p>
        </article>
        <article className="page-card" id="newcomer">
          <h3>새가족등록</h3>
          <p className="page-desc">
            주일 예배 또는 예배 후 안내를 통해 신청·연결하실 수 있습니다. 세부 절차는 안내에 맞춰 갱신됩니다.
          </p>
        </article>
      </section>
    </main>
  );
}
