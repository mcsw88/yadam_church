# 마이그레이션·작업 상태 (Handoff)

Next.js(App Router) 교회 사이트 마이그레이션 세션 인계용. **코드가 아니라 진행 상태**만 기록한다.

## 진행 한 줄 요약

| 항목                        | 내용                                                                      |
| --------------------------- | ------------------------------------------------------------------------- |
| **화면·페이지 롤아웃 기준** | **1~5단계 구간까지 완료**(About·홈·공통 레이아웃 등) **`/ministries`(6단계) 롤아웃 반영 완료** |
| **플랜 표의 단계 완료**     | **1~6단계: 완료** / **7·8단계: 큰 구조 완료 · polish 남음** / **9단계: 보류(방향 전환)** / **10단계: 미진행** (아래 표 `상태` 열 참고) |
| **다음 플랜 단계**          | **7·8단계 polish**, **9단계 Contact 오버레이 방향**, **10단계 SEO 등** 순으로 후속 정리 |
| **비고**                    | 아래 「**완료 기준 vs 실제 코드**」 참고. Header·전역 UX 등은 횡단 보강. **7·8단계는 Exit Gate를 ‘완료’로 닫지 않았다** — 큰 구조만 반영됨.  |

**완료 기준 vs 실제 코드**

- **기능·구현은 단계 번호와 1:1로 정렬되지 않을 수 있다.** 예: 뒷단계(News/Gallery 등)에서 쓰는 라우트·컴포넌트·일부 동작이 먼저 들어가 있거나, 공용 레이어(3단계) 수정이 여러 화면에 동시에 영향을 줄 수 있다.
- 표의 **완료**는 “**그 단계의 목표·Exit Gate를 공식적으로 닫았다**”는 기준이고, **코드베이스 전체가 앞 단계만 포함하는 것은 아니다.**

**규칙의 상위 문서:** 실행 워크플로·마이그레이션 안전·모션 구조는 항상 저장소 루트 **`AGENTS.md`**를 따른다.

---

## 완료된 단계 (플랜 대비)

- **1~6단계: 완료** (플랜 표 `상태` + 위 「화면·페이지 롤아웃 기준」과 정합)
- **7단계 News · 8단계 Gallery: 큰 구조·기능 위주로 반영됨. Exit Gate 기준 ‘완료’는 아니다.** 후속 polish는 아래 「**7단계 News — 현재 인정 범위**」「**8단계 Gallery — 현재 인정 범위**」 참고.
- **9단계 Contact: 기존 `/contact` 독립 페이지 구현은 보류.** Footer 또는 Header의 **문의하기** → **문의하기 오버레이 패널** 방향으로 전환 예정(후속).
- **10단계 SEO / 에러 / 사이트맵: 미진행.** 후속 작업으로 유지.

### 7단계 News — 현재 인정 범위 (큰 구조 완료, polish 남음)

- **기능과 큰 구조**는 이 문서 기준 **진행 완료로 본다** (`/news`, 탭·Load More·카드·SlideOver 연동·날짜 처리 등).
- **후속 polish**(아직 끝내지 않은 항목):
  - 히어로 영역 사이즈 조정
  - 왼쪽 섹션 텍스트 위치·폰트 크기 조정
  - 왼쪽 이미지 제거
  - 오른쪽 패널 사이즈 조정
  - 패널 텍스트 크기 조정
  - 온라인 주보 패널 포맷 수정

### 8단계 Gallery — 현재 인정 범위 (큰 구조 완료, polish 남음)

- **`/gallery` 페이지**는 **큰 구조 기준**으로 이 문서에서 **진행 완료로 본다** (연도 필터·이미지 리듬·상세 등 기본 골격).
- **후속 polish**(아직 끝내지 않은 항목):
  - 갤러리 이미지 배치 **2열**로 보정
  - 이미지 클릭 시 **사이드 패널이 아닌 전체 오버레이 / 전체 패널** 방식으로 수정
  - **현재 Gallery 상세 패널**은 후속 수정 필요

### 6단계 Ministries 완료 내용 (화면 롤아웃·종료 게이트 기준)

