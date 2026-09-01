export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Callback-request endpoint.
 *
 * Deliberately a stub with a clean seam: the clinic drops in whichever
 * delivery they choose (Resend, Formspree, a HIPAA-compliant provider such
 * as Jotform, or their EHR) inside `deliver()` and nothing else changes.
 *
 * NOTE ON PHI: this endpoint must never be repurposed to collect diagnoses,
 * treatment history or any other protected health information. Keep clinical
 * intake on the phone.
 */

interface Submission {
  name: string;
  phone: string;
  email?: string;
  reason?: string;
  bestTime?: string;
  preferredLanguage?: string;
  message?: string;
  locale?: string;
}

function clean(value: unknown, max = 400): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

async function deliver(submission: Submission) {
  const endpoint = process.env.CONTACT_FORWARD_URL;

  if (!endpoint) {
    // Demo mode: log it so the flow is observable end to end.
    console.info("[contact] callback request received", {
      ...submission,
      // Never log a full phone number in plain text.
      phone: submission.phone.replace(/\d(?=\d{4})/g, "•"),
    });
    return;
  }

  await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(process.env.CONTACT_FORWARD_TOKEN
        ? { Authorization: `Bearer ${process.env.CONTACT_FORWARD_TOKEN}` }
        : {}),
    },
    body: JSON.stringify(submission),
  });
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  // Honeypot: silently accept so bots don't learn anything.
  if (clean(body.company)) {
    return Response.json({ ok: true });
  }

  const name = clean(body.name, 160);
  const phone = clean(body.phone, 40);

  if (!name || !phone) {
    return Response.json(
      { error: "Name and phone number are required." },
      { status: 400 },
    );
  }

  const submission: Submission = {
    name,
    phone,
    email: clean(body.email, 200) || undefined,
    reason: clean(body.reason, 40) || undefined,
    bestTime: clean(body.bestTime, 40) || undefined,
    preferredLanguage: clean(body.preferredLanguage, 8) || undefined,
    message: clean(body.message, 1200) || undefined,
    locale: clean(body.locale, 8) || undefined,
  };

  try {
    await deliver(submission);
    return Response.json({ ok: true });
  } catch (error) {
    console.error("[contact] delivery failed", error);
    return Response.json(
      { error: "Could not deliver the request." },
      { status: 502 },
    );
  }
}
