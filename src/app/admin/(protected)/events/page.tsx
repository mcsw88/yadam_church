import { PostList } from '@/components/admin/PostList';
import { getPosts } from '@/lib/admin/cms-post';

export default async function AdminEventsPage() {
  const items = await getPosts('events');

  return (
    <PostList
      items={items}
      table="events"
      newHref="/admin/events/new"
      title="행사소식"
    />
  );
}