아래 항목은 **이 단계 종료 인정 범위**로 문서 반영하였다.(코드 증명·파일 존재로 단계 번호를 1:1 대응하지 않음.)

- `/ministries` 페이지 구현 완료
- 상단 **사역소개** 히어로 좌측 정렬 복원
- 주일사역 **full-width 이미지** 섹션 적용
- 주일사역 **다크 섹션** 구현
- 주일사역 **CTA 카드 스택** 구현
- 선교·봉사 **full-width 이미지** 섹션 적용
- 선교·봉사 **라이트 섹션** 구현
- 선교·봉사 **CTA 카드 스택** 구현
- **`MinistrySectionHero`** 이미지 높이·비율 튜닝
- **`MinistryCtaCard`** 카드 라운딩·높이·세로선·hover 인터랙션 조정
- **`MinistryCardDeck`** 카드 간격 조정
- **`SectionHeading`** 줄바꿈 표시를 위한 **`whitespace-pre-line`** 반영
- **`SlideOver`** z-index·portal 처리로 헤더 메뉴 겹침 문제 해결
- **`CustomCursor`** z-index 조정으로 SlideOver 위에서도 커서 표시

---

## 전체 마이그레이션 10단계 플랜 & 완료 상태

경로는 저장소 기준 **`src/`** 아래 App Router 구조로 적는다.

| #      | 단계명                                 | 목표 / 주요 산출물                                                                                                                                                                                                                                                                                                      | 종료 게이트·검증                                                                         | 상태                                                              |
| ------ | -------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| **1**  | **Tokens & Types & Constants & Hooks** | 인프라만. `src/motion/{easings,transitions,variants,viewport,durations}.ts`, `src/hooks/*`(SSR safe), `src/constants/{routes,menu,anchorMap,news,newsMeta,gallery,ui}.ts` 등, `src/types/*`, `src/data/*`, `src/lib/{fetchWithBackoff,parseDate}.ts`, `src/app/layout.tsx`(ko·폰트), `src/app/globals.css`(@theme dado) | `build` / `tsc` / `lint` 통과, `parseDate` 등 1회 확인                                   | **완료**                                                          |
| **2**  | **Layout & A11y 베이스**               | `src/components/layout/{Header,Footer,GrainOverlay,CustomCursor}.tsx`, `OverlayMenu`, `PageTransition`, 포커스/스크롤 락· reduced motion                                                                                                                                                                                | 6개 라우트 200, Tab·ESC, 모달 시 배경 스크롤, `prefers-reduced-motion`                   | **완료**                                                          |
| **3**  | **UI 프리미티브 & Interaction**        | `FadeIn`, `ParallaxImage`, `PageContainer`, `SectionHeading`, `EmptyState`, `LoadingDots`, `ErrorMessage`, `SlideOver`(children), `TabSwitch`, `FilterGroup`, `LoadMoreButton`                                                                                                                                          | 임시/실페이지에서 마운트·`SlideOver`는 children만                                        | **완료**                                                          |
| **4**  | **Home + 첫 service**                  | `src/app/page.tsx`, `src/components/sections/home/*`, `PrayerAssistant`, `src/services/prayerService.ts`, `src/app/api/prayer/route.ts`(Gemini 키 서버 전용)                                                                                                                                                            | `/` 정상, 기도 제출, 키 미설정 시 안내, 톤 유지. 배포 환경에 API 키                      | **완료**                                                          |
| **5**  | **About + ANCHOR_MAP**                 | `src/app/about/page.tsx`, `AboutGreeting` / `AboutVision` / `AboutLeaders`, **`src/constants/anchorMap.ts`** 단일 출처(헤더·메뉴·섹션 id)                                                                                                                                                                               | `/about#greeting` 등 영문 앵커, 서브메뉴 정확 스크롤                                     | **완료**                                                          |
| **6**  | **Ministries + Cards**                 | `src/app/ministries/page.tsx`, `MinistriesSunday` / `MinistriesMission`, `MinistrySectionHero`, `MinistryCardDeck` / `MinistryCtaCard`, `slide-over-bodies/DefaultBody`, `SlideOver` 연동 등                                                                                                                                                                                                  | 카드 hover/click → SlideOver, 카드 간 Tab 포커스, 풀폭 이미지·섹션 구조 원본 롤아웃 방향 | **완료**                                                          |
| **7**  | **News + searchParams**                | `src/app/news/page.tsx`, `NewsTabsContainer`, `NewsList`, `EventCard`, `BulletinCard`, `BulletinBody`, `parseDate`                                                                                                                                                                                                      | `?tab=notices/events/bulletins`, More 카운터, bulletins 월 라벨(예: Nov→Dec 이슈 해결)   | **큰 구조 완료 · polish 남음** (Exit Gate 미닫힘)                |
| **8**  | **Gallery**                            | 연도 필터·masonry·비율 타입 정규화. `GallerySection`, `GalleryCard`, `GalleryBody`, `galleryRepository` 등                                                                                                                                                                                                               | `?year=`, 터치 `inView`, `GalleryAspect` 등                                              | **큰 구조 완료 · polish 남음** (Exit Gate 미닫힘)                |
| **9**  | **Contact + 두 번째 service**          | 기존 **`/contact` 독립 페이지 구현은 보류**. 방향: **Footer 또는 Header의 문의하기** → **문의하기 오버레이 패널**(후속). (참고: `ContactForm`, `contactService` 등은 오버레이 내에서 이어갈 수 있음)                                                                                                                                     | 오버레이 UX·제출 흐름·백엔드 합의                                                         | **보류** — **방향 전환(오버레이), 후속 작업**                     |
| **10** | **SEO / 에러 / 빈 상태 / 사이트맵**    | 페이지별 `generateMetadata`, `sitemap.ts`, `robots.ts`, `not-found` / `error` / `loading`, Schema.org, A11y 대비                                                                                                                                                                                                        | Lighthouse SEO·A11y, 404/에러 톤, **WCAG AA**. **`dado-bg` 위 회색 단계 설계 결정 대기** | **미진행** — 후속 작업                                           |

