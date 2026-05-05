import { PostList } from '@/components/admin/PostList';
import { getPosts } from '@/lib/admin/cms-post';

export default async function AdminNoticesPage() {
  const items = await getPosts('notices');

  return (
    <PostList
      items={items}
      table="notices"
      newHref="/admin/notices/new"
      title="공지사항"
    />
  );
}
