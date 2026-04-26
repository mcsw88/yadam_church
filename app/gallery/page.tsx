export default function GalleryPage() {
  return (
    <main className="ref-container page-main">
      <section className="page-block page-block--pagehead">
        <p className="ref-kicker">갤러리</p>
        <h2 className="page-title">갤러리</h2>
      </section>
      <section className="page-block page-block--intro">
        <p className="page-desc">
          예배와 교제, 섬김의 순간을 사진으로 남기기도 합니다. 촬영과 공개는 교회 안내와 동의를 따르며, 기록은
          그에 맞춰 차례로 정리합니다.
        </p>
      </section>

      <section className="page-block" aria-labelledby="gallery-record-heading">
        <h2 className="page-subtitle" id="gallery-record-heading">
          공동체의 기록
        </h2>
        <div className="page-prose-paragraphs">
          <p className="page-desc">
            이곳은 모아 두는 사진첩이기보다, 함께한 시간을 조용히 돌아볼 수 있는 자리로 두고자 합니다. 얼굴이
            드러나는 이미지는 공개 범위와 동의를 우선합니다.
          </p>
          <p className="page-desc">
            아래 카드는 주제만 구분해 둔 것입니다. 예배와 교제의 흐름을 해치지 않는 범위에서, 안내에 따라 나눌 수
            있습니다.
          </p>
        </div>
      </section>

      <section className="page-grid-3">
        <div className="page-photo page-photo--muted" id="worship" role="img" aria-label="예배의 자리">
          예배의 자리
        </div>
        <div className="page-photo page-photo--muted" id="events" role="img" aria-label="교제와 환영">
          교제와 환영
        </div>
        <div className="page-photo page-photo--muted" role="img" aria-label="섬김을 나눈 기록">
          섬김을 나눈 기록
        </div>
        <div className="page-photo page-photo--muted" role="img" aria-label="찬양과 기도">
          찬양과 기도
        </div>
        <div className="page-photo page-photo--muted" role="img" aria-label="말씀을 나누며">
          말씀을 나누며
        </div>
        <div className="page-photo page-photo--muted" id="archive" role="img" aria-label="함께한 모임">
          함께한 모임
        </div>
      </section>
    </main>
  );
}