---

## 현재 상태 (플랜 횡단 보강)

### Header·테마

- **Header theme route recalculation** — `usePathname`, `hashchange` / `popstate`, rAF 이중 `compute()`. 스크롤·리사이즈 유지.

### 전환·메뉴·클릭

- **메뉴 → PageTransition 순서** — `setShowOverlay(true)` 우선, `onMenuClose`는 페이드인 후·`flushMenuClose`로 정리.
- **Header 클릭 차단 완화** — 전환 overlay exit `pointerEvents: 'none'`, OverlayMenu variant `pointerEvents`, HomeHero z 조정.
- **OverlayMenu / PageTransition** — 메뉴 위 전환·닫힘 검증됨.

### 페이지·글로벌 UX

- **Footer** — SITE MAP 1열 세로 목록.
- **전역 텍스트 드래그** — `body` `user-select: none` + 폼·`.allow-text-select` / `.selectable-text` 예외.

### z-index (`globals.css`)

- 기본 순서(참고): 헤더 **20** → 커스터 커서 **50** → 오버레이 **100** → 메뉴 **120** → 페이지 전환 **200**(실제 적용 순·수치는 `globals.css`·컴포넌트 기준 확인).
- **6단계 Ministries 작업 과정에서** `SlideOver`·`CustomCursor` 등 레이어링이 위 목적에 맞게 조정됨.(겹침 이슈 대응 포함.)

---

## 남은 작업 (피처 단계)

1. **7단계 News — polish** — 위 「**7단계 News — 현재 인정 범위**」 후속 항목.
2. **8단계 Gallery — polish** — 위 「**8단계 Gallery — 현재 인정 범위**」 후속 항목.
3. **9단계 Contact** — Header/Footer **문의하기** 버튼 → **문의하기 오버레이 패널**(후속). 기존 `/contact` 단독 페이지 구현은 보류.
4. **10단계 SEO·에러·사이트맵** — **아직 미진행.** 후속 작업으로 유지.

---

## 다음 작업

- **7·8단계 polish**를 우선 정리한 뒤, **9단계 Contact 오버레이 방향**, **10단계 SEO** 순으로 진행 가능. 세부는 위 표·`AGENTS.md`·「**후속 정리 / Polish / 확장 작업**」 참고.

