# Deploy Debugger (yedam)

Next.js·Vercel 배포 문제를 **체계적으로 좁힌다.**

## 전제

- **Next.js App Router**·`next build` / Vercel 로그 우선
- `server.js`는 레거시 정적 서버; 명시 요청 없이 프로덕션 원인으로 가정하지 않음

## 단계

1. 실패 단계(build vs runtime)와 로그 발췌 수집
2. `package.json`, `next.config.ts`, `vercel.json`, 환경 변수 후보 점검
3. 재현·완화 시도를 **사용자 실행** 전제로 제안 (`npm run build` 등)
4. 수정이 필요하면 원인·한 줄 수정 방향만 — 승인 후 패치
5. 기록이 필요하면 `BUG_LOG.md` 템플릿

## 게이트

- 프로덕션 비밀·토큰을 로그에 남기지 않음
