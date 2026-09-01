"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { Locale } from "@/lib/i18n";

/**
 * Device voices vary enormously in quality. These are the ones worth having
 * when they exist, best first, per language. Apple's are genuinely warm;
 * the generic Windows ones are the "robotic" end of the range, which is
 * precisely why the ElevenLabs route exists alongside this.
 */
const PREFERRED: Record<Locale, string[]> = {
  en: [
    "Ava (Premium)", "Ava", "Samantha", "Allison", "Nicky", "Zoe",
    "Google UK English Female", "Microsoft Aria Online (Natural) - English (United States)",
    "Microsoft Jenny Online (Natural) - English (United States)",
  ],
  es: [
    "Mónica", "Monica", "Paulina", "Google español de Estados Unidos",
    "Microsoft Dalia Online (Natural) - Spanish (Mexico)",
    "Microsoft Elvira Online (Natural) - Spanish (Spain)",
  ],
};

function scoreVoice(voice: SpeechSynthesisVoice, locale: Locale) {
  const wanted = locale === "es" ? "es" : "en";
  if (!voice.lang.toLowerCase().startsWith(wanted)) return -1;

  const index = PREFERRED[locale].findIndex((n) => voice.name === n);
  if (index !== -1) return 1000 - index;

  let score = 0;
  const name = voice.name.toLowerCase();
  if (/(natural|premium|enhanced|neural)/.test(name)) score += 60;
  // Network voices are usually the better ones.
  if (!voice.localService) score += 25;
  if (locale === "es" && /(mx|us|419)/i.test(voice.lang)) score += 10;
  if (locale === "en" && /US/i.test(voice.lang)) score += 10;
  return score;
}

function pickVoice(locale: Locale): SpeechSynthesisVoice | null {
  const voices = window.speechSynthesis?.getVoices?.() ?? [];
  let best: SpeechSynthesisVoice | null = null;
  let bestScore = -1;
  for (const voice of voices) {
    const score = scoreVoice(voice, locale);
    if (score > bestScore) {
      bestScore = score;
      best = voice;
    }
  }
  return bestScore >= 0 ? best : null;
}

export interface SpeechOutput {
  supported: boolean;
  speaking: boolean;
  speak: (text: string) => void;
  cancel: () => void;
}

const subscribeNever = () => () => {};
const synthesisSupported = () =>
  typeof window !== "undefined" && "speechSynthesis" in window;
const notOnServer = () => false;

/**
 * Speaks a reply. Prefers a real voice service when one is configured
 * (`/api/speech` answers 204 when it is not), and falls back to the best
 * device voice available.
 */
export function useSpeechOutput(locale: Locale): SpeechOutput {
  const supported = useSyncExternalStore(
    subscribeNever,
    synthesisSupported,
    notOnServer,
  );
  const [speaking, setSpeaking] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  /** Null until we have asked once; then remembered for the session. */
  const hasVoiceApi = useRef<boolean | null>(null);

  useEffect(() => {
    // Voices load asynchronously in Chrome; touching them early populates them.
    window.speechSynthesis?.getVoices?.();
  }, []);

  const cancel = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
      audioRef.current = null;
    }
    try {
      window.speechSynthesis?.cancel();
    } catch {
      /* nothing playing */
    }
    setSpeaking(false);
  }, []);

  const speakWithDevice = useCallback(
    (text: string) => {
      if (!("speechSynthesis" in window)) return;
      const utterance = new SpeechSynthesisUtterance(text);
      const voice = pickVoice(locale);
      if (voice) utterance.voice = voice;
      utterance.lang = voice?.lang ?? (locale === "es" ? "es-US" : "en-US");
      // A touch under default: warmer, and easier to follow.
      utterance.rate = 0.98;
      utterance.pitch = 1;
      utterance.onend = () => setSpeaking(false);
      utterance.onerror = () => setSpeaking(false);
      setSpeaking(true);
      window.speechSynthesis.speak(utterance);
    },
    [locale],
  );

  const speak = useCallback(
    (raw: string) => {
      const text = raw.trim().slice(0, 900);
      if (!text) return;
      cancel();

      if (hasVoiceApi.current === false) {
        speakWithDevice(text);
        return;
      }

      const controller = new AbortController();
      abortRef.current = controller;
      setSpeaking(true);

      fetch("/api/speech", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, locale }),
        signal: controller.signal,
      })
        .then(async (response) => {
          // 204 means no voice provider is configured on the server.
          if (response.status === 204 || !response.ok) {
            hasVoiceApi.current = false;
            speakWithDevice(text);
            return;
          }
          hasVoiceApi.current = true;
          const blob = await response.blob();
          const audio = new Audio(URL.createObjectURL(blob));
          audioRef.current = audio;
          audio.onended = () => setSpeaking(false);
          audio.onerror = () => {
            setSpeaking(false);
            speakWithDevice(text);
          };
          await audio.play().catch(() => {
            // Autoplay was refused; the device voice needs no gesture.
            speakWithDevice(text);
          });
        })
        .catch((error) => {
          if ((error as Error).name === "AbortError") return;
          hasVoiceApi.current = false;
          speakWithDevice(text);
        });
    },
    [locale, cancel, speakWithDevice],
  );

  useEffect(() => cancel, [cancel]);

  return { supported, speaking, speak, cancel };
}