---

## 후속 정리 / Polish / 확장 작업

문서상 **완료로 닫지 않은** 범위와, 횡단 UX·운영 확장 아이디어를 한곳에 모은다. 구현은 별도 세션에서 `AGENTS.md`에 따라 Worker에 위임한다.

### 공통 UI

- 헤더 타이틀과 메뉴를 큰 화면에서 더 양쪽 끝으로 이동
- 헤더 타이틀과 메뉴 크기 확대
- 큰 화면에서 헤더가 중앙에 덩그러니 고정되는 문제 수정
- 푸터 사이트맵과 좌우 콘텐츠 간 거리 균등 조정
- 마우스 커서가 실제 움직임보다 밀리는 느낌 원인 파악 및 수정

### 페이지별 Polish

- 사역자 이미지 인터랙션 추가
- News 오른쪽 패널 polish
- Gallery 전체 오버레이 상세 방식 보정

### 문의·관리

- Header 또는 Footer에 **문의하기** 버튼 추가
- 문의하기 버튼 클릭 시 **Contact Overlay** 패널 추가
- 관리자 페이지 기본 골격 구현
- 서버 연결
- DB 추가
- 파일 업로드/다운로드 구조 설계

### 리팩토링 후보

- 공통 카드 컴포넌트 후보 정리
- 공통 오버레이/패널 컴포넌트 후보 정리
- 공통 SectionIntro / LoadMoreButton / Tabs / ImageCard 추출 여부 검토

---

## 핵심 파일 참조 (최근 맥락)

| 영역              | 경로                                                        |
| ----------------- | ----------------------------------------------------------- |
| 헤더 테마         | `src/hooks/useHeaderTheme.ts`                               |
| 네비 전환         | `src/components/providers/NavigationTransitionProvider.tsx` |
| 오버레이 메뉴     | `src/components/interaction/OverlayMenu.tsx`                |
| 홈 히어로         | `src/components/sections/home/HomeHero.tsx`                 |
| 페이지 전환(펄스) | `src/components/motion/PageTransition.tsx`                  |
| 전역 스타일       | `src/app/globals.css`                                       |
| 푸터              | `src/components/layout/Footer.tsx`                          |
| 모션 상수         | `src/motion/durations.ts` 등                                |

---

## 중요한 규칙

- **Main Agent 직접 수정 금지** / **Sub Agent만 수정 수행** (상세는 `AGENTS.md`).
- **PageTransition·OverlayMenu·Header 구조** 대규모 변경 금지.
- **`_legacy`** — 불필요 리팩터·직접 수정 금지(레거시는 참고만).
- **`useHeaderTheme`** — 이미 안정화된 상태이므로 불필요한 리팩터 금지. 단, Header theme 재발 버그가 명확히 확인된 경우에만 최소 수정.

---

## 검증·환경

- **`npm run lint`**, **`npx tsc --noEmit`**, **`npm run build`** 통과 이력 있음.
- **dev 실행 중** Windows에서 `build` **EPERM** 가능 → dev 종료 후 재시도.

---

## 다음 세션 시작 프롬프트

```
AGENTS.md와 docs/migration-status.md를 먼저 읽어라.
전체 분석 다시 하지 마라.
화면·페이지 롤아웃 기준으로 1~6단계는 완료다.
7·8단계는 큰 구조·기능은 반영되었으나 polish가 남았고, Exit Gate는 아직 닫지 않았다.
9단계 Contact는 /contact 단독 구현 보류, 문의하기 오버레이 방향이다.
10단계 SEO 등은 미진행이다.
다음 작업은 문서의 「후속 정리 / Polish / 확장 작업」 또는 7·8 polish 우선순위를 따른다.
```

---

## 참고

- **gstack**은 선택. 인계는 **본 문서 + `AGENTS.md` (+ Git)**.
- 본 문서의 단계 정의는 작업 중 확정한 **10단계 플랜 표**를 기준으로 한다. Git 커밋 시점과 어긋나면 워킹 트리를 우선한다.
