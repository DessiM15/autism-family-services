"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type Tone = "light" | "dark";

interface HeaderToneValue {
  /** The tone of whatever sits directly beneath the header right now. */
  tone: Tone;
  setTone: (tone: Tone) => void;
}

const HeaderToneContext = createContext<HeaderToneValue>({
  tone: "light",
  setTone: () => {},
});

export function HeaderToneProvider({ children }: { children: ReactNode }) {
  const [tone, setTone] = useState<Tone>("light");
  return (
    <HeaderToneContext.Provider value={{ tone, setTone }}>
      {children}
    </HeaderToneContext.Provider>
  );
}

export function useHeaderTone() {
  return useContext(HeaderToneContext);
}

/**
 * Declares the tone of the page's opening section so the header can switch
 * to light type over a dark hero — and switch back when you navigate away.
 */
export function useDeclareHeaderTone(tone: Tone) {
  const { setTone } = useHeaderTone();

  // `setTone` comes from useState, so it is already referentially stable.
  useEffect(() => {
    setTone(tone);
    return () => setTone("light");
  }, [tone, setTone]);
}
