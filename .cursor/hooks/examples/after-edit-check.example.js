/**
 * 예시: 편집 후 사용자에게 로컬 검증을 상기시키는 로그만 남긴다.
 * 자동으로 lint/build를 실행하지 않음 — hooks.json 미연결.
 */

function remindLocalChecks(context = {}) {
  console.log("[hook-example] Edits may require local verification:");
  console.log("  - npm run build   (or project-specific check)");
  console.log("  - Manual UI: desktop + mobile for header/navigation");
  if (context.files?.length) {
    console.log("  - Touched paths:", context.files.join(", "));
  }
}

module.exports = { remindLocalChecks };
