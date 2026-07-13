"use client";

import {
  createContext,
  Fragment,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

/**
 * Lets the brand logo "refresh" the homepage in place. Clicking the logo while
 * already on Home bumps `resetKey`, which remounts the routed page content (via
 * `HomeResetBoundary`) — returning every stateful section (hero carousel, product
 * tabs, any filters / search / pagination) to its default state, with no full
 * page reload. Normal navigation never changes the key, so it's a no-op there.
 */
type HomeResetValue = {
  resetKey: number;
  triggerHomeReset: () => void;
};

const HomeResetContext = createContext<HomeResetValue | null>(null);

export function HomeResetProvider({ children }: { children: React.ReactNode }) {
  const [resetKey, setResetKey] = useState(0);
  const triggerHomeReset = useCallback(() => setResetKey((k) => k + 1), []);
  const value = useMemo(
    () => ({ resetKey, triggerHomeReset }),
    [resetKey, triggerHomeReset],
  );
  return (
    <HomeResetContext.Provider value={value}>{children}</HomeResetContext.Provider>
  );
}

export function useHomeReset(): HomeResetValue {
  const ctx = useContext(HomeResetContext);
  if (!ctx) throw new Error("useHomeReset must be used within a HomeResetProvider");
  return ctx;
}

/**
 * Wraps the routed page content. A change to `resetKey` remounts the whole
 * subtree, resetting the client state of every section to its defaults. Uses a
 * keyed Fragment so no extra DOM node is introduced and layout is untouched.
 */
export function HomeResetBoundary({ children }: { children: React.ReactNode }) {
  const { resetKey } = useHomeReset();
  return <Fragment key={resetKey}>{children}</Fragment>;
}
