/**
 * 프로덕션에 최신 빌드가 올라왔는지 확인용.
 * 새로 배포할 때마다 이 숫자를 1 증가시킨 뒤 커밋·푸시하세요.
 *
 * Vercel(또는 로컬)에 NEXT_PUBLIC_DEPLOY_REVISION 이 남아 있으면 예전처럼
 * 파일을 올려도 숫자가 안 바뀐 것처럼 보일 수 있으므로, 소스는 이 상수만 본다.
 * 대시보드에 해당 env 가 있다면 삭제해도 됩니다.
 */
const FILE_FALLBACK = 10;

export const DEPLOY_REVISION = FILE_FALLBACK;
