import { useSyncExternalStore } from "react";

/**
 * "Load the salon locations again" signal (locations are live data and must never be reused from a
 * previous visit). The booking tab stays mounted, so the Book/Rezerviši button bumps this counter and
 * the locations screen refetches whenever it changes.
 */
let version = 0;
const listeners = new Set<() => void>();

export function requestLocationsRefresh() {
  version += 1;
  listeners.forEach((l) => l());
}

export function useLocationsRefresh() {
  return useSyncExternalStore(
    (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    () => version,
  );
}
