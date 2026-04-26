import Link from "next/link";
import { boardMeta, getPostById } from "../../lib/content-data";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function PostPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const rawType = params.type;
  const rawId = params.id;
  const type = typeof rawType === "string" && (rawType === "notice" || rawType === "news") ? rawType : null;
  const id = typeof rawId === "string" ? rawId : null;
  const post = type && id ? getPostById(type, id) : null;
  const meta = type ? boardMeta[type] : null;
  const listHref = meta?.listPage ?? "/news";

  const kickerLabel = type === "notice" ? "공지사항" : type === "news" ? "교회소식" : "안내";
  const detailCategoryLine =
    type === "notice" ? "예배·모임·협조 안내" : type === "news" ? "나눔과 기록" : null;

  return (
    <main className="ref-container page-main">
      <article className="post-detail">
        <p className="ref-kicker">{kickerLabel}</p>
        {detailCategoryLine ? <p className="post-category">{detailCategoryLine}</p> : null}
        <h2 className="post-title">{post?.title ?? "찾으시는 글을 확인할 수 없습니다."}</h2>
        {post ? (
          <time className="post-date" dateTime={post.date}>
            {post.date}
          </time>
        ) : null}
        <div className="post-body page-prose-paragraphs">
          {post ? (
            post.content.map((paragraph, index) => (
              <p key={`${post.id}-${index}`} className="page-desc">
                {paragraph}
              </p>
            ))
          ) : (
            <>
              <p className="page-desc">링크가 바뀌었거나 글이 없을 수 있습니다.</p>
              <p className="page-desc">아래에서 공지사항·교회소식 목록으로 돌아가 다시 선택해 주세요.</p>
            </>
          )}
        </div>
        <p className="post-back">
          <Link className="post-list-link" href={listHref}>
            {meta ? `${meta.label} 목록으로` : "목록으로 돌아가기"}
          </Link>
        </p>
      </article>
    </main>
  );
}
