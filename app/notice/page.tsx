import Link from "next/link";
import { boardMeta, getPostsByType } from "../../lib/content-data";

export default function NoticePage() {
  const items = getPostsByType("notice");
  return (
    <main className="ref-container page-main">
      <section className="page-block page-block--pagehead">
        <p className="ref-kicker">공지사항</p>
        <h2 className="page-title">공지사항</h2>
      </section>
      <section className="page-block page-block--intro">
        <p className="page-desc">
          예배·모임·시설·협조 등 교우와 방문자께 알려 드릴 안내를 모았습니다. 확정 내용은 교회 공지와 현장 안내를
          함께 확인해 주세요.
        </p>
      </section>

      <section className="page-board-wrap" aria-label="공지사항 목록">
        <header className="board-panel-head board-panel-head-page">
          <h3>{boardMeta.notice.label}</h3>
        </header>
        <ul className="board-list board-list-page">
          {items.map((item) => (
            <li className="board-row" key={item.id}>
              <Link className="board-title-link" href={item.detailHref!}>
                {item.title}
              </Link>
              <time className="board-date" dateTime={item.date}>
                {item.date}
              </time>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
