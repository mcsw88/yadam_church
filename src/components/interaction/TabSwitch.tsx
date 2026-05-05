'use client';

import { useCallback, useEffect, useId, useRef } from 'react';
import type { KeyboardEvent as ReactKeyboardEvent } from 'react';
import { motion } from 'framer-motion';

import { useReducedMotionSafe } from '@/hooks/useReducedMotionSafe';
import { SPRING_TAB } from '@/motion/transitions';

export interface TabSwitchItem {
  id: string;
  label: string;
}

export interface TabSwitchProps {
  tabs: TabSwitchItem[];
  value: string;
  onChange: (id: string) => void;
  className?: string;
}

export function TabSwitch({ tabs, value, onChange, className = '' }: TabSwitchProps) {
  const listId = useId();
  const reducedMotion = useReducedMotionSafe();
  const indicatorLayoutId = `tab-switch-indicator-${listId}`;
  const arrowNavRef = useRef(false);

  const tabButtonId = useCallback((tabId: string) => `${listId}-tab-${tabId}`, [listId]);

  const moveSelection = useCallback(
    (fromIndex: number, delta: number) => {
      if (tabs.length === 0) return;
      const next = (fromIndex + delta + tabs.length) % tabs.length;
      onChange(tabs[next].id);
    },
    [onChange, tabs],
  );

  useEffect(() => {
    if (!arrowNavRef.current) return;
    arrowNavRef.current = false;
    const active = tabs.find((t) => t.id === value);
    if (!active) return;
    const el = document.getElementById(tabButtonId(active.id));
    el?.focus({ preventScroll: true });
  }, [tabButtonId, tabs, value]);

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (tabs.length === 0) return;
    const currentIndex = tabs.findIndex((t) => t.id === value);

    switch (event.key) {
      case 'ArrowRight': {
        event.preventDefault();
        arrowNavRef.current = true;
        moveSelection(Math.max(currentIndex, 0), 1);
        break;
      }
      case 'ArrowLeft': {
        event.preventDefault();
        arrowNavRef.current = true;
        moveSelection(Math.max(currentIndex, 0), -1);
        break;
      }
      case 'Home': {
        event.preventDefault();
        arrowNavRef.current = true;
        onChange(tabs[0].id);
        break;
      }
      case 'End': {
        event.preventDefault();
        arrowNavRef.current = true;
        onChange(tabs[tabs.length - 1].id);
        break;
      }
      default:
        break;
    }
  };

  const transitionSpec = reducedMotion ? { duration: 0 } : SPRING_TAB;

  return (
    <div
      role="tablist"
      className={`relative flex flex-wrap gap-1 rounded-sm bg-[color-mix(in_srgb,var(--color-dado-dark)_6%,transparent)] p-1 ${className}`.trim()}
      onKeyDown={handleKeyDown}
    >
      {tabs.map((tab) => {
        const selected = tab.id === value;
        const tabDomId = tabButtonId(tab.id);

        return (
          <button
            key={tab.id}
            id={tabDomId}
            type="button"
            role="tab"
            aria-selected={selected}
            tabIndex={selected ? 0 : -1}
            className={`relative z-[1] min-w-[4rem] flex-1 px-4 py-2 text-center font-sans text-xs tracking-wide uppercase transition-colors md:text-sm ${
              selected
                ? 'text-[var(--color-dado-dark)]'
                : 'text-[color-mix(in_srgb,var(--color-dado-dark)_55%,transparent)] hover:text-[var(--color-dado-dark)]'
            }`}
            onClick={() => {
              onChange(tab.id);
            }}
          >
            {!reducedMotion && selected ? (
              <motion.span
                layoutId={indicatorLayoutId}
                className="-z-10 pointer-events-none absolute inset-0 rounded-sm bg-[var(--color-dado-bg)] shadow-sm"
                transition={transitionSpec}
              />
            ) : reducedMotion && selected ? (
              <span className="-z-10 pointer-events-none absolute inset-0 rounded-sm bg-[var(--color-dado-bg)] shadow-sm" />
            ) : null}
            <span className="relative">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
