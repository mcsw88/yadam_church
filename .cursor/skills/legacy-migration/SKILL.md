# Legacy Migration (yedam)

루트 레거시 HTML/CSS/JS/`server.js`는 **사용자가 명시적으로 허용한 경우에만** 다룬다.

## 전제

- 실사용 기준: `app/`, `components/`, `AGENTS.md`
- `docs/migration/` 문서와 정합성 확인

## 단계

1. 허용 범위 확인 — 없으면 중단
2. 레거시 파일 ↔ Next 대응 매핑 표 초안
3. 콘텐츠·스타일 차이는 `AGENTS.md` 준수 여부로 검토
4. 삭제/이동은 `DECISION_LOG.md`·사용자 승인
5. 코드 변경은 승인 후 별도 커밋 단위로

## 게이트

- 명시 없이 레거시 파일을 수정·삭제하지 않음
