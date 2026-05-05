-- ============================================================
-- 예담교회 CMS Supabase 스키마
-- 프로젝트: yedam_church
-- 작성일: 2026-05-05
-- 설명: 공지사항(notices), 행사소식(events), 주보(bulletins),
--        갤러리(gallery_items) 테이블 및 RLS, Storage 버킷 정책
--
-- 실행 안내:
--   1. Supabase 대시보드 > SQL Editor에 이 파일 내용을 붙여넣고 실행한다.
--   2. 또는 Supabase CLI: supabase db push 로 적용한다.
--   3. 이미 테이블이 존재하는 경우 CREATE TABLE IF NOT EXISTS로 안전하게 건너뛴다.
--   4. 트리거/RLS 정책은 DROP-before-CREATE 패턴으로 멱등 실행된다.
-- ============================================================


-- ============================================================
-- UUID 확장 활성화
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto";


-- ============================================================
-- notices 테이블
-- ============================================================

CREATE TABLE IF NOT EXISTS notices (
    id              uuid          PRIMARY KEY DEFAULT gen_random_uuid(),
    date            date          NOT NULL,
    title           text          NOT NULL,
    image_url       text          NULL,
    image_path      text          NULL,
    attachment_urls jsonb         NOT NULL DEFAULT '[]'::jsonb,
    content         text          NOT NULL,
    published       boolean       NOT NULL DEFAULT true,
    created_at      timestamptz   NOT NULL DEFAULT now(),
    updated_at      timestamptz   NOT NULL DEFAULT now()
);

-- notices: date 인덱스 (날짜 기준 정렬/필터)
CREATE INDEX IF NOT EXISTS idx_notices_date
    ON notices (date DESC);

-- notices: published 인덱스 (공개 여부 필터)
CREATE INDEX IF NOT EXISTS idx_notices_published
    ON notices (published);


-- ============================================================
-- events 테이블
-- ============================================================

CREATE TABLE IF NOT EXISTS events (
    id              uuid          PRIMARY KEY DEFAULT gen_random_uuid(),
    date            date          NOT NULL,
    title           text          NOT NULL,
    image_url       text          NULL,
    image_path      text          NULL,
    attachment_urls jsonb         NOT NULL DEFAULT '[]'::jsonb,
    content         text          NOT NULL,
    published       boolean       NOT NULL DEFAULT true,
    created_at      timestamptz   NOT NULL DEFAULT now(),
    updated_at      timestamptz   NOT NULL DEFAULT now()
);

-- events: date 인덱스 (날짜 기준 정렬/필터)
CREATE INDEX IF NOT EXISTS idx_events_date
    ON events (date DESC);

-- events: published 인덱스 (공개 여부 필터)
CREATE INDEX IF NOT EXISTS idx_events_published
    ON events (published);


-- ============================================================
-- bulletins 테이블 (주보)
-- 매주 주일 예배 주보 정보를 저장한다.
-- ============================================================

CREATE TABLE IF NOT EXISTS bulletins (
    id                          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
    date                        date        NOT NULL,
    title                       text        NOT NULL,    -- 예: "2026년 5월 5일 주일예배 주보"
    hymn_1                      text,                   -- 찬송가 1
    hymn_2                      text,                   -- 찬송가 2
    representative_prayer_name  text,                   -- 대표기도 성함
    sermon_title                text,                   -- 설교제목
    benediction_name            text,                   -- 축도자 성함
    published                   boolean     NOT NULL DEFAULT true,
    created_at                  timestamptz NOT NULL DEFAULT now(),
    updated_at                  timestamptz NOT NULL DEFAULT now()
);

-- bulletins 인덱스
CREATE INDEX IF NOT EXISTS idx_bulletins_date
    ON bulletins (date DESC);

CREATE INDEX IF NOT EXISTS idx_bulletins_published
    ON bulletins (published);


-- ============================================================
-- gallery_items 테이블 (갤러리)
-- 갤러리 이미지 1장당 행 1개 구조다.
-- 여러 이미지를 한 번에 업로드하는 경우 동일한 batch_id를 부여한다.
-- 한 번에 최대 5장 제한은 프론트엔드 로직에서 처리하며 DB 제약은 없다.
-- batch_id가 null인 경우는 단독 업로드를 의미한다.
-- ============================================================

