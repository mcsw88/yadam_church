# WORKFLOW_GUIDE.md

이 저장소에서 Cursor·AI가 **어떤 문서·command·skill·rule을 언제 쓰는지** 한 페이지 안내다.  
**GStack 단계, Y/N 강제, office-hours 등 세부 워크플로는 `.cursor/rules/gstack-workflow.mdc`를 따른다.** 여기서는 중복 정의하지 않는다.

## 단일 진실 소스

- 제품·디자인 지침: **`AGENTS.md`** — 코드/스타일 변경 전 **`## 필수 절차`** 준수. 절차 생략은 사용자가 **명시적으로** 지시한 경우에만.
- 제안 수집: **`PROPOSAL_INBOX.md`**
- 현재 작업: **`TASK.md`**
- UI 수용 체크: **`UI_ACCEPTANCE.md`**
- 버그·결정: **`BUG_LOG.md`**, **`DECISION_LOG.md`**

## Rule 라우팅 (요약)

| 상황 | rule 파일 (`.cursor/rules/`) |
|------|------------------------------|
| 항상 (저장소 맥락) | `00-workflow.mdc`, `05-skill-router.mdc`, `06-proposal-integration.mdc` |
| GStack 프로세스 | `gstack-workflow.mdc` |
| UI 점검·디버그 | `10-ui-debug.mdc` (필요 시 적용) |
| Vercel·배포 이슈 | `20-deploy-debug.mdc` |
| 레거시 HTML/CSS/JS/`server.js` | `30-legacy-migration.mdc` (명시 요청 시) |

## Command (수동 호출)

| Command | 용도 |
|---------|------|
| `review-ui` | UI 분석·검증 관점 정리 |
| `debug-deploy` | Next/Vercel 중심 배포 디버그 질문 |
| `integrate-proposal` | `PROPOSAL_INBOX` 정리·분류 |
| `plan-feature` | 기능 계획 프롬프트 (GStack은 gstack 규칙에 위임) |
| `review-structure` | 구조 읽기 전용 리뷰 |
| `migrate-legacy` | 레거시는 **명시 허용 후** 체크리스트 |

## Skill (플레이북)

저장소 내: **`.cursor/skills/<이름>/SKILL.md`** 를 우선 연다.  
글로벌 `~/.cursor/skills`는 **존재 확인 시에만** 보조 참조한다.

## Hooks

자동 실행은 연결하지 않는다. 예시만: `.cursor/hooks/README.md`, `examples/`.

## 기본 작업 범위

- 기본: `app/`, `components/`, `lib/`, `public/`
- 루트 레거시: 명시 요청 없이 수정하지 않음
- 배포 판단: **Next.js App Router·Vercel** 우선; `server.js`는 레거시 정적 서버로 간주
