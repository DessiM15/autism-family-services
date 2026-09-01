import puppeteer from "puppeteer-core";
const browser = await puppeteer.launch({
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: "shell", args: ["--no-sandbox"],
});
const p = await browser.newPage();
await p.setViewport({ width: 1440, height: 900 });
await p.goto("http://localhost:3001/en", { waitUntil: "networkidle2" });
await new Promise(r => setTimeout(r, 900));
const badges = await p.$$eval('[lang="es"]', els => els.map(e => e.textContent.trim()));
console.log("es-tagged badges on /en:", JSON.stringify(badges));

// Ask the chatbot in Spanish.
await p.click('button[aria-label="Chat with us"]');
await new Promise(r => setTimeout(r, 600));
await p.type("textarea", "Hablan español?");
await p.keyboard.press("Enter");
await new Promise(r => setTimeout(r, 3500));
const bubbles = await p.$$eval('[role="dialog"] .whitespace-pre-wrap', els => els.map(e => e.textContent.trim()));
console.log("chat reply:", JSON.stringify((bubbles.at(-1) || "").slice(0, 200)));
await p.screenshot({ path: "/private/tmp/claude-501/-Users-dessidaniel-Desktop-Autism-Family-Services/c083ad7d-08d4-4256-8868-2b7c5aae11c2/scratchpad/es-badge.png" });
await browser.close();
