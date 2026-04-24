import Link from "next/link";
import { PreheroMeta } from "../../components/prehero-meta";
import { boardMeta, getPostsByType } from "../../lib/content-data";

export default function NewsPage() {
  const items = getPostsByType("news");
  return (
    <main className="ref-container page-main">
      <PreheroMeta label="News" />
      <section className="page-block">
        <p className="ref-kicker">Updates</p>
        <h2 className="page-title">교회소식</h2>
      </section>

      <section className="page-board-wrap">
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
