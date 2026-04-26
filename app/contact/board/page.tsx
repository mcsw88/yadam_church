"use client";

import { FormEvent, useId, useState } from "react";

type BoardPostItem = {
  id: string;
  title: string;
  authorName: string;
  isAnonymous: boolean;
  date: string;
  excerpt: string;
};

const BOARD_POST_EXAMPLES: BoardPostItem[] = [
  {
    id: "fb-01",
    title: "새가족 안내를 받고 싶습니다",
    authorName: "이○○",
    isAnonymous: false,
    date: "2026-04-22",
    excerpt: "주일 예배는 다녀보았고, 다음 단계 안내를 받을 수 있는지 여쭙습니다.",
  },
  {
    id: "fb-02",
    title: "봉사 참여 문의",
    authorName: "",
    isAnonymous: true,
    date: "2026-04-19",
    excerpt: "시간이 맞을 때 작은 봉사부터 해보고 싶은데 연결 방법이 있을지 적어 봅니다.",
  },
  {
    id: "fb-03",
    title: "성경 공부 모임 관련 질문",
    authorName: "박○○",
    isAnonymous: false,
    date: "2026-04-16",
    excerpt: "처음이라 수준과 일정이 맞을지 걱정됩니다. 부담 없이 시작할 수 있는지 알고 싶습니다.",
  },
  {
    id: "fb-04",
    title: "기도 제목을 올려도 될까요",
    authorName: "",
    isAnonymous: true,
    date: "2026-04-12",
    excerpt: "가족 건강을 위해 기도를 부탁드리고 싶습니다. 공개 범위는 어떻게 되는지요.",
  },
];

function displayAuthor(item: BoardPostItem) {
  return item.isAnonymous ? "이름 비공개" : item.authorName || "이름 비공개";
}

export default function ContactBoardPage() {
  const baseId = useId();
  const nameId = `${baseId}-name`;
  const anonId = `${baseId}-anon`;
  const titleId = `${baseId}-title`;
  const bodyId = `${baseId}-body`;

  const [anonymous, setAnonymous] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    window.alert(
      "작성하신 내용은 이 화면에서만 확인하실 수 있으며, 교회로 전달되거나 게시되지는 않습니다. 정식 문의나 접수가 필요하시면 예배 안내에 적힌 연락처를 이용해 주세요.",
    );
  }

  return (
    <main className="ref-container page-main">
      <section className="page-block page-block--pagehead">
        <p className="ref-kicker">자유게시판</p>
        <h2 className="page-title">자유게시판</h2>
      </section>
      <section className="page-block page-block--intro">
        <p className="page-desc">
          짧은 질문이나 나눔을 남겨 보실 수 있는 공간입니다. 공문에 가까운 요청이나 급한 일은 예배 안내에 적힌
          연락처로 말씀해 주시면 더 잘 연결됩니다.
        </p>
      </section>

      <section className="page-block" aria-labelledby="board-guide-heading">
        <h2 className="page-subtitle" id="board-guide-heading">
          이용 안내
        </h2>
        <ul className="quiet-list">
          <li>
            <strong>작성.</strong> 로그인 없이 아래에서 글을 작성해 보실 수 있습니다. 이용 방법이 바뀌면 교회
            안내를 따릅니다.
          </li>
          <li>
            <strong>이름.</strong> 이름을 적으셔도 되고, 이름을 남기지 않고 작성하실 수도 있습니다.
          </li>
          <li>
            <strong>개인정보.</strong> 주민번호·자세한 주소·개인 연락처 등은 가급적 적지 않으시는 것이
            좋습니다. 교회가 확인해야 할 내용은 예배 안내의 연락처로 문의해 주시면 됩니다.
          </li>
          <li>
            <strong>공식 문의.</strong> 급한 일이나 공적인 요청은 예배 안내에 적힌 연락처를 이용해 주십시오.
          </li>
          <li>
            <strong>나눔 글.</strong> 앞으로 게시 방식이 정해지면 교회 안내와 운영 원칙에 따라 다루어질 수
            있습니다.
          </li>
        </ul>
      </section>

      <section className="page-block" aria-labelledby="board-list-heading">
        <h2 className="page-subtitle" id="board-list-heading">
          최근 글
        </h2>
        <p className="page-desc preface">
          목록에는 제목·작성 표시·날짜·짧은 내용이 함께 보일 수 있습니다. 아래 문장은 형식을 살펴보시기 위한
          것으로, 특정 분이나 일정을 가리키지는 않습니다.
        </p>
        <ul className="board-free-list">
          {BOARD_POST_EXAMPLES.map((item) => (
            <li key={item.id} className="board-free-row">
              <span className="board-free-title">{item.title}</span>
              <span className="board-free-meta">
                {displayAuthor(item)} · {item.date}
              </span>
              <p className="board-free-excerpt">{item.excerpt}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="page-block" aria-labelledby="board-form-heading">
        <h2 className="page-subtitle" id="board-form-heading">
          글쓰기
        </h2>
        <p className="page-desc preface">
          아래에서 글을 작성해 보실 수 있습니다. 제출하신 내용은 이 화면에서만 확인되며, 교회로 전달되지는
          않습니다. 접수가 필요하시면 예배 안내의 연락처를 함께 이용해 주세요.
        </p>
        <form className="board-form" onSubmit={handleSubmit} noValidate>
          <div className="board-field">
            <label className="board-label" htmlFor={nameId}>
              이름
            </label>
            <input
              id={nameId}
              name="author"
              className="board-input"
              type="text"
              autoComplete="name"
              placeholder={anonymous ? "이름 없이 표시됩니다" : "표시할 이름(선택)"}
              disabled={anonymous}
            />
            <p className="board-hint">이름을 표시하지 않으시려면 아래 항목을 선택하시고, 이름 칸은 비워 두셔도 됩니다.</p>
          </div>

          <div className="board-check-row">
            <input
              id={anonId}
              name="anonymous"
              type="checkbox"
              checked={anonymous}
              onChange={(e) => setAnonymous(e.target.checked)}
            />
            <label className="board-label board-label-inline" htmlFor={anonId}>
              이름을 표시하지 않음
            </label>
          </div>

          <div className="board-field">
            <label className="board-label" htmlFor={titleId}>
              제목
            </label>
            <input id={titleId} name="title" className="board-input" type="text" required />
          </div>

          <div className="board-field">
            <label className="board-label" htmlFor={bodyId}>
              내용
            </label>
            <textarea id={bodyId} name="body" className="board-textarea" required rows={6} />
          </div>

          <button type="submit" className="board-submit">
            제출하기
          </button>
          <p className="board-form-note">
            제출하시면 짧은 안내 창이 열립니다. 작성하신 내용은 이 페이지에 남지 않으니, 정식 문의는 예배 안내의
            연락처를 이용해 주세요.
          </p>
        </form>
      </section>
    </main>
  );
}
