import type { ReactNode } from 'react';

type EmptyStateProps = {
  title: string;
  description?: string;
  className?: string;
  icon?: ReactNode;
};

export function EmptyState({
  title,
  description,
  className,
  icon,
}: EmptyStateProps) {
  const root = [
    'flex flex-col items-center justify-center gap-3 rounded-sm border border-dado-light bg-dado-bg/60 px-6 py-12 text-center',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={root}>
      {icon ? <div className="text-dado-accent">{icon}</div> : null}
      <h3 className="font-serif text-xl text-dado-dark">{title}</h3>
      {description ? (
        <p className="font-sans max-w-md text-sm leading-relaxed text-dado-dark/75">
          {description}
        </p>
      ) : null}
    </div>
  );
}
