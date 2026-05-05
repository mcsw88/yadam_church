import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '오시는 길 | 안양예담교회',
  description: '안양예담교회 위치와 연락처.',
};

export default function ContactPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-32">
      <div className="text-center">
        <p className="text-sm tracking-widest text-dado-accent uppercase mb-4">
          CONTACT
        </p>
        <h1 className="font-serif text-5xl md:text-7xl text-dado-dark mb-6">
          오시는 길
        </h1>
        <p className="text-dado-dark/60">준비 중입니다.</p>
      </div>
    </main>
  );
}
