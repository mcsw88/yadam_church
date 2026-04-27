# UI Debug (yedam)

교회 사이트 UI 이슈를 **재현·범위 한정·보고**한다. 코드 수정은 사용자 승인 후.

## 전제

- 디자인 단일 진실 소스: 루트 `AGENTS.md`
- 수용 체크: `UI_ACCEPTANCE.md`

## 단계

1. **읽기:** `AGENTS.md`, `UI_ACCEPTANCE.md` — 위반 가능성 한 줄 요약
2. **재현:** 단계, viewport, 브라우저, 관련 라우트
3. **범위:** 영향 받는 파일 후보 (`app/`, `components/`, `styles.css`) — 추정이면 라벨
4. **회귀:** 메인(`app/page.tsx`)·헤더·모바일 메뉴 리스크
5. **산출:** 짧은 보고서; 수정안이 있으면 **계획만** (diff 수준)
6. **게이트:** 사용자 승인 없이 패치하지 않음

## 금지

- `AGENTS.md`에 없는 색·폰트 임의 도입 제안 (제안은 `PROPOSAL_INBOX.md` 경유)
