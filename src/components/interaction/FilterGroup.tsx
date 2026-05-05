'use client';

import type { KeyboardEvent as ReactKeyboardEvent } from 'react';

export interface FilterGroupOption<V extends string | number = string | number> {
  value: V;
  label: string;
}

export interface FilterGroupProps<V extends string | number = string | number> {
  options: FilterGroupOption<V>[];
  value: V;
  onChange: (next: V) => void;
  label?: string;
  className?: string;
}

function optionKey(option: FilterGroupOption): string {
  return String(option.value);
}

export function FilterGroup<V extends string | number = string | number>({
  options,
  value,
  onChange,
  label,
  className = '',
}: FilterGroupProps<V>) {
  const handleKeyDown = (event: ReactKeyboardEvent<HTMLButtonElement>, index: number) => {
    if (options.length === 0) return;
    const bar = event.currentTarget.closest('[data-filter-group]');

    const focusIndex = (i: number) => {
      bar?.querySelector<HTMLButtonElement>(`button[data-filter-index="${i}"]`)?.focus();
    };

    const move = (delta: number) => {
      event.preventDefault();
      const nextIndex = (index + delta + options.length) % options.length;
      onChange(options[nextIndex].value);
      focusIndex(nextIndex);
    };

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        move(1);
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        move(-1);
        break;
      case 'Home':
        event.preventDefault();
        onChange(options[0].value);
        focusIndex(0);
        break;
      case 'End': {
        event.preventDefault();
        const last = options.length - 1;
        onChange(options[last].value);
        focusIndex(last);
        break;
      }
      default:
        break;
    }
  };

  const buttons = options.map((option, index) => {
    const selected = option.value === value;
    return (
      <button
        key={optionKey(option)}
        type="button"
        data-filter-index={index}
        aria-pressed={selected}
        className={`rounded-sm border px-3 py-1.5 font-sans text-xs tracking-wide transition-colors md:text-sm ${
          selected
            ? 'border-[var(--color-dado-accent)] bg-[color-mix(in_srgb,var(--color-dado-accent)_12%,transparent)] text-[var(--color-dado-dark)]'
            : 'border-[color-mix(in_srgb,var(--color-dado-dark)_18%,transparent)] bg-transparent text-[color-mix(in_srgb,var(--color-dado-dark)_70%,transparent)] hover:border-[color-mix(in_srgb,var(--color-dado-dark)_35%,transparent)] hover:text-[var(--color-dado-dark)]'
        }`}
        onClick={() => {
          onChange(option.value);
        }}
        onKeyDown={(event) => {
          handleKeyDown(event, index);
        }}
      >
        {option.label}
      </button>
    );
  });

  const toolbarClass = `flex flex-wrap gap-2 ${className}`.trim();

  if (label) {
    return (
      <fieldset className="min-w-0 border-0 p-0">
        <legend className="mb-2 block font-sans text-xs font-medium tracking-wide uppercase text-[color-mix(in_srgb,var(--color-dado-dark)_70%,transparent)]">
          {label}
        </legend>
        <div data-filter-group className={toolbarClass}>
          {buttons}
        </div>
      </fieldset>
    );
  }

  return (
    <div role="group" data-filter-group className={toolbarClass}>
      {buttons}
    </div>
  );
}
