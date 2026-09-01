"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  MessageCircle, Mic, Phone, Play, RotateCcw, Send, Square, Volume2, VolumeX, X,
} from "lucide-react";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { useCalm, useMotionAllowed } from "@/components/calm/CalmModeProvider";
import { useSpeechInput } from "./useSpeechInput";
import { useSpeechOutput } from "./useSpeechOutput";
import { Waveform } from "./Waveform";
import { site } from "@/lib/site";
import { cn, telHref } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const newId = () => Math.random().toString(36).slice(2);

export function ChatWidget() {
  const { t, locale } = useLocale();
  const animate = useMotionAllowed();
  const { calm } = useCalm();

  const [open, setOpen] = useState(false);
  /** Shown once, before the microphone is ever requested. */
  const [askingMic, setAskingMic] = useState(false);
  /** True once someone has chosen to talk; only then do replies speak. */
  const [voiceMode, setVoiceMode] = useState(false);
  const lastSpokenRef = useRef<string | null>(null);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!open) return;
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, open, busy]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => () => abortRef.current?.abort(), []);

  const speech = useSpeechOutput(locale);

  const sendRef = useRef<(text: string) => void>(() => {});
  const listen = useSpeechInput(locale, (heard) => sendRef.current(heard));

  /* Replies read themselves aloud only once someone has chosen to talk, and
     never in Calm Mode, where each reply gets a play button instead. */
  useEffect(() => {
    if (!voiceMode || calm || busy) return;
    const last = messages[messages.length - 1];
    if (!last || last.role !== "assistant" || !last.content.trim()) return;
    if (lastSpokenRef.current === last.id) return;
    lastSpokenRef.current = last.id;
    speech.speak(last.content);
  }, [messages, busy, voiceMode, calm, speech]);

  // Stop any audio the moment the panel closes.
  useEffect(() => {
    if (!open) {
      speech.cancel();
      listen.stop();
    }
  }, [open, speech, listen]);

  const send = useCallback(
    async (raw: string) => {
      const text = raw.trim();
      if (!text || busy) return;

      const userMessage: Message = { id: newId(), role: "user", content: text };
      const replyId = newId();

      setMessages((prev) => [
        ...prev,
        userMessage,
        { id: replyId, role: "assistant", content: "" },
      ]);
      setInput("");
      setBusy(true);

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const history = [...messages, userMessage]
          .filter((m) => m.content.trim())
          .map((m) => ({ role: m.role, content: m.content }));

        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: history, locale }),
          signal: controller.signal,
        });

        if (!response.ok || !response.body) throw new Error("Chat request failed");

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const parts = buffer.split("\n\n");
          buffer = parts.pop() ?? "";

          for (const part of parts) {
            const line = part.trim();
            if (!line.startsWith("data:")) continue;
            const payload = line.slice(5).trim();
            if (payload === "[DONE]") continue;
            try {
              const { text: chunk } = JSON.parse(payload) as { text: string };
              if (!chunk) continue;
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === replyId ? { ...m, content: m.content + chunk } : m,
                ),
              );
            } catch {
              /* skip a malformed frame rather than break the stream */
            }
          }
        }
      } catch (error) {
        if ((error as Error).name === "AbortError") return;
        setMessages((prev) =>
          prev.map((m) => (m.id === replyId ? { ...m, content: t.chat.error } : m)),
        );
      } finally {
        setBusy(false);
        abortRef.current = null;
      }
    },
    [busy, messages, locale, t.chat.error],
  );

  useEffect(() => {
    sendRef.current = send;
  }, [send]);

  const reset = () => {
    abortRef.current?.abort();
    speech.cancel();
    listen.stop();
    setBusy(false);
    setMessages([]);
    lastSpokenRef.current = null;
  };

  /** First tap on the microphone explains itself before asking permission. */
  const onMicPress = () => {
    if (listen.listening) {
      listen.stop();
      return;
    }
    speech.cancel();
    if (voiceMode) {
      void listen.start();
    } else {
      setAskingMic(true);
    }
  };

  const allowMic = async () => {
    setAskingMic(false);
    setVoiceMode(true);
    await listen.start();
  };

  // The greeting is derived, not stored, so it always speaks the active
  // language even if the visitor switches mid-conversation.
  const thread: Message[] = [
    { id: "greeting", role: "assistant", content: t.chat.greeting },
    ...messages,
  ];
  const showSuggestions = messages.length === 0;

  return (
    <>
      {/* ------------------------------------------------ Launcher */}
      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? t.common.close : t.chat.launcherLabel}
        aria-expanded={open}
        initial={animate ? { scale: 0, opacity: 0 } : false}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "group fixed right-4 bottom-4 z-[70] flex items-center gap-2.5 rounded-full pr-5 pl-4 shadow-[0_16px_40px_-10px_rgba(0,30,100,0.55)] transition-colors duration-300 sm:right-6 sm:bottom-6",
          "h-14 bg-navy-900 text-cream-50 hover:bg-navy-800",
          open && "bg-navy-800",
        )}
      >
        {open ? (
          <X className="size-5" aria-hidden />
        ) : (
          <MessageCircle className="size-5" aria-hidden />
        )}
        <span className="text-[0.9375rem] font-semibold">
          {open ? t.common.close : t.chat.launcherLabel}
        </span>
      </motion.button>

      {/* ------------------------------------------------ Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label={t.chat.title}
            initial={animate ? { opacity: 0, y: 24, scale: 0.97 } : false}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={animate ? { opacity: 0, y: 16, scale: 0.98 } : undefined}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-3 bottom-22 z-[70] flex max-h-[min(640px,calc(100svh-7rem))] flex-col overflow-hidden rounded-[1.5rem] border border-cream-300 bg-cream-50 shadow-[0_32px_80px_-20px_rgba(0,30,100,0.45)] sm:inset-x-auto sm:right-6 sm:bottom-24 sm:w-[400px]"
          >
            {/* Header */}
            <div className="shrink-0 bg-navy-950 px-5 py-4 text-cream-50">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-display text-lg leading-tight">{t.chat.title}</p>
                  <p className="mt-0.5 text-[0.75rem] text-cream-100/60">
                    {t.chat.subtitle}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-1">
                  {speech.supported && (
                    <button
                      type="button"
                      onClick={() => {
                        if (voiceMode) speech.cancel();
                        setVoiceMode((v) => !v);
                      }}
                      aria-pressed={voiceMode}
                      aria-label={voiceMode ? t.voice.repliesOn : t.voice.repliesOff}
                      title={voiceMode ? t.voice.repliesOn : t.voice.repliesOff}
                      className={cn(
                        "rounded-full p-2 transition-colors",
                        voiceMode
                          ? "bg-cyan-500/20 text-cyan-300"
                          : "text-cream-100/60 hover:bg-cream-100/10 hover:text-cream-100",
                      )}
                    >
                      {voiceMode ? (
                        <Volume2 className="size-4" aria-hidden />
                      ) : (
                        <VolumeX className="size-4" aria-hidden />
                      )}
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={reset}
                    aria-label={t.chat.clear}
                    title={t.chat.clear}
                    className="rounded-full p-2 text-cream-100/60 transition-colors hover:bg-cream-100/10 hover:text-cream-100"
                  >
                    <RotateCcw className="size-4" aria-hidden />
                  </button>
                </div>
              </div>
              <p className="mt-2.5 text-[0.6875rem] text-cyan-300">
                {t.chat.languageNote}
              </p>
            </div>

            {/* Transcript */}
            <div
              ref={scrollRef}
              className="flex-1 space-y-3 overflow-y-auto overscroll-contain p-4"
            >
              {thread.map((m) => (
                <div
                  key={m.id}
                  className={cn(
                    "flex",
                    m.role === "user" ? "justify-end" : "justify-start",
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[85%] rounded-2xl px-4 py-2.5 text-[0.9375rem] leading-relaxed whitespace-pre-wrap",
                      m.role === "user"
                        ? "rounded-br-md bg-navy-900 text-cream-50"
                        : "rounded-bl-md bg-cream-200 text-ink-900",
                    )}
                  >
                    {m.content && m.role === "assistant" && speech.supported && (
                      <button
                        type="button"
                        onClick={() =>
                          speech.speaking ? speech.cancel() : speech.speak(m.content)
                        }
                        aria-label={speech.speaking ? t.voice.stopReply : t.voice.playReply}
                        className="float-right ml-2 inline-flex items-center gap-1 rounded-full border border-cream-400 bg-cream-50 px-2 py-0.5 text-[0.6875rem] font-semibold text-ink-700 transition-colors hover:border-cyan-500 hover:text-navy-900"
                      >
                        {speech.speaking ? (
                          <Square className="size-2.5" aria-hidden />
                        ) : (
                          <Play className="size-2.5" aria-hidden />
                        )}
                      </button>
                    )}
                    {m.content || (
                      <span className="inline-flex gap-1 py-1" aria-label={t.chat.thinking}>
                        {[0, 1, 2].map((i) => (
                          <motion.span
                            key={i}
                            className="size-1.5 rounded-full bg-ink-400"
                            animate={animate ? { opacity: [0.3, 1, 0.3] } : undefined}
                            transition={{
                              duration: 1.2,
                              repeat: Infinity,
                              delay: i * 0.18,
                            }}
                          />
                        ))}
                      </span>
                    )}
                  </div>
                </div>
              ))}

              {showSuggestions && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {t.chat.suggestions.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => send(s)}
                      className="rounded-full border border-cream-400 bg-cream-50 px-3.5 py-2 text-left text-[0.8125rem] text-ink-700 transition-colors hover:border-cyan-500 hover:text-navy-900"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Microphone explainer, shown once before we ever ask */}
            {askingMic && (
              <div className="shrink-0 border-t border-cream-300 bg-cream-50 p-4">
                <p className="font-display text-[1.0625rem] text-navy-900">
                  {t.voice.permissionTitle}
                </p>
                <p className="mt-2 text-[0.8125rem] leading-relaxed text-ink-700">
                  {t.voice.permissionBody}
                </p>
                <p className="mt-2.5 rounded-lg border border-ember-300/50 bg-ember-100/50 p-2.5 text-[0.75rem] leading-relaxed text-ink-700">
                  {t.voice.permissionPrivacy}
                </p>
                <div className="mt-3 flex gap-2">
                  <button
                    type="button"
                    onClick={allowMic}
                    className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-full bg-navy-900 text-[0.8125rem] font-semibold text-cream-50 transition-colors hover:bg-navy-800"
                  >
                    <Mic className="size-3.5" aria-hidden />
                    {t.voice.permissionAllow}
                  </button>
                  <button
                    type="button"
                    onClick={() => setAskingMic(false)}
                    className="inline-flex h-10 items-center justify-center rounded-full border border-cream-400 px-4 text-[0.8125rem] font-semibold text-ink-700 transition-colors hover:border-navy-300"
                  >
                    {t.voice.permissionCancel}
                  </button>
                </div>
              </div>
            )}

            {/* Listening */}
            {listen.listening && (
              <div className="shrink-0 border-t border-cream-300 bg-navy-950 px-4 py-3.5 text-cream-50">
                <Waveform levelRef={listen.levelRef} />
                <div className="mt-2 flex items-center justify-between gap-3">
                  <span className="flex items-center gap-2 text-[0.8125rem] font-semibold">
                    <span className="size-1.5 rounded-full bg-cyan-400" aria-hidden />
                    {t.voice.listening}
                  </span>
                  <button
                    type="button"
                    onClick={listen.stop}
                    className="rounded-full border border-cream-100/25 px-3 py-1 text-[0.75rem] font-semibold text-cream-100 transition-colors hover:bg-cream-100/10"
                  >
                    {t.voice.stop}
                  </button>
                </div>
                <p aria-live="polite" className="mt-2 min-h-[1.25rem] text-[0.8125rem] leading-snug text-cream-100/75">
                  {listen.transcript || t.voice.listeningHint}
                </p>
              </div>
            )}

            {/* Anything the microphone could not do */}
            {listen.error && !listen.listening && (
              <div className="shrink-0 border-t border-cream-300 bg-ember-100/60 px-4 py-3">
                <p className="text-[0.8125rem] leading-relaxed text-ink-700">
                  {listen.error === "unsupported" && t.voice.unsupported}
                  {listen.error === "denied" && t.voice.denied}
                  {listen.error === "no-speech" && t.voice.noSpeech}
                </p>
                <button
                  type="button"
                  onClick={listen.reset}
                  className="mt-1.5 text-[0.75rem] font-semibold text-cyan-600 hover:text-navy-900"
                >
                  {t.common.close}
                </button>
              </div>
            )}

            {/* Composer */}
            <div className="shrink-0 border-t border-cream-300 bg-cream-100 p-3">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  send(input);
                }}
                className="flex items-end gap-2"
              >
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      send(input);
                    }
                  }}
                  rows={1}
                  placeholder={t.chat.placeholder}
                  aria-label={t.chat.placeholder}
                  className="max-h-28 min-h-11 flex-1 resize-none rounded-2xl border border-cream-400 bg-cream-50 px-4 py-3 text-[0.9375rem] text-ink-900 placeholder:text-ink-400 focus:border-cyan-500 focus:outline-none"
                />
                {listen.supported && (
                  <button
                    type="button"
                    onClick={onMicPress}
                    aria-pressed={listen.listening}
                    aria-label={listen.listening ? t.voice.stop : t.voice.speak}
                    title={listen.listening ? t.voice.stop : t.voice.speak}
                    className={cn(
                      "grid size-11 shrink-0 place-items-center rounded-full border transition-colors",
                      listen.listening
                        ? "border-cyan-500 bg-cyan-500 text-white"
                        : "border-cream-400 bg-cream-50 text-navy-900 hover:border-cyan-500",
                    )}
                  >
                    {listen.listening ? (
                      <Square className="size-4" aria-hidden />
                    ) : (
                      <Mic className="size-4" aria-hidden />
                    )}
                  </button>
                )}
                <button
                  type="submit"
                  disabled={!input.trim() || busy}
                  aria-label={t.chat.send}
                  className="grid size-11 shrink-0 place-items-center rounded-full bg-navy-900 text-cream-50 transition-colors hover:bg-navy-800 disabled:opacity-40"
                >
                  <Send className="size-4" aria-hidden />
                </button>
              </form>

              <p className="mt-2.5 px-1 text-[0.6875rem] leading-relaxed text-ink-400">
                {t.chat.disclaimer}
              </p>

              <a
                href={telHref(site.phone)}
                className="mt-2 flex items-center justify-center gap-2 rounded-xl border border-cream-400 bg-cream-50 py-2.5 text-[0.8125rem] font-semibold text-navy-900 transition-colors hover:border-navy-300"
              >
                <Phone className="size-3.5 text-cyan-600" aria-hidden />
                {t.chat.escalateNote} {site.phone}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
