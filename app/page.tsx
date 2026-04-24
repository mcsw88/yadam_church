import Link from "next/link";
import { PreheroMeta } from "../components/prehero-meta";
import { boardMeta, getPostsByType } from "../lib/content-data";

export default function HomePage() {
  const noticeItems = getPostsByType("notice", 5);
  const newsItems = getPostsByType("news", 5);

  return (
    <main className="ref-container">
      <PreheroMeta label="예닮교회" />

      <section className="ref-hero">
        <h1 className="verse-title">
          그 작은 자가 천을 이루겠고 그 약한 자가
          <br />
          강국을 이룰 것이라 때가 되면 나 여호와가 속히 이루리라
          <br />
          이사야 60:22
        </h1>
      </section>

      <section className="ref-card-image">
        <div className="ref-pill-bg" aria-hidden="true" />
        <img src="/assets/images/main_img.png" alt="메인 이미지" />
      </section>

      <section className="ref-trusted">
        <p className="ref-kicker">Trusted by</p>
        <div className="ref-logos">
          <span>logi</span>
          <span>Logipsum</span>
          <span>✦</span>
          <span>Logipsum</span>
          <span>LOREM&NUY</span>
          <span className="logo-pill">logipsum</span>
        </div>
      </section>

      <section className="ref-main-boards">
        <div className="home-board-table" data-home-board-table data-board-limit="5">
          <div className="home-board-split">
            <section className="home-board-panel">
              <header className="home-board-panel-head">
                <h3>{boardMeta.notice.label}</h3>
                <Link href={boardMeta.notice.listPage}>전체보기</Link>
              </header>
              <ul className="home-board-body">
                {noticeItems.map((item) => (
                  <li className="home-board-item" key={item.id}>
                    <Link className="board-title-link" href={item.detailHref!} title={item.title}>
                      {item.title}
                    </Link>
                    <time className="board-date" dateTime={item.date}>
                      {item.date}
                    </time>
                  </li>
                ))}
              </ul>
            </section>
            <section className="home-board-panel">
              <header className="home-board-panel-head">
                <h3>{boardMeta.news.label}</h3>
                <Link href={boardMeta.news.listPage}>전체보기</Link>
              </header>
              <ul className="home-board-body">
                {newsItems.map((item) => (
                  <li className="home-board-item" key={item.id}>
                    <Link className="board-title-link" href={item.detailHref!} title={item.title}>
                      {item.title}
                    </Link>
                    <time className="board-date" dateTime={item.date}>
                      {item.date}
                    </time>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </section>

      <section className="ref-large-image">
        <img
          src="https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1600&q=80"
          alt="Mountain range sample"
        />
      </section>
    </main>
  );
}
