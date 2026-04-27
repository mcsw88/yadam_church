/**
 * 프로덕션에 최신 빌드가 올라왔는지 확인용.
 * 새로 배포할 때마다 이 숫자를 1 증가시킨 뒤 커밋·푸시하세요.
 * (Vercel에서 NEXT_PUBLIC_DEPLOY_REVISION 을 넣으면 빌드 시 그 값이 우선합니다.)
 */
const FILE_FALLBACK = 1;

export const DEPLOY_REVISION = (() => {
  const fromEnv = process.env.NEXT_PUBLIC_DEPLOY_REVISION;
  if (fromEnv !== undefined && fromEnv !== "") {
    const n = Number(fromEnv);
    if (Number.isFinite(n) && n >= 0) return Math.floor(n);
  }
  return FILE_FALLBACK;
})();
