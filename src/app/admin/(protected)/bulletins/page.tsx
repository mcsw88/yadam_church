import { BulletinList } from '@/components/admin/BulletinList';
import { getBulletins } from '@/lib/admin/cms-bulletin';

export default async function AdminBulletinsPage() {
  const items = await getBulletins();
  return <BulletinList items={items} />;
}
