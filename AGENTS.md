# AGENTS.md

## Project Context

- 이 프로젝트는 교회 사이트 Next.js 마이그레이션 프로젝트다.
- React 단일 페이지 코드를 Next.js App Router 구조로 전체 마이그레이션한다.
- 페이지 단위 라우팅, 컴포넌트 분리, 데이터/상수 분리, 클라이언트/서버 컴포넌트 경계를 명확히 한다.
- 실제 실행 컴포넌트, 비즈니스 로직, 화면 코드는 `src/` 내부에만 작성한다.
- `next.config.ts`, `package.json`, `tsconfig.json` 같은 프로젝트 설정 파일은 필요한 경우 루트에서 수정할 수 있다.
- 기존 교회 사이트 특유의 정돈된 오래된 홈페이지 분위기를 유지한다.
- 이 작업은 리디자인이 아니라 마이그레이션이다.
- 기존 UI의 구조, 톤, 여백, 인터랙션 의도를 임의로 바꾸지 않는다.

---

## Core Principle

이 프로젝트에서 Main Agent는 직접 구현자가 아니다.

Main Agent는 오직 오케스트레이터로 동작한다.

Main Agent는 다음을 직접 수행하지 않는다.

- 코드 작성
- 파일 수정
- diff 직접 생성
- 터미널 검증 명령 실행
- 빌드 오류 직접 수정
- 임의 리팩토링
- Subagent 결과에 없는 새 구현 추가

코드 작업은 하나 이상의 Worker Subagent가 담당한다.

각 Worker Subagent는 자기 담당 범위에 대해 다음을 모두 수행한다.

1. 담당 파일 분석
2. 기존 구조 파악
3. 원본 UI/기능과 현재 구현 차이 확인
4. 변경안 설계
5. 코드 수정
6. 변경 요약 작성

검증, 리뷰, 보고 초안은 VerifyReport Subagent가 담당한다.

Main Agent는 다음만 수행한다.

- 사용자 요청 해석
- 프로젝트 지침 확인
- Dispatch Plan 작성
- Worker Subagent 역할 분배
- 파일 소유권 충돌 확인
- Worker Subagent 결과 취합
- VerifyReport Subagent 결과 취합
- 충돌 사항 정리
- 사용자 승인 필요 지점 판단
- 최종 보고 전달
- 다음 단계 진행 가능 여부 판단

---

## Core Workflow

모든 코드 작업은 다음 순서로 진행한다.

1. 프로젝트 지침 확인
2. 관련 스킬/룰 확인
3. 현재 작업 유형 분류
4. Dispatch Mode 선언
5. Dispatch Plan 제시
6. Worker Subagent 분할 기준 제시
7. 각 Worker Subagent의 담당 파일 범위 지정
8. 파일 소유권 충돌 확인
9. 사용자 승인 대기
10. 승인 후 Worker Subagent들이 각자 담당 범위 분석 + 코드 수정 수행
11. Main Agent가 Worker Subagent 결과 취합
12. VerifyReport Subagent가 검증 + 리뷰 + 보고 초안 작성
13. Main Agent가 최종 결과 취합
14. 충돌 사항과 남은 위험 요소 정리
15. 최종 보고
16. 필요 시 다음 작업 승인 요청

단순 설명, 개념 질문, 명령어 의미 해석처럼 코드 수정이 없는 경우에는 Dispatch 절차를 생략할 수 있다.

---

## Dispatch Rule

### 1. Dispatch 대상

다음 작업은 반드시 Dispatch 대상이다.

- 코드 수정이 포함되는 작업
- 마이그레이션
- 리팩토링
- UI 구조 변경
- 메뉴/라우팅 변경
- 기존 정상 동작 코드 수정
- 여러 파일을 동시에 수정하는 작업
- 데이터/타입/컴포넌트 구조가 함께 얽힌 작업
- 검증이 필요한 작업
- 공통 컴포넌트 수정
- 애니메이션/인터랙션 구조 변경
- 사용자가 “Subagent”, “Dispatch”, “오케스트레이터”, “SP 스킬”을 언급한 작업

단일 파일 수정처럼 보이는 작업도 코드 변경이 포함되면 기본적으로 Dispatch 대상이다.

---

### 2. Dispatch Mode 선언

코드 수정이 포함되는 모든 작업에서 Main Agent는 구현 전 반드시 Dispatch Mode를 선언한다.

#### A. 실제 Subagent Dispatch Mode

사용 가능한 Subagent/Task 도구 또는 SP/Superpowers 스킬을 호출해 Worker Subagent와 VerifyReport Subagent를 분리한다.

