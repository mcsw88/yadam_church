# debug-deploy

Next.js·Vercel 배포 문제를 **체크리스트**로 정리한다. `server.js`는 기본적으로 배포 기준에 넣지 않는다.

## 사용 시 입력

- 실패 단계 (`next build`, Vercel build, runtime)
- 로그 발췌 (민감 정보 제거)
- branch / 환경 (preview vs production)

## 에이전트 지시

1. Next App Router·`package.json`·`next.config.ts`·`vercel.json` 기준으로 원인 후보를 나열한다
2. 환경 변수·Node 버전·빌드 캐시 여부를 질문한다
3. 루트 `server.js`는 **레거시**로만 언급; 명시 요청 없이 배포 원인으로 끌어오지 않는다
4. **코드 수정은 사용자 승인 후**; 여기서는 진단·다음 액션만
5. `.cursor/skills/deploy-debugger/SKILL.md` 참고
