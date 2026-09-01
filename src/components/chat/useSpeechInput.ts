"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { Locale } from "@/lib/i18n";

/* The Web Speech API is still vendor-prefixed nearly everywhere. */
interface SpeechRecognitionLike extends EventTarget {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
}

interface SpeechRecognitionEventLike {
  resultIndex: number;
  results: {
    length: number;
    [index: number]: { isFinal: boolean; 0: { transcript: string } };
  };
}

type Ctor = new () => SpeechRecognitionLike;

function getRecognitionCtor(): Ctor | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as {
    SpeechRecognition?: Ctor;
    webkitSpeechRecognition?: Ctor;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

export type SpeechInputError = "unsupported" | "denied" | "no-speech" | null;

/** How long a pause ends the turn and sends what was heard. */
const SILENCE_MS = 4000;

export interface SpeechInput {
  supported: boolean;
  listening: boolean;
  /** What has been heard so far, including the not-yet-final tail. */
  transcript: string;
  error: SpeechInputError;
  /** 0–1, driven by the actual microphone. Read imperatively for animation. */
  levelRef: React.RefObject<number>;
  start: () => Promise<void>;
  stop: () => void;
  reset: () => void;
}

/* Browser capability is external state, so it is read as such rather than
   copied into React state inside an effect. */
const subscribeNever = () => () => {};
const recognitionSupported = () => Boolean(getRecognitionCtor());
const notOnServer = () => false;

/**
 * Speech recognition with our own endpointing: four seconds of silence ends
 * the turn and hands the transcript back, which is what makes it feel like a
 * conversation rather than a form you have to submit.
 */
export function useSpeechInput(
  locale: Locale,
  onFinal: (text: string) => void,
): SpeechInput {
  const supported = useSyncExternalStore(
    subscribeNever,
    recognitionSupported,
    notOnServer,
  );
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState<SpeechInputError>(null);

  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const finalRef = useRef("");
  const silenceTimer = useRef<number | null>(null);
  const levelRef = useRef(0);

  // Audio graph for the waveform, kept separate from recognition.
  const streamRef = useRef<MediaStream | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const rafRef = useRef(0);

  const onFinalRef = useRef(onFinal);
  useEffect(() => {
    onFinalRef.current = onFinal;
  }, [onFinal]);

  const teardownAudio = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    void audioCtxRef.current?.close().catch(() => {});
    audioCtxRef.current = null;
    levelRef.current = 0;
  }, []);

  const clearSilence = useCallback(() => {
    if (silenceTimer.current) {
      window.clearTimeout(silenceTimer.current);
      silenceTimer.current = null;
    }
  }, []);

  const stop = useCallback(() => {
    clearSilence();
    try {
      recognitionRef.current?.stop();
    } catch {
      /* already stopped */
    }
    recognitionRef.current = null;
    teardownAudio();
    setListening(false);
  }, [clearSilence, teardownAudio]);

  const finish = useCallback(() => {
    const text = finalRef.current.trim();
    stop();
    setTranscript("");
    finalRef.current = "";
    if (text) onFinalRef.current(text);
    else setError("no-speech");
  }, [stop]);

  const startLevelMeter = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const Ctx =
        window.AudioContext ??
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      const ctx = new Ctx();
      audioCtxRef.current = ctx;

      const source = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.75;
      source.connect(analyser);

      const bins = new Uint8Array(analyser.frequencyBinCount);
      const tick = () => {
        analyser.getByteFrequencyData(bins);
        let sum = 0;
        for (let i = 0; i < bins.length; i++) sum += bins[i];
        // Normalise to roughly 0–1 for speech, which rarely maxes the meter.
        levelRef.current = Math.min(1, sum / bins.length / 96);
        rafRef.current = requestAnimationFrame(tick);
      };
      tick();
      return true;
    } catch {
      setError("denied");
      return false;
    }
  }, []);

  const start = useCallback(async () => {
    const Ctor = getRecognitionCtor();
    if (!Ctor) {
      setError("unsupported");
      return;
    }

    setError(null);
    finalRef.current = "";
    setTranscript("");

    const ok = await startLevelMeter();
    if (!ok) return;

    const recognition = new Ctor();
    recognition.lang = locale === "es" ? "es-US" : "en-US";
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event) => {
      let interim = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        const text = result[0].transcript;
        if (result.isFinal) finalRef.current += text;
        else interim += text;
      }
      setTranscript((finalRef.current + interim).trim());

      // Any speech resets the clock; four seconds of quiet ends the turn.
      clearSilence();
      silenceTimer.current = window.setTimeout(finish, SILENCE_MS);
    };

    recognition.onerror = (event) => {
      if (event.error === "not-allowed" || event.error === "service-not-allowed") {
        setError("denied");
      } else if (event.error === "no-speech") {
        setError("no-speech");
      }
      stop();
    };

    recognition.onend = () => {
      // Chrome ends the session on its own after a pause; honour whatever
      // was captured rather than dropping it silently.
      if (recognitionRef.current) finish();
    };

    recognitionRef.current = recognition;
    try {
      recognition.start();
      setListening(true);
      silenceTimer.current = window.setTimeout(finish, SILENCE_MS * 2);
    } catch {
      setError("unsupported");
      stop();
    }
  }, [locale, startLevelMeter, clearSilence, finish, stop]);

  const reset = useCallback(() => setError(null), []);

  useEffect(() => stop, [stop]);

  return { supported, listening, transcript, error, levelRef, start, stop, reset };
}
