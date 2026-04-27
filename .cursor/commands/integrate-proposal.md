# integrate-proposal

들어온 제안을 **코드에 바로 넣지 않고** `PROPOSAL_INBOX.md`에 정리·분류한다.

## 사용 시 입력

- 제안 원문 또는 링크
- 출처

## 에이전트 지시

1. `PROPOSAL_INBOX.md`에 새 항목 초안을 제시한다 (ID, 요약, 분류 후보)
2. 반영 위치: `docs` | `rule` | `skill` | `task` | `code` 중 어디가 맞는지 제안한다
3. `AGENTS.md`와 충돌하면 **충돌을 명시**하고 사용자 결정을 요청한다
4. 승인 전에는 rule/skill/코드를 바꾸지 않는다 (이 세션 목표가 문서 반영이면 사용자가 승인한 뒤에만)
5. `.cursor/skills/proposal-integrator/SKILL.md` 참고
