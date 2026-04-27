# docs/migration/ AGENTS.md

**마이그레이션·정리 계획 문서**용 디렉터리다. 실행 코드가 아니다.

## 단일 진실 소스

- 제품·디자인 지침: 루트 **`AGENTS.md`**
- 레거시 파일 목록·정책: 이 폴더의 기존 `.md`와 루트 **`PROPOSAL_INBOX.md`**·rule `30-legacy-migration.mdc`

## 이 디렉터리에서 할 일

- 레거시 HTML/CSS/JS/`server.js` 변경은 **사용자 명시 허용** 없이 문서만 갱신하지 않는다 (코드는 별도 정책)
- Next로 옮기는 계획을 적을 때 실사용 기준은 항상 `app/`, `components/`, `lib/`, `public/` 쪽이다

## skill/command

- `.cursor/skills/legacy-migration/SKILL.md`
- `.cursor/commands/migrate-legacy.md`
