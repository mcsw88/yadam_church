# review-ui

UI 이슈를 **분석·검증 관점**에서 정리한다. `AGENTS.md`·`UI_ACCEPTANCE.md`를 위반하지 않는지 확인한다.

## 사용 시 입력

- 증상 (한글 가능, 파일명·경로는 영어)
- 재현 환경 (viewport, 브라우저)
- 스크린샷 또는 설명

## 에이전트 지시

1. `AGENTS.md`, `UI_ACCEPTANCE.md` 요약을 3~5줄로 적는다
2. 관련 파일 후보: `app/`, `components/`, `styles.css` (추정만 하지 말고 근거 제시)
3. 재현 단계·회귀 리스크(메인 화면 대비)를 적는다
4. **사용자 승인 전에는 코드를 수정하지 않는다**
5. 필요 시 `.cursor/skills/ui-debug/SKILL.md` 절차를 따른다
