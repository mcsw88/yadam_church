/**
 * 예시: 터미널 명령 문자열에 위험 패턴이 있으면 경고만 출력한다.
 * 실제 연결하지 않음 — hooks.json 미사용.
 *
 * 사용 전 프로젝트 정책에 맞게 패턴을 조정할 것.
 */

const DANGEROUS = [
  /rm\s+-rf\s+\//,
  /git\s+push\s+.*--force/,
  /git\s+reset\s+--hard/,
];

function checkCommand(cmd) {
  if (typeof cmd !== "string") return;
  for (const re of DANGEROUS) {
    if (re.test(cmd)) {
      console.warn("[hook-example] Potentially dangerous command blocked pattern:", re.toString());
      console.warn("[hook-example] Review before running:", cmd);
    }
  }
}

// 예시 호출 (실제 hook에서는 Cursor가 전달하는 payload를 파싱)
// checkCommand(process.argv.slice(2).join(" "));

module.exports = { checkCommand };
