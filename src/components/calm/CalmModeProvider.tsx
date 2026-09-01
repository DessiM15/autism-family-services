"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";

const STORAGE_KEY = "afs-calm-mode";
const EVENT = "afs:calm-change";

interface CalmContextValue {
  /** True when motion should be suppressed. */
  calm: boolean;
  /** True once hydrated, i.e. once the real browser value is known. */
  ready: boolean;
  setCalm: (next: boolean) => void;
  toggle: () => void;
}

const CalmContext = createContext<CalmContextValue>({
  calm: false,
  ready: false,
  setCalm: () => {},
  toggle: () => {},
});

/**
 * Runs before first paint so the page never flashes a moving version of
 * itself at someone who asked for stillness. This is also what makes the
 * `data-calm` attribute the single source of truth below.
 */
export const calmModeScript = `(function(){try{
var s=localStorage.getItem(${JSON.stringify(STORAGE_KEY)});
var m=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
var on = s===null ? m : s==="true";
document.documentElement.setAttribute("data-calm", on?"true":"false");
}catch(e){}})();`;

/* ------------------------------------------------------------------
   The DOM attribute is the store. Reading from it (rather than from a
   duplicate piece of React state) means the pre-paint script and React
   can never disagree, and it keeps this out of setState-in-effect
   territory entirely.
   ------------------------------------------------------------------ */

function subscribe(onChange: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");

  const onMediaChange = () => {
    // Only follow the OS when the visitor hasn't chosen for themselves.
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(STORAGE_KEY);
    } catch {
      /* blocked storage — treat as no explicit preference */
    }
    if (stored !== null) return;
    document.documentElement.setAttribute("data-calm", String(media.matches));
    onChange();
  };

  media.addEventListener("change", onMediaChange);
  window.addEventListener(EVENT, onChange);
  return () => {
    media.removeEventListener("change", onMediaChange);
    window.removeEventListener(EVENT, onChange);
  };
}

const getSnapshot = () =>
  document.documentElement.getAttribute("data-calm") === "true";

/** On the server we always render the still version — it is the safe default. */
const getServerSnapshot = () => false;

const subscribeHydrated = () => () => {};
const isHydratedClient = () => true;
const isHydratedServer = () => false;

export function CalmModeProvider({ children }: { children: ReactNode }) {
  const calm = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const ready = useSyncExternalStore(
    subscribeHydrated,
    isHydratedClient,
    isHydratedServer,
  );

  const setCalm = useCallback((next: boolean) => {
    document.documentElement.setAttribute("data-calm", String(next));
    try {
      localStorage.setItem(STORAGE_KEY, String(next));
    } catch {
      /* preference simply won't persist; the page still behaves correctly */
    }
    window.dispatchEvent(new Event(EVENT));
  }, []);

  const value = useMemo<CalmContextValue>(
    () => ({
      calm,
      ready,
      setCalm,
      toggle: () => setCalm(!calm),
    }),
    [calm, ready, setCalm],
  );

  return <CalmContext.Provider value={value}>{children}</CalmContext.Provider>;
}

export function useCalm() {
  return useContext(CalmContext);
}

/**
 * `true` when it is safe to animate. Everything that moves should ask this
 * first — and should render its *finished* state when the answer is no.
 */
export function useMotionAllowed() {
  const { calm, ready } = useCalm();
  return ready && !calm;
}