CREATE TABLE IF NOT EXISTS gallery_items (
    id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
    date        date        NOT NULL,
    title       text        NOT NULL,
    image_url   text        NOT NULL,       -- Supabase Storage public URL, 갤러리는 이미지 필수
    image_path  text,                       -- Supabase Storage 내부 경로 (예: gallery/filename.jpg)
    comment     text,
    batch_id    uuid,                       -- 여러 이미지 한 번에 업로드 시 같은 batch_id 부여, 단독 업로드 시 null 허용
    sort_order  integer     NOT NULL DEFAULT 0,  -- 같은 batch_id 내 정렬 순서
    published   boolean     NOT NULL DEFAULT true,
    created_at  timestamptz NOT NULL DEFAULT now(),
    updated_at  timestamptz NOT NULL DEFAULT now()
);

-- gallery_items 인덱스
CREATE INDEX IF NOT EXISTS idx_gallery_items_date
    ON gallery_items (date DESC);

CREATE INDEX IF NOT EXISTS idx_gallery_items_published
    ON gallery_items (published);

CREATE INDEX IF NOT EXISTS idx_gallery_items_batch_id
    ON gallery_items (batch_id)
    WHERE batch_id IS NOT NULL;


-- ============================================================
-- SECTION 1: updated_at 자동 갱신 트리거 함수 및 트리거 적용
-- ============================================================

CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- notices 테이블 트리거
DROP TRIGGER IF EXISTS set_updated_at_notices ON notices;
CREATE TRIGGER set_updated_at_notices
  BEFORE UPDATE ON notices
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();

-- events 테이블 트리거
DROP TRIGGER IF EXISTS set_updated_at_events ON events;
CREATE TRIGGER set_updated_at_events
  BEFORE UPDATE ON events
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();

-- bulletins 테이블 트리거
DROP TRIGGER IF EXISTS set_updated_at_bulletins ON bulletins;
CREATE TRIGGER set_updated_at_bulletins
  BEFORE UPDATE ON bulletins
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();

-- gallery_items 테이블 트리거
DROP TRIGGER IF EXISTS set_updated_at_gallery_items ON gallery_items;
CREATE TRIGGER set_updated_at_gallery_items
  BEFORE UPDATE ON gallery_items
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();


-- ============================================================
-- SECTION 2: Row Level Security (RLS) 정책
-- ============================================================

-- ------------------------------------------------------------
-- 2-1. notices 테이블
-- ------------------------------------------------------------

ALTER TABLE notices ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read of published notices" ON notices;
CREATE POLICY "Allow public read of published notices"
  ON notices
  FOR SELECT
  TO anon
  USING (published = true);

DROP POLICY IF EXISTS "Allow authenticated read all notices" ON notices;
CREATE POLICY "Allow authenticated read all notices"
  ON notices
  FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "Allow authenticated insert on notices" ON notices;
CREATE POLICY "Allow authenticated insert on notices"
  ON notices
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Allow authenticated update on notices" ON notices;
CREATE POLICY "Allow authenticated update on notices"
  ON notices
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Allow authenticated delete on notices" ON notices;
CREATE POLICY "Allow authenticated delete on notices"
  ON notices
  FOR DELETE
  TO authenticated
  USING (true);

-- ------------------------------------------------------------
-- 2-2. events 테이블
-- ------------------------------------------------------------

ALTER TABLE events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read of published events" ON events;
CREATE POLICY "Allow public read of published events"
  ON events
  FOR SELECT
  TO anon
  USING (published = true);

DROP POLICY IF EXISTS "Allow authenticated read all events" ON events;
CREATE POLICY "Allow authenticated read all events"
  ON events
  FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "Allow authenticated insert on events" ON events;
CREATE POLICY "Allow authenticated insert on events"
  ON events
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Allow authenticated update on events" ON events;
CREATE POLICY "Allow authenticated update on events"
  ON events
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Allow authenticated delete on events" ON events;
CREATE POLICY "Allow authenticated delete on events"
  ON events
  FOR DELETE
  TO authenticated
  USING (true);

-- ------------------------------------------------------------
-- 2-3. bulletins 테이블
-- ------------------------------------------------------------

