import type { ReactNode } from 'react';

type ErrorMessageProps = {
  title: string;
  description?: string;
  className?: string;
  actionSlot?: ReactNode;
};

export function ErrorMessage({
  title,
  description,
  className,
  actionSlot,
}: ErrorMessageProps) {
  const root = [
    'rounded-sm border border-dado-accent/80 bg-dado-light/30 px-5 py-4 text-dado-dark',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={root} role="alert">
      <h3 className="font-serif text-lg text-dado-dark">{title}</h3>
      {description ? (
        <p className="font-sans mt-2 text-sm leading-relaxed text-dado-dark/85">
          {description}
        </p>
      ) : null}
      {actionSlot ? (
        <div className="mt-4 flex flex-wrap items-center gap-2">{actionSlot}</div>
      ) : null}
    </div>
  );
}
