import Link from "next/link";
import { PreheroMeta } from "../../components/prehero-meta";
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

  return (
    <main className="ref-container page-main">
      <PreheroMeta label="Post" />
      <section className="post-detail">
        <p className="ref-kicker">Article</p>
        <h2 className="post-title">{post?.title ?? "게시글을 찾을 수 없습니다."}</h2>
        <p className="post-date">{post?.date ?? ""}</p>
        <div className="post-body">
          {post
            ? "상세 본문은 향후 관리자 연동 시 데이터 소스에서 불러오도록 연결됩니다."
            : "요청하신 게시글이 없거나 주소가 올바르지 않습니다."}
        </div>
        <Link className="post-list-link" href={listHref}>
          {meta ? `${meta.label} 목록` : "목록으로 이동"}
        </Link>
      </section>
    </main>
  );
}
