/** 주일 집회 진행을 화면에 보여 주는 안내입니다. 확정 순서는 공지와 현장 안내를 확인해 주세요. */
type SundayFlowGroup = "prep" | "core" | "end";

const SUNDAY_FLOW_GROUP_LABEL: Record<SundayFlowGroup, string> = {
  prep: "준비",
  core: "중심 순서",
  end: "마침과 교제",
};

type SundayFlowStep = {
  id: string;
  group: SundayFlowGroup;
  label: string;
  title: string;
  description: string;
};

const SUNDAY_FLOW_EXAMPLES: SundayFlowStep[] = [
  {
    id: "before",
    group: "prep",
    label: "준비",
    title: "예배 전 준비",
    description:
      "찬양팀·안내·말씀 준비 등이 조용히 마무리되며, 성도들도 자리에 앉아 예배를 기다립니다. 교회마다 다소 차이가 있을 수 있습니다.",
  },
  {
    id: "song",
    group: "core",
    label: "찬양",
    title: "찬양",
    description:
      "회중이 함께 노래하며 주님 앞에 마음을 모읍니다. 곡목과 형식은 교회의 전통과 안내에 따릅니다.",
  },
  {
    id: "prayer",
    group: "core",
    label: "기도",
    title: "기도",
    description:
      "대표 기도·묵상 기도 등으로 이어질 수 있으며, 예배의 중심이 하나님께 향하도록 돕는 시간으로 이해할 수 있습니다.",
  },
  {
    id: "word",
    group: "core",
    label: "말씀",
    title: "말씀",
    description:
      "성경 본문을 중심으로 말씀이 선포됩니다. 설교 길이와 방식은 담당 교역자와 교회 상황에 따라 달라질 수 있습니다.",
  },
  {
    id: "offering",
    group: "core",
    label: "봉헌",
    title: "봉헌",
    description:
      "감사와 헌신을 드리는 순서로 안내될 수 있습니다. 참여 방식은 교회 안내를 참고해 주십시오.",
  },
  {
    id: "benediction",
    group: "end",
    label: "마침",
    title: "축도 또는 마침",
    description:
      "축도 기도나 마침 찬송으로 예배가 정리될 수 있습니다. 표현은 교단·교회 관행에 따라 다를 수 있습니다.",
  },
  {
    id: "fellowship",
    group: "end",
    label: "교제",
    title: "예배 후 교제",
    description:
      "점심·간단한 인사·다음 세대 안내 등이 이어질 수 있으며, 필수는 아닙니다. 당일 공지를 따르면 됩니다.",
  },
];

