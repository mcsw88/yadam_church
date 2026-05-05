import { useSyncExternalStore } from 'react';

function getSnapshot(): boolean {
  return (
    'ontouchstart' in window ||
    (typeof navigator !== 'undefined' && navigator.maxTouchPoints > 0)
  );
}

function getServerSnapshot(): boolean {
  return false;
}

function subscribe(): () => void {
  // Touch capability is determined once on mount and does not change at runtime,
  // so the subscription is intentionally a no-op.
  return () => {};
}

export function useIsTouchDevice(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
