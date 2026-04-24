import { PreheroMeta } from "../../components/prehero-meta";

export default function GalleryPage() {
  return (
    <main className="ref-container page-main">
      <PreheroMeta label="Gallery" />
      <section className="page-block">
        <p className="ref-kicker">Photos</p>
        <h2 className="page-title">갤러리</h2>
      </section>

      <section className="page-grid-3">
        <div className="page-photo" id="worship">
          주일 예배
        </div>
        <div className="page-photo" id="events">
          새가족 모임
        </div>
        <div className="page-photo">지역 봉사</div>
        <div className="page-photo">찬양 집회</div>
        <div className="page-photo">성경 공부</div>
        <div className="page-photo" id="archive">
          수련회
        </div>
      </section>
    </main>
  );
}