ALTER TABLE bulletins ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read of published bulletins" ON bulletins;
CREATE POLICY "Allow public read of published bulletins"
  ON bulletins
  FOR SELECT
  TO anon
  USING (published = true);

DROP POLICY IF EXISTS "Allow authenticated read all bulletins" ON bulletins;
CREATE POLICY "Allow authenticated read all bulletins"
  ON bulletins
  FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "Allow authenticated insert on bulletins" ON bulletins;
CREATE POLICY "Allow authenticated insert on bulletins"
  ON bulletins
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Allow authenticated update on bulletins" ON bulletins;
CREATE POLICY "Allow authenticated update on bulletins"
  ON bulletins
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Allow authenticated delete on bulletins" ON bulletins;
CREATE POLICY "Allow authenticated delete on bulletins"
  ON bulletins
  FOR DELETE
  TO authenticated
  USING (true);

-- ------------------------------------------------------------
-- 2-4. gallery_items 테이블
-- ------------------------------------------------------------

ALTER TABLE gallery_items ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read of published gallery_items" ON gallery_items;
CREATE POLICY "Allow public read of published gallery_items"
  ON gallery_items
  FOR SELECT
  TO anon
  USING (published = true);

DROP POLICY IF EXISTS "Allow authenticated read all gallery_items" ON gallery_items;
CREATE POLICY "Allow authenticated read all gallery_items"
  ON gallery_items
  FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "Allow authenticated insert on gallery_items" ON gallery_items;
CREATE POLICY "Allow authenticated insert on gallery_items"
  ON gallery_items
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Allow authenticated update on gallery_items" ON gallery_items;
CREATE POLICY "Allow authenticated update on gallery_items"
  ON gallery_items
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Allow authenticated delete on gallery_items" ON gallery_items;
CREATE POLICY "Allow authenticated delete on gallery_items"
  ON gallery_items
  FOR DELETE
  TO authenticated
  USING (true);


-- ============================================================
-- SECTION 3: Supabase Storage 버킷 및 정책
--
-- 스토리지 경로 규칙 (경로 prefix 기준):
--   공지사항 이미지:      church-cms/notices/images/
--   공지사항 첨부파일:    church-cms/notices/attachments/
--   행사소식 이미지:      church-cms/events/images/
--   행사소식 첨부파일:    church-cms/events/attachments/
--   갤러리 이미지:        church-cms/gallery/
--
-- 버킷 public = true이므로 storage.objects의 공개 URL로 직접 접근 가능:
--   https://<project_ref>.supabase.co/storage/v1/object/public/church-cms/<path>
-- ============================================================

-- ------------------------------------------------------------
-- 3-1. church-cms 버킷 생성 (이미 존재하면 무시)
-- ------------------------------------------------------------

INSERT INTO storage.buckets (id, name, public)
VALUES ('church-cms', 'church-cms', true)
ON CONFLICT (id) DO NOTHING;

-- ------------------------------------------------------------
-- 3-2. Storage 공개 읽기 정책
-- ------------------------------------------------------------

DROP POLICY IF EXISTS "Allow public read on church-cms" ON storage.objects;
CREATE POLICY "Allow public read on church-cms"
  ON storage.objects
  FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'church-cms');

-- ------------------------------------------------------------
-- 3-3. Storage 업로드(INSERT) 정책 - authenticated 전용
-- ------------------------------------------------------------

DROP POLICY IF EXISTS "Allow authenticated upload on church-cms" ON storage.objects;
CREATE POLICY "Allow authenticated upload on church-cms"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'church-cms');

-- ------------------------------------------------------------
-- 3-4. Storage 수정(UPDATE) 정책 - authenticated 전용
-- ------------------------------------------------------------

DROP POLICY IF EXISTS "Allow authenticated update on church-cms" ON storage.objects;
CREATE POLICY "Allow authenticated update on church-cms"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (bucket_id = 'church-cms')
  WITH CHECK (bucket_id = 'church-cms');

-- ------------------------------------------------------------
-- 3-5. Storage 삭제(DELETE) 정책 - authenticated 전용
-- ------------------------------------------------------------

DROP POLICY IF EXISTS "Allow authenticated delete on church-cms" ON storage.objects;
CREATE POLICY "Allow authenticated delete on church-cms"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'church-cms');
