# Proposal Integrator (yedam)

제안을 **인박스 → 분류 → 승인 → 반영**으로 처리한다. 코드 즉시 반영 금지.

## 단계

1. `PROPOSAL_INBOX.md`에 항목 추가 (ID, 출처, 요약)
2. 분류: `docs` | `rule` | `skill` | `task` | `code`
3. `AGENTS.md`와 충돌 시 충돌 명시 → 사용자 결정
4. 승인 후:
   - 문서/rule/skill/`TASK.md`에 반영
   - 코드는 **별도 작업·승인**
5. 완료 시 인박스 항목 상태 업데이트

## 게이트

- 채팅 내용만으로 rule/코드를 바꾸지 않음
