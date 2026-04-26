import Link from "next/link";
import { boardMeta, getPostsByType } from "../../lib/content-data";

export default function NewsPage() {
  const items = getPostsByType("news");
  return (
    <main className="ref-container page-main">
      <section className="page-block page-block--pagehead">
        <p className="ref-kicker">교회소식</p>
        <h2 className="page-title">교회소식</h2>
      </section>
      <section className="page-block page-block--intro">
        <p className="page-desc">
          집회와 사역 가운데 나눈 소식·짧은 기록을 올립니다. 일정이나 필수 안내는 공지사항을 함께 확인해 주시면
          좋습니다.
        </p>
      </section>

      <section className="page-board-wrap" aria-label="교회소식 목록">
        <header className="board-panel-head board-panel-head-page">
          <h3>{boardMeta.news.label}</h3>
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
