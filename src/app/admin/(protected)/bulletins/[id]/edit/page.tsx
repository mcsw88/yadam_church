import { notFound } from 'next/navigation';
import { BulletinForm } from '@/components/admin/BulletinForm';
import { getBulletin } from '@/lib/admin/cms-bulletin';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function AdminBulletinsEditPage({ params }: Props) {
  const { id } = await params;
  const bulletin = await getBulletin(id);

  if (!bulletin) {
    notFound();
  }

  return <BulletinForm initialData={bulletin} />;
}