export default function MinistriesSundayPage() {
  return (
    <main className="ref-container page-main">
      <section className="page-block page-block--pagehead">
        <p className="ref-kicker">사역소개</p>
        <h2 className="page-title">주일사역</h2>
      </section>
      <section className="page-block page-block--intro">
        <p className="page-desc">
          주일은 한 주의 시작이자, 함께 드리는 집회 가운데 성경 말씀 앞에 서는 공동체의 기준 자리입니다. 아래는
          순서만 늘어놓은 설명이 아니라, 집회와 사역이 어떤 마음으로 잇기를 바라는지를 정리한 것입니다. 세부
          순서·시간은 교회 공지와 현장 안내를 기준으로 삼아 주시면 됩니다.
        </p>
      </section>

      <section className="page-block" aria-labelledby="sunday-purpose-heading">
        <h2 className="page-subtitle" id="sunday-purpose-heading">
          주일사역의 목적
        </h2>
        <div className="page-prose-paragraphs">
          <p className="page-desc">
            주일사역은 먼저 하나님께 드리는 집회의 시간입니다. 형식보다 방향이 그리스도께 향하는지, 선포된 말씀과
            기도가 성도의 삶과 끊기지 않는지를 더 중요하게 봅니다.
          </p>
          <p className="page-desc">
            설교의 자리는 정보를 쌓는 강의만이 아니라, 한 주를 돌아보고 믿음 안에서 다시 서는 시간이 되기를
            바랍니다. 처지는 각기 다르지만, 같은 본문 앞에 함께 앉는다는 사실이 공동체를 세우는 뼈대가 됩니다.
          </p>
          <p className="page-desc">
            서로를 단순한 ‘모임 참석자’가 아니라, 양육과 봉사 속에서 함께 자라는 동행자로 대할 수 있기를
            희망합니다. 익숙한 분과 처음 오신 분이 같은 찬송과 기도를 나누는 가운데 한 자리에 머물 수 있도록
            안내와 질서를 다듬어 갑니다.
          </p>
          <p className="page-desc">
            처음 오신 분이 모든 절차를 알 필요는 없습니다. 집회 안에서 말씀·기도·찬양의 흐름을 따라가실 수 있도록
            부담을 줄이는 방향으로 설명하고, 필요하면 조용히 안내를 청할 수 있게 해 두려 합니다.
          </p>
        </div>
      </section>

      <section className="page-block" aria-labelledby="sunday-sermon-heading">
        <div className="page-heading-inline">
          <span className="section-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
          </span>
          <h2 className="page-subtitle" id="sunday-sermon-heading">
            설교와 말씀의 방향
          </h2>
        </div>
        <p className="page-desc preface">
          설교는 교리 시험의 자리이기보다, 성경 앞에서 삶을 내놓고 듣는 자리에 가깝게 이해합니다. 아래는 그 방향을
          짧게 짚은 것입니다.
        </p>
        <ul className="quiet-list">
          <li>
            <strong>적용.</strong> 단순한 지식 전달에 머무르지 않고, 본문이 일상의 결정·관계·일에 어떻게 비춰지는지
            묻는 흐름을 지향합니다. 모든 질문에 즉답을 강요하지는 않습니다.
          </li>
          <li>
            <strong>회복.</strong> 연약함과 지침을 숨기지 않고, 복음 안에서 다시 일어설 여지를 말씀으로 붙잡는
            방향을 소중히 합니다.
          </li>
          <li>
            <strong>순종.</strong> 감정적 동원보다 본문에 귀 기울이고 순종의 걸음을 함께 상고하는 쪽에 무게를 둡니다.
          </li>
          <li>
            <strong>교제.</strong> 개인의 영적 체험만 강조하지 않고, 믿음의 성장이 서로 돌봄·봉사와 이어지도록
            질문을 열어 둡니다.
          </li>
          <li>
            <strong>한 주.</strong> 설교가 한 주간의 삶을 조용히 정돈하고, 집회를 떠난 뒤에도 묵상과 기도로 이어질
            수 있기를 바랍니다.
          </li>
        </ul>
        <div className="page-prose-paragraphs">
          <p className="page-desc">
            설교자와 회중 모두 완성된 답을 한 번에 내지 못할 수 있습니다. 다만 본문이 선포될 때 성령께서 각 사람의
            필요에 맞게 일하신다는 믿음 아래, 조급함보다 꾸준한 듣기와 순종을 이어 가고자 합니다.
          </p>
        </div>
      </section>

      <section className="page-block" aria-labelledby="sunday-flow-heading">
        <h2 className="page-subtitle" id="sunday-flow-heading">
          주일예배 진행 흐름
        </h2>
        <p className="page-desc preface">
          순서는 교회·시기에 따라 달라질 수 있습니다. 아래는 이해를 돕기 위해 정리한 참고 흐름이며, 확정 안내는
          현장과 공지를 따릅니다.
        </p>
        <div className="timeline-rhythm">
          {(["prep", "core", "end"] as const).map((key) => {
            const items = SUNDAY_FLOW_EXAMPLES.filter((s) => s.group === key);
            if (items.length === 0) return null;
            return (
              <div className="timeline-rhythm-segment" key={key}>
                <p className="ref-kicker">{SUNDAY_FLOW_GROUP_LABEL[key]}</p>
                <ul className="timeline-list" aria-label={`${SUNDAY_FLOW_GROUP_LABEL[key]} (참고)`}>
                  {items.map((step) => (
                    <li key={step.id}>
                      <span className="timeline-time">{step.label}</span>
                      <div>
                        <p className="page-desc">
                          <strong>{step.title}</strong>
                        </p>
                        <p className="page-desc">{step.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      <section className="page-block" aria-labelledby="sunday-newcomer-heading">
        <h2 className="page-subtitle" id="sunday-newcomer-heading">
          처음 참여하시는 분께
        </h2>
        <div className="page-prose-paragraphs">
          <p className="page-desc">
            정해진 복장 규정을 두고 부담을 드리지 않으려 합니다. 예배에 집중하실 수 있는 정도의 차림이면
            충분합니다. 안내가 필요하시면 도착 후 데스크나 안내자에게 말씀해 주시면 짧게 도와드릴 수 있습니다.
          </p>
          <p className="page-desc">
            찬양·기도·말씀의 순서를 처음부터 외울 필요는 없습니다. 자리에 앉아 흐름을 따라가시면 되며, 따라가기
            어려우면 책자나 화면 안내가 있을 때 그것을 참고하셔도 됩니다.
          </p>
          <p className="page-desc">
            예배 후 교제나 식사가 있을 수 있으나 필수는 아닙니다. 바로 가셔도 괜찮고, 잠시 머물러 인사를 나누셔도
            됩니다. 궁금한 점은 예배가 끝난 뒤에도 안내 경로를 통해 천천히 문의하실 수 있습니다.
          </p>
        </div>
      </section>

      <section className="page-block" aria-labelledby="sunday-visual-heading">
        <h2 className="page-subtitle" id="sunday-visual-heading">
          주일 예배의 자리
        </h2>
        <div className="page-split">
          <div className="page-split-media">
            <figure className="page-visual">
              <div
                className="page-visual-placeholder"
                role="img"
                aria-label="주일 집회를 담는 이미지 자리"
              >
                주일 예배의 자리
              </div>
            </figure>
            <p className="page-desc-note">교회에서 준비한 사진이 있으면 이 자리에 함께 담깁니다.</p>
          </div>
          <div className="page-split-content page-prose-paragraphs">
            <p className="page-desc">
              주일 집회가 공동체의 중심에 있다는 마음을 담아, 이 자리에 사진이나 그림을 두고자 합니다. 집회의 깊이는
              질서와 말씀 선포·기도의 흐름에서 드러난다고 믿습니다.
            </p>
            <p className="page-desc">
              이미지가 없어도 안내를 읽는 데는 문제없습니다. 갱신은 교회 안내에 맞춥니다.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
