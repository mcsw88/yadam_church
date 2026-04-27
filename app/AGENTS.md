# app/ AGENTS.md

이 디렉터리는 **Next.js App Router** 페이지·레이아웃이 위치한다.

## 단일 진실 소스

- 디자인·작업 원칙·금지 사항: 루트 **`AGENTS.md`**
- UI 수용 체크: **`UI_ACCEPTANCE.md`**

## 이 디렉터리에서 할 일

- 새 라우트 추가 시 `app/layout.tsx`, `app/page.tsx`, `components/site-header.tsx`와의 **일관성**을 먼저 본다
- 서브 경로(`app/about/...` 등)는 네비게이션·콘텐츠 소스(`lib/` 등)와 맞는지 확인한다

## 범위

- 기본 작업 대상에 포함된다. 레거시 루트 HTML은 참고용이며 실사용 기준이 아니다.