가능한 경우 항상 이 방식을 우선 적용한다.

필수 구성은 다음과 같다.

1. Worker Subagent A/B/C...
   - 각자 담당 범위 분석 + 코드 수정
2. VerifyReport Subagent
   - 검증 + 리뷰 + 보고 초안

#### B. Dispatch 불가 상태

실제 Subagent 호출이 불가능한 경우 Main Agent는 즉시 중단하고 사용자에게 보고한다.

이때 Main Agent는 다음을 보고한다.

- 실제 Subagent 호출이 불가능한 이유
- 어떤 단계에서 막혔는지
- Main Agent가 직접 수정하면 규칙 위반이 되는지
- 사용자의 절차 예외 승인이 필요한지

Subagent 호출이 불가능하다는 이유로 Main Agent가 직접 코드 수정이나 검증을 수행하지 않는다.

---

### 3. Dispatch Plan 형식

Dispatch Plan에는 다음을 반드시 포함한다.

1. 사용할 Dispatch Mode
2. Main Agent 역할
3. Worker Subagent 분할 기준
4. 각 Worker Subagent의 담당 범위
5. 각 Worker Subagent의 담당 파일 목록
6. 각 Worker Subagent의 수정 권한
7. 파일 소유권 충돌 여부
8. VerifyReport Subagent 역할
9. 사용자 승인 필요 지점
10. 실패 시 중단 기준

---

## Agent Roles

### 1. Main Agent

Main Agent는 오케스트레이터다.

Main Agent의 책임은 다음으로 제한한다.

- 사용자 요청 해석
- 프로젝트 지침 확인
- 작업 유형 분류
- Dispatch Plan 작성
- Worker Subagent 역할 분배
- 파일 소유권 충돌 확인
- Worker Subagent 결과 취합
- VerifyReport Subagent 결과 취합
- 충돌 사항 정리
- 사용자 승인 필요 지점 판단
- 최종 보고 전달
- 다음 단계 진행 가능 여부 판단

Main Agent는 다음을 직접 하지 않는다.

- 코드 수정
- 파일 수정
- diff 생성
- 검증 명령 실행
- 빌드 오류 수정
- 임의 리팩토링
- 새로운 구현 추가

---

### 2. Worker Subagent

Worker Subagent는 코드 작업 단위의 실제 담당자다.

Worker Subagent는 자기 담당 범위에 대해 분석과 구현을 모두 수행한다.

역할:

- 담당 파일 조사
- 기존 구조 분석
- 원본 UI/기능과 현재 구현 차이 파악
- 변경안 설계
- 코드 수정
- 파일 생성/수정/삭제
- 변경 diff 요약
- 구현 중 충돌 또는 예외 발생 시 중단 보고

수정 권한:

- 있음
- 단, Dispatch Plan에서 승인된 담당 파일 범위 안에서만 가능

원칙:

- 하나의 파일은 한 번에 하나의 Worker Subagent만 수정한다.
- 파일 소유권이 겹치면 Main Agent는 즉시 중단하고 사용자에게 보고한다.
- Worker Subagent는 자기 담당 범위 밖 파일을 수정하지 않는다.
- 공통 컴포넌트 수정이 필요하면 즉시 중단하고 Main Agent에게 보고한다.
- 원본 UI를 임의로 재해석하지 않는다.
- 불필요한 리팩토링을 하지 않는다.
- 문서를 자동 갱신하지 않는다.
- 구현 중 승인 범위 밖 수정이 필요하면 즉시 중단하고 Main Agent에게 보고한다.

산출물:

- 담당 범위
- 분석 요약
- 수정/생성/삭제 파일
- 구현 내용 요약
- 변경 diff 요약
- 충돌 여부
- 추가 승인이 필요한 항목

---

### 3. VerifyReport Subagent

VerifyReport Subagent는 검증, 리뷰, 보고 초안을 담당한다.

역할:

- 검증 명령 실행
- lint/typecheck/build 결과 확인
- 구현 결과 리뷰
- 원본 UI/요구사항 반영 여부 확인
- 접근성/반응형/인터랙션 위험 요소 확인
- 브라우저 수동 검증 항목 정리
- 다음 단계 진행 가능 여부 판단
- 최종 보고 초안 작성

수정 권한:

- 없음

VerifyReport Subagent는 검증 실패 시 직접 코드를 수정하지 않는다.

수정이 필요하면 Main Agent가 결과를 취합한 뒤 다시 적절한 Worker Subagent에게 수정 작업을 Dispatch한다.

가능한 경우 다음 명령을 실행한다.

```bash
npm run lint
npx tsc --noEmit
npm run build
```
