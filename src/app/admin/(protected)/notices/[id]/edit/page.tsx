import { notFound } from 'next/navigation';
import { PostForm } from '@/components/admin/PostForm';
import { getPost } from '@/lib/admin/cms-post';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function AdminNoticesEditPage({ params }: Props) {
  const { id } = await params;
  const post = await getPost('notices', id);

  if (!post) {
    notFound();
  }

  return <PostForm table="notices" initialData={post} />;
}
