/**
 * Exercises the voice chat path. Chrome runs with a fake microphone so
 * getUserMedia succeeds and the level meter has real audio to read.
 * Usage: node scripts/voice-test.mjs [baseUrl]
 */
import puppeteer from "puppeteer-core";

const base = process.argv[2] || "http://localhost:3005";
const results = [];
const check = (name, pass, detail = "") => results.push({ name, pass, detail });

const browser = await puppeteer.launch({
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: "shell",
  args: [
    "--no-sandbox",
    "--use-fake-ui-for-media-stream",
    "--use-fake-device-for-media-stream",
    "--autoplay-policy=no-user-gesture-required",
  ],
});
const ctx = browser.defaultBrowserContext();
await ctx.overridePermissions(base, ["microphone"]);

const errs = [];
async function openChat(calm = false) {
  const p = await browser.newPage();
  await p.setViewport({ width: 1440, height: 900 });
  if (calm) {
    await p.evaluateOnNewDocument(() => localStorage.setItem("afs-calm-mode", "true"));
  }
  // Record what gets spoken without needing audio hardware.
  await p.evaluateOnNewDocument(() => {
    window.__spoken = [];
    const orig = window.speechSynthesis.speak.bind(window.speechSynthesis);
    window.speechSynthesis.speak = (u) => { window.__spoken.push(u.text); try { orig(u); } catch {} };
  });
  p.on("pageerror", (e) => errs.push(e.message.slice(0, 120)));
  p.on("console", (m) => m.type() === "error" && errs.push("console: " + m.text().slice(0, 120)));
  await p.goto(`${base}/en`, { waitUntil: "networkidle2" });
  await new Promise((r) => setTimeout(r, 1200));
  await p.click('button[aria-label="Chat with us"]');
  await new Promise((r) => setTimeout(r, 700));
  return p;
}
const bars = (p) => p.$$eval('[role="dialog"] span[style*="height"]', (e) => e.length);

/* ---------------------------------------------- normal mode ------------- */
{
  const p = await openChat();
  check("mic button present", Boolean(await p.$('button[aria-label="Speak"]')));

  await p.click('button[aria-label="Speak"]');
  await new Promise((r) => setTimeout(r, 600));
  const text = await p.evaluate(() => document.body.innerText);
  check("explains before asking", text.includes("Talk to us instead of typing"));
  check("privacy notice shown", text.includes("diagnosis, medication or health history"));
  check("mic not yet listening", (await bars(p)) === 0);

  await p.evaluate(() => [...document.querySelectorAll('[role="dialog"] button')]
    .find((b) => b.textContent.includes("Turn on the microphone"))?.click());
  await new Promise((r) => setTimeout(r, 1500));
  check("listening starts", (await bars(p)) > 0, `${await bars(p)} bars`);

  const moved = await p.evaluate(async () => {
    const read = () => [...document.querySelectorAll('[role="dialog"] span[style*="height"]')]
      .map((s) => s.style.height).join("|");
    const a = read();
    await new Promise((r) => setTimeout(r, 900));
    return a !== read();
  });
  check("waveform animates", moved);

  await new Promise((r) => setTimeout(r, 7000));
  check("ends itself on silence", (await bars(p)) === 0);

  // A reply should speak once voice mode is on.
  await p.evaluate(() => [...document.querySelectorAll('[role="dialog"] button')]
    .find((b) => b.textContent.includes("What services do you offer"))?.click());
  await new Promise((r) => setTimeout(r, 4000));
  const spoken = await p.evaluate(() => window.__spoken);
  check("reply speaks aloud", spoken.length > 0, spoken[0]?.slice(0, 48) ?? "nothing spoken");
  await p.close();
}

/* ---------------------------------------------- calm mode --------------- */
{
  const p = await openChat(true);
  check("calm mode active", (await p.evaluate(() => document.documentElement.dataset.calm)) === "true");
  await p.evaluate(() => [...document.querySelectorAll('[role="dialog"] button')]
    .find((b) => b.textContent.includes("What services do you offer"))?.click());
  await new Promise((r) => setTimeout(r, 4000));
  const spoken = await p.evaluate(() => window.__spoken);
  check("calm mode never auto-speaks", spoken.length === 0, `${spoken.length} utterances`);
  const play = await p.$$eval('[role="dialog"] button[aria-label]', (els) =>
    els.filter((e) => /Play this reply/i.test(e.getAttribute("aria-label") || "")).length);
  check("calm mode offers play buttons", play > 0, `${play} buttons`);
  await p.close();
}

/* ---------------------------------------------- speech route ------------ */
{
  const p = await browser.newPage();
  await p.goto(`${base}/en`, { waitUntil: "domcontentloaded" });
  const status = await p.evaluate(async () => (await fetch("/api/speech", {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: "hello", locale: "en" }),
  })).status);
  check("speech route falls back cleanly", status === 204, `HTTP ${status}`);
  await p.close();
}

await browser.close();

let failed = 0;
for (const r of results) {
  if (!r.pass) failed++;
  console.log(`${r.pass ? "PASS" : "FAIL"}  ${r.name.padEnd(32)} ${r.detail}`);
}
const unique = [...new Set(errs)].filter((e) => !/MIME type/.test(e));
if (unique.length) console.log("\nerrors:\n" + unique.join("\n"));
console.log(failed ? `\n${failed} failing` : "\nvoice chat works end to end");
process.exit(failed ? 1 : 0);
