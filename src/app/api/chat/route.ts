import Anthropic from "@anthropic-ai/sdk";
import { buildSystemPrompt, fallbackReply } from "@/content/data/chat-knowledge";
import { isLocale, type Locale } from "@/lib/i18n";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_MESSAGES = 24;
const MAX_CHARS = 2000;

/**
 * Claude Opus 5 by default. The clinic can point this at a cheaper model
 * (`claude-haiku-4-5`) with an env var once they see their traffic.
 */
const MODEL = process.env.CHAT_MODEL || "claude-opus-5";

interface IncomingMessage {
  role: "user" | "assistant";
  content: string;
}

function sse(text: string) {
  return `data: ${JSON.stringify({ text })}\n\n`;
}

function streamOf(chunks: string[], delayMs = 18) {
  const encoder = new TextEncoder();
  return new ReadableStream({
    async start(controller) {
      for (const chunk of chunks) {
        controller.enqueue(encoder.encode(sse(chunk)));
        if (delayMs) await new Promise((r) => setTimeout(r, delayMs));
      }
      controller.enqueue(encoder.encode("data: [DONE]\n\n"));
      controller.close();
    },
  });
}

const SSE_HEADERS = {
  "Content-Type": "text/event-stream; charset=utf-8",
  "Cache-Control": "no-cache, no-transform",
  Connection: "keep-alive",
  "X-Accel-Buffering": "no",
} as const;

export async function POST(request: Request) {
  let body: { messages?: IncomingMessage[]; locale?: string };

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const locale: Locale = isLocale(body.locale) ? body.locale : "en";

  const messages = (body.messages ?? [])
    .filter(
      (m): m is IncomingMessage =>
        !!m &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim().length > 0,
    )
    .slice(-MAX_MESSAGES)
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_CHARS) }));

  if (messages.length === 0) {
    return Response.json({ error: "No messages supplied." }, { status: 400 });
  }
  if (messages[messages.length - 1].role !== "user") {
    return Response.json({ error: "Last message must be from the user." }, { status: 400 });
  }

  const lastUserMessage = messages[messages.length - 1].content;

  /* ------------------------------------------------------------------
     No key configured — serve the built-in responder so the widget is
     fully demonstrable before the clinic connects their own account.
     ------------------------------------------------------------------ */
  if (!process.env.ANTHROPIC_API_KEY) {
    const reply = fallbackReply(lastUserMessage, locale);
    // Chunk into words so it still types out like a real stream.
    const words = reply.split(/(\s+)/);
    return new Response(streamOf(words), { headers: SSE_HEADERS });
  }

  /* ------------------------------------------------------------------ */
  try {
    const client = new Anthropic();
    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        try {
          const claude = client.messages.stream({
            model: MODEL,
            max_tokens: 1024,
            system: [
              {
                type: "text",
                text: buildSystemPrompt(locale),
                // The system prompt is large and identical on every request.
                cache_control: { type: "ephemeral" },
              },
            ],
            messages,
          });

          claude.on("text", (text) => {
            controller.enqueue(encoder.encode(sse(text)));
          });

          const final = await claude.finalMessage();

          // A safety decline still deserves a humane, useful answer.
          if (final.stop_reason === "refusal") {
            controller.enqueue(
              encoder.encode(sse(fallbackReply(lastUserMessage, locale))),
            );
          }

          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        } catch (error) {
          console.error("[chat] stream failed", error);
          // Never leave the visitor staring at nothing.
          controller.enqueue(
            encoder.encode(sse(fallbackReply(lastUserMessage, locale))),
          );
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        }
      },
    });

    return new Response(stream, { headers: SSE_HEADERS });
  } catch (error) {
    console.error("[chat] request failed", error);
    const reply = fallbackReply(lastUserMessage, locale);
    return new Response(streamOf(reply.split(/(\s+)/)), { headers: SSE_HEADERS });
  }
}
