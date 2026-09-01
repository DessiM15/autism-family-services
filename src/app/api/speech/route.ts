export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Text to speech.
 *
 * Returns 204 when no provider is configured, which tells the client to use
 * the device's own voice instead. That way the feature is fully demonstrable
 * with no account and no cost, and adding ELEVENLABS_API_KEY upgrades every
 * reply to a natural voice without touching the interface.
 *
 * Cost, for whoever is deciding: a typical reply is around 300 characters,
 * so roughly 1.5 cents on Flash v2.5 at $0.05 per 1,000 characters.
 */

const ENDPOINT = "https://api.elevenlabs.io/v1/text-to-speech";

/**
 * Voice ids come from the clinic's own ElevenLabs account. The defaults are
 * long-standing public voices so the route works the moment a key is added;
 * swap them for whichever voice Jennifer prefers.
 */
const VOICE_EN = process.env.ELEVENLABS_VOICE_ID_EN || "21m00Tcm4TlvDq8ikWAM";
const VOICE_ES = process.env.ELEVENLABS_VOICE_ID_ES || VOICE_EN;

/** Flash is a quarter of the latency and half the price of Multilingual v2. */
const MODEL = process.env.ELEVENLABS_MODEL || "eleven_flash_v2_5";

const MAX_CHARS = 900;

export async function POST(request: Request) {
  const key = process.env.ELEVENLABS_API_KEY;
  if (!key) {
    // No provider configured. The client falls back to the device voice.
    return new Response(null, { status: 204 });
  }

  let body: { text?: unknown; locale?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const text = typeof body.text === "string" ? body.text.trim().slice(0, MAX_CHARS) : "";
  if (!text) {
    return Response.json({ error: "No text supplied." }, { status: 400 });
  }

  const voiceId = body.locale === "es" ? VOICE_ES : VOICE_EN;

  try {
    const upstream = await fetch(`${ENDPOINT}/${voiceId}/stream`, {
      method: "POST",
      headers: {
        "xi-api-key": key,
        "Content-Type": "application/json",
        Accept: "audio/mpeg",
      },
      body: JSON.stringify({
        text,
        model_id: MODEL,
        voice_settings: {
          // Steady and warm rather than performative. This is a clinic.
          stability: 0.5,
          similarity_boost: 0.75,
          style: 0.15,
          use_speaker_boost: true,
        },
      }),
    });

    if (!upstream.ok || !upstream.body) {
      console.error("[speech] provider returned", upstream.status);
      // Fall back to the device voice rather than failing the interaction.
      return new Response(null, { status: 204 });
    }

    return new Response(upstream.body, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("[speech] request failed", error);
    return new Response(null, { status: 204 });
  }
}
